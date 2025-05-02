// backend/src/index.js

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { authMiddleware } = require('./middlewares/auth.js'); // Clerk
const resourcesRouter = require('./routes/resources.js');
const playersRouter = require('./routes/players.js');
const charactersRouter = require('./routes/characters.js');
const actionsRouter = require('./routes/actions.js');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware de autenticación
app.use(authMiddleware);

// Routes
app.use('/api/resources', resourcesRouter);
app.use('/api/players', playersRouter);
app.use('/api/characters', charactersRouter);
app.use('/api/actions', actionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
