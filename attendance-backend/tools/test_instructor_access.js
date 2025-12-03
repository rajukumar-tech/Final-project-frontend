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
    const adminToken = jwt.sign({ id: 'admin-1', email: 'admin@test', role: 'admin' }, secret, { expiresIn: '1h' });
    const instructorToken = jwt.sign({ id: 'instructor-1', email: 'instructor@test', role: 'instructor' }, secret, { expiresIn: '1h' });
    const headers = { 'Content-Type': 'application/json' };

    // Create course
    const courseRes = await request('POST', host, port, '/api/courses', 
      { code: 'CS301', title: 'Test Course', description: 'Test' }, 
      { ...headers, Authorization: `Bearer ${adminToken}` });
    const courseId = JSON.parse(courseRes.body).course?.id;
    console.log('Created course:', courseId);

    // Create batch
    const batchRes = await request('POST', host, port, '/api/batches',
      { course_id: courseId, name: 'Test Batch', start_date: '2025-12-01', end_date: '2026-03-31', is_active: true },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    const batchId = JSON.parse(batchRes.body).batch?.id;
    console.log('Created batch:', batchId);

    // Enroll students
    await request('POST', host, port, `/api/batches/${batchId}/enroll-bulk`,
      { students: ['student-1', 'student-2'] },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    console.log('Enrolled students');

    // FIRST: Try to list students BEFORE assigning instructor (should fail for instructor)
    console.log('\n=== Test 1: GET students BEFORE assignment ===');
    const beforeRes = await request('GET', host, port, `/api/batches/${batchId}/students`, null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', beforeRes.status);
    console.log('Body:', beforeRes.body);

    // Assign instructor
    const assignRes = await request('POST', host, port, `/api/batches/${batchId}/assign-instructor`,
      { instructorId: 'instructor-1' },
      { ...headers, Authorization: `Bearer ${adminToken}` });
    console.log('\n=== Assignment Response ===');
    console.log('Status:', assignRes.status, 'Assignment:', JSON.parse(assignRes.body).assignment);

    // THEN: Try to list students AFTER assigning instructor (should succeed)
    console.log('\n=== Test 2: GET students AFTER assignment ===');
    const afterRes = await request('GET', host, port, `/api/batches/${batchId}/students`, null,
      { Authorization: `Bearer ${instructorToken}` });
    console.log('Status:', afterRes.status);
    console.log('Body:', afterRes.body);

    // Also test with admin (should always work)
    console.log('\n=== Test 3: GET students as ADMIN ===');
    const adminRes = await request('GET', host, port, `/api/batches/${batchId}/students`, null,
      { Authorization: `Bearer ${adminToken}` });
    console.log('Status:', adminRes.status);
    console.log('Body:', adminRes.body);

    await new Promise(r => srv.close(r));
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
