#!/usr/bin/env python3
"""Processa fotos reais de entregas da Viver Bem:
- Detecta transição foto->tarja na parte inferior e corta
- Corta logo da foto 5
- Gera 3 tamanhos responsivos em webp
"""
from pathlib import Path
from PIL import Image, ImageStat, ImageFilter

SRC = Path("/tmp/claude-0/-home-user-lande-pages/1599eae2-845a-54ea-a769-fb85a18e36a8/images")
OUT = Path("/home/user/lande-pages/src/assets/products")
OUT.mkdir(parents=True, exist_ok=True)

CONFIG = [
    ("entrega-fortaleza-conjunto", "9.webp", "auto"),
    ("entrega-guaramiranga-varanda", "7.webp", "auto"),
    ("entrega-fortaleza-pendente", "8.webp", "auto"),
    ("composicao-fibra-sintetica", "6.webp", "auto"),
    ("poltrona-trama-preta", "5.webp", "logo"),
]

def row_std(img, y):
    """Desvio padrão de cor numa linha horizontal — baixo = cor sólida."""
    w = img.size[0]
    strip = img.crop((0, y, w, y+2)).convert("RGB")
    stat = ImageStat.Stat(strip)
    return sum(stat.stddev) / 3

def detect_photo_end(img, max_band_pct=0.35):
    """
    Procura onde a FOTO termina e a tarja começa.
    Estratégia: percorrer de cima pra baixo na zona inferior; na transição
    foto->cor sólida o std da linha cai abruptamente e permanece baixo.
    """
    w, h = img.size
    start = int(h * (1 - max_band_pct))
    # Blur leve pra ignorar ruído de texto dentro da tarja
    small = img.resize((w, h), Image.LANCZOS).filter(ImageFilter.GaussianBlur(2))
    # Pontuações por linha
    stds = [row_std(small, y) for y in range(start, h, 4)]
    if not stds:
        return h
    # Encontra primeiro y onde std cai pra <15 E as próximas 5 amostras tbm ficam baixas
    for i in range(len(stds) - 5):
        if stds[i] < 18 and all(s < 25 for s in stds[i:i+5]):
            return start + i * 4 - 4  # pequeno buffer pra não deixar pixel da tarja
    return h  # não achou tarja — mantém inteira

def process(name, src_name, mode):
    src = SRC / src_name
    img = Image.open(src).convert("RGB")
    w, h = img.size

    if mode == "auto":
        cut_y = detect_photo_end(img)
        print(f"  tarja detectada em y={cut_y}/{h} ({(h-cut_y)*100/h:.0f}% cortado)")
        img = img.crop((0, 0, w, cut_y))
    elif mode == "logo":
        # Foto 5: logo marca d'água no canto inferior direito, numa faixa clara.
        # Corta 20% inferior — mantém proporção landscape agradável e remove logo.
        # Foto 5: corte agressivo — remove canto inferior direito onde está o logo.
        # A cadeira está roughly em 20-70% horizontal. Cortar 25% da direita + 22% da base
        # elimina o logo e mantém a cadeira centralizada no quadro.
        new_h = int(h * 0.74)  # -26% base
        new_w = int(w * 0.75)  # -25% direita
        img = img.crop((0, 0, new_w, new_h))
        print(f"  corte: -26% base, -25% direita (remove logo marca d'água)")

    w2, h2 = img.size
    for size_name, max_w in [("sm", 480), ("md", 960), ("lg", 1600)]:
        resized = img if w2 <= max_w else img.resize((max_w, int(h2 * max_w / w2)), Image.LANCZOS)
        out = OUT / f"{name}-{size_name}.webp"
        q = {"sm": 78, "md": 80, "lg": 82}[size_name]
        resized.save(out, "webp", quality=q, method=6)
        print(f"    {out.name}: {resized.size} {out.stat().st_size/1024:.1f}KB")

for cfg in CONFIG:
    print(f"\n{cfg[0]} (de {cfg[1]}):")
    process(*cfg)
print("\nDone.")
