const { spawn } = require('child_process');
const http = require('http');

// Start the server
console.log('Starting server on port 3000...');
const server = spawn('node', ['attendance-backend/src/index.js'], {
  cwd: __dirname.replace(/attendance-backend\/?$/, ''),
  stdio: 'inherit'
});

// Wait 2 seconds for server to start, then run smoke tests
setTimeout(() => {
  console.log('\n========== RUNNING SMOKE TESTS ==========\n');
  
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
      // Test 1: GET /
      console.log('1️⃣  GET http://localhost:3000/');
      const health = await request('GET', '/');
      console.log('   Status:', health.status);
      console.log('   Response:', health.body);

      // Test 2: Register
      console.log('\n2️⃣  POST http://localhost:3000/api/auth/register');
      console.log('   Body: { "email": "test@example.com", "password": "password123", "name": "Test User" }');
      const register = await request('POST', '/api/auth/register', {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
      console.log('   Status:', register.status);
      console.log('   Response:', register.body);

      // Test 3: Login
      console.log('\n3️⃣  POST http://localhost:3000/api/auth/login');
      console.log('   Body: { "email": "test@example.com", "password": "password123" }');
      const login = await request('POST', '/api/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('   Status:', login.status);
      console.log('   Response:', login.body);

      console.log('\n========== TESTS COMPLETE ==========\n');
      process.exit(0);
    } catch (e) {
      console.error('❌ Smoke test error:', e.message);
      process.exit(1);
    }
  })();
}, 2000);
