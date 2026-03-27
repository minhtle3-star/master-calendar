/* ═══════════════════════════════════════════════════════════
   CSV API — calendar.csv as single source of truth
   ─────────────────────────────────────────────────────────
   Requires Papa Parse to be loaded before this script.

   Public API:
     await CsvApi.load()              – fetch & parse CSV into memory
     CsvApi.upsertRequest(req)        – add/update a request row in memory
     CsvApi.removeRequest(requestId)  – delete a request row from memory
     CsvApi.getRequestRows()          – get all managed rows as req objects
     CsvApi.syncFromLocalStorage()    – pull wm_eventRequests → CSV rows
     CsvApi.syncToLocalStorage()      – push CSV rows → wm_eventRequests
     await CsvApi.save()              – serialize & POST to /api/save-csv
     CsvApi.isLoaded()                – true after first successful load
═══════════════════════════════════════════════════════════ */

window.CsvApi = (function () {

  /* Extra columns appended for the event-request system */
  const REQUEST_COLS = ['Status', 'Category', 'RequestId', 'Room', 'SubmittedAt'];

  let _rows    = [];     // array of plain row objects keyed by header name
  let _headers = [];     // ordered column names (includes REQUEST_COLS after first load)
  let _loaded  = false;
  let _saving  = false;  // guard against concurrent saves

  /* ── Date helpers ─────────────────────────────────── */

  /* YYYY-MM-DD  →  M/D/YYYY  (calendar.csv format) */
  function isoToMDY(str) {
    if (!str) return '';
    const p = str.split('-');
    if (p.length !== 3) return str;
    return `${parseInt(p[1], 10)}/${parseInt(p[2], 10)}/${p[0]}`;
  }

  /* M/D/YYYY  →  YYYY-MM-DD  (JS/form format) */
  function mdyToIso(str) {
    if (!str) return '';
    const p = str.split('/');
    if (p.length !== 3) return '';
    const [m, d, y] = p;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  /* ── Request ↔ CSV row conversions ──────────────── */

  function reqToRow(req) {
    return {
      'Subject':       req.name        || '',
      'Start Date':    isoToMDY(req.date),
      'Start Time':    req.startTime   || '',
      'End Time':      req.endTime     || '',
      'All Day Event': '',
      'Location':      req.location    || '',
      'Details':       req.description || '',
      'Status':        req.status      || 'pending',
      'Category':      req.category    || '',
      'RequestId':     req.requestId   || '',
      'Room':          req.room        || '',
      'SubmittedAt':   req.submittedAt || '',
    };
  }

  function rowToReq(row) {
    return {
      requestId:       row['RequestId']   || '',
      status:          row['Status']      || 'pending',
      name:            row['Subject']     || '',
      date:            mdyToIso(row['Start Date']),
      startTime:       row['Start Time']  || '',
      endTime:         row['End Time']    || '',
      location:        row['Location']    || '',
      category:        row['Category']    || '',
      room:            row['Room']        || '',
      submittedAt:     row['SubmittedAt'] || '',
      description:     row['Details']     || '',
      fromCalendar:    false,
      snapshot:        {},
      denyReason:      '',
      denySuggestions: [],
      estimatedCost:   '$0',
    };
  }

  /* ── Load CSV from server ─────────────────────────── */
  async function load() {
    try {
      const resp = await fetch('/calendar.csv?_v=' + Date.now());
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text   = await resp.text();
      const result = Papa.parse(text, { header: true, skipEmptyLines: true });

      _headers = [...(result.meta.fields || [])];

      /* Append any missing request-system columns */
      for (const col of REQUEST_COLS) {
        if (!_headers.includes(col)) _headers.push(col);
      }

      /* Normalise every row to include all headers (fill blanks) */
      _rows = result.data.map(row => {
        const r = {};
        _headers.forEach(h => { r[h] = (row[h] == null ? '' : String(row[h])); });
        return r;
      });

      _loaded = true;
      console.log(`[CsvApi] Loaded ${_rows.length.toLocaleString()} rows`);
    } catch (err) {
      console.warn('[CsvApi.load] Failed:', err.message);
    }
    return _rows;
  }

  /* ── Serialize & POST to server ──────────────────── */
  async function save() {
    if (!_loaded)  return { ok: false, error: 'CSV not loaded yet' };
    if (_saving)   return { ok: false, error: 'Save already in progress' };
    _saving = true;
    try {
      const csv  = Papa.unparse({ fields: _headers, data: _rows });
      const resp = await fetch('/api/save-csv', {
        method:  'POST',
        headers: { 'Content-Type': 'text/plain' },
        body:    csv,
      });
      const json = await resp.json();
      if (!json.ok) console.warn('[CsvApi.save] Server error:', json.error);
      return json;
    } catch (err) {
      console.warn('[CsvApi.save] Failed:', err.message);
      return { ok: false, error: err.message };
    } finally {
      _saving = false;
    }
  }

  /* ── Upsert one request row (by RequestId) ───────── */
  function upsertRequest(req) {
    if (!req || !req.requestId) return;
    const incoming = reqToRow(req);
    const idx      = _rows.findIndex(r => r['RequestId'] === req.requestId);
    if (idx >= 0) {
      /* Update managed columns, preserve anything we don't own */
      Object.assign(_rows[idx], incoming);
    } else {
      /* New row — fill all headers */
      const full = {};
      _headers.forEach(h => { full[h] = incoming[h] != null ? incoming[h] : ''; });
      _rows.push(full);
    }
  }

  /* ── Remove a request row ────────────────────────── */
  function removeRequest(id) {
    _rows = _rows.filter(r => r['RequestId'] !== id);
  }

  /* ── Get all managed rows as request objects ─────── */
  function getRequestRows() {
    return _rows.filter(r => r['RequestId']).map(rowToReq);
  }

  /* ── Sync: localStorage → CSV rows (before save) ── */
  function syncFromLocalStorage() {
    if (!_loaded) return;
    try {
      const reqs = JSON.parse(localStorage.getItem('wm_eventRequests') || '[]');
      /* Remove all previously managed rows */
      _rows = _rows.filter(r => !r['RequestId']);
      /* Re-insert every current request */
      reqs.forEach(req => {
        const row  = reqToRow(req);
        const full = {};
        _headers.forEach(h => { full[h] = row[h] != null ? row[h] : ''; });
        _rows.push(full);
      });
    } catch (err) {
      console.warn('[CsvApi.syncFromLocalStorage]', err);
    }
  }

  /* ── Sync: CSV rows → localStorage (on startup) ──── */
  function syncToLocalStorage() {
    if (!_loaded) return;
    try {
      const csvReqs = getRequestRows();
      if (!csvReqs.length) return;

      const existing = JSON.parse(localStorage.getItem('wm_eventRequests') || '[]');
      const byId     = {};
      existing.forEach(r => { if (r.requestId) byId[r.requestId] = r; });

      csvReqs.forEach(cr => {
        if (byId[cr.requestId]) {
          /* CSV is authoritative for status & room; preserve rich localStorage data */
          byId[cr.requestId].status = cr.status;
          if (cr.room) byId[cr.requestId].room = cr.room;
        } else {
          byId[cr.requestId] = cr;
        }
      });

      localStorage.setItem('wm_eventRequests', JSON.stringify(Object.values(byId)));
      console.log(`[CsvApi] Synced ${csvReqs.length} request(s) to localStorage`);
    } catch (err) {
      console.warn('[CsvApi.syncToLocalStorage]', err);
    }
  }

  return {
    load,
    save,
    upsertRequest,
    removeRequest,
    getRequestRows,
    syncFromLocalStorage,
    syncToLocalStorage,
    isLoaded: () => _loaded,
  };

})();
