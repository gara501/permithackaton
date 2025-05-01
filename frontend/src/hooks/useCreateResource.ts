import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export function useCreateResource(apiname: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  // const navigate = useNavigate();
  const { getToken } = useAuth();

  const create = async (bodyData: unknown) => {
    setLoading(true);

    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:3000/api/${apiname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        // navigate("/");
      } else {
        console.error(`Error creating ${apiname}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const get = async () => {
    setLoading(true);

    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:3000/api/${apiname}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // navigate("/");
        const json = await response.json();
        setData(json);
        console.log("RESPONSE DATA", response, response.body, json.data);
      } else {
        console.error(`Error getting data from ${apiname}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getParams = async ({
    id,
    type,
    resource,
  }: {
    id: string;
    type: string;
    resource: string;
  }) => {
    setLoading(true);

    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:3000/api/${apiname}/${id}/${type}/${resource}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify(bodyData),
        }
      );

      console.log("RESPONSE", response);

      if (response.ok) {
        // navigate("/");
        const json = await response.json();
        setData(json.data);
        console.log("RESPONSE", json.data);
      } else {
        console.error(`Error getting data from ${apiname}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { create, get, getParams, data, loading };
}
