// /middleware/checkPermission.js
export function checkPermission(action, resource) {
  return async (req, res, next) => {
    try {
      const allowed = await req.permit.check({
        user: req.auth.userId,
        action,
        resource,
      });

      if (!allowed) {
        return res.status(403).json({ message: "No tienes permiso." });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el permiso." });
    }
  };
}
