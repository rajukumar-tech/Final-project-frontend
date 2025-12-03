const http = require('http');

function request(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const port = process.argv[2] ? Number(process.argv[2]) : (process.env.PORT ? Number(process.env.PORT) : 3000);
  const options = {
    hostname: '127.0.0.1',
    port,
    path,
    method,
    headers,
    timeout: 7000
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    console.log('GET /');
    const root = await request('GET', '/');
    console.log(root);

    // Register (ignore conflict)
    console.log('\nPOST /api/auth/register');
    let reg = await request('POST', '/api/auth/register', { email: 'smoke@example.com', password: 'password123', name: 'Smoke Tester' });
    console.log(reg.status, reg.body);
    if (reg.status === 409) {
      console.log('User already exists, proceeding to login');
    }

    // Login
    console.log('\nPOST /api/auth/login');
    const login = await request('POST', '/api/auth/login', { email: 'smoke@example.com', password: 'password123' });
    console.log('LOGIN', login.status, login.body);
    if (login.status !== 200) process.exitCode = 2;

    let token = null;
    try {
      const parsed = JSON.parse(login.body || '{}');
      token = parsed.token || null;
    } catch (e) {}

    if (!token) {
      console.error('No token returned from login; aborting further protected calls');
      return;
    }

    // GET /api/users/me
    console.log('\nGET /api/users/me');
    const me = await request('GET', '/api/users/me', null, token);
    console.log('ME', me.status, me.body);

    // GET /api/roles
    console.log('\nGET /api/roles');
    const roles = await request('GET', '/api/roles');
    console.log('ROLES', roles.status, roles.body);

  } catch (e) {
    console.error('Smoke error:', e);
    process.exit(1);
  }
})();
