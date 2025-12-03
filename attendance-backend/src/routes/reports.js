const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BATCHES_FILE = path.join(__dirname, '../../dev_batches.json');
const SESSIONS_FILE = path.join(__dirname, '../../dev_sessions.json');
const RECORDS_FILE = path.join(__dirname, '../../dev_records.json');

// Helper functions
function loadBatches() {
  try {
    if (fs.existsSync(BATCHES_FILE)) return JSON.parse(fs.readFileSync(BATCHES_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function loadSessions() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function loadRecords() {
  try {
    if (fs.existsSync(RECORDS_FILE)) return JSON.parse(fs.readFileSync(RECORDS_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const jwt = require('jsonwebtoken');
    const secret = process.env.JWT_SECRET || 'dev_secret';
    req.user = jwt.verify(token, secret);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * GET /api/reports/batch/:batchId/history
 * Batch-wise attendance summary and history (instructor/admin)
 * Response: { batchId, totalSessions, attendance: [{ studentId, present, absent, leave, percent }] }
 */
router.get('/batch/:batchId/history', authMiddleware, (req, res) => {
  if (!['instructor', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden: Only instructor/admin can view reports' });
  }

  const { batchId } = req.params;
  const batches = loadBatches();
  const batch = batches.find(b => b.id === batchId);

  if (!batch) return res.status(404).json({ error: 'Batch not found' });

  const sessions = loadSessions().filter(s => s.batchId === batchId);
  const records = loadRecords();

  const attendance = {};

  // Initialize students from batch enrollments
  (batch.enrollments || []).forEach(enrollment => {
    attendance[enrollment.student_id] = {
      studentId: enrollment.student_id,
      present: 0,
      absent: 0,
      leave: 0,
      total: sessions.length,
    };
  });

  // Count attendance records
  records.forEach(record => {
    if (sessions.find(s => s.id === record.sessionId)) {
      if (attendance[record.studentId]) {
        attendance[record.studentId][record.status] = (attendance[record.studentId][record.status] || 0) + 1;
      }
    }
  });

  // Calculate percentage
  const attendanceArray = Object.values(attendance).map(a => ({
    ...a,
    percent: a.total > 0 ? Math.round((a.present / a.total) * 100) : 0,
  }));

  res.json({
    batchId,
    batchName: batch.name,
    totalSessions: sessions.length,
    attendance: attendanceArray,
  });
});

/**
 * GET /api/reports/student/:studentId/summary
 * Student-wise attendance summary (student/instructor/admin)
 * Response: { studentId, present, absent, leave, total, percent }
 */
router.get('/student/:studentId/summary', authMiddleware, (req, res) => {
  const { studentId } = req.params;

  // Students can only see their own summary
  if (req.user.role === 'student' && req.user.id !== studentId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const records = loadRecords().filter(r => r.studentId === studentId);
  const sessions = loadSessions();

  const summary = {
    studentId,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    leave: records.filter(r => r.status === 'leave').length,
    total: records.length,
  };

  summary.percent = summary.total > 0 ? Math.round((summary.present / summary.total) * 100) : 0;

  res.json(summary);
});

module.exports = router;
