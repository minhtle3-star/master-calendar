/* ════════════════════════════════════════
   UTILS.JS — Shared utility functions
   Load this before all other page scripts.
════════════════════════════════════════ */

/* ── Category color map (single source of truth) ────────────
   Used by calendar.js, admin.js, and rooms.js.
   To add or change a category color, edit here only.
──────────────────────────────────────────────────────────── */
const CATEGORY_COLORS = {
  'Sunday Services':        '#003A5D',
  'Kids Team':              '#B5712A',
  'Ministry Programs':      '#1E5E7A',
  'Equipping Team':         '#2E6B5E',
  'Care Team':              '#7A3E5C',
  'Special Events':         '#8B3A28',
  'Leadership Team':        '#48565A',
  'Missions & Outreach':    '#C2653C',
  'Students & College':     '#2889A0',
  'Operations Team':        '#556270',
  'Marriage Team':          '#B04F6D',
  'Young Adults':           '#6A4C93',
  'Institute Team':         '#3A7D44',
  'Community & Connecting': '#4A8FA8',
  'Watermark en Espanol':   '#C17D2A',
  'Health & CDC':           '#5B8C5A',
  'Family Team':            '#A0783B',
};

function catColor(cat) {
  return CATEGORY_COLORS[cat] || '#6B7880';
}

/* ── HTML escaping ───────────────────────────────────────── */
function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Date / time helpers ─────────────────────────────────── */

/** Date → "YYYY-MM-DD" using local time (safe for date-only comparisons) */
function fmtDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/** Alias used by rooms.js — identical to fmtDateKey */
const toISODate = fmtDateKey;

/** Date → "Monday, January 1, 2026" */
function fmtDateFull(d) {
  return d.toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
}

/**
 * Format a time string for display.
 * Handles both 24h ("08:30") and 12h ("8:30 AM") input.
 * Output: "8:30 AM" or "8 AM"
 */
function fmtTime(t) {
  if (!t) return '';
  const [hm, ap] = t.split(' ');
  const [h, mi]  = hm.split(':');
  let hour = parseInt(h);
  const ampm = (ap || '').toUpperCase() || (hour >= 12 ? 'PM' : 'AM');
  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return new Date(2000, 0, 1, hour, parseInt(mi || 0))
    .toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit', hour12:true});
}

/** "HH:MM" or "H:MM AM/PM" → total minutes since midnight */
function minsFromMidnight(t) {
  if (!t) return 0;
  const upper = t.toUpperCase();
  const isPM  = upper.includes('PM');
  const isAM  = upper.includes('AM');
  const clean = t.replace(/[^0-9:]/g, '');
  const [hStr, mStr] = clean.split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;
  if (isPM && h !== 12) h += 12;
  if (isAM && h === 12) h = 0;
  return h * 60 + m;
}

/** Minutes since midnight → "HH:MM" 24h string (for <input type="time">) */
function minsToTime(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

/** Any time string (12h or 24h) → "HH:MM" 24h string (for <input type="time">) */
function to24h(t) {
  if (!t) return '';
  const upper = t.toUpperCase().trim();
  const isPM  = upper.includes('PM');
  const isAM  = upper.includes('AM');
  const clean = t.replace(/[^0-9:]/g, '');
  const [hStr, mStr] = clean.split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;
  if (isPM && h !== 12) h += 12;
  if (isAM && h === 12) h = 0;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

/* ── localStorage helpers ────────────────────────────────── */

/**
 * Safe JSON read from localStorage.
 * Returns `fallback` if the key is missing or the value is not valid JSON.
 */
function getFromStorage(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safe JSON write to localStorage.
 * Returns true on success, false on quota/permission failure.
 */
function saveToStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    return true;
  } catch (e) {
    console.warn('[storage] Failed to save key:', key, e);
    return false;
  }
}
