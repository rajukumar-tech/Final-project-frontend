const http = require('http');

function request(method, path, body) {
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path,
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
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
    const g = await request('GET', '/');
    console.log(g);

    // Register
    console.log('\nPOST /api/auth/register');
    const r = await request('POST', '/api/auth/register', { email: 'test@example.com', password: 'password123', name: 'Test User' });
    console.log(r);

    // Login
    console.log('\nPOST /api/auth/login');
    const l = await request('POST', '/api/auth/login', { email: 'test@example.com', password: 'password123' });
    console.log(l);
  } catch (e) {
    console.error('Smoke test error:', e);
    process.exit(1);
  }
})();
