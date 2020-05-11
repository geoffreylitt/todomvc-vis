set -e

pandoc \
  --filter conditional-render \
  --filter pandoc-crossref \
  --filter pandoc-citeproc \
  -s \
  -o \
  paper.tex \
  --template=chi.tex \
  --biblatex \
  --metadata=format:pdf \
  paper.md

pdflatex paper.tex
biber paper
pdflatex -interaction=batchmode paper.tex
pdflatex -interaction=batchmode paper.tex
open paper.pdf
