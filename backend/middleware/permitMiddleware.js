const permit = require('../services/permitService');

function authorize(action, resourceType) {
  return async (req, res, next) => {
    try {
      const allowed = await permit.check({
        user: req.auth.userId,
        action,
        resource: resourceType,
        resource_instance: req.params.id || undefined,
      });

      if (!allowed) {
        return res.status(403).json({ message: "No autorizado" });
      }

      next();
    } catch (error) {
      console.error('Error en autorización:', error);
      res.status(500).json({ message: 'Error interno' });
    }
  };
}

module.exports = { authorize };