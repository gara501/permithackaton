require('dotenv').config();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node'); // Clerk

// Middleware de autenticación con Clerk
const authMiddleware = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

module.exports = { authMiddleware };