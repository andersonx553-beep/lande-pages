# Sketches — Nova hero + landing page

Protótipos descartáveis para comparar direções de execução antes de promover para `index.html`.
Cada subpasta é uma variante self-contained (um `index.html` + a pasta `assets/` com as fotos processadas).

## Variantes

| # | Nome | Preview | O que explora |
|---|---|---|---|
| 001 | Editorial Estático | [Artifact](https://claude.ai/artifact/TL2JpemNBQdwNg7YhKeDMg) | Hero editorial próximo da mockup de referência, micro-interações sutis. Aposta segura. |
| 002 | Híbrida + Anatomia | [Artifact](https://claude.ai/artifact/Wr2mMdZjJj24NWPzZeVr2x) | Igual à A + seção interativa "Anatomia de uma peça" com hotspots clicáveis. |

## Como abrir localmente
```bash
# macOS
open sketches/001-editorial-estatico/index.html
# Linux
xdg-open sketches/001-editorial-estatico/index.html
```

## Head-to-head rápido

| Dimensão | A — Editorial | C — Híbrida |
|---|---|---|
| Primeira dobra | Idênticas | Idênticas |
| Diferencial visual | Nenhum (só feito bonito) | Seção Anatomia interativa |
| JS inline | ~50 linhas | ~90 linhas |
| Risco mobile | Baixo | Baixo (seção empilha e vira cards) |
| Peso HTML | ~22KB | ~28KB |
| Converte? | Alto previsível | Alto + impressiona |

**Opinião do autor:** começar pela C em produção. A primeira dobra idêntica protege a conversão; a seção Anatomia é o diferencial que o concorrente local não tem e vira argumento de venda reutilizável pelo WhatsApp.

## Processamento das fotos

As 5 fotos reais de entregas foram processadas com `scripts/process-photos.py` (ajuste `SRC` para a pasta das fotos originais):
- Tarjas inferiores ("Composição em Fibra Sintética", "Entregas do dia ...") cortadas por detecção automática de cor sólida.
- Logo marca d'água da foto 5 (`poltrona-trama-preta`) removido por crop assimétrico.
- 3 tamanhos responsivos por foto (`-sm` 480w, `-md` 960w, `-lg` até 1600w) em WebP, qualidade 78–82.
- Hero comprime pra <380KB no `-lg`.

> As pastas `assets/` das variantes são links para `src/assets/products/` (sem fotos duplicadas).

## Próximo passo
Escolher uma variante (ou combinar) e promover o HTML para `index.html`, integrando no pipeline Tailwind v4 existente.
