const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BATCHES_FILE = path.join(__dirname, '../../dev_batches.json');
const INSTRUCTORS_FILE = path.join(__dirname, '../../dev_batch_instructors.json');

// Helper functions
function loadBatches() {
  try {
    if (fs.existsSync(BATCHES_FILE)) return JSON.parse(fs.readFileSync(BATCHES_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function loadInstructors() {
  try {
    if (fs.existsSync(INSTRUCTORS_FILE)) return JSON.parse(fs.readFileSync(INSTRUCTORS_FILE, 'utf8'));
  } catch (e) {}
  return [];
}

function saveInstructors(data) {
  fs.writeFileSync(INSTRUCTORS_FILE, JSON.stringify(data, null, 2));
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
 * GET /api/batches/:batchId/students
 * List students in a batch (instructor/admin/student in batch)
 * Response: { students: [{ studentId, name?, enrolledAt }] }
 */
router.get('/:batchId/students', authMiddleware, (req, res) => {
  const { batchId } = req.params;
  const batches = loadBatches();
  const batch = batches.find(b => b.id === batchId);

  if (!batch) return res.status(404).json({ error: 'Batch not found' });

  // Check if user has access (instructor/admin or enrolled student)
  const instructors = loadInstructors();
  const batchInstructors = instructors.filter(i => i.batchId === batchId);
  const isInstructor = req.user.role === 'instructor' && batchInstructors.some(i => i.instructorId === req.user.id);
  const isEnrolled = batch.enrollments?.some(e => e.student_id === req.user.id);
  const isAdmin = req.user.role === 'admin';

  // Allow access for admin, assigned instructor, or enrolled student
  if (!isAdmin && !isInstructor && !isEnrolled) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const students = (batch.enrollments || []).map(e => ({
    studentId: e.student_id,
    name: e.name,
    enrolledAt: e.enrolledAt,
  }));

  res.json({ students });
});

/**
 * POST /api/batches/:batchId/assign-instructor
 * Assign instructor to batch (admin only)
 * Body: { instructorId }
 */
router.post(
  '/:batchId/assign-instructor',
  authMiddleware,
  body('instructorId').notEmpty(),
  (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin can assign instructors' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { batchId } = req.params;
    const { instructorId } = req.body;

    const batches = loadBatches();
    const batch = batches.find(b => b.id === batchId);

    if (!batch) return res.status(404).json({ error: 'Batch not found' });

    const instructors = loadInstructors();
    const existing = instructors.find(i => i.batchId === batchId && i.instructorId === instructorId);

    if (existing) {
      return res.status(409).json({ error: 'Instructor already assigned to batch' });
    }

    const assignment = {
      id: `instructor_${Date.now()}`,
      batchId,
      instructorId,
      createdAt: new Date().toISOString(),
    };

    instructors.push(assignment);
    saveInstructors(instructors);

    res.status(201).json({ assignment });
  }
);

/**
 * DELETE /api/batches/:batchId/assign-instructor/:instructorId
 * Remove instructor from batch (admin only)
 */
router.delete(
  '/:batchId/assign-instructor/:instructorId',
  authMiddleware,
  (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin can remove instructors' });
    }

    const { batchId, instructorId } = req.params;
    const instructors = loadInstructors();
    const index = instructors.findIndex(i => i.batchId === batchId && i.instructorId === instructorId);

    if (index === -1) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    const removed = instructors.splice(index, 1)[0];
    saveInstructors(instructors);

    res.json({ removed, message: 'Instructor removed from batch' });
  }
);

module.exports = router;
