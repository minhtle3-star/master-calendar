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

const WEEKDAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS     = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* CATEGORY_MAP — built from CATEGORIES, used as the admin selector */
const CATEGORY_ICONS = {
  'Sunday Services':       '\u{26EA}',
  'Kids Team':             '\u{1F9D2}',
  'Ministry Programs':     '\u{1F4CB}',
  'Equipping Team':        '\u{1F91D}',
  'Care Team':             '\u{1F49C}',
  'Special Events':        '\u{2B50}',
  'Leadership Team':       '\u{1F4C1}',
  'Missions & Outreach': '\u{1F30D}',
  'Students & College':    '\u{1F393}',
  'Operations Team':       '\u{2699}',
  'Marriage Team':         '\u{1F48D}',
  'Young Adults':          '\u{1F525}',
  'Institute Team':        '\u{1F3DB}',
  'Community & Connecting': '\u{1F517}',
  'Watermark en Espanol':  '\u{1F1EA}\u{1F1F8}',
  'Health & CDC':          '\u{1FA7A}',
  'Family Team':           '\u{1F46A}',
  'Other':                 '\u{1F4CC}',
};
const CATEGORY_MAP = {};
for (const [name, cfg] of Object.entries(CATEGORIES)) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
  CATEGORY_MAP[slug] = { name, key: name, color: cfg.color, icon: CATEGORY_ICONS[name] || '\u{1F4CC}' };
}
/* "Other" category for events not matching any pattern */
CATEGORY_MAP['other'] = { name: 'Other', key: 'Other', color: '#6B7880', icon: '\u{1F4CC}' };

const FORM_SECTIONS = [
  { id: 'basics',       title: 'Event Basics' },
  { id: 'it-needs',     title: 'IT Needs' },
  { id: 'facility',     title: 'Facility Needs' },
  { id: 'kids',         title: 'Kids Ministry' },
  { id: 'worship',      title: 'Worship' },
  { id: 'production',   title: 'Production' },
  { id: 'checkin',      title: 'Check-in' },
  { id: 'security',     title: 'Security' },
  { id: 'comms',        title: 'Communications' },
  { id: 'rooms',        title: 'Room Reservations' },
  { id: 'room-config',  title: 'Room Configurations' },
  { id: 'attendance',   title: 'Attendance' },
  { id: 'financial',    title: 'Financial' },
  { id: 'registration', title: 'Registration Type' },
];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let allEvents       = [];
let categoryEvents  = [];
let filteredEvents  = [];
let currentCategory = null;
let currentView     = 'dashboard';
let chartInstances = {};
let activeFilters  = { search:'', departments: new Set(), statuses: new Set(), from: null, to: null };
let generatedTasks = [];
let tasksTimeWindow = 14;
let miniCalYear = null, miniCalMonth = null;
let weekCalOffset       = 0;       // weeks offset from current week (0 = this week)
let todoFilter          = 'all';   // 'all' | 'this-week' | 'upcoming' | 'overdue' | 'no-date'
let todoSort            = 'created'; // 'created' | 'due' | 'ministry'
let todoMinistryFilter  = '';      // '' = all ministries
let tasksSubView        = 'todos'; // 'todos' | 'by-event'
let expandedTodos       = new Set(); // ids of expanded todo items
let currentTaskDetailId  = null;    // id of task currently open in detail panel
let completedSectionOpen = false;   // whether completed tasks section is expanded
let pendingComplete      = null;    // sid of task awaiting completion confirmation
let roomEntries    = [{ building:'', roomIds:[], date:'', startTime:'', endTime:'', repeat:'none', repeatUntil:'' }];
let eventsViewMonth  = new Date(); // month shown in events mini-calendar
let eventsViewDay    = null;       // null = show full month; Date = specific day
let selectedEvCardId = null;       // event card currently open in detail panel

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

/* ---- Budget Estimates Persistence ---- */
function getEventBudgets() {
  try { return JSON.parse(localStorage.getItem('eventBudgets') || '{}'); } catch { return {}; }
}

/* ---- Room Reservations Persistence ---- */
function getRoomReservations() {
  try { return JSON.parse(localStorage.getItem('roomReservations') || '[]'); } catch { return []; }
}
function saveRoomReservations(rsvs) {
  localStorage.setItem('roomReservations', JSON.stringify(rsvs));
}
function getRoomList() {
  const DEFAULT_ROOMS = [
    // East Tower — Floor 1
    {id:'et-1a',name:'East Tower 1A',building:'East Tower'},{id:'et-1b',name:'East Tower 1B',building:'East Tower'},
    {id:'et-101',name:'East Tower 101',building:'East Tower'},
    // East Tower — Floor 2
    {id:'et-2a',name:'East Tower 2A',building:'East Tower'},{id:'et-2b',name:'East Tower 2B',building:'East Tower'},
    {id:'et-201',name:'East Tower 201',building:'East Tower'},{id:'et-202',name:'East Tower 202',building:'East Tower'},
    {id:'et-203',name:'East Tower 203',building:'East Tower'},{id:'et-204',name:'East Tower 204',building:'East Tower'},
    {id:'et-205ab',name:'East Tower 205AB',building:'East Tower'},{id:'et-206ab',name:'East Tower 206AB',building:'East Tower'},
    {id:'et-207ab',name:'East Tower 207AB',building:'East Tower'},{id:'et-208ab',name:'East Tower 208AB',building:'East Tower'},
    {id:'et-2lobby',name:'East Tower 2 Lobby',building:'East Tower'},
    // East Tower — Floor 3
    {id:'et-3west',name:'ET 3 Assembly West',building:'East Tower'},
    {id:'et-303',name:'ET 303',building:'East Tower'},{id:'et-304',name:'ET 304',building:'East Tower'},
    {id:'et-305',name:'ET 305',building:'East Tower'},{id:'et-306',name:'ET 306',building:'East Tower'},
    {id:'et-307ab',name:'ET 307AB',building:'East Tower'},
    {id:'et-312',name:'ET 312',building:'East Tower'},{id:'et-313',name:'ET 313',building:'East Tower'},
    {id:'et-314',name:'ET 314',building:'East Tower'},{id:'et-315',name:'ET 315',building:'East Tower'},
    {id:'et-316',name:'ET 316',building:'East Tower'},{id:'et-317',name:'ET 317',building:'East Tower'},
    {id:'et-318',name:'ET 318',building:'East Tower'},{id:'et-319',name:'ET 319',building:'East Tower'},
    {id:'et-3lobby',name:'ET 3 Lobby/Kitchen',building:'East Tower'},
    // West Tower — Floor 1
    {id:'wt-120',name:'West Tower 120',building:'West Tower'},{id:'wt-121',name:'West Tower 121',building:'West Tower'},
    {id:'wt-122',name:'West Tower 122',building:'West Tower'},{id:'wt-125',name:'West Tower 125',building:'West Tower'},
    {id:'wt-126',name:'West Tower 126',building:'West Tower'},
    // West Tower — Floor 2
    {id:'wt-2n',name:'2 North',building:'West Tower'},
    {id:'wt-204205',name:'West Tower 204/205',building:'West Tower'},{id:'wt-206ab',name:'West Tower 206AB',building:'West Tower'},
    {id:'wt-207ab',name:'West Tower 207AB',building:'West Tower'},{id:'wt-208ab',name:'West Tower 208AB',building:'West Tower'},
    {id:'wt-209210',name:'West Tower 209/210',building:'West Tower'},{id:'wt-211ab',name:'West Tower 211AB',building:'West Tower'},
    {id:'wt-212',name:'West Tower 212',building:'West Tower'},{id:'wt-2lobby',name:'WT 2 Lobby',building:'West Tower'},
    // West Tower — Floor 3
    {id:'wt-3n',name:'3 North',building:'West Tower'},{id:'wt-3s',name:'3 South',building:'West Tower'},
    {id:'wt-306ab',name:'West Tower 306AB',building:'West Tower'},{id:'wt-307308',name:'West Tower 307/308',building:'West Tower'},
    {id:'wt-309ab',name:'West Tower 309AB',building:'West Tower'},{id:'wt-310311',name:'West Tower 310/311',building:'West Tower'},
    {id:'wt-312ab',name:'West Tower 312AB',building:'West Tower'},{id:'wt-313ab',name:'West Tower 313AB',building:'West Tower'},
    {id:'wt-3lobby',name:'WT 3 Lobby',building:'West Tower'},
    // West Tower — Floor 4
    {id:'wt-4n',name:'4 North',building:'West Tower'},
    {id:'wt-421ab',name:'West Tower 421AB',building:'West Tower'},{id:'wt-422ab',name:'West Tower 422AB',building:'West Tower'},
    {id:'wt-423ab',name:'West Tower 423AB',building:'West Tower'},{id:'wt-425ab',name:'West Tower 425AB',building:'West Tower'},
    {id:'wt-426ab',name:'West Tower 426AB',building:'West Tower'},{id:'wt-432ab',name:'West Tower 432AB',building:'West Tower'},
    {id:'wt-428',name:'West Tower 428',building:'West Tower'},{id:'wt-429',name:'West Tower 429',building:'West Tower'},
    {id:'wt-441',name:'West Tower 441',building:'West Tower'},{id:'wt-445',name:'West Tower 445',building:'West Tower'},
    {id:'wt-4lobby',name:'WT 4 Lobby',building:'West Tower'},
    // West Tower — Floor 5
    {id:'wt-5s',name:'5 South',building:'West Tower'},{id:'wt-5view',name:'5 - View',building:'West Tower'},
    {id:'wt-5huddle',name:'5 - Huddle',building:'West Tower'},{id:'wt-5cont',name:'5 - Container',building:'West Tower'},
    {id:'wt-5lobby',name:'WT 5 Lobby',building:'West Tower'},
    // West Tower — Floors 6–8
    {id:'wt-601',name:'6th South War Room (601)',building:'West Tower'},{id:'wt-602',name:'6th North War Room (602)',building:'West Tower'},
    {id:'wt-7central',name:'7th Central Conference',building:'West Tower'},{id:'wt-7fish',name:'7th Fishbowl Conference',building:'West Tower'},
    {id:'wt-7nw',name:'7th NW Conference',building:'West Tower'},{id:'wt-8recep',name:'8th Reception Conference',building:'West Tower'},
    // East Tower — Floor 8
    {id:'et-8studio',name:'ET 8th Studio',building:'East Tower'},
    // Kids Building — Floor 1
    {id:'kb-vol1',name:'Kids 1 Volunteer Room',building:'Kids Building'},{id:'kb-gameroom',name:'Kids Gameroom',building:'Kids Building'},
    {id:'kb-blue',name:'Kids Blue',building:'Kids Building'},{id:'kb-green',name:'Kids Green',building:'Kids Building'},
    {id:'kb-orange',name:'Kids Orange',building:'Kids Building'},{id:'kb-yellow',name:'Kids Yellow',building:'Kids Building'},
    {id:'kb-red',name:'Kids Red',building:'Kids Building'},
    // Kids Building — Floor 2
    {id:'kb-stage2abc',name:'Stage 2ABC',building:'Kids Building'},
    {id:'kb-bo12',name:'Kids Breakout 1/2',building:'Kids Building'},{id:'kb-bo34',name:'Kids Breakout 3/4',building:'Kids Building'},
    {id:'kb-bo56',name:'Kids Breakout 5/6',building:'Kids Building'},{id:'kb-bo78',name:'Kids Breakout 7/8',building:'Kids Building'},
    {id:'kb-bo910',name:'Kids Breakout 9/10',building:'Kids Building'},{id:'kb-bo1112',name:'Kids Breakout 11/12',building:'Kids Building'},
    {id:'kb-bo1314',name:'Kids Breakout 13/14',building:'Kids Building'},{id:'kb-bo1516',name:'Kids Breakout 15/16',building:'Kids Building'},
    {id:'kb-bo1718',name:'Kids Breakout 17/18',building:'Kids Building'},{id:'kb-bo1920',name:'Kids Breakout 19/20',building:'Kids Building'},
    {id:'kb-bo2122',name:'Kids Breakout 21/22',building:'Kids Building'},{id:'kb-mezz',name:'Kids Mezzanine',building:'Kids Building'},
    // Town Center
    {id:'tc-loft',name:'Loft',building:'Town Center'},{id:'tc-bunker',name:'Bunker',building:'Town Center'},
    {id:'tc-aud',name:'Auditorium',building:'Town Center'},{id:'tc-chapel',name:'Chapel',building:'Town Center'},
    {id:'tc-north',name:'North Community Room',building:'Town Center'},{id:'tc-south',name:'South Community Room',building:'Town Center'},
    {id:'tc-coffee',name:'Coffee Shop/Lobby',building:'Town Center'},{id:'tc-pond',name:'Pond',building:'Town Center'},
  ];
  try { const r = JSON.parse(localStorage.getItem('roomList')||'[]'); if (r.length) return r; } catch {}
  return DEFAULT_ROOMS;
}

function parseDetails(text) {
  const depts = {}; DEPT_NAMES.forEach(d => depts[d] = 'N/A');
  const extra = []; if (!text) return { depts, extra:'' };
  const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
  for (const line of lines) {
    let matched = false;
    for (const dept of DEPT_NAMES) {
      const m = line.match(new RegExp(`^${dept}\\s*[-\u2013]\\s*(.+)`,'i'));
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

function statusCls(s)   { return s==='Green'?'green':s==='Blue'?'blue':s==='Black'?'black':s==='Double Black'?'double-black':'na'; }

/* ═══════════════════════════════════════════════════
   LOAD CSV
═══════════════════════════════════════════════════ */
function computeSeriesInfo(events) {
  for (const ev of events) { ev.seriesIndex = undefined; ev.seriesTotal = undefined; }
  const subjectMap = {};
  for (const ev of events) { if (!subjectMap[ev.subject]) subjectMap[ev.subject]=[]; subjectMap[ev.subject].push(ev); }
  for (const evs of Object.values(subjectMap)) {
    if (evs.length < 2) continue;
    // Group by day of week
    const dowGroups = {};
    for (const ev of evs) { const d=ev.date.getDay(); if (!dowGroups[d]) dowGroups[d]=[]; dowGroups[d].push(ev); }
    for (const dowEvs of Object.values(dowGroups)) {
      if (dowEvs.length < 2) continue;
      // Gaps in days between consecutive same-DOW occurrences
      const gaps = [];
      for (let i=1; i<dowEvs.length; i++) gaps.push((dowEvs[i].date - dowEvs[i-1].date)/86400000);
      // Typical interval = median gap
      const sorted = [...gaps].sort((a,b)=>a-b);
      const typicalGap = sorted[Math.floor(sorted.length/2)];
      // A break is > 2× typical interval (min 56 days / 8 weeks)
      const breakThreshold = Math.max(typicalGap * 2, 56);
      // Split into consecutive runs
      let runStart = 0;
      for (let i=1; i<=dowEvs.length; i++) {
        if (i===dowEvs.length || gaps[i-1] > breakThreshold) {
          const run = dowEvs.slice(runStart, i);
          if (run.length >= 2) run.forEach((ev,idx) => { ev.seriesIndex=idx+1; ev.seriesTotal=run.length; });
          runStart = i;
        }
      }
    }
  }
}

async function loadCSV() {
  const resp = await fetch('calendar.csv');
  const text = await resp.text();
  Papa.parse(text, {
    header: true, skipEmptyLines: true,
    complete(results) {
      allEvents = results.data.map((row,i) => {
        const date = parseDate(row['Start Date']); if (!date) return null;
        const { depts, extra } = parseDetails(row['Details']);
        let loc = (row['Location']||'').trim();
        if (!loc && extra) { const fl=extra.split('|')[0].trim(); if (fl && !DEPT_NAMES.some(d=>fl.includes(d))) loc=fl; }
        const subj = row['Subject']||'';
        return { id:i, subject:subj, date, startTime:row['Start Time']||'', endTime:row['End Time']||'', allDay:row['All Day Event']==='True', location:loc, depts, category:getEffectiveCategory(subj), secondaryCategory:getSecondaryCategory(subj) };
      }).filter(Boolean).sort((a,b)=>a.date-b.date);
      computeSeriesInfo(allEvents);
      // Save event index for cross-page linking (Budget Planner, Room Planner)
      localStorage.setItem('eventIndex', JSON.stringify(
        allEvents.map(ev => ({
          subject: ev.subject,
          category: ev.category,
          dateStr: ev.date.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}),
          date: ev.date.toISOString().split('T')[0],
          startTime: ev.startTime,
          endTime: ev.endTime,
          location: ev.location,
          allDay: ev.allDay,
          id: ev.id,
        }))
      ));
      initCategory();
    },
    error() {
      document.getElementById('loading').innerHTML = '<p style="color:#dc2626;text-align:center;padding:40px;">Failed to load calendar.csv. Make sure it is in the same folder as admin.html.</p>';
    }
  });
}

/* ═══════════════════════════════════════════════════
   MINISTRY INITIALIZATION
═══════════════════════════════════════════════════ */
function initCategory() {
  /* Populate the header category dropdown dynamically */
  const dd = document.getElementById('category-dropdown');
  dd.innerHTML = '<option value="">Select Category</option>';
  for (const [slug, cat] of Object.entries(CATEGORY_MAP)) {
    const count = allEvents.filter(ev => ev.category === cat.key).length;
    if (count === 0) continue;
    dd.insertAdjacentHTML('beforeend', `<option value="${slug}">${esc(cat.name)}</option>`);
  }
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('category') || params.get('ministry'); /* backwards compat */
  if (slug && CATEGORY_MAP[slug]) {
    selectCategory(slug);
    // If navigated here from Calendar, open the specific event
    const _pendingAdmin = localStorage.getItem('pendingAdminEvent');
    if (_pendingAdmin) {
      localStorage.removeItem('pendingAdminEvent');
      try {
        const { subject } = JSON.parse(_pendingAdmin);
        const targetEv = allEvents.find(e => e.subject === subject);
        if (targetEv) setTimeout(() => { setView('events'); openEvDetail(targetEv.id); }, 100);
      } catch(e) {}
    }
  } else {
    showCategorySelector();
  }
}

function selectCategory(slug) {
  currentCategory = slug;
  miniCalYear = null; miniCalMonth = null; weekCalOffset = 0; // reset to today on ministry change
  const cat = CATEGORY_MAP[slug];
  document.getElementById('category-dropdown').value = slug;
  categoryEvents = allEvents.filter(ev => ev.category === cat.key || ev.secondaryCategory === cat.key);
  const url = new URL(window.location);
  url.searchParams.set('category', slug);
  history.replaceState({}, '', url);
  buildDeptFilters();
  buildStatusFilters();
  generateTasks();
  applyFilters();
  document.getElementById('category-select-view').style.display = 'none';
  document.getElementById('admin-sidebar').style.display = '';
  document.getElementById('loading').style.display = 'none';
  renderCurrentView();
}

function showCategorySelector() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('admin-sidebar').style.display = 'none';
  document.getElementById('category-select-view').style.display = 'block';
  let html = '<div class="ministry-welcome"><h2>Select a Ministry</h2><p>Choose a ministry below to view its dashboard, events, and insights.</p></div>';
  html += '<div class="ministry-grid" id="category-grid">';
  for (const [slug, cat] of Object.entries(CATEGORY_MAP)) {
    const count = allEvents.filter(ev => ev.category === cat.key || ev.secondaryCategory === cat.key).length;
    if (count === 0) continue; /* skip empty categories */
    html += `<div class="ministry-card" style="border-top-color:${cat.color}" onclick="selectCategory('${slug}')">
      <div class="mc-icon">${cat.icon}</div>
      <h3>${esc(cat.name)}</h3>
      <div class="mc-count">${count.toLocaleString()}</div>
      <div class="mc-sub">total events</div>
    </div>`;
  }
  html += '</div>';
  document.getElementById('category-select-view').innerHTML = html;
}

