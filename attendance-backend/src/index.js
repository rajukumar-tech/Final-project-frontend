// src/index.js
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

// Load Prisma if available. If Prisma fails to initialize (Prisma v7 runtime adapter issue),
// we continue and pass `null` into routes so they can fall back to an in-memory/file store.
let prisma;
try {
  prisma = require('./lib/prisma'); // CommonJS
} catch (err) {
  console.warn('Prisma failed to initialize — falling back to local store for routes.');
  console.warn(err?.message || err);
  prisma = null;
}
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cookieParser());

// health
app.get('/', (req, res) => res.json({ ok: true, msg: 'backend running' }));

// mount auth (inject prisma)
app.use('/api/auth', authRouter(prisma));

// simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Optional: run smoke tests automatically when RUN_SMOKE=1 is set.
  if (process.env.RUN_SMOKE === '1') {
    const { execFile } = require('child_process');
    const smokePath = require('path').join(__dirname, '..', 'tools', 'smoke.js');
    console.log('RUN_SMOKE=1 — executing smoke tests...');
    execFile(process.execPath, [smokePath], { cwd: process.cwd() }, (err, stdout, stderr) => {
      if (err) {
        console.error('Smoke tests failed:', err);
      }
      if (stdout) console.log('SMOKE STDOUT:\n', stdout);
      if (stderr) console.error('SMOKE STDERR:\n', stderr);
    });
  }
});
