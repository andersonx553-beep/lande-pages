# Viver Bem Decorações

Landing page responsiva da Viver Bem, com vitrine de móveis e pedidos de orçamento pelo WhatsApp.

## Abrir a página

Baixe o `index.html` na raiz e abra no navegador. Ele contém imagens, CSS e JavaScript e funciona sem instalação. É a versão autônoma gerada a partir de `dist/`.

Para hospedar, publique o conteúdo de `dist/` em um serviço de hospedagem estática. O `index.html` da raiz também pode ser servido pelo GitHub Pages.

## Funcionalidades

- Layout claro com cores da marca e fotos reais fornecidas nas capturas do Instagram.
- Filtros por poltronas, mesas e conjuntos e sofás.
- Ampliação das fotos em janela com suporte ao teclado.
- Orçamento por peça com mensagem pronta no WhatsApp.
- Formulário com peça, ambiente e cidade opcional.
- Dúvidas sobre preço, pagamento, frete, prazo, medidas, acabamentos e uso externo.
- Link para o Instagram e botão flutuante de WhatsApp.

## Editar e gerar

Requer Node.js 22 ou mais recente.

```sh
npm ci
npm run build
```

Edite o conteúdo em `dist/index.html`, os estilos em `src/styles.css` e as interações em `dist/assets/app.js`. O comando compila o Tailwind em CSS local minificado e atualiza o HTML autônomo na raiz. O site não depende do CDN de desenvolvimento do Tailwind.

As fotos são arquivos WebP completos das capturas recebidas, com enquadramentos definidos em CSS. Para a versão comercial final, substitua por fotos originais em maior resolução e pela logo original. Os arquivos recebidos não trazem medidas ou especificações técnicas verificadas.

## Informações da loja

- Instagram: https://www.instagram.com/viverbemdecoracoes/
- WhatsApp: +55 85 98600-0833.
- A afirmação de 50 anos vem da bio enviada pelo usuário.
- A entrega nacional foi anunciada em uma publicação enviada. Destinos, frete e prazo precisam ser confirmados com a loja.
- Preços, parcelamento, garantias, endereço, horários e medidas não foram fornecidos. Não inventar esses dados.

## Continuidade

Veja `.agents/product-context.md` para as fontes e decisões, e `docs/LANDING_PAGE_SPEC.md` para a estrutura, a copy e a validação.

A página somente prepara o contato. Não envia mensagens automaticamente, não registra os dados do formulário e não processa pagamentos.