function onCategoryDropdown(val) {
  if (val && CATEGORY_MAP[val]) selectCategory(val);
}

/* ═══════════════════════════════════════════════════
   TASK GENERATION
═══════════════════════════════════════════════════ */
function generateTasks() {
  generatedTasks = [];
  if (!currentCategory) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const in7 = new Date(today); in7.setDate(in7.getDate() + 7);
  const in30 = new Date(today); in30.setDate(in30.getDate() + 30);

  for (const ev of categoryEvents) {
    /* Check all departments for Black/Blue statuses */
    for (const dept of DEPT_NAMES) {
      const status = ev.depts[dept];
      if (status === 'Black' || status === 'Double Black') {
        generatedTasks.push({ eventId: ev.id, eventName: ev.subject, eventDate: ev.date, type: 'urgent', priority: 1, label: status === 'Double Black' ? 'Critical — Double Black' : 'Needs Immediate Attention', description: `${dept} status is ${status} for "${ev.subject}" on ${fmtDateFull(ev.date)}.` });
      }
      if (status === 'Blue') {
        generatedTasks.push({ eventId: ev.id, eventName: ev.subject, eventDate: ev.date, type: 'pending', priority: 2, label: 'In Progress \u2014 Follow Up', description: `${dept} status is Blue for "${ev.subject}" on ${fmtDateFull(ev.date)}.` });
      }
    }
    if (ev.date >= today && ev.date <= in7) {
      generatedTasks.push({ eventId: ev.id, eventName: ev.subject, eventDate: ev.date, type: 'upcoming', priority: 3, label: 'Upcoming This Week', description: `"${ev.subject}" is on ${fmtDateFull(ev.date)}. Review preparations.` });
    }
  }
  generatedTasks.sort((a,b) => a.priority !== b.priority ? a.priority - b.priority : a.eventDate - b.eventDate);
}

/* ═══════════════════════════════════════════════════
   FILTER UI & LOGIC
═══════════════════════════════════════════════════ */
function buildDeptFilters() {
  /* Build department filters — show which departments are involved in this category's events */
  const depts = new Set();
  for (const ev of categoryEvents) {
    for (const dept of DEPT_NAMES) {
      if (ev.depts[dept] !== 'N/A') depts.add(dept);
    }
  }
  const el = document.getElementById('dept-filters'); el.innerHTML = '';
  activeFilters.departments = new Set();
  for (const dept of DEPT_NAMES) {
    if (!depts.has(dept)) continue;
    const id = 'dept-'+dept.replace(/\s/g,'-');
    el.insertAdjacentHTML('beforeend',
      `<label class="cb-item" for="${id}"><input type="checkbox" id="${id}" value="${esc(dept)}" checked onchange="onDeptChange(this)"/><span>${esc(dept)}</span></label>`);
    activeFilters.departments.add(dept);
  }
}
function buildStatusFilters() {
  const el = document.getElementById('status-filters'); el.innerHTML = '';
  activeFilters.statuses = new Set();
  for (const {label,val} of [{label:'Green',val:'Green'},{label:'Blue',val:'Blue'},{label:'Black',val:'Black'},{label:'Double Black',val:'Double Black'}]) {
    const id='st-'+val;
    el.insertAdjacentHTML('beforeend',
      `<label class="cb-item" for="${id}"><input type="checkbox" id="${id}" value="${val}" onchange="onStatusChange(this)"/><span>${label}</span></label>`);
  }
}

function applyFilters() {
  if (!currentCategory) {
    // No ministry selected — apply only search and date filters across all events
    const {search, from, to} = activeFilters;
    filteredEvents = allEvents.filter(ev => {
      if (search && !ev.subject.toLowerCase().includes(search)) return false;
      if (from && ev.date < from) return false;
      if (to && ev.date > to) return false;
      return true;
    });
    return;
  }
  const {search,departments,statuses,from,to} = activeFilters;
  filteredEvents = categoryEvents.filter(ev => {
    if (search && !ev.subject.toLowerCase().includes(search)) return false;
    if (from && ev.date < from) return false;
    if (to && ev.date > to) return false;
    /* Department filter — event must involve at least one checked department */
    if (departments && departments.size > 0) {
      const involved = DEPT_NAMES.some(d => departments.has(d) && ev.depts[d] !== 'N/A');
      if (!involved) return false;
    }
    /* Status filter — event must have at least one department matching the checked status */
    if (statuses.size > 0) {
      const hasStatus = DEPT_NAMES.some(d => statuses.has(ev.depts[d]));
      if (!hasStatus) return false;
    }
    return true;
  });
  document.getElementById('event-count').textContent = filteredEvents.length.toLocaleString() + ' event' + (filteredEvents.length!==1?'s':'');
}

document.getElementById('search-input').addEventListener('input', e => { activeFilters.search = e.target.value.toLowerCase().trim(); applyFilters(); renderCurrentView(); });
document.getElementById('filter-from').addEventListener('change', e => { activeFilters.from = e.target.value ? new Date(e.target.value+'T00:00:00') : null; applyFilters(); renderCurrentView(); });
document.getElementById('filter-to').addEventListener('change', e => { activeFilters.to = e.target.value ? new Date(e.target.value+'T23:59:59') : null; applyFilters(); renderCurrentView(); });
function onDeptChange(cb) { if (cb.checked) activeFilters.departments.add(cb.value); else activeFilters.departments.delete(cb.value); applyFilters(); renderCurrentView(); }
function onStatusChange(cb) { if (cb.checked) activeFilters.statuses.add(cb.value); else activeFilters.statuses.delete(cb.value); applyFilters(); renderCurrentView(); }
function resetFilters() {
  activeFilters = { search:'', departments: new Set(), statuses: new Set(), from:null, to:null };
  document.getElementById('search-input').value = '';
  document.getElementById('filter-from').value  = '';
  document.getElementById('filter-to').value    = '';
  document.querySelectorAll('#dept-filters input').forEach(cb => { cb.checked=true; activeFilters.departments.add(cb.value); });
  document.querySelectorAll('#status-filters input').forEach(cb => { cb.checked=false; });
  applyFilters(); renderCurrentView();
}

/* ═══════════════════════════════════════════════════
   VIEW CONTROL
═══════════════════════════════════════════════════ */

function setView(v) {
  currentView = v;
  ['dashboard','tasks','events','request'].forEach(x => { const el = document.getElementById('btn-'+x); if (el) el.classList.toggle('active', x===v); });
  document.getElementById('admin-sidebar').style.display = (v === 'request' || v === 'tasks' || !currentCategory) ? 'none' : '';
  // Hide category selector when switching to tasks or events view
  if (v === 'tasks' || v === 'events') {
    document.getElementById('category-select-view').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
  }
  renderCurrentView();
}
function renderCurrentView() {
  ['admin-dashboard-view','admin-events-view','admin-request-view','admin-tasks-view'].forEach(id => document.getElementById(id).style.display='none');
  // Tasks view works without category selection
  if (currentView === 'tasks') {
    if (allEvents.length) { renderTasksWorkspace(); document.getElementById('admin-tasks-view').style.display = 'block'; }
    return;
  }
  if (!currentCategory) {
    // Events tab works without a category — show all events
    if (currentView === 'events') {
      applyFilters();
      renderEvents();
      document.getElementById('admin-events-view').style.display = 'block';
    }
    return;
  }
  if (currentView==='dashboard') { renderDashboard(); document.getElementById('admin-dashboard-view').style.display='block'; }
  else if (currentView==='events') { renderEvents(); document.getElementById('admin-events-view').style.display='block'; }
  else { renderRequestForm(); document.getElementById('admin-request-view').style.display='block'; }
}

/* ═══════════════════════════════════════════════════
   TASKS WORKSPACE (cross-category)
═══════════════════════════════════════════════════ */
function getCompletedTasks() {
  try { return JSON.parse(localStorage.getItem('completedWorkspaceTasks') || '{}'); }
  catch { return {}; }
}
function setTaskCompleted(key) {
  const c = getCompletedTasks(); c[key] = Date.now();
  localStorage.setItem('completedWorkspaceTasks', JSON.stringify(c));
}
function removeTaskCompleted(key) {
  const c = getCompletedTasks(); delete c[key];
  localStorage.setItem('completedWorkspaceTasks', JSON.stringify(c));
}

function generateWorkspaceTasks(events, today) {
  const tasks = [];
  const completed = getCompletedTasks();
  const windowEnd = new Date(today); windowEnd.setDate(windowEnd.getDate() + tasksTimeWindow);
  const RULES = [
    { minDays:0, maxDays:0, label:'Final Walkthrough', desc: ev => `Run final walkthrough for \u201C${ev.subject}\u201D happening today.`, priority:1 },
    { minDays:1, maxDays:1, label:'Confirm Volunteers', desc: ev => `Confirm all volunteers and staff for \u201C${ev.subject}\u201D tomorrow.`, priority:2 },
    { minDays:2, maxDays:3, label:'Confirm AV Setup', desc: ev => `Confirm AV and production setup for \u201C${ev.subject}\u201D on ${fmtDateFull(ev.date)}.`, priority:3 },
    { minDays:3, maxDays:5, label:'Finalize Logistics', desc: ev => `Finalize room setup and logistics for \u201C${ev.subject}\u201D on ${fmtDateFull(ev.date)}.`, priority:4 },
    { minDays:5, maxDays:7, label:'Send Reminders', desc: ev => `Send reminder emails for \u201C${ev.subject}\u201D on ${fmtDateFull(ev.date)}.`, priority:5 },
    { minDays:7, maxDays:14, label:'Review Details', desc: ev => `Review event details and update statuses for \u201C${ev.subject}\u201D on ${fmtDateFull(ev.date)}.`, priority:6 },
  ];
  for (const ev of events) {
    if (ev.date < today || ev.date > windowEnd) continue;
    const daysOut = Math.round((ev.date - today) / 86400000);
    // Status-based tasks
    for (const dept of DEPT_NAMES) {
      if (ev.depts[dept] === 'Black') {
        const key = `status-black-${ev.id}-${dept.replace(/\s/g,'')}`;
        tasks.push({ key, eventId:ev.id, event:ev, label:`Resolve ${dept}`, description:`${dept} status is Black for \u201C${ev.subject}\u201D on ${fmtDateFull(ev.date)}. Resolve immediately.`, priority:0, type:'urgent', completed:!!completed[key] });
      }
      if (ev.depts[dept] === 'Blue') {
        const key = `status-blue-${ev.id}-${dept.replace(/\s/g,'')}`;
        tasks.push({ key, eventId:ev.id, event:ev, label:`Follow Up: ${dept}`, description:`${dept} status is Blue for \u201C${ev.subject}\u201D on ${fmtDateFull(ev.date)}.`, priority:3, type:'pending', completed:!!completed[key] });
      }
    }
    // Time-based tasks
    for (let r = 0; r < RULES.length; r++) {
      const rule = RULES[r];
      if (daysOut >= rule.minDays && daysOut <= rule.maxDays) {
        const key = `ai-${ev.id}-${r}`;
        tasks.push({ key, eventId:ev.id, event:ev, label:rule.label, description:rule.desc(ev), priority:rule.priority, type:'upcoming', completed:!!completed[key] });
      }
    }
  }
  tasks.sort((a,b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.event.date - b.event.date;
  });
  return tasks;
}

function buildUpcomingPanelHTML(events, today) {
  if (!events.length) return '<p style="color:var(--sub);font-size:.83rem;">No upcoming events in this window.</p>';
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const items = events.map(ev => {
    const color = catColor(ev.category);
    const t = ev.allDay ? 'All Day' : (ev.startTime ? fmtTime(ev.startTime) : '');
    const daysOut = Math.round((ev.date - today) / 86400000);
    const daysLabel = daysOut === 0 ? 'Today' : daysOut === 1 ? 'Tomorrow' : daysOut + ' days';
    const secBadge = ev.secondaryCategory ? `<span class="cat-tag" style="background:${catColor(ev.secondaryCategory)};font-size:.5rem;opacity:.85;">+${esc(ev.secondaryCategory)}</span>` : '';
    return `<div class="up-item" style="--cat-color:${color}" onclick="openEvent(${ev.id})">
      <div class="up-date"><div class="up-mo">${MONTHS[ev.date.getMonth()]}</div><div class="up-day">${ev.date.getDate()}</div></div>
      <div style="flex:1;min-width:0;">
        <div class="up-name">${esc(ev.subject)}</div>
        <div class="up-meta">${esc(t)}${ev.location?' \u00B7 '+esc(ev.location):''}</div>
        <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;align-items:center;">
          <span class="cat-tag" style="background:${color};font-size:.5rem;">${esc(ev.category)}</span>
          ${secBadge}
          <span style="font-size:.65rem;color:var(--sub);font-weight:600;">${daysLabel}</span>
        </div>
      </div>
    </div>`;
  }).join('');
  return `<div class="ws-scroll"><div style="display:flex;flex-direction:column;gap:7px;">${items}</div></div>`;
}

function buildPrioritizedPanelHTML(events) {
  if (!events.length) return '<p style="color:var(--sub);font-size:.83rem;">No events currently need attention.</p>';
  const items = events.map(ev => {
    const hasBlack = DEPT_NAMES.some(d => ev.depts[d] === 'Black');
    const cls = hasBlack ? 'urgent' : 'pending';
    const label = hasBlack ? 'Needs Immediate Attention' : 'In Progress';
    const bg = hasBlack ? 'var(--alert)' : '#1558A0';
    const color = catColor(ev.category);
    const involvedDepts = DEPT_NAMES.filter(d => ev.depts[d] === 'Black' || ev.depts[d] === 'Blue');
    const deptInfo = involvedDepts.map(d => `${d}: ${ev.depts[d]}`).join(', ');
    const secBadge = ev.secondaryCategory ? `<span class="cat-tag" style="background:${catColor(ev.secondaryCategory)};font-size:.5rem;opacity:.85;">+${esc(ev.secondaryCategory)}</span>` : '';
    return `<div class="task-item ${cls}" onclick="openEvent(${ev.id})">
      <div><span class="task-priority" style="background:${bg}">${esc(label)}</span></div>
      <div style="flex:1;min-width:0;">
        <div class="task-event-name">${esc(ev.subject)}</div>
        <div class="task-meta">${esc(fmtDateFull(ev.date))} \u2014 ${esc(deptInfo)}</div>
        <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;">
          <span class="cat-tag" style="background:${color};font-size:.5rem;">${esc(ev.category)}</span>
          ${secBadge}
        </div>
      </div>
    </div>`;
  }).join('');
  return `<div class="ws-scroll"><div style="display:flex;flex-direction:column;gap:7px;">${items}</div></div>`;
}

function buildAITasksPanelHTML(tasks) {
  if (!tasks.length) return '<p style="color:var(--sub);font-size:.83rem;">No recommended tasks at this time.</p>';
  const items = tasks.map(t => {
    const bg = {urgent:'var(--alert)',pending:'#1558A0',upcoming:'#B5712A'}[t.type] || 'var(--slate)';
    const color = catColor(t.event.category);
    const checkedAttr = t.completed ? 'checked' : '';
    const completedStyle = t.completed ? 'opacity:.45;' : '';
    const strikeStyle = t.completed ? 'text-decoration:line-through;' : '';
    return `<div class="task-item ${t.type}" style="${completedStyle}">
      <input type="checkbox" ${checkedAttr} onchange="toggleWorkspaceTask('${t.key}', this.checked)"
             style="accent-color:var(--navy);width:16px;height:16px;flex-shrink:0;margin-top:2px;cursor:pointer;"
             onclick="event.stopPropagation();" />
      <div style="flex:1;min-width:0;cursor:pointer;${strikeStyle}" onclick="openEvent(${t.eventId})">
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
          <span class="task-priority" style="background:${bg}">${esc(t.label)}</span>
          <span class="cat-tag" style="background:${color};font-size:.5rem;">${esc(t.event.category)}</span>
        </div>
        <div class="task-event-name" style="margin-top:4px;">${esc(t.event.subject)}</div>
        <div class="task-meta">${esc(t.description)}</div>
      </div>
    </div>`;
  }).join('');
  return `<div class="ws-scroll"><div style="display:flex;flex-direction:column;gap:7px;">${items}</div></div>`;
}

