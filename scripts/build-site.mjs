import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Gera o index.html publicado a partir de dist/index.html, mais sitemap.xml e robots.txt.
// SITE_URL é o endereço público (padrão: GitHub Pages). Para domínio próprio:
//   SITE_URL=https://seu-dominio/ npm run build
const root = resolve(import.meta.dirname, '..');
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');

// ---------- catálogo: src/catalog.json gera filtros, contagem, cartões e a ficha das peças ----------
const catalog = JSON.parse(await readFile(resolve(root, 'src/catalog.json'), 'utf8'));
const esc = v => String(v).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const cats = new Map(catalog.categorias.map(c => [c.id, c]));
const waLink = text => `https://wa.me/${catalog.whatsapp}?text=${encodeURIComponent(text)}`;
const askFor = name => waLink(`Olá, Viver Bem! Tenho interesse em: ${name}. Podem me passar medidas, cores disponíveis, valor e prazo de entrega?`);
const SIZES = '(max-width:350px) 92vw, (max-width:760px) 46vw, (min-width:1500px) 22vw, 30vw';
const ids = new Set();
for (const p of catalog.pecas) {
  for (const k of ['id', 'categoria', 'nome', 'resumo', 'descricao', 'composicao', 'ambiente', 'foto', 'largura', 'altura', 'texto_alternativo']) {
    if (!p[k]) throw new Error(`src/catalog.json: a peça "${p.id || p.nome}" está sem o campo "${k}".`);
  }
  if (!cats.has(p.categoria)) throw new Error(`src/catalog.json: categoria desconhecida "${p.categoria}" na peça "${p.id}".`);
  if (ids.has(p.id)) throw new Error(`src/catalog.json: id repetido "${p.id}".`);
  ids.add(p.id);
}
const count = id => catalog.pecas.filter(p => p.categoria === id).length;
const plural = n => (n === 1 ? '1 peça' : `${n} peças`);
const chipsHtml = [
  `            <button class="chip" data-filter="todos" aria-pressed="true">Todos <span class="chip-n">${catalog.pecas.length}</span></button>`,
  ...catalog.categorias.map(c => `            <button class="chip" data-filter="${esc(c.id)}" aria-pressed="false">${esc(c.nome)} <span class="chip-n">${count(c.id)}</span></button>`)
].join('\n');
const cardsHtml = catalog.pecas.map(p => {
  const srcset = p.foto_pequena ? ` srcset="${esc(p.foto_pequena)} 480w, ${esc(p.foto)} ${p.largura}w" sizes="${SIZES}"` : '';
  return [
    `        <article class="card" data-cat="${esc(p.categoria)}">`,
    `          <div class="card-ph"><img src="${esc(p.foto)}"${srcset} width="${p.largura}" height="${p.altura}" loading="lazy" alt="${esc(p.texto_alternativo)}"></div>`,
    `          <p class="card-cat">${esc(cats.get(p.categoria).rotulo)}</p>`,
    `          <h3><button class="card-open" data-piece="${esc(p.id)}">${esc(p.nome)}</button></h3>`,
    `          <p class="card-short">${esc(p.resumo)}</p>`,
    `          <a class="card-cta" href="${esc(askFor(p.nome))}" target="_blank" rel="noopener">Pedir orçamento <span aria-hidden="true">↗</span></a>`,
    '        </article>'
  ].join('\n');
}).join('\n');
const dataJson = JSON.stringify(catalog.pecas.map(p => ({
  id: p.id, cat: p.categoria, catLabel: cats.get(p.categoria).rotulo, name: p.nome, desc: p.descricao,
  comp: p.composicao, amb: p.ambiente, img: p.foto, alt: p.texto_alternativo, wa: askFor(p.nome)
}))).replaceAll('</', '<\\/');
const region = (name, body) => {
  const re = new RegExp(`(<!--catalogo:${name}-->\\n)[\\s\\S]*?(\\n<!--/catalogo:${name}-->)`);
  if (!re.test(html)) throw new Error(`dist/index.html: marcador <!--catalogo:${name}--> não encontrado.`);
  html = html.replace(re, (_, a, b) => a + body + b);
};
region('filtros', chipsHtml);
region('contagem', `<p class="cat-count" id="cat-count" aria-live="polite">${plural(catalog.pecas.length)}</p>`);
region('pecas', cardsHtml);
region('dados', `<script type="application/json" id="catalog-data">${dataJson}</script>`);
// o arquivo-fonte também fica com o catálogo atualizado (para abrir dist/index.html direto e gerar o HTML único)
await writeFile(resolve(root, 'dist/index.html'), html);

