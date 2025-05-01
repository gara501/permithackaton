// backend/middlewares/permit.js

const { Permit } = require("permitio"); // Importar Permit

// Crear una nueva instancia de Permit con la configuración
const permit = new Permit({
  pdp: "https://cloudpdp.api.permit.io",
  token: process.env.PERMIT_API_KEY
});

// Middleware para verificar permisos
const permitMiddleware = (action, resource) => {
  return async (req, res, next) => {
    try {
      const userId = req.auth.userId;
      console.log('USER Id', userId);
      const resourceId = req.params.id || 'global'; // ID del recurso, o 'global' por defecto

      const allowed = await permit.check(userId, action, resource, resourceId);
      if (!allowed) return res.status(403).send('Forbidden'); // Si no tiene permiso, responder 403

      next(); // Continuar si tiene permiso
    } catch (err) {
      console.error(err);
      res.status(500).send('Authorization Error'); // Error de autorización
    }
  };
};

module.exports = { permit, permitMiddleware };
