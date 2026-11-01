# Viver Bem Decorações

Landing page responsiva da Viver Bem, com vitrine de móveis e pedidos de orçamento pelo WhatsApp.

## Abrir a página

Sirva a raiz do projeto com `python3 -m http.server 8000 --bind 127.0.0.1` e abra a página no navegador. O HTML usa imagens, fontes, CSS e JavaScript locais, com cache independente e sem CDN. Mantenha a pasta `dist/assets/` junto do `index.html`.

Para hospedar em `https://viverbem.deco/`, publique o `index.html` da raiz e a pasta `dist/assets/`. O endereço canônico e a imagem Open Graph são gerados para esse domínio. Para outro endereço, use `SITE_URL=https://seu-dominio/ npm run build`. Configurar esses metadados não registra o domínio nem configura DNS ou hospedagem.

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

Edite o conteúdo em `dist/index.html`, os estilos em `src/styles.css` e as interações em `dist/assets/app.js`. O comando compila o Tailwind em CSS local minificado e gera o HTML leve na raiz. Não há imagens base64 no HTML; fontes Fraunces e DM Sans são hospedadas localmente, com suas licenças em `dist/assets/fonts/`. O site não depende do CDN de desenvolvimento do Tailwind.

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


## Skill no VS Code

A skill oficial `web-design-guidelines`, da Vercel, está instalada para o Codex em `.agents/skills/web-design-guidelines/SKILL.md`. Abra este repositório no VS Code com a extensão Codex e inicie uma nova conversa para a descoberta da skill. Não é uma extensão do VS Code e não instala o editor. Para reinstalar: `npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines --agent codex --yes`.

## Melhorias e fotos individuais

- Filtros podem ser compartilhados por `#poltronas`, `#mesas` e `#sofas`; voltar/avançar preserva a seleção. Links de produtos também mostram sua categoria.
- Animações de entrada e de filtro usam apenas opacidade e transformação; movimento reduzido desativa os efeitos. O conteúdo permanece visível sem JavaScript.
- Os textos têm no mínimo 12px e os links de orçamento dos produtos mantêm alvos de 44px no celular.
- A seção de história atribui os 50 anos à apresentação da própria loja no Instagram. Dados estruturados contêm somente nome, telefone e perfil confirmados.
- Para substituir um recorte por uma foto individual real, coloque WebP em `dist/assets/`, use `class="photo photo--original"` no contêiner e informe no `<img>` o caminho e as dimensões reais. Remova os estilos de recorte `--iw`, `--ix`, `--iy` desse contêiner e da imagem. Para versões responsivas, acrescente `srcset` com arquivos reais e `sizes` conforme as colunas. Rode o build para atualizar a raiz.
- Fotos novas, depoimentos autorizados, endereço exato, mapa e horários aguardam materiais confirmados da loja. Não publicar exemplos como fatos nem atribuir materiais, disponibilidade ou resistência aos produtos sem confirmação.

## Ambiente de desenvolvimento

Node.js 22+ e Python 3 são suficientes; não há backend, banco ou segredos obrigatórios. Instale com `npm ci` e gere com `npm run build`. O repositório não define suíte automatizada de testes. Valide filtros, histórico da URL, modal com Escape e retorno de foco, mensagem do formulário (sem enviá-la), layouts de 320px a desktop e preferência de movimento reduzido.

## Fotos tratadas da nova seleção

As duas novas capturas do Instagram foram usadas para tratar seis fotos: Poltrona Luna, Poltrona Ostra, poltrona suspensa, sofá laranja com mesas de apoio, sofá verde e conjunto de mesa redonda. Legendas, faixas e interface foram removidas com edição por IA; áreas encobertas foram reconstruídas, portanto os originais individuais continuam sendo a referência ideal para detalhes comerciais.

O arquivo `dist/assets/colecao-tratada.webp` reúne seis quadros de 512 × 512 px em uma grade de três colunas por duas linhas. O estilo `.photo--catalog` seleciona cada quadro sem distorcer a foto; o mesmo enquadramento é preservado na ampliação. O WebP tem cerca de 326 KB e é compartilhado pelo destaque, vitrine e seção de inspiração. A vitrine agora tem nove produtos, com opções correspondentes no formulário.

## Comparação de ambiente

A seção `#transformacao` apresenta uma simulação fictícia da mesma varanda vazia e decorada. O controle nativo aceita mouse, toque e teclado; o texto acessível informa a porcentagem exibida. As imagens alinhadas estão em `dist/assets/ambiente-vazio.webp` e `dist/assets/ambiente-viver-bem.webp`.

A composição decorada usa referências visuais do sofá verde, das poltronas Luna, da mesa redonda e da mesa lateral laranja. É uma visualização criada por IA para inspiração, não uma fotografia de projeto entregue nem uma promessa de disponibilidade. A legenda deve permanecer junto da comparação.
