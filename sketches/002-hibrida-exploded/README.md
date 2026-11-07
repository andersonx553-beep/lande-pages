# Variante C — Piloto

**Prévia:** https://claude.ai/artifact/Wr2mMdZjJj24NWPzZeVr2x

## Conceito
A cadeira pendente começa pendurada na cena da varanda. Ao rolar, ela sai da foto,
atravessa "O conforto ganha presença" e pousa em "Um convite para ficar", onde
aparecem os rótulos Trama e Estofado. A página continua rolando normalmente:
não há trecho preso na tela.

## Fluxo
1. Hero: varanda ao fim da tarde, texto na parede clara, botão para as peças.
2. O conforto ganha presença: detalhes de Trama e Toque.
3. Um convite para ficar: a cadeira pousa, com rótulos.
4. Peças: 6 peças; cada uma abre um detalhe com WhatsApp e mensagem pronta.
5. Nossa essência: texto, números (50 anos, Fortaleza e interior, entrega) e entregas recentes reais.
6. Perguntas frequentes e contato (WhatsApp principal, Instagram secundário).

## Técnica
- A viagem é calculada a partir da posição real da cadeira na foto (respeita o
  `object-fit: cover`), então funciona em qualquer largura, do celular ao 4K.
- Raiz tipográfica fluida em `rem`: a composição cresce por igual em telas grandes.
- Sem bibliotecas. `prefers-reduced-motion` e o botão "Pausar movimentos" deixam
  a cadeira parada no lugar onde ela pousa.
- Imagens: `scripts/process-hero-assets.py` (cenário, recorte da cadeira, detalhes)
  e `scripts/extract-reference-assets.py` (logo e peças do HTML de referência).

## Pendências
- Imagens em resolução maior para 4K (cenário ~3.800px, cadeira ~2.000px de altura).
- Fotos das peças com o mesmo fundo e a mesma luz, para a grade ficar uniforme.
- Confirmar com a loja: "50 anos", área de entrega e descrições das peças.
