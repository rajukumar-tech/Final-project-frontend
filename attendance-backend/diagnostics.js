// Quick diagnostic script
console.log('================================');
console.log('Node.js Version:', process.version);
console.log('Working Directory:', process.cwd());
console.log('================================');

// Try to require Express
try {
    const express = require('express');
    console.log('✓ Express is installed');
} catch (e) {
    console.log('✗ Express NOT installed:', e.message);
    console.log('  Run: npm install');
}

// Try to require Prisma
try {
    const { PrismaClient } = require('@prisma/client');
    console.log('✓ Prisma Client is installed');
} catch (e) {
    console.log('✗ Prisma Client NOT installed:', e.message);
    console.log('  Run: npx prisma generate');
}

// Try to require CORS
try {
    const cors = require('cors');
    console.log('✓ CORS is installed');
} catch (e) {
    console.log('✗ CORS NOT installed:', e.message);
    console.log('  Run: npm install cors');
}

console.log('=================================');
console.log('Diagnostic complete. Press Ctrl+C to exit.');
