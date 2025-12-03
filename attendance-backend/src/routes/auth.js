// src/routes/auth.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Use the real Prisma client passed from the app. Previously we used a
// fallback adapter for local testing; moving to real DB-backed Prisma now.

function authRouter(prisma) {
  const router = express.Router();
  const db = prisma;

  // helper: sign token
  const signToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role };
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    return jwt.sign(payload, secret, { expiresIn });
  };

  // REGISTER
  router.post(
    '/register',
    [
      body('email').isEmail().withMessage('Valid email required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
      body('name').optional().isString()
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        let { email, password, name } = req.body;
        email = String(email).toLowerCase().trim();

        // check existing user
        const existing = await db.user.findUnique({ where: { email } });
        if (existing) return res.status(409).json({ error: 'Email already registered' });

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await db.user.create({
          data: {
            email,
            password: hash,
            name: name || null
          },
          select: { id: true, email: true, name: true, role: true, createdAt: true }
        });

        const token = signToken(user);

        // set cookie (HttpOnly)
        const cookieOptions = {
          httpOnly: true,
          secure: (process.env.COOKIE_SECURE === 'true') || process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        };

        res.cookie('token', token, cookieOptions);

        return res.status(201).json({ user, token });
      } catch (err) {
        next(err);
      }
    }
  );

  // LOGIN
  router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Valid email required'),
      body('password').notEmpty().withMessage('Password required')
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        let { email, password } = req.body;
        email = String(email).toLowerCase().trim();

        const user = await db.user.findUnique({ where: { email } });

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = signToken(user);

        const cookieOptions = {
          httpOnly: true,
          secure: (process.env.COOKIE_SECURE === 'true') || process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7
        };

        res.cookie('token', token, cookieOptions);

        const safeUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt
        };

        return res.json({ user: safeUser, token });
      } catch (err) {
        next(err);
      }
    }
  );

  // LOGOUT
  router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    res.json({ ok: true });
  });

  return router;
}

module.exports = authRouter;
