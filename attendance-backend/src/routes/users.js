const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const ROLES = ['admin', 'instructor', 'student', 'user'];

function fileUsersPath() {
  return path.join(__dirname, '../../dev_users.json');
}

function readUsers() {
  const file = fileUsersPath();
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  const file = fileUsersPath();
  try { fs.writeFileSync(file, JSON.stringify(users, null, 2)); } catch (e) { }
}

function usersRouter(prisma) {
  const router = express.Router();
  const db = prisma;

  // token -> user payload
  const requireAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    try {
      const secret = process.env.JWT_SECRET || 'dev_secret';
      const payload = jwt.verify(token, secret);
      req.user = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

  // GET /api/users - list all users (admin only), optional ?role= filter
  router.get('/users', requireAuth, async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: admin only' });
      }

      const { role } = req.query;
      let users = readUsers();

      // Filter by role if specified
      if (role) {
        users = users.filter(u => u.role === role);
      }

      // Return safe user data (without passwords)
      const safeUsers = users.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt
      }));

      return res.json({ users: safeUsers });
    } catch (err) { next(err); }
  });

  // GET /api/users/me
  router.get('/users/me', requireAuth, async (req, res, next) => {
    try {
      const id = req.user.id;
      if (db) {
        const user = await db.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ error: 'Not found' });
        const safe = { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt };
        return res.json({ user: safe });
      }

      const users = readUsers();
      const user = users.find(u => u.id === id);
      if (!user) return res.status(404).json({ error: 'Not found' });
      const safe = { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt };
      return res.json({ user: safe });
    } catch (err) { next(err); }
  });

  // PATCH /api/users/:id  (admin or self)
  router.patch('/users/:id', requireAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const requester = req.user;
      if (!(requester.role === 'admin' || requester.id === id)) return res.status(403).json({ error: 'Forbidden' });

      const { name, email, password, role } = req.body;

      if (role && requester.role !== 'admin') return res.status(403).json({ error: 'Only admin can change role' });

      if (db) {
        // hash if password
        const data = {};
        if (name !== undefined) data.name = name;
        if (email !== undefined) data.email = email;
        if (role !== undefined) data.role = role;
        if (password !== undefined) {
          const salt = await bcrypt.genSalt(10);
          data.password = await bcrypt.hash(password, salt);
        }

        try {
          const updated = await db.user.update({ where: { id }, data, select: { id: true, email: true, name: true, role: true, createdAt: true } });
          return res.json({ user: updated });
        } catch (err) {
          // Prisma unique violation handling
          if (err.message && err.message.includes('Unique')) return res.status(409).json({ error: 'Email already in use' });
          throw err;
        }
      }

      // file-backed update
      const users = readUsers();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Not found' });

      if (email) {
        const other = users.find(u => u.email === email && u.id !== id);
        if (other) return res.status(409).json({ error: 'Email already in use' });
      }

      if (name !== undefined) users[idx].name = name;
      if (email !== undefined) users[idx].email = email;
      if (role !== undefined) users[idx].role = role;
      if (password !== undefined) {
        const salt = await bcrypt.genSalt(10);
        users[idx].password = await bcrypt.hash(password, salt);
      }
      users[idx].updatedAt = new Date().toISOString();
      writeUsers(users);

      const safe = (({ id, email: e, name: n, role: r, createdAt }) => ({ id, email: e, name: n, role: r, createdAt }))(users[idx]);
      return res.json({ user: safe });
    } catch (err) { next(err); }
  });

  // GET /api/roles  (public)
  router.get('/roles', (req, res) => {
    res.json({ roles: ROLES });
  });

  return router;
}

module.exports = usersRouter;
