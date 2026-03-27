/* ════════════════════════════════════════════════════════
   SHARED SIDE NAV — injected on every page
   ════════════════════════════════════════════════════════ */
(function () {

  /* ── Auth guard: redirect to login if no session ── */
  if (window.Auth) {
    const _path = window.location.pathname.split('/').pop() || '';
    if (_path !== 'login.html' && !Auth.requireAuth()) return;
  }

  const PAGES = [
    { href: 'index.html',         icon: '📅', label: 'Calendar',      page: 'calendar' },
    { href: 'admin.html',         icon: '⚙️',  label: 'Admin',         page: 'admin',          requires: 'staff' },
    { href: 'budget.html',        icon: '💰', label: 'Budget',        page: 'budget',         requires: 'staff' },
    { href: 'rooms.html',         icon: '🏢', label: 'Rooms',         page: 'rooms',          requires: 'staff' },
    { href: 'security.html',      icon: '🔒', label: 'Security',      page: 'security',       requires: 'staff' },
    { href: 'event-request.html', icon: '📋', label: 'Event Request', page: 'event-request',  requires: 'staff', badge: true },
    { href: 'user-admin.html',    icon: '👥', label: 'Users',         page: 'user-admin',     requires: 'admin' },
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

  function buildUserFooter() {
    if (!window.Auth) return '';
    const session = Auth.getSession();
    if (!session) return '';
    const user     = Auth.getCurrentUser();
    const initials = user ? Auth.getAvatarInitials(user) : '?';
    const color    = user ? Auth.getAvatarColor(session.userId) : '#6b7280';
    const name     = session.name || 'User';
    const roleLabel = { admin: 'Admin', staff: 'Staff', viewer: 'Viewer' }[Auth.getUserRole(session.userId)] || 'Viewer';
    return `
      <div class="sn-user-footer">
        <div class="sn-user-avatar" style="background:${color}">${initials}</div>
        <div class="sn-user-text">
          <div class="sn-user-name">${name}</div>
          <div class="sn-user-role">${roleLabel}</div>
        </div>
        <button class="sn-logout-btn" onclick="Auth.logout()" title="Sign out">↩</button>
      </div>`;
  }

  function render() {
    const collapsed  = getCollapsed();
    const activePage = getCurrentPage();
    const pending    = getPendingCount();

    const items = PAGES.map(p => {
      const active   = p.page === activePage;
      const badge    = p.badge && pending > 0 ? `<span class="side-nav-badge">${pending}</span>` : '';
      const requires = p.requires ? ` data-requires="${p.requires}"` : '';
      return `<a class="side-nav-item${active ? ' active' : ''}" href="${p.href}" title="${p.label}"${requires}>
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
      </button>
      ${buildUserFooter()}`;

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.toggle('nav-collapsed', collapsed);

    // Hide the old dropdown nav — sidebar replaces it
    document.querySelectorAll('.app-drop, .app-chevron').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.brand').forEach(el => {
      el.style.cursor = 'default';
      el.removeAttribute('onclick');
    });

    // Inject mobile bottom tab bar
    if (!document.getElementById('mobile-tab-bar')) {
      const tabBar = document.createElement('nav');
      tabBar.id        = 'mobile-tab-bar';
      tabBar.className = 'mobile-tab-bar';
      tabBar.innerHTML = PAGES.filter(p => p.page !== 'user-admin').map(p => {
        const active    = p.page === activePage;
        const badgeHtml = p.badge && pending > 0
          ? `<span class="mobile-tab-badge">${pending}</span>` : '';
        const requires  = p.requires ? ` data-requires="${p.requires}"` : '';
        return `<a class="mobile-tab${active ? ' active' : ''}" href="${p.href}"${requires}>
          <span class="mobile-tab-icon">${p.icon}${badgeHtml}</span>
          <span>${p.label}</span>
        </a>`;
      }).join('');
      document.body.appendChild(tabBar);
    }
  }

  /* ── Page-transition exit handler ── */
  function initTransitions() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('http') || href.startsWith('//') ||
          link.target === '_blank') return;

      const app = document.querySelector('.app');
      if (!app) return;

      e.preventDefault();
      app.classList.add('page-exit');
      setTimeout(() => { window.location.href = href; }, 160);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { render(); initTransitions(); });
  } else {
    render();
    initTransitions();
  }
})();