/* ---- Custom To-Do Persistence ---- */
function getCustomTodos() {
  try { return JSON.parse(localStorage.getItem('customTodos') || '[]'); }
  catch { return []; }
}
function saveCustomTodos(todos) {
  localStorage.setItem('customTodos', JSON.stringify(todos));
}
function addCustomTodo() {
  const input = document.getElementById('todo-text-input');
  const sel = document.getElementById('todo-ministry-select');
  const dateInput = document.getElementById('todo-due-date');
  const text = (input ? input.value : '').trim();
  if (!text) return;
  const ministry = sel && sel.value ? sel.value : null;
  const dueDate = dateInput && dateInput.value ? dateInput.value : null;
  const todos = getCustomTodos();
  todos.push({ id: 'todo-' + Date.now(), text, ministry: ministry || null, dueDate, completed: false, createdAt: Date.now(), notes: '', subtasks: [], eventId: null });
  saveCustomTodos(todos);
  if (input) input.value = '';
  if (dateInput) dateInput.value = '';
  renderTasksWorkspace();
  document.getElementById('admin-tasks-view').style.display = 'block';
}
function setTodoDueDate(id, value) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(id));
  if (t) t.dueDate = value || null;
  saveCustomTodos(todos);
  const el = document.getElementById('custom-todo-list');
  if (el) el.innerHTML = buildCustomTodoListHTML(applyTodoFilters(todos));
}
function toggleTodoExpand(id) {
  const sid = String(id);
  if (expandedTodos.has(sid)) expandedTodos.delete(sid); else expandedTodos.add(sid);
  const el = document.getElementById('custom-todo-list');
  if (el) el.innerHTML = buildCustomTodoListHTML(applyTodoFilters(getCustomTodos()));
}
function setTodoNotes(id, value) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(id));
  if (t) t.notes = value;
  saveCustomTodos(todos);
}
function addSubtask(todoId, text) {
  text = (text||'').trim(); if (!text) return;
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(todoId));
  if (!t) return;
  if (!t.subtasks) t.subtasks = [];
  t.subtasks.push({ id: 'sub-' + Date.now(), text, completed: false });
  saveCustomTodos(todos);
  expandedTodos.add(String(todoId));
  const el = document.getElementById('custom-todo-list');
  if (el) el.innerHTML = buildCustomTodoListHTML(applyTodoFilters(todos));
}
function toggleSubtask(todoId, subId, checked) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(todoId));
  const s = t?.subtasks?.find(s => String(s.id) === String(subId));
  if (s) s.completed = checked;
  saveCustomTodos(todos);
}
function deleteSubtask(todoId, subId) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(todoId));
  if (t?.subtasks) t.subtasks = t.subtasks.filter(s => String(s.id) !== String(subId));
  saveCustomTodos(todos);
  expandedTodos.add(String(todoId));
  const el = document.getElementById('custom-todo-list');
  if (el) el.innerHTML = buildCustomTodoListHTML(applyTodoFilters(todos));
}
function setTasksSubView(v) { tasksSubView = v; renderTasksWorkspace(); document.getElementById('admin-tasks-view').style.display='block'; }
function setTodoFilter(f) { todoFilter = f; renderTasksWorkspace(); document.getElementById('admin-tasks-view').style.display='block'; }
function setTodoSort(s)   { todoSort   = s; renderTasksWorkspace(); document.getElementById('admin-tasks-view').style.display='block'; }
function setTodoMinistryFilter(m) { todoMinistryFilter = m; renderTasksWorkspace(); document.getElementById('admin-tasks-view').style.display='block'; }

