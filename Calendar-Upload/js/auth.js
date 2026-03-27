/* ════════════════════════════════════════
   AUTH.JS — User Authentication & Session Management
   Proof-of-concept auth using SHA-256 + sessionStorage
════════════════════════════════════════ */
window.Auth = (function () {

  const USERS_KEY   = 'wm_users';
  const GROUPS_KEY  = 'wm_groups';
  const SESSION_KEY = 'wm_session';
  const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

  /* ────────────────── Default Groups ────────────────── */
  const DEFAULT_GROUPS = [
    {
      id: 'grp-admin', name: 'Administrator', role: 'admin', color: '#003A5D',
      description: 'Full system access including user management',
      permissions: ['manage_users','manage_rooms','manage_closures','manage_security',
                    'approve_requests','manage_budget','manage_tasks','edit_events',
                    'view_security','view_budget','book_rooms','submit_requests','view_calendar']
    },
    {
      id: 'grp-staff', name: 'Staff', role: 'staff', color: '#0369a1',
      description: 'Staff members with room booking and event management',
      permissions: ['book_rooms','submit_requests','view_security','view_budget',
                    'manage_tasks','edit_events','view_calendar']
    },
    {
      id: 'grp-volunteer', name: 'Volunteer', role: 'staff', color: '#7c3aed',
      description: 'Volunteers with limited access to booking and requests',
      permissions: ['book_rooms','submit_requests','view_calendar']
    },
    {
      id: 'grp-viewer', name: 'Viewer', role: 'viewer', color: '#6b7280',
      description: 'Read-only access to the public calendar',
      permissions: ['view_calendar']
    },
  ];

  /* ────────────────── Default Users ────────────────── */
  const DEFAULT_USERS = [
    {
      id: 'usr-001', name: 'Josh Martinez', email: 'jmartinez@watermark.org',
      username: 'jmartinez', initPassword: 'watermark2026',
      groupIds: ['grp-admin'], active: true, title: 'Worship Director',
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
    {
      id: 'usr-002', name: 'Sarah Kim', email: 'skim@watermark.org',
      username: 'skim', initPassword: 'watermark2026',
      groupIds: ['grp-staff'], active: true, title: 'Events Coordinator',
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
    {
      id: 'usr-003', name: 'Tom Bradford', email: 'tbradford@watermark.org',
      username: 'tbradford', initPassword: 'watermark2026',
      groupIds: ['grp-staff'], active: true, title: 'Finance Director',
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
    {
      id: 'usr-004', name: 'Amanda Chen', email: 'achen@watermark.org',
      username: 'achen', initPassword: 'watermark2026',
      groupIds: ['grp-staff'], active: true, title: "Children's Ministry Director",
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
    {
      id: 'usr-005', name: 'Marcus Williams', email: 'mwilliams@watermark.org',
      username: 'mwilliams', initPassword: 'watermark2026',
      groupIds: ['grp-admin'], active: true, title: 'Executive Pastor',
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
    {
      id: 'usr-006', name: 'Rebecca Torres', email: 'rtorres@watermark.org',
      username: 'rtorres', initPassword: 'watermark2026',
      groupIds: ['grp-staff'], active: true, title: 'Operations Manager',
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
    {
      id: 'usr-007', name: 'Jordan Lee', email: 'jlee@watermark.org',
      username: 'jlee', initPassword: 'watermark2026',
      groupIds: ['grp-volunteer'], active: true, title: 'Volunteer Coordinator',
      createdAt: '2026-01-15T00:00:00', lastLogin: null
    },
    {
      id: 'usr-008', name: 'Demo Viewer', email: 'viewer@watermark.org',
      username: 'viewer', initPassword: 'watermark2026',
      groupIds: ['grp-viewer'], active: true, title: 'Guest',
      createdAt: '2026-01-01T00:00:00', lastLogin: null
    },
  ];

  /* ────────────────── Storage ────────────────── */
  function getUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
    } catch {}
    _initDefaults();
    return DEFAULT_USERS;
  }

  function getGroups() {
    try {
      const raw = localStorage.getItem(GROUPS_KEY);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
    } catch {}
    _initDefaults();
    return DEFAULT_GROUPS;
  }

  function saveUsers(users)   { localStorage.setItem(USERS_KEY,  JSON.stringify(users));  }
  function saveGroups(groups) { localStorage.setItem(GROUPS_KEY, JSON.stringify(groups)); }

  function _initDefaults() {
    if (!localStorage.getItem(USERS_KEY))  localStorage.setItem(USERS_KEY,  JSON.stringify(DEFAULT_USERS));
    if (!localStorage.getItem(GROUPS_KEY)) localStorage.setItem(GROUPS_KEY, JSON.stringify(DEFAULT_GROUPS));
  }

  /* ────────────────── Password Hashing ────────────────── */
  async function hashPassword(password, username) {
    const data = new TextEncoder().encode(`${username}:${password}:wm-salt-2026`);
    const buf  = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /* ────────────────── Session ────────────────── */
  function getSession() {
    try {
      const s = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
      if (!s) return null;
      if (Date.now() > s.expiresAt) { sessionStorage.removeItem(SESSION_KEY); return null; }
      return s;
    } catch { return null; }
  }

  function _createSession(user) {
    const session = {
      userId:    user.id,
      username:  user.username,
      name:      user.name,
      loginAt:   Date.now(),
      expiresAt: Date.now() + SESSION_TTL,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  /* ────────────────── Login / Logout ────────────────── */
  async function login(username, password) {
    _initDefaults();
    const users = getUsers();
    const user  = users.find(u =>
      u.username.toLowerCase() === username.toLowerCase().trim() && u.active !== false
    );
    if (!user) return { ok: false, error: 'Invalid username or password.' };

    let match = false;

    if (user.initPassword) {
      // Plaintext initial password — verify then hash + save
      match = (password === user.initPassword);
      if (match) {
        user.passwordHash = await hashPassword(password, user.username);
        delete user.initPassword;
      }
    } else if (user.passwordHash) {
      const hash = await hashPassword(password, user.username);
      match = (hash === user.passwordHash);
    }

    if (!match) return { ok: false, error: 'Invalid username or password.' };

    user.lastLogin = new Date().toISOString();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) { users[idx] = user; saveUsers(users); }

    const session = _createSession(user);
    applySessionRole(session);
    return { ok: true, session };
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }

  /* ────────────────── Role Integration ────────────────── */
  function getUserRole(userId) {
    const users  = getUsers();
    const groups = getGroups();
    const user   = users.find(u => u.id === userId);
    if (!user) return 'viewer';
    const userGroups = groups.filter(g => (user.groupIds || []).includes(g.id));
    if (userGroups.some(g => g.role === 'admin')) return 'admin';
    if (userGroups.some(g => g.role === 'staff')) return 'staff';
    return 'viewer';
  }

  function applySessionRole(session) {
    if (!session) return;
    const role = getUserRole(session.userId);
    if (window.AppRole) AppRole.setRole(role);
    else localStorage.setItem('wm_role', role);
  }

  /* ────────────────── Auth Guard ────────────────── */
  function requireAuth() {
    const path = window.location.pathname.split('/').pop() || '';
    if (path === 'login.html') return true;
    const session = getSession();
    if (!session) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
      return false;
    }
    applySessionRole(session);
    return true;
  }

  /* ────────────────── Current User Helpers ────────────────── */
  function getCurrentUser() {
    const s = getSession();
    if (!s) return null;
    return getUsers().find(u => u.id === s.userId) || null;
  }

  function getAvatarInitials(user) {
    if (!user) return '?';
    return (user.name || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }

  function getAvatarColor(userId) {
    const role = getUserRole(userId);
    return { admin: '#003A5D', staff: '#0369a1', viewer: '#6b7280' }[role] || '#6b7280';
  }

  function hasPermission(permission) {
    const user   = getCurrentUser();
    const groups = getGroups();
    if (!user) return false;
    return groups
      .filter(g => (user.groupIds || []).includes(g.id))
      .some(g => (g.permissions || []).includes(permission));
  }

  /* Initialize on load */
  _initDefaults();

  return {
    login, logout, requireAuth,
    getSession, getCurrentUser, getAvatarInitials, getAvatarColor,
    getUsers, getGroups, saveUsers, saveGroups,
    getUserRole, hasPermission, applySessionRole, hashPassword,
  };
})();
