#!/usr/bin/env python3
"""
Ministry Calendar — local dev server
Serves all static files and persists CSV updates to disk.

Start: python3 server.py
URL:   http://localhost:8080
"""

import http.server
import os
import sys

PORT      = int(os.environ.get("PORT", 8080))
CSV_FILE  = os.path.join(os.path.dirname(__file__), "calendar.csv")
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # ── Disable caching so edits show immediately ──────────────────
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma",        "no-cache")
        self.send_header("Expires",       "0")
        super().end_headers()

    def do_POST(self):
        if self.path == "/api/save-csv":
            self._handle_save_csv()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"ok":false,"error":"Not found"}')

    def _handle_save_csv(self):
        length  = int(self.headers.get("Content-Length", 0))
        payload = self.rfile.read(length)

        if not payload.strip():
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"ok":false,"error":"Empty body"}')
            return

        try:
            with open(CSV_FILE, "wb") as f:
                f.write(payload)
            kb = len(payload) / 1024
            print(f"[save-csv] Saved {kb:.1f} KB")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
        except Exception as e:
            print(f"[save-csv] Error: {e}", file=sys.stderr)
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            msg = f'{{"ok":false,"error":"{str(e)}"}}'.encode()
            self.wfile.write(msg)

    def log_message(self, fmt, *args):
        # Suppress noisy GET logs; keep POSTs and errors
        if args and isinstance(args[0], str) and args[0].startswith("POST"):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    os.chdir(DIRECTORY)
    with http.server.HTTPServer(("", PORT), Handler) as httpd:
        print(f"\n  ✦  Ministry Calendar  →  http://localhost:{PORT}\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.\n")
