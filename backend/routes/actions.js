const express = require('express');
const { permit } = require('../middlewares/permit.js'); // Importar middleware de permisos
const { checkPermission } = require('../middlewares/checkPermission.js'); // Asegurarse de que el checkPermission también esté disponible

const router = express.Router();

router.post('/', checkPermission('create', 'game', 'id'), async (req, res) => {
  const { roleId, name, description, permissions } = req.body;
  try {
    const newPolicy = await permit.api.updateRole(roleId, JSON.stringify({
      name: name,
      description: description,
      permissions: permissions
    }));

    res.status(201).json({
      message: 'Actions assigned succesfully',
      user: newPolicy,
    });

  } catch (error) {
    console.error('Error assigning actions:', error);
    res.status(500).json({ error: `Actions can't be assigned ${error}` });
  }
});

module.exports = router;
