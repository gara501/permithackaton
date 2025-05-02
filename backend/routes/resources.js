const express = require('express');
const { permit } = require('../middlewares/permit.js'); // Importar middleware de permisos
const { checkPermission } = require('../middlewares/checkPermission.js'); // Asegurarse de que el checkPermission también esté disponible

const router = express.Router();


router.get('/', checkPermission('read', 'game'), async (req, res) => {
  try {
    const resources = await permit.api.resources.list();
    res.json(resources);

  } catch (error) {
    console.error('Error getting resources:', error);
    res.status(500).json({ error: `Can't load resources ${error}` });
  }
});

router.post('/', checkPermission('create', 'game', 'id'), async (req, res) => {
  const { key, resourceType, users } = req.body;

  try {
    await permit.api.resources.create({
      key: key,
      resource_type: resourceType,
      attributes: {
        used_by: [users]
      }
    });

    res.status(201).json({
      message: 'Resource created succesfully',
      hability: key,
    });

  } catch (error) {
    console.error('Error creating Resource:', error);
    res.status(500).json({ error: `Resource can't be created` });
  }
});

module.exports = router;
