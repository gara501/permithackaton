import express from 'express';
import { assignRole } from '../controllers/roleController.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { isAdmin } from '../middleware/authorizationMiddleware.js';

const router = express.Router();

// Asignar rol, protegido por autenticación
router.post('/assign-role', ClerkExpressRequireAuth(), isAdmin, assignRole);

export default router;