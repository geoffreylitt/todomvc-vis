# Data Vis 6.894 Final Project Paper

pandoc pipeline for publishing to CHI template + html

Source files:

* Paper: `paper.md`
* CHI template: `chi.tex`
* HTML template: `pandoc-template-html.html`

## Compile

First install `paru` for ruby: `sudo gem install paru`. (May require a ruby upgrade)

Also install ImageMagick: `brew install imagemagick` for png conversion.

To view HTML with a live preview: `./watch.sh`

To compile to HTML: `./compile-html.sh`
To compile to PDF through Latex: `./compile-latex.sh && open paper.pdf`

