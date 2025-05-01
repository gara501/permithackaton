// frontend/src/hooks/useHasPermission.ts

import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export function useHasPermission(action: string, resource: string) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkPermission() {
      try {
        const response = await apiFetch<{ allowed: boolean }>(
          "/permissions/check",
          {
            method: "POST",
            body: JSON.stringify({ action, resource }),
          }
        );
        setHasPermission(response.allowed);
      } catch (error) {
        console.error("Permission check failed:", error);
        setHasPermission(false); // No permitir si falla
      } finally {
        setLoading(false);
      }
    }

    checkPermission();
  }, [action, resource]);

  return { hasPermission, loading };
}
