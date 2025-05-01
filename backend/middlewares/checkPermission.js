// backend/middlewares/checkPermission.js

const { permit } = require('./permit.js'); // Importar Permit

// Middleware para verificar permisos
function checkPermission(action, resourceType, resourceIdParam = null) {
  return async (req, res, next) => {
    try {
      // Obtener el usuario directamente del request
      const auth = req.auth;
      const userId = auth?.userId;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: no user' });
      }

      // Definir resourceId
      const resource = {
        type: resourceType,
        id: resourceIdParam ? req.params[resourceIdParam] : undefined,
      };

      // Verificar permiso en Permit
      const isAllowed = await permit.check(userId, action, resource);

      if (!isAllowed) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      }

      // Si pasa, continuar
      next();
    } catch (error) {
      console.error('Error checking permission:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = { checkPermission };
