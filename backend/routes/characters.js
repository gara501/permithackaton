// backend/routes/characters.js

const express = require('express');
const { permit } = require('../middlewares/permit.js'); // Importar middleware de permisos
const { checkPermission } = require('../middlewares/checkPermission.js'); // Asegurarse de que el checkPermission también esté disponible

const router = express.Router();

router.post('/', checkPermission('create', 'game', 'id'), async (req, res) => {
  const { key, name, description } = req.body;

  try {
    const newUser = await permit.api.roles.create({
      key: key,
      name: name, 
      description: description,
    });

    res.status(201).json({
      message: 'Character created succesfully',
      user: newUser,
    });

  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: `Character can't be created ${error}` });
  }
});

module.exports = router;
