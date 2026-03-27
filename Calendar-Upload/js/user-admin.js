/* ════════════════════════════════════════
   USER ADMIN JS
════════════════════════════════════════ */

const PERMISSION_DEFS = [
  { section: 'Calendar',   key: 'view_calendar',    label: 'View Calendar',         desc: 'View all calendar events' },
  { section: 'Calendar',   key: 'edit_events',       label: 'Edit Events',           desc: 'Create and edit calendar events' },
  { section: 'Rooms',      key: 'book_rooms',        label: 'Book Rooms',            desc: 'Make and manage room reservations' },
  { section: 'Rooms',      key: 'manage_rooms',      label: 'Manage Rooms',          desc: 'Add/edit rooms, manage campus closures' },
  { section: 'Security',   key: 'view_security',     label: 'View Security',         desc: 'View the security access schedule' },
  { section: 'Security',   key: 'manage_security',   label: 'Manage Security',       desc: 'Grant and revoke security access' },
  { section: 'Events',     key: 'submit_requests',   label: 'Submit Requests',       desc: 'Submit event requests for approval' },
  { section: 'Events',     key: 'approve_requests',  label: 'Approve Requests',      desc: 'Approve or deny event requests' },
  { section: 'Budget',     key: 'view_budget',       label: 'View Budgets',          desc: 'View budget estimates and actuals' },
  { section: 'Budget',     key: 'manage_budget',     label: 'Manage Budgets',        desc: 'Create and edit budget estimates' },
  { section: 'Admin',      key: 'manage_tasks',      label: 'Manage Tasks',          desc: 'Create, edit, and complete tasks' },
  { section: 'Admin',      key: 'manage_users',      label: 'Manage Users',          desc: 'Access User Admin — add/edit users and groups' },
];

const GROUP_COLORS = ['#003A5D','#0369a1','#7c3aed','#6b7280','#b45309','#16a34a','#9f1239','#0e7490','#1d4ed8','#7e22ce'];
const ALL_BUILDINGS = ['East Tower', 'West Tower', 'Kids Building', 'Town Center'];

let _currentTab     = 'users';
let _userSearch     = '';
let _userFilter     = 'all'; // all | active | inactive
let _editingUserId     = null;
let _editingGroupId    = null;
let _editGroupSelPerms = new Set();
let _editGroupColor    = GROUP_COLORS[0];
let _editGroupRole     = 'staff';
let _editUserGroups    = new Set();
let _editGroupBuildings = new Set(); // empty = all buildings allowed

/* ────────────────── Init ────────────────── */
function init() {
  setTab('users');
}

