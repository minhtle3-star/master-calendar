/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */
const CATEGORIES = {
  'Sunday Services':       { color: '#003A5D', pattern: /sunday service|easter|good friday|bilingual service|csi sundays/i },
  'Kids Team':             { color: '#B5712A', pattern: /\bkids\b|preschool|kaleidoscope|\bk1\b|23 kids|45 kids|midweek membership|elementary leader|field day|\d(st|th) grade celebration|family fun day|risd spring|father-son/i },
  'Ministry Programs':     { color: '#1E5E7A', pattern: /legacy \d/i },
  'Equipping Team':        { color: '#2E6B5E', pattern: /small group|discipleship group|community group|asida|multiplying discipleship|equipped disciple|equip disciple|men'?s bible study|join the journey|sign language class|financial catalyst|dad u |moneywise|\bwbs\b|discipleship info|disciple-making intensive|careers in motion/i },
  'Care Team':             { color: '#7A3E5C', pattern: /support group|care ministry|feeding support|infertility|miscarriage|prenatal|courageous hope|prodigal|\bmend\b|\bblended\b|oasis single parent|worth more|\brefuge\b|recess|unexpected pregnancy|foster care|expecting parents|reclaimed|\bnest\b|deaf|wellness collective|care forum|woven|parent training|additional care|\bch\b spring.*leader|re:generation(?! for students)/i },
  'Special Events':        { color: '#8B3A28', pattern: /baptism|holiday|retreat|trip information|young adult trip|pine cove|community group weekend|night of prayer|night of remembrance|if: one night|\brfs\b/i },
  'Leadership Team':       { color: '#48565A', pattern: /staff prayer|leadership meeting|leadership team|team meeting|square one|staff |connecting team|march madness|slt meeting|\bclc\b|budget week|semester|young leader cohort|worship team nights|\btbc\b|lead team|strategic planning|business cohort|leader celebration|budgets due|gather leadership/i },
  'Missions & Outreach': { color: '#C2653C', pattern: /\bmissions?\b|mission of god|dominican republic|ethiopia trip|wisi|street outreach|local outreach|wme volunteer|dallas justice|love thy neighbor|great question/i },
  'Students & College':    { color: '#2889A0', pattern: /\brally\b|re:g?erneration for students|shoreline|6th hour|\bdtown\b|bagels.*bibles|dallas experience|camp barnabas|prom|senior celebration|unashamed|family dt trip|^wake\b/i },
  'Operations Team':       { color: '#556270', pattern: /\bsmmt\b|cyber patrol|memorial day/i },
  'Marriage Team':         { color: '#B04F6D', pattern: /\bmerge\b|re\|engage|divorce recovery|grief share|grief recovery/i },
  'Young Adults':          { color: '#6A4C93', pattern: /\bporch\b|disciple maker/i },
  'Institute Team':        { color: '#3A7D44', pattern: /stand and deliver|dts commencement/i },
  'Community & Connecting': { color: '#4A8FA8', pattern: /community formation|\bfoundation group\b|\bgather\b|connecting basic|connecting volunteer|weekend membership|shepherd huddle|launcher training|fomacion|women'?s family leadership|frontlines/i },
  'Watermark en Espanol':  { color: '#C17D2A', pattern: /watermark en espanol/i },
  'Health & CDC':          { color: '#5B8C5A', pattern: /\bcdc\b|watermark health/i },
  'Family Team':           { color: '#A0783B', pattern: /trail life/i },
};

const DEPT_NAMES = ['Facilities','Production','Comms','Midweek Kids','Worship'];

const SERVICE_MENU = {
  Facilities: [
    { name: 'Weekly ministry, single room',                        levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Weekly ministry, multiple rooms',                     levels: ['Green','Blue','Black','Double Black'] },
    { name: 'One time event, single room, basic set up',           levels: ['Green','Blue','Black','Double Black'] },
    { name: 'One time event, single room, custom set up',          levels: ['Blue','Black','Double Black'] },
    { name: 'One time event, multiple rooms',                      levels: ['Blue','Black','Double Black'] },
    { name: 'Auditorium included',                                 levels: ['Blue','Black','Double Black'] },
    { name: 'Common Space and/or Parking Lot Closure',             levels: ['Blue','Black','Double Black'] },
    { name: 'Common Space and/or Parking Lot Set Up, Vendors',     levels: ['Black','Double Black'] },
    { name: 'Multiple Room Resets',                                levels: ['Double Black'] },
  ],
  Worship: [
    { name: 'Volunteer musicians',                                 levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Staff or volunteer worship leaders',                  levels: ['Blue','Black','Double Black'] },
    { name: 'Guest speaker(s) or artist(s)',                       levels: ['Black','Double Black'] },
  ],
  Production: [
    { name: 'Volunteer led, no staff',                             levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Standard AV Presets',                                 levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Volunteer led, occasional staff',                     levels: ['Blue','Black','Double Black'] },
    { name: 'Content Assistance',                                  levels: ['Blue','Black','Double Black'] },
    { name: 'Staff Led',                                           levels: ['Black','Double Black'] },
    { name: 'Staff Audio Mixing',                                  levels: ['Black','Double Black'] },
    { name: 'Live Video Support (IMAG, Broadcasting, Recording)',   levels: ['Black','Double Black'] },
    { name: 'Lighting & Stage Design',                             levels: ['Black','Double Black'] },
    { name: 'Content Creation',                                    levels: ['Black','Double Black'] },
    { name: 'Other set-up (outdoors, off-site, etc.)',             levels: ['Black','Double Black'] },
    { name: 'Sunday Takeover',                                     levels: ['Double Black'] },
  ],
  Comms: [
    { name: 'Campaign brief with channel plan',                    levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Creative Package',                                    levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Creative Direction (from existing brand guide)',       levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Event page copy/review',                              levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Self-service iPad studio',                            levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Self-service multi-cam studio',                       levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Creative Direction (from ministry and/or brand)',      levels: ['Blue','Black','Double Black'] },
    { name: 'Web strategy review',                                 levels: ['Blue','Black','Double Black'] },
    { name: 'Photography support (as strategic and available)',     levels: ['Blue','Black','Double Black'] },
    { name: 'Creative Direction (7th floor directed)',              levels: ['Black','Double Black'] },
    { name: 'Written content support',                             levels: ['Black','Double Black'] },
    { name: 'Curriculum support, with approval',                   levels: ['Black','Double Black'] },
    { name: 'Film support, with approval',                         levels: ['Black','Double Black'] },
    { name: 'Programming support (run of show consulting)',         levels: ['Black','Double Black'] },
    { name: 'On-site social media support',                        levels: ['Double Black'] },
    { name: 'Environmental design, installation',                  levels: ['Double Black'] },
    { name: 'Ministry Channels',                                   levels: ['Green','Blue','Black','Double Black'] },
    { name: 'watermark.org Event Page',                            levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Pre-Roll',                                            levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Print Watermark News',                                levels: ['Green','Blue','Black','Double Black'] },
    { name: 'The Current',                                         levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Watermark Instagram',                                 levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Watermark Facebook',                                  levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Watermark Twitter/X',                                 levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Rock/Mailchimp Marketing Email',                      levels: ['Blue','Black','Double Black'] },
    { name: 'Homepage Takeover',                                   levels: ['Black','Double Black'] },
    { name: 'watermark.org/live',                                  levels: ['Black','Double Black'] },
    { name: 'Watermark News Extras',                               levels: ['Black','Double Black'] },
    { name: 'All Church Text Messaging',                           levels: ['Black','Double Black'] },
    { name: 'Paid Social Campaign',                                levels: ['Black','Double Black'] },
    { name: 'Billboard (with approval)',                           levels: ['Double Black'] },
    { name: 'Microsite, landing page, or app (with approval)',     levels: ['Double Black'] },
    { name: 'Title Card – 1920×1080',                              levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Square Title Card – 1080×1080',                       levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Tall Title Card 1 – 1080×1350',                       levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Tall Title Card 2 – 1080×1920',                       levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Static Pre-Roll Slide – 1920×1080',                   levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Current Image 1 – 1920×1080',                         levels: ['Green','Blue','Black','Double Black'] },
    { name: 'Current Image 2 – 1200×900',                          levels: ['Green','Blue','Black','Double Black'] },
    { name: 'OTS (Over the Shoulder) – 608×1080',                  levels: ['Green','Blue','Black','Double Black'] },
    { name: 'T-Shirt Design, with solidified concept',             levels: ['Blue','Black','Double Black'] },
    { name: 'Name Tag Design',                                     levels: ['Blue','Black','Double Black'] },
    { name: 'Email Header',                                        levels: ['Blue','Black','Double Black'] },
    { name: 'Stage Graphics (as needed)',                          levels: ['Blue','Black','Double Black'] },
    { name: 'Editable Logo and Font Files',                        levels: ['Blue','Black','Double Black'] },
    { name: 'Editable Background Texture Files',                   levels: ['Blue','Black','Double Black'] },
    { name: 'Full Brand Guide',                                    levels: ['Black','Double Black'] },
    { name: 'Signage (simple, directional)',                       levels: ['Black','Double Black'] },
    { name: 'Print Piece (booklet, brochure, one-pager)',          levels: ['Black','Double Black'] },
    { name: 'Stage Bumper',                                        levels: ['Black','Double Black'] },
    { name: 'Animated Pre-Roll',                                   levels: ['Black','Double Black'] },
    { name: 'Social Media Film',                                   levels: ['Black','Double Black'] },
    { name: 'Environmental design',                                levels: ['Double Black'] },
    { name: 'Additional Merch or Swag',                            levels: ['Double Black'] },
    { name: 'Additional Programming Elements (testimonial)',        levels: ['Double Black'] },
  ],
};

function getCustomTodos() { try { return JSON.parse(localStorage.getItem('customTodos')||'[]'); } catch { return []; } }
function saveCustomTodos(todos) { localStorage.setItem('customTodos', JSON.stringify(todos)); }

const WEEKDAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS     = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let allEvents      = [];
let filteredEvents = [];
let currentView    = 'dashboard';
let calendarDate   = new Date();
let chartInstances = {};
let activeFilters  = { search:'', categories: new Set(), dept:'', statuses: new Set(), from: null, to: null, secCategories: new Set() };
let miniCalYear = null, miniCalMonth = null;

/* ── Actions dropdown ── */
function toggleCalActions() {
  document.getElementById('cal-actions-wrap')?.classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#cal-actions-wrap')) {
    document.getElementById('cal-actions-wrap')?.classList.remove('open');
  }
});
/* Sync Actions button label with current role on load */
window.addEventListener('rolechange', () => {
  if (window.AppRole) AppRole.applyVisibility();
});
document.addEventListener('DOMContentLoaded', () => {
  // Let roles.js run first, then sync the button label
  setTimeout(() => { window.AppRole?.applyRole(); }, 80);
});

/* ── Blackout date helpers ── */
function getBlackoutDates() {
  try { return JSON.parse(localStorage.getItem('wm_blackoutDates') || '[]'); }
  catch { return []; }
}
function isBlackoutDate(dateIso) {
  return getBlackoutDates().find(b => b.date === dateIso) || null;
}

/* ═══════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════ */
function categorizeEvent(name) {
  for (const [cat, cfg] of Object.entries(CATEGORIES))
    if (cfg.pattern.test(name)) return cat;
  return 'Other';
}
/* ---- Category Override Persistence ---- */
function getCategoryOverrides() {
  try { return JSON.parse(localStorage.getItem('categoryOverrides') || '{}'); }
  catch { return {}; }
}
function setCategoryOverride(subject, category) {
  const overrides = getCategoryOverrides();
  if (category === categorizeEvent(subject)) delete overrides[subject];
  else overrides[subject] = category;
  localStorage.setItem('categoryOverrides', JSON.stringify(overrides));
}
function getEffectiveCategory(subject) {
  const overrides = getCategoryOverrides();
  const override = overrides[subject];
  if (override && (CATEGORIES[override] || override === 'Other')) return override;
  return categorizeEvent(subject);
}
function reapplyOverrides(subject, newCategory) {
  for (const ev of allEvents) {
    if (ev.subject === subject) ev.category = newCategory;
  }
}

/* ---- Secondary Category Persistence ---- */
function getSecondaryCategories() {
  try { return JSON.parse(localStorage.getItem('secondaryCategories') || '{}'); }
  catch { return {}; }
}
function setSecondaryCategory(subject, category) {
  const sec = getSecondaryCategories();
  if (!category || category === '' || category === 'None') delete sec[subject];
  else sec[subject] = category;
  localStorage.setItem('secondaryCategories', JSON.stringify(sec));
}
function getSecondaryCategory(subject) {
  const sec = getSecondaryCategories();
  const cat = sec[subject];
  if (cat && (CATEGORIES[cat] || cat === 'Other')) return cat;
  return null;
}

/* ---- Event URL Persistence ---- */
function getEventUrls() {
  try { return JSON.parse(localStorage.getItem('eventUrls') || '{}'); } catch { return {}; }
}
function setEventUrl(subject, url) {
  const urls = getEventUrls();
  if (!url || !url.trim()) delete urls[subject];
  else urls[subject] = url.trim();
  localStorage.setItem('eventUrls', JSON.stringify(urls));
}
function getEventUrl(subject) { return getEventUrls()[subject] || null; }

function getEventBudgets() {
  try { return JSON.parse(localStorage.getItem('eventBudgets') || '{}'); } catch { return {}; }
}
function getEventBudget(subject) { return getEventBudgets()[subject] || null; }
function fmtBudget(total) {
  if (total >= 1000) return '$' + (total/1000).toFixed(1).replace(/\.0$/,'') + 'k';
  return '$' + Math.round(total).toLocaleString();
}
function saveEventUrl(eventId, url) {
  const ev = allEvents.find(e => e.id === eventId); if (!ev) return;
  if (!url || !url.trim()) return;
  setEventUrl(ev.subject, url.trim());
  openEvent(eventId);
}
function clearEventUrl(eventId) {
  const ev = allEvents.find(e => e.id === eventId); if (!ev) return;
  setEventUrl(ev.subject, '');
  openEvent(eventId);
}

/* ---- Saved Filters Persistence ---- */
function getSavedFilters() {
  try { return JSON.parse(localStorage.getItem('savedFilters') || '{}'); }
  catch { return {}; }
}
function saveCurrentFilter(name) {
  if (!name) return;
  const saved = getSavedFilters();
  saved[name] = {
    search: activeFilters.search,
    categories: [...activeFilters.categories],
    dept: activeFilters.dept,
    statuses: [...activeFilters.statuses],
    from: activeFilters.from ? activeFilters.from.toISOString().slice(0, 10) : '',
    to:   activeFilters.to   ? activeFilters.to.toISOString().slice(0, 10)   : '',
  };
  localStorage.setItem('savedFilters', JSON.stringify(saved));
  renderSavedFilters();
}
function deleteSavedFilter(name) {
  const saved = getSavedFilters();
  delete saved[name];
  localStorage.setItem('savedFilters', JSON.stringify(saved));
  renderSavedFilters();
}
function loadSavedFilter(name) {
  const f = getSavedFilters()[name]; if (!f) return;
  activeFilters = {
    search:     f.search || '',
    categories: new Set(f.categories || []),
    dept:       f.dept || '',
    statuses:   new Set(f.statuses || []),
    from: f.from ? new Date(f.from + 'T00:00:00') : null,
    to:   f.to   ? new Date(f.to   + 'T23:59:59') : null,
  };
  const si = document.getElementById('search-input');
  if (si) si.value = activeFilters.search;
  document.getElementById('filter-from').value = f.from || '';
  document.getElementById('filter-to').value   = f.to   || '';
  document.getElementById('filter-dept').value = activeFilters.dept;
  document.querySelectorAll('#cat-filters input').forEach(cb => {
    cb.checked = activeFilters.categories.size === 0 || activeFilters.categories.has(cb.value);
    if (cb.checked) activeFilters.categories.add(cb.value);
  });
  document.querySelectorAll('#status-filters input').forEach(cb => {
    cb.checked = activeFilters.statuses.has(cb.value);
  });
  updateCatToggleBtn();
  applyFilters(); renderCurrentView();
}
function renderSavedFilters() {
  const el = document.getElementById('saved-filters-list'); if (!el) return;
  const saved = getSavedFilters();
  const names = Object.keys(saved);
  if (!names.length) {
    el.innerHTML = '<div style="font-size:.75rem;color:var(--sub);font-style:italic;padding:2px 0;">No saved filters yet</div>';
    return;
  }
  el.innerHTML = names.map(name =>
    `<div class="saved-filter-item">
      <button class="saved-filter-btn" onclick='loadSavedFilter(${JSON.stringify(name)})' title="Load filter">${esc(name)}</button>
      <button class="saved-filter-del" onclick='deleteSavedFilter(${JSON.stringify(name)})' title="Delete">✕</button>
    </div>`
  ).join('');
}

function parseDetails(text) {
  const depts = {}; DEPT_NAMES.forEach(d => depts[d] = 'N/A');
  const extra = []; if (!text) return { depts, extra:'' };
  const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
  for (const line of lines) {
    let matched = false;
    for (const dept of DEPT_NAMES) {
      const m = line.match(new RegExp(`^${dept}\\s*[-–]\\s*(.+)`,'i'));
      if (m) { depts[dept] = normalizeStatus(m[1].trim()); matched = true; break; }
    }
    if (!matched) extra.push(line);
  }
  return { depts, extra: extra.join(' | ') };
}

function normalizeStatus(raw) {
  if (!raw) return 'N/A';
  const t = raw.trim();
  if (/double\s*black/i.test(t)) return 'Double Black';
  if (/^green/i.test(t)) return 'Green';
  if (/^blue/i.test(t))  return 'Blue';
  if (/^black/i.test(t)) return 'Black';
  if (/^n\/?a/i.test(t)) return 'N/A';
  const first = t.split(/[\s;,(]/)[0];
  if (/green/i.test(first)) return 'Green';
  if (/blue/i.test(first))  return 'Blue';
  if (/black/i.test(first)) return 'Black';
  return 'N/A';
}

function parseDate(str) {
  if (!str) return null;
  const parts = str.split('/'); if (parts.length !== 3) return null;
  const [m,d,y] = parts.map(Number);
  return new Date(y, m-1, d);
}

function statusCls(s) {
  return s==='Green'?'green' : s==='Blue'?'blue' : s==='Black'?'black' : s==='Double Black'?'double-black' : 'na';
}

/* ═══════════════════════════════════════════════════
   LOAD CSV
═══════════════════════════════════════════════════ */
function computeSeriesInfo(events) {
  for (const ev of events) {
    ev.seriesIndex = undefined; ev.seriesTotal = undefined;
    ev.inSeries = false; ev.seriesKey = undefined;
    ev.seriesStart = undefined; ev.seriesEnd = undefined;
  }
  const subjectMap = {};
  for (const ev of events) { if (!subjectMap[ev.subject]) subjectMap[ev.subject]=[]; subjectMap[ev.subject].push(ev); }
  for (const [subject, evs] of Object.entries(subjectMap)) {
    if (evs.length < 2) continue;
    const dowGroups = {};
    for (const ev of evs) { const d=ev.date.getDay(); if (!dowGroups[d]) dowGroups[d]=[]; dowGroups[d].push(ev); }
    for (const dowEvs of Object.values(dowGroups)) {
      if (dowEvs.length < 2) continue;
      const gaps = [];
      for (let i=1; i<dowEvs.length; i++) gaps.push((dowEvs[i].date - dowEvs[i-1].date)/86400000);
      const sorted = [...gaps].sort((a,b)=>a-b);
      const typicalGap = sorted[Math.floor(sorted.length/2)];
      const breakThreshold = Math.max(typicalGap * 2, 56);
      let runStart = 0;
      for (let i=1; i<=dowEvs.length; i++) {
        if (i===dowEvs.length || gaps[i-1] > breakThreshold) {
          const run = dowEvs.slice(runStart, i);
          if (run.length >= 2) {
            run.forEach((ev,idx) => {
              ev.seriesIndex = idx+1; ev.seriesTotal = run.length;
            });
          }
          runStart = i;
        }
      }
    }
    // Mark series membership (3+ occurrences of same subject)
    if (evs.length >= 3) {
      const seriesKey = subject;
      const dates = evs.map(e => e.date).sort((a,b)=>a-b);
      const seriesStart = dates[0];
      const seriesEnd   = dates[dates.length-1];
      for (const ev of evs) {
        ev.inSeries   = true;
        ev.seriesKey  = seriesKey;
        ev.seriesStart = seriesStart;
        ev.seriesEnd   = seriesEnd;
      }
    }
  }
}

async function loadCSV() {
  const appEl = document.querySelector('.app');

  const resp = await fetch('calendar.csv');
  const text = await resp.text();
  Papa.parse(text, {
    header: true, skipEmptyLines: true,
    complete(results) {
      const csvEvents = results.data.map((row,i) => {
        /* Skip event-request rows that haven't been approved yet */
        const rowStatus = (row['Status'] || '').trim().toLowerCase();
        if (rowStatus === 'pending' || rowStatus === 'denied') return null;

        const date = parseDate(row['Start Date']); if (!date) return null;
        const { depts, extra } = parseDetails(row['Details']);
        let loc = (row['Location']||'').trim();
        if (!loc && extra) { const fl=extra.split('|')[0].trim(); if (fl && !DEPT_NAMES.some(d=>fl.includes(d))) loc=fl; }
        const subj = row['Subject']||'';
        /* For approved requests use the Category column if available */
        const cat = (rowStatus === 'approved' && row['Category']) ? row['Category'] : null;
        return { id:i, subject:subj, date, startTime:row['Start Time']||'', endTime:row['End Time']||'', allDay:row['All Day Event']==='True', location:loc, depts, category: cat || getEffectiveCategory(subj), secondaryCategory:getSecondaryCategory(subj) };
      }).filter(Boolean);

      // Merge local (pending/approved) events from event-request system
      const localRaw = JSON.parse(localStorage.getItem('wm_localEvents') || '[]');
      const localOffset = csvEvents.length;
      const localEvents = localRaw.map((ev, i) => {
        const date = parseDate(ev.date); if (!date) return null;
        return {
          id: localOffset + i,
          subject: ev.subject || 'Untitled',
          date,
          startTime: ev.startTime || '',
          endTime: ev.endTime || '',
          allDay: false,
          location: ev.location || '',
          depts: [],
          category: ev.category || 'Special Events',
          secondaryCategory: null,
          pending: !!ev.pending,
          approved: !!ev.approved,
          requestId: ev.requestId || null,
          _isLocal: true,
        };
      }).filter(Boolean);

      allEvents = [...csvEvents, ...localEvents].sort((a,b)=>a.date-b.date);
      computeSeriesInfo(allEvents);
      buildCatFilters(); buildSecCatFilters(); buildStatusFilters(); renderSavedFilters();
      applyFilters();

      /* Render content into the view (still hidden behind loading overlay) */
      const viewId = currentView === 'dashboard' ? 'dashboard-view'
                   : currentView === 'list'      ? 'list-view'
                   :                               'calendar-view';
      const viewEl = document.getElementById(viewId);
      viewEl.style.opacity = '0';
      renderCurrentView();

      /* Crossfade: spinner fades out, content + page-enter animation play together */
      const loadingEl = document.getElementById('loading');
      loadingEl.style.opacity = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        viewEl.style.opacity = '1';
        if (appEl) appEl.classList.add('ready'); /* triggers pageEnter animation */
        setTimeout(() => { loadingEl.style.display = 'none'; }, 220);
      }));
      // Open event if navigated here from Room Planner
      const _pendingCal = localStorage.getItem('pendingCalendarEvent');
      if (_pendingCal) {
        localStorage.removeItem('pendingCalendarEvent');
        try {
          const { eventId, subject } = JSON.parse(_pendingCal);
          const id = parseInt(eventId);
          const targetId = !isNaN(id) ? id : (allEvents.find(e => e.subject === subject)?.id ?? -1);
          if (targetId >= 0) setTimeout(() => openEvent(targetId), 250);
        } catch(e) {}
      }
      // Auto-scroll to today on initial load (small delay ensures DOM is painted)
      setTimeout(() => goToToday(true), 150);
    },
    error() {
      document.getElementById('loading').innerHTML = '<p style="color:#dc2626;text-align:center;padding:40px;">Failed to load calendar.csv. Make sure it is in the same folder as index.html.</p>';
    }
  });
}

/* ═══════════════════════════════════════════════════
   FILTER UI
═══════════════════════════════════════════════════ */
function buildCatFilters() {
  const cats = [...new Set(allEvents.map(e=>e.category))].sort();
  const el = document.getElementById('cat-filters'); el.innerHTML = '';
  for (const cat of cats) {
    const id = 'cat-'+cat.replace(/\s/g,'-');
    el.insertAdjacentHTML('beforeend',
      `<label class="cb-item" for="${id}">
        <input type="checkbox" id="${id}" value="${esc(cat)}" checked onchange="onCatChange(this)"/>
        <span class="cat-dot" style="background:${catColor(cat)}"></span>
        <span>${esc(cat)}</span>
       </label>`);
    activeFilters.categories.add(cat);
  }
}
function buildSecCatFilters() {
  const cats = [...new Set(allEvents.map(e => e.secondaryCategory).filter(Boolean))].sort();
  const section = document.getElementById('sec-cat-filter-section');
  const el = document.getElementById('sec-cat-filters');
  if (!cats.length) { section.style.display = 'none'; return; }
  section.style.display = '';
  el.innerHTML = '';
  for (const cat of cats) {
    const id = 'sec-'+cat.replace(/\s/g,'-');
    el.insertAdjacentHTML('beforeend',
      `<label class="cb-item" for="${id}">
        <input type="checkbox" id="${id}" value="${esc(cat)}" onchange="onSecCatChange(this)"/>
        <span class="cat-dot" style="background:${catColor(cat)}"></span>
        <span>${esc(cat)}</span>
       </label>`);
  }
}

function buildStatusFilters() {
  const el = document.getElementById('status-filters'); el.innerHTML = '';
  for (const {label,val} of [{label:'Green',val:'Green'},{label:'Blue',val:'Blue'},{label:'Black',val:'Black'},{label:'Double Black',val:'Double Black'}]) {
    const id='st-'+val;
    el.insertAdjacentHTML('beforeend',
      `<label class="cb-item" for="${id}">
        <input type="checkbox" id="${id}" value="${val}" onchange="onStatusChange(this)"/>
        <span>${label}</span>
       </label>`);
  }
}

/* ═══════════════════════════════════════════════════
   FILTER LOGIC
═══════════════════════════════════════════════════ */
function applyFilters() {
  const {search,categories,dept,statuses,from,to,secCategories} = activeFilters;
  filteredEvents = allEvents.filter(ev => {
    if (search && !ev.subject.toLowerCase().includes(search)) return false;
    if (categories.size > 0 && !categories.has(ev.category) && !categories.has(ev.secondaryCategory)) return false;
    if (secCategories.size > 0 && !secCategories.has(ev.secondaryCategory)) return false;
    if (from && ev.date < from) return false;
    if (to   && ev.date > to)   return false;
    if (statuses.size > 0) {
      const ds = dept ? [dept] : DEPT_NAMES;
      if (!ds.some(d => statuses.has(ev.depts[d]))) return false;
    }
    return true;
  });
  document.getElementById('event-count').textContent =
    filteredEvents.length.toLocaleString() + ' event' + (filteredEvents.length!==1?'s':'');
}

/* ═══════════════════════════════════════════════════
   FILTER HANDLERS
═══════════════════════════════════════════════════ */
document.getElementById('search-input').addEventListener('input', e => {
  activeFilters.search = e.target.value.toLowerCase().trim(); applyFilters(); renderCurrentView();
});
document.getElementById('filter-from').addEventListener('change', e => {
  activeFilters.from = e.target.value ? new Date(e.target.value+'T00:00:00') : null; applyFilters(); renderCurrentView();
});
document.getElementById('filter-to').addEventListener('change', e => {
  activeFilters.to = e.target.value ? new Date(e.target.value+'T23:59:59') : null; applyFilters(); renderCurrentView();
});
document.getElementById('filter-dept').addEventListener('change', e => {
  activeFilters.dept = e.target.value; applyFilters(); renderCurrentView();
});
function onSecCatChange(cb) {
  if (cb.checked) activeFilters.secCategories.add(cb.value); else activeFilters.secCategories.delete(cb.value);
  applyFilters(); renderCurrentView();
}
function onCatChange(cb) {
  if (cb.checked) activeFilters.categories.add(cb.value); else activeFilters.categories.delete(cb.value);
  updateCatToggleBtn();
  applyFilters(); renderCurrentView();
}
function toggleAllCats() {
  const boxes = document.querySelectorAll('#cat-filters input');
  const allChecked = [...boxes].every(cb => cb.checked);
  boxes.forEach(cb => { cb.checked = !allChecked; if (!allChecked) activeFilters.categories.add(cb.value); else activeFilters.categories.delete(cb.value); });
  updateCatToggleBtn();
  applyFilters(); renderCurrentView();
}
function updateCatToggleBtn() {
  const boxes = document.querySelectorAll('#cat-filters input');
  const allChecked = [...boxes].every(cb => cb.checked);
  document.getElementById('cat-toggle-btn').textContent = allChecked ? 'Deselect All' : 'Select All';
}
function onStatusChange(cb) {
  if (cb.checked) activeFilters.statuses.add(cb.value); else activeFilters.statuses.delete(cb.value);
  applyFilters(); renderCurrentView();
}
function resetFilters() {
  activeFilters = { search:'', categories: new Set(), dept:'', statuses: new Set(), from:null, to:null, secCategories: new Set() };
  document.getElementById('search-input').value = '';
  document.getElementById('filter-from').value  = '';
  document.getElementById('filter-to').value    = '';
  document.getElementById('filter-dept').value  = '';
  document.querySelectorAll('#cat-filters input').forEach(cb => { cb.checked=true; activeFilters.categories.add(cb.value); });
  document.querySelectorAll('#status-filters input').forEach(cb => { cb.checked=false; });
  document.querySelectorAll('#sec-cat-filters input').forEach(cb => { cb.checked=false; });
  applyFilters(); renderCurrentView();
}

/* ═══════════════════════════════════════════════════
   VIEW CONTROL
═══════════════════════════════════════════════════ */
function renderHeatmap() {
  const el = document.getElementById('calendar-view');
  if (!el) return;

  const now   = new Date();
  const year  = now.getFullYear();
  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Count events per day across all events (not just filtered)
  const dayCounts = {};
  for (const ev of allEvents) {
    if (!ev.date) continue;
    const k = fmtDateKey(ev.date);
    dayCounts[k] = (dayCounts[k] || 0) + 1;
  }

  // Find max for color scaling
  const maxCount = Math.max(1, ...Object.values(dayCounts));

  function heatColor(count) {
    if (!count) return 'var(--border)';
    const t = Math.min(count / maxCount, 1);
    // interpolate: light cream → navy
    const r = Math.round(180 - t * 157);
    const g = Math.round(171 - t * 113);
    const b = Math.round(163 + t * (93 - 163));
    return `rgb(${r},${g},${b})`;
  }

  let html = `<div class="hm-wrap">
    <div class="hm-header">
      <h2 class="hm-title">${year} — Year at a Glance</h2>
      <div class="hm-legend">
        <span class="hm-leg-label">Less</span>
        ${[0,.2,.4,.6,.8,1].map(t=>`<span class="hm-leg-cell" style="background:${heatColor(t*maxCount)}"></span>`).join('')}
        <span class="hm-leg-label">More</span>
      </div>
    </div>
    <div class="hm-grid">`;

  for (let m = 0; m < 12; m++) {
    const firstDay  = new Date(year, m, 1);
    const daysInMon = new Date(year, m + 1, 0).getDate();
    const offset    = firstDay.getDay(); // 0=Sun
    const todayKey  = fmtDateKey(new Date());

    html += `<div class="hm-month">
      <div class="hm-month-label">${MONTH_NAMES[m]}</div>
      <div class="hm-dow-row">${['S','M','T','W','T','F','S'].map(d=>`<span>${d}</span>`).join('')}</div>
      <div class="hm-days">`;

    for (let i = 0; i < offset; i++) html += `<span class="hm-day hm-empty"></span>`;
    for (let d = 1; d <= daysInMon; d++) {
      const dt  = new Date(year, m, d);
      const key = fmtDateKey(dt);
      const cnt = dayCounts[key] || 0;
      const isToday = key === todayKey;
      html += `<span class="hm-day${isToday?' hm-today':''}" style="background:${heatColor(cnt)}" title="${MONTH_NAMES[m]} ${d}: ${cnt} event${cnt!==1?'s':''}" onclick="calendarDate=new Date(${year},${m},${d});setView('calendar')">${d}</span>`;
    }

    html += `</div></div>`;
  }

  html += `</div></div>`;
  el.innerHTML = html;
}

function exportICal() {
  const events = filteredEvents.length ? filteredEvents : allEvents;
  const lines  = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ministry Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  function icalDate(date, timeStr) {
    const y  = date.getFullYear();
    const mo = String(date.getMonth()+1).padStart(2,'0');
    const d  = String(date.getDate()).padStart(2,'0');
    if (!timeStr) return `${y}${mo}${d}`;
    // parse "H:MM AM/PM" or "HH:MM"
    const [hm, ap] = timeStr.split(' ');
    let [h, mi]    = hm.split(':').map(Number);
    if (ap && ap.toUpperCase() === 'PM' && h < 12) h += 12;
    if (ap && ap.toUpperCase() === 'AM' && h === 12) h = 0;
    return `${y}${mo}${d}T${String(h).padStart(2,'0')}${String(mi||0).padStart(2,'0')}00`;
  }

  function fold(line) {
    // iCal spec: lines > 75 chars should be folded
    const out = [];
    while (line.length > 75) { out.push(line.slice(0,75)); line = ' ' + line.slice(75); }
    out.push(line);
    return out.join('\r\n');
  }

  for (const ev of events) {
    const uid = `${fmtDateKey(ev.date)}-${ev.id}@ministry-calendar`;
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${icalDate(new Date())}`);
    if (ev.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${icalDate(ev.date)}`);
      const next = new Date(ev.date); next.setDate(next.getDate()+1);
      lines.push(`DTEND;VALUE=DATE:${icalDate(next)}`);
    } else {
      const start = ev.startTime ? `DTSTART:${icalDate(ev.date, ev.startTime)}` : `DTSTART;VALUE=DATE:${icalDate(ev.date)}`;
      const end   = ev.endTime   ? `DTEND:${icalDate(ev.date, ev.endTime)}`     : start.replace('DTSTART','DTEND');
      lines.push(start); lines.push(end);
    }
    lines.push(fold(`SUMMARY:${(ev.subject||'').replace(/,/g,'\\,').replace(/;/g,'\\;')}`));
    if (ev.location) lines.push(fold(`LOCATION:${ev.location.replace(/,/g,'\\,')}`));
    if (ev.category) lines.push(fold(`CATEGORIES:${ev.category}`));
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `ministry-calendar-${new Date().getFullYear()}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function setView(v) {
  currentView = v;
  ['dashboard','list','calendar','heatmap','digest'].forEach(x => {
    const btn = document.getElementById('btn-'+x);
    if (btn) btn.classList.toggle('active', x===v);
  });
  renderCurrentView();
}
function renderCurrentView() {
  ['dashboard-view','list-view','calendar-view','digest-view'].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display='none';
  });
  if (currentView==='dashboard') { renderDashboard(); document.getElementById('dashboard-view').style.display='flex'; }
  else if (currentView==='list') { renderList(); document.getElementById('list-view').style.display='flex'; }
  else if (currentView==='heatmap') { renderHeatmap(); document.getElementById('calendar-view').style.display='block'; }
  else if (currentView==='digest') { renderDigest(); document.getElementById('digest-view').style.display='block'; }
  else { renderCalendar(); document.getElementById('calendar-view').style.display='block'; }
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════ */
function buildMiniCalendarHTML(year, month) {
  const today = new Date(); today.setHours(0,0,0,0);
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDow = firstDay.getDay();
  const dayMap = {};
  for (const ev of filteredEvents) {
    if (ev.date.getFullYear()===year && ev.date.getMonth()===month) {
      const d = ev.date.getDate();
      if (!dayMap[d]) dayMap[d]=[];
      dayMap[d].push(ev);
    }
  }
  const monthTotal = Object.values(dayMap).reduce((s,a)=>s+a.length,0);
  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
    <button class="mini-cal-nav" onclick="prevMiniCal()">&#8249;</button>
    <span style="font-family:'Oswald',sans-serif;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--charcoal);">
      ${MONTHS[month]} ${year}
      <span style="font-family:'Lato',sans-serif;font-weight:400;font-size:.68rem;letter-spacing:0;text-transform:none;color:var(--sub);margin-left:4px;">&mdash; ${monthTotal} event${monthTotal!==1?'s':''}</span>
    </span>
    <button class="mini-cal-nav" onclick="nextMiniCal()">&#8250;</button>
  </div>`;
  html += `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:3px;">`;
  for (const d of ['Su','Mo','Tu','We','Th','Fr','Sa'])
    html += `<div style="text-align:center;font-size:.58rem;font-weight:700;color:var(--sub);letter-spacing:.04em;padding-bottom:3px;">${d}</div>`;
  html += `</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;">`;
  for (let i=0; i<startDow; i++) html += `<div></div>`;
  for (let d=1; d<=daysInMonth; d++) {
    const evs = dayMap[d]||[];
    const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;
    const bg = isToday ? 'var(--navy)' : 'transparent';
    const textColor = isToday ? 'white' : 'var(--charcoal)';
    const dots = evs.length ? evs.slice(0,3).map(()=>`<div style="width:4px;height:4px;border-radius:50%;background:${isToday?'rgba(255,255,255,.7)':'var(--navy)'};flex-shrink:0;"></div>`).join('') : '';
    const clickAttr = evs.length ? `onclick="miniCalDayClick(${year},${month},${d})"` : '';
    html += `<div class="mini-cal-day${evs.length?' has-events':''}${isToday?' is-today':''}" style="background:${bg};" ${clickAttr}>
      <div style="font-size:.7rem;font-weight:${isToday?700:400};color:${textColor};line-height:1.4;">${d}</div>
      ${dots ? `<div style="display:flex;justify-content:center;gap:1px;margin-top:1px;">${dots}</div>` : '<div style="height:5px;"></div>'}
    </div>`;
  }
  html += `</div>`;
  return html;
}
function prevMiniCal() {
  miniCalMonth--; if (miniCalMonth<0) { miniCalMonth=11; miniCalYear--; }
  const el = document.getElementById('mini-cal-body');
  if (el) el.innerHTML = buildMiniCalendarHTML(miniCalYear, miniCalMonth);
}
function nextMiniCal() {
  miniCalMonth++; if (miniCalMonth>11) { miniCalMonth=0; miniCalYear++; }
  const el = document.getElementById('mini-cal-body');
  if (el) el.innerHTML = buildMiniCalendarHTML(miniCalYear, miniCalMonth);
}
function miniCalDayClick(year, month, day) {
  const evs = filteredEvents.filter(ev=>ev.date.getFullYear()===year&&ev.date.getMonth()===month&&ev.date.getDate()===day);
  if (evs.length===1) { openEvent(evs[0].id); return; }
  if (evs.length>1) { setView('list'); }
}

