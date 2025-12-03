const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const COURSES_FILE = path.join(__dirname, '../../dev_courses.json');

function readCourses() {
  try {
    if (!fs.existsSync(COURSES_FILE)) return [];
    return JSON.parse(fs.readFileSync(COURSES_FILE, 'utf8') || '[]');
  } catch (e) { return []; }
}

function writeCourses(data) {
  try { fs.writeFileSync(COURSES_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
}

function requireAuth(req, res, next) {
  const token = (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const jwt = require('jsonwebtoken');
    const secret = process.env.JWT_SECRET || 'dev_secret';
    req.user = jwt.verify(token, secret);
    return next();
  } catch (e) { return res.status(401).json({ error: 'Invalid token' }); }
}

function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  return next();
}

function coursesRouter(db) {
  const router = express.Router();

  // Create course (admin)
  router.post('/courses', requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const { code, title, description } = req.body;
      if (!code || !title) return res.status(400).json({ error: 'code and title required' });

      // use fallback file storage always (Prisma schema doesn't include Course model)
      const courses = readCourses();
      if (courses.find(c => c.code === code)) return res.status(409).json({ error: 'Course code already exists' });
      const now = new Date().toISOString();
      const course = { id: crypto.randomUUID(), code, title, description: description || null, createdAt: now };
      courses.push(course);
      writeCourses(courses);
      return res.status(201).json({ course });
    } catch (err) { next(err); }
  });

  // List courses (public). Filters optional (future)
  router.get('/courses', async (req, res, next) => {
    try {
      const courses = readCourses();
      return res.json({ courses });
    } catch (err) { next(err); }
  });

  return router;
}

module.exports = coursesRouter;
