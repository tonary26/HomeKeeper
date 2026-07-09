import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const outDir = path.resolve('public/images/user');

const photos = [
  ['hotel-front', 'E:/Lenovo/Temp/codex-clipboard-d7107878-8961-4f83-93d7-8f0cc7621039.png'],
  ['nomer-1-1', 'E:/Lenovo/Temp/codex-clipboard-de9c4cfc-6ae0-47cd-9f79-53a67a1bc5a0.png'],
  ['nomer-1-2', 'E:/Lenovo/Temp/codex-clipboard-7209e1e5-b1f6-4711-9677-588a6d0e47cb.png'],
  ['nomer-2-1', 'E:/Lenovo/Temp/codex-clipboard-f17977b0-dfdc-463e-93c2-c2d89c478d65.png'],
  ['nomer-2-2', 'E:/Lenovo/Temp/codex-clipboard-02aeac58-a3fb-420a-a942-499492ce7d4a.png'],
  ['nomer-3-1', 'E:/Lenovo/Temp/codex-clipboard-43ef97ce-0277-41f6-b8d4-2014f04328cd.png'],
  ['nomer-3-2', 'E:/Lenovo/Temp/codex-clipboard-2f73f9b1-c2ac-4e74-a900-9d3899043f2f.png'],
  ['nomer-4-1', 'E:/Lenovo/Temp/codex-clipboard-fc4f7359-0838-4adc-9f17-6169c4eea224.png'],
  ['nomer-4-2', 'E:/Lenovo/Temp/codex-clipboard-0aea26b6-8206-4a03-8e92-8e7f6223e319.png'],
  ['nomer-5-1', 'E:/Lenovo/Temp/codex-clipboard-804f097f-cc31-45e4-b25d-60b2ac787683.png'],
  ['nomer-5-2', 'E:/Lenovo/Temp/codex-clipboard-a79617e9-39e7-43f1-b65d-bd08001ec6e9.png'],
  ['nomer-6-1', 'E:/Lenovo/Temp/codex-clipboard-153d76b6-5ca3-4f5b-bd43-8774fe6ca5b2.png'],
  ['nomer-6-2', 'E:/Lenovo/Temp/codex-clipboard-199b1f69-a092-465e-a093-ae0f00d7408e.png'],
  ['nomer-7-1', 'E:/Lenovo/Temp/codex-clipboard-cceba284-de6d-42fd-be06-edae898354dd.png'],
  ['nomer-7-2', 'E:/Lenovo/Temp/codex-clipboard-d67a7e9e-ddec-46c2-a92c-c59751c7ff07.png'],
  ['nomer-8-1', 'E:/Lenovo/Temp/codex-clipboard-c6ae8ab8-c260-459f-aa2d-8dd3fc1815e0.png'],
  ['nomer-8-2', 'E:/Lenovo/Temp/codex-clipboard-ff49d10d-5d4f-415a-9abd-b5bd22324a76.png'],
  ['nomer-9-1', 'E:/Lenovo/Temp/codex-clipboard-a0a87f17-2e42-4663-bd12-0a53a5b61f93.png'],
  ['nomer-9-2', 'E:/Lenovo/Temp/codex-clipboard-c1a86a4a-0af6-419b-ae0a-8aa6e637e3ed.png'],
  ['nomer-9-3', 'E:/Lenovo/Temp/codex-clipboard-88bbb4c2-e18d-4853-a94b-d3d1084d91b0.png'],
  ['nomer-10-1', 'E:/Lenovo/Temp/codex-clipboard-84b2178b-6557-43d5-8225-523ed1f9da40.png'],
  ['nomer-10-2', 'E:/Lenovo/Temp/codex-clipboard-1ccb22e0-0156-4a00-82e9-37646ea3f4b3.png'],
  ['nomer-10-3', 'E:/Lenovo/Temp/codex-clipboard-544a1855-286c-47b0-bf06-a4f677da4099.png'],
  ['nomer-tsokol-1', 'E:/Lenovo/Temp/codex-clipboard-36c845e2-5f61-484f-a5ed-f0412a9b31ab.png'],
  ['nomer-tsokol-2', 'E:/Lenovo/Temp/codex-clipboard-0e578f98-0ddc-4917-bf03-d2711ecb6987.png'],
  ['nomer-tsokol-2-1', 'E:/Lenovo/Temp/codex-clipboard-c02057ef-4ba0-4fe7-abcd-6e5ef9d81bfb.png'],
  ['nomer-tsokol-2-2', 'E:/Lenovo/Temp/codex-clipboard-1d5c041d-e0d2-4b45-b0fc-d23bf0537715.png'],
];

await mkdir(outDir, { recursive: true });

for (const [name, sourcePath] of photos) {
  const webp = await sharp(sourcePath)
    .resize({ width: name === 'hotel-front' ? 2200 : 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  await writeFile(path.join(outDir, `${name}.webp`), webp);
  console.log(`saved ${name}.webp`);
}
