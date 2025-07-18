const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      const filePath = path.join(__dirname, 'appleSignIn.html');
      const content = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    } else if (req.url === '/your-backend-endpoint' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        console.log('Received data:', body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Backend received the request (for testing)' }));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (err) {
    console.error('Error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
