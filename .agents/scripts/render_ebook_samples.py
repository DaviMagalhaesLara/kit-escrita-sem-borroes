from pathlib import Path
import math
import fitz

pdf_path = Path("attached_assets/Kit_Escrita_Sem_Borroes_50_paginas_1788088839310.pdf")
output_dir = Path(".agents/outputs/ebook-samples")
output_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"pages={doc.page_count}")

# Render a readable contact sheet first so the strongest sample pages can be chosen.
thumb_width = 220
thumb_height = 285
columns = 5
rows = math.ceil(doc.page_count / columns)
sheet = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, columns * thumb_width, rows * (thumb_height + 28)), False)
sheet.set_rect(sheet.irect, (248, 245, 237))

for index, page in enumerate(doc):
    rect = page.rect
    scale = min((thumb_width - 12) / rect.width, (thumb_height - 12) / rect.height)
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), colorspace=fitz.csRGB, alpha=False)
    x = (index % columns) * thumb_width + (thumb_width - pix.width) // 2
    y = (index // columns) * (thumb_height + 28) + 6
    sheet.copy(pix, fitz.IRect(x, y, x + pix.width, y + pix.height))

sheet.save(output_dir / "contact-sheet.png")

# Render likely samples at production-ready 2x scale. The contact sheet is used
# to refine this list if the document's visual rhythm suggests better choices.
sample_pages = [1, 2, 3, 6, 10, 15, 20, 25, 30, 40]
for page_number in sample_pages:
    page = doc[page_number - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25), colorspace=fitz.csRGB, alpha=False)
    pix.save(output_dir / f"page-{page_number:02d}.png")
    print(f"rendered page {page_number}: {pix.width}x{pix.height}")