# Variante A — Editorial Estático

**Preview:** https://claude.ai/artifact/TL2JpemNBQdwNg7YhKeDMg

## Posição de design
Hero editorial próxima da mockup de referência. Serif Fraunces + Inter, paleta areia + verde-oliva + terracota, foto full-bleed. Micro-interações sutis (stagger de entrada, hover nos cards, scroll reveal) feitas com CSS puro + Intersection Observer.

## Escolhas-chave
- **Tipografia:** Fraunces (serif com peso editorial, versão italic para ênfases); Inter para UI.
- **Cor:** `--bg: #f3efe6` (areia), `--accent: #2d3a2a` (verde-oliva), `--accent-2: #b8713a` (terracota). Paleta que envelhece bem e diz "tradição confiável".
- **Layout:** hero com grid 2 colunas (headline + dados), strip de materiais, grade de coleção com tamanhos assimétricos, seção "entregas recentes" como prova social, bloco "50 anos" centralizado.
- **Interação:** reveal on scroll, hover nos cards (lift + zoom na imagem), transições de 180–900ms com easing cubic-bezier.

## Trade-offs
- **Forte em:** conversão previsível, LCP baixo, acessibilidade; usável no 4G sem tropeço.
- **Fraco em:** não impressiona um visitante que já viu muito landing page premium — é "só" bem feito.

## Para quem serve
Cliente que chega pelo WhatsApp/Instagram, dá uma rolada rápida, quer entender o que tem na loja e decidir se vale mandar mensagem. É a aposta segura.

## Peso (medido)
- HTML: ~22KB
- Fotos (hero + lazy): ~1.2MB total, mas só o hero carrega na dobra (~360KB)
- Fontes Google: ~60KB (Fraunces + Inter, display=swap)
- Zero bibliotecas JS (só ~50 linhas inline)
