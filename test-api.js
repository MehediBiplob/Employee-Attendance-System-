// Simple test script to verify the monthly summary API
const http = require('http');

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  console.log('Step 1: Login as admin...');
  const loginRes = await makeRequest('POST', '/api/auth/login', {
    username: 'admin',
    password: 'admin123',
  });
  console.log('Login response:', loginRes.body);
  
  if (!loginRes.headers['set-cookie']) {
    console.log('No session cookie set. Trying with different credentials...');
    return;
  }

  const sessionCookie = loginRes.headers['set-cookie'][0];
  console.log('Session cookie:', sessionCookie);

  console.log('\nStep 2: Get monthly summary...');
  const summaryRes = await makeRequest('GET', '/api/attendance/monthly-summary');
  console.log('Monthly summary response:', summaryRes);
}

test().catch(console.error);
