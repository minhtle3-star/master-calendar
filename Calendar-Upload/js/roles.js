window.AppRole = (function() {
  const LS_KEY = 'wm_role';
  const ROLES = ['admin', 'staff', 'viewer'];
  const LABELS = { admin: 'Admin', staff: 'Staff', viewer: 'Viewer' };
  const ICONS  = { admin: '🔑', staff: '👤', viewer: '👁' };
  const COLORS = { admin: '#003A5D', staff: '#0369a1', viewer: '#6b7280' };

  function getRole() { return localStorage.getItem(LS_KEY) || 'admin'; }
  function setRole(r) {
    if (!ROLES.includes(r)) return;
    localStorage.setItem(LS_KEY, r);
    applyRole();
    window.dispatchEvent(new CustomEvent('rolechange', { detail: { role: r } }));
  }
  function isAdmin()  { return getRole() === 'admin'; }
  function isStaff()  { return getRole() === 'admin' || getRole() === 'staff'; }
  function isViewer() { return true; }

  function applyRole() {
    const r = getRole();
    document.body.setAttribute('data-role', r);
    // Sync sidebar picker buttons
    document.querySelectorAll('.sn-role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === r);
    });
    // Sync Actions dropdown role buttons (calendar page)
    ['admin','staff','viewer'].forEach(role => {
      const btn = document.getElementById('cal-role-' + role);
      if (btn) btn.classList.toggle('cal-role-active', role === r);
    });
    // Update Actions button label to show current role
    const actBtn = document.querySelector('.cal-actions-btn');
    if (actBtn) actBtn.textContent = `${ICONS[r]} ${LABELS[r]} ▾`;
  }

  /* ── No header injection needed — role is in Actions dropdown + sidebar ── */
  function injectHeaderRole() { /* intentionally empty */ }

  /* ── Sidebar picker (kept for accessibility on collapsed nav) ── */
  function injectRolePicker() {
    const nav = document.getElementById('side-nav');
    if (!nav || document.getElementById('sn-role-picker')) return;
    const r = getRole();
    const picker = document.createElement('div');
    picker.id = 'sn-role-picker';
    picker.className = 'sn-role-picker';
    picker.innerHTML = `
      <div class="sn-role-label">View as</div>
      <div class="sn-role-btns">
        ${ROLES.map(role => `
          <button class="sn-role-btn${role === r ? ' active' : ''}" data-role="${role}"
            onclick="AppRole.setRole('${role}')" title="${LABELS[role]}">
            <span>${ICONS[role]}</span>
            <span class="sn-role-btn-label">${LABELS[role]}</span>
          </button>`).join('')}
      </div>`;
    nav.appendChild(picker);
  }

  /* ── Hide/show elements by data-requires ── */
  function applyVisibility() {
    const r = getRole();
    document.querySelectorAll('[data-requires]').forEach(el => {
      const req = el.getAttribute('data-requires');
      let show = true;
      if (req === 'admin' && r !== 'admin') show = false;
      if (req === 'staff' && r === 'viewer') show = false;
      el.style.display = show ? '' : 'none';
    });
  }

  function init() {
    applyRole();
    setTimeout(() => {
      injectHeaderRole();
      injectRolePicker();
      applyVisibility();
      // Close role drop when clicking outside
      document.addEventListener('click', e => {
        if (!e.target.closest('#hdr-role-wrap')) {
          document.getElementById('hdr-role-wrap')?.classList.remove('open');
        }
      });
    }, 50);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.addEventListener('rolechange', () => { applyRole(); applyVisibility(); });

  return { getRole, setRole, isAdmin, isStaff, isViewer, applyVisibility };
})();
