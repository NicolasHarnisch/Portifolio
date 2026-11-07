import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Reuse the existing React 404, served with a real HTTP 404 by static hosting.
const dist = resolve(import.meta.dirname, '../dist');
const html = (await readFile(resolve(dist, 'index.html'), 'utf8'))
  .replace(/<link rel="canonical"[^>]*>/, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
  .replace('</head>', '<meta name="robots" content="noindex, follow" /></head>');
await writeFile(resolve(dist, '404.html'), html);
console.log('Generated 404.html using the existing application.');
