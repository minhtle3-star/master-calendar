/* ════════════════════════════════════════════════════════
   SHARED SIDE NAV — injected on every page
   ════════════════════════════════════════════════════════ */
(function () {
  const PAGES = [
    { href: 'index.html',         icon: '📅', label: 'Calendar',      page: 'calendar' },
    { href: 'admin.html',         icon: '⚙️',  label: 'Admin',         page: 'admin' },
    { href: 'budget.html',        icon: '💰', label: 'Budget',        page: 'budget' },
    { href: 'rooms.html',         icon: '🏢', label: 'Rooms',         page: 'rooms' },
    { href: 'event-request.html', icon: '📋', label: 'Event Request', page: 'event-request', badge: true },
  ];

  function getPendingCount() {
    try { return JSON.parse(localStorage.getItem('wm_eventRequests') || '[]').filter(r => r.status === 'pending').length; }
    catch { return 0; }
  }

  function getCurrentPage() {
    const path = location.pathname.split('/').pop() || 'index.html';
    return (PAGES.find(p => p.href === path) || {}).page || '';
  }

  function getCollapsed() { return localStorage.getItem('wm_navCollapsed') === '1'; }

  function applyCollapsed(v) {
    localStorage.setItem('wm_navCollapsed', v ? '1' : '0');
    document.body.classList.toggle('nav-collapsed', v);
    const nav = document.getElementById('side-nav');
    if (nav) nav.classList.toggle('collapsed', v);
    const icon = document.querySelector('.side-nav-toggle-icon');
    if (icon) icon.textContent = v ? '›' : '‹';
  }

  window.toggleSideNav = function () { applyCollapsed(!getCollapsed()); };

  function render() {
    const collapsed  = getCollapsed();
    const activePage = getCurrentPage();
    const pending    = getPendingCount();

    const items = PAGES.map(p => {
      const active = p.page === activePage;
      const badge  = p.badge && pending > 0 ? `<span class="side-nav-badge">${pending}</span>` : '';
      return `<a class="side-nav-item${active ? ' active' : ''}" href="${p.href}" title="${p.label}">
        <span class="side-nav-icon">${p.icon}</span>
        <span class="side-nav-label">${p.label}</span>
        ${badge}
      </a>`;
    }).join('');

    const nav = document.createElement('nav');
    nav.id        = 'side-nav';
    nav.className = 'side-nav' + (collapsed ? ' collapsed' : '');
    nav.innerHTML = `
      <a class="side-nav-logo" href="index.html">
        <div class="sn-brand-w"><span>W</span></div>
        <span class="side-nav-logo-label">Watermark</span>
      </a>
      <div class="side-nav-items">${items}</div>
      <button class="side-nav-toggle" onclick="toggleSideNav()" title="Toggle sidebar">
        <span class="side-nav-toggle-icon">${collapsed ? '›' : '‹'}</span>
      </button>`;

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.toggle('nav-collapsed', collapsed);

    // Hide the old dropdown nav — sidebar replaces it
    document.querySelectorAll('.app-drop, .app-chevron').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.brand').forEach(el => {
      el.style.cursor = 'default';
      el.removeAttribute('onclick');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
