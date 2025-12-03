// prisma.config.js
require('dotenv').config();
const { defineConfig } = require('prisma/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Use DATABASE_URL from env if present, otherwise fallback to sqlite file
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
  migrations: {
    path: 'prisma/migrations',
  },
});
