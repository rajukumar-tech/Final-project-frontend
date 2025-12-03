const http = require('http');

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
    const host = '127.0.0.1';
    console.log('Server listening on', port);

    // Login as existing inproc user
    const login = await request('POST', host, port, '/api/auth/login', { email: 'inproc@example.com', password: 'pass1234' }, { 'Content-Type': 'application/json' });
    console.log('LOGIN', login.status, login.body);
    let token = null;
    let userId = null;
    try {
      const parsed = JSON.parse(login.body || '{}');
      token = parsed.token;
      userId = parsed.user && parsed.user.id;
    } catch (e) {}

    if (!token || !userId) {
      console.error('Login failed; cannot proceed with PATCH test');
      srv.close();
      process.exit(1);
    }

    // PATCH update name
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    const patch = await request('PATCH', host, port, `/api/users/${userId}`, { name: 'InProcUpdated' }, headers);
    console.log('PATCH', patch.status, patch.body);

    // GET /api/users/me
    const me = await request('GET', host, port, '/api/users/me', null, { Authorization: `Bearer ${token}` });
    console.log('ME', me.status, me.body);

    await new Promise(r => srv.close(r));
    process.exit(0);
  } catch (err) {
    console.error('Patch test error:', err);
    process.exit(1);
  }
})();
