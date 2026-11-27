"""Servidor local com gzip (igual ao GitHub Pages) para medir desempenho de verdade.
Uso: python fabrica-estudio/servidor_gzip.py 8091   (na raiz do worktree)"""
import gzip
import http.server
import sys
from functools import partial
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
COMPRIME = {".html", ".js", ".css", ".json", ".svg", ".txt", ".woff2x"}


class Gzip(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def send_head(self):
        caminho = Path(self.translate_path(self.path))
        if caminho.is_file() and caminho.suffix in COMPRIME and "gzip" in self.headers.get("Accept-Encoding", ""):
            dados = gzip.compress(caminho.read_bytes(), 6)
            self.send_response(200)
            self.send_header("Content-Type", self.guess_type(str(caminho)))
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(dados)))
            self.send_header("Cache-Control", "max-age=600")
            self.end_headers()
            from io import BytesIO
            return BytesIO(dados)
        return super().send_head()


if __name__ == "__main__":
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else 8091
    http.server.ThreadingHTTPServer(("127.0.0.1", porta), partial(Gzip, directory=str(RAIZ))).serve_forever()
