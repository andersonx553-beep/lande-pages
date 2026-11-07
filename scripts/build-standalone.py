#!/usr/bin/env python3
"""Gera um HTML único e independente a partir de dist/index.html.

Uso: python3 scripts/build-standalone.py [saida.html]

Embute imagens e fontes como data URIs, para o arquivo abrir sozinho, sem a
pasta dist/assets/. Usa um tamanho por imagem (o do atributo src) para o
arquivo não ficar pesado. Para hospedar, prefira o index.html da raiz com a
pasta dist/assets/: ele carrega imagens no tamanho certo para cada tela.
"""
import base64, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "dist" / "index.html"
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "viver-bem-decoracoes.html"
MIME = {".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png"}

html = SRC.read_text(encoding="utf-8")
html = re.sub(r'\s*<link rel="preload"[^>]*>', "", html)          # pré-carregamentos não fazem sentido embutidos
html = re.sub(r'\s(?:srcset|imagesrcset|sizes)="[^"]*"', "", html)  # um tamanho por imagem

cache = {}
def data_uri(match):
    rel = match.group(0)
    if rel not in cache:
        f = ROOT / "dist" / rel
        cache[rel] = f"data:{MIME[f.suffix]};base64," + base64.b64encode(f.read_bytes()).decode()
    return cache[rel]

html = re.sub(r'(?<![\w./-])assets/[\w./-]+\.(?:webp|svg|woff2|png)', data_uri, html)
OUT.write_text(html, encoding="utf-8")
print(f"{OUT.name}: {OUT.stat().st_size / 1_048_576:.1f}MB, {len(cache)} arquivos embutidos")
