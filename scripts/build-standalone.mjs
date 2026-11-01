import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..');
let html=await readFile(resolve(root,'dist/index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="assets/styles.css">','<style>'+await readFile(resolve(root,'dist/assets/styles.css'),'utf8')+'</style>');
const assets={};
for(const file of ['marca.webp','ambientes.webp','varandas.webp']){
 const data=await readFile(resolve(root,'dist/assets',file));
 assets[file]='data:image/webp;base64,'+data.toString('base64');
 html=html.replaceAll('src="assets/'+file+'"','data-local-image="'+file+'"');
}
const icon=await readFile(resolve(root,'dist/assets/icon.svg'));
html=html.replace('assets/icon.svg','data:image/svg+xml;base64,'+icon.toString('base64'));
const init='const localImages='+JSON.stringify(assets)+';document.querySelectorAll("[data-local-image]").forEach(img=>img.src=localImages[img.dataset.localImage]);';
const app=await readFile(resolve(root,'dist/assets/app.js'),'utf8');
html=html.replace('<script src="assets/app.js" defer></script>','<script>'+init+'\n'+app+'</script>');
await writeFile(resolve(root,'index.html'),html);
console.log('index.html autônomo gerado.');
