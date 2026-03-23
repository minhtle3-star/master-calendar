/* ════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════ */
const DEFAULT_ROOMS = [
  // ── East Tower — Floor 1 ──
  {id:'et-1a',      name:'East Tower 1A',          type:'Assembly',  cap:80,  building:'East Tower'},
  {id:'et-1b',      name:'East Tower 1B',          type:'Assembly',  cap:80,  building:'East Tower'},
  {id:'et-101',     name:'East Tower 101',         type:'Classroom', cap:40,  building:'East Tower'},
  // ── East Tower — Floor 2 ──
  {id:'et-2a',      name:'East Tower 2A',          type:'Assembly',  cap:120, building:'East Tower'},
  {id:'et-2b',      name:'East Tower 2B',          type:'Assembly',  cap:120, building:'East Tower'},
  {id:'et-201',     name:'East Tower 201',         type:'Classroom', cap:30,  building:'East Tower'},
  {id:'et-202',     name:'East Tower 202',         type:'Classroom', cap:30,  building:'East Tower'},
  {id:'et-203',     name:'East Tower 203',         type:'Classroom', cap:30,  building:'East Tower'},
  {id:'et-204',     name:'East Tower 204',         type:'Classroom', cap:30,  building:'East Tower'},
  {id:'et-205ab',   name:'East Tower 205AB',       type:'Classroom', cap:40,  building:'East Tower'},
  {id:'et-206ab',   name:'East Tower 206AB',       type:'Classroom', cap:40,  building:'East Tower'},
  {id:'et-207ab',   name:'East Tower 207AB',       type:'Classroom', cap:40,  building:'East Tower'},
  {id:'et-208ab',   name:'East Tower 208AB',       type:'Classroom', cap:40,  building:'East Tower'},
  {id:'et-2lobby',  name:'East Tower 2 Lobby',     type:'Lobby',     cap:80,  building:'East Tower'},
  // ── East Tower — Floor 3 ──
  {id:'et-3west',   name:'ET 3 Assembly West',     type:'Assembly',  cap:150, building:'East Tower'},
  {id:'et-303',     name:'ET 303',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-304',     name:'ET 304',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-305',     name:'ET 305',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-306',     name:'ET 306',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-307ab',   name:'ET 307AB',               type:'Common',    cap:40,  building:'East Tower'},
  {id:'et-312',     name:'ET 312',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-313',     name:'ET 313',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-314',     name:'ET 314',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-315',     name:'ET 315',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-316',     name:'ET 316',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-317',     name:'ET 317',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-318',     name:'ET 318',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-319',     name:'ET 319',                 type:'Common',    cap:30,  building:'East Tower'},
  {id:'et-3lobby',  name:'ET 3 Lobby/Kitchen',     type:'Lobby',     cap:80,  building:'East Tower'},
  // ── West Tower — Floor 1 ──
  {id:'wt-120',     name:'West Tower 120',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-121',     name:'West Tower 121',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-122',     name:'West Tower 122',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-125',     name:'West Tower 125',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-126',     name:'West Tower 126',         type:'Classroom', cap:30,  building:'West Tower'},
  // ── West Tower — Floor 2 ──
  {id:'wt-2n',      name:'2 North',                type:'Assembly',  cap:120, building:'West Tower'},
  {id:'wt-204205',  name:'West Tower 204/205',     type:'Classroom', cap:60,  building:'West Tower'},
  {id:'wt-206ab',   name:'West Tower 206AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-207ab',   name:'West Tower 207AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-208ab',   name:'West Tower 208AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-209210',  name:'West Tower 209/210',     type:'Classroom', cap:60,  building:'West Tower'},
  {id:'wt-211ab',   name:'West Tower 211AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-212',     name:'West Tower 212',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-2lobby',  name:'WT 2 Lobby',             type:'Lobby',     cap:80,  building:'West Tower'},
  // ── West Tower — Floor 3 ──
  {id:'wt-3n',      name:'3 North',                type:'Assembly',  cap:120, building:'West Tower'},
  {id:'wt-3s',      name:'3 South',                type:'Assembly',  cap:120, building:'West Tower'},
  {id:'wt-306ab',   name:'West Tower 306AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-307308',  name:'West Tower 307/308',     type:'Classroom', cap:60,  building:'West Tower'},
  {id:'wt-309ab',   name:'West Tower 309AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-310311',  name:'West Tower 310/311',     type:'Classroom', cap:60,  building:'West Tower'},
  {id:'wt-312ab',   name:'West Tower 312AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-313ab',   name:'West Tower 313AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-3lobby',  name:'WT 3 Lobby',             type:'Lobby',     cap:80,  building:'West Tower'},
  // ── West Tower — Floor 4 ──
  {id:'wt-4n',      name:'4 North',                type:'Assembly',  cap:150, building:'West Tower'},
  {id:'wt-421ab',   name:'West Tower 421AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-422ab',   name:'West Tower 422AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-423ab',   name:'West Tower 423AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-425ab',   name:'West Tower 425AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-426ab',   name:'West Tower 426AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-432ab',   name:'West Tower 432AB',       type:'Classroom', cap:40,  building:'West Tower'},
  {id:'wt-428',     name:'West Tower 428',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-429',     name:'West Tower 429',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-441',     name:'West Tower 441',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-445',     name:'West Tower 445',         type:'Classroom', cap:30,  building:'West Tower'},
  {id:'wt-4lobby',  name:'WT 4 Lobby',             type:'Lobby',     cap:80,  building:'West Tower'},
  // ── West Tower — Floor 5 ──
  {id:'wt-5s',      name:'5 South',                type:'Assembly',  cap:150, building:'West Tower'},
  {id:'wt-5view',   name:'5 - View',               type:'Conf Room', cap:15,  building:'West Tower'},
  {id:'wt-5huddle', name:'5 - Huddle',             type:'Conf Room', cap:8,   building:'West Tower'},
  {id:'wt-5cont',   name:'5 - Container',          type:'Conf Room', cap:8,   building:'West Tower'},
  {id:'wt-5lobby',  name:'WT 5 Lobby',             type:'Lobby',     cap:80,  building:'West Tower'},
  // ── West Tower — Floors 6–8 ──
  {id:'wt-601',     name:'6th South War Room (601)',type:'Conf Room', cap:20,  building:'West Tower'},
  {id:'wt-602',     name:'6th North War Room (602)',type:'Conf Room', cap:20,  building:'West Tower'},
  {id:'wt-7central',name:'7th Central Conference', type:'Conf Room', cap:20,  building:'West Tower'},
  {id:'wt-7fish',   name:'7th Fishbowl Conference',type:'Conf Room', cap:15,  building:'West Tower'},
  {id:'wt-7nw',     name:'7th NW Conference',      type:'Conf Room', cap:10,  building:'West Tower'},
  {id:'wt-8recep',  name:'8th Reception Conference',type:'Conf Room',cap:15,  building:'West Tower'},
  // ── East Tower — Floor 8 ──
  {id:'et-8studio', name:'ET 8th Studio',           type:'Studio',    cap:20,  building:'East Tower'},
  // ── Kids Building — Floor 1 ──
  {id:'kb-vol1',    name:'Kids 1 Volunteer Room',   type:'Kids',      cap:20,  building:'Kids Building'},
  {id:'kb-gameroom',name:'Kids Gameroom',           type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-blue',    name:'Kids Blue',               type:'Kids',      cap:30,  building:'Kids Building'},
  {id:'kb-green',   name:'Kids Green',              type:'Kids',      cap:30,  building:'Kids Building'},
  {id:'kb-orange',  name:'Kids Orange',             type:'Kids',      cap:30,  building:'Kids Building'},
  {id:'kb-yellow',  name:'Kids Yellow',             type:'Kids',      cap:30,  building:'Kids Building'},
  {id:'kb-red',     name:'Kids Red',                type:'Kids',      cap:30,  building:'Kids Building'},
  // ── Kids Building — Floor 2 ──
  {id:'kb-stage2abc',name:'Stage 2ABC',             type:'Assembly',  cap:300, building:'Kids Building'},
  {id:'kb-bo12',    name:'Kids Breakout 1/2',       type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo34',    name:'Kids Breakout 3/4',       type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo56',    name:'Kids Breakout 5/6',       type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo78',    name:'Kids Breakout 7/8',       type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo910',   name:'Kids Breakout 9/10',      type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo1112',  name:'Kids Breakout 11/12',     type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo1314',  name:'Kids Breakout 13/14',     type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo1516',  name:'Kids Breakout 15/16',     type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo1718',  name:'Kids Breakout 17/18',     type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo1920',  name:'Kids Breakout 19/20',     type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-bo2122',  name:'Kids Breakout 21/22',     type:'Kids',      cap:40,  building:'Kids Building'},
  {id:'kb-mezz',    name:'Kids Mezzanine',          type:'Lobby',     cap:80,  building:'Kids Building'},
  // ── Town Center ──
  {id:'tc-loft',       name:'Loft',                 type:'Assembly',  cap:100, building:'Town Center'},
  {id:'tc-bunker',     name:'Bunker',               type:'Assembly',  cap:100, building:'Town Center'},
  {id:'tc-frontlines', name:'Frontlines',           type:'Assembly',  cap:200, building:'Town Center'},
  {id:'tc-aud',        name:'Auditorium',           type:'Assembly',  cap:500, building:'Town Center'},
  {id:'tc-chapel',  name:'Chapel',                  type:'Assembly',  cap:150, building:'Town Center'},
  {id:'tc-north',   name:'North Community Room',    type:'Common',    cap:60,  building:'Town Center'},
  {id:'tc-south',   name:'South Community Room',    type:'Common',    cap:60,  building:'Town Center'},
  {id:'tc-coffee',  name:'Coffee Shop/Lobby',       type:'Lobby',     cap:150, building:'Town Center'},
  {id:'tc-pond',    name:'Pond',                    type:'Outdoor',   cap:200, building:'Town Center'},
];

const CAT_COLORS = {
  'Sunday Services':        '#003A5D',
  'Kids Team':              '#B5712A',
  'Ministry Programs':      '#1E5E7A',
  'Equipping Team':         '#2E6B5E',
  'Care Team':              '#7A3E5C',
  'Special Events':         '#8B3A28',
  'Leadership Team':        '#48565A',
  'Missions & Outreach':  '#C2653C',
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

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
let _currentDate = new Date();
_currentDate.setHours(0,0,0,0);
let _bldgFilter = '';
let _blocks = [];      // filled by buildGantt()
let _editingRsvId = null;
let _collapsedBuildings = new Set();
let _showDashboard = false;
let _weatherCache = {};

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function minsFromMidnight(t) {
  if (!t) return 0;
  const [h,m] = t.split(':').map(Number);
  return h * 60 + m;
}

function fmtTime(t) {
  if (!t) return '';
  const [h,m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'am' : 'pm';
  const hr = h % 12 || 12;
  return m ? `${hr}:${String(m).padStart(2,'0')}${ampm}` : `${hr}${ampm}`;
}

function toISODate(d) {
  return d.toISOString().split('T')[0];
}

function catColor(cat) {
  return CAT_COLORS[cat] || '#6B7880';
}

function getRoomList() {
  try {
    const raw = localStorage.getItem('roomList');
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
  } catch {}
  // Persist defaults so other pages (event-request, etc.) can read room data
  try { localStorage.setItem('roomList', JSON.stringify(DEFAULT_ROOMS)); } catch {}
  return DEFAULT_ROOMS;
}

function saveRoomList(list) {
  localStorage.setItem('roomList', JSON.stringify(list));
}

function getRoomReservations() {
  try { return JSON.parse(localStorage.getItem('roomReservations') || '[]'); } catch { return []; }
}

function saveRoomReservations(rsvs) {
  localStorage.setItem('roomReservations', JSON.stringify(rsvs));
}

function getEventIndex() {
  try { return JSON.parse(localStorage.getItem('eventIndex') || '[]'); } catch { return []; }
}

/* ════════════════════════════════════════
   BLOCK DATA
════════════════════════════════════════ */
function getBlocksForDate(dateObj) {
  const iso = toISODate(dateObj);
  const rooms = getRoomList();
  const blocks = [];

  // 1. Manual reservations
  const rsvs = getRoomReservations();
  rsvs.filter(r => r.date === iso).forEach(r => {
    const room = rooms.find(rm => rm.id === r.roomId);
    blocks.push({
      type: 'reservation',
      roomId: r.roomId,
      roomName: room ? room.name : r.roomId,
      subject: r.subject,
      ministry: r.ministry || '',
      startTime: r.startTime,
      endTime: r.endTime,
      linkedEventSubject: r.linkedEventSubject || '',
      linkedEventId: r.linkedEventId || '',
      rsvId: r.id,
    });
  });

  // 2. CSV events from eventIndex — fuzzy-match location to room name
  const evIdx = getEventIndex();
  evIdx.filter(ev => ev.date === iso && ev.location && ev.startTime && ev.endTime)
    .forEach(ev => {
      const loc = (ev.location || '').toLowerCase();
      rooms.forEach(rm => {
        if (loc.includes(rm.name.toLowerCase()) || rm.name.toLowerCase().includes(loc)) {
          // avoid duplicate if a manual reservation already covers same subject+room
          const dup = blocks.find(b => b.roomId === rm.id && b.linkedEventSubject === ev.subject);
          if (!dup) {
            blocks.push({
              type: 'csv',
              roomId: rm.id,
              roomName: rm.name,
              subject: ev.subject,
              ministry: ev.category || '',
              startTime: ev.startTime,
              endTime: ev.endTime,
              linkedEventSubject: ev.subject,
              linkedEventId: ev.id || '',
            });
          }
        }
      });
    });

  return blocks;
}

/* ════════════════════════════════════════
   GANTT RENDER
════════════════════════════════════════ */
function buildGantt() {
  const outer = document.getElementById('gantt-outer');
  const rooms = getRoomList().filter(r => !_bldgFilter || r.building === _bldgFilter);

  _blocks = getBlocksForDate(_currentDate);

  // Group rooms by building
  const buildings = [...new Set(rooms.map(r => r.building))];

  // Time header
  let hrHtml = '';
  for (let h = 0; h < 24; h++) {
    const lbl = h === 0 ? '12am' : h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h-12}pm`;
    hrHtml += `<div class="hr-lbl" style="position:absolute;left:${h*60}px;top:0;width:60px;height:44px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;font-size:.6rem;font-weight:700;color:var(--sub);border-left:2px solid #c8c2b8;">${lbl}</div>`;
    hrHtml += `<div class="hr-half" style="position:absolute;left:${h*60+30}px;bottom:0;width:1px;height:10px;background:#ddd8d0;"></div>`;
  }

  // Now-line position
  const now = new Date();
  const nowIso = toISODate(now);
  const todayIso = toISODate(_currentDate);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const nowLineHtml = nowIso === todayIso
    ? `<div class="now-line" id="now-line" style="left:${nowMins}px;"></div>`
    : '';

  // Room rows HTML
  let rowsHtml = '';
  const showCollapse = !_bldgFilter; // only in All view
  buildings.forEach(bldg => {
    const bRooms = rooms.filter(r => r.building === bldg);
    const isCollapsed = showCollapse && _collapsedBuildings.has(bldg);
    const chevron = isCollapsed ? '▸' : '▾';
    const collapseBtn = showCollapse
      ? `<button class="bldg-collapse-btn" onclick="toggleBldgCollapse('${esc(bldg)}')" title="${isCollapsed?'Expand':'Collapse'}">${chevron}</button>`
      : '';
    rowsHtml += `
      <div class="bldg-hdr-row">
        <div class="bldg-hdr-label">${collapseBtn}${esc(bldg)}<span style="font-size:.55rem;font-weight:400;opacity:.55;margin-left:3px;">(${bRooms.length})</span></div>
        <div class="bldg-hdr-stripe"></div>
      </div>
      <div class="bldg-rows${isCollapsed?' collapsed':''}">`;
    bRooms.forEach(rm => {
      // Find blocks for this room
      const rmBlocks = _blocks.filter(b => b.roomId === rm.id);
      let blockHtml = '';
      rmBlocks.forEach((b, bidx) => {
        const globalIdx = _blocks.indexOf(b);
        const startMins = minsFromMidnight(b.startTime);
        const endMins   = minsFromMidnight(b.endTime);
        const w = Math.max(endMins - startMins, 4);
        const color = catColor(b.ministry);
        const opacity = b.type === 'csv' ? '0.88' : '1';
        blockHtml += `<div class="evt-block"
          style="left:${startMins}px;width:${w}px;background:${color};opacity:${opacity};"
          data-bidx="${globalIdx}"
          onclick="handleBlockClick(event,this)"
          title="${esc(b.subject)} ${b.startTime}–${b.endTime}">
          <span class="evt-block-label">${esc(b.subject)}</span>
        </div>`;
      });

      rowsHtml += `
        <div class="room-row-wrap">
          <div class="room-label">
            <div>
              <div class="room-name">${esc(rm.name)}</div>
              <div class="room-meta">${esc(rm.type)}</div>
            </div>
            <div class="room-cap">👥 ${rm.cap >= 1000 ? (rm.cap/1000).toFixed(1)+'k' : rm.cap}</div>
          </div>
          <div class="room-timeline">
            ${blockHtml}
          </div>
        </div>`;
    });
    rowsHtml += `</div>`; // close .bldg-rows
  });

  // Direct HTML structure
  outer.innerHTML = `
    <div style="position:relative;">
      <!-- Sticky time header -->
      <div style="position:sticky;top:0;z-index:30;display:flex;background:var(--surface-1);border-bottom:2px solid var(--border);">
        <div style="width:220px;flex-shrink:0;height:44px;border-right:2px solid var(--border);display:flex;align-items:center;padding-left:12px;font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--sub);background:var(--surface-1);position:sticky;left:0;z-index:40;">Room</div>
        <div style="position:relative;width:1440px;flex-shrink:0;height:44px;">${hrHtml}</div>
      </div>
      <!-- Rows -->
      <div style="display:flex;flex-direction:column;">
        ${rowsHtml}
      </div>
      <!-- Now line (absolutely positioned over time columns) -->
    </div>`;

  // Inject now-line into each room-timeline
  if (nowIso === todayIso) {
    outer.querySelectorAll('.room-timeline').forEach(tl => {
      const nl = document.createElement('div');
      nl.className = 'now-line';
      nl.style.left = nowMins + 'px';
      tl.appendChild(nl);
    });
  }

  // Scroll to 6am on first load
  if (!outer._scrolled) {
    outer._scrolled = true;
    requestAnimationFrame(() => { outer.scrollLeft = 6 * 60 - 20; });
  }

  buildLegend();
}

function buildLegend() {
  const cats = [...new Set(_blocks.map(b => b.ministry).filter(Boolean))];
  const bar = document.getElementById('legend-bar');
  if (!cats.length) { bar.innerHTML = '<span style="font-size:.65rem;color:var(--sub);">No events today — load a CSV in Ministry Admin to see events, or add a reservation.</span>'; return; }
  bar.innerHTML = cats.map(c =>
    `<div class="legend-item"><div class="legend-dot" style="background:${catColor(c)};"></div><span class="legend-lbl">${esc(c)}</span></div>`
  ).join('');
}

/* ════════════════════════════════════════
   DASHBOARD
════════════════════════════════════════ */
const WMO_CODES = {
  0:'☀️ Clear sky', 1:'🌤️ Mainly clear', 2:'⛅ Partly cloudy', 3:'☁️ Overcast',
  45:'🌫️ Fog', 48:'🌫️ Icy fog', 51:'🌦️ Light drizzle', 53:'🌦️ Drizzle', 55:'🌧️ Heavy drizzle',
  61:'🌧️ Light rain', 63:'🌧️ Rain', 65:'🌧️ Heavy rain',
  71:'🌨️ Light snow', 73:'🌨️ Snow', 75:'🌨️ Heavy snow',
  80:'🌦️ Rain showers', 81:'🌧️ Showers', 82:'⛈️ Heavy showers',
  95:'⛈️ Thunderstorm', 96:'⛈️ Thunderstorm + hail', 99:'⛈️ Severe thunderstorm',
};

async function fetchWeather(dateIso) {
  if (_weatherCache[dateIso]) return _weatherCache[dateIso];
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=32.7767&longitude=-96.7970&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&start_date=${dateIso}&end_date=${dateIso}`;
    const res = await fetch(url);
    const json = await res.json();
    const d = json.daily;
    const data = {
      code:   d.weathercode[0],
      high:   Math.round(d.temperature_2m_max[0]),
      low:    Math.round(d.temperature_2m_min[0]),
      precip: parseFloat(d.precipitation_sum[0]).toFixed(2),
      wind:   Math.round(d.windspeed_10m_max[0]),
    };
    _weatherCache[dateIso] = data;
    return data;
  } catch(e) { return null; }
}

function getEventsForDate(dateIso) {
  return getEventIndex().filter(ev => ev.date === dateIso);
}

function getEventsWithoutRoom(dateIso) {
  const events = getEventsForDate(dateIso);
  const rsvs = getRoomReservations().filter(r => r.date === dateIso);
  const bookedSubjects = new Set(rsvs.map(r => r.linkedEventSubject).filter(Boolean));
  return events.filter(ev => !bookedSubjects.has(ev.subject));
}

function getEventsByBuilding(dateIso) {
  const rsvs = getRoomReservations().filter(r => r.date === dateIso);
  const rooms = getRoomList();
  const roomById = Object.fromEntries(rooms.map(r => [r.id, r]));
  const counts = {};
  rsvs.forEach(rsv => {
    const rm = roomById[rsv.roomId];
    if (!rm) return;
    counts[rm.building] = (counts[rm.building] || 0) + 1;
  });
  return counts;
}

function getEstimatedAttendance(dateIso) {
  const rsvs = getRoomReservations().filter(r => r.date === dateIso);
  const rooms = getRoomList();
  const roomById = Object.fromEntries(rooms.map(r => [r.id, r]));
  const seenRooms = new Set();
  let total = 0;
  rsvs.forEach(rsv => {
    if (!seenRooms.has(rsv.roomId)) {
      seenRooms.add(rsv.roomId);
      total += (roomById[rsv.roomId]?.cap || 0);
    }
  });
  return total;
}

function toggleDashboard() {
  _showDashboard = !_showDashboard;
  document.getElementById('gantt-outer').classList.toggle('hidden', _showDashboard);
  document.getElementById('dashboard-view').classList.toggle('hidden', !_showDashboard);
  document.getElementById('dash-btn').classList.toggle('active', _showDashboard);
  if (_showDashboard) buildDashboard();
}

function getTopRoomsThisMonth() {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const rsvs = getRoomReservations().filter(r => r.date && r.date.startsWith(ym));
  const counts = {};
  rsvs.forEach(r => { counts[r.roomId] = (counts[r.roomId]||0) + 1; });
  const rooms = getRoomList();
  const roomById = Object.fromEntries(rooms.map(r => [r.id, r]));
  return Object.entries(counts)
    .sort((a,b) => b[1]-a[1]).slice(0,5)
    .map(([id,cnt]) => ({ name: (roomById[id]||{}).name || id, count: cnt }));
}

function getConflictCountThisMonth() {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const rsvs = getRoomReservations().filter(r => r.date && r.date.startsWith(ym));
  const byDateRoom = {};
  rsvs.forEach(r => {
    const k = `${r.date}|${r.roomId}`;
    if (!byDateRoom[k]) byDateRoom[k] = [];
    byDateRoom[k].push(r);
  });
  let conflicts = 0;
  Object.values(byDateRoom).forEach(group => {
    for (let i=0; i<group.length; i++) {
      for (let j=i+1; j<group.length; j++) {
        const as=minsFromMidnight(group[i].startTime), ae=minsFromMidnight(group[i].endTime);
        const bs=minsFromMidnight(group[j].startTime), be=minsFromMidnight(group[j].endTime);
        if (as<be && ae>bs) conflicts++;
      }
    }
  });
  return conflicts;
}

async function buildDashboard() {
  const dateIso = toISODate(_currentDate);
  const dv = document.getElementById('dashboard-view');
  const events = getEventsForDate(dateIso);
  const rsvs = getRoomReservations().filter(r => r.date === dateIso);
  const noRoomEvents = getEventsWithoutRoom(dateIso);
  const byBldg = getEventsByBuilding(dateIso);
  const attendance = getEstimatedAttendance(dateIso);

  // Year-level stats
  const year = _currentDate.getFullYear();
  const allEventsYear = getEventIndex().filter(ev => ev.date && ev.date.startsWith(String(year)));
  const allRsvsYear = getRoomReservations().filter(r => r.date && r.date.startsWith(String(year)));
  const rsvEventIds = new Set(allRsvsYear.map(r => String(r.linkedEventId)).filter(Boolean));
  const evWithRoom = allEventsYear.filter(ev => rsvEventIds.has(String(ev.id))).length;
  const evWithoutRoom = allEventsYear.length - evWithRoom;
  const yearPct = allEventsYear.length ? Math.round(evWithRoom / allEventsYear.length * 100) : 0;

  dv.innerHTML = `<div class="dash-card" style="grid-column:1/-1;text-align:center;padding:32px;color:var(--sub);font-size:.82rem;">Loading weather…</div>`;

  const wx = await fetchWeather(dateIso);
  const wxEntry = (wx !== null && WMO_CODES[wx.code]) ? WMO_CODES[wx.code] : null;
  const wxEmoji = wxEntry ? wxEntry.split(' ')[0] : '—';
  const wxLabel = wxEntry ? wxEntry.slice(wxEntry.indexOf(' ')+1) : 'Unavailable';

  // By-building bars
  const bldgEntries = Object.entries(byBldg).sort((a,b) => b[1]-a[1]);
  const maxBldgCnt = Math.max(1, ...bldgEntries.map(e => e[1]));
  const bldgBarsHtml = bldgEntries.length
    ? bldgEntries.map(([bldg, cnt]) => `
        <div class="bldg-bar-row">
          <div class="bldg-bar-name" title="${esc(bldg)}">${esc(bldg)}</div>
          <div class="bldg-bar-wrap"><div class="bldg-bar-fill" style="width:${(cnt/maxBldgCnt*100).toFixed(1)}%;"></div></div>
          <div class="bldg-bar-count">${cnt}</div>
        </div>`).join('')
    : '<div style="font-size:.75rem;color:var(--sub);">No room data for this day</div>';

  // Events without rooms
  const noRsvHtml = noRoomEvents.length
    ? noRoomEvents.slice(0,12).map(ev => `
        <div class="no-rsv-event no-rsv-clickable" data-subject="${esc(ev.subject)}" onclick="openAddPanelForEvent(this.dataset.subject)" title="Click to assign a room">
          <strong>${esc(ev.subject)}</strong>
          <span>${ev.dateStr||''}${ev.startTime ? ' · '+ev.startTime : ''}${ev.location ? ' · '+esc(ev.location) : ''}</span>
          <span class="no-rsv-add-hint">＋ Assign room</span>
        </div>`).join('')
      + (noRoomEvents.length > 12 ? `<div style="font-size:.7rem;color:var(--sub);padding-top:6px;">+${noRoomEvents.length-12} more</div>` : '')
    : '<div style="font-size:.75rem;color:var(--green);font-weight:700;">✓ All events have rooms assigned</div>';

  // All events — grouped by ministry
  let allEvHtml = '<div style="font-size:.75rem;color:var(--sub);">No events scheduled for this day</div>';
  if (events.length) {
    // Group by category, preserving first-seen order
    const groups = {};
    const groupOrder = [];
    events.forEach(ev => {
      const cat = ev.category || 'Uncategorized';
      if (!groups[cat]) { groups[cat] = []; groupOrder.push(cat); }
      groups[cat].push(ev);
    });
    allEvHtml = groupOrder.map(cat => {
      const c = catColor(cat);
      const evRows = groups[cat].map(ev =>
        `<div class="event-day-item" style="border-color:${c};background:${c}12;" data-subject="${esc(ev.subject)}" onclick="openAddPanelForEvent(this.dataset.subject)" title="Click to assign a room">
          <strong>${esc(ev.subject)}</strong>
          <span>${ev.startTime ? ev.startTime+' · ' : ''}${ev.location ? esc(ev.location) : ''}</span>
          <span class="ev-item-hint">＋ Assign room</span>
        </div>`
      ).join('');
      return `<div class="ministry-group">
        <div class="ministry-group-hdr" style="border-left:3px solid ${c};">
          <span class="ministry-dot" style="background:${c};"></span>${esc(cat)} <span class="ministry-count">${groups[cat].length}</span>
        </div>
        ${evRows}
      </div>`;
    }).join('');
  }

  const attFmt = attendance >= 1000 ? (attendance/1000).toFixed(1)+'k' : attendance;

  dv.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-title">🌤 Weather · Dallas</div>
      ${wx ? `
        <div class="weather-icon">${wxEmoji}</div>
        <div class="weather-temp">${wx.high}° / ${wx.low}°F</div>
        <div class="weather-desc">${wxLabel}</div>
        <div class="weather-detail">
          <span>💧 ${wx.precip}"</span>
          <span>💨 ${wx.wind} mph</span>
        </div>` : `<div class="weather-icon">—</div><div class="weather-desc" style="color:var(--sub);">Weather unavailable<br><span style="font-size:.65rem;">Check your connection</span></div>`}
    </div>
    <div class="dash-card">
      <div class="dash-card-title">📅 Events Today</div>
      <div class="dash-stat-big">${events.length}</div>
      <div class="dash-stat-label">calendar events scheduled</div>
      <div style="margin-top:14px;">
        <div class="dash-stat-big" style="font-size:1.6rem;color:${noRoomEvents.length>0?'var(--red)':'var(--green)'};">${noRoomEvents.length}</div>
        <div class="dash-stat-label" style="color:${noRoomEvents.length>0?'var(--red)':'var(--green)'};">${noRoomEvents.length===0?'✓ All events':noRoomEvents.length===1?'event':'events'} without rooms</div>
      </div>
    </div>
    <div class="dash-card">
      <div class="dash-card-title">🏢 Room Bookings</div>
      <div class="dash-stat-big">${rsvs.length}</div>
      <div class="dash-stat-label">reservations today</div>
      <div style="margin-top:14px;">
        <div class="dash-stat-big" style="font-size:1.6rem;">${attFmt}</div>
        <div class="dash-stat-label">estimated total capacity</div>
      </div>
    </div>
    <div class="dash-card">
      <div class="dash-card-title">🏗 Reservations by Building</div>
      ${bldgBarsHtml}
    </div>
    <div class="dash-card">
      <div class="dash-card-title" style="${noRoomEvents.length>0?'color:var(--red);':''}">⚠️ Events Without Rooms (${noRoomEvents.length})</div>
      ${noRsvHtml}
    </div>
    <div class="dash-card">
      <div class="dash-card-title">📋 All Events Today (${events.length})</div>
      <div class="event-day-list">${allEvHtml}</div>
    </div>
    <div class="dash-card">
      <div class="dash-card-title">📆 ${year} Year Overview</div>
      <div class="dash-stat-big">${allEventsYear.length}</div>
      <div class="dash-stat-label">total events this year</div>
      <div class="year-rsv-bar"><div class="year-rsv-fill" style="width:${yearPct}%"></div></div>
      <div style="display:flex;justify-content:space-around;margin-top:10px;gap:8px;">
        <div style="text-align:center;">
          <div class="dash-stat-big" style="font-size:1.6rem;color:var(--green);">${evWithRoom}</div>
          <div class="dash-stat-label" style="color:var(--green);">with rooms (${yearPct}%)</div>
        </div>
        <div style="text-align:center;">
          <div class="dash-stat-big" style="font-size:1.6rem;color:${evWithoutRoom>0?'var(--red)':'var(--green)'};">${evWithoutRoom}</div>
          <div class="dash-stat-label" style="color:${evWithoutRoom>0?'var(--red)':'var(--green)'};">${evWithoutRoom===0?'✓ none':'without rooms'}</div>
        </div>
      </div>
    </div>
    ${(() => {
      const topRooms = getTopRoomsThisMonth();
      const conflictCount = getConflictCountThisMonth();
      const monthLabel = new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'});
      const maxCnt = topRooms.length ? topRooms[0].count : 1;
      const bars = topRooms.length
        ? topRooms.map((r,i) => `
            <div class="bldg-bar-row">
              <div class="bldg-bar-name" title="${esc(r.name)}">${esc(r.name)}</div>
              <div class="bldg-bar-wrap"><div class="bldg-bar-fill" style="width:${Math.round(r.count/maxCnt*100)}%;"></div></div>
              <div class="bldg-bar-count">${r.count}</div>
            </div>`).join('')
        : '<div style="font-size:.75rem;color:var(--sub);">No bookings this month</div>';
      return `<div class="dash-card">
        <div class="dash-card-title">📊 Room Utilization · ${esc(monthLabel)}</div>
        <div style="margin-bottom:14px;">
          <div class="dash-stat-big" style="font-size:1.6rem;color:${conflictCount>0?'var(--red)':'var(--green)'};">${conflictCount}</div>
          <div class="dash-stat-label" style="color:${conflictCount>0?'var(--red)':'var(--green)'};">${conflictCount===0?'✓ No scheduling conflicts':'conflict'+(conflictCount>1?'s':'')+' this month'}</div>
        </div>
        <div class="dash-card-title" style="font-size:.68rem;margin-bottom:8px;">Top Rooms This Month</div>
        ${bars}
      </div>`;
    })()}`;
}

function toggleBldgCollapse(bldg) {
  if (_collapsedBuildings.has(bldg)) {
    _collapsedBuildings.delete(bldg);
  } else {
    _collapsedBuildings.add(bldg);
  }
  buildGantt();
}

/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */
function updateHeader() {
  const opts = {weekday:'long',month:'long',day:'numeric',year:'numeric'};
  document.getElementById('hdr-date-lbl').textContent = _currentDate.toLocaleDateString('en-US', opts);
  document.getElementById('date-pick').value = toISODate(_currentDate);
}

function dayNav(dir) {
  _currentDate.setDate(_currentDate.getDate() + dir);
  updateHeader();
  buildGantt();
  if (_showDashboard) buildDashboard();
}

function goToday() {
  _currentDate = new Date();
  _currentDate.setHours(0,0,0,0);
  updateHeader();
  buildGantt();
  if (_showDashboard) buildDashboard();
  // reset scroll to 6am
  const outer = document.getElementById('gantt-outer');
  outer._scrolled = false;
  requestAnimationFrame(() => { outer.scrollLeft = 6 * 60 - 20; });
}

function setDate(val) {
  if (!val) return;
  const [y,m,d] = val.split('-').map(Number);
  _currentDate = new Date(y, m-1, d);
  updateHeader();
  buildGantt();
  if (_showDashboard) buildDashboard();
}

function setBldg(el, bldg) {
  _bldgFilter = bldg;
  document.querySelectorAll('.bldg-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  buildGantt();
}

/* ════════════════════════════════════════
   BLOCK POPUP
════════════════════════════════════════ */
function handleBlockClick(e, el) {
  e.stopPropagation();
  const idx = parseInt(el.dataset.bidx);
  const b = _blocks[idx];
  if (!b) return;
  openPopup(e, b);
}

function openPopup(e, b) {
  const popup = document.getElementById('block-popup');
  popup.classList.remove('hidden');

  document.getElementById('pp-title').textContent = b.subject;

  const badge = document.getElementById('pp-badge');
  badge.textContent = b.ministry || '—';
  badge.style.background = catColor(b.ministry);

  document.getElementById('pp-time').textContent = `${fmtTime(b.startTime)} – ${fmtTime(b.endTime)}`;
  document.getElementById('pp-room').textContent = `🏢 ${b.roomName}`;

  const linkWrap = document.getElementById('pp-link-wrap');
  let linkHtml = '';
  if (b.linkedEventSubject) {
    const safeSubj = b.linkedEventSubject.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
    linkHtml += `<button class="popup-link" onclick="closePopup();openInCalendar('${b.linkedEventId}','${safeSubj}')">Open in Calendar →</button>`;
    const _evBudgets = (() => { try { return JSON.parse(localStorage.getItem('eventBudgets')||'{}'); } catch { return {}; } })();
    if (_evBudgets[b.linkedEventSubject]) {
      linkHtml += `<button class="popup-link" onclick="closePopup();openBudgetFromRoom('${safeSubj}')">Open Budget →</button>`;
    }
  }
  if (b.rsvId) {
    linkHtml += `<button class="popup-edit-btn" onclick="closePopup();openAddPanel('${b.rsvId}')">✏ Edit Reservation</button>`;
  }
  linkWrap.innerHTML = linkHtml;

  // Position popup near click, stay in viewport
  const pw = 300, ph = 190;
  let x = e.clientX + 10, y = e.clientY - 20;
  if (x + pw > window.innerWidth - 10) x = e.clientX - pw - 10;
  if (y + ph > window.innerHeight - 10) y = e.clientY - ph;
  popup.style.left = x + 'px';
  popup.style.top  = y + 'px';
}

function closePopup() {
  document.getElementById('block-popup').classList.add('hidden');
}

document.addEventListener('click', e => {
  if (!e.target.closest('#block-popup') && !e.target.closest('.evt-block')) {
    closePopup();
  }
});

/* ════════════════════════════════════════
   ADD RESERVATION PANEL
════════════════════════════════════════ */
function buildRoomSelect(selId, selectedRoomId) {
  const rooms = getRoomList();
  const buildings = [...new Set(rooms.map(r => r.building))];
  let html = '<option value="">— select room —</option>';
  buildings.forEach(bldg => {
    html += `<optgroup label="${esc(bldg)}">`;
    rooms.filter(r => r.building === bldg).forEach(r => {
      html += `<option value="${esc(r.id)}"${r.id===selectedRoomId?' selected':''}>${esc(r.name)} (cap: ${r.cap})</option>`;
    });
    html += '</optgroup>';
  });
  document.getElementById(selId).innerHTML = html;
}

/* ── Event-link search ── */
function filterEvSearch(q) {
  const dd  = document.getElementById('rsv-ev-dropdown');
  const evIdx = getEventIndex();
  const lq  = (q || '').toLowerCase().trim();
  const matches = lq
    ? evIdx.filter(ev => ev.subject.toLowerCase().includes(lq)).slice(0, 40)
    : evIdx.slice(0, 40);
  if (!matches.length) {
    dd.innerHTML = `<div style="padding:10px 12px;font-size:.75rem;color:var(--sub);">${
      evIdx.length ? 'No events match' : 'No calendar loaded — open Ministry Admin first'
    }</div>`;
  } else {
    dd.innerHTML = matches.map(ev =>
      `<div class="ev-drop-item" onmousedown="selectEvLink('${esc(ev.subject).replace(/'/g,"\\'")}','${esc(ev.dateStr||'').replace(/'/g,"\\'")}')">
        <strong>${esc(ev.subject)}</strong>${ev.dateStr?`<span>${esc(ev.dateStr)}</span>`:''}
      </div>`
    ).join('');
  }
  dd.style.display = 'block';
}
function closeEvDropdown() {
  const dd = document.getElementById('rsv-ev-dropdown');
  if (dd) dd.style.display = 'none';
}
function selectEvLink(subject, dateStr) {
  document.getElementById('rsv-ev-search').value = subject + (dateStr ? ' — ' + dateStr : '');
  document.getElementById('rsv-ev-link').value   = subject;
  closeEvDropdown();
  rsvEvLinkChange(subject);
}

function openAddPanel(rsvId) {
  _editingRsvId = rsvId || null;
  buildRoomSelect('rsv-room', null);

  // Clear event search
  document.getElementById('rsv-ev-search').value = '';
  document.getElementById('rsv-ev-link').value   = '';
  closeEvDropdown();

  // Default date to current view date
  document.getElementById('rsv-date').value = toISODate(_currentDate);
  document.getElementById('rsv-start').value = '09:00';
  document.getElementById('rsv-end').value   = '11:00';
  document.getElementById('rsv-subject').value = '';
  document.getElementById('rsv-ministry').value = '';

  if (rsvId) {
    const rsvs = getRoomReservations();
    const rsv = rsvs.find(r => r.id === rsvId);
    if (rsv) {
      document.getElementById('rsv-room').value     = rsv.roomId;
      document.getElementById('rsv-subject').value  = rsv.subject;
      document.getElementById('rsv-ministry').value = rsv.ministry || '';
      document.getElementById('rsv-date').value     = rsv.date;
      document.getElementById('rsv-start').value    = rsv.startTime;
      document.getElementById('rsv-end').value      = rsv.endTime;
      if (rsv.linkedEventSubject) {
        const evIdx = getEventIndex();
        const ev = evIdx.find(e => e.subject === rsv.linkedEventSubject);
        document.getElementById('rsv-ev-search').value = rsv.linkedEventSubject + (ev?.dateStr ? ' — ' + ev.dateStr : '');
        document.getElementById('rsv-ev-link').value   = rsv.linkedEventSubject;
      }
    }
  }

  document.getElementById('rsv-overlay').classList.add('open');
  document.getElementById('rsv-panel').classList.add('open');
}

function openAddPanelForEvent(subject) {
  openAddPanel(); // clears form, opens panel
  const evIdx = getEventIndex();
  const ev = evIdx.find(e => e.subject === subject);
  if (!ev) return;
  // Pre-populate the event link search field
  document.getElementById('rsv-ev-search').value = subject + (ev.dateStr ? ' — ' + ev.dateStr : '');
  document.getElementById('rsv-ev-link').value   = subject;
  // Fill in the rest of the fields
  rsvEvLinkChange(subject);
}

function closeAddPanel() {
  document.getElementById('rsv-overlay').classList.remove('open');
  document.getElementById('rsv-panel').classList.remove('open');
  _editingRsvId = null;
}

function rsvEvLinkChange(subject) {
  if (!subject) return;
  const evIdx = getEventIndex();
  const ev = evIdx.find(e => e.subject === subject);
  if (!ev) return;
  document.getElementById('rsv-subject').value  = ev.subject;
  document.getElementById('rsv-ministry').value = ev.category || '';
  if (ev.date) document.getElementById('rsv-date').value  = ev.date;
  if (ev.startTime) document.getElementById('rsv-start').value = ev.startTime;
  if (ev.endTime)   document.getElementById('rsv-end').value   = ev.endTime;
}

function saveReservation() {
  const roomId  = document.getElementById('rsv-room').value;
  const subject = document.getElementById('rsv-subject').value.trim();
  const date    = document.getElementById('rsv-date').value;
  const start   = document.getElementById('rsv-start').value;
  const end     = document.getElementById('rsv-end').value;

  if (!roomId)  { alert('Please select a room.'); return; }
  if (!subject) { alert('Please enter an event name.'); return; }
  if (!date)    { alert('Please select a date.'); return; }
  if (!start || !end) { alert('Please enter start and end times.'); return; }
  if (start >= end)   { alert('End time must be after start time.'); return; }

  const evLink = document.getElementById('rsv-ev-link').value;
  const evIdx  = getEventIndex();
  const ev     = evLink ? evIdx.find(e => e.subject === evLink) : null;

  const rsv = {
    id: _editingRsvId || ('rsv-' + Date.now()),
    roomId,
    subject,
    ministry: document.getElementById('rsv-ministry').value,
    date,
    startTime: start,
    endTime:   end,
    linkedEventSubject: ev ? ev.subject : '',
    linkedEventId: ev ? (ev.id || '') : '',
  };

  // Link to a matching pending event request (same name + date)
  try {
    const pendingReqs = JSON.parse(localStorage.getItem('wm_eventRequests') || '[]');
    const matchedReq = pendingReqs.find(r =>
      r.status === 'pending' && r.date === rsv.date &&
      r.name && rsv.subject &&
      r.name.trim().toLowerCase() === rsv.subject.trim().toLowerCase()
    );
    if (matchedReq) rsv.linkedRequestId = matchedReq.requestId;
  } catch(e) {}

  let rsvs = getRoomReservations();
  if (_editingRsvId) {
    rsvs = rsvs.map(r => r.id === _editingRsvId ? rsv : r);
  } else {
    rsvs.push(rsv);
  }
  saveRoomReservations(rsvs);

  closeAddPanel();

  // Update view date if saved for a different date
  const [y,m,d] = date.split('-').map(Number);
  _currentDate = new Date(y, m-1, d);
  updateHeader();
  buildGantt();
}

/* ════════════════════════════════════════
   EDIT ROOMS MODAL
════════════════════════════════════════ */
function openRoomsModal() {
  renderRoomsModal();
  document.getElementById('rooms-modal').classList.remove('hidden');
}

function closeRoomsModal() {
  document.getElementById('rooms-modal').classList.add('hidden');
  buildGantt(); // re-render in case rooms changed
}

function renderRoomsModal() {
  const rooms = getRoomList();
  let html = `
    <div style="font-size:.75rem;color:var(--sub);margin-bottom:10px;">
      ${rooms.length} room${rooms.length !== 1 ? 's' : ''} configured
    </div>
    <div>`;
  rooms.forEach(r => {
    html += `<div class="room-edit-row">
      <div class="room-edit-name">${esc(r.name)}</div>
      <div class="room-edit-bldg">${esc(r.building)}</div>
      <div class="room-edit-type">${esc(r.type)}</div>
      <div class="room-edit-cap">👥 ${r.cap}</div>
      <button class="room-del-btn" onclick="removeRoom('${esc(r.id)}')" title="Remove room">✕</button>
    </div>`;
  });
  html += `</div>
    <!-- Add room form -->
    <div class="add-room-form" style="margin-top:14px;padding-top:14px;border-top:2px solid var(--border);">
      <div>
        <label>Room Name</label>
        <input class="form-inp" id="new-room-name" type="text" placeholder="e.g. East Tower 300">
      </div>
      <div>
        <label>Building</label>
        <select class="form-sel" id="new-room-bldg">
          <option>East Tower</option>
          <option>West Tower</option>
          <option>Kids Building</option>
          <option>Town Center</option>
        </select>
      </div>
      <div>
        <label>Type</label>
        <select class="form-sel" id="new-room-type">
          <option>Assembly</option>
          <option>Classroom</option>
          <option>Sanctuary</option>
          <option>Common</option>
          <option>Gym</option>
          <option>Kids</option>
          <option>Conf Room</option>
          <option>Outdoor</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label>Cap.</label>
        <input class="form-inp" id="new-room-cap" type="number" placeholder="40" min="1">
      </div>
      <div style="padding-top:18px;">
        <button class="btn pri" onclick="addRoomFromModal()" style="white-space:nowrap;">＋ Add</button>
      </div>
    </div>`;
  document.getElementById('rooms-modal-body').innerHTML = html;
}

function addRoomFromModal() {
  const name  = document.getElementById('new-room-name').value.trim();
  const bldg  = document.getElementById('new-room-bldg').value;
  const type  = document.getElementById('new-room-type').value;
  const cap   = parseInt(document.getElementById('new-room-cap').value) || 0;
  if (!name) { alert('Please enter a room name.'); return; }

  const id = 'r-' + Date.now();
  const rooms = getRoomList();
  rooms.push({id, name, type, cap, building: bldg});
  saveRoomList(rooms);
  renderRoomsModal();
}

function removeRoom(id) {
  if (!confirm('Remove this room?')) return;
  const rooms = getRoomList().filter(r => r.id !== id);
  saveRoomList(rooms);
  renderRoomsModal();
}

function resetRooms() {
  if (!confirm('Reset to default room list? All custom rooms will be removed.')) return;
  localStorage.removeItem('roomList');
  renderRoomsModal();
}

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════
   SEED RESERVATIONS FROM CSV (runs once on first load)
   Generates room bookings from calendar event locations.
   Skipped if roomReservations already exist in localStorage.
═══════════════════════════════════════════════════ */
function seedReservationsFromCSV() {
  // ── Ensure Frontlines room exists even if user has a saved roomList ──────
  try {
    const raw = localStorage.getItem('roomList');
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && !list.find(r => r.id === 'tc-frontlines')) {
        const idx = list.findIndex(r => r.id === 'tc-bunker');
        list.splice(idx + 1, 0, {id:'tc-frontlines', name:'Frontlines', type:'Assembly', cap:200, building:'Town Center'});
        saveRoomList(list);
      }
    }
  } catch(e) {}

  // ── Only seed reservations if localStorage is empty ──────────────────────
  if (localStorage.getItem('roomReservations')) return;

  // Use pre-generated seed data from room-seed.js (loaded before this script)
  if (typeof ROOM_SEED_RESERVATIONS !== 'undefined' && ROOM_SEED_RESERVATIONS.length) {
    saveRoomReservations(ROOM_SEED_RESERVATIONS);
  }
}

function init() {
  seedReservationsFromCSV();
  initTheme();
  updateHeader();
  buildGantt();

  // Update now-line every minute
  setInterval(() => {
    const outer = document.getElementById('gantt-outer');
    outer.querySelectorAll('.now-line').forEach(nl => {
      const now = new Date();
      nl.style.left = (now.getHours() * 60 + now.getMinutes()) + 'px';
    });
  }, 60000);

  // Auto-open reservation panel if navigated here from Calendar with an event pending
  const _pending = localStorage.getItem('pendingRoomAssignment');
  if (_pending) {
    localStorage.removeItem('pendingRoomAssignment');
    try {
      const { subject, date } = JSON.parse(_pending);
      if (date) {
        const parts = date.split('-');
        _currentDate = new Date(+parts[0], +parts[1]-1, +parts[2]);
        updateHeader();
        buildGantt();
      }
      setTimeout(() => openAddPanelForEvent(subject), 50);
    } catch(e) {}
  }

  // Navigate to a date and highlight the block if coming from "View Reservation" in Calendar
  const _pendingView = localStorage.getItem('pendingViewReservation');
  if (_pendingView) {
    localStorage.removeItem('pendingViewReservation');
    try {
      const { subject, date } = JSON.parse(_pendingView);
      if (date) {
        const parts = date.split('-');
        _currentDate = new Date(+parts[0], +parts[1]-1, +parts[2]);
        updateHeader();
        buildGantt();
      }
      setTimeout(() => {
        let found = null;
        document.querySelectorAll('.evt-block').forEach(el => {
          const b = _blocks[parseInt(el.dataset.bidx)];
          if (b && b.subject === subject && !found) {
            found = el;
            el.classList.add('highlight-block');
          }
        });
        if (found) found.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        setTimeout(() => {
          document.querySelectorAll('.highlight-block').forEach(el => el.classList.remove('highlight-block'));
        }, 3000);
      }, 100);
    } catch(e) {}
  }
}

function openInCalendar(eventId, subject) {
  localStorage.setItem('pendingCalendarEvent', JSON.stringify({ eventId, subject }));
  window.location.href = 'index.html';
}

function openBudgetFromRoom(subject) {
  localStorage.setItem('pendingBudgetEvent', JSON.stringify({ subject }));
  window.location.href = 'budget.html';
}

/* ── Pending event requests banner ── */
function renderPendingRoomsBanner() {
  const banner = document.getElementById('pending-rooms-banner');
  if (!banner) return;
  const pending = JSON.parse(localStorage.getItem('wm_pendingRooms') || '[]');
  if (pending.length === 0) { banner.style.display = 'none'; return; }

  const items = pending.map(r => {
    const timeRange = [r.startTime, r.endTime].filter(Boolean).join(' – ');
    return `<span class="pending-room-item">
      <strong>${r.name || 'Untitled'}</strong> · ${r.date || ''}${timeRange ? ' ' + timeRange : ''}${r.location ? ' · ' + r.location : ''}
      <a href="event-request.html?view=approvals" class="pending-room-link">Review →</a>
    </span>`;
  }).join('');

  banner.style.display = '';
  banner.innerHTML = `
    <div class="pending-rooms-banner-inner">
      <span class="pending-rooms-icon">⏳</span>
      <span class="pending-rooms-label">${pending.length} event request${pending.length > 1 ? 's' : ''} pending approval with room reservations:</span>
      <div class="pending-rooms-list">${items}</div>
    </div>
  `;
}

init();
renderPendingRoomsBanner();