function renderDashboard() {
  const today = new Date(); today.setHours(0,0,0,0);
  if (miniCalYear===null||miniCalMonth===null) { miniCalYear=today.getFullYear(); miniCalMonth=today.getMonth(); }
  const soMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const eoMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  const next30  = new Date(today); next30.setDate(next30.getDate()+30);

  const total     = filteredEvents.length;
  const thisMonth = filteredEvents.filter(e => e.date >= soMonth && e.date <= eoMonth).length;
  const upcoming  = filteredEvents.filter(e => e.date >= today && e.date <= next30).length;
  const highPri   = filteredEvents.filter(e => DEPT_NAMES.some(d => e.depts[d]==='Black'||e.depts[d]==='Double Black')).length;

  // Category counts
  const catCounts = {};
  for (const ev of filteredEvents) catCounts[ev.category] = (catCounts[ev.category]||0)+1;

  // Monthly counts — 12 months spanning 3 before today to 8 after
  const monthMap = {};
  for (const ev of filteredEvents) {
    const k = `${ev.date.getFullYear()}-${ev.date.getMonth()}`;
    monthMap[k] = (monthMap[k]||0)+1;
  }
  const mLabels=[], mData=[];
  for (let i=-3; i<=8; i++) {
    const d = new Date(today.getFullYear(), today.getMonth()+i, 1);
    mLabels.push(MONTHS[d.getMonth()].slice(0,3)+' \''+String(d.getFullYear()).slice(2));
    mData.push(monthMap[`${d.getFullYear()}-${d.getMonth()}`]||0);
  }

  // Dept status
  const dsc = {};
  DEPT_NAMES.forEach(d => dsc[d]={Green:0,Blue:0,Black:0,'Double Black':0,NA:0});
  for (const ev of filteredEvents)
    for (const dept of DEPT_NAMES) {
      const s = ev.depts[dept]||'N/A';
      dsc[dept][['Green','Blue','Black','Double Black'].includes(s)?s:'NA']++;
    }

  // Day of week
  const dow = [0,0,0,0,0,0,0];
  for (const ev of filteredEvents) dow[ev.date.getDay()]++;
  const maxDow = Math.max(...dow)||1;

  // Upcoming list (next 30 days, up to 25)
  const upList = filteredEvents.filter(e=>e.date>=today&&e.date<=next30).slice(0,25);

  // ── Cross-system status ──
  const todayIso = today.toISOString().slice(0,10);
  let pendingReqs = 0, roomConflicts = 0, eventsNoRoom = 0, pendingRoomEvents = [];
  try {
    pendingReqs = JSON.parse(localStorage.getItem('wm_eventRequests')||'[]').filter(r=>r.status==='pending').length;
    const rsvs  = JSON.parse(localStorage.getItem('roomReservations')||'[]');
    const todayRsvs = rsvs.filter(r=>r.date===todayIso);
    // count time-overlap conflicts today
    for (let i=0;i<todayRsvs.length;i++) for (let j=i+1;j<todayRsvs.length;j++) {
      if (todayRsvs[i].roomId!==todayRsvs[j].roomId) continue;
      const as=todayRsvs[i].startTime?.replace(':',''), ae=todayRsvs[i].endTime?.replace(':','');
      const bs=todayRsvs[j].startTime?.replace(':',''), be=todayRsvs[j].endTime?.replace(':','');
      if (as<be && ae>bs) roomConflicts++;
    }
    // events today without a reservation
    const bookedNames = new Set(todayRsvs.map(r=>r.subject?.toLowerCase().trim()));
    const todayEvs = filteredEvents.filter(e=>e.date.toISOString().slice(0,10)===todayIso);
    eventsNoRoom = todayEvs.filter(e=>!bookedNames.has(e.subject?.toLowerCase().trim())).length;
    pendingRoomEvents = JSON.parse(localStorage.getItem('wm_pendingRooms')||'[]').slice(0,3);
  } catch(e){}

  const sysCards = `
    <div class="sys-status-bar">
      <a class="sys-card ${pendingReqs>0?'alert':''}" href="event-request.html">
        <div class="sys-card-icon">📋</div>
        <div class="sys-card-body">
          <div class="sys-card-val">${pendingReqs}</div>
          <div class="sys-card-label">Pending Request${pendingReqs!==1?'s':''}</div>
        </div>
        ${pendingReqs>0?'<div class="sys-card-action">Review →</div>':''}
      </a>
      <a class="sys-card ${roomConflicts>0?'alert':''}" href="rooms.html">
        <div class="sys-card-icon">🏢</div>
        <div class="sys-card-body">
          <div class="sys-card-val">${roomConflicts}</div>
          <div class="sys-card-label">Room Conflict${roomConflicts!==1?'s':''} Today</div>
        </div>
        ${roomConflicts>0?'<div class="sys-card-action">View →</div>':''}
      </a>
      <a class="sys-card ${eventsNoRoom>0?'warn':''}" href="rooms.html">
        <div class="sys-card-icon">📍</div>
        <div class="sys-card-body">
          <div class="sys-card-val">${eventsNoRoom}</div>
          <div class="sys-card-label">Event${eventsNoRoom!==1?'s':''} Without Rooms Today</div>
        </div>
        ${eventsNoRoom>0?'<div class="sys-card-action">Assign →</div>':''}
      </a>
      <a class="sys-card" href="budget.html">
        <div class="sys-card-icon">💰</div>
        <div class="sys-card-body">
          <div class="sys-card-val">${upcoming}</div>
          <div class="sys-card-label">Events Next 30 Days</div>
        </div>
      </a>
    </div>
    ${pendingRoomEvents.length ? `<div class="sys-pending-rooms">
      <span class="sys-pr-label">⏳ Pending room requests:</span>
      ${pendingRoomEvents.map(r=>`<a class="sys-pr-chip" href="event-request.html">${esc(r.name)}</a>`).join('')}
    </div>` : ''}`;

  const el = document.getElementById('dashboard-view');
  el.innerHTML = sysCards + `
    <!-- STAT CARDS -->
    <div>
      <div class="dash-row-label">Overview</div>
      <div class="stat-cards">
        <div class="stat-card">
          <div class="stat-label">Total Events</div>
          <div class="stat-val">${total.toLocaleString()}</div>
          <div class="stat-sub">matching current filters</div>
        </div>
        <div class="stat-card c-powder">
          <div class="stat-label">This Month</div>
          <div class="stat-val">${thisMonth.toLocaleString()}</div>
          <div class="stat-sub">${MONTHS[today.getMonth()]} ${today.getFullYear()}</div>
        </div>
        <div class="stat-card c-slate">
          <div class="stat-label">Next 30 Days</div>
          <div class="stat-val">${upcoming.toLocaleString()}</div>
          <div class="stat-sub">upcoming events</div>
        </div>
        <div class="stat-card c-alert">
          <div class="stat-label">High Priority</div>
          <div class="stat-val">${highPri.toLocaleString()}</div>
          <div class="stat-sub">events with Black status</div>
        </div>
      </div>
    </div>

    <!-- CHARTS ROW 1 -->
    <div class="dash-2col">
      <div class="chart-card">
        <h3>Events by Category</h3>
        <div class="chart-wrap" style="height:240px;"><canvas id="chart-cat"></canvas></div>
      </div>
      <div class="chart-card">
        <h3>Events by Month <span class="chart-sub">— rolling 12 months</span></h3>
        <div class="chart-wrap" style="height:240px;"><canvas id="chart-month"></canvas></div>
      </div>
    </div>

    <!-- CHARTS ROW 2 -->
    <div class="dash-2col" style="grid-template-columns:1fr 1fr 1fr;">
      <div class="chart-card">
        <h3>Support Teams Breakdown</h3>
        <div class="chart-wrap" style="height:240px;"><canvas id="chart-dept"></canvas></div>
      </div>
      <div class="chart-card"><h3>Calendar</h3><div id="mini-cal-body">${buildMiniCalendarHTML(miniCalYear, miniCalMonth)}</div></div>
      <div class="chart-card">
        <h3>Upcoming Events <span class="chart-sub">— next 30 days</span></h3>
        <div class="upcoming-list">
          ${upList.length===0
            ? '<p style="color:var(--sub);font-size:.83rem;">No upcoming events in the next 30 days.</p>'
            : upList.map(ev => {
                const color = catColor(ev.category);
                const t = ev.allDay ? 'All Day' : (ev.startTime ? fmtTime(ev.startTime) : '');
                return `<div class="up-item" style="--cat-color:${color}" onclick="openEvent(${ev.id})">
                  <div class="up-date">
                    <div class="up-mo">${MONTHS[ev.date.getMonth()].slice(0,3)}</div>
                    <div class="up-day">${ev.date.getDate()}</div>
                  </div>
                  <div>
                    <div class="up-name">${esc(ev.subject)}</div>
                    <div class="up-meta">${esc(t)}${ev.location?' · '+esc(ev.location):''}</div>
                  </div>
                </div>`;
              }).join('')}
        </div>
      </div>
    </div>

    <!-- DAY OF WEEK -->
    <div class="chart-card">
      <h3>Busiest Days of the Week</h3>
      <div class="dow-bars">
        ${WEEKDAYS.map((day,i)=>`
          <div class="dow-row">
            <div class="dow-lbl">${day}</div>
            <div class="dow-track"><div class="dow-fill" style="width:${Math.round(dow[i]/maxDow*100)}%"></div></div>
            <div class="dow-cnt">${dow[i].toLocaleString()}</div>
          </div>`).join('')}
      </div>
    </div>`;

  // Destroy previous charts then rebuild
  destroyCharts();
  Chart.defaults.font.family = "'Lato', sans-serif";
  Chart.defaults.color = '#5A6872';

  // 1 — Category doughnut
  const cLabels = Object.keys(catCounts);
  chartInstances.cat = new Chart(document.getElementById('chart-cat'), {
    type: 'doughnut',
    data: {
      labels: cLabels,
      datasets: [{ data: cLabels.map(k=>catCounts[k]), backgroundColor: cLabels.map(catColor),
                   borderWidth: 2, borderColor: 'var(--surface-1)', hoverOffset: 8 }]
    },
    options: {
      cutout: '60%',
      plugins: {
        legend: { position:'right', labels:{ boxWidth:11, padding:9, font:{size:11} } },
        tooltip: { callbacks:{ label: ctx=>` ${ctx.label}: ${ctx.parsed.toLocaleString()}` } }
      }
    }
  });

  // 2 — Monthly bar
  chartInstances.month = new Chart(document.getElementById('chart-month'), {
    type: 'bar',
    data: {
      labels: mLabels,
      datasets: [{ label:'Events', data: mData,
                   backgroundColor: mLabels.map((_,i) => i===3?'#B9D2DC':'#003A5D'),
                   borderRadius: 3, hoverBackgroundColor:'#1E5E7A' }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ grid:{display:false}, ticks:{font:{size:10}} },
        y:{ beginAtZero:true, grid:{color:'#EDEAE5'}, ticks:{stepSize:1,font:{size:10}} }
      }
    }
  });

  // 3 — Dept stacked bar
  chartInstances.dept = new Chart(document.getElementById('chart-dept'), {
    type: 'bar',
    data: {
      labels: DEPT_NAMES,
      datasets: [
        { label:'Green',  data: DEPT_NAMES.map(d=>dsc[d].Green), backgroundColor:'#22c55e' },
        { label:'Blue',   data: DEPT_NAMES.map(d=>dsc[d].Blue),  backgroundColor:'#B9D2DC' },
        { label:'Black',  data: DEPT_NAMES.map(d=>dsc[d].Black), backgroundColor:'#1D252C' },
        { label:'N/A',    data: DEPT_NAMES.map(d=>dsc[d].NA),    backgroundColor:'#DDE3E7' },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'bottom', labels:{boxWidth:11,padding:10,font:{size:11}} } },
      scales:{
        x:{ stacked:true, grid:{display:false}, ticks:{font:{size:10}} },
        y:{ stacked:true, grid:{color:'#EDEAE5'}, ticks:{font:{size:10}} }
      }
    }
  });
}

