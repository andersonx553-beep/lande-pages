# Viver Bem Decorações

## Objetivo e oferta
Landing page nova para apresentar móveis e levar pedidos de orçamento ao WhatsApp. Sem checkout. O usuário forneceu Instagram e WhatsApp da loja em capturas.

## Dados observados
- Marca: Viver Bem Decorações.
- Instagram: https://www.instagram.com/viverbemdecoracoes/
- WhatsApp na captura do perfil: +55 85 98600-0833. A captura do WhatsApp exibe o formato local 8600-0833. Usar o número completo do Instagram no link.
- Fotos mostram poltronas de balanço, conjuntos de mesa e cadeiras, sofá, tramas e estofados em ambientes de varanda e área de lazer.
- Logo branco com letras escuras e detalhe marrom/alaranjado.
- Materiais e cores mencionados nas publicações: corda náutica, rami, marfim, bouclé bege e verde musgo. Não atribuir a todos os modelos.

## Público e voz
Inferência: pessoas buscando mobiliar varandas, áreas de convivência e residências. Voz clara, acolhedora e direta. Tráfego inicial presumido de Instagram e indicações. Não prometer prazos, frete, descontos, garantias ou resistência à chuva sem confirmação.

## Proof Points
| Afirmação | Fonte | Citabilidade | Limite |
|---|---|---|---|
| Há 50 anos transformando ambientes | Bio na captura image(20261101-162130).png | Pública, atribuída à marca | Sem verificação independente; preferir confirmar antes da publicação |
| Entregamos para todo o Brasil | Texto em post na captura image(20261101-162207).png | Pública, atribuída à marca | Frete, alcance por produto e prazo precisam de consulta |
| Móveis reais fotografados em ambientes | Capturas enviadas | Pública, fornecida pelo usuário | Fotos são recortes de Instagram; não inventar modelos, clientes ou depoimentos |

## Pesquisa de mercado em 2026-11-01
- Tidelli: organização por linhas, tipologias e materiais. https://www.tidelli.com/pt-br/
- Saccaro: apresentação por ambientes, coleções e contato WhatsApp. https://www.saccaro.com.br/en
- Baymard, artigo de 2024-10-15: explicar dimensões com imagens para reduzir dúvidas de encaixe. https://baymard.com/research-articles/dimensions-measurements-product-size-image
- Instagram direto indisponível nesta sessão. Capturas fornecidas são a fonte primária da marca.
- Refero MCP retornou NO_SUBSCRIPTION; usar guias disponíveis e fontes públicas.

## Decisões confirmadas
- Usuário escolheu visual natural e elegante, fundo claro, cores da logo e fotos grandes.
- Dúvidas confirmadas: preço e formas de pagamento; frete e prazo; medidas, cores e materiais.
- O código deve ficar em andersonx553-beep/lande-pages, conforme instrução do usuário.

## Pendências de conteúdo
- Valores, medidas, prazo, endereço, horário, parcelamento e garantias não fornecidos. Não inventar.

## Skill solicitada
Comando executado: npx skills use "https://github.com/sidchaudhary/gtm-skills" --skill "landing-page".
Saída completa: /tmp/viverbem-landing-skill.txt.
Supporting files: /tmp/skills-use-OtK3mr/landing-page.
Skill exige perguntar por entradas ausentes antes de gerar a página, até três perguntas.

## Aplicação das skills adicionais
- lander-copy foi lida junto com rmbc-context e o guia de metodologia. Aplicação: títulos curtos, mecanismo de contato claro, fotos como demonstração e repetição da ação de orçamento.
- Tipo adaptado: página híbrida de inspiração e orçamento, tráfego orgânico presumido do Instagram. Preço sob consulta. Sem garantia comercial inventada e sem ancoragem de valores fictícios.
- O link fornecido para a skill de hero retornou HTTP 404 no carregador e no acesso direto. Seu endereço opaco não foi incluído no código. A abertura segue a direção visual aprovada.

## Atualização solicitada em 2026-11-01
- Usuário enviou “Melhorias para o site da Viver Bem Decorações.docx” e autorizou aplicar as melhorias. Confirmou o domínio `viverbem.deco`.
- Skill Vercel `web-design-guidelines` instalada no projeto para o agente Codex em `.agents/skills/web-design-guidelines/`, com origem em `skills-lock.json`.
- Página passou a usar assets e fontes locais cacheáveis; o HTML raiz depende de `dist/assets/` e deixou de ser autônomo. O build agora é `scripts/build-site.mjs`.
- Implementados filtros compartilháveis, movimento reduzido, entradas suaves, tipografia mínima de 12px, foco contextual e seção de história com atribuição à bio da loja.
- Novas fotos individuais, depoimentos autorizados, endereço exato e horários continuam pendentes. Não criar dados para preencher essas seções.

## Novas fotos recebidas
- Usuário forneceu duas capturas de grade do Instagram e autorizou melhorar as imagens, retirar legendas e ajustar o enquadramento usando as skills.
- Seis imagens foram tratadas com IA: Luna, Ostra, poltrona suspensa, sofá laranja, sofá verde e mesa redonda. Áreas encobertas foram reconstruídas; não inferir medidas ou materiais a partir da reconstrução.
- Asset local `dist/assets/colecao-tratada.webp`, grade 3 × 2, com enquadramento quadrado por peça em `.photo--catalog`. Nove produtos na vitrine; três substituições e três acréscimos, com formulário atualizado.
- Build e testes Chromium passaram nas larguras 320, 375, 768 e 1440 px, incluindo filtros, histórico, deep links, modal, formulário, imagens carregadas e movimento reduzido.

## Hero inspirado no componente Prisma
- Usuário enviou o prompt com o componente PrismaHero e pediu esse estilo no topo da página.
- Visual adaptado à estrutura estática existente: foto local em tela cheia, cantos arredondados, navegação escura, marca grande, texto de apoio e CTA arredondado para orçamento.
- Usa as fotos da Viver Bem; não foi incorporado o vídeo genérico externo do exemplo. Animações CSS curtas por palavra, desativadas por movimento reduzido.
- Navegação aponta para seções reais; vitrine, filtros, formulário e modal preservados. Não exige React, TypeScript, shadcn ou dependências novas para funcionar.

## Comparação de ambiente inspirada em mg-realty-staging
- O bloco `video/21st/mg-realty-staging` é destinado a Remotion; a interação foi adaptada para HTML, CSS e JavaScript nativos sem instalar React ou Remotion.
- Imagens fictícias alinhadas em `dist/assets/ambiente-vazio.webp` e `dist/assets/ambiente-viver-bem.webp`, geradas com referências do catálogo. A versão decorada usa sofá verde, duas poltronas Luna, mesa redonda e mesa lateral laranja.
- A seção `#transformacao` usa um controle `range` nativo para mouse, toque e teclado, com `aria-valuetext` atualizado. A legenda informa que a composição é uma simulação visual.
- Testes Chromium passaram em 375 e 1440 px para imagens, menu, arraste, Home/End e acessibilidade; a suíte geral continuou passando em 320, 375, 768 e 1440 px.
