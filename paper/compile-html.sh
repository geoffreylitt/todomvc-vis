set -e

 pandoc \
  --filter conditional-render \
  --filter pandoc-crossref \
  --filter pandoc-citeproc \
  --metadata=format:html \
  -s \
  --number-sections \
  -o paper.html \
  --css basic.css \
  --toc \
  --toc-depth=1 \
  --variable=toc-title:"Contents" \
  --template=pandoc-template-html.html \
  paper.md
