import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/images/homekeeper');
const images = [
  ['apartment-green', 'https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&fm=jpg&q=82&w=1800'],
  ['hotel-pool', 'https://images.unsplash.com/photo-1777426204090-8ab42d6fdc7c?auto=format&fit=crop&fm=jpg&q=82&w=2000'],
  ['apartment-airy', 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?auto=format&fit=crop&fm=jpg&q=82&w=1800'],
  ['bedroom-soft', 'https://images.unsplash.com/photo-1661006112799-d6750900c772?auto=format&fit=crop&fm=jpg&q=82&w=1800'],
  ['bedroom-curved', 'https://images.unsplash.com/photo-1744368092994-86779aeed0b6?auto=format&fit=crop&fm=jpg&q=82&w=1800'],
  ['bedroom-view', 'https://images.unsplash.com/photo-1771287491132-4954b32210d6?auto=format&fit=crop&fm=jpg&q=82&w=1800'],
];

await mkdir(outDir, { recursive: true });
for (const [name, url] of images) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const webp = await sharp(source).resize({ width: name === 'hotel-pool' ? 2000 : 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  await writeFile(path.join(outDir, `${name}.webp`), webp);
  console.log(`saved ${name}.webp`);
}
