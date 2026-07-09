import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/images');

const images = [
  ['hero', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/74/2000/600'],
  ['nomer-1', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/24/1200/900'],
  ['nomer-2', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/32/1200/900'],
  ['nomer-3', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/36/1200/900'],
  ['nomer-4', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/48/1200/900'],
  ['nomer-5-1', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/55/1200/900'],
  ['nomer-6', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/63/1200/900'],
  ['nomer-7', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/66/1200/900'],
  ['nomer-8', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/137/1200/900'],
  ['bannyy-kompleks', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/84/1200/900'],
  ['nomer-9-starina', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/143/1200/900'],
  ['nomer-10-mansarda', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/174/1200/900'],
  ['banya-po-chernomu', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/188/1200/900'],
  ['banya-topka', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/208/1200/900'],
  ['nomer-standart-tsokol', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/238/1200/900'],
  ['gruppovoy-nomer-tsokol-2', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/259/1200/900'],
  ['gallery-1', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/77/1200/900'],
  ['gallery-2', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/70/1200/900'],
  ['gallery-3', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/72/1200/900'],
  ['gallery-4', 'https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/imager/204/1200/900'],
];

await mkdir(outDir, { recursive: true });

for (const [name, url] of images) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const source = Buffer.from(await response.arrayBuffer());
  const webp = await sharp(source)
    .resize({ width: name === 'hero' ? 2000 : 1200, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();

  await writeFile(path.join(outDir, `${name}.webp`), webp);
  console.log(`saved ${name}.webp`);
}