/* ────────────────── Tabs ────────────────── */
function setTab(tab) {
  _currentTab = tab;
  document.querySelectorAll('.ua-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('ua-add-btn').textContent = tab === 'users' ? '＋ Add User' : '＋ Add Group';
  renderContent();
}

function renderContent() {
  if (_currentTab === 'users') renderUsers();
  else renderGroups();
}

/* ────────────────── Users View ────────────────── */
function renderUsers() {
  const allUsers = Auth.getUsers();
  const groups   = Auth.getGroups();
  const content  = document.getElementById('ua-content');

  const filtered = allUsers.filter(u => {
    if (_userFilter === 'active'   && !u.active)          return false;
    if (_userFilter === 'inactive' && u.active !== false)  return false;
    const q = _userSearch.toLowerCase();
    if (q && !u.name.toLowerCase().includes(q) && !u.username.toLowerCase().includes(q) && !(u.email||'').toLowerCase().includes(q)) return false;
    return true;
  });

  const groupById = Object.fromEntries(groups.map(g => [g.id, g]));

  const fmtLogin = (iso) => {
    if (!iso) return 'Never';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const rows = filtered.map(u => {
    const initials = (u.name || '').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const color    = Auth.getAvatarColor(u.id);
    const chips    = (u.groupIds || []).map(gid => {
      const g = groupById[gid];
      return g ? `<span class="ua-group-chip" style="background:${g.color}">${esc(g.name)}</span>` : '';
    }).join('');
    const statusCls = u.active !== false ? 'active' : 'inactive';
    return `<div class="ua-user-row" onclick="openEditUser('${u.id}')">
      <div class="ua-avatar" style="background:${color}">${esc(initials)}</div>
      <div class="ua-user-info">
        <div class="ua-user-name">${esc(u.name)}</div>
        <div class="ua-user-meta">@${esc(u.username)} · ${esc(u.email || '')}${u.title ? ' · ' + esc(u.title) : ''}</div>
      </div>
      <div class="ua-user-groups">${chips || '<span style="font-size:.7rem;color:var(--sub)">No groups</span>'}</div>
      <div class="ua-user-last-login">Last: ${fmtLogin(u.lastLogin)}</div>
      <div class="ua-status-dot ${statusCls}" title="${statusCls === 'active' ? 'Active' : 'Inactive'}"></div>
      <div class="ua-row-actions" onclick="event.stopPropagation()">
        <button class="ua-row-btn" onclick="openEditUser('${u.id}')">Edit</button>
        <button class="ua-row-btn danger" onclick="toggleUserActive('${u.id}')">${u.active !== false ? 'Deactivate' : 'Activate'}</button>
      </div>
    </div>`;
  }).join('') || `<div class="ua-empty">No users found.</div>`;

  content.innerHTML = `
    <div class="ua-section-hdr">
      <div>
        <span class="ua-section-title">Users</span>
        <span class="ua-section-count" style="margin-left:8px;">${allUsers.length} total · ${allUsers.filter(u=>u.active!==false).length} active</span>
      </div>
    </div>
    <div class="ua-table-wrap">
      <div class="ua-search-bar">
        <input class="ua-search-input" placeholder="Search by name, username, or email…"
          value="${esc(_userSearch)}"
          oninput="_userSearch=this.value; renderUsers()">
        <div class="ua-filter-chips">
          <button class="ua-filter-chip${_userFilter==='all'?' active':''}" onclick="_userFilter='all';renderUsers()">All</button>
          <button class="ua-filter-chip${_userFilter==='active'?' active':''}" onclick="_userFilter='active';renderUsers()">Active</button>
          <button class="ua-filter-chip${_userFilter==='inactive'?' active':''}" onclick="_userFilter='inactive';renderUsers()">Inactive</button>
        </div>
      </div>
      ${rows}
    </div>`;
}

/* ────────────────── Groups View ────────────────── */
function renderGroups() {
  const groups  = Auth.getGroups();
  const users   = Auth.getUsers();
  const content = document.getElementById('ua-content');

  const memberCount = (gid) => users.filter(u => (u.groupIds||[]).includes(gid) && u.active !== false).length;

  const roleBadge = (role) => `<span class="ua-group-role-badge ${role}">${role.charAt(0).toUpperCase()+role.slice(1)}</span>`;

  const cards = groups.map(g => {
    const mc    = memberCount(g.id);
    const perms = (g.permissions || []).map(p => {
      const def = PERMISSION_DEFS.find(d => d.key === p);
      return `<span class="ua-perm-chip">${esc(def ? def.label : p)}</span>`;
    }).join('');
    return `<div class="ua-group-card" style="--group-color:${g.color}" onclick="openEditGroup('${g.id}')">
      <div class="ua-group-hdr">
        <span class="ua-group-name">${esc(g.name)}</span>
        ${roleBadge(g.role || 'viewer')}
      </div>
      <div class="ua-group-desc">${esc(g.description || '')}</div>
      <div class="ua-group-members">${mc} active member${mc !== 1 ? 's' : ''}</div>
      ${g.allowedBuildings && g.allowedBuildings.length
        ? `<div style="font-size:.7rem;color:#b45309;background:#fef3c7;border-radius:5px;padding:3px 8px;margin-bottom:6px;display:inline-block;">🏢 Books in: ${esc(g.allowedBuildings.join(', '))}</div>`
        : `<div style="font-size:.7rem;color:#16a34a;background:#dcfce7;border-radius:5px;padding:3px 8px;margin-bottom:6px;display:inline-block;">🏢 All buildings</div>`}
      <div class="ua-group-perms">${perms}</div>
      <div class="ua-group-card-actions" onclick="event.stopPropagation()">
        <button class="ua-btn sec" style="font-size:.7rem;padding:5px 12px;" onclick="openEditGroup('${g.id}')">Edit</button>
        ${g.id.startsWith('grp-') && ['grp-admin','grp-staff','grp-volunteer','grp-viewer'].includes(g.id)
          ? '<span style="font-size:.68rem;color:var(--sub);line-height:2;">Default group</span>'
          : `<button class="ua-btn sec" style="font-size:.7rem;padding:5px 12px;color:var(--red);" onclick="deleteGroup('${g.id}')">Delete</button>`}
      </div>
    </div>`;
  }).join('');

  content.innerHTML = `
    <div class="ua-section-hdr">
      <div>
        <span class="ua-section-title">Groups</span>
        <span class="ua-section-count" style="margin-left:8px;">${groups.length} groups</span>
      </div>
    </div>
    <div class="ua-groups-grid">${cards}</div>`;
}

/* ────────────────── Add / Edit User Modal ────────────────── */
function openAddUser() {
  _editingUserId = null;
  _editUserGroups = new Set();
  renderUserModal(null);
  document.getElementById('ua-modal').classList.remove('hidden');
}

function openEditUser(id) {
  _editingUserId = id;
  const user = Auth.getUsers().find(u => u.id === id);
  _editUserGroups = new Set(user ? (user.groupIds || []) : []);
  renderUserModal(user);
  document.getElementById('ua-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('ua-modal').classList.add('hidden');
  document.getElementById('ua-modal-body').innerHTML = '';
}

function renderUserModal(user) {
  const groups  = Auth.getGroups();
  const isEdit  = !!user;
  document.getElementById('ua-modal-title').textContent = isEdit ? `Edit User: ${user.name}` : 'Add New User';

  const groupOpts = groups.map(g => {
    const sel = _editUserGroups.has(g.id);
    return `<div class="ua-group-assign-opt${sel?' selected':''}" onclick="toggleUserGroupSel('${g.id}',this)" data-gid="${g.id}">
      <div class="ua-group-assign-dot" style="background:${g.color}"></div>
      <span>${esc(g.name)}</span>
    </div>`;
  }).join('');

  document.getElementById('ua-modal-body').innerHTML = `
    <div class="ua-row">
      <div class="ua-field">
        <label class="ua-label">Full Name</label>
        <input class="ua-input" id="uf-name" value="${esc(user?.name||'')}" placeholder="e.g. John Smith">
      </div>
      <div class="ua-field">
        <label class="ua-label">Title / Role</label>
        <input class="ua-input" id="uf-title" value="${esc(user?.title||'')}" placeholder="e.g. Worship Director">
      </div>
    </div>
    <div class="ua-row">
      <div class="ua-field">
        <label class="ua-label">Username</label>
        <input class="ua-input" id="uf-username" value="${esc(user?.username||'')}" placeholder="e.g. jsmith"${isEdit?' readonly style="opacity:.6"':''}>
      </div>
      <div class="ua-field">
        <label class="ua-label">Email</label>
        <input class="ua-input" id="uf-email" type="email" value="${esc(user?.email||'')}" placeholder="jsmith@watermark.org">
      </div>
    </div>
    <div class="ua-field">
      <label class="ua-label">${isEdit ? 'New Password' : 'Password'} <span class="ua-pw-note">${isEdit ? '(leave blank to keep current)' : ''}</span></label>
      <input class="ua-input" id="uf-password" type="password" placeholder="••••••••">
    </div>
    <div class="ua-field">
      <label class="ua-label">Groups</label>
      <div class="ua-group-assign-grid">${groupOpts}</div>
    </div>
    <div class="ua-field">
      <label class="ua-label">Status</label>
      <div class="ua-toggle-wrap">
        <label class="ua-toggle">
          <input type="checkbox" id="uf-active"${(!isEdit || user.active !== false) ? ' checked' : ''}>
          <span class="ua-toggle-slider"></span>
        </label>
        <span class="ua-toggle-label">Active</span>
      </div>
    </div>`;

  document.getElementById('ua-modal-foot').innerHTML = `
    <button class="ua-btn sec" onclick="closeModal()">Cancel</button>
    <button class="ua-btn pri" onclick="saveUser()">Save User</button>`;
}

function toggleUserGroupSel(gid, el) {
  if (_editUserGroups.has(gid)) { _editUserGroups.delete(gid); el.classList.remove('selected'); }
  else { _editUserGroups.add(gid); el.classList.add('selected'); }
}

async function saveUser() {
  const name     = document.getElementById('uf-name').value.trim();
  const username = document.getElementById('uf-username').value.trim();
  const email    = document.getElementById('uf-email').value.trim();
  const title    = document.getElementById('uf-title').value.trim();
  const password = document.getElementById('uf-password').value;
  const active   = document.getElementById('uf-active').checked;

  if (!name)     { alert('Please enter a full name.'); return; }
  if (!username) { alert('Please enter a username.'); return; }

  const users = Auth.getUsers();

  if (_editingUserId) {
    // Edit
    const idx = users.findIndex(u => u.id === _editingUserId);
    if (idx < 0) return;
    users[idx].name     = name;
    users[idx].email    = email;
    users[idx].title    = title;
    users[idx].groupIds = [..._editUserGroups];
    users[idx].active   = active;
    if (password) {
      users[idx].passwordHash = await Auth.hashPassword(password, users[idx].username);
      delete users[idx].initPassword;
    }
  } else {
    // New user
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      alert('That username is already taken.'); return;
    }
    const newUser = {
      id: 'usr-' + Date.now(),
      name, username, email, title,
      groupIds: [..._editUserGroups],
      active,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };
    if (password) {
      newUser.passwordHash = await Auth.hashPassword(password, username);
    } else {
      newUser.initPassword = 'watermark2026'; // default
    }
    users.push(newUser);
  }

  Auth.saveUsers(users);
  closeModal();
  renderUsers();
}

function toggleUserActive(id) {
  const users = Auth.getUsers();
  const idx   = users.findIndex(u => u.id === id);
  if (idx < 0) return;
  users[idx].active = users[idx].active === false ? true : false;
  Auth.saveUsers(users);
  renderUsers();
}

/* ────────────────── Add / Edit Group Modal ────────────────── */
function openAddGroup() {
  _editingGroupId    = null;
  _editGroupSelPerms = new Set();
  _editGroupColor    = GROUP_COLORS[0];
  _editGroupRole     = 'staff';
  _editGroupBuildings = new Set();
  renderGroupModal(null);
  document.getElementById('ua-modal').classList.remove('hidden');
}

function openEditGroup(id) {
  _editingGroupId = id;
  const g = Auth.getGroups().find(gr => gr.id === id);
  _editGroupSelPerms  = new Set(g ? (g.permissions || []) : []);
  _editGroupColor     = g?.color || GROUP_COLORS[0];
  _editGroupRole      = g?.role  || 'staff';
  _editGroupBuildings = new Set(g?.allowedBuildings || []);
  renderGroupModal(g);
  document.getElementById('ua-modal').classList.remove('hidden');
}

function renderGroupModal(group) {
  const isEdit = !!group;
  document.getElementById('ua-modal-title').textContent = isEdit ? `Edit Group: ${group.name}` : 'Add New Group';

  // Color picker
  const colorPicker = GROUP_COLORS.map(c =>
    `<div class="ua-color-opt${c===_editGroupColor?' selected':''}"
      style="background:${c}" title="${c}"
      onclick="selectGroupColor('${c}')"></div>`
  ).join('');

  // Permissions by section
  const sections = [...new Set(PERMISSION_DEFS.map(d => d.section))];
  const permSections = sections.map(sec => {
    const defs = PERMISSION_DEFS.filter(d => d.section === sec);
    const opts = defs.map(d =>
      `<label class="ua-perm-opt">
        <input type="checkbox" value="${d.key}" ${_editGroupSelPerms.has(d.key)?'checked':''}
          onchange="toggleGroupPerm('${d.key}',this.checked)">
        <div>
          <div>${esc(d.label)}</div>
          <div class="ua-perm-opt-desc">${esc(d.desc)}</div>
        </div>
      </label>`
    ).join('');
    return `<div class="ua-perms-section">
      <div class="ua-perms-section-title">${esc(sec)}</div>
      <div class="ua-perms-grid">${opts}</div>
    </div>`;
  }).join('');

  document.getElementById('ua-modal-body').innerHTML = `
    <div class="ua-row">
      <div class="ua-field">
        <label class="ua-label">Group Name</label>
        <input class="ua-input" id="gf-name" value="${esc(group?.name||'')}" placeholder="e.g. Event Coordinators">
      </div>
      <div class="ua-field">
        <label class="ua-label">Base Role</label>
        <select class="ua-select" id="gf-role" onchange="_editGroupRole=this.value">
          <option value="admin"${_editGroupRole==='admin'?' selected':''}>Admin</option>
          <option value="staff"${_editGroupRole==='staff'?' selected':''}>Staff</option>
          <option value="viewer"${_editGroupRole==='viewer'?' selected':''}>Viewer</option>
        </select>
      </div>
    </div>
    <div class="ua-field">
      <label class="ua-label">Description</label>
      <input class="ua-input" id="gf-desc" value="${esc(group?.description||'')}" placeholder="Brief description of this group's purpose">
    </div>
    <div class="ua-field">
      <label class="ua-label">Color</label>
      <div class="ua-color-opts" id="gf-color-opts">${colorPicker}</div>
    </div>
    <div class="ua-field">
      <label class="ua-label">Building Access <span style="font-size:.65rem;color:var(--sub);text-transform:none;letter-spacing:0;font-weight:400;">(leave all unchecked = access to all buildings)</span></label>
      <div class="ua-group-assign-grid" style="grid-template-columns:1fr 1fr;">
        ${ALL_BUILDINGS.map(b => {
          const sel = _editGroupBuildings.has(b);
          const icon = b === 'Kids Building' ? '🧒' : b === 'East Tower' ? '🏢' : b === 'West Tower' ? '🏢' : '🏛';
          return `<div class="ua-group-assign-opt${sel?' selected':''}" onclick="toggleGroupBuilding('${b}',this)" data-bldg="${b}">
            <span style="font-size:.8rem;">${icon}</span>
            <span>${b}</span>
          </div>`;
        }).join('')}
      </div>
      <p style="font-size:.68rem;color:var(--sub);margin-top:4px;">If buildings are selected, members of this group can <strong>only</strong> book rooms in those buildings.</p>
    </div>
    <div class="ua-field">
      <label class="ua-label">Permissions</label>
      ${permSections}
    </div>`;

  document.getElementById('ua-modal-foot').innerHTML = `
    <button class="ua-btn sec" onclick="closeModal()">Cancel</button>
    <button class="ua-btn pri" onclick="saveGroup()">Save Group</button>`;
}

function selectGroupColor(color) {
  _editGroupColor = color;
  document.querySelectorAll('.ua-color-opt').forEach(el => {
    el.classList.toggle('selected', el.title === color);
  });
}

function toggleGroupPerm(key, checked) {
  if (checked) _editGroupSelPerms.add(key);
  else _editGroupSelPerms.delete(key);
}

function toggleGroupBuilding(bldg, el) {
  if (_editGroupBuildings.has(bldg)) { _editGroupBuildings.delete(bldg); el.classList.remove('selected'); }
  else { _editGroupBuildings.add(bldg); el.classList.add('selected'); }
}

function saveGroup() {
  const name = document.getElementById('gf-name').value.trim();
  const desc = document.getElementById('gf-desc').value.trim();
  const role = document.getElementById('gf-role').value;

  if (!name) { alert('Please enter a group name.'); return; }

  const groups = Auth.getGroups();

  if (_editingGroupId) {
    const idx = groups.findIndex(g => g.id === _editingGroupId);
    if (idx < 0) return;
    groups[idx].name            = name;
    groups[idx].description     = desc;
    groups[idx].role            = role;
    groups[idx].color           = _editGroupColor;
    groups[idx].permissions     = [..._editGroupSelPerms];
    groups[idx].allowedBuildings = [..._editGroupBuildings];
  } else {
    groups.push({
      id: 'grp-' + Date.now(),
      name, description: desc, role,
      color: _editGroupColor,
      permissions: [..._editGroupSelPerms],
      allowedBuildings: [..._editGroupBuildings],
    });
  }

  Auth.saveGroups(groups);
  closeModal();
  renderGroups();
}

function deleteGroup(id) {
  if (!confirm('Delete this group? Users in this group will lose these permissions.')) return;
  Auth.saveGroups(Auth.getGroups().filter(g => g.id !== id));
  renderGroups();
}

/* ── Utility ── */
function esc(s) {
  if (typeof window.escHtml === 'function') return escHtml(s || '');
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Boot ── */
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
