#!/usr/bin/env node
/**
 * Frontend Development Server
 * Serves the React/Vite app and proxies API calls to backend on :3001
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3001;
const HOST = 'localhost';

// Determine where to serve from: build/ if exists, else public/
const buildDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
const serveDir = fs.existsSync(buildDir) ? buildDir : publicDir;

console.log(`✅ Frontend Server Starting...\n`);
console.log(`Serving from: ${serveDir}\n`);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle API proxy to backend
  if (pathname.startsWith('/api/')) {
    proxyToBackend(req, res, pathname);
    return;
  }

  // Serve static files from build/public directory
  let filePath = path.join(serveDir, pathname === '/' ? 'index.html' : pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(serveDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  let exists = false;
  let isDir = false;
  try {
    const stats = fs.statSync(filePath);
    exists = true;
    isDir = stats.isDirectory();
  } catch (e) {
    exists = false;
  }

  // For SPA routing, serve index.html for unknown routes
  if (!exists || isDir) {
    filePath = path.join(serveDir, 'index.html');
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - File not found');
    return;
  }

  // Determine content type
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';

  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Server error');
      return;
    }

    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

// Proxy API requests to backend
function proxyToBackend(req, res, pathname) {
  const queryStr = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: pathname + queryStr,
    method: req.method,
    headers: {
      ...req.headers,
      'host': 'localhost:3000'
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // Copy headers from backend response
    const headers = {
      ...proxyRes.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    
    res.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Backend proxy error:', err.message);
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Backend server unavailable',
      message: err.message 
    }));
  });

  // Handle request body for POST/PUT/PATCH
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
}

// Start server
server.listen(PORT, HOST, () => {
  console.log(`✅ Frontend Server Running!`);
  console.log(`\n🌐 Open: http://${HOST}:${PORT}`);
  console.log(`📱 React/Vite App Ready`);
  console.log(`🔗 API Proxy: http://localhost:3000\n`);
  console.log(`✨ Quick Links:`);
  console.log(`   • Login/Register: http://${HOST}:${PORT}/`);
  console.log(`   • Dashboard: http://${HOST}:${PORT}/dashboard\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} already in use. Kill existing process and retry.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
