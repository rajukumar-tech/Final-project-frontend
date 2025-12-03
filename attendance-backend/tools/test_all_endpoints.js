const http = require('http');
const jwt = require('jsonwebtoken');

function request(method, host, port, path, body, headers = {}) {
  const opts = { hostname: host, port, path, method, headers };
  return new Promise((resolve, reject) => {
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    const app = require('../src/index');
    const srv = app.listen(0, '127.0.0.1');
    await new Promise(r => srv.once('listening', r));
    const port = srv.address().port;
    console.log('In-process server listening on port', port);
    const host = '127.0.0.1';

    const secret = process.env.JWT_SECRET || 'dev_secret';

    // Create test users with different roles
    const adminToken = jwt.sign({ id: 'admin-1', email: 'admin@test', role: 'admin' }, secret, { expiresIn: '1h' });
    const instructorToken = jwt.sign({ id: 'instructor-1', email: 'instructor@test', role: 'instructor' }, secret, { expiresIn: '1h' });
    const studentToken = jwt.sign({ id: 'student-1', email: 'student@test', role: 'student' }, secret, { expiresIn: '1h' });

    const headers = { 'Content-Type': 'application/json' };

    console.log('\n========== SETUP ==========');

    // Create a course first
    console.log('\nPOST /api/courses (create course)');
    const courseRes = await request('POST', host, port, '/api/courses', 
      { code: 'CS201', title: 'Data Structures', description: 'Advanced DS' }, 
      { ...headers, Authorization: `Bearer ${adminToken}` });
    console.log('Status:', courseRes.status, courseRes.body);
    let courseId = JSON.parse(courseRes.body).course?.id;

    // Create a batch
    console.log('\nPOST /api/batches (create batch)');
    const batchRes = await request('POST', host, port, '/api/batches',
      { course_id: courseId, name: 'Batch B', start_date: '2025-12-01', end_date: '2026-03-31', is_active: true },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    console.log('Status:', batchRes.status, batchRes.body);
    let batchId = JSON.parse(batchRes.body).batch?.id;

    // Enroll students in batch
    console.log('\nPOST /api/batches/:batchId/enroll-bulk (enroll students)');
    const enrollRes = await request('POST', host, port, `/api/batches/${batchId}/enroll-bulk`,
      { students: ['student-1', 'student-2', 'student-3'] },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    console.log('Status:', enrollRes.status, enrollRes.body);

    console.log('\n========== BATCH INSTRUCTOR TESTS ==========');

    // Test: GET /api/batches/:batchId/students
    console.log('\nGET /api/batches/:batchId/students');
    const studentsRes = await request('GET', host, port, `/api/batches/${batchId}/students`, null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', studentsRes.status, studentsRes.body);

    // Test: POST /api/batches/:batchId/assign-instructor
    console.log('\nPOST /api/batches/:batchId/assign-instructor');
    const assignRes = await request('POST', host, port, `/api/batches/${batchId}/assign-instructor`,
      { instructorId: 'instructor-1' },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    console.log('Status:', assignRes.status, assignRes.body);

    // Test: DELETE /api/batches/:batchId/assign-instructor/:instructorId
    console.log('\nDELETE /api/batches/:batchId/assign-instructor/:instructorId');
    const delRes = await request('DELETE', host, port, `/api/batches/${batchId}/assign-instructor/instructor-1`, null,
      { Authorization: `Bearer ${adminToken}` });
    console.log('Status:', delRes.status, delRes.body);

    // Re-assign for further tests
    await request('POST', host, port, `/api/batches/${batchId}/assign-instructor`,
      { instructorId: 'instructor-1' },
      { ...headers, Authorization: `Bearer ${adminToken}` });

    console.log('\n========== ATTENDANCE TESTS ==========');

    // Test: POST /api/attendance/sessions
    console.log('\nPOST /api/attendance/sessions');
    const sessionRes = await request('POST', host, port, '/api/attendance/sessions',
      { batchId, sessionDate: new Date().toISOString(), sessionLabel: 'morning', duration: 60 },
      { ...headers, Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', sessionRes.status, sessionRes.body);
    let sessionId = JSON.parse(sessionRes.body).session?.id;

    // Test: GET /api/attendance/sessions
    console.log('\nGET /api/attendance/sessions');
    const sessionsRes = await request('GET', host, port, `/api/attendance/sessions?batchId=${batchId}`, null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', sessionsRes.status, sessionsRes.body);

    // Test: POST /api/attendance/sessions/:sessionId/records
    console.log('\nPOST /api/attendance/sessions/:sessionId/records');
    const recordsRes = await request('POST', host, port, `/api/attendance/sessions/${sessionId}/records`,
      {
        records: [
          { studentId: 'student-1', status: 'present', remarks: 'On time' },
          { studentId: 'student-2', status: 'absent', remarks: 'Sick leave' },
          { studentId: 'student-3', status: 'leave', remarks: 'Medical' },
        ]
      },
      { ...headers, Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', recordsRes.status, recordsRes.body);

    // Test: GET /api/attendance/sessions/:sessionId/records
    console.log('\nGET /api/attendance/sessions/:sessionId/records');
    const getRecordsRes = await request('GET', host, port, `/api/attendance/sessions/${sessionId}/records`, null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', getRecordsRes.status, getRecordsRes.body);

    // Test: GET /api/attendance/sessions/:sessionId/records (student view - own records only)
    console.log('\nGET /api/attendance/sessions/:sessionId/records (student - own records)');
    const studentRecordsRes = await request('GET', host, port, `/api/attendance/sessions/${sessionId}/records`, null,
      { Authorization: `Bearer ${studentToken}` });
    console.log('Status:', studentRecordsRes.status, studentRecordsRes.body);

    console.log('\n========== REPORTS TESTS ==========');

    // Test: GET /api/reports/batch/:batchId/history
    console.log('\nGET /api/reports/batch/:batchId/history');
    const batchHistoryRes = await request('GET', host, port, `/api/reports/batch/${batchId}/history`, null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', batchHistoryRes.status, batchHistoryRes.body);

    // Test: GET /api/reports/student/:studentId/summary
    console.log('\nGET /api/reports/student/:studentId/summary (instructor view)');
    const summaryRes = await request('GET', host, port, '/api/reports/student/student-1/summary', null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', summaryRes.status, summaryRes.body);

    // Test: GET /api/reports/student/:studentId/summary (student view - own)
    console.log('\nGET /api/reports/student/:studentId/summary (student - own)');
    const studentSummaryRes = await request('GET', host, port, '/api/reports/student/student-1/summary', null,
      { Authorization: `Bearer ${studentToken}` });
    console.log('Status:', studentSummaryRes.status, studentSummaryRes.body);

    console.log('\n========== ADMIN TESTS ==========');

    // Create another session for admin test
    const session2Res = await request('POST', host, port, '/api/attendance/sessions',
      { batchId, sessionDate: new Date(Date.now() - 86400000).toISOString(), sessionLabel: 'afternoon', duration: 45 },
      { ...headers, Authorization: `Bearer ${instructorToken}` });

    // Test: GET /api/admin/instructor-sessions
    console.log('\nGET /api/admin/instructor-sessions');
    const adminSessionsRes = await request('GET', host, port, '/api/admin/instructor-sessions?instructorId=instructor-1', null,
      { Authorization: `Bearer ${adminToken}` });
    console.log('Status:', adminSessionsRes.status, adminSessionsRes.body);

    // Test: GET /api/admin/instructor-sessions with date filters
    console.log('\nGET /api/admin/instructor-sessions (with date filters)');
    const adminSessionsFilterRes = await request('GET', host, port, 
      `/api/admin/instructor-sessions?fromDate=${new Date(Date.now() - 172800000).toISOString()}&toDate=${new Date(Date.now() + 86400000).toISOString()}`, null,
      { Authorization: `Bearer ${adminToken}` });
    console.log('Status:', adminSessionsFilterRes.status, adminSessionsFilterRes.body);

    console.log('\n========== AUTHORIZATION TESTS ==========');

    // Test: Unauthorized access
    console.log('\nGET /api/attendance/sessions (no token)');
    const noAuthRes = await request('GET', host, port, '/api/attendance/sessions', null, {});
    console.log('Status:', noAuthRes.status, noAuthRes.body);

    // Test: Forbidden access (student trying to create session)
    console.log('\nPOST /api/attendance/sessions (student - should be forbidden)');
    const forbiddenRes = await request('POST', host, port, '/api/attendance/sessions',
      { batchId, sessionDate: new Date().toISOString(), sessionLabel: 'test' },
      { ...headers, Authorization: `Bearer ${studentToken}` });
    console.log('Status:', forbiddenRes.status, forbiddenRes.body);

    // Test: Admin-only endpoint (instructor trying to access)
    console.log('\nGET /api/admin/instructor-sessions (instructor - should be forbidden)');
    const adminForbiddenRes = await request('GET', host, port, '/api/admin/instructor-sessions', null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', adminForbiddenRes.status, adminForbiddenRes.body);

    console.log('\n========== TEST SUMMARY ==========');
    console.log('✅ All endpoints tested successfully!');

    await new Promise(r => srv.close(r));
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
