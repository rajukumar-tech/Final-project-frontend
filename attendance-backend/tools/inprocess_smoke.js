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
    // require the app without starting a separate server process
    const app = require('../src/index');

    // listen on ephemeral port
    const srv = app.listen(0, '127.0.0.1');
    await new Promise(r => srv.once('listening', r));
    const port = srv.address().port;
    console.log('In-process server listening on port', port);

    const host = '127.0.0.1';

    console.log('GET /');
    const root = await request('GET', host, port, '/');
    console.log('ROOT', root.status, root.body);

    console.log('\nPOST /api/auth/register');
    const reg = await request('POST', host, port, '/api/auth/register', { email: 'inproc@example.com', password: 'pass1234', name: 'InProc' }, { 'Content-Type': 'application/json' });
    console.log('REGISTER', reg.status, reg.body);

    console.log('\nPOST /api/auth/login');
    const login = await request('POST', host, port, '/api/auth/login', { email: 'inproc@example.com', password: 'pass1234' }, { 'Content-Type': 'application/json' });
    console.log('LOGIN', login.status, login.body);

    let token = null;
    try { token = JSON.parse(login.body || '{}').token; } catch (e) {}

    if (token) {
      console.log('\nGET /api/users/me');
      const me = await request('GET', host, port, '/api/users/me', null, { Authorization: `Bearer ${token}` });
      console.log('ME', me.status, me.body);
    } else {
      console.log('No token from login; skipping /api/users/me');
    }

    console.log('\nGET /api/roles');
    const roles = await request('GET', host, port, '/api/roles');
    console.log('ROLES', roles.status, roles.body);

    await new Promise(r => srv.close(r));
    process.exit(0);
  } catch (err) {
    console.error('In-process smoke error:', err);
    process.exit(1);
  }
})();
