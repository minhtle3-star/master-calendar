/* ══════════════════════════════════════════════════════════
   SHELL — shared theme + app-switcher + mobile nav logic
   Functions: initTheme, toggleTheme, toggleDrop,
              toggleMobileSidebar, closeMobileSidebar
   ══════════════════════════════════════════════════════════ */

function initTheme() {
  const t = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}

function toggleDrop(el) {
  el.classList.toggle('open');
}

/* Close dropdown when clicking outside the brand switcher */
document.addEventListener('click', e => {
  if (!e.target.closest('.brand')) {
    document.querySelector('.brand')?.classList.remove('open');
  }
});

/* ── Mobile: bottom tab bar + sidebar drawer ── */

const _currentPage = (function() {
  const p = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return p === '' ? 'index' : p;
})();

function _isActivePage(page) {
  if (page === 'index') return _currentPage === 'index' || _currentPage === '';
  return _currentPage === page;
}

(function injectMobileNav() {
  // Bottom tab bar
  const nav = document.createElement('nav');
  nav.className = 'mobile-tab-bar';
  nav.innerHTML = [
    ['index',  '📅', 'Calendar'],
    ['admin',  '⚙️',  'Admin'],
    ['budget', '💰', 'Budget'],
    ['rooms',  '🏢', 'Rooms'],
  ].map(([page, icon, label]) =>
    `<a href="${page}.html" class="mobile-tab${_isActivePage(page) ? ' active' : ''}">` +
    `<span class="mobile-tab-icon">${icon}</span><span>${label}</span></a>`
  ).join('');
  document.body.appendChild(nav);

  // Sidebar dimmer overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';
  overlay.addEventListener('click', closeMobileSidebar);
  document.body.appendChild(overlay);
})();

function toggleMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  const opening = !sidebar.classList.contains('mobile-open');
  sidebar.classList.toggle('mobile-open', opening);
  if (overlay) overlay.classList.toggle('mobile-open', opening);
}

function closeMobileSidebar() {
  document.querySelector('.sidebar')?.classList.remove('mobile-open');
  document.getElementById('sidebar-overlay')?.classList.remove('mobile-open');
}

initTheme();
