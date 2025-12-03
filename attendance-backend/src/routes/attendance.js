const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const SESSIONS_FILE = path.join(__dirname, '../../dev_sessions.json');
const RECORDS_FILE = path.join(__dirname, '../../dev_records.json');

// Helper to load/save sessions
function loadSessions() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function saveSessions(data) {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(data, null, 2));
}

// Helper to load/save records
function loadRecords() {
  try {
    if (fs.existsSync(RECORDS_FILE)) return JSON.parse(fs.readFileSync(RECORDS_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function saveRecords(data) {
  fs.writeFileSync(RECORDS_FILE, JSON.stringify(data, null, 2));
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
 * POST /api/attendance/sessions
 * Create attendance session (instructor/admin only)
 * Body: { batchId, sessionDate, sessionLabel?, duration? }
 */
router.post(
  '/sessions',
  authMiddleware,
  body('batchId').notEmpty(),
  body('sessionDate').isISO8601(),
  (req, res) => {
    if (!['instructor', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Only instructor/admin can create sessions' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { batchId, sessionDate, sessionLabel, duration } = req.body;
    const sessions = loadSessions();

    const newSession = {
      id: `session_${Date.now()}`,
      batchId,
      instructorId: req.user.id,
      sessionDate: new Date(sessionDate).toISOString(),
      sessionLabel: sessionLabel || null,
      duration: duration || null,
      createdAt: new Date().toISOString(),
    };

    sessions.push(newSession);
    saveSessions(sessions);

    res.status(201).json({ session: newSession });
  }
);

/**
 * GET /api/attendance/sessions
 * List attendance sessions (with optional filters)
 * Query: { batchId?, instructorId?, fromDate?, toDate? }
 */
router.get('/sessions', authMiddleware, (req, res) => {
  const sessions = loadSessions();
  const { batchId, instructorId, fromDate, toDate } = req.query;

  let filtered = sessions;
  if (batchId) filtered = filtered.filter(s => s.batchId === batchId);
  if (instructorId) filtered = filtered.filter(s => s.instructorId === instructorId);
  if (fromDate) filtered = filtered.filter(s => new Date(s.sessionDate) >= new Date(fromDate));
  if (toDate) filtered = filtered.filter(s => new Date(s.sessionDate) <= new Date(toDate));

  res.json({ sessions: filtered });
});

/**
 * POST /api/attendance/sessions/:sessionId/records
 * Bulk upsert attendance records for a session (instructor/admin only)
 * Body: { records: [{ studentId, status, remarks? }] }
 */
router.post(
  '/sessions/:sessionId/records',
  authMiddleware,
  body('records').isArray(),
  (req, res) => {
    if (!['instructor', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Only instructor/admin can create records' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { sessionId } = req.params;
    const { records } = req.body;

    const allRecords = loadRecords();
    const newRecords = [];

    records.forEach(({ studentId, status, remarks }) => {
      // Check if record exists
      const existing = allRecords.find(r => r.sessionId === sessionId && r.studentId === studentId);
      if (existing) {
        existing.status = status;
        existing.remarks = remarks || null;
        existing.updatedAt = new Date().toISOString();
      } else {
        const record = {
          id: `record_${Date.now()}_${Math.random()}`,
          sessionId,
          studentId,
          status,
          remarks: remarks || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        allRecords.push(record);
        newRecords.push(record);
      }
    });

    saveRecords(allRecords);
    res.status(201).json({ records: newRecords, upserted: allRecords.filter(r => r.sessionId === sessionId) });
  }
);

/**
 * GET /api/attendance/sessions/:sessionId/records
 * Get attendance records for a session (instructor/admin/student)
 * Query: { studentId? } (students can only see their own records)
 */
router.get('/sessions/:sessionId/records', authMiddleware, (req, res) => {
  const { sessionId } = req.params;
  const { studentId } = req.query;

  let records = loadRecords().filter(r => r.sessionId === sessionId);

  // Students can only see their own records
  if (req.user.role === 'student') {
    records = records.filter(r => r.studentId === req.user.id);
  } else if (studentId) {
    records = records.filter(r => r.studentId === studentId);
  }

  res.json({ records });
});

module.exports = router;
