import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.cwd());
const args = new Map();

for (let index = 2; index < process.argv.length; index += 1) {
  const current = process.argv[index];
  if (current.startsWith('--')) {
    args.set(current.slice(2), process.argv[index + 1]);
    index += 1;
  }
}

const port = Number(args.get('port') || process.env.PORT || 4173);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function safePath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const decoded = decodeURIComponent(parsed.pathname);
  const relativePath = decoded === '/' ? '/local-preview/index.html' : decoded;
  const target = normalize(join(root, relativePath));

  if (target !== root && !target.startsWith(root + sep)) {
    return null;
  }

  return target;
}

const server = createServer((request, response) => {
  const target = safePath(request.url || '/');

  if (!target || !existsSync(target) || !statSync(target).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const extension = extname(target).toLowerCase();
  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': contentTypes[extension] || 'application/octet-stream'
  });
  createReadStream(target).pipe(response);
});

server.listen(port, () => {
  console.log(`Acharkhastory local preview: http://localhost:${port}`);
});