function destroyCharts() {
  for (const k of Object.keys(chartInstances)) { chartInstances[k].destroy(); delete chartInstances[k]; }
}

/* ═══════════════════════════════════════════════════
   LIST VIEW
═══════════════════════════════════════════════════ */
function renderList() {
  const el = document.getElementById('list-view');
  if (!filteredEvents.length) { el.innerHTML = emptyState('No events match your filters','Adjust the filters or clear your search.'); return; }

  const groups = {};
  for (const ev of filteredEvents) {
    const k = fmtDateKey(ev.date);
    if (!groups[k]) groups[k] = {date: ev.date, events: []};
    groups[k].events.push(ev);
  }
  const todayKey  = fmtDateKey(new Date());
  const blackouts = getBlackoutDates();

  let html = '';
  for (const k of Object.keys(groups).sort()) {
    const {date, events} = groups[k];
    const isTd    = k === todayKey;
    const blackout = blackouts.find(b => b.date === k);
    html += `
      <div>
        <div class="day-hdr">
          <div class="day-badge${isTd?' is-today':''}">${date.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>
          <div class="day-name">${date.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}${isTd?'<span class="today-chip">Today</span>':''}</div>
          <div class="day-line"></div>
        </div>
        ${blackout ? `<div class="list-blackout-row">🚫 Hold — ${esc(blackout.reason)}</div>` : ''}
        <div class="events-grid">${events.map(evCard).join('')}</div>
      </div>`;
  }
  el.innerHTML = html;
}

