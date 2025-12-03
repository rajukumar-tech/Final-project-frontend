const http = require('http');
const jwt = require('jsonwebtoken');

function request(method, host, port, path, body, headers = {}) {
  const opts = { hostname: host, port, path, method, headers };
  return new Promise((resolve, reject) => {
    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const results = [];
function test(name, status, pass) {
  const icon = pass ? '✅' : '❌';
  results.push({ name, status, pass });
  console.log(`${icon} ${name} (${status})`);
}

(async () => {
  try {
    const app = require('../src/index');
    const srv = app.listen(0, '127.0.0.1');
    await new Promise(r => srv.once('listening', r));
    const port = srv.address().port;
    console.log('🚀 Server listening on port', port);
    console.log('=====================================\n');

    const host = '127.0.0.1';
    const secret = process.env.JWT_SECRET || 'dev_secret';
    
    const adminToken = jwt.sign({ id: 'admin-1', email: 'admin@test', role: 'admin' }, secret, { expiresIn: '1h' });
    const instructorToken = jwt.sign({ id: 'instructor-1', email: 'instructor@test', role: 'instructor' }, secret, { expiresIn: '1h' });
    const studentToken = jwt.sign({ id: 'student-1', email: 'student@test', role: 'student' }, secret, { expiresIn: '1h' });
    const headers = { 'Content-Type': 'application/json' };

    // ============ ORIGINAL ENDPOINTS ============
    console.log('📋 ORIGINAL ENDPOINTS:\n');

    // Health check
    let res = await request('GET', host, port, '/', null, {});
    test('GET / (Health Check)', res.status, res.status === 200);

    // Register
    res = await request('POST', host, port, '/api/auth/register',
      { email: 'test@example.com', password: 'password123', name: 'Test User' },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    test('POST /api/auth/register', res.status, res.status === 201);

    // Login
    res = await request('POST', host, port, '/api/auth/login',
      { email: 'test@example.com', password: 'password123' },
      { ...headers });
    test('POST /api/auth/login', res.status, res.status === 200);
    let userToken = '';
    let userId = '';
    try { 
      const loginRes = JSON.parse(res.body);
      userToken = loginRes.token;
      userId = loginRes.user?.id;
    } catch (e) {}

    // Get current user
    res = await request('GET', host, port, '/api/users/me', null,
      { Authorization: `Bearer ${userToken}` });
    test('GET /api/users/me', res.status, res.status === 200);

    // Update user (use the actual userId from login)
    res = await request('PATCH', host, port, `/api/users/${userId}`,
      { name: 'Updated User' },
      { ...headers, Authorization: `Bearer ${userToken}` });
    test('PATCH /api/users/:id', res.status, res.status === 200);

    // Get roles
    res = await request('GET', host, port, '/api/roles', null,
      { Authorization: `Bearer ${userToken}` });
    test('GET /api/roles', res.status, res.status === 200);

    // ============ COURSE & BATCH ENDPOINTS ============
    console.log('\n📚 COURSE & BATCH ENDPOINTS:\n');

    // Create course
    res = await request('POST', host, port, '/api/courses',
      { code: 'FULLSTACK', title: 'Full Stack Development', description: 'Complete course' },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    test('POST /api/courses (Create)', res.status, res.status === 201);
    let courseId = '';
    try { courseId = JSON.parse(res.body).course?.id; } catch (e) {}

    // Get courses
    res = await request('GET', host, port, '/api/courses', null,
      { Authorization: `Bearer ${userToken}` });
    test('GET /api/courses (List)', res.status, res.status === 200);

    // Create batch
    res = await request('POST', host, port, '/api/batches',
      { course_id: courseId, name: 'Full Stack Batch 1', start_date: '2025-12-01', end_date: '2026-03-31', is_active: true },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    test('POST /api/batches (Create)', res.status, res.status === 201);
    let batchId = '';
    try { batchId = JSON.parse(res.body).batch?.id; } catch (e) {}

    // Get batches
    res = await request('GET', host, port, '/api/batches', null,
      { Authorization: `Bearer ${userToken}` });
    test('GET /api/batches (List)', res.status, res.status === 200);

    // Enroll single student
    res = await request('POST', host, port, `/api/batches/${batchId}/enroll`,
      { student_id: 'student-1' },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    test('POST /api/batches/:id/enroll (Single)', res.status, res.status === 201);

    // Enroll bulk students
    res = await request('POST', host, port, `/api/batches/${batchId}/enroll-bulk`,
      { students: ['student-2', 'student-3', 'student-4'] },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    test('POST /api/batches/:id/enroll-bulk (Bulk)', res.status, res.status === 201);

    // ============ BATCH INSTRUCTOR ENDPOINTS ============
    console.log('\n👨‍🏫 BATCH INSTRUCTOR ENDPOINTS:\n');

    // Get batch students (should work after we assign instructor)
    res = await request('GET', host, port, `/api/batches/${batchId}/students`, null,
      { Authorization: `Bearer ${instructorToken}` });
    test('GET /api/batches/:id/students (Before assignment)', res.status, res.status === 403);

    // Assign instructor
    res = await request('POST', host, port, `/api/batches/${batchId}/assign-instructor`,
      { instructorId: 'instructor-1' },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    test('POST /api/batches/:id/assign-instructor', res.status, res.status === 201);

    // Get batch students (should work now)
    res = await request('GET', host, port, `/api/batches/${batchId}/students`, null,
      { Authorization: `Bearer ${instructorToken}` });
    test('GET /api/batches/:id/students (After assignment)', res.status, res.status === 200);

    // Remove instructor
    res = await request('DELETE', host, port, `/api/batches/${batchId}/assign-instructor/instructor-1`, null,
      { Authorization: `Bearer ${adminToken}` });
    test('DELETE /api/batches/:id/assign-instructor/:instructorId', res.status, res.status === 200);

    // Re-assign for further tests
    await request('POST', host, port, `/api/batches/${batchId}/assign-instructor`,
      { instructorId: 'instructor-1' },
      { ...headers, Authorization: `Bearer ${adminToken}` });

    // ============ ATTENDANCE SESSIONS ============
    console.log('\n📅 ATTENDANCE SESSION ENDPOINTS:\n');

    // Create session
    res = await request('POST', host, port, '/api/attendance/sessions',
      { batchId, sessionDate: new Date().toISOString(), sessionLabel: 'morning', duration: 60 },
      { ...headers, Authorization: `Bearer ${instructorToken}` });
    test('POST /api/attendance/sessions (Create)', res.status, res.status === 201);
    let sessionId = '';
    try { sessionId = JSON.parse(res.body).session?.id; } catch (e) {}

    // Get sessions
    res = await request('GET', host, port, `/api/attendance/sessions?batchId=${batchId}`, null,
      { Authorization: `Bearer ${instructorToken}` });
    test('GET /api/attendance/sessions (List with filters)', res.status, res.status === 200);

    // ============ ATTENDANCE RECORDS ============
    console.log('\n✋ ATTENDANCE RECORD ENDPOINTS:\n');

    // Create attendance records
    res = await request('POST', host, port, `/api/attendance/sessions/${sessionId}/records`,
      {
        records: [
          { studentId: 'student-1', status: 'present', remarks: 'On time' },
          { studentId: 'student-2', status: 'absent', remarks: 'Sick' },
          { studentId: 'student-3', status: 'leave', remarks: 'Medical' },
          { studentId: 'student-4', status: 'present', remarks: 'Present' }
        ]
      },
      { ...headers, Authorization: `Bearer ${instructorToken}` });
    test('POST /api/attendance/sessions/:id/records (Bulk create)', res.status, res.status === 201);

    // Get all records
    res = await request('GET', host, port, `/api/attendance/sessions/${sessionId}/records`, null,
      { Authorization: `Bearer ${instructorToken}` });
    test('GET /api/attendance/sessions/:id/records (All)', res.status, res.status === 200);

    // Get student's own records
    res = await request('GET', host, port, `/api/attendance/sessions/${sessionId}/records`, null,
      { Authorization: `Bearer ${studentToken}` });
    test('GET /api/attendance/sessions/:id/records (Student own)', res.status, res.status === 200);

    // ============ REPORTS ============
    console.log('\n📊 REPORT ENDPOINTS:\n');

    // Batch attendance history
    res = await request('GET', host, port, `/api/reports/batch/${batchId}/history`, null,
      { Authorization: `Bearer ${instructorToken}` });
    test('GET /api/reports/batch/:id/history', res.status, res.status === 200);

    // Student summary (instructor view)
    res = await request('GET', host, port, '/api/reports/student/student-1/summary', null,
      { Authorization: `Bearer ${instructorToken}` });
    test('GET /api/reports/student/:id/summary (Instructor)', res.status, res.status === 200);

    // Student summary (student own)
    res = await request('GET', host, port, '/api/reports/student/student-1/summary', null,
      { Authorization: `Bearer ${studentToken}` });
    test('GET /api/reports/student/:id/summary (Student own)', res.status, res.status === 200);

    // ============ ADMIN ENDPOINTS ============
    console.log('\n⚙️  ADMIN ENDPOINTS:\n');

    // Admin instructor sessions
    res = await request('GET', host, port, '/api/admin/instructor-sessions?instructorId=instructor-1', null,
      { Authorization: `Bearer ${adminToken}` });
    test('GET /api/admin/instructor-sessions', res.status, res.status === 200);

    // ============ AUTHORIZATION TESTS ============
    console.log('\n🔐 AUTHORIZATION TESTS:\n');

    // No token
    res = await request('GET', host, port, '/api/attendance/sessions', null, {});
    test('Unauthorized access (no token)', res.status, res.status === 401);

    // Student trying to create session
    res = await request('POST', host, port, '/api/attendance/sessions',
      { batchId, sessionDate: new Date().toISOString(), sessionLabel: 'test' },
      { ...headers, Authorization: `Bearer ${studentToken}` });
    test('Forbidden: Student creating session', res.status, res.status === 403);

    // Instructor trying to access admin endpoint
    res = await request('GET', host, port, '/api/admin/instructor-sessions', null,
      { Authorization: `Bearer ${instructorToken}` });
    test('Forbidden: Instructor accessing admin endpoint', res.status, res.status === 403);

    // ============ SUMMARY ============
    console.log('\n=====================================');
    const passed = results.filter(r => r.pass).length;
    const total = results.length;
    const percentage = Math.round((passed / total) * 100);

    console.log(`\n📈 TEST SUMMARY:`);
    console.log(`   ✅ Passed: ${passed}/${total}`);
    console.log(`   ❌ Failed: ${total - passed}/${total}`);
    console.log(`   📊 Success Rate: ${percentage}%`);

    if (passed === total) {
      console.log('\n🎉 ALL ENDPOINTS WORKING PERFECTLY! 🎉\n');
    } else {
      console.log('\n⚠️  Some endpoints need attention:\n');
      results.filter(r => !r.pass).forEach(r => {
        console.log(`   ❌ ${r.name} (${r.status})`);
      });
    }

    console.log('=====================================\n');

    await new Promise(r => srv.close(r));
    process.exit(passed === total ? 0 : 1);
  } catch (err) {
    console.error('❌ Test execution error:', err.message);
    process.exit(1);
  }
})();
