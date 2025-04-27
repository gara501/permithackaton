import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { Permit } from 'permitio';
import profileRoutes from './routes/profileRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());

// Initialize Permit
const permit = new Permit({
  token: process.env.PERMIT_API_KEY,
});

// Usar en req.permit para acceder fácil
app.use((req, res, next) => {
  req.permit = permit;
  next();
});

// Rutas
app.use('/profiles', ClerkExpressRequireAuth(), profileRoutes);
app.use('/roles', ClerkExpressRequireAuth(), roleRoutes);

// Servidor arriba
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
