import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Gera o index.html publicado a partir de dist/index.html, mais sitemap.xml e robots.txt.
// SITE_URL é o endereço público (padrão: GitHub Pages). Para domínio próprio:
//   SITE_URL=https://seu-dominio/ npm run build
const root = resolve(import.meta.dirname, '..');
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');

const url = new URL(process.env.SITE_URL || 'https://andersonx553-beep.github.io/lande-pages/');
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
  throw new Error('SITE_URL deve ser o endereço público HTTPS, sem credenciais, consulta ou fragmento.');
}
if (!url.pathname.endsWith('/')) url.pathname += '/';
const abs = path => new URL(path, url).href;
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const canonical = escape(url.href);
const image = escape(abs('dist/assets/og-image.jpg'));

html = html.replace('</head>', [
  `<link rel="canonical" href="${canonical}">`,
  `<meta property="og:url" content="${canonical}">`,
  `<meta property="og:image" content="${image}">`,
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="Varanda ao fim da tarde com uma cadeira pendente da Viver Bem Decorações">',
  `<meta name="twitter:image" content="${image}">`,
  '</head>'
].join('\n'));

// dados da loja para o Google: completa o JSON-LD com endereço do site, logo e imagem
html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_, json) => {
  const data = JSON.parse(json);
  Object.assign(data, {
    '@id': url.href + '#loja',
    url: url.href,
    logo: abs('dist/assets/brand/logo-960.webp'),
    image: abs('dist/assets/og-image.jpg'),
    description: 'Cadeiras pendentes, poltronas e conjuntos em fibra para varanda e jardim.',
    areaServed: { '@type': 'City', name: 'Fortaleza' }
  });
  return `<script type="application/ld+json">\n${JSON.stringify(data)}\n</script>`;
});

// todo caminho relativo assets/ (atributos, srcset, url() do CSS e strings do JS) passa a apontar para dist/assets/
html = html.replace(/(?<![\w./-])assets\//g, 'dist/assets/');
await writeFile(resolve(root, 'index.html'), html);

const today = new Date().toISOString().slice(0, 10);
await writeFile(resolve(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url.href}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
// Atenção: buscadores só leem robots.txt na raiz do domínio. No GitHub Pages de projeto
// (usuario.github.io/lande-pages/) este arquivo é ignorado; passa a valer com domínio próprio.
await writeFile(resolve(root, 'robots.txt'),
  `User-agent: *\nDisallow: ${url.pathname}sketches/\nSitemap: ${abs('sitemap.xml')}\n`);
console.log(`index.html, sitemap.xml e robots.txt gerados para ${url.href}`);
