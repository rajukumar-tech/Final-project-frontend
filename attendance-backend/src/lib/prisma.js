// src/lib/prisma.js
// Force Prisma to use the binary engine to avoid requiring a runtime driver adapter.
process.env.PRISMA_CLIENT_ENGINE_TYPE = process.env.PRISMA_CLIENT_ENGINE_TYPE || 'binary';
const { PrismaClient } = require('@prisma/client');

let prisma;

// Instantiate PrismaClient without runtime constructor options so that
// the client uses the environment-configured datasource at runtime.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances in development (hot reload)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
