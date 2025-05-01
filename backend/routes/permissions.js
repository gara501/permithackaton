// backend/src/routes/permissions.js

const { Router } = require('express');
const { checkUserPermission } = require('../middlewares/checkPermission.js'); // Importa tu lógica de permisos

const router = Router();

router.post('/check', async (req, res) => {
  const { action, resource } = req.body;
  const user = req.user; // O como tengas a tu usuario

  try {
    const allowed = await checkUserPermission(user, action, resource);
    res.json({ allowed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ allowed: false });
  }
});

module.exports = router;
