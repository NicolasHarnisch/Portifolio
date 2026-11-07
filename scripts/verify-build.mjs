import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { resolve } from 'node:path';
import { preview } from 'vite';

const dist = resolve(import.meta.dirname, '../dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
assert(!html.includes('rel="preload" href="https://prod.spline.design'));
assert(html.includes('rel="canonical"'));
assert(!(html.match(/<link[^>]*rel="modulepreload"[^>]*>/g) ?? []).some(link => /SplineScene|StarBackground/.test(link)));
assert((await readFile(resolve(dist, '404.html'), 'utf8')).includes('noindex, follow'));
assert((await readFile(resolve(dist, 'sitemap.xml'), 'utf8')).includes('https://nicolasharnisch.vercel.app/'));
const routes = JSON.parse(await readFile(resolve(import.meta.dirname, '../vercel.json'), 'utf8'));
assert(routes.rewrites?.some(route => route.source === '/projects/:id' && route.destination === '/index.html'));
for (const file of await readdir(resolve(dist, 'assets'))) {
  if (!file.endsWith('.js') && !file.endsWith('.css')) continue;
  const data = await readFile(resolve(dist, 'assets', file));
  console.log(JSON.stringify({ file, bytes: data.length, gzipBytes: gzipSync(data).length }));
}
const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true, open: false } });
try {
  for (const path of ['/', '/projects/opnora', '/projects/ans', '/sitemap.xml', '/robots.txt', '/favicon.svg', '/opnora.webp', '/TvRussas.webp', '/TFBrand.webp', '/ansanalytics.webp', '/sistema-triagem-hospitalar.webp', '/Engremaq-Web.webp', '/404.html']) {
    const response = await fetch(`http://127.0.0.1:4173${path}`);
    assert.equal(response.status, 200, path);
    const bytes = (await response.arrayBuffer()).byteLength;
    assert(bytes > 0, path);
    console.log(JSON.stringify({ path, status: response.status, bytes, type: response.headers.get('content-type') }));
  }
  // Vite preview has SPA fallback. Vercel's real HTTP 404 must be checked after deployment.
  console.log('Build and HTTP checks passed. Browser/GPU and hosted 404 not measured.');
} finally {
  await new Promise((done, reject) => server.httpServer.close(error => error ? reject(error) : done()));
}
