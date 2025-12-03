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

    // create admin token
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const adminToken = jwt.sign({ id: 'admin-test-id', email: 'admin@test', role: 'admin' }, secret, { expiresIn: '1h' });

    console.log('\nPOST /api/courses (create)');
    const createCourse = await request('POST', host, port, '/api/courses', { code: 'CS101', title: 'Intro CS', description: 'Basics' }, { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` });
    console.log('CREATE COURSE', createCourse.status, createCourse.body);
    let courseId = null;
    try { courseId = JSON.parse(createCourse.body).course.id; } catch (e) {}

    console.log('\nGET /api/courses');
    const listCourses = await request('GET', host, port, '/api/courses');
    console.log('LIST COURSES', listCourses.status, listCourses.body);

    console.log('\nPOST /api/batches (create)');
    const createBatch = await request('POST', host, port, '/api/batches', { course_id: courseId, name: 'Batch A', start_date: '2025-12-10', end_date: '2026-03-10', is_active: true }, { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` });
    console.log('CREATE BATCH', createBatch.status, createBatch.body);
    let batchId = null;
    try { batchId = JSON.parse(createBatch.body).batch.id; } catch (e) {}

    console.log('\nGET /api/batches');
    const listBatches = await request('GET', host, port, `/api/batches?course_id=${courseId}&is_active=true`);
    console.log('LIST BATCHES', listBatches.status, listBatches.body);

    console.log('\nPOST /api/batches/:batchId/enroll (single)');
    const enroll = await request('POST', host, port, `/api/batches/${batchId}/enroll`, { student_id: 'student-1' }, { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` });
    console.log('ENROLL', enroll.status, enroll.body);

    console.log('\nPOST /api/batches/:batchId/enroll-bulk (bulk)');
    const enrollBulk = await request('POST', host, port, `/api/batches/${batchId}/enroll-bulk`, { students: ['student-2', 'student-3'] }, { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` });
    console.log('ENROLL BULK', enrollBulk.status, enrollBulk.body);

    await new Promise(r => srv.close(r));
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
