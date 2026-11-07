#!/usr/bin/env python3
"""Trata as imagens da hero: cenário da varanda e cadeira pendente.

Uso: python3 scripts/process-hero-assets.py <cenario> <cadeira-fundo-branco>

- Cenário: 3 larguras em WebP.
- Cadeira: remove o fundo branco (inclusive entre as tramas), tira o halo branco
  das bordas, aquece a luz para combinar com o fim de tarde da cena e salva
  WebP com transparência em 3 larguras.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets" / "hero"

def save(img, name, width, q):
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    p = OUT / name
    img.save(p, "webp", quality=q, method=6)
    print(f"  {p.relative_to(ROOT)}  {img.size}  {p.stat().st_size // 1024}KB")

def cut_white(img):
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    dist = 255 - a.min(axis=2)                     # 0 = branco puro
    sat = a.max(axis=2) - a.min(axis=2)
    alpha = np.clip((dist - 6) / 30, 0, 1)         # rampa suave de 6 a 36
    alpha = np.where(sat > 22, np.maximum(alpha, 0.98), alpha)  # cor saturada nunca some
    # tira o halo branco: desfaz a mistura com o branco nas bordas
    safe = np.maximum(alpha, 1e-3)[..., None]
    rgb = np.clip((a - 255 * (1 - safe)) / safe, 0, 255)
    # luz de fim de tarde: um pouco mais quente e menos brilhante
    rgb = rgb * np.array([1.03, 0.99, 0.90]) * 0.96
    rgba = np.dstack([np.clip(rgb, 0, 255), alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba, "RGBA")
    return out.crop(out.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())

def main(scene, chair):
    OUT.mkdir(parents=True, exist_ok=True)
    print("cenário")
    s = Image.open(scene).convert("RGB")
    for w in (768, 1280, 1738):
        save(s, f"cenario-{w}.webp", w, 84)
    print("cadeira")
    c = cut_white(Image.open(chair))
    for w in (420, 760, 1073):
        save(c, f"cadeira-pendente-{w}.webp", w, 88)
    print("detalhes (cards Trama / Toque)")
    base = Image.new("RGBA", c.size, (217, 200, 176, 255))
    base.alpha_composite(c)
    base = base.convert("RGB")
    W, H = base.size
    save(base.crop((int(W*.56), int(H*.58), int(W*.95), int(H*.80))), "detalhe-trama.webp", 800, 86)
    save(base.crop((int(W*.03), int(H*.58), int(W*.40), int(H*.76))), "detalhe-toque.webp", 800, 86)

if __name__ == "__main__":
    main(*sys.argv[1:3])
