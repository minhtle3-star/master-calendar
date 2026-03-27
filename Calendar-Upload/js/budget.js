/* ═══════════════════════════════════════
   SECTION CONSTANTS
═══════════════════════════════════════ */
const SECTION_LABELS = ['Venue & Setup','AV & Technology','Production & Creative',
  'Worship','Kids Ministry','Food & Hospitality','Communications','Security','Staffing & Other'];
const SECTION_ICONS  = ['🏛','🎙','🎬','🎵','👦','☕','📣','🔒','👥'];
const SECTION_IDS    = ['venue','av','prod','worship','kids','food','comms','security','staffing'];

/* ═══════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════ */
// Matches CATEGORIES order + spelling in index.html exactly
const MINISTRIES = [
  'Sunday Services',
  'Kids Team',
  'Ministry Programs',
  'Equipping Team',
  'Care Team',
  'Special Events',
  'Leadership Team',
  'Missions & Outreach',
  'Students & College',
  'Operations Team',
  'Marriage Team',
  'Young Adults',
  'Institute Team',
  'Community & Connecting',
  'Watermark en Espanol',
  'Health & CDC',
  'Family Team',
];

// Colors mirror CATEGORIES colors in index.html exactly
const MINISTRY_COLORS = {
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

const RATE_DEFS = [
  { group:'Venue & Setup', keys:[
    ['setupLaborHr','Setup Labor','/hr'],['teardownLaborHr','Teardown Labor','/hr'],
    ['specialArrangementFlat','Special Arrangement','flat'],['stageRiserFlat','Stage/Riser Rental','flat'],
  ]},
  { group:'AV & Technology', keys:[
    ['projectorDay','Projector','/day'],['screenDay','Screen','/day'],
    ['micHandheldDay','Handheld Mic','/day'],['micLapelDay','Lapel/Headset Mic','/day'],
    ['soundOpHr','Sound Operator','/hr'],['streamingFlat','Streaming Setup','flat'],
    ['streamingHr','Streaming Hourly','/hr'],['recordingHr','Recording','/hr'],
    ['confMonDay','Confidence Monitor','/day'],
  ]},
  { group:'Production & Creative', keys:[
    ['cameraOpHr','Camera Operator','/hr'],['lightingFlat','Lighting Setup','flat'],
    ['graphicsDesignHr','Slides/Graphics Design','/hr'],['photoCoverageFlat','Photo/Video Coverage','flat'],
  ]},
  { group:'Worship', keys:[
    ['worshipMusicianHonorarium','Musician Honorarium','each'],
    ['worshipLeaderFlat','Worship Leader','flat'],
  ]},
  { group:'Kids Ministry', keys:[
    ['kidsSuppliesPerChild','Craft/Activity Supplies','/child'],
    ['kidsSnacksPerChild','Snacks','/child'],['kidsCoordHr','Paid Coordinator','/hr'],
  ]},
  { group:'Food & Hospitality', keys:[
    ['foodCoffeePerPerson','Coffee / Drinks','/person'],
    ['foodLightPerPerson','Light Refreshments','/person'],
    ['foodMealPerPerson','Catered Meal','/person'],
  ]},
  { group:'Communications', keys:[
    ['bulletinEach','Bulletins','each'],['flyerEach','Flyers','each'],
    ['bannerEach','Banners','each'],['promoCardEach','Promo Cards','each'],
    ['socialGraphicsFlat','Social Media Graphics','flat'],['designCopyHr','Design / Copywriting','/hr'],
  ]},
  { group:'Staffing & Other', keys:[
    ['securityGuardHr','Security Guard','/hr/guard'],['eventCoordHr','Event Coordinator','/hr'],
  ]},
];

const TEMPLATES = {
  'Sunday Service':{
    attendance:400,startTime:'07:00',endTime:'18:00',ministry:'Sunday Services',
    venueSetup:true,venueSetupHours:2,venueTeardown:true,venueTeardownHours:1,venueSpecial:false,venueStage:false,
    avProjectors:2,avScreens:0,avMicsHandheld:4,avMicsLapel:1,avSoundOp:true,avSoundOpHours:3,
    avStreaming:true,avStreamHours:2,avRecording:false,avRecordHours:0,avConfMon:1,
    prodCameras:0,prodCameraHours:0,prodLighting:false,prodDesignHours:1,prodPhoto:false,
    worshipNeeded:true,worshipMusicians:5,worshipPaidLeader:false,
    kidsNeeded:true,kidsAttendance:80,kidsSupplies:true,kidsSnacks:false,kidsPaidCoord:false,kidsCoordHours:0,
    foodNeeded:false,foodType:'Light Refreshments',foodAttendance:0,foodCustomPerPerson:0,
    commsBulletins:400,commsFlyers:0,commsBanners:0,commsCards:0,commsSocial:true,commsDesignHours:1,
    secNeeded:false,secGuards:0,secHours:0,
    staffCoordHours:0,staffHospitality:0,staffSignage:0,contingencyPct:10,
  },
  'Conference':{
    attendance:200,startTime:'08:00',endTime:'17:00',ministry:'Special Events',
    venueSetup:true,venueSetupHours:4,venueTeardown:true,venueTeardownHours:3,venueSpecial:true,venueStage:true,
    avProjectors:3,avScreens:1,avMicsHandheld:6,avMicsLapel:2,avSoundOp:true,avSoundOpHours:10,
    avStreaming:true,avStreamHours:9,avRecording:true,avRecordHours:9,avConfMon:2,
    prodCameras:2,prodCameraHours:9,prodLighting:true,prodDesignHours:6,prodPhoto:true,
    worshipNeeded:true,worshipMusicians:5,worshipPaidLeader:true,
    kidsNeeded:false,kidsAttendance:0,kidsSupplies:false,kidsSnacks:false,kidsPaidCoord:false,kidsCoordHours:0,
    foodNeeded:true,foodType:'Light Refreshments',foodAttendance:200,foodCustomPerPerson:0,
    commsBulletins:200,commsFlyers:200,commsBanners:2,commsCards:200,commsSocial:true,commsDesignHours:5,
    secNeeded:true,secGuards:2,secHours:10,
    staffCoordHours:12,staffHospitality:100,staffSignage:150,contingencyPct:15,
  },
  'Retreat':{
    attendance:50,startTime:'09:00',endTime:'17:00',ministry:'Equipping Team',
    venueSetup:true,venueSetupHours:2,venueTeardown:true,venueTeardownHours:2,venueSpecial:false,venueStage:false,
    avProjectors:1,avScreens:0,avMicsHandheld:2,avMicsLapel:1,avSoundOp:false,avSoundOpHours:0,
    avStreaming:false,avStreamHours:0,avRecording:false,avRecordHours:0,avConfMon:0,
    prodCameras:0,prodCameraHours:0,prodLighting:false,prodDesignHours:2,prodPhoto:true,
    worshipNeeded:true,worshipMusicians:3,worshipPaidLeader:false,
    kidsNeeded:false,kidsAttendance:0,kidsSupplies:false,kidsSnacks:false,kidsPaidCoord:false,kidsCoordHours:0,
    foodNeeded:true,foodType:'Catered Meal',foodAttendance:50,foodCustomPerPerson:0,
    commsBulletins:0,commsFlyers:50,commsBanners:1,commsCards:0,commsSocial:true,commsDesignHours:2,
    secNeeded:false,secGuards:0,secHours:0,
    staffCoordHours:6,staffHospitality:50,staffSignage:50,contingencyPct:15,
  },
  'Outreach':{
    attendance:150,startTime:'10:00',endTime:'15:00',ministry:'Missions & Outreach',
    venueSetup:true,venueSetupHours:3,venueTeardown:true,venueTeardownHours:2,venueSpecial:true,venueStage:false,
    avProjectors:1,avScreens:0,avMicsHandheld:2,avMicsLapel:0,avSoundOp:true,avSoundOpHours:6,
    avStreaming:false,avStreamHours:0,avRecording:false,avRecordHours:0,avConfMon:0,
    prodCameras:1,prodCameraHours:5,prodLighting:false,prodDesignHours:3,prodPhoto:true,
    worshipNeeded:true,worshipMusicians:4,worshipPaidLeader:false,
    kidsNeeded:true,kidsAttendance:30,kidsSupplies:true,kidsSnacks:true,kidsPaidCoord:false,kidsCoordHours:0,
    foodNeeded:true,foodType:'Light Refreshments',foodAttendance:150,foodCustomPerPerson:0,
    commsBulletins:0,commsFlyers:300,commsBanners:2,commsCards:150,commsSocial:true,commsDesignHours:4,
    secNeeded:true,secGuards:2,secHours:5,
    staffCoordHours:6,staffHospitality:75,staffSignage:100,contingencyPct:15,
  },
  'Small Group':{
    attendance:25,startTime:'19:00',endTime:'21:00',ministry:'Community & Connecting',
    venueSetup:false,venueSetupHours:0,venueTeardown:false,venueTeardownHours:0,venueSpecial:false,venueStage:false,
    avProjectors:0,avScreens:0,avMicsHandheld:0,avMicsLapel:0,avSoundOp:false,avSoundOpHours:0,
    avStreaming:false,avStreamHours:0,avRecording:false,avRecordHours:0,avConfMon:0,
    prodCameras:0,prodCameraHours:0,prodLighting:false,prodDesignHours:0,prodPhoto:false,
    worshipNeeded:false,worshipMusicians:0,worshipPaidLeader:false,
    kidsNeeded:false,kidsAttendance:0,kidsSupplies:false,kidsSnacks:false,kidsPaidCoord:false,kidsCoordHours:0,
    foodNeeded:true,foodType:'Light Refreshments',foodAttendance:25,foodCustomPerPerson:0,
    commsBulletins:0,commsFlyers:0,commsBanners:0,commsCards:0,commsSocial:false,commsDesignHours:0,
    secNeeded:false,secGuards:0,secHours:0,
    staffCoordHours:0,staffHospitality:0,staffSignage:0,contingencyPct:5,
  },
};

/* ═══════════════════════════════════════
   STATE
═══════════════════════════════════════ */
let rates = JSON.parse(localStorage.getItem('wm_budgetRates') || 'null') || {...DEFAULT_RATES};

let budget = {
  id:null,eventName:'',eventType:'',ministry:'',date:'',startTime:'',endTime:'',attendance:100,notes:'',
  venueSetup:false,venueSetupHours:0,venueTeardown:false,venueTeardownHours:0,venueSpecial:false,venueStage:false,
  avProjectors:0,avScreens:0,avMicsHandheld:0,avMicsLapel:0,avSoundOp:false,avSoundOpHours:0,
  avStreaming:false,avStreamHours:0,avRecording:false,avRecordHours:0,avConfMon:0,
  prodCameras:0,prodCameraHours:0,prodLighting:false,prodDesignHours:0,prodPhoto:false,
  worshipNeeded:false,worshipMusicians:0,worshipPaidLeader:false,
  kidsNeeded:false,kidsAttendance:0,kidsSupplies:false,kidsSnacks:false,kidsPaidCoord:false,kidsCoordHours:0,
  foodNeeded:false,foodType:'Light Refreshments',foodAttendance:0,foodCustomPerPerson:0,
  commsBulletins:0,commsFlyers:0,commsBanners:0,commsCards:0,commsSocial:false,commsDesignHours:0,
  secNeeded:false,secGuards:0,secHours:0,
  staffCoordHours:0,staffHospitality:0,staffSignage:0,contingencyPct:10,
  linkedEventSubject:'',  // subject string of linked calendar event
};

/* ═══════════════════════════════════════
   HELPERS
═══════════════════════════════════════ */
const R = k => rates[k] !== undefined ? rates[k] : (DEFAULT_RATES[k] || 0);
const fmtAmt = n => n <= 0 ? '' : '$' + Math.round(n).toLocaleString();
const fmtAmtFull = n => '$' + Math.round(n).toLocaleString();
function g(id){ return document.getElementById(id); }

function tog(key, label, hint, onChangeExtra) {
  const oc = `budget['${key}']=this.checked;${onChangeExtra||''}renderForm();recalc();`;
  return `<div class="brow">
    <div class="brow-lbl"><div class="brow-lbl-main">${label}</div>${hint?`<div class="brow-lbl-hint">${hint}</div>`:''}
    </div>
    <label class="b-tog"><input type="checkbox" ${budget[key]?'checked':''} onchange="${oc}"><span class="b-tog-sl"></span></label>
  </div>`;
}

function numRow(key, label, hint, rateKey, calcFn) {
  const val = budget[key] || 0;
  const cost = calcFn ? calcFn(val) : (val * R(rateKey));
  return `<div class="brow">
    <div class="brow-lbl"><div class="brow-lbl-main">${label}</div>${hint?`<div class="brow-lbl-hint">${hint}</div>`:''}</div>
    <div class="brow-inputs">
      <input class="b-num" type="number" min="0" step="1" value="${val}" oninput="budget['${key}']=+this.value;recalc();">
    </div>
    <div class="brow-cost${cost===0?' zero':''}">${cost===0?'—':fmtAmt(cost)}</div>
  </div>`;
}

function sectionSubtotal(lines) {
  return lines.reduce((s,l) => s + (l.amt||0), 0);
}

/* ═══════════════════════════════════════
   CALCULATE
═══════════════════════════════════════ */
function calcSections() {
  const b = budget;
  return [
    { id:'venue', title:'Venue & Setup', icon:'🏛', lines: (() => {
      const L = [];
      if (b.venueSetup && b.venueSetupHours>0) L.push({label:`Setup labor (${b.venueSetupHours}h)`, amt:b.venueSetupHours*R('setupLaborHr')});
      if (b.venueTeardown && b.venueTeardownHours>0) L.push({label:`Teardown labor (${b.venueTeardownHours}h)`, amt:b.venueTeardownHours*R('teardownLaborHr')});
      if (b.venueSpecial) L.push({label:'Special arrangement/setup', amt:R('specialArrangementFlat')});
      if (b.venueStage) L.push({label:'Stage / riser rental', amt:R('stageRiserFlat')});
      return L;
    })()},
    { id:'av', title:'AV & Technology', icon:'🎙', lines: (() => {
      const L = [];
      if (b.avProjectors>0) L.push({label:`Projectors ×${b.avProjectors}`, amt:b.avProjectors*R('projectorDay')});
      if (b.avScreens>0) L.push({label:`Screens ×${b.avScreens}`, amt:b.avScreens*R('screenDay')});
      if (b.avMicsHandheld>0) L.push({label:`Handheld mics ×${b.avMicsHandheld}`, amt:b.avMicsHandheld*R('micHandheldDay')});
      if (b.avMicsLapel>0) L.push({label:`Lapel mics ×${b.avMicsLapel}`, amt:b.avMicsLapel*R('micLapelDay')});
      if (b.avSoundOp && b.avSoundOpHours>0) L.push({label:`Sound operator (${b.avSoundOpHours}h)`, amt:b.avSoundOpHours*R('soundOpHr')});
      if (b.avStreaming) { L.push({label:'Streaming setup', amt:R('streamingFlat')}); if (b.avStreamHours>0) L.push({label:`Streaming (${b.avStreamHours}h)`, amt:b.avStreamHours*R('streamingHr')}); }
      if (b.avRecording && b.avRecordHours>0) L.push({label:`Recording (${b.avRecordHours}h)`, amt:b.avRecordHours*R('recordingHr')});
      if (b.avConfMon>0) L.push({label:`Confidence monitors ×${b.avConfMon}`, amt:b.avConfMon*R('confMonDay')});
      return L;
    })()},
    { id:'prod', title:'Production & Creative', icon:'🎬', lines: (() => {
      const L = [];
      if (b.prodCameras>0 && b.prodCameraHours>0) L.push({label:`Camera ops (${b.prodCameras}×${b.prodCameraHours}h)`, amt:b.prodCameras*b.prodCameraHours*R('cameraOpHr')});
      if (b.prodLighting) L.push({label:'Stage lighting setup', amt:R('lightingFlat')});
      if (b.prodDesignHours>0) L.push({label:`Slides / graphics (${b.prodDesignHours}h)`, amt:b.prodDesignHours*R('graphicsDesignHr')});
      if (b.prodPhoto) L.push({label:'Photo / video coverage', amt:R('photoCoverageFlat')});
      return L;
    })()},
    { id:'worship', title:'Worship', icon:'🎵', lines: (() => {
      const L = [];
      if (b.worshipNeeded) {
        if (b.worshipMusicians>0) L.push({label:`Musicians ×${b.worshipMusicians}`, amt:b.worshipMusicians*R('worshipMusicianHonorarium')});
        if (b.worshipPaidLeader) L.push({label:'Worship leader honorarium', amt:R('worshipLeaderFlat')});
      }
      return L;
    })()},
    { id:'kids', title:'Kids Ministry', icon:'👦', lines: (() => {
      const L = [];
      if (b.kidsNeeded && b.kidsAttendance>0) {
        if (b.kidsSupplies) L.push({label:`Craft supplies (${b.kidsAttendance} kids)`, amt:b.kidsAttendance*R('kidsSuppliesPerChild')});
        if (b.kidsSnacks) L.push({label:`Snacks (${b.kidsAttendance} kids)`, amt:b.kidsAttendance*R('kidsSnacksPerChild')});
        if (b.kidsPaidCoord && b.kidsCoordHours>0) L.push({label:`Coordinator (${b.kidsCoordHours}h)`, amt:b.kidsCoordHours*R('kidsCoordHr')});
      }
      return L;
    })()},
    { id:'food', title:'Food & Hospitality', icon:'☕', lines: (() => {
      const L = [];
      if (b.foodNeeded) {
        const ppl = b.foodAttendance || b.attendance || 0;
        const rMap = {'Coffee/Drinks':R('foodCoffeePerPerson'),'Light Refreshments':R('foodLightPerPerson'),'Catered Meal':R('foodMealPerPerson')};
        const rate = b.foodType==='Custom' ? (b.foodCustomPerPerson||0) : (rMap[b.foodType]||0);
        if (ppl>0 && rate>0) L.push({label:`${b.foodType} (${ppl} ppl × $${rate})`, amt:ppl*rate});
      }
      return L;
    })()},
    { id:'comms', title:'Communications', icon:'📣', lines: (() => {
      const L = [];
      if (b.commsBulletins>0) L.push({label:`Bulletins ×${b.commsBulletins}`, amt:b.commsBulletins*R('bulletinEach')});
      if (b.commsFlyers>0) L.push({label:`Flyers ×${b.commsFlyers}`, amt:b.commsFlyers*R('flyerEach')});
      if (b.commsBanners>0) L.push({label:`Banners ×${b.commsBanners}`, amt:b.commsBanners*R('bannerEach')});
      if (b.commsCards>0) L.push({label:`Promo cards ×${b.commsCards}`, amt:b.commsCards*R('promoCardEach')});
      if (b.commsSocial) L.push({label:'Social media graphics', amt:R('socialGraphicsFlat')});
      if (b.commsDesignHours>0) L.push({label:`Design / copy (${b.commsDesignHours}h)`, amt:b.commsDesignHours*R('designCopyHr')});
      return L;
    })()},
    { id:'security', title:'Security', icon:'🔒', lines: (() => {
      const L = [];
      if (b.secNeeded && b.secGuards>0 && b.secHours>0) L.push({label:`${b.secGuards} guard${b.secGuards>1?'s':''} × ${b.secHours}h`, amt:b.secGuards*b.secHours*R('securityGuardHr')});
      return L;
    })()},
    { id:'staffing', title:'Staffing & Other', icon:'👥', lines: (() => {
      const L = [];
      if (b.staffCoordHours>0) L.push({label:`Event coordinator (${b.staffCoordHours}h)`, amt:b.staffCoordHours*R('eventCoordHr')});
      if (b.staffHospitality>0) L.push({label:'Hospitality / green room', amt:b.staffHospitality});
      if (b.staffSignage>0) L.push({label:'Signage & wayfinding', amt:b.staffSignage});
      return L;
    })()},
  ];
}

/* ═══════════════════════════════════════
   RECALC (updates right panel only)
═══════════════════════════════════════ */
function recalc() {
  const secs = calcSections();
  const subtotal = secs.reduce((s,sec) => s + sectionSubtotal(sec.lines), 0);
  const contAmt  = subtotal * ((budget.contingencyPct||0) / 100);
  const total    = subtotal + contAmt;

  // Header chip
  const chip = g('hdr-total');
  if (chip) chip.textContent = fmtAmtFull(total);

  // Summary meta
  const nm = g('sum-ev-name'); if (nm) nm.textContent = budget.eventName || 'New Estimate';
  const mt = g('sum-ev-meta');
  if (mt) {
    const parts = [budget.ministry, budget.date ? new Date(budget.date+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : null, budget.attendance ? budget.attendance.toLocaleString()+' attendees' : null].filter(Boolean);
    mt.textContent = parts.join(' · ') || 'Fill in event details to begin';
  }

  // Build summary scroll content
  let html = '';
  for (const sec of secs) {
    const st = sectionSubtotal(sec.lines);
    html += `<div class="sum-sec-row"><span>${esc(sec.icon)} ${esc(sec.title)}</span><span style="color:${st>0?'var(--navy)':'#ccc'};font-weight:700;font-family:'Lato',sans-serif;">${st>0?fmtAmtFull(st):'—'}</span></div>`;
    for (const l of sec.lines) {
      html += `<div class="sum-line"><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;">${esc(l.label)}</span><span class="sum-line-amt">${fmtAmtFull(l.amt)}</span></div>`;
    }
  }
  html += `<div class="sum-divider"></div>`;
  html += `<div class="sum-total-block">
    <div class="sum-subtotal-row"><span>Subtotal</span><span style="font-weight:700;">${fmtAmtFull(subtotal)}</span></div>
    <div class="sum-cont-row">
      <span>Contingency <input type="number" min="0" max="50" value="${budget.contingencyPct||10}" oninput="budget.contingencyPct=+this.value;recalc();"> %</span>
      <span style="font-weight:700;">${fmtAmtFull(contAmt)}</span>
    </div>
    <div class="sum-grand-row">
      <span class="sum-grand-lbl">TOTAL</span>
      <span class="sum-grand-amt">${fmtAmtFull(total)}</span>
    </div>
    ${budget.attendance>0 ? `<div class="sum-per-person">$${(total/budget.attendance).toFixed(2)} per person</div>` : ''}
  </div>`;

  // Saved estimates
  const saved = getSaved();
  if (saved.length) {
    html += `<div class="sum-divider"></div>`;
    html += `<div class="sum-sec-row"><span>💾 Saved Estimates</span></div>`;
    html += `<div class="saved-wrap">`;
    for (const e of saved) {
      html += `<div class="saved-item" onclick="loadEstimate('${esc(e.id)}')">
        <div class="saved-item-info"><div class="saved-item-name">${esc(e.eventName||'Untitled')}</div>
        <div class="saved-item-meta">${esc(e.ministry||'')}${e.date?' · '+new Date(e.date+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'}):''}</div></div>
        <span class="saved-item-amt">$${Math.round(e.total||0).toLocaleString()}</span>
        <button class="saved-item-del" onclick="event.stopPropagation();deleteEstimate('${esc(e.id)}')" title="Delete">✕</button>
      </div>`;
    }
    html += `</div>`;
  }

  const scroll = g('sum-scroll'); if (scroll) scroll.innerHTML = html;
}

/* ═══════════════════════════════════════
   RENDER FORM
═══════════════════════════════════════ */
function renderForm() {
  const b = budget;
  let html = '';

  // Template buttons
  html += `<div class="tmpl-bar">
    <div class="tmpl-bar-title">Start from a template</div>
    <div class="tmpl-btns">`;
  for (const t of Object.keys(TEMPLATES)) {
    html += `<button class="tmpl-btn${b.eventType===t?' active':''}" onclick="applyTemplate('${esc(t)}')">${esc(t)}</button>`;
  }
  html += `<button class="tmpl-btn" onclick="newBudget()">Clear</button>`;
  html += `</div></div>`;

  // ── Section 1: Event Info ──
  const minOpts = MINISTRIES.map(m => `<option value="${esc(m)}"${b.ministry===m?' selected':''}>${esc(m)}</option>`).join('');
  const evIdx = (() => { try { return JSON.parse(localStorage.getItem('eventIndex')||'[]'); } catch { return []; } })();
  const evOpts = evIdx.length
    ? evIdx.map(e => `<option value="${esc(e.subject)}"${b.linkedEventSubject===e.subject?' selected':''}>${esc(e.subject)} — ${esc(e.dateStr)}</option>`).join('')
    : '<option disabled>No calendar loaded — open Ministry Admin first</option>';
  const _rsvs = (() => { try { return JSON.parse(localStorage.getItem('roomReservations')||'[]'); } catch { return []; } })();
  const _hasRoomRsv = b.linkedEventSubject && _rsvs.some(r => r.linkedEventSubject === b.linkedEventSubject);
  html += bsec(1,'📋','Event Information',0,`
    <div class="binfo-grid">
      <div class="binfo-field full">
        <div class="binfo-lbl">Link to Calendar Event</div>
        <select class="b-select" style="width:100%;" onchange="linkCalendarEvent(this.value)">
          <option value="">— pick from your calendar —</option>
          ${evOpts}
        </select>
        ${b.linkedEventSubject ? `<div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;">
          <button class="popup-link" style="font-size:.7rem;padding:4px 10px;" onclick="openInCalendarFromBudget()">Open in Calendar →</button>
          ${_hasRoomRsv ? `<button class="popup-link" style="font-size:.7rem;padding:4px 10px;" onclick="openInRoomsFromBudget()">View in Room Planner →</button>` : ''}
        </div>` : ''}
      </div>
      <div class="binfo-field full">
        <div class="binfo-lbl">Event Name</div>
        <input class="b-input" type="text" value="${esc(b.eventName)}" placeholder="e.g. Easter Sunday Service" oninput="budget.eventName=this.value;recalc();">
      </div>
      <div class="binfo-field">
        <div class="binfo-lbl">Ministry</div>
        <select class="b-select" style="width:100%;" onchange="budget.ministry=this.value;recalc();"><option value="">Select…</option>${minOpts}</select>
      </div>
      <div class="binfo-field">
        <div class="binfo-lbl">Event Date</div>
        <input class="b-input" type="date" value="${esc(b.date)}" oninput="budget.date=this.value;recalc();">
      </div>
      <div class="binfo-field">
        <div class="binfo-lbl">Start Time</div>
        <input class="b-input" type="time" value="${esc(b.startTime)}" oninput="budget.startTime=this.value;recalc();">
      </div>
      <div class="binfo-field">
        <div class="binfo-lbl">End Time</div>
        <input class="b-input" type="time" value="${esc(b.endTime)}" oninput="budget.endTime=this.value;recalc();">
      </div>
      <div class="binfo-field">
        <div class="binfo-lbl">Expected Attendance</div>
        <input class="b-input" type="number" min="0" value="${b.attendance||''}" placeholder="0" oninput="budget.attendance=+this.value;recalc();">
      </div>
      <div class="binfo-field full">
        <div class="binfo-lbl">Notes</div>
        <textarea class="b-textarea" placeholder="Internal notes, special requirements…" oninput="budget.notes=this.value;">${esc(b.notes)}</textarea>
      </div>
    </div>`);

  // ── Section 2: Venue & Setup ──
  const venSub = sectionSubtotal(calcSections().find(s=>s.id==='venue').lines);
  html += bsec(2,'🏛','Venue & Setup',venSub,`
    ${tog('venueSetup','Setup labor needed?','')}
    ${b.venueSetup ? `<div class="bsub-group">${numRow('venueSetupHours','Hours','$'+R('setupLaborHr')+'/hr','setupLaborHr')}</div>` : ''}
    ${tog('venueTeardown','Teardown labor needed?','')}
    ${b.venueTeardown ? `<div class="bsub-group">${numRow('venueTeardownHours','Hours','$'+R('teardownLaborHr')+'/hr','teardownLaborHr')}</div>` : ''}
    ${tog('venueSpecial','Special furniture arrangement?','Chairs rearrangement, custom layouts')}
    ${tog('venueStage','Stage / riser rental?','')}`);

  // ── Section 3: AV & Technology ──
  const avSub = sectionSubtotal(calcSections().find(s=>s.id==='av').lines);
  html += bsec(3,'🎙','AV & Technology',avSub,`
    ${numRow('avProjectors','Projectors','$'+R('projectorDay')+' each/day','projectorDay')}
    ${numRow('avScreens','Projection screens','$'+R('screenDay')+' each/day','screenDay')}
    ${numRow('avMicsHandheld','Handheld microphones','$'+R('micHandheldDay')+' each/day','micHandheldDay')}
    ${numRow('avMicsLapel','Lapel / headset mics','$'+R('micLapelDay')+' each/day','micLapelDay')}
    ${numRow('avConfMon','Confidence monitors','$'+R('confMonDay')+' each/day','confMonDay')}
    ${tog('avSoundOp','Sound operator needed?','')}
    ${b.avSoundOp ? `<div class="bsub-group">${numRow('avSoundOpHours','Operator hours','$'+R('soundOpHr')+'/hr','soundOpHr')}</div>` : ''}
    ${tog('avStreaming','Live streaming?','')}
    ${b.avStreaming ? `<div class="bsub-group">${numRow('avStreamHours','Streaming hours','Flat $'+R('streamingFlat')+' + $'+R('streamingHr')+'/hr','streamingHr',h=>R('streamingFlat')+h*R('streamingHr'))}</div>` : ''}
    ${tog('avRecording','Recording?','')}
    ${b.avRecording ? `<div class="bsub-group">${numRow('avRecordHours','Recording hours','$'+R('recordingHr')+'/hr','recordingHr')}</div>` : ''}`);

  // ── Section 4: Production & Creative ──
  const prodSub = sectionSubtotal(calcSections().find(s=>s.id==='prod').lines);
  html += bsec(4,'🎬','Production & Creative',prodSub,`
    <div class="brow">
      <div class="brow-lbl"><div class="brow-lbl-main">Camera operators</div><div class="brow-lbl-hint">$${R('cameraOpHr')}/hr per operator</div></div>
      <div class="brow-inputs">
        <input class="b-num" type="number" min="0" value="${b.prodCameras}" placeholder="0" oninput="budget.prodCameras=+this.value;recalc();" title="Operators">
        <span class="brow-x">ops ×</span>
        <input class="b-num" type="number" min="0" value="${b.prodCameraHours}" placeholder="0" oninput="budget.prodCameraHours=+this.value;recalc();" title="Hours">
        <span class="brow-x">hrs</span>
      </div>
      <div class="brow-cost${b.prodCameras*b.prodCameraHours===0?' zero':''}">${b.prodCameras*b.prodCameraHours===0?'—':fmtAmt(b.prodCameras*b.prodCameraHours*R('cameraOpHr'))}</div>
    </div>
    ${tog('prodLighting','Stage lighting setup?','Includes rigging')}
    ${numRow('prodDesignHours','Slides / graphics design hours','$'+R('graphicsDesignHr')+'/hr','graphicsDesignHr')}
    ${tog('prodPhoto','Photo / video coverage?','')}`);

  // ── Section 5: Worship ──
  const worSub = sectionSubtotal(calcSections().find(s=>s.id==='worship').lines);
  html += bsec(5,'🎵','Worship',worSub,`
    ${tog('worshipNeeded','Worship team needed?','')}
    ${b.worshipNeeded ? `
      <div class="bsub-group">
        ${numRow('worshipMusicians','Musicians / vocalists','$'+R('worshipMusicianHonorarium')+' honorarium each','worshipMusicianHonorarium')}
        ${tog('worshipPaidLeader','Paid worship leader?','Additional honorarium')}
      </div>` : ''}`);

  // ── Section 6: Kids Ministry ──
  const kidsSub = sectionSubtotal(calcSections().find(s=>s.id==='kids').lines);
  html += bsec(6,'👦','Kids Ministry',kidsSub,`
    ${tog('kidsNeeded','Kids programming needed?','')}
    ${b.kidsNeeded ? `
      <div class="bsub-group">
        ${numRow('kidsAttendance','Expected children attendance','','')}
        ${tog('kidsSupplies','Craft / activity supplies?','$'+R('kidsSuppliesPerChild')+' per child')}
        ${tog('kidsSnacks','Snacks?','$'+R('kidsSnacksPerChild')+' per child')}
        ${tog('kidsPaidCoord','Paid coordinator?','')}
        ${b.kidsPaidCoord ? `<div class="bsub-group">${numRow('kidsCoordHours','Coordinator hours','$'+R('kidsCoordHr')+'/hr','kidsCoordHr')}</div>` : ''}
      </div>` : ''}`);

  // ── Section 7: Food & Hospitality ──
  const foodSub = sectionSubtotal(calcSections().find(s=>s.id==='food').lines);
  const foodTypes = ['Coffee/Drinks','Light Refreshments','Catered Meal','Custom'];
  html += bsec(7,'☕','Food & Hospitality',foodSub,`
    ${tog('foodNeeded','Food / drinks needed?','')}
    ${b.foodNeeded ? `
      <div class="bsub-group">
        <div class="brow">
          <div class="brow-lbl"><div class="brow-lbl-main">Type</div></div>
          <select class="b-select" onchange="budget.foodType=this.value;renderForm();recalc();">
            ${foodTypes.map(t=>`<option${b.foodType===t?' selected':''}>${esc(t)}</option>`).join('')}
          </select>
        </div>
        ${numRow('foodAttendance','People to serve','Defaults to event attendance if blank','')}
        ${b.foodType==='Custom' ? `<div class="brow">
          <div class="brow-lbl"><div class="brow-lbl-main">Cost per person</div></div>
          <div class="brow-inputs">$<input class="b-num" style="width:70px;" type="number" min="0" step="0.5" value="${b.foodCustomPerPerson||0}" oninput="budget.foodCustomPerPerson=+this.value;recalc();"></div>
          <div class="brow-cost${!b.foodCustomPerPerson?' zero':''}">${b.foodCustomPerPerson?(fmtAmt((b.foodAttendance||b.attendance)*b.foodCustomPerPerson)):'—'}</div>
        </div>` : ''}
      </div>` : ''}`);

  // ── Section 8: Communications ──
  const commsSub = sectionSubtotal(calcSections().find(s=>s.id==='comms').lines);
  html += bsec(8,'📣','Communications & Marketing',commsSub,`
    ${numRow('commsBulletins','Printed bulletins','$'+R('bulletinEach')+' each','bulletinEach')}
    ${numRow('commsFlyers','Flyers / handouts','$'+R('flyerEach')+' each','flyerEach')}
    ${numRow('commsBanners','Large format banners','$'+R('bannerEach')+' each','bannerEach')}
    ${numRow('commsCards','Promo / invite cards','$'+R('promoCardEach')+' each','promoCardEach')}
    ${tog('commsSocial','Social media graphics?','Flat fee for design')}
    ${numRow('commsDesignHours','Design / copywriting hours','$'+R('designCopyHr')+'/hr','designCopyHr')}`);

  // ── Section 9: Security ──
  const secSub = sectionSubtotal(calcSections().find(s=>s.id==='security').lines);
  html += bsec(9,'🔒','Security',secSub,`
    ${tog('secNeeded','Security needed?','')}
    ${b.secNeeded ? `
      <div class="bsub-group">
        <div class="brow">
          <div class="brow-lbl"><div class="brow-lbl-main">Guards &amp; hours</div><div class="brow-lbl-hint">$${R('securityGuardHr')}/hr per guard</div></div>
          <div class="brow-inputs">
            <input class="b-num" type="number" min="0" value="${b.secGuards}" oninput="budget.secGuards=+this.value;recalc();" title="Guards">
            <span class="brow-x">guards ×</span>
            <input class="b-num" type="number" min="0" value="${b.secHours}" oninput="budget.secHours=+this.value;recalc();" title="Hours">
            <span class="brow-x">hrs</span>
          </div>
          <div class="brow-cost${b.secGuards*b.secHours===0?' zero':''}">${b.secGuards*b.secHours===0?'—':fmtAmt(b.secGuards*b.secHours*R('securityGuardHr'))}</div>
        </div>
      </div>` : ''}`);

  // ── Section 10: Staffing & Other ──
  const staffSub = sectionSubtotal(calcSections().find(s=>s.id==='staffing').lines);
  html += bsec(10,'👥','Staffing & Other',staffSub,`
    ${numRow('staffCoordHours','Event coordinator hours','$'+R('eventCoordHr')+'/hr','eventCoordHr')}
    <div class="brow">
      <div class="brow-lbl"><div class="brow-lbl-main">Hospitality / green room supplies</div><div class="brow-lbl-hint">Custom amount</div></div>
      <div class="brow-inputs">$<input class="b-num" style="width:72px;" type="number" min="0" value="${b.staffHospitality||0}" oninput="budget.staffHospitality=+this.value;recalc();"></div>
      <div class="brow-cost${!b.staffHospitality?' zero':''}">${b.staffHospitality?fmtAmt(b.staffHospitality):'—'}</div>
    </div>
    <div class="brow">
      <div class="brow-lbl"><div class="brow-lbl-main">Signage &amp; wayfinding</div><div class="brow-lbl-hint">Custom amount</div></div>
      <div class="brow-inputs">$<input class="b-num" style="width:72px;" type="number" min="0" value="${b.staffSignage||0}" oninput="budget.staffSignage=+this.value;recalc();"></div>
      <div class="brow-cost${!b.staffSignage?' zero':''}">${b.staffSignage?fmtAmt(b.staffSignage):'—'}</div>
    </div>`);

  const formEl = g('budget-form');
  if (formEl) formEl.innerHTML = html;
}

function bsec(num, icon, title, subtotal, bodyHtml) {
  const id = 'bsec-'+num;
  const isOpen = !closedSections.has(num);
  return `<div class="bsec${isOpen?'':' closed'}" id="${id}">
    <div class="bsec-hdr" onclick="toggleSection(${num})">
      <div class="bsec-num">${num}</div>
      <div class="bsec-title">${icon} ${esc(title)}</div>
      <div class="bsec-sub">${subtotal>0?fmtAmtFull(subtotal):''}</div>
      <div class="bsec-arrow">▾</div>
    </div>
    <div class="bsec-body">${bodyHtml}</div>
  </div>`;
}

let closedSections = new Set();
function toggleSection(num) {
  if (closedSections.has(num)) closedSections.delete(num); else closedSections.add(num);
  const el = g('bsec-'+num);
  if (el) el.classList.toggle('closed', closedSections.has(num));
}

/* ═══════════════════════════════════════
   TEMPLATES
═══════════════════════════════════════ */
function linkCalendarEvent(subject) {
  budget.linkedEventSubject = subject;
  if (!subject) { renderForm(); recalc(); return; }
  const idx = (() => { try { return JSON.parse(localStorage.getItem('eventIndex')||'[]'); } catch { return []; } })();
  const ev = idx.find(e => e.subject === subject);
  if (!ev) return;
  budget.eventName = ev.subject;
  budget.ministry  = ev.category;
  renderForm();
  recalc();
}

function applyBudgetToEvent() {
  const subject = budget.linkedEventSubject || budget.eventName;
  if (!subject) { alert('Please link or enter an event name first.'); return; }
  saveBudget(); // auto-save so estimateId is set
  const budgets = (() => { try { return JSON.parse(localStorage.getItem('eventBudgets')||'{}'); } catch { return {}; } })();
  budgets[subject] = { total: getTotal(), estimateId: budget.id, eventName: subject, updatedAt: Date.now() };
  localStorage.setItem('eventBudgets', JSON.stringify(budgets));
  const btn = document.getElementById('apply-btn');
  if (btn) {
    btn.textContent = '✓ Applied!';
    btn.style.background = 'var(--green)';
    setTimeout(() => { btn.textContent = '📌 Apply to Event'; btn.style.background = ''; }, 2000);
  }
}

function applyTemplate(name) {
  const t = TEMPLATES[name]; if (!t) return;
  budget = { ...budget, eventType:name, ...t };
  renderForm(); recalc();
}

function newBudget() {
  budget = {
    id:null,eventName:'',eventType:'',ministry:'',date:'',startTime:'',endTime:'',attendance:100,notes:'',
    venueSetup:false,venueSetupHours:0,venueTeardown:false,venueTeardownHours:0,venueSpecial:false,venueStage:false,
    avProjectors:0,avScreens:0,avMicsHandheld:0,avMicsLapel:0,avSoundOp:false,avSoundOpHours:0,
    avStreaming:false,avStreamHours:0,avRecording:false,avRecordHours:0,avConfMon:0,
    prodCameras:0,prodCameraHours:0,prodLighting:false,prodDesignHours:0,prodPhoto:false,
    worshipNeeded:false,worshipMusicians:0,worshipPaidLeader:false,
    kidsNeeded:false,kidsAttendance:0,kidsSupplies:false,kidsSnacks:false,kidsPaidCoord:false,kidsCoordHours:0,
    foodNeeded:false,foodType:'Light Refreshments',foodAttendance:0,foodCustomPerPerson:0,
    commsBulletins:0,commsFlyers:0,commsBanners:0,commsCards:0,commsSocial:false,commsDesignHours:0,
    secNeeded:false,secGuards:0,secHours:0,
    staffCoordHours:0,staffHospitality:0,staffSignage:0,contingencyPct:10,
    linkedEventSubject:'',
  };
  closedSections = new Set();
  renderForm(); recalc();
}

/* ═══════════════════════════════════════
   SAVE / LOAD
═══════════════════════════════════════ */
function getTotal() {
  const secs = calcSections();
  const sub = secs.reduce((s,sec)=>s+sectionSubtotal(sec.lines),0);
  return sub * (1 + (budget.contingencyPct||0)/100);
}

function getSaved() {
  return JSON.parse(localStorage.getItem('wm_budgetEstimates') || '[]');
}

function saveBudget() {
  if (!budget.eventName) { alert('Please enter an event name before saving.'); return; }
  const saved = getSaved();
  budget.id = budget.id || ('budget-'+Date.now());
  const record = { ...budget, total: getTotal(), savedAt: Date.now() };
  const idx = saved.findIndex(e => e.id === budget.id);
  if (idx >= 0) saved[idx] = record; else saved.unshift(record);
  localStorage.setItem('wm_budgetEstimates', JSON.stringify(saved));
  recalc();
  const btn = document.querySelector('.sum-btn.pri[onclick*="saveBudget"]');
  if (btn) { const orig = btn.textContent; btn.textContent = '✓ Saved!'; btn.style.background='var(--green)'; setTimeout(()=>{ btn.textContent=orig; btn.style.background=''; }, 1500); }
}

function loadEstimate(id) {
  const saved = getSaved();
  const e = saved.find(s => s.id === id);
  if (!e) return;
  budget = { ...e };
  closedSections = new Set();
  renderForm(); recalc();
  g('budget-form').scrollIntoView({ behavior:'smooth' });
}

function deleteEstimate(id) {
  const saved = getSaved().filter(e => e.id !== id);
  localStorage.setItem('wm_budgetEstimates', JSON.stringify(saved));
  recalc();
}

/* ═══════════════════════════════════════
   RATES MODAL
═══════════════════════════════════════ */
function openRatesModal() {
  let html = '';
  for (const grp of RATE_DEFS) {
    html += `<div class="rates-group-title">${esc(grp.group)}</div>`;
    for (const [key, label, unit] of grp.keys) {
      html += `<div class="rates-row">
        <div class="rates-lbl">${esc(label)}</div>
        <input type="number" min="0" step="0.01" id="rate-${esc(key)}" value="${rates[key]!==undefined?rates[key]:DEFAULT_RATES[key]}">
        <div class="rates-unit">${esc(unit)}</div>
      </div>`;
    }
  }
  g('rates-body').innerHTML = html;
  g('rates-ov').classList.add('open');
}

function closeRatesModal() { g('rates-ov').classList.remove('open'); }

function applyRates() {
  for (const grp of RATE_DEFS) {
    for (const [key] of grp.keys) {
      const el = g('rate-'+key);
      if (el) rates[key] = parseFloat(el.value) || 0;
    }
  }
  localStorage.setItem('wm_budgetRates', JSON.stringify(rates));
  closeRatesModal();
  renderForm(); recalc();
}

function resetRates() {
  rates = { ...DEFAULT_RATES };
  localStorage.removeItem('wm_budgetRates');
  closeRatesModal();
  renderForm(); recalc();
}

/* ═══════════════════════════════════════
   SET LINKED EVENT
═══════════════════════════════════════ */
function setLinkedEvent(subject) {
  budget.linkedEventSubject = subject;
  budget.eventName = subject;
  const ev = (()=>{try{return JSON.parse(localStorage.getItem('eventIndex')||'[]');}catch{return[];}})()
    .find(e => e.subject === subject);
  if (ev) budget.ministry = ev.category || '';
  renderForm(); recalc();
}

/* ═══════════════════════════════════════
   ACTUALS — STORAGE HELPERS
═══════════════════════════════════════ */
function getActuals() {
  try { return JSON.parse(localStorage.getItem('eventActuals') || '{}'); } catch { return {}; }
}
function getActualsForBudget(id) {
  return (getActuals()[id || budget.id] || []);
}
function saveActuals(arr) {
  const all = getActuals();
  all[budget.id] = arr;
  localStorage.setItem('eventActuals', JSON.stringify(all));
}

/* ═══════════════════════════════════════
   ACTUALS — IMAGE RESIZE
═══════════════════════════════════════ */
function resizeImage(file, cb) {
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => {
    const MAX = 800, s = Math.min(1, MAX / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = img.width * s; c.height = img.height * s;
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    cb(c.toDataURL('image/jpeg', 0.7));
  };
  img.src = url;
}

/* ═══════════════════════════════════════
   ACTUALS — STATE + HELPERS
═══════════════════════════════════════ */
let _activeCatFilter   = 'All';      // kept for legacy, not used in new renderActuals
let _selectedMinistry  = 'All';
let _expandedBudgetIds = new Set();
let _modalBudgetId     = null;

function getAllEstimatesWithActuals() {
  const allActuals = getActuals();
  return getSaved().map(est => ({
    ...est,
    expenses:    allActuals[est.id] || [],
    actualTotal: (allActuals[est.id] || []).reduce((s, e) => s + (e.amount || 0), 0),
  }));
}

function getUniqueMinistries() {
  // Always show the full calendar-aligned ministry list, plus any unknown values
  // that may exist in old estimates (shown at the end if not in MINISTRIES)
  const inEstimates = new Set(getSaved().map(e => e.ministry).filter(Boolean));
  const extra = [...inEstimates].filter(m => !MINISTRIES.includes(m));
  return ['All', ...MINISTRIES, ...extra];
}

function saveActualsForBudget(budgetId, arr) {
  const all = getActuals();
  all[budgetId] = arr;
  localStorage.setItem('eventActuals', JSON.stringify(all));
}

function renderMinistrySelector(containerId, onSelect) {
  const mins = getUniqueMinistries();
  const html = mins.map(m =>
    `<button class="cat-filter-btn${_selectedMinistry===m?' active':''}"
       onclick="_selectedMinistry='${esc(m)}';_expandedBudgetIds=new Set();${onSelect}">${esc(m)}</button>`
  ).join('');
  const el = g(containerId);
  if (el) el.innerHTML = html;
}

function toggleEventRow(budgetId) {
  if (_expandedBudgetIds.has(budgetId)) {
    _expandedBudgetIds.delete(budgetId);
  } else {
    _expandedBudgetIds.add(budgetId);
  }
  renderActuals();
}

function renderActiveTab() {
  const active = document.querySelector('.budget-tab.active')?.dataset.tab;
  if (active === 'actuals')   renderActuals();
  if (active === 'dashboard') renderDashboard();
}

function renderBudgetSidebar() {
  const sidebar = g('budget-sidebar');
  if (!sidebar) return;
  const onChange = `_selectedMinistry=this.value;_expandedBudgetIds=new Set();renderActiveTab();`;
  let html = `<div>
    <div class="bsb-title" style="display:flex;justify-content:space-between;align-items:baseline;">
      Ministry
    </div>
    <div class="bsb-cb-group">
      <label class="bsb-cb-item">
        <input type="radio" name="min-filter" value="All" ${_selectedMinistry==='All'?'checked':''} onchange="${esc(onChange)}">
        All Ministries
      </label>`;
  for (const m of MINISTRIES) {
    const color = MINISTRY_COLORS[m] || '#888';
    html += `
      <label class="bsb-cb-item">
        <input type="radio" name="min-filter" value="${esc(m)}" ${_selectedMinistry===m?'checked':''} onchange="${esc(onChange)}">
        <span class="bsb-cat-dot" style="background:${color};"></span>
        ${esc(m)}
      </label>`;
  }
  html += `</div></div>
  <button class="bsb-reset-btn" onclick="_selectedMinistry='All';_expandedBudgetIds=new Set();renderBudgetSidebar();renderActiveTab();">✕ &nbsp;Reset Filter</button>`;
  sidebar.innerHTML = html;
}

/* ═══════════════════════════════════════
   ACTUALS — RENDER
═══════════════════════════════════════ */

function renderActuals() {
  const all  = getAllEstimatesWithActuals();
  const list = _selectedMinistry === 'All' ? all : all.filter(e => e.ministry === _selectedMinistry);
  const grandTotal = list.reduce((s, e) => s + e.actualTotal, 0);

  let html = `<div class="ministry-selector-bar" id="actuals-ministry-bar"></div>
  <div class="actuals-toolbar">
    <h3>Actual Expenses${_selectedMinistry !== 'All' ? ' — ' + esc(_selectedMinistry) : ''}</h3>
    <span class="actuals-total-badge">Total: ${fmtAmtFull(grandTotal)}</span>
  </div>`;

  if (list.length === 0) {
    html += `<div class="no-expenses-msg">No events with saved estimates${_selectedMinistry !== 'All' ? ' for <strong>' + esc(_selectedMinistry) + '</strong>' : ''}.<br>
      <span style="font-size:.75rem;">Go to the 📋 Estimate tab to create one.</span></div>`;
  } else {
    for (const est of list) {
      const isExpanded = _expandedBudgetIds.has(est.id);
      const variance   = est.total - est.actualTotal;
      const varColor   = variance < 0 ? 'var(--red)' : 'var(--green)';
      const status     = est.actualTotal === 0 ? '⚪' : (variance < 0 ? '🔴' : (variance / Math.max(est.total, 1) < 0.1 ? '🟡' : '🟢'));
      const varText    = est.actualTotal > 0 ? fmtAmtFull(Math.abs(variance)) + (variance < 0 ? ' over' : ' under') : 'No actuals yet';
      const datePart   = est.date ? new Date(est.date + 'T12:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) : '';
      const metaParts  = [est.ministry, datePart].filter(Boolean).join(' · ');

      html += `<div class="event-row${isExpanded ? ' expanded' : ''}">
        <div class="event-row-hdr" onclick="toggleEventRow('${esc(est.id)}')">
          <span class="event-row-arrow">${isExpanded ? '▼' : '▶'}</span>
          <span class="event-row-name">${esc(est.eventName || 'Untitled')}</span>
          ${metaParts ? `<span class="event-row-meta">${esc(metaParts)}</span>` : ''}
          <span class="event-row-stat"><span style="color:var(--sub);font-size:.68rem;">Budget</span>${fmtAmtFull(est.total)}</span>
          <span class="event-row-stat"><span style="color:var(--sub);font-size:.68rem;">Actual</span><strong>${est.actualTotal > 0 ? fmtAmtFull(est.actualTotal) : '—'}</strong></span>
          <span class="event-row-variance" style="color:${est.actualTotal > 0 ? varColor : 'var(--sub)'};">${varText} ${status}</span>
        </div>`;

      if (isExpanded) {
        html += `<div class="event-row-body">`;
        if (est.expenses.length === 0) {
          html += `<div style="padding:14px 18px;color:var(--sub);font-size:.82rem;">No expenses yet for this event.</div>`;
        } else {
          html += `<div style="overflow-x:auto;"><table class="actuals-table"><thead><tr>
            <th>Date</th><th>Category</th><th>Description</th><th>Vendor</th>
            <th style="text-align:right;">Amount</th><th>📎</th><th></th>
          </tr></thead><tbody>`;
          for (const exp of est.expenses) {
            const ds = exp.date ? new Date(exp.date + 'T12:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric'}) : '—';
            const thumb = exp.receiptDataUrl
              ? `<img class="receipt-thumb" src="${esc(exp.receiptDataUrl)}" alt="receipt" onclick="openLightbox('${esc(exp.id)}','${esc(est.id)}')" title="${esc(exp.receiptName||'Receipt')}">`
              : '<span style="color:#ccc;font-size:.7rem;">—</span>';
            html += `<tr>
              <td style="white-space:nowrap;color:var(--sub);font-size:.75rem;">${esc(ds)}</td>
              <td style="font-size:.75rem;">${esc(exp.category)}</td>
              <td>${esc(exp.description||'—')}${exp.notes ? `<div style="font-size:.68rem;color:var(--sub);">${esc(exp.notes)}</div>` : ''}</td>
              <td style="color:var(--sub);font-size:.75rem;">${esc(exp.vendor||'—')}</td>
              <td style="text-align:right;font-weight:700;color:var(--navy);">${fmtAmtFull(exp.amount||0)}</td>
              <td>${thumb}</td>
              <td class="act-actions">
                <button class="act-btn" onclick="openExpenseModal('${esc(exp.id)}','${esc(est.id)}')" title="Edit">✎</button>
                <button class="act-btn del" onclick="deleteExpense('${esc(exp.id)}','${esc(est.id)}')" title="Delete">✕</button>
              </td>
            </tr>`;
          }
          html += `</tbody></table></div>
          <div class="event-row-foot">Total: <strong>${fmtAmtFull(est.actualTotal)}</strong></div>`;
        }
        html += `<div style="padding:8px 14px 14px;">
          <button class="add-exp-btn" onclick="openExpenseModal(null,'${esc(est.id)}')">＋ Add Expense</button>
        </div></div>`;
      }
      html += `</div>`;
    }
  }

  const view = g('actuals-view');
  if (view) {
    view.innerHTML = html;
    renderMinistrySelector('actuals-ministry-bar', 'renderActuals()');
  }
}

/* ═══════════════════════════════════════
   ACTUALS — EXPENSE MODAL
═══════════════════════════════════════ */
let _editingExpenseId   = null;
let _pendingReceiptUrl  = null;
let _pendingReceiptName = null;

function openExpenseModal(expId, budgetId) {
  _editingExpenseId  = expId || null;
  _modalBudgetId     = budgetId || budget.id;
  _pendingReceiptUrl = null;
  _pendingReceiptName = null;

  const expenses = getActuals()[_modalBudgetId] || [];
  const existing = expId ? expenses.find(e => e.id === expId) : null;

  // Resolve event name for context
  const est = getSaved().find(e => e.id === _modalBudgetId);
  const contextName = est ? est.eventName : (budget.eventName || '');

  const catOpts = SECTION_LABELS.map(l =>
    `<option value="${esc(l)}"${existing && existing.category===l?' selected':''}>${esc(l)}</option>`
  ).join('');

  const today    = new Date();
  const todayStr = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');

  g('exp-modal-body').innerHTML = `
    ${contextName ? `<div style="padding:4px 0 10px;font-size:.75rem;color:var(--sub);">Event: <strong style="color:var(--navy);">${esc(contextName)}</strong></div>` : ''}
    <div class="exp-field">
      <label>Category</label>
      <select class="b-select" id="exp-cat" style="width:100%;">
        <option value="">Select category…</option>${catOpts}
      </select>
    </div>
    <div class="exp-2col">
      <div class="exp-field">
        <label>Description</label>
        <input class="b-input" id="exp-desc" type="text" placeholder="e.g. Venue rental" value="${esc(existing?.description||'')}">
      </div>
      <div class="exp-field">
        <label>Vendor</label>
        <input class="b-input" id="exp-vendor" type="text" placeholder="e.g. Pine Cove" value="${esc(existing?.vendor||'')}">
      </div>
    </div>
    <div class="exp-2col">
      <div class="exp-field">
        <label>Amount ($)</label>
        <input class="b-input" id="exp-amount" type="number" min="0" step="0.01" placeholder="0.00" value="${existing ? (existing.amount||0) : ''}">
      </div>
      <div class="exp-field">
        <label>Date</label>
        <input class="b-input" id="exp-date" type="date" value="${existing?.date||todayStr}">
      </div>
    </div>
    <div class="exp-field">
      <label>Receipt (optional)</label>
      <input type="file" id="exp-receipt" accept="image/*" onchange="handleReceiptUpload(this)" style="font-size:.8rem;">
      <div class="exp-receipt-preview" id="exp-receipt-preview">
        ${existing?.receiptDataUrl
          ? `<img class="receipt-thumb" src="${esc(existing.receiptDataUrl)}" alt="receipt" onclick="openLightbox('${esc(expId)}','${esc(_modalBudgetId)}')" style="height:48px;margin-top:4px;">`
          : ''}
      </div>
    </div>
    <div class="exp-field">
      <label>Notes</label>
      <textarea class="b-textarea" id="exp-notes" placeholder="Optional notes…" style="min-height:48px;">${esc(existing?.notes||'')}</textarea>
    </div>`;

  g('exp-modal-title').textContent = expId ? 'Edit Expense' : 'Add Expense';
  g('exp-ov').classList.add('open');
}

function handleReceiptUpload(input) {
  const file = input.files[0];
  if (!file) return;
  resizeImage(file, dataUrl => {
    _pendingReceiptUrl  = dataUrl;
    _pendingReceiptName = file.name;
    const preview = g('exp-receipt-preview');
    if (preview) preview.innerHTML = `<img class="receipt-thumb" src="${dataUrl}" alt="preview" style="height:48px;margin-top:4px;">`;
  });
}

function closeExpenseModal() {
  g('exp-ov').classList.remove('open');
  _editingExpenseId   = null;
  _modalBudgetId      = null;
  _pendingReceiptUrl  = null;
  _pendingReceiptName = null;
}

function saveExpense() {
  const bid = _modalBudgetId || budget.id;
  if (!bid) { alert('No budget selected.'); return; }
  const cat    = g('exp-cat').value;
  const desc   = (g('exp-desc').value||'').trim();
  const vendor = (g('exp-vendor').value||'').trim();
  const amount = parseFloat(g('exp-amount').value) || 0;
  const date   = g('exp-date').value;
  const notes  = (g('exp-notes').value||'').trim();
  if (!cat) { alert('Please select a category.'); return; }

  const expenses = getActuals()[bid] || [];
  if (_editingExpenseId) {
    const idx = expenses.findIndex(e => e.id === _editingExpenseId);
    if (idx >= 0) {
      expenses[idx] = {
        ...expenses[idx], category:cat, description:desc, vendor, amount, date, notes,
        ...(_pendingReceiptUrl ? { receiptDataUrl:_pendingReceiptUrl, receiptName:_pendingReceiptName } : {}),
      };
    }
  } else {
    expenses.push({
      id:'exp-'+Date.now(), category:cat, description:desc, vendor, amount, date, notes,
      receiptDataUrl:_pendingReceiptUrl||null, receiptName:_pendingReceiptName||null,
    });
  }
  saveActualsForBudget(bid, expenses);
  closeExpenseModal();
  renderActuals();
}

function deleteExpense(expId, budgetId) {
  const bid = budgetId || budget.id;
  if (!confirm('Delete this expense?')) return;
  saveActualsForBudget(bid, (getActuals()[bid] || []).filter(e => e.id !== expId));
  renderActuals();
}

/* ═══════════════════════════════════════
   RECEIPT LIGHTBOX
═══════════════════════════════════════ */
function openLightbox(expId, budgetId) {
  const bid = budgetId || budget.id;
  const exp = (getActuals()[bid] || []).find(e => e.id === expId);
  if (!exp || !exp.receiptDataUrl) return;
  const img = g('lightbox-img');
  if (img) img.src = exp.receiptDataUrl;
  g('receipt-lightbox').classList.add('open');
}
function closeLightbox() {
  g('receipt-lightbox').classList.remove('open');
}

/* ═══════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════ */
let _dashCharts = [];

function renderDashboard() {
  const all  = getAllEstimatesWithActuals();
  const list = _selectedMinistry === 'All' ? all : all.filter(e => e.ministry === _selectedMinistry);

  /* ── Aggregates ── */
  const budgetTotal = list.reduce((s, e) => s + (e.total || 0), 0);
  const actualTotal = list.reduce((s, e) => s + e.actualTotal, 0);
  const remaining   = budgetTotal - actualTotal;
  const pctUsed     = budgetTotal > 0 ? (actualTotal / budgetTotal * 100) : 0;
  const remClass    = remaining < 0 ? 'dv-red' : (pctUsed > 80 ? 'dv-amber' : 'dv-green');
  const eventCount  = list.length;
  const withActuals = list.filter(e => e.actualTotal > 0).length;

  /* ── Ministry breakdown ── */
  const byMinistry = {};
  for (const est of list) {
    const m = est.ministry || 'Unassigned';
    if (!byMinistry[m]) byMinistry[m] = { budget:0, actual:0 };
    byMinistry[m].budget += est.total || 0;
    byMinistry[m].actual += est.actualTotal;
  }
  // Sort ministries by budget desc
  const ministryKeys  = Object.keys(byMinistry).sort((a,b) => byMinistry[b].budget - byMinistry[a].budget);
  const showMinistry  = ministryKeys.length > 0 && !(ministryKeys.length === 1 && ministryKeys[0] === 'Unassigned');

  /* ── Category breakdown (actuals across all events) ── */
  const actByCat = {};
  for (const est of list) {
    for (const exp of est.expenses) {
      actByCat[exp.category] = (actByCat[exp.category] || 0) + (exp.amount || 0);
    }
  }
  const catEntries = SECTION_LABELS
    .map((lbl, i) => ({ lbl, icon:SECTION_ICONS[i], amt:actByCat[lbl] || 0 }))
    .filter(e => e.amt > 0)
    .sort((a, b) => b.amt - a.amt);

  /* ── Events sorted by date (for "over time" chart) ── */
  const withDates = [...list].filter(e => e.date).sort((a, b) => a.date.localeCompare(b.date));

  /* ══ BUILD HTML ══ */
  let html = `<div class="ministry-selector-bar" id="dashboard-ministry-bar"></div>
  <div class="dash-stat-grid">
    <div class="dash-stat-card">
      <div class="dash-stat-lbl">💰 Budget Estimate</div>
      <div class="dash-stat-val">${fmtAmtFull(budgetTotal)}</div>
    </div>
    <div class="dash-stat-card">
      <div class="dash-stat-lbl">🧾 Actual Spend</div>
      <div class="dash-stat-val">${fmtAmtFull(actualTotal)}</div>
    </div>
    <div class="dash-stat-card">
      <div class="dash-stat-lbl">📉 Remaining</div>
      <div class="dash-stat-val ${remClass}">${fmtAmtFull(Math.abs(remaining))}${remaining < 0 ? ' over' : ''}</div>
    </div>
    <div class="dash-stat-card">
      <div class="dash-stat-lbl">📊 Budget Used</div>
      <div class="dash-stat-val ${remClass}">${pctUsed.toFixed(1)}%</div>
    </div>
    <div class="dash-stat-card">
      <div class="dash-stat-lbl">📅 Total Events</div>
      <div class="dash-stat-val">${eventCount}</div>
    </div>
    <div class="dash-stat-card">
      <div class="dash-stat-lbl">✅ With Actuals</div>
      <div class="dash-stat-val">${withActuals}<span style="font-size:.72rem;color:var(--sub);font-family:'Lato',sans-serif;font-weight:400;"> / ${eventCount}</span></div>
    </div>
  </div>`;

  if (list.length === 0) {
    html += `<div class="no-expenses-msg">No events with saved estimates${_selectedMinistry !== 'All' ? ' for <strong>' + esc(_selectedMinistry) + '</strong>' : ''}.<br>
      <span style="font-size:.75rem;">Go to the 📋 Estimate tab to create one.</span></div>`;
  } else {

    /* Row 1: Budget vs. Actual by Event  |  Spend Over Time */
    const evtH   = Math.max(180, list.length * 44);
    const timeH  = Math.max(180, withDates.length * 44);
    html += `
    <div class="dash-2col">
      <div class="dash-panel">
        <div class="dash-panel-title">Budget vs. Actual by Event</div>
        <div style="position:relative;min-height:${evtH}px;"><canvas id="dash-chart-event"></canvas></div>
      </div>
      <div class="dash-panel">
        <div class="dash-panel-title">📅 Estimated Spend Over Time</div>
        ${withDates.length > 0
          ? `<div style="position:relative;height:${timeH}px;"><canvas id="dash-chart-time"></canvas></div>`
          : `<div style="padding:28px 16px;text-align:center;color:var(--sub);font-size:.8rem;">Add event dates to your estimates<br>to see spend over time.</div>`}
      </div>
    </div>`;

    /* Row 2: Spend by Ministry  |  Actual Spend by Category */
    const minH = Math.max(160, ministryKeys.length * 44);
    const catH = Math.max(160, catEntries.length * 36);
    html += `
    <div class="dash-2col-eq">
      <div class="dash-panel">
        <div class="dash-panel-title">🏷 Spend by Ministry</div>
        ${showMinistry
          ? `<div style="position:relative;min-height:${minH}px;"><canvas id="dash-chart-ministry"></canvas></div>`
          : `<div style="padding:28px 16px;text-align:center;color:var(--sub);font-size:.8rem;">Add a ministry to your estimates<br>to see spend by ministry.</div>`}
      </div>
      <div class="dash-panel">
        <div class="dash-panel-title">🗂 Actual Spend by Category</div>
        ${catEntries.length > 0
          ? `<div style="position:relative;min-height:${catH}px;"><canvas id="dash-chart-cat"></canvas></div>`
          : `<div style="padding:28px 16px;text-align:center;color:var(--sub);font-size:.8rem;">No expenses recorded yet.</div>`}
      </div>
    </div>`;

    /* Row 3: Event Comparison table */
    html += `
    <div class="dash-panel">
      <div class="dash-panel-title">Event Comparison</div>
      <table class="var-table">
        <thead><tr>
          <th>Event</th>
          <th>Ministry</th>
          <th style="text-align:right;">Budget</th>
          <th style="text-align:right;">Actual</th>
          <th style="text-align:right;">Variance</th>
          <th></th>
        </tr></thead><tbody>`;
    for (const est of list) {
      const variance = est.total - est.actualTotal;
      let status = '⚪';
      if (est.actualTotal > 0) {
        if (variance < 0) status = '🔴';
        else if (variance / Math.max(est.total, 1) < 0.1) status = '🟡';
        else status = '🟢';
      }
      const varText  = est.actualTotal > 0 ? fmtAmtFull(Math.abs(variance)) + (variance < 0 ? ' over' : ' under') : '—';
      const varColor = variance < 0 ? 'var(--red)' : (est.actualTotal > 0 ? 'var(--green)' : 'var(--sub)');
      html += `<tr>
        <td style="font-size:.72rem;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(est.eventName||'')}">${esc(est.eventName||'Untitled')}</td>
        <td style="font-size:.72rem;color:var(--sub);">${esc(est.ministry||'—')}</td>
        <td style="text-align:right;font-size:.72rem;">${fmtAmtFull(est.total)}</td>
        <td style="text-align:right;font-size:.72rem;font-weight:700;color:var(--navy);">${est.actualTotal > 0 ? fmtAmtFull(est.actualTotal) : '—'}</td>
        <td style="text-align:right;font-size:.72rem;color:${varColor};">${varText}</td>
        <td style="text-align:center;">${status}</td>
      </tr>`;
    }
    html += `</tbody></table></div>`;
  }

  const view = g('dashboard-view');
  if (view) {
    view.innerHTML = html;
    renderMinistrySelector('dashboard-ministry-bar', 'renderDashboard()');
  }

  /* ── Destroy previous charts ── */
  _dashCharts.forEach(c => { try { c.destroy(); } catch(_) {} });
  _dashCharts = [];

  if (list.length === 0 || typeof Chart === 'undefined') return;

  const dark      = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = dark ? '#2A3548' : '#e5e7eb';
  const tickColor = dark ? '#7E8FA0' : '#5A6872';
  const textColor = dark ? '#E0DAD2' : '#1D252C';
  const mkAmt     = v => v >= 1000 ? '$' + (v/1000).toFixed(0) + 'k' : '$' + v;
  const shortName = n => { const s = n || 'Untitled'; return s.length > 20 ? s.substring(0,18)+'…' : s; };
  const hBar      = extra => ({ indexAxis:'y', responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{ position:'top', labels:{ font:{size:11}, color:textColor } }, ...extra?.plugins },
    scales:{ x:{ beginAtZero:true, grid:{color:gridColor}, ticks:{color:tickColor, callback:mkAmt} },
             y:{ grid:{color:gridColor}, ticks:{font:{size:10}, color:tickColor} } } });
  const vBar      = extra => ({ responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{ position:'top', labels:{ font:{size:11}, color:textColor } }, ...extra?.plugins },
    scales:{ x:{ grid:{color:gridColor}, ticks:{font:{size:10}, color:tickColor} },
             y:{ beginAtZero:true, grid:{color:gridColor}, ticks:{color:tickColor, callback:mkAmt} } } });

  /* Chart 1 — Budget vs. Actual by Event */
  const c1 = g('dash-chart-event');
  if (c1) _dashCharts.push(new Chart(c1, {
    type:'bar',
    data:{ labels:list.map(e=>shortName(e.eventName)), datasets:[
      { label:'Budget', data:list.map(e=>e.total||0), backgroundColor:'#4B90C8', borderRadius:3 },
      { label:'Actual', data:list.map(e=>e.actualTotal),  backgroundColor:'#22c55e', borderRadius:3 },
    ]},
    options: hBar(),
  }));

  /* Chart 2 — Spend over Time (vertical) */
  const c2 = g('dash-chart-time');
  if (c2 && withDates.length > 0) _dashCharts.push(new Chart(c2, {
    type:'bar',
    data:{ labels:withDates.map(e=>{
      const d = new Date(e.date+'T12:00:00');
      return d.toLocaleDateString('en-US',{month:'short',day:'numeric'}) + (e.eventName ? '\n'+shortName(e.eventName) : '');
    }), datasets:[
      { label:'Budget', data:withDates.map(e=>e.total||0), backgroundColor:'#4B90C8', borderRadius:3 },
      { label:'Actual', data:withDates.map(e=>e.actualTotal),  backgroundColor:'#22c55e', borderRadius:3 },
    ]},
    options: vBar(),
  }));

  /* Chart 3 — Spend by Ministry */
  const c3 = g('dash-chart-ministry');
  if (c3 && showMinistry) _dashCharts.push(new Chart(c3, {
    type:'bar',
    data:{ labels:ministryKeys, datasets:[
      { label:'Budget', data:ministryKeys.map(m=>byMinistry[m].budget), backgroundColor:'#4B90C8', borderRadius:3 },
      { label:'Actual', data:ministryKeys.map(m=>byMinistry[m].actual), backgroundColor:'#22c55e', borderRadius:3 },
    ]},
    options: hBar(),
  }));

  /* Chart 4 — Actual Spend by Category */
  const c4 = g('dash-chart-cat');
  if (c4 && catEntries.length > 0) _dashCharts.push(new Chart(c4, {
    type:'bar',
    data:{ labels:catEntries.map(e=>`${e.icon} ${e.lbl}`), datasets:[
      { label:'Actual Spend', data:catEntries.map(e=>e.amt), backgroundColor:'#f59e0b', borderRadius:3 },
    ]},
    options: hBar({ plugins:{ legend:{ display:false } } }),
  }));
}

/* ═══════════════════════════════════════
   TAB SWITCHING
═══════════════════════════════════════ */
function setTab(name) {
  document.querySelectorAll('.budget-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === name);
  });
  const estimateView = document.querySelector('.budget-estimate-view');
  const dataViews    = g('budget-data-views');
  const actualsView  = document.querySelector('.budget-actuals-view');
  const dashView     = document.querySelector('.budget-dashboard-view');

  // Estimate: full-width, no sidebar
  if (estimateView) estimateView.classList.toggle('act', name === 'estimate');

  // Actuals + Dashboard share the sidebar wrapper
  if (dataViews) dataViews.style.display = (name === 'actuals' || name === 'dashboard') ? 'flex' : 'none';
  if (actualsView) actualsView.classList.toggle('act', name === 'actuals');
  if (dashView)    dashView.classList.toggle('act',    name === 'dashboard');

  if (name === 'actuals' || name === 'dashboard') renderBudgetSidebar();
  if (name === 'actuals')   renderActuals();
  if (name === 'dashboard') renderDashboard();
}

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */
renderForm();
recalc();
setTab('estimate');

