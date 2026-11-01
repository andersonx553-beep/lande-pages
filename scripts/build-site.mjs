import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const siteUrl = process.env.SITE_URL || 'https://viverbem.deco/';
if (siteUrl) {
  const url = new URL(siteUrl);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('SITE_URL deve ser o endereço público HTTPS, sem credenciais, consulta ou fragmento.');
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  const canonical = escape(url.href);
  const image = escape(new URL('dist/assets/varandas.webp', url).href);
  html = html.replace('</head>', `<link rel="canonical" href="${canonical}">\n<meta property="og:url" content="${canonical}">\n<meta property="og:image" content="${image}">\n<meta property="og:image:alt" content="Móveis da Viver Bem Decorações em uma varanda">\n</head>`);
}

html = html.replaceAll('="assets/', '="dist/assets/');
await writeFile(resolve(root, 'index.html'), html);
console.log('index.html gerado com imagens, fontes, CSS e JavaScript locais e cacheáveis.');
