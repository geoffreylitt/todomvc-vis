set -e

# kill any existing servers
ps aux | grep node | grep browser-sync | awk '{ print $2}' | xargs kill

ls *.md | entr -s "./compile-html.sh && ./compile-latex.sh" &
browser-sync start --server --files paper.html --no-notify --no-open --port 9000 &

open "http://localhost:9000/paper.html"

