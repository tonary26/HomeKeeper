import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/images/user');

const photos = [
  ['bath-complex-1', 'E:/Lenovo/Temp/codex-clipboard-4cf6f7d6-ee54-4db4-b539-6f8ccdc40c5b.png'],
  ['black-bath-1', 'E:/Lenovo/Temp/codex-clipboard-0970c799-097a-4522-9823-9c51d3c01813.png'],
  ['black-bath-2', 'E:/Lenovo/Temp/codex-clipboard-b7d9d520-f612-4cbc-9d49-dc9572d42adf.png'],
  ['banya-topka-1', 'E:/Lenovo/Temp/codex-clipboard-ba42bf9f-5878-422f-944e-51543e7cf8d8.png'],
  ['banya-topka-2', 'E:/Lenovo/Temp/codex-clipboard-8f6086e4-57ad-4c66-a968-02b294afcd66.png'],
  ['banya-topka-3', 'E:/Lenovo/Temp/codex-clipboard-7c9f9dea-449f-4db0-84a2-86294e9f4b21.png'],
  ['bath-complex-2', 'E:/Lenovo/Temp/codex-clipboard-8524cbf6-09b1-4dae-8b6b-11a123171ab9.png'],
  ['black-bath-3', 'E:/Lenovo/Temp/codex-clipboard-317b7e2c-f393-4c32-b472-52a5fb65f137.png'],
  ['included-zone-1', 'E:/Lenovo/Temp/codex-clipboard-76ce7946-cb28-4cf1-86f1-fed326291060.png'],
  ['included-zone-2', 'E:/Lenovo/Temp/codex-clipboard-ed71610c-bac5-4bf5-98e9-c54aecdaac39.png'],
  ['included-zone-3', 'E:/Lenovo/Temp/codex-clipboard-1fa4938a-1c84-4c27-8834-0dbda20f56b3.png'],
  ['included-zone-4', 'E:/Lenovo/Temp/codex-clipboard-b4dd4584-0645-4410-870b-bd6cf480f4dd.png'],
  ['included-zone-5', 'E:/Lenovo/Temp/codex-clipboard-ab43e522-88aa-4cd5-94cb-6c2421b42ddf.png'],
  ['included-zone-6', 'E:/Lenovo/Temp/codex-clipboard-0e426e96-dba4-4fd8-83d8-34ebe1322231.png'],
  ['included-zone-7', 'E:/Lenovo/Temp/codex-clipboard-f8daf5b6-c08e-4dba-af3c-a9a29ec47590.png'],
  ['included-zone-8', 'E:/Lenovo/Temp/codex-clipboard-ec176d7c-590b-4ab6-b34b-8cc33e59baef.png'],
  ['izbushka-1', 'E:/Lenovo/Temp/codex-clipboard-c7e77973-868b-4e42-bfe9-4f4e6ac203de.png'],
  ['izbushka-2', 'E:/Lenovo/Temp/codex-clipboard-e196fda3-c837-4fa1-a0f7-5f37df6e3411.png'],
  ['izbushka-3', 'E:/Lenovo/Temp/codex-clipboard-fde30987-62c5-477e-ad08-24200faf9bc5.png'],
  ['nomer-8-new-1', 'E:/Lenovo/Temp/codex-clipboard-9e2cc7bf-643a-4fdf-998e-d20a1fab2601.png'],
  ['nomer-8-new-2', 'E:/Lenovo/Temp/codex-clipboard-11b8107c-08dd-45b1-8481-48b92cc380ef.png'],
  ['nomer-8-new-3', 'E:/Lenovo/Temp/codex-clipboard-c629fb87-c203-4f2b-9a1f-d0d4e10ae91a.png'],
  ['nomer-8-new-4', 'E:/Lenovo/Temp/codex-clipboard-581c55db-65bb-4544-b263-d73d961ac3c9.png'],
];

await mkdir(outDir, { recursive: true });

for (const [name, sourcePath] of photos) {
  const webp = await sharp(sourcePath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  await writeFile(path.join(outDir, `${name}.webp`), webp);
  console.log(`saved ${name}.webp`);
}
