# Гостиница «Рай»

Vue/Vite лендинг-каталог номеров для деплоя на Vercel.

## Команды

```bash
npm install
npm run build
npm run preview
```

## Как открыть локально

Двойной клик по `index.html` не подходит для Vue/Vite приложения.

Проще всего открыть файл `open-site.bat` в корне проекта. Он запустит локальный сервер и откроет сайт в браузере:

`http://127.0.0.1:5187/`

## Vercel

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- SPA роутинг настроен в `vercel.json`

## Контент

Данные номеров и изображения взяты с текущего сайта гостиницы:
`https://xn----8sbigpca3bh4afbf3dua9g.xn--p1ai/`

Изображения сохранены локально в `public/images/*.webp`.
