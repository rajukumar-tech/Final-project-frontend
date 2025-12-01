// src/lib/prisma.js
// Force Prisma to use the binary engine to avoid requiring a runtime driver adapter.
process.env.PRISMA_CLIENT_ENGINE_TYPE = process.env.PRISMA_CLIENT_ENGINE_TYPE || 'binary';
const { PrismaClient } = require('@prisma/client');

let prisma;

const clientOptions = {};

// Prisma v7 requires passing a runtime datasource adapter or accelerateUrl
// when the schema's datasource URL is supplied via `prisma.config.js` / env.
if (process.env.DATABASE_URL) {
  clientOptions.adapter = { provider: 'sqlite', url: process.env.DATABASE_URL };
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(clientOptions);
} else {
  // Prevent multiple instances in development (hot reload)
  if (!global.prisma) {
    global.prisma = new PrismaClient(clientOptions);
  }
  prisma = global.prisma;
}

module.exports = prisma;
