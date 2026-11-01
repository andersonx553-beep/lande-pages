'use strict';
const phone='5585986000833';
const whatsapp=(text)=>'https://wa.me/'+phone+'?text='+encodeURIComponent(text);
const defaultMessage='Olá, Viver Bem! Vi o site e gostaria de um orçamento para o meu ambiente. Podem me ajudar com os modelos, valores e condições?';
document.querySelectorAll('[data-whatsapp]').forEach(link=>link.href=whatsapp(defaultMessage));
document.querySelectorAll('[data-product]').forEach(link=>{const product=link.dataset.product;const id=link.closest('article').id;link.href=whatsapp('Olá, Viver Bem! Gostaria de um orçamento para a peça "'+product+'" que vi no site. Quero consultar medidas, cores, materiais, pagamento e entrega. Referência: '+location.origin+location.pathname+'#'+id);});
const filterButtons=document.querySelectorAll('[data-filter]');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const categories=new Set([...filterButtons].map(button=>button.dataset.filter));
function applyFilter(category,animate=false){
 const selected=categories.has(category)?category:'all';
 filterButtons.forEach(button=>{const active=button.dataset.filter===selected;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
 let count=0;
 document.querySelectorAll('.product').forEach(card=>{
  card.getAnimations().forEach(animation=>animation.cancel());
  card.hidden=selected!=='all'&&card.dataset.category!==selected;
  if(!card.hidden){count++;if(animate&&!motionPreference.matches&&card.animate)card.animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});}
 });
 document.getElementById('filter-status').textContent=count+(count===1?' peça exibida.':' peças exibidas.');
}
function syncFilter(){
 const hash=location.hash.slice(1);
 const product=document.getElementById(hash);
 applyFilter(categories.has(hash)?hash:product?.dataset.category||'all');
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.filter;
 const url=new URL(location.href);url.hash=category==='all'?'colecao':category;
 if(url.href!==location.href)history.pushState(null,'',url);
 applyFilter(category,true);
}));
window.addEventListener('popstate',syncFilter);
window.addEventListener('hashchange',syncFilter);
syncFilter();
document.getElementById('quote-form').addEventListener('submit',event=>{event.preventDefault();const piece=document.getElementById('piece').value;const space=document.getElementById('space').value;const city=document.getElementById('city').value.trim();const message='Olá, Viver Bem! Gostaria de um orçamento.\n\nInteresse: '+piece+'\nAmbiente: '+space+(city?'\nCidade de entrega: '+city:'')+'\n\nPodem me informar medidas, cores, materiais, valores, formas de pagamento, frete e prazo?';const link=document.createElement('a');link.href=whatsapp(message);link.target='_blank';link.rel='noopener noreferrer';document.body.append(link);link.click();link.remove();});
const dialog=document.getElementById('photo-dialog');let priorFocus=null;
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{priorFocus=button;const card=button.closest('.product');document.getElementById('dialog-title').textContent=card.querySelector('h3').textContent;document.getElementById('dialog-photo').replaceChildren(card.querySelector('.photo').cloneNode(true));document.getElementById('dialog-quote').href=card.querySelector('[data-product]').href;dialog.showModal();}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>priorFocus?.focus());
document.querySelectorAll('[data-compare]').forEach(compare=>{
 const range=compare.querySelector('[data-compare-range]');
 const update=()=>{
  const value=Number(range.value);
  compare.style.setProperty('--position',value+'%');
  range.setAttribute('aria-valuetext',value<=5?'Ambiente decorado':value>=95?'Ambiente vazio':100-value+'% do ambiente decorado');
 };
 range.addEventListener('input',update);
 update();
});
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  if(!motionPreference.matches&&entry.target.animate)entry.target.animate([{opacity:.4,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'ease-out'});
  observer.unobserve(entry.target);
 }),{threshold:.12});
 document.querySelectorAll('.section-head,.staging-head,.story-grid,.history-grid,.steps article,.quote-grid,.final-cta').forEach(section=>observer.observe(section));
 motionPreference.addEventListener('change',()=>{if(motionPreference.matches)document.getAnimations().forEach(animation=>animation.cancel());});
}
