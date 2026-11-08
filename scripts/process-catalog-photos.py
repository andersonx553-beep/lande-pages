#!/usr/bin/env python3
"""Prepara fotos do catálogo: remove a marca d'água da loja e gera 2 tamanhos.

Uso: python3 scripts/process-catalog-photos.py <pasta-das-fotos>

A marca "Viver Bem Decorações" fica sobre o deck de madeira. O retoque seleciona
só os pixels da marca (letras escuras e traços vermelhos) dentro de uma caixa e
reconstrói cada linha ligando a madeira da esquerda com a da direita, o que
preserva as tábuas horizontais. A faixa do texto "Decorações", abaixo das
cadeiras, é cortada.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dist" / "assets" / "catalog"

# arquivo de origem -> (nome, caixa da marca (x0, y0, x1, y1) ou None, altura final ou None)
PHOTOS = {
    "19.png":  ("jantar-redondo-vidro-6-cadeiras", None, None),
    "20.webp": ("jantar-redondo-madeira-4-cadeiras", None, None),
    "21.webp": ("estar-sofa-poltronas-pufes", None, None),
    "22.webp": ("jantar-vidro-4-poltronas", (215, 378, 395, 459), 438),
    "23.webp": ("jantar-madeira-macica-8-cadeiras", (185, 515, 465, 623), 600),
}

def remove_mark(img, box, height):
    a = np.asarray(img.convert("RGB")).astype(np.float32)[:height]
    x0, y0, x1, y1 = box
    y1 = min(y1, height)
    r, g = a[..., 0], a[..., 1]
    hit = ((r - g > 78) & (r > 140)) | (a.max(-1) < 100)
    inside = np.zeros(hit.shape, bool)
    inside[y0:y1, x0:x1] = True
    mask = Image.fromarray(((hit & inside) * 255).astype(np.uint8))
    mask = np.asarray(mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MaxFilter(3))) > 0
    out = a.copy()
    for y in range(y0, y1):
        xs = np.where(mask[y, x0:x1])[0] + x0
        if not len(xs):
            continue
        for seg in np.split(xs, np.where(np.diff(xs) > 1)[0] + 1):
            left, right = seg[0] - 1, seg[-1] + 1
            if left < 0 or right >= a.shape[1]:
                continue
            t = np.linspace(0, 1, len(seg) + 2)[1:-1][:, None]
            out[y, seg] = a[y, left] * (1 - t) + a[y, right] * t
    # suaviza só a área retocada, para não deixar listras entre as linhas
    filled = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    soft = filled.filter(ImageFilter.GaussianBlur(1.6))
    edge = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1.5))
    return Image.composite(soft, filled, edge)

def main(src_dir):
    OUT.mkdir(parents=True, exist_ok=True)
    for src, (name, box, height) in PHOTOS.items():
        img = Image.open(Path(src_dir) / src).convert("RGB")
        if box:
            img = remove_mark(img, box, height)
        img.save(OUT / f"{name}.webp", "webp", quality=86, method=6)
        small = img.resize((480, round(img.height * 480 / img.width)), Image.LANCZOS) if img.width > 480 else img
        small.save(OUT / f"{name}-480.webp", "webp", quality=82, method=6)
        print(f"  {name}: {img.size} · {(OUT / f'{name}.webp').stat().st_size // 1024}KB")

if __name__ == "__main__":
    main(sys.argv[1])
