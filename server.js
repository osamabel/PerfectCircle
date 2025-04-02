// server.js (place in project root)
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // Handle static uploads directly
      if (pathname.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), 'public', pathname);
        console.log('Attempting to serve:', filePath);
        
        if (fs.existsSync(filePath)) {
          // Determine content type
          const ext = path.extname(filePath).toLowerCase();
          let contentType = 'application/octet-stream';
          
          if (ext === '.png') contentType = 'image/png';
          else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
          else if (ext === '.gif') contentType = 'image/gif';
          else if (ext === '.svg') contentType = 'image/svg+xml';
          
          // Set headers and stream the file
          res.setHeader('Content-Type', contentType);
          fs.createReadStream(filePath).pipe(res);
          return;
        } else {
          console.log('File not found:', filePath);
        }
      }

      // Let Next.js handle all other requests
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});