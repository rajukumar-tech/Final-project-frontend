// src/lib/prisma.js
const { PrismaClient } = require('@prisma/client');

let prisma;

// Create a single instance of PrismaClient
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
