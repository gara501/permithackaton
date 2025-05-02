const express = require('express');
const { permit } = require('../middlewares/permit.js'); // Importar middleware de permisos
const { checkPermission } = require('../middlewares/checkPermission.js'); // Asegurarse de que el checkPermission también esté disponible

const router = express.Router();

router.get('/', checkPermission('read', 'game'), async (req, res) => {
  try {
    const players = await permit.api.roles.list();
    res.json(players);

  } catch (error) {
    console.error('Error getting players:', error);
    res.status(500).json({ error: `Can't load players ${error}` });
  }
});

router.get('/:id/:type/:resource', checkPermission('read', 'game'), async (req, res) => {
  try {
    const { id, type, resource } = req.params;
    const permitted = await permit.check(id, type, resource);
    if (permitted) {
      res.status(200).send(`${user.firstName} ${user.lastName} is PERMITTED to ${type} ${resource} !`);
    } else {
      res.status(403).send(`${user.firstName} ${user.lastName} is NOT PERMITTED to ${type} ${resource} !`);
    }
  } catch (error) {
    console.error('Error getting permissions:', error);
    res.status(500).json({ error: `Can't load permissions ${error}` });
  }
});

module.exports = router;
