# Viver Bem Decorações

Landing page da Viver Bem. A cadeira pendente começa na cena da varanda e, conforme a pessoa rola, desce com inércia até a seção "Um convite para ficar". Os pedidos vão para o WhatsApp com mensagem pronta.

## Hospedar no GitHub Pages

O site é estático: o `index.html` da raiz e a pasta `dist/assets/`. Não precisa de servidor, banco nem build no GitHub.

1. Faça o merge do pull request na branch `main`.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
4. Em **Branch**, escolha `main` e a pasta `/ (root)`. Salve.
5. Em um ou dois minutos o site fica no ar em `https://andersonx553-beep.github.io/lande-pages/`.

O arquivo `.nojekyll` na raiz faz o GitHub servir os arquivos como estão.

### Domínio próprio

Para usar um domínio (por exemplo `viverbem.com.br`):

1. Em **Settings → Pages → Custom domain**, informe o domínio e salve. O GitHub cria o arquivo `CNAME`.
2. No painel do registro do domínio, crie o registro DNS que o GitHub indicar (CNAME para `andersonx553-beep.github.io`, ou registros A para domínio sem `www`).
3. Gere o HTML com o endereço novo, para o link canônico e a prévia de compartilhamento apontarem para ele:

```sh
SITE_URL=https://viverbem.com.br/ npm run build
```

Configurar o `SITE_URL` não registra o domínio nem configura o DNS.

## Editar e gerar

Requer Node.js 22 ou mais recente.

- Edite o site em `dist/index.html` (HTML, CSS e JavaScript no mesmo arquivo).
- Imagens e fontes ficam em `dist/assets/`.
- Rode `npm run build` para gerar o `index.html` da raiz, que é o arquivo publicado.

Para abrir localmente: `python3 -m http.server 8000 --bind 127.0.0.1` e acesse `http://127.0.0.1:8000/`.

### HTML único

`python3 scripts/build-standalone.py` gera `viver-bem-decoracoes.html`, um arquivo só com imagens e fontes embutidas (~3,4MB). Serve para enviar ou abrir sem a pasta de imagens. Para hospedar, use o `index.html` com `dist/assets/`: ele carrega imagens no tamanho certo para cada tela.

### Imagens

- `scripts/process-hero-assets.py`: cenário da varanda em 3 larguras, recorte da cadeira pendente (remove o fundo branco, inclusive entre as tramas, e aquece a luz) e recortes de detalhe da trama e da almofada (não usados no site atual).
- `scripts/extract-reference-assets.py`: logo, peças e recortes de material a partir do HTML de referência.
- `scripts/process-photos.py`: fotos reais de entregas, sem tarjas e marca d'água, em 3 tamanhos.

Os scripts gravam em `src/assets/`. Copie para `dist/assets/` os arquivos usados no site.

## Estrutura da página

1. Varanda com o título e o botão para as peças. A cadeira pendente fica no canto da cena.
2. "Um convite para ficar": a cadeira pousa, com Trama, Estofado e Presença e uma linha de progresso.
3. Peças: cada uma abre um detalhe com botão de WhatsApp e mensagem com o nome da peça.
4. Nossa essência: 50 anos, Fortaleza e interior, entrega, e entregas recentes reais.
5. Perguntas frequentes, contato (WhatsApp principal, Instagram secundário) e rodapé.

Acessibilidade: quem ativa "reduzir movimento" no aparelho, ou toca em "Pausar movimentos" no rodapé, vê a cadeira parada onde ela pousa. O conteúdo fica visível sem JavaScript.

## Pendências para a versão comercial

- Fotos em resolução maior para telas 4K: cenário com ~3.800px de largura e cadeira com ~2.000px de altura.
- Fotos das peças com o mesmo fundo e a mesma luz, para a grade ficar uniforme.
- Confirmar com a loja os nomes e as descrições das peças e a área de entrega.

## Informações da loja

- Instagram: https://www.instagram.com/viverbemdecoracoes/
- WhatsApp: +55 85 98600-0833.
- A afirmação de 50 anos vem da bio da loja no Instagram.
- As entregas recentes (Guaramiranga e Fortaleza, dez/2024) vêm das publicações da loja.
- Preços, parcelamento, garantias, endereço, horários e medidas não foram fornecidos. Não inventar esses dados.
- As cenas e as peças das imagens de referência foram geradas por IA a partir de modelos que a loja vende. Cores e formatos devem ser confirmados no atendimento, como diz o FAQ.

## Histórico

A versão anterior do site (vitrine com filtros, formulário e comparação de ambiente) está no histórico do git, antes do commit que trocou o site pela versão atual. `.agents/product-context.md` e `docs/LANDING_PAGE_SPEC.md` descrevem essa versão anterior. Os protótipos de design estão em `sketches/`.

## Skills instaladas

- `web-design-guidelines` (Vercel), `sketch` (protótipos HTML) e `graphify` (mapa do código) em `.agents/skills/` e `.claude/skills/`. O graphify precisa do programa instalado: `uv tool install graphifyy`.
