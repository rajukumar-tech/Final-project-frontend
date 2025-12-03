const http = require('http');
const fs = require('fs');

function request(method, path, body, token, port) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const options = { hostname: '127.0.0.1', port: port || 3000, path, method, headers, timeout: 7000 };
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
  const out = {};
  // Try to auto-detect a reachable port. Start with CLI arg, then env PORT, then common dev ports.
  const candidates = [];
  if (process.argv[2]) candidates.push(Number(process.argv[2]));
  if (process.env.PORT) candidates.push(Number(process.env.PORT));
  candidates.push(3000, 5000, 8000);

  let port = null;
  for (const p of candidates) {
    try {
      await request('GET', '/', null, null, p);
      port = p;
      break;
    } catch (e) {
      // try next
    }
  }

  if (!port) {
    out.error = 'No reachable server detected on candidate ports: ' + JSON.stringify(candidates);
    fs.writeFileSync('tools/smoke_output.json', JSON.stringify(out, null, 2));
    console.log('WROTE tools/smoke_output.json (no server)');
    return;
  }

  out.detectedPort = port;
  try {
    out.root = await request('GET', '/', null, null, port);
  } catch (e) { out.rootError = String(e); }

  try {
    out.register = await request('POST', '/api/auth/register', { email: 'smoke@example.com', password: 'password123', name: 'Smoke' }, null, port);
  } catch (e) { out.registerError = String(e); }

  try {
    out.login = await request('POST', '/api/auth/login', { email: 'smoke@example.com', password: 'password123' }, null, port);
  } catch (e) { out.loginError = String(e); }

  let token = null;
  try { token = JSON.parse(out.login.body || '{}').token; } catch (e) {}

  try {
    out.me = await request('GET', '/api/users/me', null, token, port);
  } catch (e) { out.meError = String(e); }

  try {
    out.roles = await request('GET', '/api/roles', null, null, port);
  } catch (e) { out.rolesError = String(e); }

  fs.writeFileSync('tools/smoke_output.json', JSON.stringify(out, null, 2));
  console.log('WROTE tools/smoke_output.json');
})();