// Na Vercel, o endereço de produção vem de VERCEL_PROJECT_PRODUCTION_URL (ou do domínio próprio configurado lá).
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/`;
const url = new URL(process.env.SITE_URL || vercelUrl || 'https://andersonx553-beep.github.io/lande-pages/');
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
  '<meta property="og:image:alt" content="Varanda ao fim da tarde com uma cadeira suspensa da Viver Bem Decorações">',
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
    description: 'Loja de móveis em Fortaleza: cadeiras suspensas, poltronas de balanço, mesas e sofás em fibra, corda e madeira para varanda, jardim e área gourmet.',
    areaServed: { '@type': 'City', name: 'Fortaleza' }
  });
  return `<script type="application/ld+json">\n${JSON.stringify(data)}\n</script>`;
});

// imagens abaixo da dobra: o endereço real só entra quando a imagem chega perto da tela (ver data-src no
// script da página). Sem isso o navegador antecipa fotos a até ~2.500px e elas disputam a conexão com a
// foto principal. <noscript> mantém as fotos para quem navega sem JavaScript.
html = html.replace(/<img (?![^>]*class="static")([^>]*?)loading="lazy"([^>]*)>/g, (tag, a, b) => {
  const deferred = `<img ${a}loading="lazy"${b}>`.replace(/ src="/, ' data-src="').replace(/ srcset="/, ' data-srcset="');
  return `${deferred}<noscript>${tag}</noscript>`;
});
html = html.replace('</head>', '<noscript><style>img[data-src]{display:none}</style></noscript>\n</head>');

// enxuga o CSS e o JavaScript embutidos: tira comentários de linha inteira e recuos (textos e URLs ficam iguais)
html = html.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => '<style>' + css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split('\n').map(l => l.trim()).filter(Boolean).join('\n') + '</style>');
html = html.replace(/<script>([\s\S]*?)<\/script>/g, (_, js) => '<script>' + js
  .replace(/^\s*\/\*[^\n]*?\*\/\s*$/gm, '')
  .split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//')).join('\n') + '</script>');

// todo caminho relativo assets/ (atributos, srcset, url() do CSS e strings do JS) passa a apontar para dist/assets/
html = html.replace(/(?<![\w./-])assets\//g, 'dist/assets/');
// o JavaScript e os dados do catálogo vão para um arquivo separado, carregado com defer:
// o HTML fica abaixo de ~14KB compactado e chega numa única ida e volta, antes da foto principal.
const dataTag = html.match(/<script type="application\/json" id="catalog-data">([\s\S]*?)<\/script>/);
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const main = scripts[scripts.length - 1];
let siteJs = `window.__CATALOG=${dataTag[1]};\n${main[1]}\n`;
html = html.replace(main[0], '').replace(dataTag[0], '');
const { createHash } = await import('node:crypto');
const v = createHash('sha256').update(siteJs).digest('hex').slice(0, 10);
await writeFile(resolve(root, 'dist/assets/site.js'), siteJs);
html = html.replace('</head>', `<script src="dist/assets/site.js?v=${v}" defer></script>\n</head>`);
await writeFile(resolve(root, 'index.html'), html);

const today = new Date().toISOString().slice(0, 10);
await writeFile(resolve(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url.href}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
// Atenção: buscadores só leem robots.txt na raiz do domínio. No GitHub Pages de projeto
// (usuario.github.io/lande-pages/) este arquivo é ignorado; passa a valer com domínio próprio.
await writeFile(resolve(root, 'robots.txt'),
  `User-agent: *\nDisallow: ${url.pathname}sketches/\nSitemap: ${abs('sitemap.xml')}\n`);
console.log(`Catálogo: ${catalog.pecas.length} peças. index.html, sitemap.xml e robots.txt gerados para ${url.href}`);

// pasta de publicação limpa (usada pela Vercel): só o site, sem scripts, protótipos nem arquivos originais
const { rm, mkdir, cp } = await import('node:fs/promises');
const out = resolve(root, 'public');
await rm(out, { recursive: true, force: true });
await mkdir(resolve(out, 'dist'), { recursive: true });
for (const f of ['index.html', 'sitemap.xml', 'robots.txt']) await cp(resolve(root, f), resolve(out, f));
await cp(resolve(root, 'dist/assets'), resolve(out, 'dist/assets'), { recursive: true });
console.log('Pasta public/ pronta para publicar.');
