const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const INSTRUCTORS_FILE = path.join(__dirname, '../../dev_batch_instructors.json');
const SESSIONS_FILE = path.join(__dirname, '../../dev_sessions.json');

// Helper functions
function loadInstructors() {
  try {
    if (fs.existsSync(INSTRUCTORS_FILE)) return JSON.parse(fs.readFileSync(INSTRUCTORS_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function loadSessions() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
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
 * GET /api/admin/instructor-sessions
 * Sessions taken by an instructor filtered by date (admin only)
 * Query: { instructorId?, fromDate?, toDate? }
 * Response: { sessions: [{ sessionId, batchId, sessionDate, sessionLabel, duration }] }
 */
router.get('/instructor-sessions', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Only admin can view instructor sessions' });
  }

  const { instructorId, fromDate, toDate } = req.query;

  let sessions = loadSessions();

  if (instructorId) {
    sessions = sessions.filter(s => s.instructorId === instructorId);
  }

  if (fromDate) {
    const from = new Date(fromDate);
    sessions = sessions.filter(s => new Date(s.sessionDate) >= from);
  }

  if (toDate) {
    const to = new Date(toDate);
    sessions = sessions.filter(s => new Date(s.sessionDate) <= to);
  }

  // Enrich with instructor info
  const instructors = loadInstructors();
  const enriched = sessions.map(session => {
    const assignment = instructors.find(i => i.instructorId === session.instructorId);
    return {
      sessionId: session.id,
      batchId: session.batchId,
      instructorId: session.instructorId,
      instructorAssignmentId: assignment?.id,
      sessionDate: session.sessionDate,
      sessionLabel: session.sessionLabel,
      duration: session.duration,
    };
  });

  res.json({ sessions: enriched });
});

module.exports = router;