function evCard(ev) {
  const color = catColor(ev.category);
  const timeStr = ev.allDay ? 'All Day'
    : (ev.startTime?fmtTime(ev.startTime):'') + (ev.endTime?' – '+fmtTime(ev.endTime):'');
  const nonNA = Object.entries(ev.depts).filter(([,s])=>s!=='N/A');
  const badges = nonNA.map(([dept,status]) => {
    const bg={Green:'#f0fdf4',Blue:'#EBF4FA',Black:'#1D252C'}[status]||'#F2F0EC';
    const fg={Green:'#15803d',Blue:'#1558A0',Black:'white'}[status]||'#5A6872';
    return `<span class="d-badge" style="background:${bg};color:${fg};"><span class="dn">${dept}:</span> ${status}</span>`;
  }).join('');
  const pendingAttr = ev.pending ? ' ev-pending' : '';
  const pendingBadge = ev.pending ? `<span style="font-size:.6rem;font-weight:700;background:#fef3c7;color:#b45309;padding:2px 7px;border-radius:8px;white-space:nowrap;letter-spacing:.03em;border:1px solid #f59e0b;">⏳ Pending Approval</span>` : '';
  return `
    <div class="event-card${pendingAttr}" style="--cat-color:${color}" onclick="openEvent(${ev.id})">
      <div class="ev-top">
        <div class="ev-title">${esc(ev.subject)}</div>
        <div style="display:flex;gap:4px;flex-shrink:0;flex-wrap:wrap;align-items:center;">
          ${ev.seriesIndex ? `<span style="font-size:.5rem;font-weight:700;background:#E5E1DB;color:var(--slate);padding:2px 6px;border-radius:8px;white-space:nowrap;letter-spacing:.03em;">#${ev.seriesIndex}/${ev.seriesTotal}</span>` : ''}
          ${pendingBadge}
          <span class="cat-tag" style="background:${color}">${esc(ev.category)}</span>
          ${ev.secondaryCategory ? `<span class="cat-tag" style="background:${catColor(ev.secondaryCategory)};font-size:.55rem;opacity:.85;">+${esc(ev.secondaryCategory)}</span>` : ''}
        </div>
      </div>
      ${(timeStr||ev.location)?`
      <div class="ev-meta">
        ${timeStr?`<div class="meta-row">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${esc(timeStr)}</div>`:''}
        ${ev.location?`<div class="meta-row">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${esc(ev.location)}</div>`:''}
      </div>`:'' }
      ${badges?`<div class="dept-badges">${badges}</div>`:''}
      ${(()=>{ const b=getEventBudget(ev.subject); return b ? `<div class="budget-meta-row"><span class="budget-chip">💰 ${fmtBudget(b.total)} est.</span></div>` : ''; })()}
    </div>`;
}

/* ═══════════════════════════════════════════════════
   CALENDAR VIEW
═══════════════════════════════════════════════════ */
function renderCalendar() {
  const el = document.getElementById('calendar-view');
  const year=calendarDate.getFullYear(), mo=calendarDate.getMonth();
  const todayKey = fmtDateKey(new Date());
  const evMap={};
  for (const ev of filteredEvents) {
    const k=fmtDateKey(ev.date); if(!evMap[k]) evMap[k]=[]; evMap[k].push(ev);
  }
  const firstDay=new Date(year,mo,1), lastDay=new Date(year,mo+1,0);
  const offset=firstDay.getDay();
  let html=`
    <div class="cal-nav">
      <button class="cal-btn" onclick="calNav(-1)">&#8592;</button>
      <div style="display:flex;align-items:center;gap:10px;">
        <h2>${MONTHS[mo]} ${year}</h2>
        <button class="today-btn" onclick="calToday()">Today</button>
      </div>
      <button class="cal-btn" onclick="calNav(1)">&#8594;</button>
    </div>
    <div class="cal-wrap">
      <div class="cal-wkdays">${WEEKDAYS.map(d=>`<div class="cal-wkday">${d}</div>`).join('')}</div>
      <div class="cal-days">`;
  for (let i=0;i<offset;i++) {
    const pd=new Date(year,mo,-offset+i+1);
    html+=`<div class="cal-day other-mo"><div class="cal-day-num">${pd.getDate()}</div></div>`;
  }
  const blackoutDates = getBlackoutDates();
  for (let d=1;d<=lastDay.getDate();d++) {
    const date=new Date(year,mo,d), key=fmtDateKey(date), isTd=key===todayKey;
    const evs=evMap[key]||[], max=5;
    const pills=evs.slice(0,max).map(ev=>
      `<div class="cal-pill" style="background:${catColor(ev.category)}" onclick="event.stopPropagation();openEvent(${ev.id})" title="${esc(ev.subject)}">${esc(ev.subject)}</div>`
    ).join('');
    const more=evs.length>max?`<div class="cal-more">+${evs.length-max} more</div>`:'';
    const blackout = blackoutDates.find(b=>b.date===key);
    const blackoutBanner = blackout ? `<div class="cal-blackout-banner" title="${esc(blackout.reason)}">🚫 Hold</div>` : '';
    html+=`<div class="cal-day${isTd?' is-today':''}${blackout?' cal-day-blackout':''}" onclick="openDay('${key}',${d})">
      <div class="cal-day-num">${d}</div>
      ${blackoutBanner}
      <div class="cal-evs">${pills}${more}</div>
    </div>`;
  }
  const trailing=(7-(offset+lastDay.getDate())%7)%7;
  for (let i=1;i<=trailing;i++) html+=`<div class="cal-day other-mo"><div class="cal-day-num">${i}</div></div>`;
  html+='</div></div>';
  el.innerHTML=html;
}
function calNav(dir) { calendarDate=new Date(calendarDate.getFullYear(),calendarDate.getMonth()+dir,1); renderCalendar(); }
function calToday()   { calendarDate=new Date(); renderCalendar(); }

/* Go-to-Today header button — works across all views */
function goToToday(instant) {
  if (currentView === 'calendar') {
    calToday();
    return;
  }
  if (currentView === 'dashboard') {
    setView('list');
  }
  // Now in list view — scroll to today's date group
  // The scrollable container is <main class="main">, not the window
  requestAnimationFrame(() => {
    const todayBadge = document.querySelector('#list-view .day-badge.is-today');
    if (todayBadge) {
      const container = document.querySelector('.main');
      const target = todayBadge.closest('.day-hdr').parentElement;
      const targetTop = target.offsetTop - container.offsetTop;
      container.scrollTo({ top: targetTop, behavior: instant ? 'instant' : 'smooth' });
    }
  });
}

/* ═══════════════════════════════════════════════════
   DAY MODAL — events grouped by category
═══════════════════════════════════════════════════ */
function openDay(dateKey, dayNum) {
  const date = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), dayNum);
  const dayEvs = filteredEvents.filter(ev => fmtDateKey(ev.date)===dateKey);
  if (!dayEvs.length) return;

  document.getElementById('day-modal-title').textContent = fmtDateFull(date);

  // Sort: all-day first, then by time
  dayEvs.sort((a,b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return (a.startTime||'').localeCompare(b.startTime||'');
  });

  // Group by category, preserving first-appearance order
  const groups={}, order=[];
  for (const ev of dayEvs) {
    if (!groups[ev.category]) { groups[ev.category]=[]; order.push(ev.category); }
    groups[ev.category].push(ev);
  }

  let html = '';
  for (const cat of order) {
    const color = catColor(cat);
    const evs   = groups[cat];
    html += `
      <div class="day-cat-section">
        <div class="day-cat-hdr" style="--cat-color:${color}">
          <span class="day-cat-pip" style="--cat-color:${color}"></span>
          ${esc(cat)}
          <span class="day-cat-count">(${evs.length})</span>
        </div>
        <div class="day-ev-list">
          ${evs.map(ev=>`
            <div class="day-ev-item" style="--cat-color:${color}" onclick="closeDayModalBtn();openEvent(${ev.id})">
              <div class="day-ev-time">${ev.allDay?'All Day':(ev.startTime?esc(fmtTime(ev.startTime)):'')}</div>
              <div>
                <div class="day-ev-name">${esc(ev.subject)}</div>
                ${ev.location?`<div class="day-ev-loc">${esc(ev.location)}</div>`:''}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  document.getElementById('day-modal-body').innerHTML = html;
  document.getElementById('day-modal-overlay').classList.add('open');
}

/* ═══════════════════════════════════════════════════
   EVENT DETAIL MODAL
═══════════════════════════════════════════════════ */
function openEvent(id) {
  const ev = allEvents.find(e=>e.id===id); if (!ev) return;
  const color = catColor(ev.category);
  document.getElementById('modal').style.setProperty('--cat-color', color);
  const allCats = [...Object.keys(CATEGORIES), 'Other'].sort();
  const isOverridden = getCategoryOverrides()[ev.subject] !== undefined;
  const secCat = ev.secondaryCategory;
  const secColor = secCat ? catColor(secCat) : '';
  const allCatsNone = ['None', ...allCats];
  document.getElementById('modal-cat-tag').innerHTML = `
    <div class="cat-change-row">
      <span class="cat-tag" style="background:${color}">${esc(ev.category)}</span>
      <select class="cat-select" onchange="changeEventCategory(${ev.id}, this.value)">
        ${allCats.map(c => `<option value="${esc(c)}" ${c===ev.category?'selected':''}>${esc(c)}</option>`).join('')}
      </select>
      ${isOverridden ? '<span class="cat-override-badge">(manually set)</span>' : ''}
    </div>
    <div class="cat-change-row" style="margin-top:6px;">
      <span style="font-size:.65rem;font-weight:700;color:var(--sub);text-transform:uppercase;letter-spacing:.05em;">Secondary:</span>
      ${secCat ? `<span class="cat-tag" style="background:${secColor};font-size:.55rem;">${esc(secCat)}</span>` : ''}
      <select class="cat-select" onchange="changeSecondaryCategory(${ev.id}, this.value)">
        ${allCatsNone.map(c => `<option value="${esc(c)}" ${(c==='None'&&!secCat)||(c===secCat)?'selected':''}>${esc(c)}</option>`).join('')}
      </select>
    </div>`;
  document.getElementById('modal-title').textContent = ev.subject;
  const timeStr = ev.allDay ? 'All Day'
    : (ev.startTime?fmtTime(ev.startTime):'') + (ev.endTime?' – '+fmtTime(ev.endTime):'');
  let body = `
    <div>
      <div class="ms-title">Date &amp; Time</div>
      <div class="mi-row">
        <svg class="mi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <div>${esc(fmtDateFull(ev.date))}${timeStr?' &nbsp;·&nbsp; '+esc(timeStr):''}</div>
      </div>
    </div>`;
  body += `
    <div>
      <div class="ms-title">Location</div>
      ${ev.location
        ? `<div class="mi-row" style="justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:6px;">
              <svg class="mi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>${esc(ev.location)}</div>
            </div>
            <button class="budget-modal-link" onclick="event.stopPropagation();viewReservation(${ev.id})">🏢 View Reservation</button>
          </div>`
        : `<div class="mi-row" style="justify-content:space-between;align-items:center;">
            <span style="color:var(--sub);font-size:.82rem;font-style:italic;">No room assigned</span>
            <button class="budget-modal-link" onclick="event.stopPropagation();reserveRoom(${ev.id})">🏢 Reserve a Room</button>
          </div>`
      }
    </div>`;
  const evBudget = getEventBudget(ev.subject);
  body += `
    <div>
      <div class="ms-title">Budget Estimate</div>
      ${evBudget
        ? `<div class="mi-row" style="justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="budget-chip" style="font-size:.8rem;padding:4px 10px;">💰 ${fmtBudget(evBudget.total)}</span>
              <span style="font-size:.72rem;color:var(--sub);">estimated total</span>
            </div>
            <button class="budget-modal-link" onclick="event.stopPropagation();openBudgetForEvent(${ev.id})">View in Budget Planner →</button>
          </div>`
        : `<div class="mi-row" style="justify-content:space-between;align-items:center;">
            <span style="color:var(--sub);font-size:.82rem;font-style:italic;">No estimate yet</span>
            <button class="budget-modal-link" onclick="event.stopPropagation();openBudgetForEvent(${ev.id})">💰 Create Estimate</button>
          </div>`
      }
    </div>`;
  body += `
    <div>
      <div class="ms-title">Support Teams</div>
      <div class="dept-grid">
        ${DEPT_NAMES.map(dept => {
          const s = ev.depts[dept]||'N/A', cls = statusCls(s);
          const hasMenu = SERVICE_MENU[dept] != null;
          const clickAttr = hasMenu ? ` onclick="openServiceMenu(${ev.id},'${dept}')"` : '';
          return `<div class="dept-card ${cls}${hasMenu?' clickable':''}"${clickAttr}>
            <div class="dept-card-name">${dept}</div>
            <div class="dept-card-status">${s}${hasMenu?' <span style="font-size:.6rem;opacity:.55;">▶</span>':''}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  body += `
    <div>
      <div class="ms-title">Ministry Admin</div>
      <div class="mi-row" style="justify-content:space-between;align-items:center;">
        <span style="font-size:.82rem;color:var(--sub);">${esc(ev.category)}</span>
        <button class="budget-modal-link" onclick="event.stopPropagation();openInAdmin(${ev.id})">Open in Admin →</button>
      </div>
    </div>`;
  const eventUrl = getEventUrl(ev.subject);
  body += `
    <div>
      <div class="ms-title">Link to Event Page</div>
      ${eventUrl
        ? `<div class="mi-row" style="justify-content:space-between;align-items:center;gap:8px;">
             <a href="${esc(eventUrl)}" target="_blank" rel="noopener" class="event-url-link">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
               View on Watermark.org
             </a>
             <button class="event-url-clear" onclick="clearEventUrl(${ev.id})">Remove</button>
           </div>`
        : `<div style="display:flex;gap:6px;align-items:center;">
             <input type="text" id="event-url-input" class="event-url-input" placeholder="Paste watermark.org/events/… URL" onkeydown="if(event.key==='Enter')saveEventUrl(${ev.id},this.value)" />
             <button class="event-url-save" onclick="saveEventUrl(${ev.id},document.getElementById('event-url-input').value)">Save</button>
           </div>`
      }
    </div>`;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-overlay').classList.add('open');
}

/* ═══════════════════════════════════════════════════
   SERVICE MENU
═══════════════════════════════════════════════════ */
function openServiceMenu(eventId, dept) {
  const ev = allEvents.find(e => e.id === eventId);
  if (!ev) return;
  const services = SERVICE_MENU[dept];
  if (!services) return;
  const status = ev.depts[dept] || 'N/A';
  const available = status === 'N/A' ? [] : services.filter(s => s.levels.includes(status));
  const levelColors = { Green:'#15803d', Blue:'#1558A0', Black:'#1f2937', 'Double Black':'#7b1c1c', 'N/A':'var(--sub)' };
  const levelBg    = { Green:'#f0fdf4', Blue:'#EBF4FA', Black:'#f1f5f9', 'Double Black':'#4a0a0a', 'N/A':'var(--cream)' };
  const todos = getCustomTodos();
  const html = `
    <button class="service-panel-back" onclick="openEvent(${eventId})">← Back to Event</button>
    <div class="service-panel-header">
      <span class="service-panel-title">${esc(dept)}</span>
      <span class="service-panel-level" style="background:${levelBg[status]};color:${levelColors[status]};border:1px solid ${levelColors[status]}20;">${esc(status)}</span>
    </div>
    ${status === 'N/A'
      ? `<p class="service-na-note">No support level set for this team — services are not yet assigned to this event.</p>`
      : available.length === 0
        ? `<p class="service-na-note">No services available at this level.</p>`
        : `<div class="service-list">${available.map((svc,i) => {
            const taskText = `${svc.name} — ${ev.subject}`;
            const alreadyAdded = todos.some(t => t.text === taskText);
            return `<div class="service-row">
              <span class="service-row-name">${esc(svc.name)}</span>
              <button class="service-add-btn${alreadyAdded?' added':''}" id="svc-btn-${i}" onclick="addServiceTask(${eventId},'${dept}',${i})">${alreadyAdded ? '✓ Added' : 'Add Task'}</button>
            </div>`;
          }).join('')}</div>`
    }`;
  document.getElementById('modal-body').innerHTML = html;
}

function addServiceTask(eventId, dept, btnIdx) {
  const ev = allEvents.find(e => e.id === eventId);
  if (!ev) return;
  const status = ev.depts[dept] || 'N/A';
  const available = (SERVICE_MENU[dept] || []).filter(s => s.levels.includes(status));
  const svc = available[btnIdx];
  if (!svc) return;
  const taskText = `${svc.name} — ${ev.subject}`;
  let todos = getCustomTodos();
  const existing = todos.findIndex(t => t.text === taskText);
  const btn = document.getElementById(`svc-btn-${btnIdx}`);
  if (existing !== -1) {
    todos.splice(existing, 1);
    saveCustomTodos(todos);
    if (btn) { btn.textContent = 'Add Task'; btn.classList.remove('added'); }
    return;
  }
  todos.push({ id: 'todo-' + Date.now(), text: taskText, ministry: ev.category, eventId: ev.id, completed: false, createdAt: Date.now(), notes: '', subtasks: [], priority: null });
  saveCustomTodos(todos);
  if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }
}

/* ═══════════════════════════════════════════════════
   MODAL CLOSE HANDLERS
═══════════════════════════════════════════════════ */
function changeEventCategory(eventId, newCategory) {
  const ev = allEvents.find(e => e.id === eventId);
  if (!ev) return;
  setCategoryOverride(ev.subject, newCategory);
  reapplyOverrides(ev.subject, newCategory);
  // If new primary matches secondary, clear secondary
  if (ev.secondaryCategory === newCategory) {
    setSecondaryCategory(ev.subject, null);
    for (const e of allEvents) { if (e.subject === ev.subject) e.secondaryCategory = null; }
  }
  // Refresh modal to show updated state
  openEvent(eventId);
  // Rebuild background view
  buildCatFilters(); applyFilters(); renderCurrentView();
}
function changeSecondaryCategory(eventId, newCategory) {
  const ev = allEvents.find(e => e.id === eventId);
  if (!ev) return;
  // Don't allow secondary = primary
  if (newCategory === ev.category) newCategory = 'None';
  const effectiveCat = (newCategory === 'None' || !newCategory) ? null : newCategory;
  setSecondaryCategory(ev.subject, effectiveCat);
  for (const e of allEvents) { if (e.subject === ev.subject) e.secondaryCategory = effectiveCat; }
  // Refresh modal
  openEvent(eventId);
  // Rebuild background view
  buildCatFilters(); applyFilters(); renderCurrentView();
}
function closeModal(e)    { if (e.target===document.getElementById('modal-overlay')) closeModalBtn(); }
function closeModalBtn()  { document.getElementById('modal-overlay').classList.remove('open'); }
function closeDayModal(e) { if (e.target===document.getElementById('day-modal-overlay')) closeDayModalBtn(); }
function closeDayModalBtn(){ document.getElementById('day-modal-overlay').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key==='Escape') { closeModalBtn(); closeDayModalBtn(); } });

/* ═══════════════════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════════════════ */
function emptyState(title, msg) {
  return `<div class="empty-state">
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#48565A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    <h3>${title}</h3><p>${msg}</p></div>`;
}

function openBudgetForEvent(id) {
  const ev = allEvents.find(e => e.id === id);
  if (!ev) return;
  localStorage.setItem('pendingBudgetEvent', JSON.stringify({ subject: ev.subject }));
  window.location.href = 'budget.html';
}

function openInAdmin(id) {
  const ev = allEvents.find(e => e.id === id); if (!ev) return;
  const slug = ev.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  localStorage.setItem('pendingAdminEvent', JSON.stringify({ subject: ev.subject, category: ev.category }));
  window.location.href = 'admin.html?category=' + encodeURIComponent(slug);
}

function reserveRoom(id) {
  const ev = allEvents.find(e => e.id === id);
  if (!ev) return;
  const d = ev.date instanceof Date ? ev.date : new Date(ev.date);
  const dateIso = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  localStorage.setItem('pendingRoomAssignment', JSON.stringify({ subject: ev.subject, date: dateIso }));
  window.location.href = 'rooms.html';
}

function viewReservation(id) {
  const ev = allEvents.find(e => e.id === id);
  if (!ev) return;
  const d = ev.date instanceof Date ? ev.date : new Date(ev.date);
  const dateIso = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  localStorage.setItem('pendingViewReservation', JSON.stringify({ subject: ev.subject, date: dateIso }));
  window.location.href = 'rooms.html';
}

/* ═══════════════════════════════════════════════════
   WEEKLY DIGEST VIEW
═══════════════════════════════════════════════════ */
function renderDigest() {
  const el = document.getElementById('digest-view');
  if (!el) return;

  // Compute Mon–Sun of the calendarDate week
  const ref = new Date(calendarDate);
  ref.setHours(0,0,0,0);
  const dow = ref.getDay(); // 0=Sun … 6=Sat
  const monday = new Date(ref);
  monday.setDate(ref.getDate() - ((dow + 6) % 7)); // roll back to Monday
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Bucket filtered events by day key
  const byDay = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    byDay[fmtDateKey(d)] = { date: d, events: [] };
  }
  for (const ev of filteredEvents) {
    const k = fmtDateKey(ev.date);
    if (byDay[k]) byDay[k].events.push(ev);
  }

  // Sort each day's events by start time
  for (const bucket of Object.values(byDay)) {
    bucket.events.sort((a, b) => {
      const ta = a.startTime || '', tb = b.startTime || '';
      return ta.localeCompare(tb);
    });
  }

  const totalEvents = Object.values(byDay).reduce((n, b) => n + b.events.length, 0);

  const fmtDateHeader = d =>
    d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const fmtShortDate = d =>
    d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const weekHdr = `Week of ${fmtShortDate(monday)} – ${fmtShortDate(sunday)}`;

  let html = `<div class="digest-view">`;
  html += `<div class="digest-week-hdr">
    <div class="digest-week-title">${esc(weekHdr)}</div>
    <div class="digest-week-count">${totalEvents} event${totalEvents !== 1 ? 's' : ''}</div>
  </div>`;

  let hasAny = false;
  for (const bucket of Object.values(byDay)) {
    if (!bucket.events.length) continue;
    hasAny = true;
    const dateKey = fmtDateKey(bucket.date);
    html += `<div class="digest-day-section">`;
    html += `<div class="digest-day-hdr" onclick="calendarDate=new Date('${dateKey}T12:00:00');setView('calendar')">${esc(fmtDateHeader(bucket.date))}</div>`;
    for (const ev of bucket.events) {
      const timeStr = ev.allDay
        ? 'All Day'
        : (ev.startTime ? fmtTime(ev.startTime) : '') +
          (ev.endTime ? ' – ' + fmtTime(ev.endTime) : '');
      const cat   = ev.category || 'Other';
      const color = catColor(cat);
      const loc   = ev.location ? esc(ev.location) : '';
      const dept  = Object.entries(ev.depts || {})
        .filter(([, v]) => v && v !== 'N/A')
        .map(([k]) => esc(k)).join(', ');
      html += `<div class="digest-event-row">
        <span class="digest-time">${esc(timeStr)}</span>
        <span class="digest-cat-dot" style="background:${color}" title="${esc(cat)}"></span>
        <span class="digest-name">${esc(ev.subject)}</span>
        ${loc ? `<span class="digest-loc">${loc}</span>` : ''}
        ${dept ? `<span class="digest-dept">${dept}</span>` : ''}
      </div>`;
    }
    html += `</div>`;
  }

  if (!hasAny) {
    html += `<div class="digest-empty">No events this week.</div>`;
  }

  html += `</div>`;
  el.innerHTML = html;
}

/* ═══════════════════════════════════════════════════
   BLACKOUT DATE MANAGER
═══════════════════════════════════════════════════ */
function saveBlackoutDates(list) {
  localStorage.setItem('wm_blackoutDates', JSON.stringify(list));
}

function openBlackoutModal() {
  const existing = document.getElementById('blackout-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'blackout-modal-overlay';
  overlay.className = 'blackout-modal-overlay';
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  function buildModal() {
    const dates = getBlackoutDates();
    overlay.innerHTML = `
      <div class="blackout-modal">
        <h3>🚫 Hold / Blackout Dates</h3>
        <div class="blackout-list" id="bo-list">
          ${dates.length ? dates.map((b, i) => `
            <div class="blackout-item">
              <span class="blackout-item-date">${b.date}</span>
              <span class="blackout-item-reason">${esc(b.reason || 'No reason')}</span>
              <button class="blackout-remove-btn" onclick="removeBlackout(${i})" title="Remove">✕</button>
            </div>`).join('') : '<div style="color:var(--sub);font-size:.8rem;padding:6px 0;">No hold dates set.</div>'}
        </div>
        <div class="blackout-add-row">
          <div>
            <label>Date</label>
            <input type="date" id="bo-date" />
          </div>
          <div>
            <label>Reason (optional)</label>
            <input type="text" id="bo-reason" placeholder="e.g. All-staff retreat" />
          </div>
          <button class="btn-add blackout-modal-foot" style="margin:0;padding:6px 14px;border-radius:6px;font-size:.78rem;cursor:pointer;background:var(--navy);color:#fff;border:none;" onclick="addBlackout()">＋ Add</button>
        </div>
        <div class="blackout-modal-foot">
          <button onclick="document.getElementById('blackout-modal-overlay').remove()">Close</button>
        </div>
      </div>`;
  }

  window.addBlackout = function() {
    const dateVal = document.getElementById('bo-date').value;
    if (!dateVal) { alert('Please select a date.'); return; }
    const reason = (document.getElementById('bo-reason').value || '').trim();
    const list = getBlackoutDates();
    if (list.some(b => b.date === dateVal)) { alert('That date is already marked as a hold.'); return; }
    list.push({ date: dateVal, reason });
    list.sort((a, b) => a.date.localeCompare(b.date));
    saveBlackoutDates(list);
    buildModal();
    renderCurrentView();
  };

  window.removeBlackout = function(idx) {
    const list = getBlackoutDates();
    list.splice(idx, 1);
    saveBlackoutDates(list);
    buildModal();
    renderCurrentView();
  };

  buildModal();
  document.body.appendChild(overlay);
}

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
loadCSV();
