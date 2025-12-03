const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BATCHES_FILE = path.join(__dirname, '../../dev_batches.json');

function readBatches() {
  try {
    if (!fs.existsSync(BATCHES_FILE)) return [];
    return JSON.parse(fs.readFileSync(BATCHES_FILE, 'utf8') || '[]');
  } catch (e) { return []; }
}

function writeBatches(data) {
  try { fs.writeFileSync(BATCHES_FILE, JSON.stringify(data, null, 2)); } catch (e) {}
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

function batchesRouter(db) {
  const router = express.Router();

  // Create batch (admin)
  router.post('/batches', requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const { course_id, name, start_date, end_date, is_active } = req.body;
      if (!course_id || !name) return res.status(400).json({ error: 'course_id and name required' });
      const batches = readBatches();
      const now = new Date().toISOString();
      const batch = { id: crypto.randomUUID(), course_id, name, start_date: start_date || null, end_date: end_date || null, is_active: !!is_active, enrollments: [], createdAt: now };
      batches.push(batch);
      writeBatches(batches);
      return res.status(201).json({ batch });
    } catch (err) { next(err); }
  });

  // List batches (public) - supports ?course_id=&is_active=
  router.get('/batches', async (req, res, next) => {
    try {
      const { course_id, is_active } = req.query;
      let batches = readBatches();
      if (course_id) batches = batches.filter(b => b.course_id === course_id);
      if (typeof is_active !== 'undefined') {
        const active = String(is_active) === 'true';
        batches = batches.filter(b => !!b.is_active === active);
      }
      return res.json({ batches });
    } catch (err) { next(err); }
  });

  // Enroll a single student (admin)
  router.post('/batches/:batchId/enroll', requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const batchId = req.params.batchId;
      const { student_id } = req.body;
      if (!student_id) return res.status(400).json({ error: 'student_id required' });
      const batches = readBatches();
      const idx = batches.findIndex(b => b.id === batchId);
      if (idx === -1) return res.status(404).json({ error: 'Batch not found' });
      const batch = batches[idx];
      // avoid duplicate
      if (batch.enrollments.find(e => e.student_id === student_id)) return res.status(409).json({ error: 'Already enrolled' });
      const enrollment = { id: crypto.randomUUID(), student_id, enrolledAt: new Date().toISOString() };
      batch.enrollments.push(enrollment);
      batches[idx] = batch;
      writeBatches(batches);
      return res.status(201).json({ enrollment });
    } catch (err) { next(err); }
  });

  // Bulk enroll students via array (admin)
  router.post('/batches/:batchId/enroll-bulk', requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const batchId = req.params.batchId;
      const { students } = req.body;
      if (!Array.isArray(students)) return res.status(400).json({ error: 'students array required' });
      const batches = readBatches();
      const idx = batches.findIndex(b => b.id === batchId);
      if (idx === -1) return res.status(404).json({ error: 'Batch not found' });
      const batch = batches[idx];
      const added = [];
      for (const sid of students) {
        if (!batch.enrollments.find(e => e.student_id === sid)) {
          const enrollment = { id: crypto.randomUUID(), student_id: sid, enrolledAt: new Date().toISOString() };
          batch.enrollments.push(enrollment);
          added.push(enrollment);
        }
      }
      batches[idx] = batch;
      writeBatches(batches);
      return res.status(201).json({ added });
    } catch (err) { next(err); }
  });

  return router;
}

module.exports = batchesRouter;
