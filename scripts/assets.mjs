import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicDir = resolve(import.meta.dirname, '../public');
const originals = ['opnora.png', 'TvRussas.png', 'TFBrand.png', 'ansanalytics.png', 'sistema-triagem-hospitalar.png', 'Engremaq-Web.png'];
if (process.argv.includes('--generate')) {
  // Preserve the user's original; generate only the missing optimized variant.
  await sharp(resolve(publicDir, 'opnora.png')).resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 }).toFile(resolve(publicDir, 'opnora.webp'));
}
let before = 0, after = 0;
for (const source of [...originals, 'minha-foto.jpeg']) {
  const files = source.endsWith('.png') ? [source, source.replace('.png', '.webp')] : [source];
  for (const file of files) {
    try {
      const absolute = resolve(publicDir, file);
      const { width, height } = await sharp(absolute).metadata();
      const { size } = await stat(absolute);
      console.log(JSON.stringify({ file, width, height, bytes: size }));
      if (originals.includes(file)) before += size;
      if (file.endsWith('.webp')) after += size;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}
console.log(JSON.stringify({ originalProjectBytes: before, optimizedProjectBytes: after }));
