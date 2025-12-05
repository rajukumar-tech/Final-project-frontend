// Comprehensive seed script for AttendanceHub
// Seeds all JSON files with sample data for testing

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// File paths
const USERS_FILE = path.join(__dirname, 'dev_users.json');
const COURSES_FILE = path.join(__dirname, 'dev_courses.json');
const BATCHES_FILE = path.join(__dirname, 'dev_batches.json');
const SESSIONS_FILE = path.join(__dirname, 'dev_sessions.json');
const RECORDS_FILE = path.join(__dirname, 'dev_records.json');
const BATCH_INSTRUCTORS_FILE = path.join(__dirname, 'dev_batch_instructors.json');

// Helper to write JSON
function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✓ Created ${path.basename(filePath)}`);
}

async function seed() {
    console.log('====================================');
    console.log('Seeding AttendanceHub Database...');
    console.log('====================================\n');

    const now = new Date().toISOString();

    // =====================
    // 1. USERS
    // =====================
    console.log('Creating users...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const adminHash = await bcrypt.hash('admin123', 10);

    const users = [
        {
            id: 'admin-001',
            email: 'admin@example.com',
            password: adminHash,
            name: 'System Admin',
            role: 'admin',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'instructor-001',
            email: 'instructor1@example.com',
            password: passwordHash,
            name: 'John Smith',
            role: 'instructor',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'instructor-002',
            email: 'instructor2@example.com',
            password: passwordHash,
            name: 'Jane Doe',
            role: 'instructor',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'student-001',
            email: 'student1@example.com',
            password: passwordHash,
            name: 'Alice Johnson',
            role: 'student',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'student-002',
            email: 'student2@example.com',
            password: passwordHash,
            name: 'Bob Williams',
            role: 'student',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'student-003',
            email: 'student3@example.com',
            password: passwordHash,
            name: 'Charlie Brown',
            role: 'student',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'student-004',
            email: 'student4@example.com',
            password: passwordHash,
            name: 'Diana Prince',
            role: 'student',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'student-005',
            email: 'student5@example.com',
            password: passwordHash,
            name: 'Edward Miller',
            role: 'student',
            createdAt: now,
            updatedAt: now
        }
    ];

    writeJSON(USERS_FILE, users);

    // =====================
    // 2. COURSES
    // =====================
    console.log('Creating courses...');
    const courses = [
        {
            id: 'course-001',
            code: 'CS101',
            title: 'Introduction to Computer Science',
            description: 'Fundamentals of programming and computer science concepts',
            createdAt: now
        },
        {
            id: 'course-002',
            code: 'CS201',
            title: 'Data Structures and Algorithms',
            description: 'Advanced programming concepts including data structures',
            createdAt: now
        },
        {
            id: 'course-003',
            code: 'CS301',
            title: 'Web Development',
            description: 'Full stack web development with modern technologies',
            createdAt: now
        },
        {
            id: 'course-004',
            code: 'MATH101',
            title: 'Calculus I',
            description: 'Introduction to differential and integral calculus',
            createdAt: now
        }
    ];

    writeJSON(COURSES_FILE, courses);

    // =====================
    // 3. BATCHES
    // =====================
    console.log('Creating batches...');
    const batches = [
        {
            id: 'batch-001',
            course_id: 'course-001',
            name: 'CS101 - Morning Batch A',
            start_date: '2025-01-01',
            end_date: '2025-06-30',
            is_active: true,
            enrollments: [
                { id: 'enroll-001', student_id: 'student-001', enrolledAt: now },
                { id: 'enroll-002', student_id: 'student-002', enrolledAt: now },
                { id: 'enroll-003', student_id: 'student-003', enrolledAt: now }
            ],
            createdAt: now
        },
        {
            id: 'batch-002',
            course_id: 'course-001',
            name: 'CS101 - Afternoon Batch B',
            start_date: '2025-01-01',
            end_date: '2025-06-30',
            is_active: true,
            enrollments: [
                { id: 'enroll-004', student_id: 'student-004', enrolledAt: now },
                { id: 'enroll-005', student_id: 'student-005', enrolledAt: now }
            ],
            createdAt: now
        },
        {
            id: 'batch-003',
            course_id: 'course-002',
            name: 'DSA - Weekend Batch',
            start_date: '2025-02-01',
            end_date: '2025-07-31',
            is_active: true,
            enrollments: [
                { id: 'enroll-006', student_id: 'student-001', enrolledAt: now },
                { id: 'enroll-007', student_id: 'student-002', enrolledAt: now },
                { id: 'enroll-008', student_id: 'student-004', enrolledAt: now }
            ],
            createdAt: now
        },
        {
            id: 'batch-004',
            course_id: 'course-003',
            name: 'Web Dev - Evening Batch',
            start_date: '2025-03-01',
            end_date: '2025-08-31',
            is_active: true,
            enrollments: [
                { id: 'enroll-009', student_id: 'student-003', enrolledAt: now },
                { id: 'enroll-010', student_id: 'student-005', enrolledAt: now }
            ],
            createdAt: now
        }
    ];

    writeJSON(BATCHES_FILE, batches);

    // =====================
    // 4. BATCH INSTRUCTORS
    // =====================
    console.log('Assigning instructors to batches...');
    const batchInstructors = [
        { id: 'bi-001', batchId: 'batch-001', instructorId: 'instructor-001', createdAt: now },
        { id: 'bi-002', batchId: 'batch-002', instructorId: 'instructor-001', createdAt: now },
        { id: 'bi-003', batchId: 'batch-003', instructorId: 'instructor-002', createdAt: now },
        { id: 'bi-004', batchId: 'batch-004', instructorId: 'instructor-002', createdAt: now }
    ];

    writeJSON(BATCH_INSTRUCTORS_FILE, batchInstructors);

    // =====================
    // 5. ATTENDANCE SESSIONS
    // =====================
    console.log('Creating attendance sessions...');
    const sessions = [
        {
            id: 'session-001',
            batchId: 'batch-001',
            instructorId: 'instructor-001',
            sessionDate: '2025-01-15T09:00:00.000Z',
            sessionLabel: 'Morning',
            duration: 60,
            createdAt: now
        },
        {
            id: 'session-002',
            batchId: 'batch-001',
            instructorId: 'instructor-001',
            sessionDate: '2025-01-16T09:00:00.000Z',
            sessionLabel: 'Morning',
            duration: 60,
            createdAt: now
        },
        {
            id: 'session-003',
            batchId: 'batch-001',
            instructorId: 'instructor-001',
            sessionDate: '2025-01-17T09:00:00.000Z',
            sessionLabel: 'Morning',
            duration: 60,
            createdAt: now
        },
        {
            id: 'session-004',
            batchId: 'batch-002',
            instructorId: 'instructor-001',
            sessionDate: '2025-01-15T14:00:00.000Z',
            sessionLabel: 'Afternoon',
            duration: 60,
            createdAt: now
        },
        {
            id: 'session-005',
            batchId: 'batch-003',
            instructorId: 'instructor-002',
            sessionDate: '2025-02-08T10:00:00.000Z',
            sessionLabel: 'Weekend',
            duration: 120,
            createdAt: now
        }
    ];

    writeJSON(SESSIONS_FILE, sessions);

    // =====================
    // 6. ATTENDANCE RECORDS
    // =====================
    console.log('Creating attendance records...');
    const records = [
        // Session 1 - Batch 001
        { id: 'record-001', sessionId: 'session-001', studentId: 'student-001', status: 'present', remarks: 'On time', createdAt: now, updatedAt: now },
        { id: 'record-002', sessionId: 'session-001', studentId: 'student-002', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-003', sessionId: 'session-001', studentId: 'student-003', status: 'absent', remarks: 'Sick', createdAt: now, updatedAt: now },

        // Session 2 - Batch 001
        { id: 'record-004', sessionId: 'session-002', studentId: 'student-001', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-005', sessionId: 'session-002', studentId: 'student-002', status: 'leave', remarks: 'Medical appointment', createdAt: now, updatedAt: now },
        { id: 'record-006', sessionId: 'session-002', studentId: 'student-003', status: 'present', remarks: null, createdAt: now, updatedAt: now },

        // Session 3 - Batch 001
        { id: 'record-007', sessionId: 'session-003', studentId: 'student-001', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-008', sessionId: 'session-003', studentId: 'student-002', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-009', sessionId: 'session-003', studentId: 'student-003', status: 'present', remarks: null, createdAt: now, updatedAt: now },

        // Session 4 - Batch 002
        { id: 'record-010', sessionId: 'session-004', studentId: 'student-004', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-011', sessionId: 'session-004', studentId: 'student-005', status: 'absent', remarks: 'No show', createdAt: now, updatedAt: now },

        // Session 5 - Batch 003
        { id: 'record-012', sessionId: 'session-005', studentId: 'student-001', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-013', sessionId: 'session-005', studentId: 'student-002', status: 'present', remarks: null, createdAt: now, updatedAt: now },
        { id: 'record-014', sessionId: 'session-005', studentId: 'student-004', status: 'present', remarks: null, createdAt: now, updatedAt: now }
    ];

    writeJSON(RECORDS_FILE, records);

    // =====================
    // SUMMARY
    // =====================
    console.log('\n====================================');
    console.log('Database Seeding Complete!');
    console.log('====================================');
    console.log('\nCreated:');
    console.log(`  - ${users.length} users (1 admin, 2 instructors, 5 students)`);
    console.log(`  - ${courses.length} courses`);
    console.log(`  - ${batches.length} batches`);
    console.log(`  - ${batchInstructors.length} instructor assignments`);
    console.log(`  - ${sessions.length} attendance sessions`);
    console.log(`  - ${records.length} attendance records`);
    console.log('\n====================================');
    console.log('Login Credentials:');
    console.log('====================================');
    console.log('\nAdmin:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');
    console.log('\nInstructors:');
    console.log('  Email: instructor1@example.com');
    console.log('  Email: instructor2@example.com');
    console.log('  Password: password123');
    console.log('\nStudents:');
    console.log('  Email: student1@example.com (thru student5)');
    console.log('  Password: password123');
    console.log('\n====================================\n');
}

seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
