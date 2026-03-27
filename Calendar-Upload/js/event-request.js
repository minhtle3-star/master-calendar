/* ═══════════════════════════════════════════════════════
   EVENT REQUEST — standalone form with live cost preview,
   admin config mode, and deadline warning system
   ═══════════════════════════════════════════════════════ */

/* ── Budget rates (shared with budget.js via localStorage) ── */
const DEFAULT_RATES = {
  setupLaborHr:25, teardownLaborHr:25, specialArrangementFlat:75, stageRiserFlat:200,
  projectorDay:75, screenDay:50, micHandheldDay:15, micLapelDay:25,
  soundOpHr:35, streamingFlat:100, streamingHr:20, recordingHr:45, confMonDay:30,
  cameraOpHr:50, lightingFlat:150, graphicsDesignHr:40, photoCoverageFlat:200,
  worshipMusicianHonorarium:100, worshipLeaderFlat:150,
  kidsSuppliesPerChild:5, kidsSnacksPerChild:3, kidsCoordHr:20,
  foodCoffeePerPerson:3, foodLightPerPerson:6, foodMealPerPerson:18,
  bulletinEach:0.15, flyerEach:0.25, bannerEach:45, promoCardEach:0.10,
  socialGraphicsFlat:50, designCopyHr:40,
  securityGuardHr:35, eventCoordHr:25,
};
function R(k) {
  const saved = JSON.parse(localStorage.getItem('wm_budgetRates') || 'null') || {};
  return saved[k] !== undefined ? saved[k] : (DEFAULT_RATES[k] || 0);
}

/* ── Section definitions ── */
const SECTIONS = [
  { title:'Event Basics',         icon:'📋' },
  { title:'IT & AV',              icon:'🎛️' },
  { title:'Facility',             icon:'🏢' },
  { title:'Kids Ministry',        icon:'🧒' },
  { title:'Worship',              icon:'🎵' },
  { title:'Production',           icon:'🎬' },
  { title:'Check-in & Greeters',  icon:'🤝' },
  { title:'Security',             icon:'🔒' },
  { title:'Communications',       icon:'📢' },
  { title:'Rooms',                icon:'🗓️' },
  { title:'Attendance',           icon:'👥' },
  { title:'Food & Hospitality',   icon:'🍽️' },
  { title:'Financial',            icon:'💰' },
  { title:'Registration',         icon:'📝' },
];

const CATEGORIES = [
  'Sunday Services','Youth','Kids','Community & Connecting',
  'Equipping Team','Missions & Outreach','Worship','Special Events','Other',
];

/* ── Card + field definitions ──────────────────────────────────
   Each card:
     id            – unique key
     section       – index into SECTIONS
     label         – display title
     defaultMode   – 'required' | 'optional' | 'task'
     defaultLeadDays – 0 = no deadline; >0 = warn N days before event
     defaultServiceNote – text shown in deadline warning
     costCalc      – fn(vals) → number, or null
     fields        – array of field defs
   Each field:
     id, label, type, span (1|2), placeholder, options
     showIf – 'fieldId' (truthy) or 'fieldId=value' (exact match)
   ─────────────────────────────────────────────────────────────── */