function openInCalendarFromBudget() {
  localStorage.setItem('pendingCalendarEvent', JSON.stringify({ eventId: null, subject: budget.linkedEventSubject }));
  window.location.href = 'index.html';
}

function openInRoomsFromBudget() {
  const evIdx = (() => { try { return JSON.parse(localStorage.getItem('eventIndex')||'[]'); } catch { return []; } })();
  const ev = evIdx.find(e => e.subject === budget.linkedEventSubject);
  localStorage.setItem('pendingViewReservation', JSON.stringify({ subject: budget.linkedEventSubject, date: ev ? ev.date : '' }));
  window.location.href = 'rooms.html';
}

// Auto-load estimate if navigated here from Calendar
(function() {
  const _pending = localStorage.getItem('pendingBudgetEvent');
  if (!_pending) return;
  localStorage.removeItem('pendingBudgetEvent');
  try {
    const { subject } = JSON.parse(_pending);
    if (!subject) return;
    // Try to load an existing saved estimate linked to this event
    const budgets = JSON.parse(localStorage.getItem('eventBudgets') || '{}');
    const linked = budgets[subject];
    if (linked && linked.estimateId) {
      loadEstimate(linked.estimateId);
    } else {
      // Start a new estimate pre-linked to the event
      setLinkedEvent(subject);
    }
  } catch(e) {}
})();
