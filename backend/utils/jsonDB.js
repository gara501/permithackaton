// backend/src/utils/jsonDB.js

const fs = require('fs'); // Reemplazamos import por require

const filePath = './contracts.json';

function loadContracts() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveContracts(contracts) {
  fs.writeFileSync(filePath, JSON.stringify(contracts, null, 2));
}

module.exports = { loadContracts, saveContracts }; // Exportamos las funciones
