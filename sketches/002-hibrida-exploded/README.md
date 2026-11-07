# Variante C — Híbrida (Editorial + Anatomia)

**Preview:** https://claude.ai/artifact/Wr2mMdZjJj24NWPzZeVr2x

## Posição de design
Igual à Variante A na primeira dobra (protegendo a conversão), **mais** uma seção "Anatomia de uma peça" logo após a materials strip. Um painel escuro com uma poltrona à esquerda e 4 hotspots clicáveis (Encosto / Trama / Estofado / Pés). O card lateral abre a explicação técnica de cada componente. Auto-cycle quando entra na dobra, pausa no primeiro clique.

## Escolhas-chave
- **Mesmo DNA visual da Variante A** (tipos, cores, grades) — só adiciona uma seção.
- **Seção Anatomia em dark:** `#1c201a` de fundo, contraste alto, serve como "pausa" na jornada e sinaliza "aqui é profundo, olha".
- **Hotspots:** SVG overlay no topo da foto, com anéis pulsantes CSS (@keyframes pulse); clicáveis via mouse ou teclado.
- **Auto-cycle:** a cada 3.5s troca de hotspot automaticamente enquanto a seção está visível. Mata o auto-cycle no primeiro clique do usuário (não rouba o controle).

## Trade-offs
- **Forte em:** diferencia da concorrência local, cria memória ("aquele site da Viver Bem explica os móveis"), educa sem precisar de vídeo pesado.
- **Fraco em:** mais código JS (ainda vanilla, ~40 linhas a mais), mais uma seção pra manter. Os hotspots assumem UMA foto como referência — se o produto específico muda, os pontos ficam fora do lugar. Em produção, cada peça precisaria dos seus próprios coords.

## Para quem serve
Cliente que está comparando com concorrente, questiona qualidade ("compensa esse preço?"), quer entender o que faz uma peça durar. A seção Anatomia vira argumento de venda que o atendente reutiliza no WhatsApp.

## Peso (medido)
- HTML: ~28KB (6KB a mais que A)
- Fotos: iguais à A
- JS: ~90 linhas totais, sem bibliotecas