const CARDS = [

  /* ── Event Basics ── */
  {
    id:'basics-info', section:0, label:'Core Event Info',
    defaultMode:'required', defaultLeadDays:30,
    defaultServiceNote:'Submit event details at least 30 days before the event.',
    costCalc:null,
    fields:[
      { id:'f-name',        label:'Event Name',          type:'text',   span:2, placeholder:'Enter event name' },
      { id:'f-category',    label:'Category',            type:'select', span:1, options:['', ...CATEGORIES] },
      { id:'f-location',    label:'Location',            type:'text',   span:1, placeholder:'Building, room, etc.' },
      { id:'f-date',        label:'Event Date',          type:'date',   span:1 },
      { id:'f-start-time',  label:'Start Time',          type:'time',   span:1 },
      { id:'f-end-time',    label:'End Time',            type:'time',   span:1 },
      { id:'f-attendance',  label:'Expected Attendance', type:'number', span:1, placeholder:'0' },
      { id:'f-description', label:'Event Description',   type:'textarea', span:2, placeholder:'What is this event? Who is it for?' },
      { id:'f-contact-email', label:'Submitter Email', type:'email', span:2, placeholder:'email@example.com' },
    ],
  },
  {
    id:'basics-recurring', section:0, label:'Recurring Schedule',
    defaultMode:'optional', defaultLeadDays:0, defaultServiceNote:'',
    costCalc:null,
    fields:[
      { id:'f-recurring',   label:'Is this a recurring event?', type:'toggle', span:2 },
      { id:'f-frequency',   label:'Frequency',     type:'select', span:1, options:['','Weekly','Biweekly','Monthly','Quarterly'], showIf:'f-recurring' },
      { id:'f-recur-end',   label:'Recurring Until', type:'date', span:1, showIf:'f-recurring' },
    ],
  },

  /* ── IT & AV ── */
  {
    id:'it-equipment', section:1, label:'AV Equipment',
    defaultMode:'optional', defaultLeadDays:7,
    defaultServiceNote:'AV equipment must be requested at least 7 days before the event.',
    costCalc: v => {
      let c = 0;
      c += parseInt(v['f-projectors']    || 0) * R('projectorDay');
      c += parseInt(v['f-screens']       || 0) * R('screenDay');
      c += parseInt(v['f-mics-handheld'] || 0) * R('micHandheldDay');
      c += parseInt(v['f-mics-lapel']    || 0) * R('micLapelDay');
      c += parseInt(v['f-conf-monitors'] || 0) * R('confMonDay');
      c += parseFloat(v['f-sound-op-hrs'] || 0) * R('soundOpHr');
      return c;
    },
    fields:[
      { id:'f-projectors',     label:'Projectors',                type:'number', span:1, placeholder:'0' },
      { id:'f-screens',        label:'Projection Screens',        type:'number', span:1, placeholder:'0' },
      { id:'f-mics-handheld',  label:'Handheld Mics',             type:'number', span:1, placeholder:'0' },
      { id:'f-mics-lapel',     label:'Lapel / Headset Mics',      type:'number', span:1, placeholder:'0' },
      { id:'f-conf-monitors',  label:'Confidence Monitors',       type:'number', span:1, placeholder:'0' },
      { id:'f-sound-op-hrs',   label:'Sound Operator (hours)',    type:'number', span:1, placeholder:'0' },
      { id:'f-tech-notes',     label:'Special Tech Notes',        type:'textarea', span:2, placeholder:'Other AV or IT needs...' },
    ],
  },
  {
    id:'it-streaming', section:1, label:'Live Streaming & Recording',
    defaultMode:'optional', defaultLeadDays:14,
    defaultServiceNote:'Streaming setup must be requested at least 14 days in advance.',
    costCalc: v => {
      let c = 0;
      if (v['f-streaming'] === 'yes') {
        c += R('streamingFlat');
        c += parseFloat(v['f-stream-hrs'] || 0) * R('streamingHr');
      }
      if (v['f-recording'] === 'yes')
        c += parseFloat(v['f-record-hrs'] || 0) * R('recordingHr');
      return c;
    },
    fields:[
      { id:'f-streaming',    label:'Live Streaming?',            type:'yesno',  span:1 },
      { id:'f-stream-hrs',   label:'Streaming Duration (hrs)',   type:'number', span:1, placeholder:'0', showIf:'f-streaming=yes' },
      { id:'f-recording',    label:'Recording?',                 type:'yesno',  span:1 },
      { id:'f-record-hrs',   label:'Recording Duration (hrs)',   type:'number', span:1, placeholder:'0', showIf:'f-recording=yes' },
    ],
  },

  /* ── Facility ── */
  {
    id:'facility-setup', section:2, label:'Room Setup & Teardown',
    defaultMode:'optional', defaultLeadDays:5,
    defaultServiceNote:'Setup requests must be submitted 5 days before the event.',
    costCalc: v => {
      let c = 0;
      c += parseFloat(v['f-setup-hrs']    || 0) * R('setupLaborHr');
      c += parseFloat(v['f-teardown-hrs'] || 0) * R('teardownLaborHr');
      if (v['f-stage-riser']          === 'yes') c += R('stageRiserFlat');
      if (v['f-special-arrangement']  === 'yes') c += R('specialArrangementFlat');
      return c;
    },
    fields:[
      { id:'f-setup-style',           label:'Setup Style',                  type:'select',   span:2, options:['','Theater','Classroom','Banquet','U-Shape','Boardroom','Open Floor','Custom'] },
      { id:'f-setup-hrs',             label:'Setup Labor (hours)',           type:'number',   span:1, placeholder:'0' },
      { id:'f-teardown-hrs',          label:'Teardown Labor (hours)',        type:'number',   span:1, placeholder:'0' },
      { id:'f-stage-riser',           label:'Stage / Riser Needed?',        type:'yesno',    span:1 },
      { id:'f-special-arrangement',   label:'Special Arrangement Needed?',  type:'yesno',    span:1 },
      { id:'f-facility-notes',        label:'Additional Facility Notes',    type:'textarea', span:2, placeholder:'Parking, cleaning, access...' },
    ],
  },

  /* ── Kids Ministry ── */
  {
    id:'kids-childcare', section:3, label:'Kids Ministry / Childcare',
    defaultMode:'task', defaultLeadDays:10,
    defaultServiceNote:'Kids ministry requests must be submitted 10 days before the event.',
    costCalc: v => {
      if (v['f-childcare'] !== 'yes') return 0;
      const n = parseInt(v['f-kids-count'] || 0);
      let c = 0;
      if (v['f-kids-supplies'] === 'yes') c += n * R('kidsSuppliesPerChild');
      if (v['f-kids-snacks']   === 'yes') c += n * R('kidsSnacksPerChild');
      c += parseFloat(v['f-kids-coord-hrs'] || 0) * R('kidsCoordHr');
      return c;
    },
    fields:[
      { id:'f-childcare',       label:'Childcare / Kids Ministry Needed?', type:'yesno',       span:2 },
      { id:'f-kids-count',      label:'Expected Number of Kids',           type:'number',      span:1, placeholder:'0',  showIf:'f-childcare=yes' },
      { id:'f-kids-volunteers', label:'Volunteers Needed',                 type:'number',      span:1, placeholder:'0',  showIf:'f-childcare=yes' },
      { id:'f-age-groups',      label:'Age Groups',                        type:'checkboxes',  span:2, showIf:'f-childcare=yes',
        options:['Infants (0–1)','Toddlers (2–3)','Preschool (4–5)','K–2nd Grade','3rd–5th Grade'] },
      { id:'f-kids-supplies',   label:'Craft / Activity Supplies?',        type:'yesno',       span:1, showIf:'f-childcare=yes' },
      { id:'f-kids-snacks',     label:'Snacks for Kids?',                  type:'yesno',       span:1, showIf:'f-childcare=yes' },
      { id:'f-kids-coord-hrs',  label:'Paid Coordinator (hours)',          type:'number',      span:1, placeholder:'0', showIf:'f-childcare=yes' },
      { id:'f-kids-notes',      label:'Additional Kids Notes',             type:'textarea',    span:2, placeholder:'Curriculum, special needs...', showIf:'f-childcare=yes' },
    ],
  },

  /* ── Worship ── */
  {
    id:'worship-team', section:4, label:'Worship Team',
    defaultMode:'optional', defaultLeadDays:14,
    defaultServiceNote:'Worship team requests must be confirmed 14 days in advance.',
    costCalc: v => {
      if (v['f-worship-needed'] !== 'yes') return 0;
      let c = parseInt(v['f-musicians'] || 0) * R('worshipMusicianHonorarium');
      if (v['f-paid-leader'] === 'yes') c += R('worshipLeaderFlat');
      return c;
    },
    fields:[
      { id:'f-worship-needed', label:'Worship Team Needed?',      type:'yesno',    span:2 },
      { id:'f-musicians',      label:'Number of Musicians',        type:'number',   span:1, placeholder:'0', showIf:'f-worship-needed=yes' },
      { id:'f-paid-leader',    label:'Paid Worship Leader?',       type:'yesno',    span:1, showIf:'f-worship-needed=yes' },
      { id:'f-rehearsal',      label:'Rehearsal Date & Time',      type:'datetime-local', span:2, showIf:'f-worship-needed=yes' },
      { id:'f-songs',          label:'Song List / Set Details',    type:'textarea', span:2, placeholder:'Song requests or set notes...', showIf:'f-worship-needed=yes' },
      { id:'f-worship-notes',  label:'Additional Worship Notes',   type:'textarea', span:2, placeholder:'Stage plot, special requests...', showIf:'f-worship-needed=yes' },
    ],
  },

  /* ── Production ── */
  {
    id:'production', section:5, label:'Production & Creative',
    defaultMode:'optional', defaultLeadDays:7,
    defaultServiceNote:'Production requests must be submitted 7 days before the event.',
    costCalc: v => {
      let c = 0;
      c += parseInt(v['f-cameras'] || 0) * parseFloat(v['f-camera-hrs'] || 0) * R('cameraOpHr');
      if (v['f-lighting']      === 'yes') c += R('lightingFlat');
      if (v['f-photo-coverage']=== 'yes') c += R('photoCoverageFlat');
      c += parseFloat(v['f-graphics-hrs'] || 0) * R('graphicsDesignHr');
      return c;
    },
    fields:[
      { id:'f-cameras',        label:'Camera Operators',                type:'number',   span:1, placeholder:'0' },
      { id:'f-camera-hrs',     label:'Camera Op Duration (hrs)',        type:'number',   span:1, placeholder:'0' },
      { id:'f-lighting',       label:'Special Lighting Setup?',         type:'yesno',    span:1 },
      { id:'f-photo-coverage', label:'Photo / Video Coverage?',         type:'yesno',    span:1 },
      { id:'f-graphics-hrs',   label:'Slides / Graphics Design (hrs)',  type:'number',   span:1, placeholder:'0' },
      { id:'f-sound-notes',    label:'Sound Requirements',              type:'textarea', span:1, placeholder:'Monitors, IEMs, board...' },
      { id:'f-stage-notes',    label:'Stage Layout',                    type:'textarea', span:2, placeholder:'Instrument positions, backline...' },
    ],
  },

  /* ── Check-in ── */
  {
    id:'checkin', section:6, label:'Check-in & Greeters',
    defaultMode:'optional', defaultLeadDays:5,
    defaultServiceNote:'Check-in setup must be confirmed 5 days before the event.',
    costCalc: null,
    fields:[
      { id:'f-checkin-stations', label:'Check-in Stations Needed?',  type:'yesno',  span:1 },
      { id:'f-stations',         label:'Number of Stations',          type:'number', span:1, placeholder:'0', showIf:'f-checkin-stations=yes' },
      { id:'f-greeters-needed',  label:'Volunteer Greeters?',         type:'yesno',  span:1 },
      { id:'f-greeter-count',    label:'Number of Greeters',          type:'number', span:1, placeholder:'0', showIf:'f-greeters-needed=yes' },
      { id:'f-reg-type',         label:'Registration Type',           type:'select', span:2, options:['','Walk-in Only','Pre-registration Required','Both'] },
    ],
  },

  /* ── Security ── */
  {
    id:'security', section:7, label:'Security',
    defaultMode:'optional', defaultLeadDays:7,
    defaultServiceNote:'Security requests must be submitted 7 days before the event.',
    costCalc: v => {
      if (v['f-security-needed'] !== 'yes') return 0;
      return parseInt(v['f-security-count'] || 0) * parseFloat(v['f-security-hrs'] || 0) * R('securityGuardHr');
    },
    fields:[
      { id:'f-security-needed',   label:'Security Team Needed?',          type:'yesno',    span:2 },
      { id:'f-security-count',    label:'Number of Security Personnel',   type:'number',   span:1, placeholder:'0', showIf:'f-security-needed=yes' },
      { id:'f-security-hrs',      label:'Hours on Site',                   type:'number',   span:1, placeholder:'0', showIf:'f-security-needed=yes' },
      { id:'f-security-concerns', label:'Security Concerns / Notes',       type:'textarea', span:2, placeholder:'Special concerns, crowd info...', showIf:'f-security-needed=yes' },
    ],
  },

  /* ── Communications ── */
  {
    id:'comms', section:8, label:'Marketing & Communications',
    defaultMode:'task', defaultLeadDays:21,
    defaultServiceNote:'Communications requests must be submitted 3 weeks before the event.',
    costCalc: v => {
      let c = 0;
      c += parseInt(v['f-bulletins']   || 0) * R('bulletinEach');
      c += parseInt(v['f-flyers']      || 0) * R('flyerEach');
      c += parseInt(v['f-banners']     || 0) * R('bannerEach');
      c += parseInt(v['f-promo-cards'] || 0) * R('promoCardEach');
      if (v['f-social-graphics'] === 'yes') c += R('socialGraphicsFlat');
      c += parseFloat(v['f-design-hrs'] || 0) * R('designCopyHr');
      return c;
    },
    fields:[
      { id:'f-marketing-needed',    label:'Marketing / Promo Needed?',         type:'yesno',      span:2 },
      { id:'f-channels',            label:'Announcement Channels',              type:'checkboxes', span:2, showIf:'f-marketing-needed=yes',
        options:['Sunday Announcement','Email Newsletter','Social Media','Website','App Notification','Print Material'] },
      { id:'f-bulletins',           label:'Bulletins (qty)',                    type:'number',     span:1, placeholder:'0', showIf:'f-marketing-needed=yes' },
      { id:'f-flyers',              label:'Flyers (qty)',                        type:'number',     span:1, placeholder:'0', showIf:'f-marketing-needed=yes' },
      { id:'f-banners',             label:'Banners (qty)',                       type:'number',     span:1, placeholder:'0', showIf:'f-marketing-needed=yes' },
      { id:'f-promo-cards',         label:'Promo Cards (qty)',                   type:'number',     span:1, placeholder:'0', showIf:'f-marketing-needed=yes' },
      { id:'f-social-graphics',     label:'Social Media Graphics?',             type:'yesno',      span:1, showIf:'f-marketing-needed=yes' },
      { id:'f-design-hrs',          label:'Design / Copywriting (hrs)',         type:'number',     span:1, placeholder:'0', showIf:'f-marketing-needed=yes' },
      { id:'f-promo-start',         label:'Desired Promotion Start Date',       type:'date',       span:2, showIf:'f-marketing-needed=yes' },
    ],
  },

  /* ── Rooms ── */
  {
    id:'rooms', section:9, label:'Room Reservations',
    defaultMode:'required', defaultLeadDays:14,
    defaultServiceNote:'Room reservations must be submitted at least 14 days before the event.',
    costCalc: null,
    fields:[
      { id:'f-rooms-notes',    label:'Rooms Needed (describe)',   type:'textarea', span:2, placeholder:'Which rooms/buildings? Setup needed? How many people?' },
      { id:'f-rooms-widget',   label:'',                          type:'rooms-link', span:2 },
    ],
  },

  /* ── Attendance ── */
  {
    id:'attendance', section:10, label:'Attendance & Capacity',
    defaultMode:'required', defaultLeadDays:0, defaultServiceNote:'',
    costCalc: null,
    fields:[
      { id:'f-predicted-att', label:'Predicted Attendance',    type:'number',   span:1, placeholder:'0' },
      { id:'f-venue-capacity',label:'Venue / Room Capacity',   type:'number',   span:1, placeholder:'0' },
      { id:'f-historical',    label:'Historical Comparison',   type:'textarea', span:2, placeholder:'How does this compare to past events?' },
      { id:'f-overflow-plan', label:'Overflow / Seating Plan', type:'textarea', span:2, placeholder:'Second screen, overflow room...' },
    ],
  },

  /* ── Food & Hospitality ── */
  {
    id:'food', section:11, label:'Food & Hospitality',
    defaultMode:'task', defaultLeadDays:7,
    defaultServiceNote:'Food and hospitality arrangements must be finalized 7 days before the event.',
    costCalc: v => {
      if (v['f-food-needed'] !== 'yes') return 0;
      const n = parseInt(v['f-food-count'] || v['f-attendance'] || 0);
      const t = v['f-food-type'];
      if (t === 'Coffee / Drinks')    return n * R('foodCoffeePerPerson');
      if (t === 'Light Refreshments') return n * R('foodLightPerPerson');
      if (t === 'Catered Meal')       return n * R('foodMealPerPerson');
      return 0;
    },
    fields:[
      { id:'f-food-needed',  label:'Food / Hospitality Needed?',    type:'yesno',    span:2 },
      { id:'f-food-type',    label:'Type of Food',                   type:'select',   span:1, showIf:'f-food-needed=yes',
        options:['','Coffee / Drinks','Light Refreshments','Catered Meal','Custom'] },
      { id:'f-food-count',   label:'People to Serve',                type:'number',   span:1, placeholder:'0', showIf:'f-food-needed=yes' },
      { id:'f-food-vendor',  label:'Vendor / Caterer',               type:'text',     span:2, placeholder:'e.g., In-house kitchen, Pine Cove', showIf:'f-food-needed=yes' },
      { id:'f-food-notes',   label:'Dietary Requirements / Notes',   type:'textarea', span:2, placeholder:'Allergies, dietary restrictions...', showIf:'f-food-needed=yes' },
    ],
  },

  /* ── Financial ── */
  {
    id:'financial', section:12, label:'Financial & Budget',
    defaultMode:'required', defaultLeadDays:0, defaultServiceNote:'',
    costCalc: null,
    fields:[
      { id:'f-budget-estimate',   label:'Overall Budget Estimate ($)',  type:'number',   span:1, placeholder:'0.00' },
      { id:'f-revenue-projection',label:'Revenue Projection ($)',        type:'number',   span:1, placeholder:'0.00' },
      { id:'f-expenses-breakdown',label:'Expenses Breakdown',            type:'textarea', span:2, placeholder:'List major expense items...' },
    ],
  },

  /* ── Registration ── */
  {
    id:'registration', section:13, label:'Registration',
    defaultMode:'optional', defaultLeadDays:21,
    defaultServiceNote:'Registration setup must be configured at least 3 weeks before the event.',
    costCalc: null,
    fields:[
      { id:'f-event-pay-type', label:'Event Type',          type:'radio',    span:2, options:['Free Sign-up','Paid Ticket','Open / No Registration'] },
      { id:'f-ticket-price',   label:'Ticket Price ($)',     type:'number',   span:1, placeholder:'0.00', showIf:'f-event-pay-type=Paid Ticket' },
      { id:'f-payment-method', label:'Payment Method',       type:'select',   span:1, showIf:'f-event-pay-type=Paid Ticket',
        options:['','Online Only','At Door','Both'] },
      { id:'f-signup-method',  label:'Sign-up Method',       type:'text',     span:2, placeholder:'Website form, sign-up sheet...', showIf:'f-event-pay-type=Free Sign-up' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   STATE
   ───────────────────────────────────────────────────────── */
let configMode = false;
let formValues = {};   // fieldId → value
let cardConfig = {};   // cardId  → { mode, leadDays, serviceNote }
let saveTimer  = null;
let activeSection = 0;

const LS_DRAFT   = 'wm_requestDraft';
const LS_DRAFTS  = 'wm_requestDrafts';   // array of named saved drafts
const LS_CONFIG  = 'wm_requestConfig';

/* ─────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────── */
function init() {
  cardConfig = JSON.parse(localStorage.getItem(LS_CONFIG) || '{}');
  formValues = JSON.parse(localStorage.getItem(LS_DRAFT)  || '{}');

  renderNav();
  renderSections();
  populateForm();
  recalcAll();

  document.addEventListener('click', e => {
    if (!e.target.closest('.brand')) document.querySelector('.brand')?.classList.remove('open');
  });
}

/* ─────────────────────────────────────────────────────────
   GET / SET card config helpers
   ───────────────────────────────────────────────────────── */
function getCC(cardId) {
  const card = CARDS.find(c => c.id === cardId);
  const saved = cardConfig[cardId] || {};
  return {
    mode:        saved.mode        ?? card.defaultMode,
    leadDays:    saved.leadDays    ?? card.defaultLeadDays,
    serviceNote: saved.serviceNote ?? card.defaultServiceNote,
  };
}
function setCC(cardId, updates) {
  cardConfig[cardId] = { ...getCC(cardId), ...updates };
  localStorage.setItem(LS_CONFIG, JSON.stringify(cardConfig));
}

/* ─────────────────────────────────────────────────────────
   RENDER — section navigation
   ───────────────────────────────────────────────────────── */
function renderNav() {
  const nav = document.getElementById('er-section-nav');
  nav.innerHTML = SECTIONS.map((s, i) => `
    <div class="er-nav-item" id="nav-${i}" onclick="scrollToSection(${i})">
      <span class="er-nav-icon">${s.icon}</span>
      <span class="er-nav-label">${s.title}</span>
      <span class="er-nav-check" id="nav-check-${i}"></span>
      <span class="er-nav-cost"  id="nav-cost-${i}"  style="display:none"></span>
    </div>`).join('');
}

/* ─────────────────────────────────────────────────────────
   RENDER — all sections + cards
   ───────────────────────────────────────────────────────── */
function renderSections() {
  const container = document.getElementById('er-sections-container');
  container.innerHTML = SECTIONS.map((s, si) => {
    const cards = CARDS.filter(c => c.section === si);
    return `
      <div class="er-section-block" id="section-${si}" data-section="${si}">
        <div class="er-section-heading" id="section-heading-${si}">
          <span class="er-section-icon">${s.icon}</span>
          <span class="er-section-title">${s.title}</span>
          <span class="er-section-cost-badge" id="sec-cost-${si}" style="display:none"></span>
        </div>
        ${cards.map(renderCard).join('')}
      </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────────────────
   RENDER — single card
   ───────────────────────────────────────────────────────── */
function renderCard(card) {
  const cfg  = getCC(card.id);
  const mode = cfg.mode;
  const isTask = mode === 'task';

  const modeBadge = `<span class="er-mode-badge ${mode}" id="badge-${card.id}">${modeLabel(mode)}</span>`;
  const costBadge = card.costCalc ? `<span class="er-card-cost zero" id="ccost-${card.id}">$0</span>` : '';
  const taskCheck = isTask
    ? `<div class="er-task-check" id="taskcheck-${card.id}" onclick="toggleTaskDone('${card.id}')"></div>`
    : '';

  const configPanel = `
    <div class="er-card-config" id="config-${card.id}" style="display:none">
      <div class="er-config-row">
        <span class="er-config-label">Status</span>
        <div class="er-mode-btns">
          ${['required','optional','task'].map(m =>
            `<button class="er-mode-btn m-${m}${cfg.mode === m ? ' active' : ''}"
               onclick="setCardMode('${card.id}','${m}')">${modeLabel(m)}</button>`
          ).join('')}
        </div>
      </div>
      <div class="er-config-row">
        <span class="er-config-label">Deadline</span>
        <div class="er-lead-input">
          Warn if not filled
          <input type="number" min="0" max="365" value="${cfg.leadDays}"
            id="lead-${card.id}"
            onchange="setCardLeadDays('${card.id}', this.value)"
            oninput="setCardLeadDays('${card.id}', this.value)" />
          days before event
        </div>
      </div>
      <div class="er-config-row">
        <span class="er-config-label">Note</span>
        <input class="er-service-note-input" type="text"
          placeholder="Service availability note (shown in deadline warning)"
          value="${escAttr(cfg.serviceNote)}"
          id="snote-${card.id}"
          oninput="setCardServiceNote('${card.id}', this.value)" />
      </div>
    </div>`;

  const deadlineBanner = `<div id="deadline-${card.id}" style="display:none"></div>`;

  return `
    <div class="er-card" id="card-${card.id}" data-mode="${mode}" data-cardid="${card.id}">
      <div class="er-card-header">
        ${taskCheck}
        <span class="er-card-label">${card.label}</span>
        ${modeBadge}
        ${costBadge}
      </div>
      <div class="er-card-body" id="body-${card.id}">
        ${card.fields.map(f => renderField(f, card.id)).join('')}
      </div>
      ${deadlineBanner}
      ${configPanel}
    </div>`;
}

/* ─────────────────────────────────────────────────────────
   RENDER — single field
   ───────────────────────────────────────────────────────── */
function renderField(f, cardId) {
  const spanClass = (f.span || 1) === 2 ? 'er-field-span-2' : '';
  const showIfAttr = f.showIf ? ` data-showif="${f.showIf}"` : '';
  const style = f.showIf ? ' style="display:none"' : '';
  const labelHtml = f.label ? `<label class="er-label" for="${f.id}">${f.label}</label>` : '';

  let input = '';

  if (f.type === 'text' || f.type === 'date' || f.type === 'time' || f.type === 'datetime-local') {
    input = `<input class="er-input" type="${f.type}" id="${f.id}"
      ${f.placeholder ? `placeholder="${escAttr(f.placeholder)}"` : ''}
      oninput="onFieldChange('${f.id}', this.value, '${cardId}')"
      onchange="onFieldChange('${f.id}', this.value, '${cardId}')" />${f.id === 'f-date' ? '<div id="er-conflict-warning" style="display:none"></div>' : ''}`;
  }
  else if (f.type === 'number') {
    input = `<input class="er-input" type="number" id="${f.id}" min="0"
      ${f.placeholder ? `placeholder="${escAttr(f.placeholder)}"` : ''}
      oninput="onFieldChange('${f.id}', this.value, '${cardId}')"
      onchange="onFieldChange('${f.id}', this.value, '${cardId}')" />`;
  }
  else if (f.type === 'textarea') {
    input = `<textarea class="er-textarea" id="${f.id}"
      ${f.placeholder ? `placeholder="${escAttr(f.placeholder)}"` : ''}
      oninput="onFieldChange('${f.id}', this.value, '${cardId}')"
      onchange="onFieldChange('${f.id}', this.value, '${cardId}')"></textarea>`;
  }
  else if (f.type === 'select') {
    const opts = (f.options || []).map(o =>
      `<option value="${escAttr(o)}">${o || '— Select —'}</option>`).join('');
    input = `<select class="er-select" id="${f.id}"
      onchange="onFieldChange('${f.id}', this.value, '${cardId}')">${opts}</select>`;
  }
  else if (f.type === 'yesno') {
    input = `<div class="er-yesno" id="yn-${f.id}">
      <button class="er-yn-btn" data-val="yes" onclick="setYesNo('${f.id}','yes','${cardId}')">Yes</button>
      <button class="er-yn-btn" data-val="no"  onclick="setYesNo('${f.id}','no','${cardId}')">No</button>
    </div>`;
  }
  else if (f.type === 'toggle') {
    input = `<div class="er-toggle-wrap">
      <label class="er-toggle">
        <input type="checkbox" id="${f.id}"
          onchange="onFieldChange('${f.id}', this.checked ? 'yes' : '', '${cardId}')" />
        <span class="er-toggle-slider"></span>
      </label>
      <span class="er-toggle-label" id="toggle-label-${f.id}">No</span>
    </div>`;
  }
  else if (f.type === 'radio') {
    input = `<div class="er-radio-group">
      ${(f.options || []).map(o => `
        <label class="er-radio-item">
          <input type="radio" name="${f.id}" value="${escAttr(o)}"
            onchange="onFieldChange('${f.id}', this.value, '${cardId}')" />
          ${o}
        </label>`).join('')}
    </div>`;
  }
  else if (f.type === 'checkboxes') {
    input = `<div class="er-cb-group" id="cbg-${f.id}">
      ${(f.options || []).map(o => `
        <label class="er-cb-item">
          <input type="checkbox" name="${f.id}" value="${escAttr(o)}"
            onchange="onCbChange('${f.id}', '${cardId}')" />
          ${o}
        </label>`).join('')}
    </div>`;
  }
  else if (f.type === 'rooms-link') {
    input = `<div class="er-rooms-avail-wrap" id="er-rooms-avail">
      <div class="er-rooms-note">Set an event date to see room availability.
        <br><a href="rooms.html" class="er-rooms-link" target="_blank">🏢 Open Room Planner →</a>
      </div>
    </div>`;
  }

  return `<div class="er-field-group ${spanClass}" id="fg-${f.id}"${showIfAttr}${style}>
    ${labelHtml}
    ${input}
  </div>`;
}

/* ─────────────────────────────────────────────────────────
   FIELD CHANGE HANDLERS
   ───────────────────────────────────────────────────────── */
function renderRoomAvailability(dateIso) {
  const wrap = document.getElementById('er-rooms-avail');
  if (!wrap) return;
  if (!dateIso) {
    wrap.innerHTML = `<div class="er-rooms-note">Set an event date to see room availability.
      <br><a href="rooms.html" class="er-rooms-link" target="_blank">🏢 Open Room Planner →</a>
    </div>`;
    return;
  }
  let rooms = [];
  try {
    const raw = localStorage.getItem('roomList');
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) rooms = p; }
  } catch(e) {}
  if (!rooms.length) {
    wrap.innerHTML = `<div class="er-rooms-note">Open Room Planner first to load room data.
      <br><a href="rooms.html" class="er-rooms-link" target="_blank">🏢 Open Room Planner →</a>
    </div>`;
    return;
  }
  const rsvs = (() => { try { return JSON.parse(localStorage.getItem('roomReservations')||'[]'); } catch { return []; } })();
  const bookedToday = rsvs.filter(r => r.date === dateIso);
  const bookedRoomIds = new Set(bookedToday.map(r => r.roomId));

  const buildings = [...new Set(rooms.map(r => r.building).filter(Boolean))];
  const freeCount = rooms.filter(r => !bookedRoomIds.has(r.id)).length;
  const busyCount = rooms.filter(r => bookedRoomIds.has(r.id)).length;

  const grid = buildings.map(bldg => {
    const bRooms = rooms.filter(r => r.building === bldg);
    const chips = bRooms.map(rm => {
      const booking = bookedToday.find(r => r.roomId === rm.id);
      const booked = !!booking;
      const tip = booked ? `${booking.subject} · ${booking.startTime||''}${booking.endTime?' – '+booking.endTime:''}` : 'Available';
      return `<span class="er-room-chip ${booked?'booked':'free'}" title="${escAttr(tip)}">${escHtml(rm.name)}</span>`;
    }).join('');
    return `<div class="er-avail-bldg">
      <div class="er-avail-bldg-name">${escHtml(bldg)}</div>
      <div class="er-avail-chips">${chips}</div>
    </div>`;
  }).join('');

  const d = new Date(dateIso + 'T00:00:00');
  const dateLabel = d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
  wrap.innerHTML = `
    <div class="er-avail-header">
      <span><strong>${escHtml(dateLabel)}</strong></span>
      <span class="er-avail-summary">
        <span class="er-room-chip free" style="pointer-events:none;">${freeCount} free</span>
        <span class="er-room-chip booked" style="pointer-events:none;">${busyCount} booked</span>
      </span>
    </div>
    ${grid}
    <a href="rooms.html" class="er-rooms-link" style="display:inline-block;margin-top:8px;" target="_blank">🏢 Open Room Planner →</a>`;
}

function onFieldChange(fieldId, val, cardId) {
  formValues[fieldId] = val;
  autoSave();
  updateConditionals(cardId);
  recalcAll();
  if (fieldId === 'f-date') {
    checkDateConflicts(val);
    renderRoomAvailability(val);
  }
}

function setYesNo(fieldId, val, cardId) {
  formValues[fieldId] = val;
  // Update button states
  const wrap = document.getElementById(`yn-${fieldId}`);
  if (wrap) {
    wrap.querySelectorAll('.er-yn-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.val === val);
    });
  }
  autoSave();
  updateConditionals(cardId);
  recalcAll();
}

function onCbChange(fieldId, cardId) {
  const checked = [...document.querySelectorAll(`input[name="${fieldId}"]:checked`)]
    .map(el => el.value);
  formValues[fieldId] = checked;
  autoSave();
  recalcAll();
}

/* ─────────────────────────────────────────────────────────
   CONDITIONAL FIELD VISIBILITY
   ───────────────────────────────────────────────────────── */
function updateConditionals(cardId) {
  const card = CARDS.find(c => c.id === cardId);
  if (!card) return;
  card.fields.forEach(f => {
    if (!f.showIf) return;
    const el = document.getElementById(`fg-${f.id}`);
    if (!el) return;
    el.style.display = evalShowIf(f.showIf) ? '' : 'none';
  });
  // Update toggle labels
  card.fields.filter(f => f.type === 'toggle').forEach(f => {
    const lbl = document.getElementById(`toggle-label-${f.id}`);
    if (lbl) lbl.textContent = formValues[f.id] === 'yes' ? 'Yes' : 'No';
  });
}

function evalShowIf(showIf) {
  if (showIf.includes('=')) {
    const [fid, expected] = showIf.split('=');
    return String(formValues[fid] || '') === expected;
  }
  const v = formValues[showIf];
  return !!v && v !== 'no' && (Array.isArray(v) ? v.length > 0 : true);
}

function updateAllConditionals() {
  CARDS.forEach(c => updateConditionals(c.id));
}

/* ─────────────────────────────────────────────────────────
   POPULATE FORM from formValues
   ───────────────────────────────────────────────────────── */
function populateForm() {
  CARDS.forEach(card => {
    card.fields.forEach(f => {
      const val = formValues[f.id];
      if (val === undefined) return;

      if (f.type === 'toggle') {
        const el = document.getElementById(f.id);
        if (el) el.checked = val === 'yes';
      } else if (f.type === 'yesno') {
        if (val) setYesNo(f.id, val, card.id);
      } else if (f.type === 'radio') {
        const el = document.querySelector(`input[name="${f.id}"][value="${CSS.escape(val)}"]`);
        if (el) el.checked = true;
      } else if (f.type === 'checkboxes') {
        const arr = Array.isArray(val) ? val : [];
        arr.forEach(v => {
          const el = document.querySelector(`input[name="${f.id}"][value="${CSS.escape(v)}"]`);
          if (el) el.checked = true;
        });
      } else {
        const el = document.getElementById(f.id);
        if (el) el.value = val;
      }
    });
    updateConditionals(card.id);
  });
  // Refresh room availability grid if a date is already loaded
  renderRoomAvailability(formValues['f-date'] || null);
}

/* ─────────────────────────────────────────────────────────
   COST CALCULATION
   ───────────────────────────────────────────────────────── */
function recalcCosts() {
  const sectionCosts = new Array(SECTIONS.length).fill(0);

  CARDS.forEach(card => {
    if (!card.costCalc) return;
    const cost = Math.round(card.costCalc(formValues) * 100) / 100;
    sectionCosts[card.section] += cost;

    // Per-card cost badge
    const badge = document.getElementById(`ccost-${card.id}`);
    if (badge) {
      badge.textContent = fmtDollar(cost);
      badge.classList.toggle('zero', cost === 0);
    }
  });

  // Section cost badges + nav cost
  let grandTotal = 0;
  sectionCosts.forEach((cost, i) => {
    grandTotal += cost;
    const secBadge = document.getElementById(`sec-cost-${i}`);
    if (secBadge) {
      secBadge.textContent = fmtDollar(cost);
      secBadge.style.display = cost > 0 ? '' : 'none';
    }
    const navCost = document.getElementById(`nav-cost-${i}`);
    if (navCost) {
      navCost.textContent = fmtDollar(cost);
      navCost.style.display = cost > 0 ? '' : 'none';
    }
  });

  // Sidebar cost breakdown
  const list = document.getElementById('er-cost-list');
  if (list) {
    list.innerHTML = sectionCosts.map((cost, i) => {
      if (cost === 0) return '';
      return `<div class="er-cost-row">
        <span class="er-cost-section-name">${SECTIONS[i].icon} ${SECTIONS[i].title}</span>
        <span class="er-cost-amount">${fmtDollar(cost)}</span>
      </div>`;
    }).join('') || '<div class="er-cost-row zero"><span>Fill out sections to see estimates</span></div>';
  }
  document.getElementById('er-total-cost').textContent = fmtDollar(grandTotal);
}

/* ─────────────────────────────────────────────────────────
   DEADLINE WARNINGS
   ───────────────────────────────────────────────────────── */
function recalcWarnings() {
  const eventDate = formValues['f-date'] ? new Date(formValues['f-date'] + 'T12:00:00') : null;
  const today     = new Date();
  today.setHours(0, 0, 0, 0);

  const warningsList = document.getElementById('er-warnings-list');
  const warnings = [];

  CARDS.forEach(card => {
    const cfg = getCC(card.id);
    if (!cfg.leadDays || cfg.leadDays <= 0) return;
    if (cfg.mode === 'optional') return; // only warn for required/task

    const banner = document.getElementById(`deadline-${card.id}`);
    if (!banner) return;

    if (!eventDate) {
      banner.style.display = 'none';
      return;
    }

    const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    const isUrgent = daysLeft < cfg.leadDays && daysLeft >= 0;
    const isPast   = daysLeft < 0;
    const isOk     = daysLeft >= cfg.leadDays;

    if (isOk) {
      banner.style.display = 'none';
      return;
    }

    const severity = isPast ? 'urgent' : (daysLeft < Math.ceil(cfg.leadDays / 2) ? 'urgent' : 'warn');
    const icon     = severity === 'urgent' ? '🔴' : '⚠️';
    const daysMsg  = isPast
      ? `Event has passed`
      : daysLeft === 0
        ? `Event is today`
        : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} until event — deadline was ${cfg.leadDays} days prior`;

    const note = cfg.serviceNote ? `<br><em>${escHtml(cfg.serviceNote)}</em>` : '';
    banner.className   = `er-deadline-banner ${severity}`;
    banner.style.display = '';
    banner.innerHTML   = `<span class="er-deadline-icon">${icon}</span>
      <span><strong>${card.label}:</strong> ${daysMsg}${note}</span>`;

    if (isUrgent || isPast) {
      warnings.push({ card, severity, daysLeft, cfg });
    }

    // Flag section in nav
    const navItem = document.getElementById(`nav-${card.section}`);
    if (navItem) navItem.classList.toggle('has-warning', true);
  });

  // Right panel warnings
  if (!eventDate) {
    warningsList.innerHTML = '<div class="er-no-warnings">Set an event date to check deadlines</div>';
    return;
  }
  if (warnings.length === 0) {
    warningsList.innerHTML = '<div class="er-no-warnings">✓ All deadlines on track</div>';
    return;
  }

  warningsList.innerHTML = warnings.map(({ card, severity, daysLeft, cfg }) => {
    const daysMsg = daysLeft < 0 ? 'past event date' : daysLeft === 0 ? 'today' : `${daysLeft}d left`;
    return `<div class="er-warning-item ${severity}" onclick="scrollToCard('${card.id}')">
      <span class="er-warning-icon">${severity === 'urgent' ? '🔴' : '⚠️'}</span>
      <div class="er-warning-body">
        <span class="er-warning-title">${card.label}</span>
        <span class="er-warning-sub">${SECTIONS[card.section].title} · ${daysMsg}</span>
        ${cfg.serviceNote ? `<div class="er-warning-sub" style="margin-top:3px;">${escHtml(cfg.serviceNote)}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────────────────
   TASK PANEL
   ───────────────────────────────────────────────────────── */
function recalcTasks() {
  const tasksList = document.getElementById('er-tasks-list');
  const taskCards = CARDS.filter(c => getCC(c.id).mode === 'task');

  // Update task check icons in card headers
  CARDS.forEach(card => {
    const check = document.getElementById(`taskcheck-${card.id}`);
    if (!check) return;
    const isDone = formValues[`__taskdone_${card.id}`];
    check.className = `er-task-check${isDone ? ' checked' : ''}`;
    check.textContent = isDone ? '✓' : '';
    document.getElementById(`card-${card.id}`)?.classList.toggle('task-done', !!isDone);
  });

  if (taskCards.length === 0) {
    tasksList.innerHTML = '<div class="er-no-tasks">No task-mode cards</div>';
    return;
  }

  const eventDate  = formValues['f-date'] ? new Date(formValues['f-date'] + 'T12:00:00') : null;
  const today      = new Date(); today.setHours(0, 0, 0, 0);

  tasksList.innerHTML = taskCards.map(card => {
    const cfg  = getCC(card.id);
    const done = !!formValues[`__taskdone_${card.id}`];
    let deadlineHtml = '';
    if (cfg.leadDays > 0 && eventDate) {
      const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      if (daysLeft < cfg.leadDays && daysLeft >= 0) {
        deadlineHtml = `<span class="er-task-item-deadline">⚠ Due in ${daysLeft}d</span>`;
      } else if (daysLeft < 0) {
        deadlineHtml = `<span class="er-task-item-deadline" style="background:#fee2e2;color:#7f1d1d">Past event</span>`;
      }
    }
    return `
      <div class="er-task-item${done ? ' done' : ''}" onclick="scrollToCard('${card.id}')">
        <div class="er-task-item-check">${done ? '✓' : ''}</div>
        <div class="er-task-item-body">
          <span class="er-task-item-label">${card.label}</span>
          <div class="er-task-item-section">${SECTIONS[card.section].icon} ${SECTIONS[card.section].title}</div>
          ${deadlineHtml}
        </div>
      </div>`;
  }).join('');
}

function toggleTaskDone(cardId) {
  formValues[`__taskdone_${cardId}`] = !formValues[`__taskdone_${cardId}`];
  autoSave();
  recalcTasks();
}

/* ─────────────────────────────────────────────────────────
   SECTION COMPLETION (nav check marks)
   ───────────────────────────────────────────────────────── */
function recalcProgress() {
  SECTIONS.forEach((s, i) => {
    const cards = CARDS.filter(c => c.section === i && getCC(c.id).mode === 'required');
    const allFilled = cards.every(card => {
      return card.fields.some(f => {
        if (f.showIf && !evalShowIf(f.showIf)) return true; // hidden = skip
        const v = formValues[f.id];
        if (Array.isArray(v)) return v.length > 0;
        return !!v && v !== '';
      });
    });
    const check = document.getElementById(`nav-check-${i}`);
    if (check) check.textContent = (cards.length > 0 && allFilled) ? '✓' : '';
    const navItem = document.getElementById(`nav-${i}`);
    if (navItem) {
      navItem.classList.toggle('done', cards.length > 0 && allFilled);
      // Clear warning flag before re-setting in recalcWarnings
      navItem.classList.remove('has-warning');
    }
  });
}

/* ─────────────────────────────────────────────────────────
   RECALC ALL
   ───────────────────────────────────────────────────────── */
function recalcAll() {
  recalcCosts();
  recalcProgress();
  recalcWarnings();
  recalcTasks();
}

/* ─────────────────────────────────────────────────────────
   CONFIG MODE
   ───────────────────────────────────────────────────────── */
function toggleConfigMode() {
  configMode = !configMode;
  const btn = document.getElementById('er-config-btn');
  btn.classList.toggle('active', configMode);
  btn.textContent = configMode ? '✕ Exit Configure' : '⚙ Configure Form';

  CARDS.forEach(card => {
    const panel = document.getElementById(`config-${card.id}`);
    if (panel) panel.style.display = configMode ? '' : 'none';
  });
}

function setCardMode(cardId, mode) {
  setCC(cardId, { mode });
  const card = document.getElementById(`card-${cardId}`);
  if (card) card.dataset.mode = mode;

  const badge = document.getElementById(`badge-${cardId}`);
  if (badge) { badge.className = `er-mode-badge ${mode}`; badge.textContent = modeLabel(mode); }

  // Refresh mode buttons in config panel
  const panel = document.getElementById(`config-${cardId}`);
  if (panel) {
    panel.querySelectorAll('.er-mode-btn').forEach(btn => {
      const m = btn.className.match(/m-(\w+)/)?.[1];
      btn.classList.toggle('active', m === mode);
    });
  }

  // Re-render task check icon if mode changed
  const check = document.getElementById(`taskcheck-${cardId}`);
  if (mode === 'task' && !check) {
    // Inject task check
    const header = document.querySelector(`#card-${cardId} .er-card-header`);
    if (header) {
      const div = document.createElement('div');
      div.className = 'er-task-check';
      div.id = `taskcheck-${cardId}`;
      div.onclick = () => toggleTaskDone(cardId);
      header.prepend(div);
    }
  } else if (mode !== 'task' && check) {
    check.remove();
  }

  recalcAll();
}

function setCardLeadDays(cardId, val) {
  setCC(cardId, { leadDays: parseInt(val) || 0 });
  recalcAll();
}

function setCardServiceNote(cardId, val) {
  setCC(cardId, { serviceNote: val });
}

/* ─────────────────────────────────────────────────────────
   NAVIGATION + SCROLLING
   ───────────────────────────────────────────────────────── */
function scrollToSection(i) {
  const el = document.getElementById(`section-${i}`);
  if (!el) return;
  const main = document.getElementById('er-main');
  main.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  // Active nav item
  document.querySelectorAll('.er-nav-item').forEach((n, idx) => n.classList.toggle('active', idx === i));
}

function scrollToCard(cardId) {
  const card = CARDS.find(c => c.id === cardId);
  if (card) scrollToSection(card.section);
  setTimeout(() => {
    const el = document.getElementById(`card-${cardId}`);
    if (el) {
      const main = document.getElementById('er-main');
      main.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    }
  }, 350);
}

// Update active section indicator on scroll
function initScrollSpy() {
  const main = document.getElementById('er-main');
  main.addEventListener('scroll', () => {
    const scrollTop = main.scrollTop;
    let active = 0;
    SECTIONS.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`);
      if (el && el.offsetTop - 60 <= scrollTop) active = i;
    });
    document.querySelectorAll('.er-nav-item').forEach((n, i) => n.classList.toggle('active', i === active));
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────
   SAVE / LOAD
   ───────────────────────────────────────────────────────── */
function autoSave() {
  const status = document.getElementById('er-save-status');
  if (status) { status.textContent = '● Saving…'; status.className = 'er-save-status saving'; }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(LS_DRAFT, JSON.stringify(formValues));
    if (status) { status.textContent = '● Saved'; status.className = 'er-save-status saved'; }
  }, 600);
}

function saveDraft() {
  localStorage.setItem(LS_DRAFT, JSON.stringify(formValues));
  const status = document.getElementById('er-save-status');
  if (status) { status.textContent = '● Saved'; status.className = 'er-save-status saved'; }
}

function saveDraftExplicit() {
  const draftName = (formValues['f-name'] || '').trim() || 'Untitled Draft';
  const drafts = getDrafts();

  // Check if a draft with this exact name already exists — update it instead of duplicating
  const existing = drafts.find(d => d.name === draftName);
  if (existing) {
    existing.savedAt = new Date().toISOString();
    existing.values  = { ...formValues };
    existing.date    = formValues['f-date'] || '';
    existing.category= formValues['f-category'] || '';
  } else {
    drafts.unshift({
      draftId:  'draft-' + Date.now(),
      name:     draftName,
      savedAt:  new Date().toISOString(),
      date:     formValues['f-date'] || '',
      category: formValues['f-category'] || '',
      values:   { ...formValues },
    });
  }

  saveDrafts(drafts);
  updateDraftsBadge();

  // Also keep the auto-save slot current
  localStorage.setItem(LS_DRAFT, JSON.stringify(formValues));
  const status = document.getElementById('er-save-status');
  if (status) { status.textContent = '● Saved'; status.className = 'er-save-status saved'; }

  const btn = document.querySelector('.er-sidebar-save-btn');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Saved to Drafts';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2500);
  }
}

/* ── Draft storage helpers ── */
function getDrafts() {
  return JSON.parse(localStorage.getItem(LS_DRAFTS) || '[]');
}
function saveDrafts(drafts) {
  localStorage.setItem(LS_DRAFTS, JSON.stringify(drafts));
}

function updateDraftsBadge() {
  const count = getDrafts().length;
  const badge = document.getElementById('drafts-badge');
  if (!badge) return;
  if (count > 0) { badge.textContent = count; badge.style.display = 'inline-flex'; }
  else badge.style.display = 'none';
}

function renderDraftsView() {
  const drafts = getDrafts();
  const query  = (document.getElementById('er-drafts-search')?.value || '').toLowerCase();
  const filtered = drafts.filter(d => !query || d.name.toLowerCase().includes(query) || (d.category||'').toLowerCase().includes(query));

  // Sidebar info
  const info = document.getElementById('er-drafts-sidebar-info');
  if (info) info.innerHTML = drafts.length === 0
    ? `<div class="er-drafts-sidebar-empty">No saved drafts yet.<br>Fill out the form and click <strong>Save for Later</strong>.</div>`
    : `<div class="er-drafts-sidebar-count">${drafts.length} draft${drafts.length > 1 ? 's' : ''} saved</div>`;

  const container = document.getElementById('er-drafts-cards');
  if (!container) return;
  if (filtered.length === 0) {
    container.innerHTML = '<div class="er-approvals-empty">No drafts found</div>';
    return;
  }

  container.innerHTML = filtered.map(d => {
    const saved = new Date(d.savedAt).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
    const savedTime = new Date(d.savedAt).toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
    const filledCount = Object.values(d.values).filter(v => v && !(Array.isArray(v) && v.length === 0)).length;
    return `<div class="er-draft-card">
      <div class="er-draft-body">
        <div class="er-draft-name">${escHtml(d.name)}</div>
        <div class="er-draft-meta">${escHtml(d.category || 'No category')}${d.date ? ' · ' + d.date : ''}</div>
        <div class="er-draft-meta">Saved ${saved} at ${savedTime} · ${filledCount} field${filledCount !== 1 ? 's' : ''} filled</div>
      </div>
      <div class="er-draft-actions">
        <button class="er-draft-load-btn" onclick="loadDraft('${d.draftId}')">Load</button>
        <button class="er-draft-del-btn" onclick="deleteDraft('${d.draftId}')" title="Delete draft">✕</button>
      </div>
    </div>`;
  }).join('');
}

function loadDraft(draftId) {
  const drafts = getDrafts();
  const draft  = drafts.find(d => d.draftId === draftId);
  if (!draft) return;
  if (Object.keys(formValues).some(k => formValues[k])) {
    if (!confirm(`Load "${draft.name}"? This will replace your current unsaved form data.`)) return;
  }
  formValues = { ...draft.values };
  localStorage.setItem(LS_DRAFT, JSON.stringify(formValues));
  setPageView('form');
  // Re-render form with loaded values
  renderSections();
  populateForm();
  recalcCosts();
  recalcWarnings();
  recalcTasks();
  const status = document.getElementById('er-save-status');
  if (status) { status.textContent = '● Loaded'; status.className = 'er-save-status saved'; }
}

function deleteDraft(draftId) {
  const drafts = getDrafts();
  const draft  = drafts.find(d => d.draftId === draftId);
  if (!draft) return;
  if (!confirm(`Delete draft "${draft.name}"? This cannot be undone.`)) return;
  saveDrafts(drafts.filter(d => d.draftId !== draftId));
  updateDraftsBadge();
  renderDraftsView();
}

function confirmClear() {
  if (!confirm('Clear all form data? This cannot be undone.')) return;
  formValues = {};
  localStorage.removeItem(LS_DRAFT);
  document.querySelectorAll('.er-input, .er-select, .er-textarea').forEach(el => el.value = '');
  document.querySelectorAll('.er-yn-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
  document.querySelectorAll('input[type="radio"]').forEach(el => el.checked = false);
  updateAllConditionals();
  recalcAll();
}

/* ─────────────────────────────────────────────────────────
   SUBMIT
   ───────────────────────────────────────────────────────── */
function submitRequest() {
  // Check required cards are filled
  const missing = [];
  CARDS.forEach(card => {
    const cfg = getCC(card.id);
    if (cfg.mode !== 'required') return;
    const hasSomeValue = card.fields.some(f => {
      if (f.type === 'rooms-link') return true;
      if (f.showIf && !evalShowIf(f.showIf)) return true;
      const v = formValues[f.id];
      if (Array.isArray(v)) return v.length > 0;
      return !!v && v !== '';
    });
    if (!hasSomeValue) missing.push(card.label);
  });

  if (missing.length > 0) {
    alert(`Please fill in the following required sections before submitting:\n\n• ${missing.join('\n• ')}`);
    return;
  }

  // Build summary
  const name = formValues['f-name'] || 'Event';
  const date = formValues['f-date'] || '';
  const lines = [`EVENT REQUEST SUMMARY`, ``, `Event: ${name}`, `Date: ${date}`, ``];

  SECTIONS.forEach((s, si) => {
    const cards = CARDS.filter(c => c.section === si);
    const sectionLines = [];
    cards.forEach(card => {
      card.fields.forEach(f => {
        if (f.type === 'rooms-link') return;
        const v = formValues[f.id];
        if (!v || (Array.isArray(v) && v.length === 0)) return;
        if (!f.label) return;
        const display = Array.isArray(v) ? v.join(', ') : v;
        sectionLines.push(`  ${f.label}: ${display}`);
      });
    });
    if (sectionLines.length > 0) {
      lines.push(`── ${s.title} ──`);
      lines.push(...sectionLines);
      lines.push('');
    }
  });

  const total = document.getElementById('er-total-cost')?.textContent;
  if (total && total !== '$0') lines.push(`Estimated Cost: ${total}`, '');

  // Build structured data snapshot
  const snapshot = {};
  CARDS.forEach(card => {
    card.fields.forEach(f => {
      if (formValues[f.id] !== undefined) snapshot[f.id] = formValues[f.id];
    });
  });

  const costEl = document.getElementById('er-total-cost');
  const req = {
    requestId: 'req-' + Date.now(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
    name,
    date,
    startTime: formValues['f-start-time'] || '',
    endTime: formValues['f-end-time'] || '',
    location: formValues['f-location'] || '',
    category: formValues['f-category'] || '',
    attendance: formValues['f-attendance'] || '',
    description: formValues['f-description'] || '',
    estimatedCost: costEl ? costEl.textContent : '$0',
    snapshot,
    denyReason: '',
    denySuggestions: [],
  };

  const all = JSON.parse(localStorage.getItem('wm_eventRequests') || '[]');
  all.unshift(req);
  localStorage.setItem('wm_eventRequests', JSON.stringify(all));
  syncPendingRooms();
  updateApprovalBadge();

  // Clear draft after submit
  localStorage.removeItem(LS_DRAFT);
  formValues = {};

  alert(`Event request for "${name}" has been submitted for approval!\n\nSwitch to the Approvals tab to track its status.`);

  // Jump to approvals view
  setPageView('approvals');
}

/* ─────────────────────────────────────────────────────────
   EVENT APPROVALS SYSTEM
   ───────────────────────────────────────────────────────── */

let _currentPageView   = 'form';
let _approvalFilter    = 'all';
let _approvalYear      = null;   // null = all years
let _approvalTimeframe = 'all';  // all | q1 | q2 | q3 | q4
let _approvalSort      = 'date-asc'; // date-asc | date-desc | name-asc | name-desc
let _approvalMonth     = null;   // YYYY-MM of currently displayed month
let _selectedRequestId = null;
let _selectedDay       = null;   // YYYY-MM-DD of selected day filter, null = whole month
const PAGE_SIZE        = 100;
let _approvalsPage     = 0;

function setPageView(view) {
  _currentPageView = view;
  const isForm      = view === 'form';
  const isDrafts    = view === 'drafts';
  const isApprovals = view === 'approvals';

  // Header buttons
  document.getElementById('btn-form').classList.toggle('active', isForm);
  document.getElementById('btn-drafts').classList.toggle('active', isDrafts);
  document.getElementById('btn-approvals').classList.toggle('active', isApprovals);

  // Config btn only relevant in form view
  const configBtn = document.getElementById('er-config-btn');
  if (configBtn) configBtn.style.display = isForm ? '' : 'none';

  // Sidebar
  document.getElementById('er-sidebar-form').style.display     = isForm      ? '' : 'none';
  document.getElementById('er-sidebar-drafts').style.display   = isDrafts    ? '' : 'none';
  document.getElementById('er-sidebar-approvals').style.display= isApprovals ? '' : 'none';

  // Main
  document.getElementById('er-form-view').style.display      = isForm      ? '' : 'none';
  document.getElementById('er-drafts-list').style.display    = isDrafts    ? '' : 'none';
  document.getElementById('er-approvals-list').style.display = isApprovals ? '' : 'none';

  // Right panel
  document.getElementById('er-right-form').style.display    = isForm      ? '' : 'none';
  document.getElementById('er-right-drafts').style.display  = isDrafts    ? '' : 'none';
  document.getElementById('er-right-detail').style.display  = isApprovals ? '' : 'none';

  if (isDrafts)    renderDraftsView();
  if (isApprovals) { _approvalsPage = 0; renderApprovalStats(); renderApprovalYearTabs(); renderApprovalsList(); renderDetailPanel(null); }
}

function getRequests() {
  return JSON.parse(localStorage.getItem('wm_eventRequests') || '[]');
}
function saveRequests(all) {
  localStorage.setItem('wm_eventRequests', JSON.stringify(all));
  /* Write-through: keep calendar.csv in sync */
  if (window.CsvApi && CsvApi.isLoaded()) {
    CsvApi.syncFromLocalStorage();
    CsvApi.save().catch(e => console.warn('[saveRequests → CSV]', e));
  }
}

/* Merged submitted requests + imported calendar events */
function getAllApprovals() {
  const submitted = getRequests();
  const calImport = JSON.parse(localStorage.getItem('wm_calendarImport') || '[]');
  return [...submitted, ...calImport];
}

function findApproval(id) {
  return getAllApprovals().find(r => r.requestId === id) || null;
}

function updateApprovalBadge() {
  const pending = getRequests().filter(r => r.status === 'pending').length;
  const badge = document.getElementById('approval-badge');
  if (!badge) return;
  badge.textContent = pending;
  badge.style.display = pending > 0 ? 'inline-flex' : 'none';
}

function renderApprovalStats() {
  const submitted = getRequests();
  const calCount  = JSON.parse(localStorage.getItem('wm_calendarImport') || '[]').length;
  const counts    = { pending:0, approved:0, denied:0 };
  submitted.forEach(r => { if (counts[r.status] !== undefined) counts[r.status]++; });
  counts.approved += calCount;
  const el = document.getElementById('er-approval-stats');
  if (!el) return;
  el.innerHTML = `
    <div class="er-stat-item pending"><span class="er-stat-num">${counts.pending}</span><span class="er-stat-label">Pending</span></div>
    <div class="er-stat-item approved"><span class="er-stat-num">${counts.approved}</span><span class="er-stat-label">Approved</span></div>
    <div class="er-stat-item denied"><span class="er-stat-num">${counts.denied}</span><span class="er-stat-label">Denied</span></div>
  `;
  renderApprovalYearTabs();
  updateCalSyncStatus();
}

function updateCalSyncStatus() {
  const el = document.getElementById('er-cal-sync-status');
  if (!el) return;
  const ts = localStorage.getItem('wm_calendarImportDate');
  const count = JSON.parse(localStorage.getItem('wm_calendarImport') || '[]').length;
  if (ts && count > 0) {
    const d = new Date(ts).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'});
    el.textContent = `✓ ${count.toLocaleString()} events — synced ${d}`;
  } else {
    el.textContent = 'Not synced yet';
  }
}

/* ── Year tabs ── */
function renderApprovalYearTabs() {
  const el = document.getElementById('er-year-tabs');
  if (!el) return;
  const all   = getAllApprovals();
  const years = [...new Set(all.map(r => r.date?.substring(0,4)).filter(Boolean))].sort().reverse();
  el.innerHTML = ['all', ...years].map(y =>
    `<button class="er-year-btn${(!_approvalYear && y==='all') || _approvalYear===y ? ' active' : ''}" onclick="setApprovalYear('${y}')">${y === 'all' ? 'All' : y}</button>`
  ).join('');
}

function setApprovalYear(y) {
  _approvalYear  = y === 'all' ? null : y;
  _approvalMonth = null;
  _approvalsPage = 0;
  renderApprovalYearTabs();
  renderApprovalsList();
}

function setApprovalTimeframe(tf) {
  _approvalTimeframe = tf;
  _approvalMonth     = null;
  _approvalsPage     = 0;
  document.querySelectorAll('.er-tf-btn').forEach(b => b.classList.toggle('active', b.dataset.tf === tf));
  renderApprovalsList();
}

function setApprovalFilter(f) {
  _approvalFilter = f;
  _approvalMonth  = null;
  _approvalsPage  = 0;
  document.querySelectorAll('#er-approval-filters .er-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === f));
  renderApprovalsList();
}

function setApprovalSort(s) {
  _approvalSort  = s;
  _approvalMonth = null;
  renderApprovalsList();
}

function setApprovalMonth(ym) {
  if (!ym || ym === 'null') return;
  _approvalMonth = ym;
  _selectedDay   = null;   // clear day filter when navigating months
  renderApprovalsList();
  renderMiniCal();
}

/* ── Mini calendar ── */
function renderMiniCal() {
  const container = document.getElementById('er-mini-cal');
  if (!container || _currentPageView !== 'approvals') return;

  const filtered  = getFilteredApprovals();
  const curMonth  = _approvalMonth || new Date().toISOString().substring(0,7);
  const [year, month] = curMonth.split('-').map(Number);

  // Build set of dates that have events in this month
  const eventDates = new Set(
    filtered
      .filter(r => r.date && r.date.substring(0,7) === curMonth)
      .map(r => r.date)
  );

  const today      = new Date().toISOString().substring(0,10);
  const firstDay   = new Date(year, month - 1, 1).getDay();  // 0=Sun
  const daysInMon  = new Date(year, month, 0).getDate();
  const monthLabel = new Date(year, month - 1, 1)
    .toLocaleDateString('en-US', {month:'long', year:'numeric'});

  // Day-of-week headers
  const dowRow = ['Su','Mo','Tu','We','Th','Fr','Sa']
    .map(d => `<div class="er-mc-dow">${d}</div>`).join('');

  // Day cells
  let cells = '';
  for (let i = 0; i < firstDay; i++) cells += `<div class="er-mc-cell empty"></div>`;
  for (let d = 1; d <= daysInMon; d++) {
    const ds  = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const cls = ['er-mc-cell',
      eventDates.has(ds)  ? 'has-events' : '',
      ds === _selectedDay ? 'selected'   : '',
      ds === today        ? 'today'      : '',
    ].filter(Boolean).join(' ');
    const dot = eventDates.has(ds) ? '<span class="er-mc-dot"></span>' : '';
    cells += `<div class="${cls}" onclick="setMiniCalDay('${ds}')">${d}${dot}</div>`;
  }

  container.innerHTML = `
    <div class="er-mini-cal-wrap">
      <div class="er-mc-header">
        <button class="er-mc-nav" onclick="miniCalPrev()">‹</button>
        <span class="er-mc-label">${monthLabel}</span>
        <button class="er-mc-nav" onclick="miniCalNext()">›</button>
      </div>
      <div class="er-mc-grid">${dowRow}${cells}</div>
      ${_selectedDay ? `<div class="er-mc-clear-wrap"><button class="er-mc-clear" onclick="setMiniCalDay('${_selectedDay}')">✕ Clear day filter</button></div>` : ''}
    </div>`;
}

function setMiniCalDay(ds) {
  _selectedDay = (_selectedDay === ds) ? null : ds;
  renderApprovalsList();
  // renderMiniCal is called inside renderApprovalsList
}

function miniCalPrev() {
  const [y, m] = (_approvalMonth || new Date().toISOString().substring(0,7)).split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  setApprovalMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`);
}

function miniCalNext() {
  const [y, m] = (_approvalMonth || new Date().toISOString().substring(0,7)).split('-').map(Number);
  const d = new Date(y, m, 1);
  setApprovalMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`);
}

function getFilteredApprovals() {
  const Q = { q1:[1,2,3], q2:[4,5,6], q3:[7,8,9], q4:[10,11,12] };
  const query = (document.getElementById('er-approvals-search')?.value || '').toLowerCase();
  return getAllApprovals().filter(r => {
    if (_approvalFilter !== 'all' && r.status !== _approvalFilter) return false;
    if (_approvalYear && r.date?.substring(0,4) !== _approvalYear) return false;
    if (_approvalTimeframe !== 'all' && r.date) {
      const m = parseInt(r.date.substring(5,7));
      if (!Q[_approvalTimeframe]?.includes(m)) return false;
    }
    if (query && !r.name?.toLowerCase().includes(query) && !(r.category||'').toLowerCase().includes(query) && !(r.location||'').toLowerCase().includes(query)) return false;
    return true;
  }).sort((a,b) => {
    switch (_approvalSort) {
      case 'date-desc': return (b.date||'').localeCompare(a.date||'');
      case 'name-asc':  return (a.name||'').localeCompare(b.name||'');
      case 'name-desc': return (b.name||'').localeCompare(a.name||'');
      default:          return (a.date||'').localeCompare(b.date||'');
    }
  });
}

function renderApprovalsList() {
  const filtered  = getFilteredApprovals();
  const container = document.getElementById('er-approvals-cards');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = '<div class="er-approvals-empty">No events found for this filter</div>';
    return;
  }

  // Build ordered list of unique months
  const allMonths = [...new Set(filtered.map(r => r.date ? r.date.substring(0,7) : '__nodate__'))].sort();

  // Auto-select month if unset or no longer valid
  if (!_approvalMonth || !allMonths.includes(_approvalMonth)) {
    _approvalMonth = allMonths[0];
  }

  const idx       = allMonths.indexOf(_approvalMonth);
  const prevMonth = idx > 0              ? allMonths[idx - 1] : null;
  const nextMonth = idx < allMonths.length - 1 ? allMonths[idx + 1] : null;

  const monthEvents = filtered.filter(r =>
    (r.date ? r.date.substring(0,7) : '__nodate__') === _approvalMonth
  );

  const monthLabel = _approvalMonth === '__nodate__' ? 'No Date'
    : new Date(_approvalMonth + '-02').toLocaleDateString('en-US', {month:'long', year:'numeric'});

  const monthOptions = allMonths.map(m => {
    const cnt = filtered.filter(r => (r.date ? r.date.substring(0,7) : '__nodate__') === m).length;
    const lbl = m === '__nodate__' ? 'No Date'
      : new Date(m + '-02').toLocaleDateString('en-US', {month:'long', year:'numeric'});
    return `<option value="${m}"${m === _approvalMonth ? ' selected' : ''}>${lbl} (${cnt})</option>`;
  }).join('');

  const nav = `<div class="er-month-nav">
    <button class="er-month-nav-btn" onclick="setApprovalMonth('${prevMonth}')" ${!prevMonth ? 'disabled' : ''}>‹</button>
    <select class="er-month-jump" onchange="setApprovalMonth(this.value)">${monthOptions}</select>
    <button class="er-month-nav-btn" onclick="setApprovalMonth('${nextMonth}')" ${!nextMonth ? 'disabled' : ''}>›</button>
    <span class="er-month-nav-total">${filtered.length.toLocaleString()} events · ${allMonths.length} months</span>
  </div>`;

  // Apply day filter if a specific day is selected
  const displayEvents = _selectedDay
    ? monthEvents.filter(r => r.date === _selectedDay)
    : monthEvents;

  const dayHeader = _selectedDay ? `<div class="er-day-filter-bar">
    <span>📅 ${new Date(_selectedDay + 'T00:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</span>
    <button class="er-day-filter-clear" onclick="setMiniCalDay('${_selectedDay}')">✕ Show all</button>
  </div>` : '';

  let body = '';
  if (displayEvents.length === 0) {
    body = `<div class="er-approvals-empty">No events ${_selectedDay ? 'on this day' : 'this month'}</div>`;
  } else {
    // Group by ministry — day view sorts within group by time, month view by date+time
    const groups = {};
    displayEvents.forEach(r => {
      const cat = (r.category || '').trim() || (r.fromCalendar ? inferCategory(r.name) : 'Other');
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(r);
    });
    Object.values(groups).forEach(g =>
      g.sort((a, b) => {
        const dateCmp = (a.date || '').localeCompare(b.date || '');
        return dateCmp !== 0 ? dateCmp : (a.startTime || '').localeCompare(b.startTime || '');
      })
    );
    const sortedCats = Object.keys(groups).sort((a, b) => {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return a.localeCompare(b);
    });
    body = sortedCats.map(cat => `
      <div class="er-ministry-group">
        <div class="er-ministry-header" style="background:${ministryColor(cat)}">
          <span class="er-ministry-name">${escHtml(cat)}</span>
          <span class="er-ministry-count">${groups[cat].length}</span>
        </div>
        ${groups[cat].map(r => buildRequestCard(r)).join('')}
      </div>`).join('');
  }

  container.innerHTML = nav + dayHeader + body;

  renderMiniCal();
}

function buildReadinessChecklist(req) {
  if (!req || req.status !== 'approved') return '';
  const checks = [
    { key: 'room',   label: 'Room booked',          icon: '🏢' },
    { key: 'budget', label: 'Budget approved',       icon: '💰' },
    { key: 'comms',  label: 'Communications sent',   icon: '📢' },
    { key: 'reg',    label: 'Registration open',     icon: '📝' },
  ];
  const r    = getReadiness(req.requestId);
  const done = checks.filter(c => r[c.key]).length;
  const pct  = Math.round((done / checks.length) * 100);
  const color = pct === 100 ? '#16a34a' : pct >= 50 ? '#d97706' : '#6b7280';

  return `<div class="er-readiness">
    <div class="er-readiness-header">
      <span class="er-readiness-title">Event Readiness</span>
      <span class="er-readiness-pct" style="color:${color}">${pct}%</span>
    </div>
    <div class="er-readiness-bar"><div class="er-readiness-fill" style="width:${pct}%;background:${color}"></div></div>
    <div class="er-readiness-checks">
      ${checks.map(c => `
        <label class="er-readiness-item${r[c.key] ? ' done' : ''}">
          <input type="checkbox" ${r[c.key] ? 'checked' : ''} onchange="setReadiness('${escAttr(req.requestId)}','${c.key}',this.checked)">
          <span class="er-ri-icon">${c.icon}</span>
          <span class="er-ri-label">${c.label}</span>
        </label>`).join('')}
    </div>
  </div>`;
}

/* ─────────────────────────────────────────────────────────
   FEATURE: Event Completeness Score
   ───────────────────────────────────────────────────────── */
function getCompletenessScore(req) {
  const snap = req.snapshot || {};
  const rd   = getReadiness(req.requestId);

  const fields = [
    { label: 'Event Name',    filled: !!(snap['f-name']             || req.name) },
    { label: 'Date',          filled: !!(snap['f-date']             || req.date) },
    { label: 'Contact Email', filled: !!(snap['f-contact-email']) },
    { label: 'Location',      filled: !!(snap['f-location']         || req.location) },
    { label: 'Attendance',    filled: !!(snap['f-attendance']       || req.attendance) },
    { label: 'Description',   filled: !!(snap['f-description']      || req.description) },
    { label: 'Category',      filled: !!(snap['f-category']         || req.category) },
    { label: 'Room Booked',   filled: !!rd.room },
    { label: 'Budget',        filled: !!(rd.budget || (req.estimatedCost && req.estimatedCost !== '$0' && req.estimatedCost !== '0')) },
  ];

  const missing = fields.filter(f => !f.filled).map(f => f.label);
  const rawPct  = (fields.filter(f => f.filled).length / fields.length) * 100;
  const score   = Math.round(rawPct / 5) * 5;   // round to nearest 5
  return { score, missing };
}

/* ─────────────────────────────────────────────────────────
   FEATURE: Duplicate Detector
   ───────────────────────────────────────────────────────── */
function _normName(name) {
  return (name || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function _wordOverlap(a, b) {
  const wa = new Set(_normName(a).split(/\s+/).filter(Boolean));
  const wb = new Set(_normName(b).split(/\s+/).filter(Boolean));
  if (!wa.size && !wb.size) return 0;
  const shared = [...wa].filter(w => wb.has(w)).length;
  const total  = new Set([...wa, ...wb]).size;
  return total ? shared / total : 0;
}

function findDuplicates(name, dateIso) {
  if (!name) return [];
  const all = getRequests();
  const results = [];
  const refMs = dateIso ? new Date(dateIso + 'T00:00:00').getTime() : null;

  all.forEach(req => {
    const sim = _wordOverlap(name, req.name);
    if (sim <= 0.7) return;
    if (!refMs || !req.date) return;
    const reqMs    = new Date(req.date + 'T00:00:00').getTime();
    const daysDiff = Math.abs(Math.round((reqMs - refMs) / 86400000));
    if (daysDiff > 30) return;
    results.push({ req, similarity: sim, daysDiff });
  });

  return results;
}

function buildRequestCard(r) {
  const selected = r.requestId === _selectedRequestId;
  const calTag   = r.fromCalendar ? `<span class="er-cal-tag">CSV</span>` : '';

  // Formatted date: "Wed, Jan 4"
  let dateStr = 'No date';
  if (r.date) {
    const d = new Date(r.date + 'T00:00:00');
    dateStr = d.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'});
  }

  // Time range
  const timeStr = r.startTime
    ? `<div class="er-req-time">${escHtml(r.startTime)}${r.endTime ? ' – ' + escHtml(r.endTime) : ''}</div>`
    : '';

  // Category chip (only if non-empty)
  const catChip = r.category
    ? `<span class="er-req-cat-chip">${escHtml(r.category)}</span>`
    : '';

  // Location
  const locLine = r.location
    ? `<div class="er-req-loc">📍 ${escHtml(r.location)}</div>`
    : '';

  // Attendance
  const att = r.attendance || (r.snapshot && r.snapshot['f-attendance']);
  const attLine = att
    ? `<span style="font-size:.72rem;color:var(--sub);">👥 ${escHtml(String(att))}</span>`
    : '';

  // Description snippet
  const desc = r.description || (r.snapshot && r.snapshot['f-description']) || '';
  const descLine = desc
    ? `<div class="er-req-desc">${escHtml(desc.slice(0, 90))}${desc.length > 90 ? '…' : ''}</div>`
    : '';

  // Badge only for pending / denied — approved is implied by the green dot
  const badge = r.status !== 'approved'
    ? `<div class="er-req-badge ${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</div>`
    : '';

  const readinessBadge = (() => {
    if (r.status !== 'approved') return '';
    const checks = ['room','budget','comms','reg'];
    const rd = getReadiness(r.requestId);
    const done = checks.filter(k => rd[k]).length;
    if (done === 0) return '';
    const pct = Math.round((done/checks.length)*100);
    const color = pct===100?'#16a34a':pct>=50?'#d97706':'#6b7280';
    return `<span class="er-readiness-chip" style="background:${color}20;color:${color};border:1px solid ${color}40">${pct}% ready</span>`;
  })();

  // Completeness bar — approved events only
  const completenessBar = (() => {
    if (r.status !== 'approved') return '';
    const { score } = getCompletenessScore(r);
    const fillColor = score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';
    const pctClass  = score >= 80 ? 'green' : score >= 50 ? 'amber' : 'red';
    return `<div class="er-completeness-bar">
      <div class="er-completeness-track"><div class="er-completeness-fill ${pctClass}" style="width:${score}%"></div></div>
      <span class="er-completeness-pct" style="color:${fillColor}">${score}%</span>
    </div>`;
  })();

  // Duplicate badge — pending events only
  const dupBadge = (() => {
    if (r.status !== 'pending') return '';
    const dups = findDuplicates(r.name, r.date);
    if (!dups.length) return '';
    return `<span class="er-dup-badge">⚠️ Similar</span>`;
  })();

  return `<div class="er-request-card ${r.status}${selected ? ' selected' : ''}" onclick="selectRequest('${escAttr(r.requestId)}')">
    <div class="er-req-status-dot ${r.status}"></div>
    <div class="er-req-body">
      <div class="er-req-name">${escHtml(r.name || 'Untitled')} ${calTag}${catChip}</div>
      ${locLine}
      ${attLine || descLine ? `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">${attLine}${descLine}</div>` : ''}
      ${completenessBar}
    </div>
    <div class="er-req-right">
      <div class="er-req-date">${dateStr}</div>
      ${timeStr}
      ${badge}
      ${dupBadge}
      ${readinessBadge}
    </div>
  </div>`;
}

function selectRequest(id) {
  _selectedRequestId = id;
  renderApprovalsList();
  renderDetailPanel(findApproval(id));
}

/* ── Ministry categories: same patterns + colors as calendar.js ── */
const MINISTRY_CATS = {
  'Sunday Services':        { color: '#003A5D', pattern: /sunday service|easter|good friday|bilingual service|csi sundays/i },
  'Kids Team':              { color: '#B5712A', pattern: /\bkids\b|preschool|kaleidoscope|\bk1\b|23 kids|45 kids|midweek membership|elementary leader|field day|\d(st|th) grade celebration|family fun day|risd spring|father-son/i },
  'Ministry Programs':      { color: '#1E5E7A', pattern: /legacy \d/i },
  'Equipping Team':         { color: '#2E6B5E', pattern: /small group|discipleship group|community group|asida|multiplying discipleship|equipped disciple|equip disciple|men'?s bible study|join the journey|sign language class|financial catalyst|dad u |moneywise|\bwbs\b|discipleship info|disciple-making intensive|careers in motion/i },
  'Care Team':              { color: '#7A3E5C', pattern: /support group|care ministry|feeding support|infertility|miscarriage|prenatal|courageous hope|prodigal|\bmend\b|\bblended\b|oasis single parent|worth more|\brefuge\b|recess|unexpected pregnancy|foster care|expecting parents|reclaimed|\bnest\b|deaf|wellness collective|care forum|woven|parent training|additional care|\bch\b spring.*leader|re:generation(?! for students)/i },
  'Special Events':         { color: '#8B3A28', pattern: /baptism|holiday|retreat|trip information|young adult trip|pine cove|community group weekend|night of prayer|night of remembrance|if: one night|\brfs\b/i },
  'Leadership Team':        { color: '#48565A', pattern: /staff prayer|leadership meeting|leadership team|team meeting|square one|staff |connecting team|march madness|slt meeting|\bclc\b|budget week|semester|young leader cohort|worship team nights|\btbc\b|lead team|strategic planning|business cohort|leader celebration|budgets due|gather leadership/i },
  'Missions & Outreach':    { color: '#C2653C', pattern: /\bmissions?\b|mission of god|dominican republic|ethiopia trip|wisi|street outreach|local outreach|wme volunteer|dallas justice|love thy neighbor|great question/i },
  'Students & College':     { color: '#2889A0', pattern: /\brally\b|re:g?eneration for students|shoreline|6th hour|\bdtown\b|bagels.*bibles|dallas experience|camp barnabas|prom|senior celebration|unashamed|family dt trip|^wake\b/i },
  'Operations Team':        { color: '#556270', pattern: /\bsmmt\b|cyber patrol|memorial day/i },
  'Marriage Team':          { color: '#B04F6D', pattern: /\bmerge\b|re\|engage|divorce recovery|grief share|grief recovery/i },
  'Young Adults':           { color: '#6A4C93', pattern: /\bporch\b|disciple maker/i },
  'Institute Team':         { color: '#3A7D44', pattern: /stand and deliver|dts commencement/i },
  'Community & Connecting': { color: '#4A8FA8', pattern: /community formation|\bfoundation group\b|\bgather\b|connecting basic|connecting volunteer|weekend membership|shepherd huddle|launcher training|fomacion|women'?s family leadership|frontlines/i },
  'Watermark en Espanol':   { color: '#C17D2A', pattern: /watermark en espanol/i },
  'Health & CDC':           { color: '#5B8C5A', pattern: /\bcdc\b|watermark health/i },
  'Family Team':            { color: '#A0783B', pattern: /trail life/i },
};
function ministryColor(cat) { return (MINISTRY_CATS[cat] || {}).color || '#6B7880'; }
function inferCategory(name) {
  if (!name) return 'Other';
  for (const [cat, def] of Object.entries(MINISTRY_CATS)) {
    if (def.pattern.test(name)) return cat;
  }
  return 'Other';
}

/* ── Calendar CSV import ── */
function importCalendarEvents() {
  const btn    = document.getElementById('er-cal-sync-btn');
  const status = document.getElementById('er-cal-sync-status');
  if (btn) { btn.disabled = true; btn.textContent = '⟳ Syncing…'; }
  if (status) status.textContent = 'Fetching calendar.csv…';

  Papa.parse('calendar.csv', {
    download: true, header: true, skipEmptyLines: true,
    complete(results) {
      const events = results.data.map((row, i) => {
        const raw = (row['Start Date'] || '').trim();
        if (!raw) return null;
        const p = raw.split('/');
        if (p.length < 3) return null;
        const date = `${p[2]}-${p[0].padStart(2,'0')}-${p[1].padStart(2,'0')}`;
        return {
          requestId:   'csv-' + i,
          fromCalendar: true,
          status:      'approved',
          name:         (row['Subject'] || '').trim() || 'Untitled',
          date,
          startTime:    (row['Start Time'] || '').trim(),
          endTime:      (row['End Time']   || '').trim(),
          location:     (row['Location']   || '').trim(),
          category:     inferCategory((row['Subject'] || '').trim()),
          attendance:   '',
          description:  '',
          estimatedCost:'$0',
          snapshot:     {},
          submittedAt:  new Date().toISOString(),
          approvedAt:   new Date().toISOString(),
          denyReason:   '',
          denySuggestions: [],
        };
      }).filter(Boolean);

      localStorage.setItem('wm_calendarImport', JSON.stringify(events));
      localStorage.setItem('wm_calendarImportDate', new Date().toISOString());
      if (btn) { btn.disabled = false; btn.textContent = '⟳ Sync from Calendar CSV'; }
      _approvalsPage = 0;
      renderApprovalStats();
      renderApprovalYearTabs();
      renderApprovalsList();
    },
    error() {
      if (btn) { btn.disabled = false; btn.textContent = '⟳ Sync from Calendar CSV'; }
      if (status) status.textContent = '✗ Could not load calendar.csv';
    },
  });
}

function renderDetailPanel(req) {
  const placeholder = document.getElementById('er-detail-placeholder');
  const panel = document.getElementById('er-detail-panel');
  if (!req) {
    placeholder.style.display = '';
    panel.style.display = 'none';
    return;
  }
  placeholder.style.display = 'none';
  panel.style.display = '';

  const days = getDaysUntilEvent(req.date);
  const urgencyClass = days < 7 ? 'urgent' : days < 21 ? 'soon' : '';
  const submitted = req.submittedAt ? new Date(req.submittedAt).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) : '—';

  const actionArea = req.fromCalendar ? `
    <div class="er-cal-event-note">📅 This event is from the master calendar CSV and is already on the calendar.</div>
  ` : req.status === 'pending' ? `
    <div class="er-detail-actions" data-requires="admin">
      <button class="er-action-approve" onclick="approveRequest('${req.requestId}')">✓ Approve</button>
      <button class="er-action-deny" onclick="showDenyPanel('${req.requestId}')">✗ Deny</button>
    </div>
  ` : req.status === 'approved' ? `
    <div class="er-detail-actions" data-requires="admin">
      <button class="er-action-revoke" onclick="revokeApproval('${req.requestId}')">↩ Revoke Approval</button>
      <button class="er-action-clone" onclick="cloneRequest('${req.requestId}')">⧉ Clone as New Request</button>
    </div>
  ` : `
    <div class="er-deny-summary">
      <div class="er-deny-label">Denial Reason:</div>
      <div class="er-deny-reason-text">${escHtml(req.denyReason || 'No reason provided')}</div>
      ${req.denySuggestions && req.denySuggestions.length > 0 ? `
        <div class="er-deny-label" style="margin-top:10px">Suggested Changes:</div>
        <ul class="er-deny-suggestions-list">${req.denySuggestions.map(s=>`<li>${escHtml(s)}</li>`).join('')}</ul>
      ` : ''}
    </div>
    <div class="er-detail-actions" data-requires="admin">
      <button class="er-action-revoke" onclick="revokeApproval('${req.requestId}')">↩ Re-open as Pending</button>
    </div>
  `;

  // Build field snapshot display
  const snapshotRows = [];
  SECTIONS.forEach((s, si) => {
    const cards = CARDS.filter(c => c.section === si);
    const rows = [];
    cards.forEach(card => {
      card.fields.forEach(f => {
        if (f.type === 'rooms-link') return;
        const v = req.snapshot && req.snapshot[f.id];
        if (!v || (Array.isArray(v) && v.length === 0) || !f.label) return;
        const display = Array.isArray(v) ? v.join(', ') : v;
        rows.push(`<div class="er-detail-row"><span class="er-detail-row-label">${escHtml(f.label)}</span><span class="er-detail-row-val">${escHtml(display)}</span></div>`);
      });
    });
    if (rows.length) {
      snapshotRows.push(`<div class="er-detail-section-hdr">${s.icon} ${s.title}</div>${rows.join('')}`);
    }
  });

  // Check for linked room reservation (rooms confirmed indicator)
  const allRsvs = (() => { try { return JSON.parse(localStorage.getItem('roomReservations')||'[]'); } catch { return []; } })();
  const linkedRsv = allRsvs.find(r => r.linkedRequestId === req.requestId);

  // Check for room conflicts (other reservations on the same date)
  const minsFromMid = t => { if (!t) return 0; const [h,m]=(t||'00:00').split(':').map(Number); return h*60+(m||0); };
  const reqStart = minsFromMid(req.startTime), reqEnd = minsFromMid(req.endTime) || 1440;
  const conflicts = !req.fromCalendar && req.date ? allRsvs.filter(r => {
    if (r.date !== req.date) return false;
    if (r.linkedRequestId === req.requestId) return false;
    const s = minsFromMid(r.startTime), e = minsFromMid(r.endTime) || 1440;
    return s < reqEnd && e > reqStart;
  }) : [];

  const roomStatusHtml = linkedRsv
    ? `<div class="er-rooms-confirmed">🏢 Rooms Confirmed · ${escHtml(linkedRsv.subject)} <span class="er-rooms-conf-meta">${linkedRsv.startTime||''}${linkedRsv.endTime?' – '+linkedRsv.endTime:''}</span></div>`
    : (!req.fromCalendar && req.status !== 'denied')
      ? `<div class="er-rooms-unconfirmed">🏢 No rooms booked yet — <a href="rooms.html" target="_blank">Open Room Planner</a></div>`
      : '';

  const conflictHtml = conflicts.length ? `
    <div class="er-room-conflict-warn">
      ⚠️ ${conflicts.length} room conflict${conflicts.length>1?'s':''} on this date:
      <ul>${conflicts.map(c=>`<li><strong>${escHtml(c.subject)}</strong> · ${escHtml(c.startTime||'')}${c.endTime?' – '+escHtml(c.endTime):''}</li>`).join('')}</ul>
    </div>` : '';

  // Completeness section (approved events only)
  const completenessSection = (() => {
    if (req.status !== 'approved') return '';
    const { score, missing } = getCompletenessScore(req);
    const fillColor = score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';
    const pctClass  = score >= 80 ? 'green' : score >= 50 ? 'amber' : 'red';
    const chipsHtml = missing.length
      ? missing.map(m => `<span class="er-missing-chip">${escHtml(m)}</span>`).join('')
      : '<span style="font-size:.75rem;color:var(--sub);">All key fields filled ✓</span>';
    return `<div class="er-completeness-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sub);">Completeness</span>
        <span style="font-size:1.3rem;font-weight:800;color:${fillColor}">${score}%</span>
      </div>
      <div class="er-completeness-track" style="margin-bottom:8px;">
        <div class="er-completeness-fill ${pctClass}" style="width:${score}%"></div>
      </div>
      ${missing.length ? `<div style="font-size:.68rem;color:var(--sub);margin-bottom:4px;">Missing fields:</div>` : ''}
      <div style="display:flex;flex-wrap:wrap;gap:4px;">${chipsHtml}</div>
    </div>`;
  })();

  panel.innerHTML = `
    <div class="er-detail-hdr">
      <div class="er-detail-name">${escHtml(req.name || 'Untitled')}</div>
      <div class="er-detail-status-badge ${req.status}">${req.status.charAt(0).toUpperCase()+req.status.slice(1)}</div>
    </div>
    <div class="er-detail-meta">
      <span>📅 ${req.date || 'No date'}${req.date ? ' <span class="er-days-label '+urgencyClass+'">('+days+'d away)</span>' : ''}</span>
      <span>📍 ${escHtml(req.location || '—')}</span>
      <span>👥 ${escHtml(String(req.attendance || '—'))}</span>
      <span>💰 ${escHtml(req.estimatedCost || '$0')}</span>
      <span>📌 ${escHtml(req.category || '—')}</span>
      <span>🕐 Submitted ${submitted}</span>
    </div>
    ${req.description ? `<div class="er-detail-desc">${escHtml(req.description)}</div>` : ''}
    ${buildReadinessChecklist(req)}
    ${roomStatusHtml}
    ${conflictHtml}
    ${actionArea}
    ${buildNotifyButton(req)}
    <div id="er-deny-form-${req.requestId}" class="er-deny-form" style="display:none" data-requires="admin">
      <div class="er-deny-form-title">Denial Details</div>
      <textarea class="er-deny-textarea" id="er-deny-reason-${req.requestId}" placeholder="Explain why this request is being denied…"></textarea>
      <button class="er-suggest-btn" onclick="generateSuggestions('${req.requestId}')">💡 Auto-generate Suggestions</button>
      <div id="er-suggestions-preview-${req.requestId}" class="er-suggestions-preview"></div>
      <div class="er-deny-form-actions">
        <button class="er-action-deny" onclick="confirmDeny('${req.requestId}')">Confirm Denial</button>
        <button class="er-action-cancel" onclick="renderDetailPanel(getRequests().find(r=>r.requestId==='${req.requestId}'))">Cancel</button>
      </div>
    </div>
    ${completenessSection}
    <div class="er-detail-snapshot">${snapshotRows.join('')}</div>
  `;

  // Re-apply role visibility so dynamically-rendered data-requires elements are gated
  if (window.AppRole) AppRole.applyVisibility();
}

function autoBookRoomsForRequest(req) {
  const roomNotes = ((req.snapshot && req.snapshot['f-rooms-notes']) || '').trim();
  if (!roomNotes || !req.date || !req.name) return;
  try {
    const rsvs = JSON.parse(localStorage.getItem('roomReservations') || '[]');
    if (rsvs.some(r => r.linkedRequestId === req.requestId)) return; // already booked
    rsvs.push({
      id: 'rsv-auto-' + req.requestId,
      roomId: '',
      subject: req.name,
      ministry: req.category || '',
      date: req.date,
      startTime: req.startTime || '09:00',
      endTime:   req.endTime   || '11:00',
      notes: roomNotes,
      status: 'needs-room',
      linkedRequestId: req.requestId,
      linkedEventSubject: req.name,
    });
    localStorage.setItem('roomReservations', JSON.stringify(rsvs));
  } catch(e) {}
}

function pushBudgetFromRequest(req) {
  if (!req.name) return;
  try {
    const s = req.snapshot || {};
    const totalNum = parseFloat((req.estimatedCost || '0').replace(/[^0-9.]/g,'')) || 0;
    const budgets = JSON.parse(localStorage.getItem('eventBudgets') || '{}');
    budgets[req.name] = {
      eventName:    req.name,
      eventDate:    req.date || '',
      requestId:    req.requestId,
      total:        totalNum,
      estimateId:   budgets[req.name]?.estimateId || null,
      updatedAt:    Date.now(),
      fromRequest:  true,
      avCost:       parseFloat((s['f-av-cost']       ||'0').toString().replace(/[^0-9.]/g,''))||0,
      cateringCost: parseFloat((s['f-catering-cost'] ||'0').toString().replace(/[^0-9.]/g,''))||0,
    };
    localStorage.setItem('eventBudgets', JSON.stringify(budgets));
  } catch(e) {}
}

function approveRequest(id) {
  const all = getRequests();
  const req = all.find(r => r.requestId === id);
  if (!req) return;
  req.status = 'approved';
  req.approvedAt = new Date().toISOString();
  autoBookRoomsForRequest(req);
  pushBudgetFromRequest(req);
  saveRequests(all);
  syncToCalendar();
  syncPendingRooms();
  updateApprovalBadge();
  renderApprovalStats();
  renderApprovalsList();
  renderDetailPanel(req);
  showApprovalNextSteps(req);
}

function buildNotifyButton(req) {
  if (!req) return '';
  const email = (req.snapshot && req.snapshot['f-contact-email']) || '';
  if (!email) return '';
  const name    = req.name || 'your event';
  const isApproved = req.status === 'approved';
  const isDenied   = req.status === 'denied';
  if (!isApproved && !isDenied) return '';

  const subject = isApproved
    ? encodeURIComponent(`Event Request Approved: ${name}`)
    : encodeURIComponent(`Event Request Update: ${name}`);
  const date = req.date ? new Date(req.date + 'T00:00:00').toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'}) : '';
  const body = isApproved
    ? encodeURIComponent(`Hi,\n\nGreat news — your event request for "${name}"${date ? ' on ' + date : ''} has been approved!\n\nNext steps:\n- Confirm room booking via the Room Planner\n- Review your estimated budget\n- Coordinate with Communications for any promotion needs\n\nLet us know if you have any questions.\n\nWatermark Events Team`)
    : encodeURIComponent(`Hi,\n\nThank you for submitting your event request for "${name}".\n\nAfter review, we are unable to approve this request at this time.${req.denyReason ? '\n\nReason: ' + req.denyReason : ''}\n\nPlease feel free to resubmit with adjustments or reach out with any questions.\n\nWatermark Events Team`);

  const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&to=${encodeURIComponent(email)}&su=${subject}&body=${body}`;
  const color = isApproved ? '#16a34a' : '#dc2626';
  return `<a href="${gmailUrl}" target="_blank" rel="noopener" class="er-notify-btn" style="background:${color}">
    ✉ Notify Submitter
  </a>`;
}

function showApprovalNextSteps(req) {
  const existing = document.getElementById('er-next-steps-banner');
  if (existing) existing.remove();
  const hasRoomNotes = !!(req.snapshot && req.snapshot['f-rooms-notes']);
  const hasBudget    = !!(req.estimatedCost && req.estimatedCost !== '$0');
  const banner = document.createElement('div');
  banner.id = 'er-next-steps-banner';
  banner.className = 'er-next-steps-banner';
  banner.innerHTML = `
    <div class="er-ns-title">✓ "${escHtml(req.name)}" approved — what's next?</div>
    <div class="er-ns-steps">
      <div class="er-ns-step done">
        <span class="er-ns-step-icon">✓</span>
        <span>Request approved &amp; added to calendar</span>
      </div>
      <a class="er-ns-step${hasRoomNotes?' pending':''}" href="rooms.html">
        <span class="er-ns-step-icon">${hasRoomNotes ? '→' : '○'}</span>
        <span>Assign rooms in Room Planner${hasRoomNotes ? ' <strong>(room notes on file)</strong>' : ''}</span>
      </a>
      <a class="er-ns-step${hasBudget?' pending':''}" href="budget.html">
        <span class="er-ns-step-icon">${hasBudget ? '→' : '○'}</span>
        <span>Review budget${hasBudget ? ' — est. <strong>' + escHtml(req.estimatedCost) + '</strong> pushed to Budget Planner' : ''}</span>
      </a>
    </div>
    <button class="er-ns-close" onclick="document.getElementById('er-next-steps-banner').remove()">✕</button>`;
  const list = document.getElementById('er-approvals-list');
  if (list) list.insertBefore(banner, list.firstChild);
}

function revokeApproval(id) {
  const all = getRequests();
  const req = all.find(r => r.requestId === id);
  if (!req) return;
  const prev = req.status;
  req.status = 'pending';
  req.denyReason = '';
  req.denySuggestions = [];
  delete req.approvedAt;
  saveRequests(all);
  syncToCalendar();
  syncPendingRooms();
  updateApprovalBadge();
  renderApprovalStats();
  renderApprovalsList();
  renderDetailPanel(req);
}

function showDenyPanel(id) {
  const formEl = document.getElementById(`er-deny-form-${id}`);
  if (formEl) formEl.style.display = '';
}

/* ── Clone an approved request as a new pending request ── */
function cloneRequest(requestId) {
  const all = getRequests();
  const original = all.find(r => r.requestId === requestId);
  if (!original) return;

  // Deep copy
  const clone = JSON.parse(JSON.stringify(original));

  // Assign new identity
  clone.requestId  = 'req-' + Date.now();
  clone.status     = 'pending';
  clone.submittedAt = new Date().toISOString();
  delete clone.approvedAt;
  clone.denyReason = '';
  clone.denySuggestions = [];
  delete clone._pendingSuggestions;

  // Clear date so the user picks a new one
  if (clone.snapshot) clone.snapshot['f-date'] = '';

  all.push(clone);
  saveRequests(all);

  // Pre-populate form with clone's snapshot values
  formValues = Object.assign({}, clone.snapshot || {});
  localStorage.setItem(LS_DRAFT, JSON.stringify(formValues));

  setPageView('form');
  renderSections();
  populateForm();
  recalcAll();

  showToast('Request cloned — update the date and submit');
}

/* ── Simple toast notification ── */
function showToast(msg) {
  const existing = document.querySelector('.er-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'er-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Trigger fade-in
  requestAnimationFrame(() => { requestAnimationFrame(() => { toast.classList.add('er-toast-visible'); }); });

  // Fade out after 2.5s total
  setTimeout(() => {
    toast.classList.remove('er-toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2000);
}

function generateSuggestions(id) {
  const all = getRequests();
  const req = all.find(r => r.requestId === id);
  if (!req) return;
  const s = req.snapshot || {};
  const suggestions = [];

  // Date proximity
  const days = getDaysUntilEvent(req.date);
  if (req.date && days < 14) suggestions.push(`Move the event date to at least 2 weeks out to allow departments adequate preparation time.`);
  if (req.date && days < 30) suggestions.push(`Submit requests at least 30 days in advance — consider scheduling this event further out.`);

  // Attendance
  const att = parseInt(req.attendance) || 0;
  if (att > 500) suggestions.push(`Large event (${att} expected) — confirm venue capacity and additional security staffing.`);

  // AV / Production
  if (s['f-livestream'] === 'yes' && s['f-recording'] !== 'yes') suggestions.push(`If live-streaming, consider also enabling recording for on-demand viewing.`);
  if (s['f-stage-risers'] === 'yes' && !s['f-setup-days']) suggestions.push(`Stage riser setup requires a dedicated setup day — add setup day info.`);

  // Kids
  const kids = parseInt(s['f-kids-count']) || 0;
  if (kids > 100) suggestions.push(`Kids count (${kids}) is high — request additional Kids Ministry coordinators.`);

  // Food
  if (s['f-food-type'] === 'Full Meal' && att > 200) suggestions.push(`Full meal for ${att} people requires catering lead time of at least 3 weeks — adjust date or reduce meal scope.`);

  // Budget
  const costText = req.estimatedCost || '$0';
  const costNum = parseInt(costText.replace(/[^0-9]/g,'')) || 0;
  if (costNum > 2000) suggestions.push(`Estimated cost (${costText}) exceeds $2,000 — a budget code and finance approval are required before event can proceed.`);

  // Rooms
  if (!s['f-room-request'] && !req.location) suggestions.push(`No rooms have been reserved — book rooms through the Room Planner before approval.`);

  if (suggestions.length === 0) suggestions.push(`Review the form details above and discuss requirements with the submitter before re-submitting.`);

  const preview = document.getElementById(`er-suggestions-preview-${id}`);
  if (preview) {
    preview.innerHTML = `<ul>${suggestions.map(s => `<li>${escHtml(s)}</li>`).join('')}</ul>`;
  }

  // Store on the req object temporarily so confirmDeny can pick it up
  req._pendingSuggestions = suggestions;
  const idx = all.findIndex(r => r.requestId === id);
  all[idx] = req;
  saveRequests(all);
}

function confirmDeny(id) {
  const all = getRequests();
  const req = all.find(r => r.requestId === id);
  if (!req) return;
  const reason = (document.getElementById(`er-deny-reason-${id}`)?.value || '').trim();
  req.status = 'denied';
  req.denyReason = reason;
  req.denySuggestions = req._pendingSuggestions || [];
  delete req._pendingSuggestions;
  req.deniedAt = new Date().toISOString();
  saveRequests(all);
  syncToCalendar();
  syncPendingRooms();
  updateApprovalBadge();
  renderApprovalStats();
  renderApprovalsList();
  renderDetailPanel(req);
}

/* Sync all approved events into wm_localEvents for the calendar */
function syncToCalendar() {
  const all = getRequests();
  const events = all
    .filter(r => r.status === 'approved' || r.status === 'pending')
    .map(r => ({
      requestId: r.requestId,
      subject: r.name || 'Untitled Event',
      date: r.date,
      startTime: r.startTime,
      endTime: r.endTime,
      location: r.location,
      category: r.category,
      depts: [],
      pending: r.status === 'pending',
      approved: r.status === 'approved',
    }));
  localStorage.setItem('wm_localEvents', JSON.stringify(events));
}

/* Sync pending room reservations for the Room Planner */
function syncPendingRooms() {
  const all = getRequests();
  const pending = all.filter(r => r.status === 'pending' && r.date && r.name);
  const rooms = pending.map(r => ({
    requestId: r.requestId,
    name: r.name,
    date: r.date,
    startTime: r.startTime,
    endTime: r.endTime,
    location: r.location,
    estimatedCost: r.estimatedCost,
    submittedAt: r.submittedAt,
  }));
  localStorage.setItem('wm_pendingRooms', JSON.stringify(rooms));
}

function getDaysUntilEvent(dateStr) {
  if (!dateStr) return Infinity;
  const today = new Date();
  today.setHours(0,0,0,0);
  const ev = new Date(dateStr + 'T00:00:00');
  return Math.ceil((ev - today) / 86400000);
}

/* ─────────────────────────────────────────────────────────
   UTILS
   ───────────────────────────────────────────────────────── */
function modeLabel(m) {
  return m === 'required' ? 'Required' : m === 'optional' ? 'Optional' : 'Task';
}
function fmtDollar(n) {
  if (!n) return '$0';
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/* ── Readiness helpers ── */
function getReadiness(requestId) {
  try { return JSON.parse(localStorage.getItem('wm_readiness') || '{}')[requestId] || {}; } catch { return {}; }
}
function setReadiness(requestId, key, val) {
  try {
    const all = JSON.parse(localStorage.getItem('wm_readiness') || '{}');
    if (!all[requestId]) all[requestId] = {};
    all[requestId][key] = val;
    localStorage.setItem('wm_readiness', JSON.stringify(all));
    renderDetailPanel(findApproval(requestId));
    renderApprovalsList();
  } catch(e) {}
}

/* ── Conflict check helpers ── */
function checkDateConflicts(dateIso) {
  if (!dateIso) { updateConflictWarning([]); return; }
  // Check wm_eventRequests
  const submitted = JSON.parse(localStorage.getItem('wm_eventRequests') || '[]')
    .filter(r => r.date === dateIso && r.status !== 'denied');
  // Check wm_localEvents (calendar events)
  const local = JSON.parse(localStorage.getItem('wm_localEvents') || '[]')
    .filter(e => e.date === dateIso);
  const conflicts = [...submitted.map(r => ({ name: r.name, time: r.startTime, type: 'request' })),
                     ...local.map(e =>    ({ name: e.subject, time: e.startTime, type: 'calendar' }))];
  updateConflictWarning(conflicts);
}

function updateConflictWarning(conflicts) {
  const el = document.getElementById('er-conflict-warning');
  if (!el) return;
  if (!conflicts.length) { el.style.display = 'none'; el.innerHTML = ''; return; }
  el.style.display = '';
  el.innerHTML = `<div class="er-conflict-warn">
    <span class="er-conflict-icon">⚠️</span>
    <div>
      <strong>${conflicts.length} other event${conflicts.length>1?'s':''} on this date:</strong>
      <ul class="er-conflict-list">${conflicts.slice(0,5).map(c=>`<li>${escHtml(c.name)}${c.time?' · '+escHtml(c.time):''}</li>`).join('')}${conflicts.length>5?`<li>…and ${conflicts.length-5} more</li>`:''}</ul>
    </div>
  </div>`;
}

function escAttr(s) {
  return String(s || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ─────────────────────────────────────────────────────────
   BOOT
   ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  init();
  initScrollSpy();
  updateApprovalBadge();
  updateDraftsBadge();
  syncToCalendar();
  syncPendingRooms();

  /* Load CSV → sync any request rows into localStorage, then refresh UI */
  if (window.CsvApi) {
    CsvApi.load().then(() => {
      CsvApi.syncToLocalStorage();
      updateApprovalBadge();
      if (_currentPageView === 'approvals') {
        renderApprovalStats();
        renderApprovalsList();
      }
    });
  }

  // If URL has ?view=approvals, open that tab
  if (new URLSearchParams(window.location.search).get('view') === 'approvals') {
    setPageView('approvals');
  }
});