/* ── Task Detail Panel ───────────────────────────── */
function openTaskDetail(sid) {
  pendingComplete = null;
  currentTaskDetailId = String(sid);
  renderTaskDetailPanel();
  document.getElementById('task-detail-overlay').classList.add('open');
  document.getElementById('task-detail-panel').classList.add('open');
}
function closeTaskDetail() {
  document.getElementById('task-detail-overlay').classList.remove('open');
  document.getElementById('task-detail-panel').classList.remove('open');
  currentTaskDetailId = null;
}
function refreshTodoListInView() {
  const el = document.getElementById('custom-todo-list');
  if (el) el.innerHTML = buildCustomTodoListHTML(applyTodoFilters(getCustomTodos()));
}
function renderTaskDetailPanel() {
  if (!currentTaskDetailId) return;
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === currentTaskDetailId);
  if (!t) { closeTaskDetail(); return; }
  const sid = currentTaskDetailId;
  const tid = JSON.stringify(sid);
  const today = new Date(); today.setHours(0,0,0,0);
  const PRIORITIES = [
    { value: '',       label: 'None',   bg: 'var(--cream)', color: 'var(--sub)', border: 'var(--border)' },
    { value: 'low',    label: 'Low',    bg: '#dcfce7', color: '#15803d', border: '#15803d' },
    { value: 'medium', label: 'Medium', bg: '#fef9c3', color: '#92400e', border: '#92400e' },
    { value: 'high',   label: 'High',   bg: '#fee2e2', color: '#b91c1c', border: '#b91c1c' },
    { value: 'urgent', label: 'Urgent', bg: '#f3e8ff', color: '#7c3aed', border: '#7c3aed' },
  ];
  const ministryOptions = Object.values(CATEGORY_MAP)
    .map(c => `<option value="${esc(c.name)}" ${t.ministry===c.name?'selected':''}>${esc(c.name)}</option>`).join('');
  const linkedEv = t.eventId != null ? allEvents.find(e => e.id === t.eventId) : null;
  const subtasks = t.subtasks || [];
  let dueBadge = '';
  if (t.dueDate) {
    const d = new Date(t.dueDate + 'T00:00:00');
    const diff = Math.round((d - today) / 86400000);
    const overdue = !t.completed && diff < 0;
    const soon    = !t.completed && diff >= 0 && diff <= 1;
    const dueBg  = overdue ? '#fee2e2' : soon ? '#fef9c3' : 'var(--cream)';
    const dueClr = overdue ? '#b91c1c' : soon ? '#92400e' : 'var(--sub)';
    const label  = diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : diff < 0 ? `${Math.abs(diff)}d overdue` : `Due ${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`;
    dueBadge = `<span style="font-size:.65rem;font-weight:700;padding:2px 7px;border-radius:8px;background:${dueBg};color:${dueClr};">${label}</span>`;
  }
  document.getElementById('task-detail-content').innerHTML = `
    <div style="padding:14px 16px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;position:sticky;top:0;background:var(--surface-1);z-index:1;">
      <button onclick="closeTaskDetail()" style="background:none;border:none;cursor:pointer;color:var(--sub);font-size:1rem;padding:3px 6px;line-height:1;border-radius:4px;flex-shrink:0;" title="Close">←</button>
      <span style="font-family:'Oswald',sans-serif;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sub);flex:1;">Task Details</span>
      <button onclick="if(confirm('Delete this task?')){deleteCustomTodo(${tid});closeTaskDetail();}" style="font-family:'Lato',sans-serif;font-size:.7rem;padding:3px 10px;border:1px solid #fee2e2;border-radius:5px;background:var(--surface-1);color:#dc2626;cursor:pointer;">Delete</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:20px;">
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <input type="checkbox" ${t.completed?'checked':''} onchange="toggleCustomTodo(${tid},this.checked);renderTaskDetailPanel();refreshTodoListInView();"
               style="accent-color:var(--navy);width:18px;height:18px;flex-shrink:0;margin-top:4px;cursor:pointer;" />
        <textarea id="tdp-title" onblur="setTodoTitle(${tid},this.value)" rows="2"
                  style="flex:1;font-family:'Oswald',sans-serif;font-size:1.05rem;font-weight:600;color:var(--charcoal);border:none;outline:none;resize:none;background:transparent;line-height:1.3;padding:0;${t.completed?'text-decoration:line-through;opacity:.45;':''}"
                  oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px';">${esc(t.text)}</textarea>
      </div>
      <div>
        <div class="tdp-field-label">Priority</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${PRIORITIES.map(p => `<button class="tdp-priority-btn" onclick="setTodoPriority(${tid},${JSON.stringify(p.value)})"
            style="background:${p.bg};color:${p.color};border-color:${(t.priority||'')==p.value?p.border:'transparent'};">${p.label}</button>`).join('')}
        </div>
      </div>
      <div>
        <div class="tdp-field-label">Due Date ${dueBadge}</div>
        <div style="display:flex;align-items:center;gap:8px;">
          <input type="date" value="${t.dueDate||''}" onchange="setTodoDueDate(${tid},this.value);renderTaskDetailPanel();refreshTodoListInView();"
                 style="font-family:'Lato',sans-serif;font-size:.82rem;padding:6px 9px;border:1px solid var(--border);border-radius:6px;color:var(--charcoal);outline:none;cursor:pointer;" />
          ${t.dueDate ? `<button onclick="setTodoDueDate(${tid},'');renderTaskDetailPanel();refreshTodoListInView();" style="font-family:'Lato',sans-serif;font-size:.68rem;padding:4px 8px;border:1px solid var(--border);border-radius:5px;background:none;color:var(--sub);cursor:pointer;">✕ Clear</button>` : ''}
        </div>
      </div>
      <div>
        <div class="tdp-field-label">Ministry</div>
        <select onchange="setTodoMinistry(${tid},this.value)"
                style="font-family:'Lato',sans-serif;font-size:.82rem;padding:6px 9px;border:1px solid var(--border);border-radius:6px;color:var(--charcoal);background:var(--surface-1);cursor:pointer;outline:none;width:100%;">
          <option value="">No ministry</option>
          ${ministryOptions}
        </select>
      </div>
      ${(() => { const cd = evCountdown(linkedEv, today); return `<div>
        <div class="tdp-field-label">Linked Event${cd ? ` <span style="font-size:.65rem;font-weight:700;padding:2px 9px;border-radius:8px;background:${cd.bg};color:${cd.clr};border:1px solid ${cd.border};">📅 ${cd.label} away · ${cd.dateStr}</span>` : ''}</div>
        ${linkedEv ? `
          <div style="display:flex;gap:6px;align-items:center;">
            <button onclick="openEvent(${t.eventId})" style="font-family:'Lato',sans-serif;font-size:.8rem;padding:9px 12px;border:1px solid ${cd?cd.border:'var(--border)'};border-radius:7px;background:${cd?cd.bg:'var(--cream)'};color:var(--navy);cursor:pointer;text-align:left;flex:1;display:flex;align-items:center;gap:8px;">
              <span>📅</span>
              <span style="flex:1;text-align:left;">${esc(linkedEv.subject)}</span>
              <span style="font-size:.7rem;opacity:.65;">${linkedEv.date.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>
            </button>
            <button onclick="setTodoEvent('${sid}',null)" title="Detach event" style="font-family:'Lato',sans-serif;font-size:.72rem;padding:6px 10px;border:1px solid var(--border);border-radius:7px;background:var(--surface-1);color:var(--sub);cursor:pointer;white-space:nowrap;">✕ Detach</button>
          </div>
        ` : `
          <input type="text" id="tdp-ev-search" placeholder="Search events to attach…" oninput="renderTdpEventSearch('${sid}',this.value)"
                 style="width:100%;box-sizing:border-box;font-family:'Lato',sans-serif;font-size:.82rem;padding:7px 10px;border:1px solid var(--border);border-radius:6px;color:var(--charcoal);outline:none;" />
          <div id="tdp-ev-results" style="margin-top:4px;"></div>
        `}
      </div>`; })()}
      <div>
        <div class="tdp-field-label">Notes</div>
        <textarea class="todo-notes" onblur="setTodoNotes(${tid},this.value)" placeholder="Add notes, context, or links…" rows="4"
                  style="min-height:80px;">${esc(t.notes||'')}</textarea>
      </div>
      <div>
        <div class="tdp-field-label">Subtasks ${subtasks.length ? `<span style="font-weight:500;opacity:.7;">(${subtasks.filter(s=>s.completed).length}/${subtasks.length} done)</span>` : ''}</div>
        <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:8px;">
          ${subtasks.map(s => {
            const ssid = JSON.stringify(String(s.id));
            return `<div class="subtask-item" style="padding:5px 0;">
              <input type="checkbox" ${s.completed?'checked':''} onchange="toggleSubtask(${tid},${ssid},this.checked);renderTaskDetailPanel();" />
              <span style="flex:1;font-size:.82rem;${s.completed?'text-decoration:line-through;opacity:.45;':''}">${esc(s.text)}</span>
              <button class="subtask-del" onclick="deleteSubtask(${tid},${ssid});renderTaskDetailPanel();" title="Remove">✕</button>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;gap:6px;">
          <input type="text" class="subtask-add-input" id="tdp-sub-input" placeholder="Add subtask…"
                 onkeydown="if(event.key==='Enter'){addSubtaskFromDetail(${tid},this.value);this.value='';}" />
          <button onclick="addSubtaskFromDetail(${tid},document.getElementById('tdp-sub-input').value);document.getElementById('tdp-sub-input').value='';"
                  style="font-family:'Lato',sans-serif;font-size:.7rem;padding:5px 10px;background:var(--navy);color:white;border:none;border-radius:5px;cursor:pointer;white-space:nowrap;">Add</button>
        </div>
      </div>
    </div>`;
  const ta = document.getElementById('tdp-title');
  if (ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; }
}
function setTodoTitle(sid, value) {
  value = (value||'').trim(); if (!value) return;
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(sid));
  if (!t) return;
  t.text = value;
  saveCustomTodos(todos);
  refreshTodoListInView();
}
function setTodoPriority(sid, value) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(sid));
  if (!t) return;
  t.priority = value || null;
  saveCustomTodos(todos);
  renderTaskDetailPanel();
  refreshTodoListInView();
}
function setTodoMinistry(sid, value) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(sid));
  if (!t) return;
  t.ministry = value || null;
  saveCustomTodos(todos);
  renderTaskDetailPanel();
  refreshTodoListInView();
}
function addSubtaskFromDetail(sid, text) {
  addSubtask(sid, text);
  renderTaskDetailPanel();
}
function setTodoEvent(sid, eventId) {
  const todos = getCustomTodos();
  const t = todos.find(t => String(t.id) === String(sid));
  if (!t) return;
  t.eventId = eventId;
  saveCustomTodos(todos);
  renderTaskDetailPanel();
  refreshTodoListInView();
}
function renderTdpEventSearch(sid, query) {
  const el = document.getElementById('tdp-ev-results');
  if (!el) return;
  query = (query||'').trim().toLowerCase();
  if (!query) { el.innerHTML = ''; return; }
  const matches = allEvents.filter(e =>
    e.subject.toLowerCase().includes(query) ||
    (e.category||'').toLowerCase().includes(query)
  ).slice(0, 8);
  if (!matches.length) {
    el.innerHTML = `<div style="font-size:.75rem;color:var(--sub);padding:6px 2px;">No events found</div>`;
    return;
  }
  el.innerHTML = `<div style="border:1px solid var(--border);border-radius:6px;overflow:hidden;">` +
    matches.map(ev => {
      const cat = Object.values(CATEGORY_MAP).find(c => c.key === ev.category);
      const color = cat ? cat.color : '#ccc';
      return `<div onclick="setTodoEvent('${sid}',${ev.id})"
        style="display:flex;align-items:center;gap:9px;padding:8px 11px;cursor:pointer;background:var(--surface-1);border-bottom:1px solid var(--border);font-family:'Lato',sans-serif;"
        onmouseover="this.style.background='var(--cream)'" onmouseout="this.style.background='var(--white)'">
        <span style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0;"></span>
        <span style="flex:1;font-size:.8rem;color:var(--charcoal);">${esc(ev.subject)}</span>
        <span style="font-size:.7rem;color:var(--sub);white-space:nowrap;">${ev.date.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>
      </div>`;
    }).join('') + `</div>`;
}

function applyTodoFilters(todos) {
  const today = new Date(); today.setHours(0,0,0,0);
  const endOfWeek = new Date(today); endOfWeek.setDate(endOfWeek.getDate()+7);
  let list = [...todos];
  // Ministry filter
  if (todoMinistryFilter) list = list.filter(t => t.ministry === todoMinistryFilter);
  // Time/status filter
  if (todoFilter === 'this-week')  list = list.filter(t => t.dueDate && new Date(t.dueDate+'T00:00:00') >= today && new Date(t.dueDate+'T00:00:00') <= endOfWeek);
  else if (todoFilter === 'upcoming') list = list.filter(t => t.dueDate && new Date(t.dueDate+'T00:00:00') >= today);
  else if (todoFilter === 'overdue')  list = list.filter(t => !t.completed && t.dueDate && new Date(t.dueDate+'T00:00:00') < today);
  else if (todoFilter === 'no-date')  list = list.filter(t => !t.dueDate);
  // Sort
  if (todoSort === 'due') {
    list.sort((a,b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
  } else if (todoSort === 'ministry') {
    list.sort((a,b) => (a.ministry||'').localeCompare(b.ministry||''));
  } else {
    list.sort((a,b) => (b.createdAt||0) - (a.createdAt||0));
  }
  return list;
}
function deleteCustomTodo(id) {
  saveCustomTodos(getCustomTodos().filter(t => t.id !== id));
  renderTasksWorkspace();
  document.getElementById('admin-tasks-view').style.display = 'block';
}
function toggleCustomTodo(id, checked) {
  const todos = getCustomTodos();
  const t = todos.find(t => t.id === id);
  if (t) t.completed = checked;
  saveCustomTodos(todos);
  // Rebuild in place using same ministry filter as current view
  const ministryLabel = currentCategory ? CATEGORY_MAP[currentCategory].name : null;
  const visible = ministryLabel ? todos.filter(t => t.ministry === ministryLabel) : todos;
  const emptyMsg = ministryLabel ? `No to-dos yet for ${esc(ministryLabel)}. Add one above.` : 'No to-dos yet. Add one above.';
  const el = document.getElementById('custom-todo-list');
  if (el) el.innerHTML = buildCustomTodoListHTML(visible, emptyMsg);
}
function evCountdown(ev, today) {
  // Returns { diff, bg, clr, label, borderClr } for a linked event
  if (!ev) return null;
  const diff = Math.round((ev.date - today) / 86400000);
  let bg, clr, border, label;
  if      (diff < 0)   { bg='#f3f4f6'; clr='#9ca3af'; border='#d1d5db'; label='Passed'; }
  else if (diff === 0) { bg='#fef2f2'; clr='#991b1b'; border='#fca5a5'; label='Today!'; }
  else if (diff <= 3)  { bg='#fee2e2'; clr='#dc2626'; border='#fca5a5'; label=`${diff}d`; }
  else if (diff <= 7)  { bg='#ffedd5'; clr='#c2410c'; border='#fdba74'; label=`${diff}d`; }
  else if (diff <= 14) { bg='#fef9c3'; clr='#b45309'; border='#fde047'; label=`${diff}d`; }
  else if (diff <= 30) { bg='#dcfce7'; clr='#15803d'; border='#86efac'; label=`${diff}d`; }
  else                 { bg='#f3f4f6'; clr='#6b7280'; border='#d1d5db'; label=`${diff}d`; }
  const dateStr = ev.date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  return { diff, bg, clr, border, label, dateStr };
}
function buildTodoItemHTML(t, today) {
  const sid = String(t.id);
  const tid = JSON.stringify(sid);
  const mCat = t.ministry ? Object.values(CATEGORY_MAP).find(c => c.name === t.ministry) : null;
  const mBadge = mCat ? `<span class="cat-tag" style="background:${mCat.color};font-size:.5rem;">${esc(mCat.name)}</span>` : '';
  const PRIORITY_COLORS = { low:'#15803d', medium:'#92400e', high:'#b91c1c', urgent:'#7c3aed' };
  const PRIORITY_BG     = { low:'#dcfce7', medium:'#fef9c3', high:'#fee2e2', urgent:'#f3e8ff' };
  const priorityBadge = t.priority ? `<span style="font-size:.6rem;font-weight:700;padding:2px 7px;border-radius:8px;background:${PRIORITY_BG[t.priority]};color:${PRIORITY_COLORS[t.priority]};">${t.priority.charAt(0).toUpperCase()+t.priority.slice(1)}</span>` : '';
  const borderClr = t.priority ? PRIORITY_COLORS[t.priority] : 'var(--border)';
  let dueBadge = '';
  if (t.dueDate) {
    const d = new Date(t.dueDate + 'T00:00:00');
    const diff = Math.round((d - today) / 86400000);
    const overdue = !t.completed && diff < 0;
    const soon    = !t.completed && diff >= 0 && diff <= 1;
    const dueBg  = overdue ? '#fee2e2' : soon ? '#fef9c3' : 'var(--cream)';
    const dueClr = overdue ? '#b91c1c' : soon ? '#92400e' : 'var(--sub)';
    const label  = diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : diff < 0 ? `${Math.abs(diff)}d overdue` : `Due ${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`;
    dueBadge = `<span style="font-size:.65rem;font-weight:700;padding:2px 6px;border-radius:8px;background:${dueBg};color:${dueClr};white-space:nowrap;">${label}</span>`;
  }
  const linkedEv = t.eventId != null ? allEvents.find(e => e.id === t.eventId) : null;
  const cd = evCountdown(linkedEv, today);
  const evBadge = cd ? `<span style="font-size:.62rem;font-weight:700;padding:2px 8px;border-radius:8px;background:${cd.bg};color:${cd.clr};border:1px solid ${cd.border};white-space:nowrap;display:inline-flex;align-items:center;gap:3px;" title="${esc(linkedEv.subject)} · ${cd.dateStr}">📅 ${cd.label}</span>` : '';
  const subtasks = t.subtasks || [];
  const subCount = subtasks.length;
  const subDone  = subtasks.filter(s=>s.completed).length;
  const subHint  = subCount ? `<span style="font-size:.62rem;color:var(--sub);white-space:nowrap;">${subDone}/${subCount} subtasks</span>` : '';
  const hasNotes = t.notes && t.notes.trim();
  const notesDot = hasNotes ? `<span style="font-size:.6rem;color:var(--sub);" title="Has notes">📝</span>` : '';
  const isPending = pendingComplete === sid;
  return `<div class="tdp-task-row${t.completed?' completed':''}" onclick="${isPending?'':'openTaskDetail(\''+sid+'\')'}"
    style="border-left:3px solid ${cd ? cd.border : borderClr};">
    <div style="display:flex;align-items:flex-start;gap:10px;">
      <input type="checkbox" ${(t.completed||isPending)?'checked':''} onchange="event.stopPropagation();setPendingComplete('${sid}',this.checked);"
             onclick="event.stopPropagation();"
             style="accent-color:var(--navy);width:15px;height:15px;flex-shrink:0;margin-top:2px;cursor:pointer;" />
      <div style="flex:1;min-width:0;">
        <div style="font-size:.84rem;font-weight:600;color:var(--charcoal);${(t.completed||isPending)?'text-decoration:line-through;opacity:.45;':''}">${esc(t.text)}</div>
        ${isPending ? `
          <div style="display:flex;align-items:center;gap:7px;margin-top:7px;">
            <button onclick="event.stopPropagation();confirmComplete('${sid}');"
              style="font-family:'Lato',sans-serif;font-size:.72rem;font-weight:700;padding:4px 12px;border-radius:6px;background:#15803d;color:white;border:none;cursor:pointer;white-space:nowrap;">✓ Mark Complete</button>
            <button onclick="event.stopPropagation();cancelPendingComplete();"
              style="font-family:'Lato',sans-serif;font-size:.72rem;padding:4px 10px;border-radius:6px;background:none;color:var(--sub);border:1px solid var(--border);cursor:pointer;white-space:nowrap;">Cancel</button>
          </div>
        ` : `
          <div style="display:flex;align-items:center;gap:5px;margin-top:5px;flex-wrap:wrap;">
            ${mBadge}${priorityBadge}${dueBadge}${evBadge}${subHint}${notesDot}
            ${linkedEv ? `<button onclick="event.stopPropagation();openEvent(${t.eventId});" style="font-family:'Lato',sans-serif;font-size:.62rem;padding:1px 7px;background:none;border:1px solid var(--border);border-radius:8px;color:var(--navy);cursor:pointer;white-space:nowrap;" title="Open linked event">↗ Event</button>` : ''}
          </div>
        `}
      </div>
      <button onclick="event.stopPropagation();deleteCustomTodo(${tid});" style="background:none;border:none;color:var(--sub);cursor:pointer;font-size:.85rem;padding:0 2px;flex-shrink:0;line-height:1;opacity:.5;" title="Delete">✕</button>
    </div>
  </div>`;
}
function toggleCompletedSection() {
  completedSectionOpen = !completedSectionOpen;
  refreshTodoListInView();
}
function setPendingComplete(sid, checked) {
  if (!checked) {
    // Unchecking — no confirmation needed
    pendingComplete = null;
    toggleCustomTodo(sid, false);
    refreshTodoListInView();
    return;
  }
  pendingComplete = String(sid);
  refreshTodoListInView();
}
function confirmComplete(sid) {
  pendingComplete = null;
  toggleCustomTodo(sid, true);
  refreshTodoListInView();
  if (currentTaskDetailId === String(sid)) renderTaskDetailPanel();
}
function cancelPendingComplete() {
  pendingComplete = null;
  refreshTodoListInView();
}
function buildCustomTodoListHTML(todos, emptyMsg) {
  const today = new Date(); today.setHours(0,0,0,0);
  const pending = todos.filter(t => !t.completed);
  const done    = getCustomTodos().filter(t => t.completed); // always all completed, not filtered
  if (!pending.length && !done.length) return `<p style="color:var(--sub);font-size:.83rem;padding:4px 0;">${emptyMsg || 'No to-dos yet. Add one above.'}</p>`;
  let html = '<div style="display:flex;flex-direction:column;gap:7px;">';
  if (pending.length) {
    html += pending.map(t => buildTodoItemHTML(t, today)).join('');
  } else {
    html += `<p style="color:var(--sub);font-size:.83rem;padding:4px 0;">No tasks match the current filters.</p>`;
  }
  if (done.length) {
    html += `<button onclick="toggleCompletedSection()"
      style="font-family:'Lato',sans-serif;font-size:.72rem;font-weight:700;padding:7px 12px;margin-top:8px;border:1px solid var(--border);border-radius:7px;background:var(--cream);color:var(--sub);cursor:pointer;text-align:left;display:flex;align-items:center;gap:8px;width:100%;">
      <span style="font-size:.65rem;">${completedSectionOpen ? '▾' : '▸'}</span>
      <span style="text-transform:uppercase;letter-spacing:.07em;">Completed</span>
      <span style="background:var(--border);border-radius:10px;padding:1px 8px;font-size:.68rem;">${done.length}</span>
    </button>`;
    if (completedSectionOpen) {
      html += `<div style="display:flex;flex-direction:column;gap:6px;padding-left:4px;border-left:2px solid var(--border);margin-left:4px;">`;
      html += done.map(t => buildTodoItemHTML(t, today)).join('');
      html += `</div>`;
    }
  }
  html += '</div>';
  return html;
}

function buildCustomTodoPanelHTML(filterMinistry) {
  const todos = getCustomTodos();
  const allMinistries = [...new Set(todos.map(t => t.ministry).filter(Boolean))].sort();
  const ministryOptions = Object.values(CATEGORY_MAP)
    .map(c => `<option value="${esc(c.name)}" ${c.name===filterMinistry?'selected':''}>${esc(c.name)}</option>`).join('');

  const filterDefs = [
    { id:'all',       label:'All' },
    { id:'this-week', label:'This Week' },
    { id:'upcoming',  label:'Upcoming' },
    { id:'overdue',   label:'Overdue' },
    { id:'no-date',   label:'No Date' },
  ];
  const pillStyle = (active) => `font-family:'Lato',sans-serif;font-size:.72rem;font-weight:700;padding:4px 10px;border-radius:12px;border:1px solid ${active?'var(--navy)':'var(--border)'};background:${active?'var(--navy)':'white'};color:${active?'white':'var(--sub)'};cursor:pointer;`;
  const filterBar = `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
    <span style="font-size:.7rem;font-weight:700;color:var(--sub);text-transform:uppercase;letter-spacing:.06em;margin-right:2px;">Filter</span>
    ${filterDefs.map(f => `<button style="${pillStyle(todoFilter===f.id)}" onclick="setTodoFilter('${f.id}')">${f.label}</button>`).join('')}
    <span style="font-size:.7rem;font-weight:700;color:var(--sub);text-transform:uppercase;letter-spacing:.06em;margin-left:8px;margin-right:2px;">Sort</span>
    <select onchange="setTodoSort(this.value)" style="font-family:'Lato',sans-serif;font-size:.72rem;padding:4px 7px;border:1px solid var(--border);border-radius:12px;color:var(--charcoal);background:var(--surface-1);cursor:pointer;outline:none;">
      <option value="created" ${todoSort==='created'?'selected':''}>Date Created</option>
      <option value="due"     ${todoSort==='due'    ?'selected':''}>Due Date</option>
      <option value="ministry"${todoSort==='ministry'?'selected':''}>Ministry</option>
    </select>
    <select onchange="setTodoMinistryFilter(this.value)" style="font-family:'Lato',sans-serif;font-size:.72rem;padding:4px 7px;border:1px solid var(--border);border-radius:12px;color:var(--charcoal);background:var(--surface-1);cursor:pointer;outline:none;">
      <option value="">All Ministries</option>
      ${allMinistries.map(m => `<option value="${esc(m)}" ${todoMinistryFilter===m?'selected':''}>${esc(m)}</option>`).join('')}
    </select>
  </div>`;

  const filtered = applyTodoFilters(todos);
  const emptyMsg = filtered.length === 0 ? 'No tasks match the current filters.' : '';
  return `
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
      <input id="todo-text-input" type="text" placeholder="Add a task\u2026" onkeydown="if(event.key==='Enter')addCustomTodo()"
             style="flex:1;min-width:180px;font-family:'Lato',sans-serif;font-size:.83rem;padding:7px 10px;border:1px solid var(--border);border-radius:5px;color:var(--charcoal);outline:none;" />
      <select id="todo-ministry-select"
              style="font-family:'Lato',sans-serif;font-size:.78rem;padding:7px 8px;border:1px solid var(--border);border-radius:5px;color:var(--charcoal);background:var(--surface-1);max-width:240px;cursor:pointer;">
        <option value="">Tag a ministry (optional)</option>
        ${ministryOptions}
      </select>
      <input id="todo-due-date" type="date" title="Due date (optional)"
             style="font-family:'Lato',sans-serif;font-size:.78rem;padding:7px 8px;border:1px solid var(--border);border-radius:5px;color:var(--charcoal);background:var(--surface-1);cursor:pointer;outline:none;" />
      <button onclick="addCustomTodo()"
              style="font-family:'Oswald',sans-serif;font-size:.75rem;letter-spacing:.07em;text-transform:uppercase;padding:7px 16px;background:var(--navy);color:white;border:none;border-radius:5px;cursor:pointer;white-space:nowrap;">Add</button>
    </div>
    ${filterBar}
    <div id="custom-todo-list">${buildCustomTodoListHTML(filtered, emptyMsg)}</div>`;
}

function buildByEventHTML() {
  const todos = getCustomTodos().filter(t => t.eventId != null);
  if (!todos.length) return '<p style="color:var(--sub);font-size:.83rem;">No tasks have been linked to events yet. Use the service menu on an event to add tasks.</p>';
  const byEvent = {};
  for (const t of todos) {
    const key = String(t.eventId);
    if (!byEvent[key]) byEvent[key] = [];
    byEvent[key].push(t);
  }
  const today = new Date(); today.setHours(0,0,0,0);
  const allEventsForTodos = Object.keys(byEvent).map(id => allEvents.find(e => String(e.id) === id)).filter(Boolean);
  // Only show events with active tasks, OR all-done events that haven't passed yet
  const events = allEventsForTodos.filter(ev => {
    const tasks = byEvent[String(ev.id)];
    const hasPending = tasks.some(t => !t.completed);
    const isPast = ev.date < today;
    return hasPending || !isPast;
  });
  events.sort((a,b) => a.date - b.date);
  if (!events.length) return '<p style="color:var(--sub);font-size:.83rem;">No active event tasks. Completed tasks for past events have been archived.</p>';
  return events.map(ev => {
    const color = catColor(ev.category);
    const tasks = byEvent[String(ev.id)];
    const pending = tasks.filter(t=>!t.completed).length;
    const timeStr = ev.allDay ? 'All Day' : (ev.startTime ? fmtTime(ev.startTime) : '');
    return `<div class="ev-task-card">
      <div class="ev-task-card-header" onclick="openEvent(${ev.id})">
        <div class="ev-task-card-bar" style="background:${color};min-height:36px;"></div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:.9rem;font-weight:700;color:var(--charcoal);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(ev.subject)}</div>
          <div style="font-size:.72rem;color:var(--sub);margin-top:2px;">
            ${esc(fmtDateFull(ev.date))}${timeStr?' · '+esc(timeStr):''}
            <span class="cat-tag" style="background:${color};font-size:.5rem;margin-left:4px;">${esc(ev.category)}</span>
          </div>
        </div>
        <span style="font-size:.7rem;color:var(--sub);white-space:nowrap;flex-shrink:0;">${pending} pending</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${tasks.filter(t=>!t.completed).map(t => buildTodoItemHTML(t, today)).join('')}
        ${tasks.filter(t=>t.completed).length ? `<div style="font-size:.7rem;color:var(--sub);padding:4px 8px;">${tasks.filter(t=>t.completed).length} completed task${tasks.filter(t=>t.completed).length>1?'s':''} hidden</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

function renderTasksWorkspace() {
  const todos = getCustomTodos();
  const pending = applyTodoFilters(todos).filter(t => !t.completed).length;
  const total   = todos.filter(t => !t.completed).length;
  const linkedCount = todos.filter(t => t.eventId != null).length;

  const subTabStyle = (active) => `font-family:'Oswald',sans-serif;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;padding:7px 16px;border:none;border-bottom:2px solid ${active?'var(--navy)':'transparent'};background:transparent;color:${active?'var(--navy)':'var(--sub)'};cursor:pointer;`;

  const el = document.getElementById('admin-tasks-view');
  el.innerHTML = `
    <div style="margin-bottom:18px;">
      <h2 style="font-family:'Oswald',sans-serif;font-size:1.1rem;letter-spacing:.12em;text-transform:uppercase;color:var(--charcoal);">Tasks</h2>
      <p style="font-size:.82rem;color:var(--sub);margin-top:4px;">${pending} showing &mdash; ${total} total pending</p>
    </div>
    <div style="display:flex;border-bottom:2px solid var(--border);margin-bottom:18px;">
      <button style="${subTabStyle(tasksSubView==='todos')}" onclick="setTasksSubView('todos')">📋 To-Do List</button>
      <button style="${subTabStyle(tasksSubView==='by-event')}" onclick="setTasksSubView('by-event')">📅 By Event${linkedCount?' <span style=\'font-size:.6rem;background:var(--navy);color:white;border-radius:8px;padding:1px 5px;\'>'+linkedCount+'</span>':''}</button>
    </div>
    ${tasksSubView === 'todos'
      ? `<div class="chart-card">${buildCustomTodoPanelHTML(null)}</div>`
      : `<div>${buildByEventHTML()}</div>`
    }
  `;
}

function setTasksWindow(days) {
  tasksTimeWindow = days;
  renderTasksWorkspace();
  document.getElementById('admin-tasks-view').style.display = 'block';
}

function toggleWorkspaceTask(key, checked) {
  if (checked) setTaskCompleted(key);
  else removeTaskCompleted(key);
  renderTasksWorkspace();
  document.getElementById('admin-tasks-view').style.display = 'block';
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════ */
function buildMiniCalendarHTML(year, month) {
  const today = new Date(); today.setHours(0,0,0,0);
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDow = firstDay.getDay();
  const catColor = currentCategory ? CATEGORY_MAP[currentCategory].color : '#003A5D';

  // Build day → events map from filteredEvents
  const dayMap = {};
  for (const ev of filteredEvents) {
    if (ev.date.getFullYear() === year && ev.date.getMonth() === month) {
      const d = ev.date.getDate();
      if (!dayMap[d]) dayMap[d] = [];
      dayMap[d].push(ev);
    }
  }
  const monthTotal = Object.values(dayMap).reduce((s, arr) => s + arr.length, 0);

  // Header
  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
    <button class="mini-cal-nav" onclick="prevMiniCal()">&#8249;</button>
    <span style="font-family:'Oswald',sans-serif;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--charcoal);">
      ${MONTHS[month]} ${year}
      <span style="font-family:'Lato',sans-serif;font-weight:400;font-size:.68rem;letter-spacing:0;text-transform:none;color:var(--sub);margin-left:4px;">&mdash; ${monthTotal} event${monthTotal!==1?'s':''}</span>
    </span>
    <button class="mini-cal-nav" onclick="nextMiniCal()">&#8250;</button>
  </div>`;

  // Day-of-week headers
  html += `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:3px;">`;
  for (const d of ['Su','Mo','Tu','We','Th','Fr','Sa'])
    html += `<div style="text-align:center;font-size:.58rem;font-weight:700;color:var(--sub);letter-spacing:.04em;padding-bottom:3px;">${d}</div>`;
  html += `</div>`;

  // Day cells
  html += `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;">`;
  for (let i = 0; i < startDow; i++) html += `<div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const evs = dayMap[d] || [];
    const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;
    const bg = isToday ? catColor : 'transparent';
    const textColor = isToday ? 'white' : 'var(--charcoal)';
    const dots = evs.length ? evs.slice(0,3).map(() =>
      `<div style="width:4px;height:4px;border-radius:50%;background:${isToday?'rgba(255,255,255,.7)':catColor};flex-shrink:0;"></div>`
    ).join('') : '';
    const clickAttr = evs.length ? `onclick="miniCalDayClick(${year},${month},${d})"` : '';
    html += `<div class="mini-cal-day${evs.length?' has-events':''}${isToday?' is-today':''}" style="background:${bg};" ${clickAttr}>
      <div style="font-size:.7rem;font-weight:${isToday?700:400};color:${textColor};line-height:1.4;">${d}</div>
      ${dots ? `<div style="display:flex;justify-content:center;gap:1px;margin-top:1px;">${dots}</div>` : '<div style="height:5px;"></div>'}
    </div>`;
  }
  html += `</div>`;
  return html;
}

function buildWeekCalendarHTML(offset) {
  const today = new Date(); today.setHours(0,0,0,0);
  // Find the Sunday of the current week, then shift by offset weeks
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + offset * 7);

  const days = Array.from({length:7}, (_,i) => { const d = new Date(weekStart); d.setDate(weekStart.getDate()+i); return d; });
  const weekEnd = days[6];

  // Build event map: dateStr → events[]
  const evMap = {};
  for (const ev of filteredEvents) {
    if (ev.date >= weekStart && ev.date <= weekEnd) {
      const key = ev.date.toISOString().slice(0,10);
      if (!evMap[key]) evMap[key] = [];
      evMap[key].push(ev);
    }
  }

  // Build todo map: dateStr → todos[]
  const todoMap = {};
  for (const t of getCustomTodos()) {
    if (t.dueDate) {
      const d = new Date(t.dueDate+'T00:00:00');
      if (d >= weekStart && d <= weekEnd) {
        if (!todoMap[t.dueDate]) todoMap[t.dueDate] = [];
        todoMap[t.dueDate].push(t);
      }
    }
  }

  const monthLabel = weekStart.getMonth() === weekEnd.getMonth()
    ? `${MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`
    : `${MONTHS[weekStart.getMonth()].slice(0,3)} – ${MONTHS[weekEnd.getMonth()].slice(0,3)} ${weekEnd.getFullYear()}`;

  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
    <button class="week-nav" onclick="prevWeekCal()">&#8249; Prev</button>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-family:'Oswald',sans-serif;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--charcoal);">${monthLabel}</span>
      ${offset!==0 ? `<button class="week-nav" onclick="goToCurrentWeek()" style="font-size:.68rem;padding:2px 8px;background:var(--navy);color:white;border-color:var(--navy);">Today</button>` : `<span style="font-family:'Lato',sans-serif;font-size:.65rem;font-weight:400;color:var(--sub);">This Week</span>`}
    </div>
    <button class="week-nav" onclick="nextWeekCal()">Next &#8250;</button>
  </div>
  <div class="week-cal">`;

  for (const day of days) {
    const isToday = day.getTime() === today.getTime();
    const key = day.toISOString().slice(0,10);
    const evs = evMap[key] || [];
    const todos = todoMap[key] || [];
    const dayName = WEEKDAYS[day.getDay()];
    const dayNum = day.getDate();

    html += `<div class="week-col">
      <div class="week-col-header${isToday?' is-today':''}">
        <div class="week-day-name">${dayName}</div>
        <div class="week-day-num">${dayNum}</div>
      </div>
      <div class="week-col-body">`;

    // Events
    for (const ev of evs) {
      const color = catColor(ev.category);
      const time = ev.allDay ? '' : (ev.startTime ? fmtTime(ev.startTime) : '');
      const label = time ? `${time} ${ev.subject}` : ev.subject;
      html += `<div class="week-ev-chip" style="background:${color};" onclick="openEvent(${ev.id})" title="${esc(ev.subject)}${time?' · '+esc(time):''}">${esc(label)}</div>`;
    }

    // Todos
    for (const t of todos) {
      const overdue = !t.completed && day < today;
      const dueToday = day.getTime() === today.getTime();
      const cls = overdue ? ' overdue' : dueToday ? ' due-today' : '';
      const icon = t.completed ? '✓' : '📋';
      html += `<div class="week-todo-chip${cls}" title="${esc(t.text)}">${icon}<span>${esc(t.text)}</span></div>`;
    }

    if (!evs.length && !todos.length) {
      html += `<div style="font-size:.58rem;color:var(--border);text-align:center;padding-top:8px;">—</div>`;
    }

    html += `</div></div>`;
  }
  html += `</div>`;
  return html;
}
function prevWeekCal() {
  weekCalOffset--;
  const el = document.getElementById('week-cal-body');
  if (el) el.innerHTML = buildWeekCalendarHTML(weekCalOffset);
}
function nextWeekCal() {
  weekCalOffset++;
  const el = document.getElementById('week-cal-body');
  if (el) el.innerHTML = buildWeekCalendarHTML(weekCalOffset);
}
function goToCurrentWeek() {
  weekCalOffset = 0;
  const el = document.getElementById('week-cal-body');
  if (el) el.innerHTML = buildWeekCalendarHTML(0);
}

function prevMiniCal() {
  miniCalMonth--;
  if (miniCalMonth < 0) { miniCalMonth = 11; miniCalYear--; }
  const el = document.getElementById('mini-cal-body');
  if (el) el.innerHTML = buildMiniCalendarHTML(miniCalYear, miniCalMonth);
}
function nextMiniCal() {
  miniCalMonth++;
  if (miniCalMonth > 11) { miniCalMonth = 0; miniCalYear++; }
  const el = document.getElementById('mini-cal-body');
  if (el) el.innerHTML = buildMiniCalendarHTML(miniCalYear, miniCalMonth);
}
function miniCalDayClick(year, month, day) {
  const evs = filteredEvents.filter(ev =>
    ev.date.getFullYear()===year && ev.date.getMonth()===month && ev.date.getDate()===day
  );
  if (evs.length === 1) { openEvent(evs[0].id); return; }
  if (evs.length > 1) { setView('events'); }
}

function renderDashboard() {
  const today = new Date(); today.setHours(0,0,0,0);
  const next30 = new Date(today); next30.setDate(next30.getDate()+30);

  // Initialize mini calendar to today's month on first render (or when ministry changes)
  if (miniCalYear === null || miniCalMonth === null) {
    miniCalYear = today.getFullYear(); miniCalMonth = today.getMonth();
  }

  const total = filteredEvents.length;
  const upcoming = filteredEvents.filter(e => e.date >= today && e.date <= next30).length;
  /* Count events with any Black or Blue dept status */
  const needsAttn = filteredEvents.filter(e => DEPT_NAMES.some(d => e.depts[d]==='Black')).length;
  const inProgress = filteredEvents.filter(e => DEPT_NAMES.some(d => e.depts[d]==='Blue')).length;

  /* Dept involvement counts for this category */
  const deptCounts = {};
  for (const dept of DEPT_NAMES) deptCounts[dept] = 0;
  for (const ev of filteredEvents) {
    for (const dept of DEPT_NAMES) { if (ev.depts[dept] !== 'N/A') deptCounts[dept]++; }
  }

  const monthMap = {};
  for (const ev of filteredEvents) { const k = `${ev.date.getFullYear()}-${ev.date.getMonth()}`; monthMap[k] = (monthMap[k]||0)+1; }
  const mLabels=[], mData=[];
  for (let i=-3; i<=8; i++) {
    const d = new Date(today.getFullYear(), today.getMonth()+i, 1);
    mLabels.push(MONTHS[d.getMonth()].slice(0,3)+' \''+String(d.getFullYear()).slice(2));
    mData.push(monthMap[`${d.getFullYear()}-${d.getMonth()}`]||0);
  }

  /* Status counts across all departments */
  const statusCounts = { Green:0, Blue:0, Black:0 };
  for (const ev of filteredEvents) {
    for (const dept of DEPT_NAMES) {
      const s = ev.depts[dept];
      if (statusCounts[s] !== undefined) statusCounts[s]++;
    }
  }

  const upList = filteredEvents.filter(e=>e.date>=today&&e.date<=next30).slice(0,20);
  const topTasks = generatedTasks.filter(t => {
    const ev = allEvents.find(e=>e.id===t.eventId);
    return ev && filteredEvents.includes(ev);
  }).slice(0,10);

  const el = document.getElementById('admin-dashboard-view');
  el.innerHTML = `
    <div class="dash-section">
      <div class="dash-section-title">Overview \u2014 ${esc(CATEGORY_MAP[currentCategory].name)}</div>
      <div class="stat-cards">
        <div class="stat-card"><div class="stat-label">Total Events</div><div class="stat-val">${total.toLocaleString()}</div><div class="stat-sub">matching filters</div></div>
        <div class="stat-card c-powder"><div class="stat-label">Next 30 Days</div><div class="stat-val">${upcoming.toLocaleString()}</div><div class="stat-sub">upcoming events</div></div>
        <div class="stat-card c-alert"><div class="stat-label">Needs Attention</div><div class="stat-val">${needsAttn.toLocaleString()}</div><div class="stat-sub">Black status events</div></div>
        <div class="stat-card c-slate"><div class="stat-label">In Progress</div><div class="stat-val">${inProgress.toLocaleString()}</div><div class="stat-sub">Blue status events</div></div>
      </div>
    </div>
    <div class="dash-section">
      <div class="dash-section-title">This Week <span style="font-weight:300;color:var(--sub);font-size:.72rem;text-transform:none;letter-spacing:0;margin-left:6px;">\u2014 events &amp; tasks</span></div>
      <div class="chart-card" style="padding:14px 16px;">
        <div id="week-cal-body">${buildWeekCalendarHTML(weekCalOffset)}</div>
      </div>
    </div>
    <div class="dash-section">
      <div class="dash-section-title">Analytics</div>
      <div class="dash-charts-row" style="margin-bottom:18px;">
        <div class="chart-card"><h3>Department Involvement</h3><div class="chart-wrap" style="height:280px;"><canvas id="chart-dept"></canvas></div></div>
        <div class="chart-card"><h3>Events by Month <span class="chart-sub">\u2014 rolling 12 months</span></h3><div class="chart-wrap" style="height:280px;"><canvas id="chart-month"></canvas></div></div>
      </div>
      <div class="dash-charts-row" style="grid-template-columns:1fr 1fr 1fr;">
        <div class="chart-card"><h3>Status Breakdown</h3><div class="chart-wrap" style="height:240px;"><canvas id="chart-status"></canvas></div></div>
        <div class="chart-card"><h3>To-Do List <span class="chart-sub">\u2014 ${(()=>{ const mn=CATEGORY_MAP[currentCategory].name; const p=getCustomTodos().filter(t=>!t.completed&&t.ministry===mn); return p.length+' pending'; })()}</span></h3>
          <div style="max-height:220px;overflow-y:auto;padding-right:3px;">${(()=>{
            const mn = CATEGORY_MAP[currentCategory].name;
            const todayD = new Date(); todayD.setHours(0,0,0,0);
            const pending = getCustomTodos().filter(t => !t.completed && t.ministry === mn);
            if (!pending.length) return '<p style="color:var(--sub);font-size:.83rem;">No pending to-dos for this ministry.</p>';
            return '<div style="display:flex;flex-direction:column;gap:6px;">' + pending.map(t => {
              let dueBadge = '';
              if (t.dueDate) {
                const d = new Date(t.dueDate+'T00:00:00');
                const diff = Math.round((d-todayD)/86400000);
                const ovr = diff<0, soon = diff>=0&&diff<=1;
                const bg2 = ovr?'#fee2e2':soon?'#fef9c3':'var(--cream)';
                const cl2 = ovr?'#b91c1c':soon?'#92400e':'var(--sub)';
                const lbl = diff===0?'Today':diff===1?'Tomorrow':diff<0?`${Math.abs(diff)}d overdue`:`Due ${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}`;
                dueBadge = `<span style="font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:6px;background:${bg2};color:${cl2};">${lbl}</span>`;
              }
              return `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 10px;background:var(--surface-1);border-radius:6px;border:1px solid var(--border);cursor:pointer;" onclick="setView('tasks')">
                <input type="checkbox" onchange="toggleCustomTodo('${t.id}',this.checked)" onclick="event.stopPropagation()" style="accent-color:var(--navy);width:14px;height:14px;flex-shrink:0;margin-top:2px;cursor:pointer;" />
                <div style="flex:1;min-width:0;">
                  <div style="font-size:.8rem;font-weight:600;color:var(--charcoal);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(t.text)}</div>
                  ${dueBadge ? `<div style="margin-top:4px;">${dueBadge}</div>` : ''}
                </div>
              </div>`;
            }).join('') + '</div>';
          })()}</div>
        </div>
        <div class="chart-card"><h3>Ministry Calendar</h3><div id="mini-cal-body">${buildMiniCalendarHTML(miniCalYear, miniCalMonth)}</div></div>
      </div>
    </div>
  `;

  destroyCharts();
  Chart.defaults.font.family = "'Lato', sans-serif";
  Chart.defaults.color = '#5A6872';

  /* Department involvement doughnut */
  const dLabels = Object.keys(deptCounts).filter(d => deptCounts[d] > 0);
  const dColors = ['#003A5D','#1E5E7A','#B5712A','#7A3E5C','#2E6B5E'];
  if (dLabels.length) {
    chartInstances.dept = new Chart(document.getElementById('chart-dept'), {
      type:'doughnut', data:{ labels:dLabels, datasets:[{ data:dLabels.map(d=>deptCounts[d]), backgroundColor:dLabels.map((_,i)=>dColors[i%dColors.length]), borderWidth:2, borderColor:'white', hoverOffset:8 }] },
      options:{ cutout:'60%', plugins:{ legend:{position:'right',labels:{boxWidth:11,padding:9,font:{size:11}}}, tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.parsed.toLocaleString()} events`}} } }
    });
  }
  chartInstances.month = new Chart(document.getElementById('chart-month'), {
    type:'bar', data:{ labels:mLabels, datasets:[{label:'Events',data:mData,backgroundColor:mLabels.map((_,i)=>i===3?'#B9D2DC':'#003A5D'),borderRadius:3,hoverBackgroundColor:'#1E5E7A'}] },
    options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ x:{grid:{display:false},ticks:{font:{size:10}}}, y:{beginAtZero:true,grid:{color:'#EDEAE5'},ticks:{stepSize:1,font:{size:10}}} } }
  });
  chartInstances.status = new Chart(document.getElementById('chart-status'), {
    type:'doughnut', data:{ labels:['Green','Blue','Black'], datasets:[{data:[statusCounts.Green,statusCounts.Blue,statusCounts.Black],backgroundColor:['#22c55e','#B9D2DC','#1D252C'],borderWidth:2,borderColor:'white',hoverOffset:8}] },
    options:{ cutout:'60%', plugins:{ legend:{position:'right',labels:{boxWidth:11,padding:9,font:{size:11}}}, tooltip:{callbacks:{label:ctx=>` ${ctx.label}: ${ctx.parsed.toLocaleString()}`}} } }
  });
}

function destroyCharts() { for (const k of Object.keys(chartInstances)) { chartInstances[k].destroy(); delete chartInstances[k]; } }

/* ═══════════════════════════════════════════════════
   EVENTS LIST
═══════════════════════════════════════════════════ */
function renderEvents() {
  const el = document.getElementById('admin-events-view');
  if (!filteredEvents.length) {
    el.innerHTML = '<div class="empty-state"><svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#48565A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><h3>No events match your filters</h3><p>Adjust the filters or clear your search.</p></div>';
    return;
  }
  el.innerHTML = `<div class="ev-layout${selectedEvCardId!=null?' ev-detail-open':''}"><div class="ev-cal-panel">${buildEvMiniCal()}</div><div class="ev-list-panel" id="ev-list-panel">${buildEvList()}</div><div class="ev-detail-panel" id="ev-detail-panel">${selectedEvCardId!=null?buildEvDetailHtml(selectedEvCardId):''}</div></div>`;
}

function buildEvMiniCal() {
  const yr = eventsViewMonth.getFullYear();
  const mo = eventsViewMonth.getMonth();
  const today = new Date(); today.setHours(0,0,0,0);
  const evDays = new Set();
  for (const ev of filteredEvents) {
    if (ev.date.getFullYear() === yr && ev.date.getMonth() === mo) evDays.add(ev.date.getDate());
  }
  const monthCount = filteredEvents.filter(e => e.date.getFullYear() === yr && e.date.getMonth() === mo).length;
  const monthLabel = new Date(yr, mo, 1).toLocaleDateString('en-US', {month:'long', year:'numeric'});
  const firstDow = new Date(yr, mo, 1).getDay();
  const daysInMo = new Date(yr, mo+1, 0).getDate();
  const allActive = !eventsViewDay;
  let html = `<div class="mini-cal-hdr"><button class="mini-cal-nav-btn" onclick="evMonthNav(-1)">‹</button><span class="mini-cal-hdr-title">${monthLabel}</span><button class="mini-cal-nav-btn" onclick="evMonthNav(1)">›</button></div>`;
  html += `<div class="mini-cal-grid">${['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>`<div class="mini-cal-dow">${d}</div>`).join('')}`;
  for (let i = 0; i < firstDow; i++) html += `<div></div>`;
  for (let d = 1; d <= daysInMo; d++) {
    const dt = new Date(yr, mo, d); dt.setHours(0,0,0,0);
    const isToday = dt.getTime() === today.getTime();
    const isSel = eventsViewDay && eventsViewDay.getTime() === dt.getTime();
    const hasEv = evDays.has(d);
    const cls = ['mini-cal-day', isToday?'ev-today':'', isSel?'ev-selected':'', hasEv?'ev-has-events':''].filter(Boolean).join(' ');
    html += `<div class="${cls}" onclick="selectEvDay(${yr},${mo},${d})">${d}</div>`;
  }
  html += `</div><button class="mini-cal-all-btn${allActive?' active':''}" onclick="selectEvDay(null)"><span>All this month</span><span>${monthCount} event${monthCount!==1?'s':''}</span></button>`;
  return html;
}

function buildEvList() {
  const yr = eventsViewMonth.getFullYear();
  const mo = eventsViewMonth.getMonth();
  const today = new Date(); today.setHours(0,0,0,0);
  let evs;
  if (eventsViewDay) {
    evs = filteredEvents.filter(ev => { const d = new Date(ev.date); d.setHours(0,0,0,0); return d.getTime() === eventsViewDay.getTime(); });
  } else {
    evs = filteredEvents.filter(ev => ev.date.getFullYear() === yr && ev.date.getMonth() === mo);
  }
  const headingLabel = eventsViewDay
    ? eventsViewDay.toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'})
    : new Date(yr, mo, 1).toLocaleDateString('en-US', {month:'long', year:'numeric'});
  let html = `<div class="ev-list-heading">${headingLabel}<span class="ev-count-chip">${evs.length} event${evs.length!==1?'s':''}</span></div>`;
  if (!evs.length) {
    html += `<div class="empty-state" style="padding-top:60px;"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#48565A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><h3>No events</h3><p>${eventsViewDay?'No events on this day.':'No events this month.'}</p></div>`;
    return html;
  }
  const groups = {};
  for (const ev of evs) { const k=fmtDateKey(ev.date); if(!groups[k]) groups[k]={date:ev.date,events:[]}; groups[k].events.push(ev); }
  const todayKey = fmtDateKey(today);
  for (const k of Object.keys(groups).sort()) {
    const {date,events} = groups[k];
    const isTd = k===todayKey;
    html += `<div class="day-group"><div class="day-hdr"><div class="day-badge${isTd?' is-today':''}">${date.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div><div class="day-name">${date.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}${isTd?'<span class="today-chip">Today</span>':''}</div><div class="day-line"></div></div>`;
    html += '<div class="events-grid">';
    for (const ev of events) {
      const color = catColor(ev.category);
      const timeStr = ev.allDay ? 'All Day' : (ev.startTime?fmtTime(ev.startTime):'') + (ev.endTime?' \u2013 '+fmtTime(ev.endTime):'');
      const involvedDepts = DEPT_NAMES.filter(d => ev.depts[d] !== 'N/A');
      const deptBadgesHtml = involvedDepts.map(d => {
        const s = ev.depts[d];
        const sBg = {Green:'#f0fdf4',Blue:'#EBF4FA',Black:'#1D252C'}[s]||'#F2F0EC';
        const sFg = {Green:'#15803d',Blue:'#1558A0',Black:'white'}[s]||'#5A6872';
        return `<span class="d-badge" style="background:${sBg};color:${sFg};"><span class="dn">${esc(d)}:</span> ${esc(s)}</span>`;
      }).join('');
      const evTasks = generatedTasks.filter(t=>t.eventId===ev.id);
      const taskBadges = evTasks.map(t=>{
        const bg={urgent:'var(--alert)',pending:'#1558A0',upcoming:'#B5712A'}[t.type]||'var(--slate)';
        return `<span class="task-badge" style="background:${bg};color:white;">${esc(t.label)}</span>`;
      }).join('');
      const evBud = getEventBudgets()[ev.subject];
      const budChip = evBud ? `<span class="ev-bud-chip">💰 $${Math.round(evBud.total).toLocaleString()}</span>` : '';
      const isSelCard = ev.id === selectedEvCardId;
      html += `<div class="event-card${isSelCard?' ev-card-selected':''}" style="--cat-color:${color}" onclick="openEvDetail(${ev.id})">
        <div class="ev-top"><div class="ev-title">${esc(ev.subject)}</div><div style="display:flex;gap:4px;align-items:center;flex-shrink:0;">${ev.seriesIndex ? `<span style="font-size:.5rem;font-weight:700;background:#E5E1DB;color:var(--slate);padding:2px 6px;border-radius:8px;white-space:nowrap;letter-spacing:.03em;">#${ev.seriesIndex}/${ev.seriesTotal}</span>` : ''}${ev.secondaryCategory ? `<span class="cat-tag" style="background:${catColor(ev.secondaryCategory)};font-size:.52rem;opacity:.85;">+${esc(ev.secondaryCategory)}</span>` : ''}</div></div>
        ${(timeStr||ev.location)?`<div class="ev-meta">${timeStr?`<div class="meta-row"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${esc(timeStr)}</div>`:''}${ev.location?`<div class="meta-row"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${esc(ev.location)}</div>`:''}</div>`:''}
        ${deptBadgesHtml?`<div class="dept-badges">${deptBadgesHtml}</div>`:''}
        ${taskBadges?`<div class="dept-badges" style="margin-top:2px;">${taskBadges}</div>`:''}
        ${budChip?`<div style="margin-top:4px;">${budChip}</div>`:''}
      </div>`;
    }
    html += '</div></div>';
  }
  return html;
}

function evMonthNav(dir) {
  eventsViewMonth = new Date(eventsViewMonth.getFullYear(), eventsViewMonth.getMonth() + dir, 1);
  eventsViewDay = null;
  selectedEvCardId = null;
  renderEvents();
}

function selectEvDay(yr, mo, d) {
  if (yr === null) {
    eventsViewDay = null;
  } else {
    const nd = new Date(yr, mo, d); nd.setHours(0,0,0,0);
    eventsViewDay = (eventsViewDay && eventsViewDay.getTime() === nd.getTime()) ? null : nd;
  }
  selectedEvCardId = null;
  const layout = document.querySelector('.ev-layout');
  if (layout) layout.classList.remove('ev-detail-open');
  const detPanel = document.getElementById('ev-detail-panel');
  if (detPanel) detPanel.innerHTML = '';
  const calPanel = document.querySelector('.ev-cal-panel');
  const listPanel = document.getElementById('ev-list-panel');
  if (calPanel) calPanel.innerHTML = buildEvMiniCal();
  if (listPanel) listPanel.innerHTML = buildEvList();
}

function openEvDetail(id) {
  selectedEvCardId = id;
  const layout = document.querySelector('.ev-layout');
  if (layout) layout.classList.add('ev-detail-open');
  const listPanel = document.getElementById('ev-list-panel');
  if (listPanel) listPanel.innerHTML = buildEvList();
  const detPanel = document.getElementById('ev-detail-panel');
  if (detPanel) detPanel.innerHTML = buildEvDetailHtml(id);
}

function closeEvDetail() {
  selectedEvCardId = null;
  const layout = document.querySelector('.ev-layout');
  if (layout) layout.classList.remove('ev-detail-open');
  const detPanel = document.getElementById('ev-detail-panel');
  if (detPanel) detPanel.innerHTML = '';
  const listPanel = document.getElementById('ev-list-panel');
  if (listPanel) listPanel.innerHTML = buildEvList();
}

function buildEvDetailHtml(id) {
  const ev = allEvents.find(e => e.id === id);
  if (!ev) return '';
  const color = catColor(ev.category);
  const timeStr = ev.allDay ? 'All Day' : (ev.startTime ? fmtTime(ev.startTime) : '') + (ev.endTime ? ' \u2013 ' + fmtTime(ev.endTime) : '');
  const today = new Date(); today.setHours(0,0,0,0);
  const cd = evCountdown(ev, today);

  // Dept grid
  const deptHtml = DEPT_NAMES.map(dept => {
    const s = ev.depts[dept] || 'N/A';
    const cls = statusCls(s);
    const hasMenu = SERVICE_MENU[dept] != null;
    return `<div class="dept-card ${cls}${hasMenu?' clickable':''}"${hasMenu?` onclick="openServiceMenu(${ev.id},'${dept}')"`:''}>
      <div class="dept-card-name">${dept}</div><div class="dept-card-status">${s}${hasMenu?' <span style="font-size:.6rem;opacity:.55;">▶</span>':''}</div>
    </div>`;
  }).join('');

  // Generated tasks
  const evTasks = generatedTasks.filter(t => t.eventId === id);

  // Custom todos linked to this event
  const linkedTodos = getCustomTodos().filter(t => t.eventId === id);
  const priColors = {low:'#65a30d',medium:'#d97706',high:'#dc2626',urgent:'#7c3aed'};
  const priBg    = {low:'#f7fee7',medium:'#fffbeb',high:'#fef2f2',urgent:'#f5f3ff'};

  // Event URL
  const eventUrl = getEventUrl(ev.subject);

  let html = '';

  // ── Header ──
  html += `<div class="evd-header" style="border-top:3px solid ${color};">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px;">
      <div style="flex:1;min-width:0;">
        <div style="font-family:'Oswald',sans-serif;font-size:1.1rem;font-weight:600;color:var(--charcoal);line-height:1.25;margin-bottom:7px;">${esc(ev.subject)}</div>
        <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
          <span class="cat-tag" style="background:${color}">${esc(ev.category)}</span>
          ${ev.secondaryCategory ? `<span class="cat-tag" style="background:${catColor(ev.secondaryCategory)};font-size:.52rem;opacity:.85;">+${esc(ev.secondaryCategory)}</span>` : ''}
          ${ev.seriesIndex ? `<span style="font-size:.58rem;font-weight:700;background:#E5E1DB;color:var(--slate);padding:2px 7px;border-radius:8px;letter-spacing:.03em;">#${ev.seriesIndex} of ${ev.seriesTotal}</span>` : ''}
          ${cd ? `<span style="font-size:.62rem;font-weight:700;padding:2px 8px;border-radius:10px;background:${cd.bg};color:${cd.clr};border:1px solid ${cd.border};">${cd.label==='Passed'?'Passed':cd.label==='Today!'?'Today':cd.label+' away'}</span>` : ''}
        </div>
      </div>
      <button onclick="closeEvDetail()" style="background:none;border:none;cursor:pointer;color:var(--sub);font-size:1.15rem;padding:2px 5px;flex-shrink:0;line-height:1;" title="Close">✕</button>
    </div>
  </div>`;

  html += `<div class="evd-body">`;

  // ── Date / Time / Location ──
  html += `<div><div class="evd-section-title">When &amp; Where</div>
    <div style="display:flex;flex-direction:column;gap:7px;">
      <div class="evd-meta-row"><svg class="evd-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <div><strong>${esc(fmtDateFull(ev.date))}</strong>${timeStr ? `<span style="color:var(--sub);"> · ${esc(timeStr)}</span>` : ''}</div>
      </div>
      ${ev.location ? `<div class="evd-meta-row"><svg class="evd-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><div>${esc(ev.location)}</div></div>` : ''}
    </div>
  </div>`;

  // ── Support Teams ──
  html += `<div><div class="evd-section-title">Support Teams</div><div class="dept-grid">${deptHtml}</div></div>`;

  // ── Generated Tasks ──
  if (evTasks.length) {
    html += `<div><div class="evd-section-title">Auto-Generated Tasks</div><div style="display:flex;flex-direction:column;gap:5px;">`;
    html += evTasks.map(t => {
      const bg = {urgent:'var(--alert)',pending:'#1558A0',upcoming:'#B5712A'}[t.type]||'var(--slate)';
      return `<div style="background:${color}08;border:1px solid ${color}25;border-left:3px solid ${color};border-radius:6px;padding:8px 10px;">
        <span class="task-priority" style="background:${bg};margin-bottom:4px;display:inline-block;">${esc(t.label)}</span>
        <div style="font-size:.72rem;color:var(--sub);">${esc(t.description)}</div>
      </div>`;
    }).join('');
    html += `</div></div>`;
  }

  // ── Custom To-dos ──
  html += `<div><div class="evd-section-title" style="display:flex;align-items:center;justify-content:space-between;">
    <span>Tasks (${linkedTodos.filter(t=>!t.completed).length} pending)</span>
  </div>`;
  if (linkedTodos.length) {
    html += `<div style="display:flex;flex-direction:column;gap:4px;">`;
    html += linkedTodos.map(t => {
      const isDone = t.completed;
      const pri = t.priority;
      return `<div class="evd-task-row${isDone?' done':''}" onclick="openTaskDetail('${String(t.id)}')">
        <input type="checkbox" ${isDone?'checked':''} onchange="event.stopPropagation();setPendingComplete('${String(t.id)}',this.checked);" onclick="event.stopPropagation();" style="margin-top:1px;cursor:pointer;flex-shrink:0;" />
        <div style="flex:1;min-width:0;">
          <div style="${isDone?'text-decoration:line-through;color:var(--sub);':''}">${esc(t.text)}</div>
          ${pri ? `<span style="font-size:.6rem;font-weight:700;background:${priBg[pri]||'#f3f4f6'};color:${priColors[pri]||'#6b7280'};padding:1px 6px;border-radius:8px;">${pri}</span>` : ''}
        </div>
      </div>`;
    }).join('');
    html += `</div>`;
  } else {
    html += `<div class="evd-empty-tasks">No tasks yet for this event.</div>`;
  }
  html += `</div>`;

  // ── Event URL ──
  html += `<div><div class="evd-section-title">Event Page Link</div>
    ${eventUrl
      ? `<a href="${esc(eventUrl)}" target="_blank" rel="noopener" class="event-url-link"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> View on Watermark.org</a>`
      : `<div style="display:flex;gap:6px;"><input type="text" id="evd-url-input" class="event-url-input" placeholder="Paste watermark.org/events/… URL" onkeydown="if(event.key==='Enter')saveEventUrl(${ev.id},this.value)" /><button class="event-url-save" onclick="saveEventUrl(${ev.id},document.getElementById('evd-url-input').value)">Save</button></div>`
    }
  </div>`;

  // ── Budget Estimate ──
  const evBudget = getEventBudgets()[ev.subject];
  if (evBudget) {
    html += `<div>
      <div class="evd-section-title">💰 Budget Estimate</div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
        <div>
          <div style="font-size:1.35rem;font-weight:700;color:#15803d;font-family:'Oswald',sans-serif;">$${Math.round(evBudget.total).toLocaleString()}</div>
          <div style="font-size:.68rem;color:var(--sub);margin-top:2px;">Applied ${new Date(evBudget.updatedAt).toLocaleDateString()}</div>
        </div>
        <button onclick="openBudgetFromAdmin(${ev.id})" style="font-size:.72rem;font-weight:700;color:var(--navy);background:none;border:1px solid var(--navy);border-radius:6px;padding:6px 12px;cursor:pointer;white-space:nowrap;">Edit in Budget Planner →</button>
      </div>
    </div>`;
  } else {
    html += `<div>
      <div class="evd-section-title">💰 Budget Estimate</div>
      <div style="font-size:.78rem;color:var(--sub);padding:6px 0;">No budget applied yet. <button onclick="openBudgetFromAdmin(${ev.id})" style="background:none;border:none;padding:0;font-size:.78rem;font-weight:700;color:var(--navy);cursor:pointer;">Open Budget Planner →</button></div>
    </div>`;
  }

  // ── Room Reservations ──
  const evRsvs = getRoomReservations().filter(r => r.linkedEventSubject === ev.subject);
  if (evRsvs.length) {
    const roomList = getRoomList();
    const rsvRows = evRsvs.map(r => {
      const rm = roomList.find(x => x.id === r.roomId);
      return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:.75rem;">
        <span style="font-size:.85rem;">🏢</span>
        <div><div style="font-weight:700;color:var(--charcoal);">${esc(rm ? rm.name : r.roomId)}</div>
        <div style="color:var(--sub);">${esc(r.startTime)} – ${esc(r.endTime)}${r.date?' · '+r.date:''}</div></div>
      </div>`;
    }).join('');
    html += `<div>
      <div class="evd-section-title">🏢 Room Reservations</div>
      <div>${rsvRows}</div>
      <button onclick="openInRoomsFromAdmin(${ev.id})" style="display:inline-block;margin-top:8px;font-size:.7rem;font-weight:700;color:var(--navy);background:none;border:none;padding:0;cursor:pointer;">View in Room Planner →</button>
    </div>`;
  } else {
    html += `<div>
      <div class="evd-section-title">🏢 Room Reservations</div>
      <div style="font-size:.78rem;color:var(--sub);padding:6px 0;">No rooms booked. <button onclick="openInRoomsFromAdmin(${ev.id})" style="background:none;border:none;padding:0;font-size:.78rem;font-weight:700;color:var(--navy);cursor:pointer;">Open Room Planner →</button></div>
    </div>`;
  }

  html += `</div>`; // close evd-body
  return html;
}

/* ═══════════════════════════════════════════════════
   EVENT REQUEST QUESTIONNAIRE
═══════════════════════════════════════════════════ */
function renderRequestForm() {
  const el = document.getElementById('admin-request-view');
  // Only re-render if empty (preserve form state)
  if (el.querySelector('.form-section')) return;

  let html = '<div class="form-progress" id="form-progress">';
  FORM_SECTIONS.forEach((s,i) => { html += `<div class="form-progress-step" data-label="${s.title}" data-idx="${i}" onclick="scrollToSection(${i})"></div>`; });
  html += '</div>';

  // Section 1: Event Basics
  html += `<div class="form-section" id="fs-0"><div class="form-section-title"><span class="form-section-num">1</span>Event Basics</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Event Name *</label><input class="form-input" id="f-name" placeholder="Enter event name" /></div>
    <div class="form-group"><label class="form-label">Category</label><select class="form-select" id="f-category"><option value="">Select category</option>${Object.keys(CATEGORIES).map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('')}<option value="Other">Other</option></select></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Event Date *</label><input class="form-input" type="date" id="f-date" /></div>
    <div class="form-group"><label class="form-label">Location</label><input class="form-input" id="f-location" placeholder="Building, room, etc." /></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Start Time</label><input class="form-input" type="time" id="f-start-time" /></div>
    <div class="form-group"><label class="form-label">End Time</label><input class="form-input" type="time" id="f-end-time" /></div></div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="f-description" placeholder="Describe the event..."></textarea></div>
    <div class="form-group"><label class="form-label">Recurring Event?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="recurring" value="no" checked onchange="toggleRecurring()" />No</label><label class="form-radio-item"><input type="radio" name="recurring" value="yes" onchange="toggleRecurring()" />Yes</label></div></div>
    <div class="form-conditional" id="recurring-fields" style="display:none;"><div class="form-row"><div class="form-group"><label class="form-label">Frequency</label><select class="form-select" id="f-frequency"><option>Weekly</option><option>Biweekly</option><option>Monthly</option></select></div><div class="form-group"><label class="form-label">End Date</label><input class="form-input" type="date" id="f-recur-end" /></div></div></div>
  </div>`;

  // Section 2: IT Needs
  html += `<div class="form-section" id="fs-1"><div class="form-section-title"><span class="form-section-num">2</span>IT Needs</div>
    <div class="form-group"><label class="form-label">AV Equipment Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="av" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="av" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Equipment (select all that apply)</label><div class="form-cb-group">${['Projector','Microphones','Sound Board','Monitors','Confidence Monitors','Stage Monitors'].map(e=>`<label class="form-cb-item"><input type="checkbox" name="equipment" value="${e}" />${e}</label>`).join('')}</div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Live Streaming?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="streaming" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="streaming" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Recording?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="recording" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="recording" value="yes" />Yes</label></div></div></div>
    <div class="form-group"><label class="form-label">Special Tech Requirements</label><textarea class="form-textarea" id="f-special-tech" placeholder="Any other tech needs..."></textarea></div>
  </div>`;

  // Section 3: Facility Needs
  html += `<div class="form-section" id="fs-2"><div class="form-section-title"><span class="form-section-num">3</span>Facility Needs</div>
    <div class="form-group"><label class="form-label">Room Setup Required?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="setup" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="setup" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Setup Style</label><select class="form-select" id="f-setup-style"><option value="">Select style</option><option>Theater</option><option>Classroom</option><option>Banquet</option><option>U-Shape</option><option>Boardroom</option><option>Open Floor</option><option>Custom</option></select></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Cleaning Before Event?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="clean-before" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="clean-before" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Cleaning After Event?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="clean-after" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="clean-after" value="yes" />Yes</label></div></div></div>
    <div class="form-group"><label class="form-label">Parking Arrangements</label><textarea class="form-textarea" id="f-parking" placeholder="Special parking needs..."></textarea></div>
    <div class="form-group"><label class="form-label">Special Facility Notes</label><textarea class="form-textarea" id="f-facility-notes" placeholder="Additional facility needs..."></textarea></div>
  </div>`;

  // Section 4: Kids Ministry
  html += `<div class="form-section" id="fs-3"><div class="form-section-title"><span class="form-section-num">4</span>Kids Ministry</div>
    <div class="form-group"><label class="form-label">Childcare Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="childcare" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="childcare" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Age Groups (select all that apply)</label><div class="form-cb-group">${['Infants','Toddlers','Preschool','Elementary K-2','Elementary 3-5'].map(a=>`<label class="form-cb-item"><input type="checkbox" name="age-groups" value="${a}" />${a}</label>`).join('')}</div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Expected Number of Kids</label><input class="form-input" type="number" id="f-kids-count" min="0" placeholder="0" /></div>
    <div class="form-group"><label class="form-label">Volunteers Needed</label><input class="form-input" type="number" id="f-kids-volunteers" min="0" placeholder="0" /></div></div>
    <div class="form-group"><label class="form-label">Special Kids Ministry Notes</label><textarea class="form-textarea" id="f-kids-notes" placeholder="Additional notes..."></textarea></div>
  </div>`;

  // Section 5: Worship
  html += `<div class="form-section" id="fs-4"><div class="form-section-title"><span class="form-section-num">5</span>Worship</div>
    <div class="form-group"><label class="form-label">Worship Team Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="worship-team" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="worship-team" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Rehearsal Date/Time</label><input class="form-input" type="datetime-local" id="f-rehearsal" /></div>
    <div class="form-group"><label class="form-label">Special Songs or Sets</label><textarea class="form-textarea" id="f-songs" placeholder="Song list or set details..."></textarea></div>
    <div class="form-group"><label class="form-label">Additional Worship Notes</label><textarea class="form-textarea" id="f-worship-notes" placeholder="Additional notes..."></textarea></div>
  </div>`;

  // Section 6: Production
  html += `<div class="form-section" id="fs-5"><div class="form-section-title"><span class="form-section-num">6</span>Production</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Sound Requirements</label><textarea class="form-textarea" id="f-sound" placeholder="Sound needs..."></textarea></div>
    <div class="form-group"><label class="form-label">Lighting Requirements</label><textarea class="form-textarea" id="f-lighting" placeholder="Lighting needs..."></textarea></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Video Requirements</label><textarea class="form-textarea" id="f-video" placeholder="Video needs..."></textarea></div>
    <div class="form-group"><label class="form-label">Stage Setup</label><textarea class="form-textarea" id="f-stage" placeholder="Stage layout..."></textarea></div></div>
    <div class="form-group"><label class="form-label">Special Production Needs</label><textarea class="form-textarea" id="f-prod-notes" placeholder="Additional production notes..."></textarea></div>
  </div>`;

  // Section 7: Check-in
  html += `<div class="form-section" id="fs-6"><div class="form-section-title"><span class="form-section-num">7</span>Check-in</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Check-in Stations Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="checkin-stations" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="checkin-stations" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Number of Stations</label><input class="form-input" type="number" id="f-stations" min="0" placeholder="0" /></div></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Volunteer Greeters Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="greeters" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="greeters" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Number of Greeters</label><input class="form-input" type="number" id="f-greeters" min="0" placeholder="0" /></div></div>
    <div class="form-group"><label class="form-label">Registration Type</label><select class="form-select" id="f-reg-type"><option value="">Select type</option><option>Pre-registration</option><option>Walk-in</option><option>Both</option></select></div>
  </div>`;

  // Section 8: Security
  html += `<div class="form-section" id="fs-7"><div class="form-section-title"><span class="form-section-num">8</span>Security</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Security Team Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="security-team" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="security-team" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Number of Security Personnel</label><input class="form-input" type="number" id="f-security-count" min="0" placeholder="0" /></div></div>
    <div class="form-group"><label class="form-label">Special Security Concerns</label><textarea class="form-textarea" id="f-security-concerns" placeholder="Any security concerns..."></textarea></div>
    <div class="form-group"><label class="form-label">Expected Crowd Size</label><input class="form-input" type="number" id="f-crowd-size" min="0" placeholder="0" /></div>
  </div>`;

  // Section 9: Communications
  html += `<div class="form-section" id="fs-8"><div class="form-section-title"><span class="form-section-num">9</span>Communications</div>
    <div class="form-group"><label class="form-label">Marketing Needed?</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="marketing" value="no" checked />No</label><label class="form-radio-item"><input type="radio" name="marketing" value="yes" />Yes</label></div></div>
    <div class="form-group"><label class="form-label">Announcement Channels (select all that apply)</label><div class="form-cb-group">${['Sunday Announcement','Email Newsletter','Social Media','Website','App Notification','Print Material'].map(c=>`<label class="form-cb-item"><input type="checkbox" name="channels" value="${c}" />${c}</label>`).join('')}</div></div>
    <div class="form-group"><label class="form-label">Design Needs</label><textarea class="form-textarea" id="f-design-needs" placeholder="Graphics, videos, print materials..."></textarea></div>
    <div class="form-group"><label class="form-label">Marketing Timeline</label><input class="form-input" id="f-marketing-timeline" placeholder="e.g., Start promotions 4 weeks before" /></div>
  </div>`;

  // Section 10: Room Reservations
  html += `<div class="form-section" id="fs-9"><div class="form-section-title"><span class="form-section-num">10</span>Room Reservations
    <a href="rooms.html" target="_blank" style="font-size:.68rem;font-weight:700;color:var(--navy);text-decoration:none;margin-left:auto;padding:4px 10px;border:1px solid var(--navy);border-radius:5px;">🏢 View Availability →</a>
  </div>
    <div id="room-entries"></div>
    <button class="add-room-btn" onclick="addRoom()">+ Add Room</button>
  </div>`;

  // Section 11: Room Configurations
  html += `<div class="form-section" id="fs-10"><div class="form-section-title"><span class="form-section-num">11</span>Room Configurations</div>
    <div class="form-group"><label class="form-label">Setup Style</label><select class="form-select" id="f-config-style"><option value="">Select style</option><option>Theater</option><option>Classroom</option><option>Banquet</option><option>U-Shape</option><option>Boardroom</option><option>Hollow Square</option><option>Custom</option></select></div>
    <div class="form-group"><label class="form-label">Capacity</label><input class="form-input" type="number" id="f-capacity" min="0" placeholder="0" /></div>
    <div class="form-group"><label class="form-label">Special Furniture (select all that apply)</label><div class="form-cb-group">${['Podium','Projector Screen','Whiteboard','Easels','Extra Tables','Extra Chairs'].map(f=>`<label class="form-cb-item"><input type="checkbox" name="furniture" value="${f}" />${f}</label>`).join('')}</div></div>
    <div class="form-group"><label class="form-label">Configuration Notes</label><textarea class="form-textarea" id="f-config-notes" placeholder="Additional setup details..."></textarea></div>
  </div>`;

  // Section 12: Attendance
  html += `<div class="form-section" id="fs-11"><div class="form-section-title"><span class="form-section-num">12</span>Attendance</div>
    <div class="form-group"><label class="form-label">Predicted Attendance</label><input class="form-input" type="number" id="f-attendance" min="0" placeholder="0" /></div>
    <div class="form-group"><label class="form-label">Historical Comparison Notes</label><textarea class="form-textarea" id="f-historical" placeholder="How does this compare to past events..."></textarea></div>
    <div class="form-group"><label class="form-label">Capacity Planning Notes</label><textarea class="form-textarea" id="f-cap-planning" placeholder="Overflow plans, seating arrangements..."></textarea></div>
  </div>`;

  // Section 13: Financial
  html += `<div class="form-section" id="fs-12"><div class="form-section-title"><span class="form-section-num">13</span>Financial</div>
    <div class="form-row"><div class="form-group"><label class="form-label">Budget Estimate ($)</label><input class="form-input" type="number" id="f-budget" min="0" step="0.01" placeholder="0.00" /></div>
    <div class="form-group"><label class="form-label">Revenue Projection ($)</label><input class="form-input" type="number" id="f-revenue" min="0" step="0.01" placeholder="0.00" /></div></div>
    <div class="form-group"><label class="form-label">Expenses Breakdown</label><textarea class="form-textarea" id="f-expenses" placeholder="List major expense items..."></textarea></div>
  </div>`;

  // Section 14: Registration Type
  html += `<div class="form-section" id="fs-13"><div class="form-section-title"><span class="form-section-num">14</span>Registration Type</div>
    <div class="form-group"><label class="form-label">Event Type</label><div class="form-radio-group"><label class="form-radio-item"><input type="radio" name="event-type" value="free" checked onchange="toggleEventType()" />Free Sign-up</label><label class="form-radio-item"><input type="radio" name="event-type" value="paid" onchange="toggleEventType()" />Paid Event</label></div></div>
    <div class="form-conditional" id="paid-fields" style="display:none;"><div class="form-row"><div class="form-group"><label class="form-label">Ticket Price ($)</label><input class="form-input" type="number" id="f-ticket-price" min="0" step="0.01" placeholder="0.00" /></div><div class="form-group"><label class="form-label">Payment Processing</label><select class="form-select" id="f-payment"><option>Online</option><option>At Door</option><option>Both</option></select></div></div></div>
    <div class="form-conditional" id="free-fields"><div class="form-group"><label class="form-label">Sign-up Method</label><input class="form-input" id="f-signup-method" placeholder="e.g., Website form, sign-up sheet" /></div></div>
  </div>`;

  html += '<button class="generate-btn" onclick="generateSummary()">Generate Event Request Summary</button>';
  html += '<div id="request-summary" style="display:none;"></div>';

  el.innerHTML = html;
  renderRoomEntries();
  setupFormProgress();
}

function toggleRecurring() {
  const yes = document.querySelector('input[name="recurring"][value="yes"]').checked;
  document.getElementById('recurring-fields').style.display = yes ? 'block' : 'none';
}
function toggleEventType() {
  const paid = document.querySelector('input[name="event-type"][value="paid"]').checked;
  document.getElementById('paid-fields').style.display = paid ? 'block' : 'none';
  document.getElementById('free-fields').style.display = paid ? 'none' : 'block';
}

function addRoom() {
  const date  = (document.getElementById('f-date')||{}).value || '';
  const start = (document.getElementById('f-start-time')||{}).value || '';
  const end   = (document.getElementById('f-end-time')||{}).value || '';
  roomEntries.push({building:'', roomIds:[], date, startTime:start, endTime:end, repeat:'none', repeatUntil:''});
  renderRoomEntries();
}
function removeRoom(i) {
  roomEntries.splice(i, 1);
  if (!roomEntries.length) roomEntries.push({building:'', roomIds:[], date:'', startTime:'', endTime:'', repeat:'none', repeatUntil:''});
  renderRoomEntries();
}
function roomEntrySetBuilding(i, bldg) {
  roomEntries[i].building = bldg;
  roomEntries[i].roomIds  = [];  // reset selection when building changes
  renderRoomEntries();
}
function roomEntryToggleRoom(i, roomId, checked) {
  const ids = roomEntries[i].roomIds;
  if (checked) { if (!ids.includes(roomId)) ids.push(roomId); }
  else { roomEntries[i].roomIds = ids.filter(id => id !== roomId); }
}
function roomEntrySetRepeat(i, val) {
  roomEntries[i].repeat = val;
  const untilEl = document.getElementById('re-until-' + i);
  if (untilEl) untilEl.style.display = val !== 'none' ? 'block' : 'none';
}
function renderRoomEntries() {
  const el = document.getElementById('room-entries'); if (!el) return;
  const allRooms = getRoomList();
  const buildings = [...new Set(allRooms.map(r => r.building))];
  const bldgOpts = `<option value="">— select building —</option>` +
    buildings.map(b => `<option value="${esc(b)}">${esc(b)}</option>`).join('');

  el.innerHTML = roomEntries.map((r, i) => {
    // Building select
    const bldgSel = `<select class="form-select" onchange="roomEntrySetBuilding(${i},this.value)">
      ${bldgOpts.replace(`value="${esc(r.building)}"`, `value="${esc(r.building)}" selected`)}
    </select>`;

    // Room checkboxes — filtered to selected building
    let cbHtml = '';
    if (r.building) {
      const bldgRooms = allRooms.filter(rm => rm.building === r.building);
      if (bldgRooms.length) {
        cbHtml = `<div class="room-cb-wrap"><div class="room-cb-grid">` +
          bldgRooms.map(rm => {
            const chk = r.roomIds.includes(rm.id) ? ' checked' : '';
            return `<label class="room-cb-item">
              <input type="checkbox"${chk} onchange="roomEntryToggleRoom(${i},'${esc(rm.id)}',this.checked)">
              ${esc(rm.name)}
            </label>`;
          }).join('') + `</div></div>`;
      } else {
        cbHtml = `<div class="room-cb-wrap"><div class="room-cb-empty">No rooms configured for this building.</div></div>`;
      }
    } else {
      cbHtml = `<div class="room-cb-wrap"><div class="room-cb-empty">Select a building above to see available rooms.</div></div>`;
    }

    // Recurrence
    const repeatOpts = ['none','weekly','biweekly','monthly']
      .map(v => `<option value="${v}"${r.repeat===v?' selected':''}>${
        v==='none'?'No Repeat':v==='biweekly'?'Bi-weekly':v.charAt(0).toUpperCase()+v.slice(1)
      }</option>`).join('');
    const untilDisplay = r.repeat !== 'none' ? 'block' : 'none';

    return `<div class="room-entry">
      <div class="room-entry-header">
        <span class="room-entry-num">Room Booking ${i + 1}</span>
        <button class="remove-room-btn" onclick="removeRoom(${i})" title="Remove">✕ Remove</button>
      </div>
      <div class="room-entry-row two">
        <div class="form-group"><label class="form-label">Building</label>${bldgSel}</div>
      </div>
      <div class="form-group" style="margin-bottom:8px;">
        <label class="form-label">Rooms <span style="color:var(--sub);font-weight:400;">(select one or more)</span></label>
        ${cbHtml}
      </div>
      <div class="room-entry-row">
        <div class="form-group"><label class="form-label">Date</label>
          <input class="form-input" type="date" value="${r.date}" onchange="roomEntries[${i}].date=this.value"></div>
        <div class="form-group"><label class="form-label">Start Time</label>
          <input class="form-input" type="time" value="${r.startTime}" onchange="roomEntries[${i}].startTime=this.value"></div>
        <div class="form-group"><label class="form-label">End Time</label>
          <input class="form-input" type="time" value="${r.endTime}" onchange="roomEntries[${i}].endTime=this.value"></div>
      </div>
      <div class="recur-row">
        <div class="form-group"><label class="form-label">Repeat</label>
          <select class="form-select" onchange="roomEntrySetRepeat(${i},this.value)">
            ${repeatOpts}
          </select>
        </div>
        <div class="form-group recur-until" id="re-until-${i}" style="display:${untilDisplay};">
          <label class="form-label">Repeat Until</label>
          <input class="form-input" type="date" value="${r.repeatUntil}" onchange="roomEntries[${i}].repeatUntil=this.value">
        </div>
      </div>
    </div>`;
  }).join('');
}

function setupFormProgress() {
  const steps = document.querySelectorAll('.form-progress-step');
  const sections = FORM_SECTIONS.map((_,i) => document.getElementById('fs-'+i));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.id.replace('fs-',''));
        steps.forEach((s,i) => { s.classList.toggle('active', i===idx); s.classList.toggle('complete', i<idx); });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => { if(s) observer.observe(s); });
}
function scrollToSection(i) {
  const s = document.getElementById('fs-'+i);
  if (s) s.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ═══════════════════════════════════════════════════
   SUMMARY GENERATION
═══════════════════════════════════════════════════ */
function gv(id) { const e=document.getElementById(id); return e?e.value.trim():''; }
function rv(name) { const r=document.querySelector(`input[name="${name}"]:checked`); return r?r.value:''; }
function cvs(name) { return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(c=>c.value); }

function generateSummary() {
  const data = {
    name: gv('f-name'), date: gv('f-date'), startTime: gv('f-start-time'), endTime: gv('f-end-time'),
    location: gv('f-location'), category: gv('f-category'), description: gv('f-description'),
    recurring: rv('recurring'), frequency: gv('f-frequency'), recurEnd: gv('f-recur-end'),
    av: rv('av'), equipment: cvs('equipment'), streaming: rv('streaming'), recording: rv('recording'), specialTech: gv('f-special-tech'),
    setupRequired: rv('setup'), setupStyle: gv('f-setup-style'), cleanBefore: rv('clean-before'), cleanAfter: rv('clean-after'), parking: gv('f-parking'), facilityNotes: gv('f-facility-notes'),
    childcare: rv('childcare'), ageGroups: cvs('age-groups'), kidsCount: gv('f-kids-count'), kidsVolunteers: gv('f-kids-volunteers'), kidsNotes: gv('f-kids-notes'),
    worshipTeam: rv('worship-team'), rehearsal: gv('f-rehearsal'), songs: gv('f-songs'), worshipNotes: gv('f-worship-notes'),
    sound: gv('f-sound'), lighting: gv('f-lighting'), video: gv('f-video'), stage: gv('f-stage'), prodNotes: gv('f-prod-notes'),
    checkinStations: rv('checkin-stations'), stations: gv('f-stations'), greetersNeeded: rv('greeters'), greetersCount: gv('f-greeters'), regType: gv('f-reg-type'),
    securityTeam: rv('security-team'), securityCount: gv('f-security-count'), securityConcerns: gv('f-security-concerns'), crowdSize: gv('f-crowd-size'),
    marketing: rv('marketing'), channels: cvs('channels'), designNeeds: gv('f-design-needs'), marketingTimeline: gv('f-marketing-timeline'),
    rooms: roomEntries.filter(r => r.building && r.roomIds && r.roomIds.length),
    configStyle: gv('f-config-style'), capacity: gv('f-capacity'), furniture: cvs('furniture'), configNotes: gv('f-config-notes'),
    attendance: gv('f-attendance'), historical: gv('f-historical'), capPlanning: gv('f-cap-planning'),
    budget: gv('f-budget'), revenue: gv('f-revenue'), expenses: gv('f-expenses'),
    eventType: rv('event-type'), ticketPrice: gv('f-ticket-price'), payment: gv('f-payment'), signupMethod: gv('f-signup-method'),
  };

  function sect(title, rows) {
    const f = rows.filter(([,v]) => v && v.toString().trim() && v !== 'no' && v !== '0');
    if (!f.length) return '';
    return `<div class="summary-section"><div class="summary-section-title">${esc(title)}</div>${f.map(([l,v])=>`<div class="summary-row"><span class="summary-label">${esc(l)}</span><span class="summary-value">${esc(v.toString())}</span></div>`).join('')}</div>`;
  }

  let html = '<div class="request-summary"><h2 style="font-family:\'Oswald\',sans-serif;font-size:1.1rem;letter-spacing:.07em;text-transform:uppercase;color:var(--charcoal);margin-bottom:18px;border-bottom:3px solid var(--navy);padding-bottom:8px;">Event Request Summary</h2>';
  html += sect('Event Basics', [['Event Name',data.name],['Date',data.date],['Time',(data.startTime||'')+(data.endTime?' - '+data.endTime:'')],['Location',data.location],['Category',data.category],['Description',data.description],['Recurring',data.recurring==='yes'?`Yes (${data.frequency}, until ${data.recurEnd})`:'']]);
  html += sect('IT Needs', [['AV Equipment',data.av==='yes'?'Yes':''],['Equipment',data.equipment.join(', ')],['Live Streaming',data.streaming==='yes'?'Yes':''],['Recording',data.recording==='yes'?'Yes':''],['Special Requirements',data.specialTech]]);
  html += sect('Facility Needs', [['Setup Required',data.setupRequired==='yes'?'Yes':''],['Setup Style',data.setupStyle],['Cleaning Before',data.cleanBefore==='yes'?'Yes':''],['Cleaning After',data.cleanAfter==='yes'?'Yes':''],['Parking',data.parking],['Notes',data.facilityNotes]]);
  html += sect('Kids Ministry', [['Childcare',data.childcare==='yes'?'Yes':''],['Age Groups',data.ageGroups.join(', ')],['Expected Kids',data.kidsCount],['Volunteers Needed',data.kidsVolunteers],['Notes',data.kidsNotes]]);
  html += sect('Worship', [['Team Needed',data.worshipTeam==='yes'?'Yes':''],['Rehearsal',data.rehearsal],['Songs/Sets',data.songs],['Notes',data.worshipNotes]]);
  html += sect('Production', [['Sound',data.sound],['Lighting',data.lighting],['Video',data.video],['Stage Setup',data.stage],['Notes',data.prodNotes]]);
  html += sect('Check-in', [['Stations Needed',data.checkinStations==='yes'?'Yes':''],['Num Stations',data.stations],['Greeters Needed',data.greetersNeeded==='yes'?'Yes':''],['Num Greeters',data.greetersCount],['Registration Type',data.regType]]);
  html += sect('Security', [['Team Needed',data.securityTeam==='yes'?'Yes':''],['Personnel',data.securityCount],['Concerns',data.securityConcerns],['Crowd Size',data.crowdSize]]);
  html += sect('Communications', [['Marketing',data.marketing==='yes'?'Yes':''],['Channels',data.channels.join(', ')],['Design Needs',data.designNeeds],['Timeline',data.marketingTimeline]]);
  if (data.rooms.length) {
    const allRooms = getRoomList();
    function roomName(id) { const r = allRooms.find(r=>r.id===id); return r ? r.name : id; }
    function repeatLabel(r) {
      if (!r.repeat || r.repeat==='none') return '';
      const lbl = r.repeat==='biweekly'?'Bi-weekly':r.repeat.charAt(0).toUpperCase()+r.repeat.slice(1);
      return ` · ${lbl} until ${r.repeatUntil||'—'}`;
    }
    function generateDates(startDate, repeat, repeatUntil) {
      const dates = [startDate];
      if (!repeat || repeat==='none' || !repeatUntil || !startDate) return dates;
      const [sy,sm,sd] = startDate.split('-').map(Number);
      let cur = new Date(sy, sm-1, sd);
      const end = new Date(repeatUntil);
      for (let n=0; n<52; n++) {
        if (repeat==='weekly')    cur.setDate(cur.getDate()+7);
        else if (repeat==='biweekly') cur.setDate(cur.getDate()+14);
        else if (repeat==='monthly')  cur.setMonth(cur.getMonth()+1);
        if (cur > end) break;
        dates.push(cur.toISOString().split('T')[0]);
      }
      return dates;
    }
    const summaryRows = data.rooms.map((r,i) => {
      const names = r.roomIds.map(id=>roomName(id)).join(', ');
      const time  = `${r.date} | ${r.startTime}–${r.endTime}${repeatLabel(r)}`;
      return [`Booking ${i+1} — ${r.building}`, `${names} | ${time}`];
    });
    html += sect('Room Reservations', summaryRows);
    // Persist to roomReservations for Room Planner
    const eventSubject = data.name;
    if (eventSubject) {
      const existing = getRoomReservations().filter(r => r.linkedEventSubject !== eventSubject);
      const newRsvs = [];
      data.rooms.forEach(r => {
        const dates = generateDates(r.date, r.repeat, r.repeatUntil);
        r.roomIds.forEach(roomId => {
          dates.forEach(date => {
            newRsvs.push({
              id: 'rsv-' + Date.now() + '-' + Math.random().toString(36).slice(2,6),
              roomId,
              subject: eventSubject,
              ministry: data.category || '',
              date,
              startTime: r.startTime,
              endTime: r.endTime,
              repeat: r.repeat || 'none',
              linkedEventSubject: eventSubject,
            });
          });
        });
      });
      saveRoomReservations([...existing, ...newRsvs]);
    }
  }
  html += sect('Room Configurations', [['Setup Style',data.configStyle],['Capacity',data.capacity],['Furniture',data.furniture.join(', ')],['Notes',data.configNotes]]);
  html += sect('Attendance', [['Predicted',data.attendance],['Historical Notes',data.historical],['Capacity Planning',data.capPlanning]]);
  html += sect('Financial', [['Budget',data.budget?'$'+data.budget:''],['Revenue Projection',data.revenue?'$'+data.revenue:''],['Expenses',data.expenses]]);
  html += sect('Registration', [['Type',data.eventType==='paid'?'Paid Event':'Free Sign-up'],['Ticket Price',data.eventType==='paid'&&data.ticketPrice?'$'+data.ticketPrice:''],['Payment Processing',data.eventType==='paid'?data.payment:''],['Sign-up Method',data.eventType==='free'?data.signupMethod:'']]);

  html += `<div class="summary-actions">
    <button class="summary-btn primary" onclick="printSummary()">Print</button>
    <button class="summary-btn secondary" onclick="copySummary()">Copy to Clipboard</button>
    <button class="summary-btn secondary" onclick="downloadSummary()">Download as Text</button>
  </div></div>`;

  const el = document.getElementById('request-summary');
  el.innerHTML = html;
  el.style.display = 'block';
  el.scrollIntoView({ behavior:'smooth' });
}

function printSummary() {
  const content = document.querySelector('.request-summary');
  const win = window.open('','_blank');
  win.document.write(`<html><head><title>Event Request</title><style>body{font-family:sans-serif;padding:40px;max-width:700px;margin:0 auto;}h2{font-size:1.2rem;border-bottom:2px solid #003A5D;padding-bottom:8px;}.summary-section{margin-bottom:16px;}.summary-section-title{font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;color:#48565A;margin-bottom:6px;border-bottom:1px solid #ddd;padding-bottom:4px;}.summary-row{display:flex;gap:8px;font-size:.85rem;padding:3px 0;}.summary-label{font-weight:700;color:#5A6872;min-width:160px;}.summary-actions{display:none;}</style></head><body>${content.innerHTML}</body></html>`);
  win.document.close();
  win.print();
}

function copySummary() {
  const text = buildPlainTextSummary();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.summary-btn.secondary');
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = orig, 2000);
  });
}

function downloadSummary() {
  const text = buildPlainTextSummary();
  const name = gv('f-name') || 'untitled';
  const blob = new Blob([text], { type:'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `event-request-${name.replace(/\s+/g,'-').toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function buildPlainTextSummary() {
  let t = '=== EVENT REQUEST SUMMARY ===\n';
  t += `Generated: ${new Date().toLocaleDateString()}\n`;
  t += `Category: ${currentCategory ? CATEGORY_MAP[currentCategory].name : 'N/A'}\n\n`;
  const sections = document.querySelectorAll('.request-summary .summary-section');
  sections.forEach(s => {
    const title = s.querySelector('.summary-section-title');
    if (title) t += `--- ${title.textContent} ---\n`;
    s.querySelectorAll('.summary-row').forEach(r => {
      const label = r.querySelector('.summary-label');
      const value = r.querySelector('.summary-value');
      if (label && value) t += `${label.textContent}: ${value.textContent}\n`;
    });
    t += '\n';
  });
  return t;
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
  const seriesEl = document.getElementById('modal-series');
  if (seriesEl) { seriesEl.textContent = ev.seriesIndex ? `Series ${ev.seriesIndex} of ${ev.seriesTotal}` : ''; seriesEl.style.display = ev.seriesIndex ? '' : 'none'; }
  const timeStr = ev.allDay ? 'All Day' : (ev.startTime?fmtTime(ev.startTime):'') + (ev.endTime?' \u2013 '+fmtTime(ev.endTime):'');
  let body = `<div><div class="ms-title">Date &amp; Time</div><div class="mi-row"><svg class="mi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><div>${esc(fmtDateFull(ev.date))}${timeStr?' &nbsp;\u00B7&nbsp; '+esc(timeStr):''}</div></div></div>`;
  if (ev.location) body += `<div><div class="ms-title">Location</div><div class="mi-row"><svg class="mi-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><div>${esc(ev.location)}</div></div></div>`;
  body += `<div><div class="ms-title">Support Teams</div><div class="dept-grid">${DEPT_NAMES.map(dept=>{
    const s=ev.depts[dept]||'N/A', cls=statusCls(s);
    const hasMenu = SERVICE_MENU[dept] != null;
    const clickAttr = hasMenu ? ` onclick="openServiceMenu(${ev.id},'${dept}')"` : '';
    return `<div class="dept-card ${cls}${hasMenu?' clickable':''}"${clickAttr}><div class="dept-card-name">${dept}</div><div class="dept-card-status">${s}${hasMenu?' <span style="font-size:.6rem;opacity:.55;">▶</span>':''}</div></div>`;
  }).join('')}</div></div>`;

  // Show tasks for this event
  const evTasks = generatedTasks.filter(t=>t.eventId===id);
  if (evTasks.length) {
    body += `<div><div class="ms-title">Tasks</div><div class="task-list" style="max-height:none;">${evTasks.map(t=>{
      const bg={urgent:'var(--alert)',pending:'#1558A0',upcoming:'#B5712A'}[t.type]||'var(--slate)';
      return `<div class="task-item ${t.type}"><div><span class="task-priority" style="background:${bg}">${esc(t.label)}</span></div><div><div class="task-meta">${esc(t.description)}</div></div></div>`;
    }).join('')}</div></div>`;
  }

  const eventUrl = getEventUrl(ev.subject);
  body += `<div><div class="ms-title">Link to Event Page</div>
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
  todos.push({ id: 'todo-' + Date.now(), text: taskText, ministry: ev.category, eventId: eventId, completed: false, createdAt: Date.now(), notes: '', subtasks: [], priority: null });
  saveCustomTodos(todos);
  if (btn) { btn.textContent = '✓ Added'; btn.classList.add('added'); }
}

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
  // Rebuild admin view
  rebuildAdminView();
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
  // Rebuild admin view
  rebuildAdminView();
}
function rebuildAdminView() {
  if (currentCategory) {
    const cat = CATEGORY_MAP[currentCategory];
    categoryEvents = allEvents.filter(ev => ev.category === cat.key || ev.secondaryCategory === cat.key);
    buildDeptFilters(); buildStatusFilters();
    generateTasks(); applyFilters(); renderCurrentView();
    updateCategoryDropdownCounts();
  }
}
function updateCategoryDropdownCounts() {
  const dd = document.getElementById('category-dropdown');
  const prevVal = dd.value;
  dd.innerHTML = '<option value="">Select Category</option>';
  for (const [slug, c] of Object.entries(CATEGORY_MAP)) {
    const count = allEvents.filter(e => e.category === c.key || e.secondaryCategory === c.key).length;
    if (count === 0) continue;
    dd.insertAdjacentHTML('beforeend', `<option value="${slug}">${esc(c.name)}</option>`);
  }
  dd.value = prevVal;
}
function closeModal(e) { if (e.target===document.getElementById('modal-overlay')) closeModalBtn(); }
function closeModalBtn() { document.getElementById('modal-overlay').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key==='Escape') closeModalBtn(); });

function openInRoomsFromAdmin(id) {
  const ev = allEvents.find(e => e.id === id); if (!ev) return;
  const d = ev.date instanceof Date ? ev.date : new Date(ev.date);
  const dateIso = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  const hasRsv = getRoomReservations().some(r => r.linkedEventSubject === ev.subject);
  const key = hasRsv ? 'pendingViewReservation' : 'pendingRoomAssignment';
  localStorage.setItem(key, JSON.stringify({ subject: ev.subject, date: dateIso }));
  window.location.href = 'rooms.html';
}

function openBudgetFromAdmin(id) {
  const ev = allEvents.find(e => e.id === id); if (!ev) return;
  localStorage.setItem('pendingBudgetEvent', JSON.stringify({ subject: ev.subject }));
  window.location.href = 'budget.html';
}

/* ═══════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════ */
loadCSV();
