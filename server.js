/* ─────────────────────────────────────────────────────────
   Ministry Calendar — local dev server
   Serves all static files and persists CSV updates to disk.

   Start: node server.js   (or: npm start)
   URL:   http://localhost:8080
───────────────────────────────────────────────────────── */

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app      = express();
const PORT     = process.env.PORT || 8080;
const CSV_PATH = path.join(__dirname, 'calendar.csv');

/* Accept raw text body (the CSV payload comes as plain text) */
app.use(express.text({ type: '*/*', limit: '30mb' }));

/* ── Serve every static file in the project root ── */
app.use(express.static(__dirname, {
  etag:         false,
  lastModified: false,
  setHeaders(res) {
    /* Prevent browser from caching JS/CSS so edits show immediately */
    res.setHeader('Cache-Control', 'no-store');
  }
}));

/* ── Write updated CSV back to disk ── */
app.post('/api/save-csv', (req, res) => {
  if (typeof req.body !== 'string' || !req.body.trim()) {
    return res.status(400).json({ ok: false, error: 'Body must be non-empty text' });
  }
  fs.writeFile(CSV_PATH, req.body, 'utf8', err => {
    if (err) {
      console.error('[save-csv] Write error:', err.message);
      return res.status(500).json({ ok: false, error: err.message });
    }
    const kb = (req.body.length / 1024).toFixed(1);
    console.log(`[save-csv] Saved ${kb} KB  (${new Date().toLocaleTimeString()})`);
    res.json({ ok: true, bytes: req.body.length });
  });
});

/* ── Explicit read endpoint (also served statically above) ── */
app.get('/api/csv', (_req, res) => {
  fs.readFile(CSV_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.setHeader('Cache-Control', 'no-store');
    res.type('text/csv').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`\n  ✦  Ministry Calendar  →  http://localhost:${PORT}\n`);
});
