/* DAYSTAR UNITED FC MANAGEMENT SYSTEM
 * Client-Side Application with Strict Role Isolation & Audit Logging
 */
'use strict';

const API_BASE = 'http://localhost:8000/api';
const LOCAL_DB_KEY = 'daystar_fc_db_v2';
const AUTH_KEY = 'daystar_user_session';
const AUDIT_KEY = 'daystar_audit_log';

const DEFAULT_PROFILE = {
  clubName: 'DAYSTAR UNITED FC',
  founded: '2015',
  location: 'Oluko Subcounty, Ayivu East Constituency, Arua / Ayivu / Oluko',
  homeGround: 'Alua Primary School Playground',
  poBox: '309 Arua City',
  email: 'daystarfc.champs@gmail.com',
  phone: '+256 700 000 000',
  motto: 'NEVER GIVE UP',
  colors: 'Red, Navy Blue, Black',
  vision: 'To be a leading community football club nurturing talent and creating opportunities.',
  mission: 'To develop talented players, empower the community and achieve excellence on and off the pitch.'
};

const SCHEMAS = {
  members: {
    label: 'Members & Supporters', singular: 'Member / supporter', icon: '♙',
    fields: [
      ['fullName', 'Full name', 'text', 1],
      ['memberNo', 'Member ID', 'text'],
      ['category', 'Category', 'select', ['Community Member', 'Supporter', 'Volunteer', 'Parent / Guardian', 'Donor', 'Alumni', 'Other']],
      ['phone', 'Phone number', 'tel'],
      ['email', 'Email', 'email'],
      ['area', 'Village / Area', 'text'],
      ['joined', 'Date joined', 'date'],
      ['status', 'Status', 'select', ['Active', 'Inactive', 'Pending']],
      ['notes', 'Notes', 'textarea']
    ]
  },
  players: {
    label: 'Players Management', singular: 'Player', icon: '♟',
    fields: [
      ['fullName', 'Player full name', 'text', 1],
      ['playerId', 'Player ID / Registration No.', 'text'],
      ['jersey', 'Jersey number', 'number'],
      ['position', 'Playing position', 'select', ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Utility']],
      ['team', 'Team / Category', 'select', ['Senior', 'Youth', 'Academy']],
      ['dob', 'Date of birth', 'date'],
      ['phone', 'Phone / Guardian contact', 'tel'],
      ['joined', 'Date joined', 'date'],
      ['status', 'Status', 'select', ['Active', 'Injured', 'Suspended', 'Trial', 'Released']],
      ['notes', 'Medical / contract notes', 'textarea']
    ]
  },
  academy: {
    label: 'Youth Academy', singular: 'Academy Scholar', icon: '🌱',
    fields: [
      ['fullName', 'Player Full Name', 'text', 1],
      ['academyId', 'Registration ID', 'text'],
      ['ageCategory', 'Age Category', 'select', ['U-12 Cubs (Ages 8-12)', 'U-15 Juniors (Ages 13-15)', 'U-17 Youth (Ages 16-17)', 'U-20 Development (Ages 18-20)']],
      ['dob', 'Date of Birth', 'date', 1],
      ['position', 'Position', 'select', ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Winger', 'Utility']],
      ['jersey', 'Training Jersey #', 'number'],
      ['school', 'School Attended', 'text', 1],
      ['guardianName', 'Parent / Guardian Name', 'text', 1],
      ['guardianPhone', 'Parent / Guardian Phone', 'tel', 1],
      ['village', 'Village / Area', 'text'],
      ['academicGrade', 'Academic Conduct', 'select', ['Excellent (Top 10%)', 'Very Good', 'Satisfactory', 'Needs Tutoring']],
      ['joined', 'Enrollment Date', 'date'],
      ['status', 'Status', 'select', ['Active Scholar', 'Graduated to Senior', 'On Trial', 'Inactive']],
      ['notes', 'Development & Coach Notes', 'textarea']
    ]
  },
  staff: {
    label: 'Team Management', singular: 'Staff member', icon: '♧',
    fields: [
      ['fullName', 'Full name', 'text', 1],
      ['role', 'Role / Position', 'text', 1],
      ['department', 'Department', 'select', ['Management', 'Technical', 'Medical', 'Administration', 'Transport', 'Media / Design', 'Other']],
      ['phone', 'Phone number', 'tel'],
      ['email', 'Email', 'email'],
      ['startDate', 'Start date', 'date'],
      ['status', 'Status', 'select', ['Active', 'On leave', 'Inactive']],
      ['notes', 'Notes', 'textarea']
    ]
  },
  matches: {
    label: 'Matches & Competitions', singular: 'Match / fixture', icon: '⚽',
    fields: [
      ['date', 'Match date', 'date', 1],
      ['opponent', 'Opponent', 'text', 1],
      ['competition', 'Competition', 'text'],
      ['venue', 'Venue', 'text'],
      ['type', 'Fixture type', 'select', ['Friendly', 'League', 'Cup', 'Zonal', 'Tournament', 'Other']],
      ['homeAway', 'Home / Away', 'select', ['Home', 'Away', 'Neutral']],
      ['daystarGoals', 'Daystar goals', 'number'],
      ['opponentGoals', 'Opponent goals', 'number'],
      ['status', 'Status', 'select', ['Scheduled', 'Played', 'Postponed', 'Cancelled']],
      ['notes', 'Match report / notes', 'textarea']
    ]
  },
  activities: {
    label: 'Activities & Events', singular: 'Activity / event', icon: '▤',
    fields: [
      ['title', 'Activity / event title', 'text', 1],
      ['date', 'Date', 'date', 1],
      ['category', 'Activity type', 'select', ['Community outreach', 'Fundraising', 'Meeting', 'Tournament', 'Training', 'Youth development', 'Club event', 'Other']],
      ['venue', 'Venue', 'text'],
      ['lead', 'Responsible person', 'text'],
      ['budget', 'Planned budget (UGX)', 'number'],
      ['attendance', 'Attendance', 'number'],
      ['status', 'Status', 'select', ['Planned', 'In progress', 'Completed', 'Cancelled']],
      ['details', 'Description / outcomes', 'textarea']
    ]
  },
  contributions: {
    label: 'Contributions & Support', singular: 'Contribution / support record', icon: '♡',
    fields: [
      ['date', 'Date received / pledged', 'date', 1],
      ['supporter', 'Supporter / contributor name', 'text', 1],
      ['phone', 'Phone number', 'tel'],
      ['category', 'Support category', 'select', ['Membership dues', 'Community contribution', 'Donation', 'Fundraising', 'Player support', 'Transport support', 'Boots / Equipment', 'Medical support', 'Pledge', 'Other']],
      ['purpose', 'Purpose / campaign', 'text', 1],
      ['amount', 'Amount pledged (UGX)', 'number', 1],
      ['paid', 'Amount received (UGX)', 'number', 1],
      ['method', 'Payment method', 'select', ['Cash', 'Bank transfer', 'Mobile Money', 'In-kind', 'Other']],
      ['reference', 'Receipt / transaction reference', 'text'],
      ['receivedBy', 'Received by', 'text'],
      ['status', 'Status', 'select', ['Pledged', 'Partially paid', 'Paid', 'Cancelled']],
      ['notes', 'Notes', 'textarea']
    ]
  },
  expenses: {
    label: 'Expenses & Budget', singular: 'Expense / budget record', icon: '▣',
    fields: [
      ['date', 'Date', 'date', 1],
      ['category', 'Expense category', 'select', ['Transport', 'Feeding', 'Registration / Affiliation', 'Equipment', 'Medical', 'Staff / Allowance', 'Training', 'Venue', 'Administration', 'Community activity', 'Other']],
      ['description', 'Description', 'text', 1],
      ['amount', 'Amount (UGX)', 'number', 1],
      ['paidTo', 'Paid to', 'text'],
      ['method', 'Payment method', 'select', ['Cash', 'Bank transfer', 'Mobile Money', 'Other']],
      ['reference', 'Receipt / voucher number', 'text'],
      ['approvedBy', 'Approved by', 'text'],
      ['activity', 'Related activity / match', 'text'],
      ['notes', 'Notes', 'textarea']
    ]
  },
  sponsors: {
    label: 'Sponsors & Partners', singular: 'Sponsor / partner', icon: '🤝',
    fields: [
      ['name', 'Organisation / sponsor name', 'text', 1],
      ['contact', 'Contact person', 'text'],
      ['phone', 'Phone number', 'tel'],
      ['email', 'Email', 'email'],
      ['supportType', 'Support type', 'text'],
      ['pledged', 'Pledged value (UGX)', 'number'],
      ['received', 'Received value (UGX)', 'number'],
      ['startDate', 'Start date', 'date'],
      ['endDate', 'End date', 'date'],
      ['status', 'Status', 'select', ['Prospective', 'Active', 'Completed', 'Inactive']],
      ['notes', 'Notes', 'textarea']
    ]
  },
  users: {
    label: 'Management & Users', singular: 'Management user', icon: '♜',
    fields: [
      ['fullName', 'Full name', 'text', 1],
      ['username', 'Username / Login ID', 'text', 1],
      ['role', 'Management role', 'select', ['Admin', 'Secretary', 'Treasurer', 'Team Manager', 'Viewer'], 1],
      ['department', 'Department', 'text'],
      ['email', 'Email address', 'email'],
      ['phone', 'Phone number', 'tel'],
      ['status', 'Account status', 'select', ['Active', 'Pending', 'Suspended'], 1],
      ['joined', 'Appointment / start date', 'date'],
      ['notes', 'Responsibilities / notes', 'textarea']
    ]
  }
};

/* Authorized Users and Roles */
const ACCOUNTS_STORAGE_KEY = 'daystar_user_accounts';
const CMS_DELEGATION_KEY = 'daystar_cms_delegation';

function loadCmsDelegation() {
  try {
    const raw = localStorage.getItem(CMS_DELEGATION_KEY);
    return raw ? JSON.parse(raw) : { allowSecretary: true, allowManager: false, allowTreasurer: false };
  } catch(e) {
    return { allowSecretary: true, allowManager: false, allowTreasurer: false };
  }
}

function saveCmsDelegation(d) {
  try {
    localStorage.setItem(CMS_DELEGATION_KEY, JSON.stringify(d));
    AUTHORIZED_ACCOUNTS = loadAccounts();
    saveAccounts();
  } catch(e) {}
}

const DEFAULT_AUTHORIZED_ACCOUNTS = {
  admin: {
    password: 'password',
    fullName: 'Otuti Ronald',
    role: 'Admin',
    title: 'Club CEO / Administrator',
    badgeClass: 'admin',
    allowedPages: ['dashboard', 'profile', 'members', 'players', 'academy', 'staff', 'matches', 'activities', 'contributions', 'expenses', 'sponsors', 'reports', 'cms', 'audit', 'users', 'settings'],
    canEdit: ['profile', 'members', 'players', 'academy', 'staff', 'matches', 'activities', 'contributions', 'expenses', 'sponsors', 'cms', 'users', 'settings']
  },
  treasurer: {
    password: 'DemoTreasurer!2026#',
    fullName: 'Demo Treasurer',
    role: 'Treasurer',
    title: 'Club Treasurer / Finance Officer',
    badgeClass: 'treasurer',
    allowedPages: ['dashboard', 'contributions', 'expenses', 'sponsors', 'reports'],
    canEdit: ['contributions', 'expenses', 'sponsors']
  },
  manager: {
    password: 'DemoManager!2026#',
    fullName: 'Demo Team Manager',
    role: 'Team Manager',
    title: 'Head Coach / Team Manager',
    badgeClass: 'manager',
    allowedPages: ['dashboard', 'players', 'academy', 'staff', 'matches', 'activities'],
    canEdit: ['players', 'academy', 'staff', 'matches', 'activities']
  },
  secretary: {
    password: 'DemoSecretary!2026#',
    fullName: 'Demo Secretary',
    role: 'Secretary',
    title: 'Secretary General',
    badgeClass: 'secretary',
    allowedPages: ['dashboard', 'profile', 'members', 'academy', 'activities'],
    canEdit: ['profile', 'members', 'academy', 'activities']
  },
  viewer: {
    password: 'DemoViewer!2026#',
    fullName: 'Demo Viewer',
    role: 'Viewer',
    title: 'Read-only Viewer',
    badgeClass: 'viewer',
    allowedPages: ['dashboard', 'profile', 'members', 'players', 'academy', 'matches', 'activities'],
    canEdit: []
  }
};

let AUTHORIZED_ACCOUNTS = loadAccounts();

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const merged = { ...DEFAULT_AUTHORIZED_ACCOUNTS, ...parsed };

    if (merged.admin && (merged.admin.password === 'DemoAdmin!2026#' || !merged.admin.password)) {
      merged.admin.password = 'password';
    }

    // Ensure Admin & Technical staff have Academy authority
    if (!merged.admin.allowedPages.includes('academy')) merged.admin.allowedPages.push('academy');
    if (!merged.admin.canEdit.includes('academy')) merged.admin.canEdit.push('academy');
    if (!merged.manager.allowedPages.includes('academy')) merged.manager.allowedPages.push('academy');
    if (!merged.manager.canEdit.includes('academy')) merged.manager.canEdit.push('academy');
    if (!merged.secretary.allowedPages.includes('academy')) merged.secretary.allowedPages.push('academy');
    if (!merged.secretary.canEdit.includes('academy')) merged.secretary.canEdit.push('academy');
    if (!merged.viewer.allowedPages.includes('academy')) merged.viewer.allowedPages.push('academy');

    // Ensure Admin always has CMS authority
    if (!merged.admin.allowedPages.includes('cms')) merged.admin.allowedPages.push('cms');
    if (!merged.admin.canEdit.includes('cms')) merged.admin.canEdit.push('cms');

    // Apply Admin's CMS Delegation Settings
    const delegation = loadCmsDelegation();
    if (delegation.allowSecretary) {
      if (!merged.secretary.allowedPages.includes('cms')) merged.secretary.allowedPages.push('cms');
      if (!merged.secretary.canEdit.includes('cms')) merged.secretary.canEdit.push('cms');
    } else {
      merged.secretary.allowedPages = merged.secretary.allowedPages.filter(p => p !== 'cms');
      merged.secretary.canEdit = merged.secretary.canEdit.filter(p => p !== 'cms');
    }

    if (delegation.allowManager) {
      if (!merged.manager.allowedPages.includes('cms')) merged.manager.allowedPages.push('cms');
      if (!merged.manager.canEdit.includes('cms')) merged.manager.canEdit.push('cms');
    } else {
      merged.manager.allowedPages = merged.manager.allowedPages.filter(p => p !== 'cms');
      merged.manager.canEdit = merged.manager.canEdit.filter(p => p !== 'cms');
    }

    if (delegation.allowTreasurer) {
      if (!merged.treasurer.allowedPages.includes('cms')) merged.treasurer.allowedPages.push('cms');
      if (!merged.treasurer.canEdit.includes('cms')) merged.treasurer.canEdit.push('cms');
    } else {
      merged.treasurer.allowedPages = merged.treasurer.allowedPages.filter(p => p !== 'cms');
      merged.treasurer.canEdit = merged.treasurer.canEdit.filter(p => p !== 'cms');
    }

    return merged;
  } catch (e) {
    return { ...DEFAULT_AUTHORIZED_ACCOUNTS };
  }
}

function saveAccounts() {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(AUTHORIZED_ACCOUNTS));
  } catch (e) {}
}

const INITIAL_AUDIT_LOGS = [
  { id: 'a1', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), user: 'admin', fullName: 'Otuti Ronald', role: 'Admin', type: 'create', action: 'Approved budget for Regional Zonal Tournament' },
  { id: 'a2', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), user: 'treasurer', fullName: 'Demo Treasurer', role: 'Treasurer', type: 'create', action: 'Recorded contribution of UGX 500,000 (Arua Business Forum)' },
  { id: 'a3', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), user: 'manager', fullName: 'Demo Team Manager', role: 'Team Manager', type: 'create', action: 'Scheduled friendly fixture: Daystar United FC vs Nebbi Central' },
  { id: 'a4', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), user: 'secretary', fullName: 'Demo Secretary', role: 'Secretary', type: 'create', action: 'Registered 3 new community supporters from Ayivu East' },
  { id: 'a5', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), user: 'treasurer', fullName: 'Demo Treasurer', role: 'Treasurer', type: 'create', action: 'Logged transport expense UGX 180,000 for training session' }
];

const DEFAULT_ACADEMY_SEED = () => [
  {
    id: 'acad_1',
    fullName: 'Brian Anguyo',
    academyId: 'DFA-U12-001',
    ageCategory: 'U-12 Cubs (Ages 8-12)',
    dob: '2014-04-12',
    position: 'Forward',
    jersey: 9,
    school: 'Alua Primary School',
    guardianName: 'Charles Anguyo',
    guardianPhone: '+256 772 123 456',
    village: 'Alua Village, Oluko',
    academicGrade: 'Excellent (Top 10%)',
    joined: '2024-02-10',
    status: 'Active Scholar',
    notes: 'Gifted dribbler with natural acceleration; captain of U-12 Cubs team.'
  },
  {
    id: 'acad_2',
    fullName: 'Joel Candia',
    academyId: 'DFA-U15-014',
    ageCategory: 'U-15 Juniors (Ages 13-15)',
    dob: '2011-08-19',
    position: 'Midfielder',
    jersey: 8,
    school: 'Oluko Secondary School',
    guardianName: 'Grace Candia',
    guardianPhone: '+256 701 987 654',
    village: 'Bunyu, Ayivu East',
    academicGrade: 'Very Good',
    joined: '2023-05-15',
    status: 'Active Scholar',
    notes: 'Excellent pitch vision and passing accuracy; designated set-piece specialist.'
  },
  {
    id: 'acad_3',
    fullName: 'Kennedy Onzima',
    academyId: 'DFA-U17-007',
    ageCategory: 'U-17 Youth (Ages 16-17)',
    dob: '2009-02-28',
    position: 'Winger',
    jersey: 11,
    school: 'Mvara Secondary School',
    guardianName: 'Moses Onzima',
    guardianPhone: '+256 752 443 322',
    village: 'Yivu, Oluko',
    academicGrade: 'Satisfactory',
    joined: '2022-09-01',
    status: 'Active Scholar',
    notes: 'Outstanding sprint speed; prime candidate for senior first team promotion.'
  },
  {
    id: 'acad_4',
    fullName: 'Francis Alionzi',
    academyId: 'DFA-U17-003',
    ageCategory: 'U-17 Youth (Ages 16-17)',
    dob: '2009-11-14',
    position: 'Goalkeeper',
    jersey: 1,
    school: 'Alua Seed Secondary',
    guardianName: 'David Alionzi',
    guardianPhone: '+256 788 556 778',
    village: 'Alua, Oluko',
    academicGrade: 'Very Good',
    joined: '2023-01-20',
    status: 'Active Scholar',
    notes: 'Brave shot stopper with confident command of his penalty area.'
  },
  {
    id: 'acad_5',
    fullName: 'Ronald Otuti Junior',
    academyId: 'DFA-U20-002',
    ageCategory: 'U-20 Development (Ages 18-20)',
    dob: '2007-06-10',
    position: 'Forward',
    jersey: 10,
    school: 'Arua Comprehensive School',
    guardianName: 'Otuti Ronald',
    guardianPhone: '+256 700 000 000',
    village: 'Oluko Subcounty',
    academicGrade: 'Excellent (Top 10%)',
    joined: '2021-03-12',
    status: 'Active Scholar',
    notes: 'Clinical finisher; regular attendee at senior team first XI training sessions.'
  },
  {
    id: 'acad_6',
    fullName: 'Derrick Draniku',
    academyId: 'DFA-U20-005',
    ageCategory: 'U-20 Development (Ages 18-20)',
    dob: '2007-01-05',
    position: 'Defender',
    jersey: 4,
    school: 'St. Joseph College Ombaci',
    guardianName: 'Beatrice Draniku',
    guardianPhone: '+256 774 332 211',
    village: 'Ayivu East',
    academicGrade: 'Excellent (Top 10%)',
    joined: '2021-07-18',
    status: 'Graduated to Senior',
    notes: 'Promoted to Daystar United FC senior squad backline this season.'
  }
];

const EMPTY_DB = () => ({
  profile: { ...DEFAULT_PROFILE },
  members: [],
  players: [],
  academy: DEFAULT_ACADEMY_SEED(),
  staff: [],
  matches: [],
  activities: [],
  contributions: [],
  expenses: [],
  sponsors: [],
  users: [
    { id: 'u1', fullName: 'Otuti Ronald', username: 'admin', role: 'Admin', department: 'Executive Management', email: 'daystarfc.champs@gmail.com', status: 'Active' },
    { id: 'u2', fullName: 'Demo Treasurer', username: 'treasurer', role: 'Treasurer', department: 'Finance & Accounts', email: 'treasurer@daystar.test', status: 'Active' },
    { id: 'u3', fullName: 'Demo Team Manager', username: 'manager', role: 'Team Manager', department: 'Technical & Coaching', email: 'coach@daystar.test', status: 'Active' },
    { id: 'u4', fullName: 'Demo Secretary', username: 'secretary', role: 'Secretary', department: 'Secretariat & Administration', email: 'secretary@daystar.test', status: 'Active' },
    { id: 'u5', fullName: 'Demo Viewer', username: 'viewer', role: 'Viewer', department: 'Community Stakeholder', email: 'viewer@daystar.test', status: 'Active' }
  ]
});

let db = loadDB();
let auditLogs = loadAuditLogs();
let page = 'dashboard';
let editing = null;
let currentUser = null;
let isConnectedToBackend = false;

// Helpers
function esc(v) { return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function num(v) { return Number(v) || 0; }
function fmtMoney(v) { return 'UGX ' + num(v).toLocaleString('en-UG', { maximumFractionDigits: 0 }); }
function fmtDate(v) { if (!v) return '—'; const d = new Date(v + 'T00:00:00'); return isNaN(d) ? esc(v) : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); }
function fmtTime(v) { if (!v) return '—'; const d = new Date(v); return isNaN(d) ? esc(v) : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function id() { return (crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2); }

function toast(msg, type = '') {
  const root = document.getElementById('toastRoot');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// Storage
function loadDB() {
  try {
    const raw = localStorage.getItem(LOCAL_DB_KEY);
    if (!raw) return EMPTY_DB();
    const saved = JSON.parse(raw);
    const base = EMPTY_DB();
    const res = { ...base, ...saved, profile: { ...DEFAULT_PROFILE, ...saved.profile } };
    if (!res.academy || !res.academy.length) {
      res.academy = DEFAULT_ACADEMY_SEED();
    }
    return res;
  } catch (e) {
    return EMPTY_DB();
  }
}

function saveDB() {
  try {
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(db));
    return true;
  } catch (e) {
    toast('Could not save to browser storage.', 'error');
    return false;
  }
}

function loadAuditLogs() {
  try {
    const raw = localStorage.getItem(AUDIT_KEY);
    return raw ? JSON.parse(raw) : INITIAL_AUDIT_LOGS;
  } catch (e) {
    return INITIAL_AUDIT_LOGS;
  }
}

function logActivity(type, action) {
  if (!currentUser) return;
  const entry = {
    id: id(),
    timestamp: new Date().toISOString(),
    user: currentUser.username,
    fullName: currentUser.fullName,
    role: currentUser.role,
    type: type,
    action: action
  };
  auditLogs.unshift(entry);
  if (auditLogs.length > 200) auditLogs = auditLogs.slice(0, 200);
  try {
    localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLogs));
  } catch (e) {}
}

// Session
function getSession() {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function setSession(user) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  currentUser = user;
}

function clearSession() {
  sessionStorage.removeItem(AUTH_KEY);
  currentUser = null;
}

// Strict Role Checks
function canAccessPage(p) {
  if (!currentUser) return false;
  const conf = AUTHORIZED_ACCOUNTS[currentUser.username];
  if (!conf) return false;
  return conf.allowedPages.includes(p);
}

function canEdit(module) {
  if (!currentUser) return false;
  const conf = AUTHORIZED_ACCOUNTS[currentUser.username];
  if (!conf) return false;
  return conf.canEdit.includes(module);
}

// Initialize Application
async function initApp() {
  // Check backend health
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1000) });
    if (res.ok) {
      isConnectedToBackend = true;
      updateStatusBadge(true);
    } else {
      updateStatusBadge(false);
    }
  } catch (e) {
    isConnectedToBackend = false;
    updateStatusBadge(false);
  }

  // Check existing session
  const session = getSession();
  if (session && session.username && AUTHORIZED_ACCOUNTS[session.username]) {
    currentUser = session;
    showApp();
  } else {
    showLogin();
  }

  setupEventListeners();
}

function updateStatusBadge(isOnline) {
  const dot = document.getElementById('systemLiveDot');
  const title = document.getElementById('systemModeTitle');
  const desc = document.getElementById('systemModeDesc');
  const chip = document.getElementById('chipText');

  if (isOnline) {
    if (dot) dot.className = 'live-dot';
    if (title) title.textContent = 'LARAVEL API CONNECTED';
    if (desc) desc.textContent = 'Multi-user sync active';
    if (chip) chip.textContent = 'LARAVEL LIVE';
  } else {
    if (dot) dot.className = 'live-dot';
    if (title) title.textContent = 'AUTHENTICATED SESSION';
    if (desc) desc.textContent = 'Role permissions active';
    if (chip) chip.textContent = 'PORTAL ACTIVE';
  }
}

function showLogin() {
  document.getElementById('loginScreen').style.display = 'grid';
  document.getElementById('appContainer').style.display = 'none';
  const pass = document.getElementById('passwordInput');
  if (pass) pass.value = '';
}

function showApp() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appContainer').style.display = 'grid';

  const userConf = AUTHORIZED_ACCOUNTS[currentUser.username] || { role: currentUser.role, badgeClass: 'admin' };

  // Update User Profile in Sidebar
  const avatar = document.getElementById('userAvatar');
  const nameEl = document.getElementById('userFullName');
  const roleTitleEl = document.getElementById('userRoleTitle');
  const roleBadge = document.getElementById('userRoleBadge');

  const names = (currentUser.fullName || currentUser.username).split(' ');
  const initials = names.map(n => n[0]).join('').slice(0, 2).toUpperCase();

  if (avatar) avatar.textContent = initials;
  if (nameEl) nameEl.textContent = currentUser.fullName;
  if (roleTitleEl) roleTitleEl.textContent = currentUser.title || currentUser.role;
  if (roleBadge) {
    roleBadge.textContent = currentUser.role;
    roleBadge.className = 'role-badge ' + (userConf.badgeClass || 'admin');
  }

  // Filter Navigation Items strictly according to user's allowed scope
  document.querySelectorAll('#navigation .nav-item').forEach(btn => {
    const p = btn.dataset.page;
    if (!p) return; // Keep non-page navigation items (like public website link) visible
    if (userConf.allowedPages.includes(p)) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none'; // Strictly hide unauthorized pages
    }
  });

  setPage('dashboard');
}

// Strict Authentication Handler
function handleLogin(username, password) {
  const errBox = document.getElementById('loginError');
  errBox.style.display = 'none';

  const userKey = username.trim().toLowerCase();
  const acc = AUTHORIZED_ACCOUNTS[userKey];

  // Must match authorized user and exact password
  if (!acc) {
    errBox.textContent = 'Unauthorized username. Access is restricted to registered club officials.';
    errBox.style.display = 'block';
    return;
  }

  if (acc.password !== password) {
    errBox.textContent = 'Incorrect password. You cannot log in using another user\'s credentials.';
    errBox.style.display = 'block';
    return;
  }

  // Set session
  setSession({
    username: userKey,
    fullName: acc.fullName,
    role: acc.role,
    title: acc.title,
    badgeClass: acc.badgeClass
  });

  logActivity('login', `User @${userKey} (${acc.fullName} - ${acc.role}) signed in`);
  toast(`Welcome back, ${acc.fullName}!`, 'success');
  showApp();
}

function handleLogout() {
  if (currentUser) {
    logActivity('login', `User @${currentUser.username} (${currentUser.fullName}) signed out`);
  }
  clearSession();
  toast('Signed out successfully.');
  showLogin();
}

// Event Listeners Setup
function setupEventListeners() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('usernameInput').value;
      const p = document.getElementById('passwordInput').value;
      handleLogin(u, p);
    });
  }

  // Account selector buttons (Sets username only, never caches or autofills password)
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('usernameInput').value = btn.dataset.demoUser || '';
      const passField = document.getElementById('passwordInput');
      passField.value = '';
      passField.focus();
      document.getElementById('loginError').style.display = 'none';
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  const nav = document.getElementById('navigation');
  if (nav) {
    nav.addEventListener('click', e => {
      const b = e.target.closest('[data-page]');
      if (b) {
        const targetPage = b.dataset.page;
        if (!canAccessPage(targetPage)) {
          toast(`Access denied: Your role (${currentUser.role}) does not have permission to access ${b.textContent.trim()}.`, 'error');
          return;
        }
        setPage(targetPage);
      }
    });
  }

  const todayEl = document.getElementById('todayLabel');
  if (todayEl) {
    todayEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  }
}

// Navigation & Rendering
function setPage(p) {
  if (!canAccessPage(p)) {
    page = 'unauthorized';
  } else {
    page = p;
  }
  document.querySelectorAll('#navigation .nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  render();
}

window.goToCmsMatchCenter = function() {
  if (!canAccessPage('cms')) {
    toast('Access restricted: Only Admin and authorized officials can edit the public Match Center.', 'error');
    return;
  }
  page = 'cms';
  activeCmsTab = 'match';
  document.querySelectorAll('#navigation .nav-item').forEach(b => b.classList.toggle('active', b.dataset.page === 'cms'));
  render();
  setTimeout(() => {
    const el = document.getElementById('cmsTabMatch');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 50);
};

function render() {
  const root = document.getElementById('pageRoot');
  if (!root) return;

  if (page === 'unauthorized') root.innerHTML = accessDeniedHTML();
  else if (page === 'dashboard') root.innerHTML = dashboardHTML();
  else if (page === 'profile') root.innerHTML = profileHTML();
  else if (page === 'reports') root.innerHTML = reportsHTML();
  else if (page === 'audit') root.innerHTML = auditLogHTML();
  else if (page === 'settings') root.innerHTML = settingsHTML();
  else if (page === 'cms') root.innerHTML = cmsHTML();
  else root.innerHTML = moduleHTML(page);

  wireCommon();
  wirePage();
}

function accessDeniedHTML() {
  return `
    <div class="access-denied-box">
      <h3>🚫 Access Restricted</h3>
      <p>Your assigned role (<b>${esc(currentUser.role)}</b>) is not authorized to view or edit this module.</p>
      <button class="btn red" onclick="setPage('dashboard')">Return to My Dashboard</button>
    </div>`;
}

// Financial Computations
function allOutstanding() {
  return db.contributions.reduce((s, r) => s + Math.max(0, num(r.amount) - num(r.paid)), 0);
}
function totalIncome() {
  return db.contributions.reduce((s, r) => s + num(r.paid), 0) + db.sponsors.reduce((s, r) => s + num(r.received), 0);
}
function totalExpenses() {
  return db.expenses.reduce((s, r) => s + num(r.amount), 0);
}
function balance() {
  return totalIncome() - totalExpenses();
}
function resultCounts() {
  const a = db.matches.filter(m => m.status === 'Played' && m.daystarGoals !== '' && m.opponentGoals !== '');
  return a.reduce((o, m) => {
    const x = num(m.daystarGoals), y = num(m.opponentGoals);
    o[x > y ? 'W' : x === y ? 'D' : 'L']++;
    return o;
  }, { W: 0, D: 0, L: 0 });
}

// Dashboard tailored strictly by Role
function dashboardHTML() {
  const r = currentUser.role;

  if (r === 'Treasurer') {
    return treasurerDashboardHTML();
  } else if (r === 'Team Manager') {
    return managerDashboardHTML();
  } else if (r === 'Secretary') {
    return secretaryDashboardHTML();
  } else {
    return superAdminDashboardHTML();
  }
}

// 1. Super Admin / CEO Dashboard (Full Oversight + Live Audit Feed)
function superAdminDashboardHTML() {
  const activeMembers = db.members.filter(x => x.status !== 'Inactive').length;
  const activePlayers = db.players.filter(x => x.status === 'Active').length;
  const received = db.contributions.reduce((s, r) => s + num(r.paid), 0);
  const recent = [...db.matches].filter(x => x.status === 'Played').sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const monthly = months.map((m, i) => ({
    m,
    inc: db.contributions.filter(r => r.date && new Date(r.date + 'T00:00:00').getMonth() === i).reduce((s, r) => s + num(r.paid), 0)
       + db.sponsors.filter(r => r.startDate && new Date(r.startDate + 'T00:00:00').getMonth() === i).reduce((s, r) => s + num(r.received), 0),
    exp: db.expenses.filter(r => r.date && new Date(r.date + 'T00:00:00').getMonth() === i).reduce((s, r) => s + num(r.amount), 0)
  }));
  const max = Math.max(1, ...monthly.flatMap(x => [x.inc, x.exp]));

  return `
    <div class="page-heading">
      <div>
        <h2>Welcome, ${esc(currentUser.fullName)}</h2>
        <p>👑 ${esc(currentUser.title)} · Full Executive Oversight · ${esc(db.profile.clubName)}</p>
      </div>
      <div class="heading-actions">
        <span class="status-chip" style="background:#fce8e6;color:#c91525;border-color:#f5c2c7">
          <span class="live-dot" style="background:#c91525"></span> Full Administrative Privileges
        </span>
      </div>
    </div>

    <!-- Executive KPIs -->
    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-label">Registered Players</div>
        <div class="kpi-value">${db.players.length}</div>
        <div class="kpi-note">${activePlayers} active squad members</div>
      </div>
      <div class="kpi red">
        <div class="kpi-label">Members & Supporters</div>
        <div class="kpi-value">${activeMembers}</div>
        <div class="kpi-note">${db.members.length} registered in community</div>
      </div>
      <div class="kpi green">
        <div class="kpi-label">Contributions Received</div>
        <div class="kpi-value" style="font-size:21px">${fmtMoney(received)}</div>
        <div class="kpi-note">${fmtMoney(allOutstanding())} outstanding pledges</div>
      </div>
      <div class="kpi gold">
        <div class="kpi-label">Net Club Balance</div>
        <div class="kpi-value" style="font-size:21px">${fmtMoney(balance())}</div>
        <div class="kpi-note">Received income less recorded expenses</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <section class="panel">
      <div class="panel-head">
        <h3>Executive Actions</h3>
        <span class="muted" style="font-size:10px">Manage any club department</span>
      </div>
      <div class="quick-grid" style="grid-template-columns:repeat(6,minmax(0,1fr))">
        <button class="quick-btn" data-new="contributions"><span>＋</span>Record Contribution</button>
        <button class="quick-btn" data-new="expenses"><span>▤</span>Approve Expense</button>
        <button class="quick-btn" data-new="players"><span>♟</span>Register Player</button>
        <button class="quick-btn" data-new="matches"><span>⚽</span>Schedule Match</button>
        <button class="quick-btn" onclick="goToCmsMatchCenter()" style="border-color:#0284c7;background:#f0f9ff"><span>⚽</span>Match Center & Fixtures</button>
        <button class="quick-btn" id="adminQuickResetPass" style="border-color:#e21d2b;background:#fff9f9"><span>🔑</span>Reset User Password</button>
      </div>
    </section>

    <!-- Operational Summaries -->
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-head">
          <h3>Recent Matches</h3>
          <div style="display:flex;gap:6px">
            <button class="btn blue small" onclick="goToCmsMatchCenter()">⚽ Public Match Center & Fixtures</button>
            <button class="btn light small" data-goto="matches">View all</button>
          </div>
        </div>
        ${recent.length ? `
          <div class="match-list">
            ${recent.map(m => {
              const g = num(m.daystarGoals), o = num(m.opponentGoals);
              const cls = g > o ? 'win' : g < o ? 'loss' : '';
              return `
                <div class="match-row">
                  <span>${fmtDate(m.date)}</span>
                  <div><b>${esc(m.opponent)}</b><small>${esc(m.venue || m.competition || 'Match')}</small></div>
                  <span class="score ${cls}">${g} - ${o}</span>
                </div>`;
            }).join('')}
          </div>` : `
          <div class="empty-state"><b>No match results recorded yet.</b></div>`}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Player Distribution</h3>
          <button class="btn light small" data-goto="players">Manage</button>
        </div>
        ${playerDistribution()}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Financial Overview</h3>
          <button class="btn light small" data-goto="reports">Reports</button>
        </div>
        <div class="bar-chart">
          ${monthly.map(x => `
            <div class="bar-group" title="${x.m}: income ${fmtMoney(x.inc)}, expenses ${fmtMoney(x.exp)}">
              <div class="bar" style="height:${Math.max(2, x.inc / max * 100)}%"></div>
              <div class="bar expense" style="height:${Math.max(2, x.exp / max * 100)}%"></div>
            </div>`).join('')}
        </div>
        <div class="bar-labels">${months.map(m => `<span>${m}</span>`).join('')}</div>
        <div class="chart-legend">
          <span>■ Income</span>
          <span style="color:var(--red)">■ Expenses</span>
        </div>
      </section>
    </div>

    <!-- Super Admin Live Activity Feed -->
    <section class="panel">
      <div class="panel-head">
        <h3>🛡️ System Activity & Audit Feed</h3>
        <button class="btn light small" data-goto="audit">View Full Audit Log →</button>
      </div>
      <p class="muted" style="font-size:11px;margin:-5px 0 12px">Real-time log of user logins and actions taken across all club modules.</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Official</th>
              <th>Role</th>
              <th>Action Details</th>
            </tr>
          </thead>
          <tbody>
            ${auditLogs.slice(0, 6).map(a => `
              <tr>
                <td>${fmtTime(a.timestamp)}</td>
                <td><b>${esc(a.fullName)}</b> <span class="muted">(@${esc(a.user)})</span></td>
                <td><span class="role-pill ${esc(a.role.toLowerCase().replace(/\s+/g, ''))}">${esc(a.role)}</span></td>
                <td><span class="audit-badge ${esc(a.type)}">${esc(a.type.toUpperCase())}</span> &nbsp;${esc(a.action)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

// 2. Treasurer Dashboard (Strict Financial Scope Only)
function treasurerDashboardHTML() {
  const pledged = db.contributions.reduce((s, r) => s + num(r.amount), 0);
  const received = db.contributions.reduce((s, r) => s + num(r.paid), 0);
  const sponsorReceived = db.sponsors.reduce((s, r) => s + num(r.received), 0);
  const totalExp = totalExpenses();
  const netBal = balance();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const monthly = months.map((m, i) => ({
    m,
    inc: db.contributions.filter(r => r.date && new Date(r.date + 'T00:00:00').getMonth() === i).reduce((s, r) => s + num(r.paid), 0)
       + db.sponsors.filter(r => r.startDate && new Date(r.startDate + 'T00:00:00').getMonth() === i).reduce((s, r) => s + num(r.received), 0),
    exp: db.expenses.filter(r => r.date && new Date(r.date + 'T00:00:00').getMonth() === i).reduce((s, r) => s + num(r.amount), 0)
  }));
  const max = Math.max(1, ...monthly.flatMap(x => [x.inc, x.exp]));

  const recentContributions = [...db.contributions].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);
  const recentExpenses = [...db.expenses].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);

  return `
    <div class="page-heading">
      <div>
        <h2>Welcome, ${esc(currentUser.fullName)}</h2>
        <p>💰 ${esc(currentUser.title)} · Financial Operations & Budget Department</p>
      </div>
      <div class="heading-actions">
        <span class="status-chip" style="background:#e8f7ef;color:#138b58;border-color:#b9e7cc">
          <span class="live-dot" style="background:#138b58"></span> Treasury Permissions Active
        </span>
      </div>
    </div>

    <!-- Treasury KPIs -->
    <div class="kpi-grid">
      <div class="kpi green">
        <div class="kpi-label">Contributions Received</div>
        <div class="kpi-value" style="font-size:21px">${fmtMoney(received)}</div>
        <div class="kpi-note">${fmtMoney(pledged)} total pledged</div>
      </div>
      <div class="kpi red">
        <div class="kpi-label">Outstanding Pledges</div>
        <div class="kpi-value" style="font-size:21px">${fmtMoney(allOutstanding())}</div>
        <div class="kpi-note">Pending collection</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Total Expenses</div>
        <div class="kpi-value" style="font-size:21px">${fmtMoney(totalExp)}</div>
        <div class="kpi-note">${db.expenses.length} expense vouchers</div>
      </div>
      <div class="kpi gold">
        <div class="kpi-label">Net Club Balance</div>
        <div class="kpi-value" style="font-size:21px">${fmtMoney(netBal)}</div>
        <div class="kpi-note">Cash & Bank recorded surplus</div>
      </div>
    </div>

    <!-- Treasury Quick Actions -->
    <section class="panel">
      <div class="panel-head"><h3>Financial Actions</h3></div>
      <div class="quick-grid">
        <button class="quick-btn" data-new="contributions"><span>＋</span>Record Contribution</button>
        <button class="quick-btn" data-new="expenses"><span>▤</span>Record Expense Voucher</button>
        <button class="quick-btn" data-new="sponsors"><span>🤝</span>Add Sponsor Commitment</button>
        <button class="quick-btn" data-goto="reports"><span>▥</span>Generate Financial Report</button>
      </div>
    </section>

    <!-- Cash Flow Chart -->
    <section class="panel">
      <div class="panel-head">
        <h3>Cash Flow Overview (Income vs Expenses)</h3>
        <button class="btn light small" data-goto="reports">Full Financial Report</button>
      </div>
      <div class="bar-chart">
        ${monthly.map(x => `
          <div class="bar-group" title="${x.m}: income ${fmtMoney(x.inc)}, expenses ${fmtMoney(x.exp)}">
            <div class="bar" style="height:${Math.max(2, x.inc / max * 100)}%"></div>
            <div class="bar expense" style="height:${Math.max(2, x.exp / max * 100)}%"></div>
          </div>`).join('')}
      </div>
      <div class="bar-labels">${months.map(m => `<span>${m}</span>`).join('')}</div>
      <div class="chart-legend">
        <span>■ Income Received</span>
        <span style="color:var(--red)">■ Outflows / Expenses</span>
      </div>
    </section>

    <!-- Split view of Recent Finances -->
    <div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
      <section class="panel">
        <div class="panel-head">
          <h3>Recent Contributions</h3>
          <button class="btn light small" data-goto="contributions">Manage</button>
        </div>
        ${recentContributions.length ? `
          <div class="match-list">
            ${recentContributions.map(c => `
              <div class="match-row" style="grid-template-columns:85px 1fr 110px">
                <span>${fmtDate(c.date)}</span>
                <div><b>${esc(c.supporter)}</b><small>${esc(c.purpose || c.category)}</small></div>
                <b style="color:#138b58;text-align:right">${fmtMoney(c.paid)}</b>
              </div>`).join('')}
          </div>` : '<div class="empty-state">No contributions recorded.</div>'}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Recent Expenses</h3>
          <button class="btn light small" data-goto="expenses">Manage</button>
        </div>
        ${recentExpenses.length ? `
          <div class="match-list">
            ${recentExpenses.map(e => `
              <div class="match-row" style="grid-template-columns:85px 1fr 110px">
                <span>${fmtDate(e.date)}</span>
                <div><b>${esc(e.description)}</b><small>${esc(e.category)}</small></div>
                <b style="color:#c91525;text-align:right">${fmtMoney(e.amount)}</b>
              </div>`).join('')}
          </div>` : '<div class="empty-state">No expenses recorded.</div>'}
      </section>
    </div>`;
}

// 3. Team Manager / Coach Dashboard (Strict Football Scope Only)
function managerDashboardHTML() {
  const totalPlayers = db.players.length;
  const activePlayers = db.players.filter(x => x.status === 'Active').length;
  const injuredPlayers = db.players.filter(x => x.status === 'Injured').length;
  const rc = resultCounts();
  const recent = [...db.matches].filter(x => x.status === 'Played').sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);
  const scheduled = db.matches.filter(x => x.status === 'Scheduled').sort((a, b) => (a.date || '').localeCompare(b.date || ''));

  return `
    <div class="page-heading">
      <div>
        <h2>Welcome, ${esc(currentUser.fullName)}</h2>
        <p>⚽ ${esc(currentUser.title)} · Technical Bench & Squad Operations</p>
      </div>
      <div class="heading-actions">
        <span class="status-chip" style="background:#eaf2fd;color:#0d6efd;border-color:#b9d5fb">
          <span class="live-dot" style="background:#0d6efd"></span> Technical Bench Active
        </span>
      </div>
    </div>

    <!-- Coaching KPIs -->
    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-label">Total Squad Size</div>
        <div class="kpi-value">${totalPlayers}</div>
        <div class="kpi-note">Senior, Youth & Academy</div>
      </div>
      <div class="kpi green">
        <div class="kpi-label">Active & Available</div>
        <div class="kpi-value">${activePlayers}</div>
        <div class="kpi-note">Match-ready players</div>
      </div>
      <div class="kpi red">
        <div class="kpi-label">Injuries / Out</div>
        <div class="kpi-value">${injuredPlayers}</div>
        <div class="kpi-note">On medical leave</div>
      </div>
      <div class="kpi gold">
        <div class="kpi-label">Match Record</div>
        <div class="kpi-value" style="font-size:22px">${rc.W}W · ${rc.D}D · ${rc.L}L</div>
        <div class="kpi-note">Played fixtures this season</div>
      </div>
    </div>

    <!-- Manager Quick Actions -->
    <section class="panel">
      <div class="panel-head"><h3>Technical Actions</h3></div>
      <div class="quick-grid" style="grid-template-columns:repeat(5,minmax(0,1fr))">
        <button class="quick-btn" data-new="players"><span>♟</span>Register New Player</button>
        <button class="quick-btn" data-new="matches"><span>⚽</span>Schedule Fixture</button>
        <button class="quick-btn" onclick="goToCmsMatchCenter()" style="border-color:#0284c7;background:#f0f9ff"><span>⚽</span>Match Center & Fixtures</button>
        <button class="quick-btn" data-new="staff"><span>♧</span>Add Technical Staff</button>
        <button class="quick-btn" data-new="activities"><span>▤</span>Plan Training / Camp</button>
      </div>
    </section>

    <!-- Squad and Fixtures -->
    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-head">
          <h3>Recent Match Results</h3>
          <div style="display:flex;gap:6px">
            <button class="btn blue small" onclick="goToCmsMatchCenter()">⚽ Public Match Center</button>
            <button class="btn light small" data-goto="matches">All Fixtures</button>
          </div>
        </div>
        ${recent.length ? `
          <div class="match-list">
            ${recent.map(m => {
              const g = num(m.daystarGoals), o = num(m.opponentGoals);
              const cls = g > o ? 'win' : g < o ? 'loss' : '';
              return `
                <div class="match-row">
                  <span>${fmtDate(m.date)}</span>
                  <div><b>${esc(m.opponent)}</b><small>${esc(m.venue || m.competition || 'Match')}</small></div>
                  <span class="score ${cls}">${g} - ${o}</span>
                </div>`;
            }).join('')}
          </div>` : '<div class="empty-state">No matches recorded yet.</div>'}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Player Positions Distribution</h3>
          <button class="btn light small" data-goto="players">Manage Squad</button>
        </div>
        ${playerDistribution()}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Upcoming Scheduled Matches</h3>
          <button class="btn light small" data-new="matches">＋ Fixture</button>
        </div>
        ${scheduled.length ? `
          <div class="match-list">
            ${scheduled.map(m => `
              <div class="match-row" style="grid-template-columns:85px 1fr">
                <span>${fmtDate(m.date)}</span>
                <div><b>vs ${esc(m.opponent)}</b><small>${esc(m.venue || 'TBA')} · ${esc(m.competition || 'Fixture')}</small></div>
              </div>`).join('')}
          </div>` : '<div class="empty-state">No upcoming fixtures scheduled.</div>'}
      </section>
    </div>`;
}

// 4. Secretary General Dashboard (Strict Secretariat Scope Only)
function secretaryDashboardHTML() {
  const totalMembers = db.members.length;
  const activeMembers = db.members.filter(x => x.status !== 'Inactive').length;
  const activities = db.activities.length;

  return `
    <div class="page-heading">
      <div>
        <h2>Welcome, ${esc(currentUser.fullName)}</h2>
        <p>📋 ${esc(currentUser.title)} · Community, Records & Secretarial Affairs</p>
      </div>
      <div class="heading-actions">
        <span class="status-chip" style="background:#f3e8fd;color:#8540f5;border-color:#dcbdfa">
          <span class="live-dot" style="background:#8540f5"></span> Secretariat Access Active
        </span>
      </div>
    </div>

    <!-- Secretariat KPIs -->
    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-label">Registered Supporters</div>
        <div class="kpi-value">${totalMembers}</div>
        <div class="kpi-note">${activeMembers} active supporters</div>
      </div>
      <div class="kpi green">
        <div class="kpi-label">Club Activities & Events</div>
        <div class="kpi-value">${activities}</div>
        <div class="kpi-note">Outreach, meetings & events</div>
      </div>
      <div class="kpi red">
        <div class="kpi-label">Official Motto</div>
        <div class="kpi-value" style="font-size:16px">${esc(db.profile.motto)}</div>
        <div class="kpi-note">Club identity verified</div>
      </div>
      <div class="kpi gold">
        <div class="kpi-label">Headquarters / Ground</div>
        <div class="kpi-value" style="font-size:15px">${esc(db.profile.homeGround)}</div>
        <div class="kpi-note">${esc(db.profile.location)}</div>
      </div>
    </div>

    <!-- Secretariat Quick Actions -->
    <section class="panel">
      <div class="panel-head"><h3>Secretarial Actions</h3></div>
      <div class="quick-grid">
        <button class="quick-btn" data-new="members"><span>♙</span>Register Supporter</button>
        <button class="quick-btn" data-new="activities"><span>▤</span>Plan Community Event</button>
        <button class="quick-btn" data-goto="profile"><span>▣</span>Update Club Registry</button>
        <button class="quick-btn" data-export-csv="members"><span>⇩</span>Export Member List</button>
      </div>
    </section>

    <!-- Members & Community Activity List -->
    <div class="dashboard-grid" style="grid-template-columns:1fr 1fr">
      <section class="panel">
        <div class="panel-head">
          <h3>Recent Supporters Registered</h3>
          <button class="btn light small" data-goto="members">View all</button>
        </div>
        ${db.members.length ? `
          <div class="match-list">
            ${db.members.slice(0, 5).map(m => `
              <div class="match-row" style="grid-template-columns:1fr 90px">
                <div><b>${esc(m.fullName)}</b><small>${esc(m.category || 'Supporter')} · ${esc(m.area || 'Ayivu')}</small></div>
                <span class="score">${esc(m.status || 'Active')}</span>
              </div>`).join('')}
          </div>` : '<div class="empty-state">No members registered yet.</div>'}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Planned Activities & Events</h3>
          <button class="btn light small" data-goto="activities">View all</button>
        </div>
        ${db.activities.length ? `
          <div class="match-list">
            ${db.activities.slice(0, 5).map(a => `
              <div class="match-row" style="grid-template-columns:85px 1fr">
                <span>${fmtDate(a.date)}</span>
                <div><b>${esc(a.title)}</b><small>${esc(a.category || 'Event')} · ${esc(a.venue || 'Oluko')}</small></div>
              </div>`).join('')}
          </div>` : '<div class="empty-state">No club events recorded yet.</div>'}
      </section>
    </div>`;
}

function playerDistribution() {
  const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Utility'];
  const colors = ['#0d315b', '#e21d2b', '#9aa6b7', '#d7dee8', '#168553'];
  const counts = positions.map(p => db.players.filter(x => x.position === p).length);
  const total = db.players.length;
  let cursor = 0;
  const parts = counts.map((n, i) => {
    const start = cursor;
    cursor += total ? n / total * 100 : 0;
    return `${colors[i]} ${start}% ${cursor}%`;
  });
  const bg = total ? `conic-gradient(${parts.join(',')})` : 'conic-gradient(#e7ebf1 0 100%)';
  return `
    <div class="distribution">
      <div class="donut" style="background:${bg}">
        <div class="donut-center">${total}<small>Total players</small></div>
      </div>
      <div class="legend">
        ${positions.slice(0, 4).map((p, i) => `
          <div class="legend-item">
            <span class="legend-dot" style="background:${colors[i]}"></span>${p} <b>${counts[i]}</b>
          </div>`).join('')}
      </div>
    </div>`;
}

// Module View
function moduleHTML(key) {
  if (!canAccessPage(key)) return accessDeniedHTML();

  const s = SCHEMAS[key];
  if (!s) return '<section class="panel">Unknown module.</section>';
  const total = key === 'contributions' ? db.contributions.reduce((a, r) => a + num(r.paid), 0) : key === 'expenses' ? totalExpenses() : null;
  const editable = canEdit(key);

  return `
    <div class="page-heading">
      <div>
        <h2>${s.icon} ${s.label}</h2>
        <p>Manage, search, edit and export your ${s.label.toLowerCase()} records.</p>
      </div>
      <div class="heading-actions">
        ${key === 'matches' ? `
          <button class="btn blue" onclick="goToCmsMatchCenter()">⚽ Public Match Center & Fixtures ↗</button>
        ` : ''}
        ${key === 'academy' ? `
          <button class="btn blue" onclick="openAcademyApplicationsModal()">📩 Online Applications (${loadAcademyApplications().length})</button>
          <a href="index.html#academy-section" target="_blank" rel="noopener" class="btn light" style="text-decoration:none">🌐 Public Academy Page ↗</a>
        ` : ''}
        ${editable ? `<button class="btn red" data-new="${key}">＋ Add ${s.singular}</button>` : `<span class="status-chip"><span class="live-dot warn"></span> Read-Only View</span>`}
      </div>
    </div>

    ${key === 'matches' ? `
      <div class="panel" style="background:#f0f9ff;border:1px solid #bae6fd;margin-bottom:18px;padding:16px 20px">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
          <div>
            <h3 style="margin:0;color:#0369a1;font-size:16px;display:flex;align-items:center;gap:6px">
              <span>⚽</span> Public Match Center, Countdown, Fixtures & Results Editor
            </h3>
            <p style="margin:4px 0 0;color:#075985;font-size:12px;line-height:1.5">
              Looking to edit the <b>Featured Matchday Countdown</b>, schedule new <b>Upcoming Season Fixtures</b>, publish <b>Recent Match Scorecards</b>, or update the <b>Alua Playground Admission Notice</b> on <a href="fixtures.html" target="_blank" style="font-weight:700;color:#0369a1;text-decoration:underline">fixtures.html</a>? Click the button to open the live public editor.
            </p>
          </div>
          <button type="button" class="btn blue" onclick="goToCmsMatchCenter()" style="font-size:13px;padding:9px 18px;font-weight:800;white-space:nowrap">
            ⚽ Open Public Match Center & Fixtures →
          </button>
        </div>
      </div>
    ` : ''}

    ${key === 'academy' ? `
      <div class="kpi-grid" style="grid-template-columns:repeat(5,minmax(0,1fr))">
        <div class="kpi"><div class="kpi-label">Total Enrolled Youths</div><div class="kpi-value" style="font-size:22px">${db.academy.length}</div><div class="kpi-note">Grassroots scholars</div></div>
        <div class="kpi red"><div class="kpi-label">🦁 U-12 Cubs</div><div class="kpi-value">${db.academy.filter(x => x.ageCategory?.includes('U-12')).length}</div></div>
        <div class="kpi gold"><div class="kpi-label">⚡ U-15 Juniors</div><div class="kpi-value">${db.academy.filter(x => x.ageCategory?.includes('U-15')).length}</div></div>
        <div class="kpi"><div class="kpi-label">🔥 U-17 Youth</div><div class="kpi-value">${db.academy.filter(x => x.ageCategory?.includes('U-17')).length}</div></div>
        <div class="kpi green"><div class="kpi-label">⭐ Promoted to Senior</div><div class="kpi-value">${db.academy.filter(x => x.status === 'Graduated to Senior').length}</div></div>
      </div>` : ''}

    ${key === 'contributions' ? `
      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-label">Total Pledged</div><div class="kpi-value" style="font-size:21px">${fmtMoney(db.contributions.reduce((a, r) => a + num(r.amount), 0))}</div></div>
        <div class="kpi green"><div class="kpi-label">Received</div><div class="kpi-value" style="font-size:21px">${fmtMoney(total)}</div></div>
        <div class="kpi red"><div class="kpi-label">Outstanding</div><div class="kpi-value" style="font-size:21px">${fmtMoney(allOutstanding())}</div></div>
        <div class="kpi gold"><div class="kpi-label">Contributions</div><div class="kpi-value">${db.contributions.length}</div></div>
      </div>` : ''}

    ${key === 'expenses' ? `
      <div class="kpi-grid">
        <div class="kpi red"><div class="kpi-label">Total Recorded Expenses</div><div class="kpi-value" style="font-size:21px">${fmtMoney(total)}</div></div>
        <div class="kpi"><div class="kpi-label">Expense Records</div><div class="kpi-value">${db.expenses.length}</div></div>
      </div>` : ''}

    ${key === 'users' ? `
      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-label">Management & User Records</div><div class="kpi-value">${db.users.length}</div><div class="kpi-note">People registered for system access</div></div>
        <div class="kpi green"><div class="kpi-label">Active</div><div class="kpi-value">${db.users.filter(x => x.status === 'Active').length}</div></div>
        <div class="kpi gold"><div class="kpi-label">Pending</div><div class="kpi-value">${db.users.filter(x => x.status === 'Pending').length}</div></div>
        <div class="kpi red"><div class="kpi-label">Suspended</div><div class="kpi-value">${db.users.filter(x => x.status === 'Suspended').length}</div></div>
      </div>` : ''}

    <section class="panel">
      <div class="panel-head">
        <h3>${s.singular} Register</h3>
        <span class="muted" style="font-size:11px" id="recordCount">${db[key].length} record(s)</span>
      </div>
      <div class="toolbar">
        <input class="search" id="searchBox" placeholder="Search by name, date, category, purpose…">
        <select class="filter" id="statusFilter">
          <option value="">All statuses</option>
          ${statusOptions(key).map(x => `<option>${esc(x)}</option>`).join('')}
        </select>
        <button class="btn light" data-export-csv="${key}">Export CSV</button>
        <button class="btn light" onclick="window.print()">Print</button>
      </div>
      <div id="tableMount" class="table-wrap">${tableFor(key, db[key])}</div>
    </section>`;
}

function statusOptions(key) {
  const f = SCHEMAS[key].fields.find(x => x[0] === 'status');
  return f && Array.isArray(f[3]) ? f[3] : [];
}

function fieldValue(key, r, f) {
  const [name, label, type] = f;
  let v = r[name];
  if (name === 'amount' || name === 'paid' || name === 'pledged' || name === 'received' || name === 'budget') return fmtMoney(v);
  if (type === 'date') return fmtDate(v);
  return v === '' || v == null ? '—' : esc(v);
}

function tableFor(key, rows) {
  if (!rows.length) return `<div class="empty-state"><b>No records found</b>Add your first record using the button above.</div>`;
  const s = SCHEMAS[key];
  let fields = s.fields.filter(f => f[2] !== 'textarea');
  if (fields.length > 7) fields = fields.slice(0, 7);
  if (key === 'contributions') fields = [...s.fields.filter(f => ['date', 'supporter', 'category', 'purpose', 'amount', 'paid', 'status'].includes(f[0]))];
  if (key === 'expenses') fields = [...s.fields.filter(f => ['date', 'category', 'description', 'amount', 'paidTo', 'reference'].includes(f[0]))];
  if (key === 'users') fields = [...s.fields.filter(f => ['fullName', 'username', 'role', 'department', 'email', 'status'].includes(f[0]))];
  if (key === 'academy') fields = [...s.fields.filter(f => ['fullName', 'ageCategory', 'position', 'jersey', 'school', 'guardianPhone', 'status'].includes(f[0]))];

  const editable = canEdit(key);

  return `
    <table>
      <thead>
        <tr>
          ${fields.map(f => `<th>${esc(f[1])}</th>`).join('')}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            ${fields.map(f => `<td>${fieldValue(key, r, f)}</td>`).join('')}
            <td class="row-actions">
              ${editable ? `<button class="icon-btn" data-edit="${key}" data-id="${r.id}">Edit</button>` : ''}
              ${key === 'contributions' ? `<button class="icon-btn" data-receipt="${r.id}">Receipt</button>` : ''}
              ${key === 'academy' && editable ? `<button class="icon-btn" style="color:#0369a1;font-weight:700" onclick="promoteToSenior('${r.id}')" title="Promote to Senior First Team Squad">⬆️ Promote</button>` : ''}
              ${key === 'users' && currentUser?.role === 'Admin' ? `<button class="icon-btn" data-reset-pass="${esc(r.username || '')}" title="Reset Password for this user">🔑 Reset Password</button>` : ''}
              ${editable ? `<button class="icon-btn delete" data-delete="${key}" data-id="${r.id}">Delete</button>` : `<span class="muted" style="font-size:10px">Read only</span>`}
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

// System Audit Log View (Super Admin / CEO Only)
function auditLogHTML() {
  if (currentUser.role !== 'Admin') return accessDeniedHTML();

  return `
    <div class="page-heading">
      <div>
        <h2>🛡️ System Activity & Audit Trail</h2>
        <p>Live chronological record of user authentication and data operations across all departments.</p>
      </div>
      <div class="heading-actions">
        <button class="btn light" onclick="window.print()">Print Audit Log</button>
      </div>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h3>Audit Records</h3>
        <span class="muted" style="font-size:11px">${auditLogs.length} events logged</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Official Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${auditLogs.map(a => `
              <tr>
                <td>${fmtTime(a.timestamp)}</td>
                <td><b>${esc(a.fullName)}</b></td>
                <td>@${esc(a.user)}</td>
                <td><span class="role-pill ${esc(a.role.toLowerCase().replace(/\s+/g, ''))}">${esc(a.role)}</span></td>
                <td><span class="audit-badge ${esc(a.type)}">${esc(a.type.toUpperCase())}</span></td>
                <td>${esc(a.action)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

// Club Profile View
function profileHTML() {
  if (!canAccessPage('profile')) return accessDeniedHTML();

  const p = db.profile;
  const fields = [
    ['clubName', 'Official club name', 'text'],
    ['founded', 'Year founded', 'text'],
    ['location', 'Location / Address', 'text'],
    ['homeGround', 'Home ground', 'text'],
    ['poBox', 'Postal address / P.O. Box', 'text'],
    ['email', 'Official email', 'email'],
    ['phone', 'Official phone', 'tel'],
    ['motto', 'Club motto', 'text'],
    ['colors', 'Official club colours', 'text'],
    ['vision', 'Vision statement', 'textarea'],
    ['mission', 'Mission statement', 'textarea']
  ];
  const editable = canEdit('profile');

  return `
    <div class="page-heading">
      <div>
        <h2>Club Profile</h2>
        <p>Official identity, contacts, vision and mission of the organisation.</p>
      </div>
    </div>
    <section class="panel">
      <div style="display:flex;align-items:center;gap:15px;margin-bottom:18px">
        <img class="profile-logo" src="assets/daystar-logo.jpg" alt="Daystar crest" onerror="this.src='https://via.placeholder.com/90/071d3b/ffffff?text=DFC'">
        <div>
          <h3>${esc(p.clubName)}</h3>
          <p class="muted" style="font-size:11px">Official club registry details.</p>
        </div>
      </div>
      <form id="profileForm">
        <div class="form-grid">
          ${fields.map(([k, l, t]) => `
            <div class="field ${t === 'textarea' ? 'full' : ''}">
              <label>${l}</label>
              ${t === 'textarea' ? `<textarea name="${k}" ${!editable ? 'readonly' : ''}>${esc(p[k] || '')}</textarea>` : `<input name="${k}" type="${t}" value="${esc(p[k] || '')}" ${!editable ? 'readonly' : ''}>`}
            </div>`).join('')}
        </div>
        ${editable ? `
          <div class="form-actions">
            <button class="btn red" type="submit">Save Club Profile</button>
          </div>` : ''}
      </form>
    </section>`;
}

// Reports View (Treasurer & Admin)
function reportsHTML() {
  if (!canAccessPage('reports')) return accessDeniedHTML();

  const pledged = db.contributions.reduce((a, r) => a + num(r.amount), 0);
  const paid = db.contributions.reduce((a, r) => a + num(r.paid), 0);
  const sponsorPledged = db.sponsors.reduce((a, r) => a + num(r.pledged), 0);
  const sponsorReceived = db.sponsors.reduce((a, r) => a + num(r.received), 0);
  const rc = resultCounts();

  const cats = {};
  db.contributions.forEach(r => cats[r.category || 'Other'] = (cats[r.category || 'Other'] || 0) + num(r.paid));

  return `
    <div class="page-heading">
      <div>
        <h2>Reports & Financial Analytics</h2>
        <p>Official statement of contributions, sponsor support, expenses and net balance.</p>
      </div>
      <div class="heading-actions">
        <button class="btn light" data-export-json>⬇ Full Backup</button>
        <button class="btn light" onclick="window.print()">Print Report</button>
      </div>
    </div>
    <div class="kpi-grid">
      <div class="kpi green"><div class="kpi-label">Contribution Income Received</div><div class="kpi-value" style="font-size:20px">${fmtMoney(paid)}</div></div>
      <div class="kpi"><div class="kpi-label">Sponsor Support Received</div><div class="kpi-value" style="font-size:20px">${fmtMoney(sponsorReceived)}</div></div>
      <div class="kpi red"><div class="kpi-label">Total Expenses</div><div class="kpi-value" style="font-size:20px">${fmtMoney(totalExpenses())}</div></div>
      <div class="kpi gold"><div class="kpi-label">Net Recorded Balance</div><div class="kpi-value" style="font-size:20px">${fmtMoney(balance())}</div></div>
    </div>
    <div class="grid-reports" style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
      <section class="panel">
        <div class="panel-head"><h3>Contribution Summary</h3></div>
        <div class="report-cards">
          <div class="report-box"><span class="muted">Pledged</span><b>${fmtMoney(pledged)}</b></div>
          <div class="report-box"><span class="muted">Received</span><b>${fmtMoney(paid)}</b></div>
          <div class="report-box"><span class="muted">Outstanding</span><b>${fmtMoney(allOutstanding())}</b></div>
        </div>
        <div style="margin-top:18px">
          ${Object.entries(cats).length ? Object.entries(cats).map(([k, v]) => `
            <div style="margin:11px 0;font-size:11px">
              <div style="display:flex;justify-content:space-between;gap:10px">
                <span>${esc(k)}</span><b>${fmtMoney(v)}</b>
              </div>
              <div class="progress"><span style="width:${Math.min(100, paid ? v / paid * 100 : 0)}%"></span></div>
            </div>`).join('') : '<p class="muted">No contributions recorded.</p>'}
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><h3>Sponsor Support & Performance</h3></div>
        <div class="report-cards">
          <div class="report-box"><span class="muted">Pledged</span><b>${fmtMoney(sponsorPledged)}</b></div>
          <div class="report-box"><span class="muted">Received</span><b>${fmtMoney(sponsorReceived)}</b></div>
          <div class="report-box"><span class="muted">Sponsors</span><b>${db.sponsors.length}</b></div>
        </div>
        <div style="margin-top:18px">
          <p>Match results</p>
          <p><b>${rc.W}</b> Wins &nbsp; <b>${rc.D}</b> Draws &nbsp; <b>${rc.L}</b> Losses</p>
          <p class="muted" style="font-size:11px">Only played matches with scores entered are counted.</p>
        </div>
      </section>
    </div>
    <section class="panel">
      <div class="panel-head"><h3>Export Financial Registers</h3></div>
      <div class="quick-grid">
        <button class="quick-btn" data-export-csv="contributions"><span>⇩</span>Contributions CSV</button>
        <button class="quick-btn" data-export-csv="expenses"><span>⇩</span>Expenses CSV</button>
        <button class="quick-btn" data-export-csv="sponsors"><span>⇩</span>Sponsors CSV</button>
      </div>
    </section>`;
}

// Settings View (Admin Only)
function settingsHTML() {
  if (currentUser.role !== 'Admin') return accessDeniedHTML();

  return `
    <div class="page-heading">
      <div>
        <h2>Settings & Backup</h2>
        <p>Manage club system data, backups, and backend synchronization.</p>
      </div>
    </div>
    <section class="panel">
      <div class="panel-head"><h3>Backend Synchronization</h3></div>
      <div class="notice ${isConnectedToBackend ? 'success-note' : ''}">
        <b>Connection Status:</b> ${isConnectedToBackend ? 'Connected to Laravel Backend API.' : 'Currently running in Standalone / Browser Mode. Start the Laravel server to enable multi-device sync.'}
      </div>
    </section>
    <section class="panel">
      <div class="panel-head"><h3>Backup & Restore</h3></div>
      <p class="muted" style="font-size:12px">Download a complete JSON backup containing all club profile, member, player, match, financial, and user records.</p>
      <div class="heading-actions" style="margin-top:15px">
        <button class="btn red" data-export-json>⬇ Download Full Backup</button>
        <label class="btn light" for="restoreInput">⬆ Restore Backup</label>
        <input id="restoreInput" type="file" accept=".json,application/json" hidden>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head"><h3>Danger Zone</h3></div>
      <p class="muted" style="font-size:12px">This permanently clears local records from this browser. Always download a backup first.</p>
      <button class="btn danger" id="clearAll">Clear All Local Records</button>
    </section>`;
}

// Event Wiring
function wireCommon() {
  document.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => setPage(b.dataset.goto)));
  document.querySelectorAll('[data-new]').forEach(b => b.addEventListener('click', () => openForm(b.dataset.new)));
  document.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openForm(b.dataset.edit, b.dataset.id)));
  document.querySelectorAll('[data-delete]').forEach(b => b.addEventListener('click', () => deleteRecord(b.dataset.delete, b.dataset.id)));
  document.querySelectorAll('[data-receipt]').forEach(b => b.addEventListener('click', () => printReceipt(b.dataset.receipt)));
  document.querySelectorAll('[data-export-csv]').forEach(b => b.addEventListener('click', () => exportCSV(b.dataset.exportCsv)));
  document.querySelectorAll('[data-export-json]').forEach(b => b.addEventListener('click', exportJSON));
  document.querySelectorAll('[data-reset-pass]').forEach(b => b.addEventListener('click', () => openResetPasswordModal(b.dataset.resetPass)));
  const adminQuickReset = document.getElementById('adminQuickResetPass');
  if (adminQuickReset) adminQuickReset.addEventListener('click', () => openResetPasswordModal());
  const changeMyPassBtn = document.getElementById('changeMyPassBtn');
  if (changeMyPassBtn) changeMyPassBtn.addEventListener('click', openChangeMyPasswordModal);
}

function wirePage() {
  const search = document.getElementById('searchBox');
  const filter = document.getElementById('statusFilter');

  if (search) {
    const refresh = () => {
      const term = search.value.toLowerCase();
      const st = filter?.value || '';
      const rows = db[page].filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(term)) && (!st || r.status === st));
      document.getElementById('tableMount').innerHTML = tableFor(page, rows);
      document.getElementById('recordCount').textContent = `${rows.length} record(s) shown`;
      wireCommon();
    };
    search.addEventListener('input', refresh);
    filter?.addEventListener('change', refresh);
  }

  const pf = document.getElementById('profileForm');
  if (pf) {
    pf.addEventListener('submit', e => {
      e.preventDefault();
      for (const [k, v] of new FormData(pf)) db.profile[k] = v;
      saveDB();
      logActivity('update', 'Updated club profile details');
      toast('Club profile saved successfully.', 'success');
      render();
    });
  }

  const restore = document.getElementById('restoreInput');
  if (restore) restore.addEventListener('change', restoreBackup);

  const clear = document.getElementById('clearAll');
  if (clear) {
    clear.addEventListener('click', () => {
      if (confirm('Permanently clear all club data from this browser? This cannot be undone unless you have a backup.')) {
        db = EMPTY_DB();
        saveDB();
        logActivity('delete', 'Cleared all local records');
        toast('Club data cleared from this browser.');
        render();
      }
    });
  }

  if (page === 'cms') {
    wireCmsPage();
  }
}

// Super Admin Password Reset Authority
function openResetPasswordModal(targetUsername = '') {
  if (currentUser?.role !== 'Admin') {
    toast('Only Super Admin / CEO has authority to reset user passwords.', 'error');
    return;
  }

  const userOptions = Object.entries(AUTHORIZED_ACCOUNTS)
    .map(([u, d]) => `<option value="${esc(u)}" ${u === targetUsername ? 'selected' : ''}>${esc(d.fullName)} (@${esc(u)}) - ${esc(d.role)}</option>`)
    .join('');

  const modal = document.getElementById('modalRoot');
  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal" style="max-width:540px">
        <div class="modal-head">
          <h3>🔑 Reset User Password</h3>
          <button class="btn light" type="button" id="closeModal">✕ Close</button>
        </div>
        <form id="resetPassForm">
          <div class="notice" style="margin-bottom:15px">
            <b>Super Admin Authority:</b> Use this tool to change or reset passwords for club officials who forgot their login credentials.
          </div>
          <div class="form-grid" style="grid-template-columns:1fr;gap:13px">
            <div class="field">
              <label>Select User Account *</label>
              <select id="resetTargetUser" required>
                ${userOptions}
              </select>
            </div>
            <div class="field">
              <label>New Password *</label>
              <div style="display:flex;gap:8px">
                <input type="text" id="newPasswordInput" required minlength="8" placeholder="Enter new password (min 8 chars)" style="flex:1">
                <button type="button" class="btn light" id="generatePassBtn" title="Generate Secure Password">🎲 Generate</button>
              </div>
              <small class="hint">Click "Generate" for an instant secure club password.</small>
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px">
            <button class="btn light" type="button" id="cancelModal">Cancel</button>
            <button class="btn red" type="submit">Confirm & Reset Password</button>
          </div>
        </form>
      </section>
    </div>`;

  const close = () => modal.innerHTML = '';
  document.getElementById('closeModal').onclick = close;
  document.getElementById('cancelModal').onclick = close;
  document.getElementById('modalBackdrop').addEventListener('click', e => { if (e.target.id === 'modalBackdrop') close(); });

  const genBtn = document.getElementById('generatePassBtn');
  if (genBtn) {
    genBtn.onclick = () => {
      const randomDigits = Math.floor(100 + Math.random() * 900);
      const suggested = `Daystar!2026#${randomDigits}`;
      document.getElementById('newPasswordInput').value = suggested;
    };
  }

  document.getElementById('resetPassForm').addEventListener('submit', async e => {
    e.preventDefault();
    const u = document.getElementById('resetTargetUser').value;
    const newPass = document.getElementById('newPasswordInput').value.trim();

    if (!newPass || newPass.length < 8) {
      toast('Password must be at least 8 characters long.', 'error');
      return;
    }

    if (AUTHORIZED_ACCOUNTS[u]) {
      AUTHORIZED_ACCOUNTS[u].password = newPass;
      saveAccounts();

      logActivity('update', `Super Admin (${currentUser.fullName}) reset password for user @${u} (${AUTHORIZED_ACCOUNTS[u].fullName})`);
      close();
      toast(`Password for @${u} (${AUTHORIZED_ACCOUNTS[u].fullName}) has been reset to: ${newPass}`, 'success');
      render();
    }
  });
}

// Change Own Password (For Super Admin and logged-in officials)
function openChangeMyPasswordModal() {
  if (!currentUser) return;
  const username = currentUser.username;
  const acc = AUTHORIZED_ACCOUNTS[username];
  if (!acc) return;

  const modal = document.getElementById('modalRoot');
  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal" style="max-width:500px">
        <div class="modal-head">
          <h3>🔑 Change My Password</h3>
          <button class="btn light" type="button" id="closeModal">✕ Close</button>
        </div>
        <form id="changeMyPassForm">
          <div class="notice success-note" style="margin-bottom:15px">
            Updating login password for <b>${esc(currentUser.fullName)}</b> (@${esc(username)}). Choose a private password that only you will know.
          </div>
          <div class="form-grid" style="grid-template-columns:1fr;gap:12px">
            <div class="field">
              <label>Current Password *</label>
              <input type="password" id="currentPassInput" required placeholder="Enter your current password" autocomplete="current-password">
            </div>
            <div class="field">
              <label>New Private Password *</label>
              <input type="password" id="newOwnPassInput" required minlength="6" placeholder="Enter new password (min 6 characters)" autocomplete="new-password">
            </div>
            <div class="field">
              <label>Confirm New Password *</label>
              <input type="password" id="confirmOwnPassInput" required minlength="6" placeholder="Repeat your new password" autocomplete="new-password">
            </div>
          </div>
          <div class="form-actions" style="margin-top:20px">
            <button class="btn light" type="button" id="cancelModal">Cancel</button>
            <button class="btn red" type="submit">Save My New Password</button>
          </div>
        </form>
      </section>
    </div>`;

  const close = () => modal.innerHTML = '';
  document.getElementById('closeModal').onclick = close;
  document.getElementById('cancelModal').onclick = close;
  document.getElementById('modalBackdrop').addEventListener('click', e => { if (e.target.id === 'modalBackdrop') close(); });

  document.getElementById('changeMyPassForm').addEventListener('submit', e => {
    e.preventDefault();
    const curr = document.getElementById('currentPassInput').value;
    const newP = document.getElementById('newOwnPassInput').value;
    const confP = document.getElementById('confirmOwnPassInput').value;

    if (acc.password !== curr) {
      toast('Current password does not match. Please verify your current password.', 'error');
      return;
    }

    if (newP !== confP) {
      toast('New passwords do not match. Please re-enter carefully.', 'error');
      return;
    }

    if (newP.length < 6) {
      toast('Password must be at least 6 characters long.', 'error');
      return;
    }

    // Update and persist password
    acc.password = newP;
    AUTHORIZED_ACCOUNTS[username].password = newP;
    saveAccounts();

    logActivity('update', `User @${username} (${currentUser.fullName}) updated their own login password`);
    close();
    toast('Your password has been updated successfully! Remember it for your next sign-in.', 'success');
  });
}

// Modal Form Handling
function openForm(key, recordId = null) {
  if (!canEdit(key)) {
    toast(`Your role (${currentUser.role}) does not have permission to edit ${key}.`, 'error');
    return;
  }

  const s = SCHEMAS[key];
  if (!s) return;
  const old = recordId ? db[key].find(r => r.id === recordId) : null;
  editing = { key, recordId };

  const fields = s.fields.map(f => {
    const [name, label, type] = f;
    const required = Array.isArray(f[3]) ? false : !!f[3];
    const options = Array.isArray(f[3]) ? f[3] : (Array.isArray(f[4]) ? f[4] : []);
    let control = '';

    if (type === 'select') {
      control = `<select name="${name}" ${required ? 'required' : ''}><option value="">Choose…</option>${options.map(o => `<option value="${esc(o)}" ${old?.[name] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    } else if (type === 'textarea') {
      control = `<textarea name="${name}" ${required ? 'required' : ''}>${esc(old?.[name] || '')}</textarea>`;
    } else {
      control = `<input name="${name}" type="${type}" value="${esc(old?.[name] ?? '')}" ${required ? 'required' : ''} ${type === 'number' ? 'min="0" step="any"' : ''}>`;
    }
    return `<div class="field ${type === 'textarea' ? 'full' : ''}"><label>${esc(label)}${required ? ' *' : ''}</label>${control}</div>`;
  }).join('');

  const modal = document.getElementById('modalRoot');
  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal">
        <div class="modal-head">
          <h3>${recordId ? 'Edit' : 'Add'} ${esc(s.singular)}</h3>
          <button class="btn light" type="button" id="closeModal">✕ Close</button>
        </div>
        <form id="recordForm">
          <div class="form-grid">${fields}</div>
          <div class="form-actions">
            <button class="btn light" type="button" id="cancelModal">Cancel</button>
            <button class="btn red" type="submit">Save Record</button>
          </div>
        </form>
      </section>
    </div>`;

  const close = () => modal.innerHTML = '';
  document.getElementById('closeModal').onclick = close;
  document.getElementById('cancelModal').onclick = close;
  document.getElementById('modalBackdrop').addEventListener('click', e => { if (e.target.id === 'modalBackdrop') close(); });

  document.getElementById('recordForm').addEventListener('submit', async e => {
    e.preventDefault();
    const obj = { ...(old || {}), id: old?.id || id() };
    for (const [k, v] of new FormData(e.target)) obj[k] = v;

    if (key === 'contributions') {
      obj.amount = num(obj.amount);
      obj.paid = num(obj.paid);
      obj.status = obj.paid >= obj.amount ? 'Paid' : obj.paid > 0 ? 'Partially paid' : obj.status || 'Pledged';
    }
    if (key === 'sponsors') {
      obj.pledged = num(obj.pledged);
      obj.received = num(obj.received);
    }
    if (key === 'matches') {
      if (obj.daystarGoals !== '' && obj.opponentGoals !== '' && obj.status === 'Scheduled') obj.status = 'Played';
    }
    if (key === 'expenses') obj.amount = num(obj.amount);

    const idx = db[key].findIndex(r => r.id === obj.id);
    if (idx >= 0) db[key][idx] = obj;
    else db[key].push(obj);

    saveDB();
    logActivity(recordId ? 'update' : 'create', `${recordId ? 'Updated' : 'Created'} ${s.singular}: ${obj.fullName || obj.supporter || obj.opponent || obj.title || obj.description || obj.name || 'Record'}`);
    close();
    render();
    toast(`${s.singular} ${recordId ? 'updated' : 'saved'} successfully.`, 'success');
  });
}

function deleteRecord(key, recordId) {
  if (!canEdit(key)) {
    toast(`Your role does not have permission to delete from ${key}.`, 'error');
    return;
  }
  const row = db[key].find(r => r.id === recordId);
  if (!row) return;
  if (confirm(`Delete this ${SCHEMAS[key].singular.toLowerCase()} record?`)) {
    db[key] = db[key].filter(r => r.id !== recordId);
    saveDB();
    logActivity('delete', `Deleted ${SCHEMAS[key].singular}: ${row.fullName || row.supporter || row.opponent || row.title || row.description || 'Record'}`);
    render();
    toast('Record deleted.');
  }
}

// Exports & Receipts
function exportCSV(key) {
  const s = SCHEMAS[key], rows = db[key];
  if (!s) return;
  const fields = s.fields.map(f => f[0]), heads = s.fields.map(f => f[1]);
  const csv = [heads, ...rows.map(r => fields.map(k => r[k] ?? ''))].map(row => row.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n');
  download(`${key}_daystar_records.csv`, '\ufeff' + csv, 'text/csv;charset=utf-8');
  logActivity('create', `Exported ${s.label} to CSV`);
  toast(`${s.label} CSV exported.`, 'success');
}

function exportJSON() {
  const data = { ...db, application: 'Daystar United FC Management System', schemaVersion: 2, exportedAt: new Date().toISOString() };
  download(`daystar_fc_backup_${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2), 'application/json');
  logActivity('create', 'Downloaded complete system JSON backup');
  toast('Full backup exported.', 'success');
}

function download(name, content, type) {
  const blob = new Blob([content], { type }), url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function restoreBackup(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      if (!incoming || !incoming.profile || !Array.isArray(incoming.players) || !Array.isArray(incoming.contributions)) {
        throw new Error('Not a compatible Daystar backup file.');
      }
      if (!confirm('Restoring replaces all current records in this browser. Continue?')) return;
      const fresh = EMPTY_DB();
      db = { ...fresh, ...incoming, profile: { ...DEFAULT_PROFILE, ...incoming.profile } };
      for (const k of Object.keys(SCHEMAS)) if (!Array.isArray(db[k])) db[k] = [];
      saveDB();
      logActivity('update', 'Restored club database from backup');
      render();
      toast('Backup restored successfully.', 'success');
    } catch (err) {
      toast(err.message || 'Could not restore backup.', 'error');
    } finally {
      e.target.value = '';
    }
  };
  reader.readAsText(file);
}

function printReceipt(recordId) {
  const r = db.contributions.find(x => x.id === recordId);
  if (!r) return;
  const w = window.open('', '_blank', 'width=700,height=750');
  if (!w) {
    toast('Please allow pop-ups to print receipts.', 'error');
    return;
  }
  w.document.write(`
    <!doctype html>
    <html>
    <head>
      <title>Contribution Receipt</title>
      <style>
        body{font:14px Arial,sans-serif;padding:35px;color:#111}
        .head{text-align:center;border-bottom:3px solid #e21d2b;padding-bottom:15px}
        .head img{width:80px;height:80px;object-fit:contain}
        .line{display:flex;justify-content:space-between;gap:25px;border-bottom:1px solid #ddd;padding:12px 0}
        .foot{margin-top:35px;text-align:center;color:#555;font-size:12px}
      </style>
    </head>
    <body>
      <div class="head">
        <img src="assets/daystar-logo.jpg" onerror="this.style.display='none'">
        <h1>${esc(db.profile.clubName)}</h1>
        <p>${esc(db.profile.location)}</p>
        <h2>CONTRIBUTION RECEIPT</h2>
      </div>
      <div class="line"><b>Receipt / Reference</b><span>${esc(r.reference || 'Not provided')}</span></div>
      <div class="line"><b>Date</b><span>${fmtDate(r.date)}</span></div>
      <div class="line"><b>Received from</b><span>${esc(r.supporter)}</span></div>
      <div class="line"><b>Purpose</b><span>${esc(r.purpose)}</span></div>
      <div class="line"><b>Support category</b><span>${esc(r.category)}</span></div>
      <div class="line"><b>Amount pledged</b><span>${fmtMoney(r.amount)}</span></div>
      <div class="line"><b>Amount received</b><strong>${fmtMoney(r.paid)}</strong></div>
      <div class="line"><b>Payment method</b><span>${esc(r.method || '—')}</span></div>
      <div class="line"><b>Received by</b><span>${esc(r.receivedBy || '—')}</span></div>
      <div class="foot">
        <b>Thank you for supporting community football.</b>
        <p>${esc(db.profile.motto)}</p>
      </div>
      <script>window.onload = () => window.print();<\/script>
    </body>
    </html>`);
  w.document.close();
}

/* ==========================================================================
   DAYSTAR YOUTH ACADEMY MANAGEMENT & PROMOTION ENGINE
   ========================================================================== */

function promoteToSenior(academyId) {
  const p = db.academy.find(x => x.id === academyId);
  if (!p) return;

  if (!confirm(`Are you sure you want to promote ${p.fullName} (${p.ageCategory || 'Academy'}) to the Daystar United FC Senior Team?`)) {
    return;
  }

  // Create new senior player
  const seniorPlayer = {
    id: id(),
    fullName: p.fullName,
    playerId: 'DFC-SEN-' + String(db.players.length + 1).padStart(3, '0'),
    jersey: p.jersey || '',
    position: p.position || 'Forward',
    team: 'Senior',
    dob: p.dob || '',
    phone: p.guardianPhone || '',
    joined: new Date().toISOString().slice(0, 10),
    status: 'Active',
    notes: `Promoted from Daystar Youth Academy (${p.ageCategory}). Former Academy ID: ${p.academyId || '—'}.`
  };

  db.players.unshift(seniorPlayer);
  p.status = 'Graduated to Senior';
  saveDB();

  logActivity('update', `Promoted academy scholar ${p.fullName} (${p.ageCategory}) to Daystar United FC Senior Team`);
  toast(`🎉 ${p.fullName} has officially been promoted to the Senior Team!`, 'success');
  render();
}

const ACADEMY_APPS_KEY = 'daystar_academy_applications';

function loadAcademyApplications() {
  try {
    const raw = localStorage.getItem(ACADEMY_APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveAcademyApplications(list) {
  try {
    localStorage.setItem(ACADEMY_APPS_KEY, JSON.stringify(list));
  } catch (e) {}
}

function openAcademyApplicationsModal() {
  const apps = loadAcademyApplications();
  const modal = document.getElementById('modalRoot');

  const rows = apps.length ? apps.map(a => `
    <div style="border:1px solid var(--line);border-radius:8px;padding:12px;margin-bottom:10px;background:#f8fafc">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <strong style="color:var(--navy);font-size:13px">${esc(a.childName)}</strong>
        <span class="badge" style="background:#e0f2fe;color:#0284c7;font-size:10px">${esc(a.category)}</span>
      </div>
      <div style="font-size:11px;color:var(--muted);display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">
        <div>DOB: <b>${esc(a.dob || '—')}</b></div>
        <div>School: <b>${esc(a.school || '—')}</b></div>
        <div>Parent: <b>${esc(a.parentName)}</b> (${esc(a.parentPhone)})</div>
        <div>Village: <b>${esc(a.village || 'Oluko')}</b></div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button type="button" class="btn light red" style="font-size:11px;padding:4px 8px" onclick="deleteAcademyApplication('${a.id}')">Delete</button>
        <button type="button" class="btn red" style="font-size:11px;padding:4px 10px" onclick="admitAcademyApplication('${a.id}')">✓ Approve & Enroll to Academy</button>
      </div>
    </div>
  `).join('') : '<div class="empty-state">No pending online applications. Parents can submit registrations via the public website.</div>';

  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal" style="max-width:650px">
        <div class="modal-head">
          <h3>📩 Public Academy Online Applications</h3>
          <button class="btn light" type="button" onclick="document.getElementById('modalRoot').innerHTML=''">✕ Close</button>
        </div>
        <div style="max-height:65vh;overflow-y:auto;padding-right:4px">
          ${rows}
        </div>
        <div style="margin-top:14px;text-align:right">
          <button class="btn light" type="button" onclick="document.getElementById('modalRoot').innerHTML=''">Close</button>
        </div>
      </section>
    </div>
  `;
}

function admitAcademyApplication(appId) {
  const apps = loadAcademyApplications();
  const a = apps.find(x => x.id === appId);
  if (!a) return;

  const newPlayer = {
    id: id(),
    fullName: a.childName,
    academyId: 'DFA-' + (a.category ? a.category.slice(0, 4) : 'YOUTH') + '-' + String(db.academy.length + 1).padStart(3, '0'),
    ageCategory: a.category || 'U-15 Juniors (Ages 13-15)',
    dob: a.dob || '',
    position: a.position || 'Forward',
    jersey: '',
    school: a.school || 'Alua Primary School',
    guardianName: a.parentName,
    guardianPhone: a.parentPhone,
    village: a.village || 'Oluko Subcounty',
    academicGrade: 'Very Good',
    joined: new Date().toISOString().slice(0, 10),
    status: 'Active Scholar',
    notes: 'Admitted from online public registration.'
  };

  db.academy.unshift(newPlayer);
  saveDB();

  saveAcademyApplications(apps.filter(x => x.id !== appId));
  logActivity('create', `Enrolled online applicant ${a.childName} into Daystar Youth Academy`);
  toast(`${a.childName} enrolled into Daystar Youth Academy!`, 'success');
  openAcademyApplicationsModal();
  render();
}

function deleteAcademyApplication(appId) {
  const apps = loadAcademyApplications();
  saveAcademyApplications(apps.filter(x => x.id !== appId));
  toast('Application removed.', 'info');
  openAcademyApplicationsModal();
}

/* ==========================================================================
   PUBLIC WEBSITE CONTENT MANAGEMENT SYSTEM (CMS) & MEDIA CONTROLS
   Allows Admin to create, upload, edit, delete, and delegate public content
   ========================================================================== */

const PUBLIC_CONTENT_KEY = 'daystar_public_content';

const DEFAULT_PUBLIC_CONTENT_SEED = {
  stories: [
    {
      id: 'story_hero',
      isHero: true,
      tag: 'FEATURED STORY · MATCHDAY PREVIEW',
      badgeClass: 'match',
      category: 'Match Report',
      date: 'Saturday, November 14, 2026',
      author: 'Daystar Media Team',
      location: 'Alua Primary School Playground, Oluko Subcounty, Arua City',
      title: 'DAYSTAR UNITED GEAR UP FOR CRUNCH REGIONAL DERBY AT ALUA PRIMARY SCHOOL PLAYGROUND THIS SATURDAY',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'The Stars are putting the finishing touches to intensive training sessions under Coach Otuti Ronald. With momentum surging after their dramatic 2-1 victory over Nebbi Central, Daystar United FC welcome rival contenders Arua Hill Youth FC in a mouthwatering encounter that promises sparks, passion, and electric community support in Ayivu East.',
      paragraphs: [
        "The atmosphere across Oluko Subcounty and the wider Ayivu East Constituency is electric as Daystar United FC complete preparations for Saturday's high-stakes West Nile Regional League fixture against Arua Hill Youth FC at the Alua Primary School Playground.",
        "Following an exhilarating 2-1 comeback victory over Nebbi Central FC last weekend, the Stars head into this weekend's encounter with momentum on their side and the top spot on the league standings firmly within their grasp.",
        "Head Coach Otuti Ronald put the squad through intensive tactical drills on Thursday morning, focusing on defensive compactness, swift transitions through midfield dynamo Emmanuel Drani, and clinical finishing from top scorer Denis Aliga.",
        "Speaking during the pre-match press conference at the Alua training base, Coach Otuti expressed supreme confidence in the boys while urging utmost focus and discipline:",
        "\"Every game at Alua is a festival of football for our community. We know Arua Hill Youth possess great pace, but our boys have built unmatched stamina and mental fortitude. Our motto is 'NEVER GIVE UP' — regardless of whether we score first or have to dig deep. We invite every supporter across Arua City to paint Alua Navy and Red this Saturday.\"",
        "Club Captain and midfield anchor Ronald Otuti also emphasized the special connection between the players and local supporters:",
        "\"When we step onto the pitch at Alua, we are not just playing for three points; we are playing for the pride of our families, our elders, and every child in Oluko dreaming of a brighter future. We urge everyone to turn up in large numbers and cheer the Stars from the opening whistle to the final whistle.\"",
        "Gates open at 2:00 PM EAT, with kickoff officially scheduled for 4:00 PM EAT. Admission is completely free for local community members."
      ]
    },
    {
      id: 'story_nebbi',
      isHero: false,
      tag: 'MATCH REPORT · FULL TIME',
      badgeClass: 'match',
      category: 'Match Report',
      date: 'Nov 10, 2026',
      author: 'Staff Reporter',
      location: 'Alua Primary School Playground',
      title: 'Thrilling Comeback: Daystar United Edge Out Nebbi Central 2-1 in Nail-Biting Clash',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Two stunning second-half strikes from forward Denis Aliga and midfielder Emmanuel Drani overturned an early deficit to secure maximum points for the home side at Alua Playground.',
      paragraphs: [
        "Daystar United FC demonstrated tremendous grit, character, and tactical resilience to overturn a one-goal deficit and defeat Nebbi Central FC 2-1 in front of a capacity crowd at Alua Playground.",
        "The visitors had taken the lead against the run of play in the 31st minute through Patrick Orombi's glancing header from a set-piece. Nebbi Central subsequently defended deep, attempting to frustrate the Stars throughout the first half.",
        "However, a tactical reshuffle at halftime by the Daystar technical team transformed the contest. The introduction of fresh wingers stretched the Nebbi backline, opening up pockets of space in the attacking third.",
        "In the 74th minute, winger Denis Aliga brought the stadium to its feet with an unstoppable 22-yard curling effort that nestled into the top right corner. The equalizer sent the home supporters into raptures.",
        "With momentum firmly on their side, Daystar poured forward in search of the winner. The breakthrough arrived in the 88th minute when midfielder Emmanuel Drani pounced on a loose ball inside the penalty box following a goalmouth scramble, slotting home with composure.",
        "The referee blew the final whistle after five minutes of stoppage time, securing all three points for Daystar United FC and sending them clear at the summit of the table with 33 points from 14 matches."
      ]
    },
    {
      id: 'story_tech',
      isHero: false,
      tag: 'CLUB ANNOUNCEMENT',
      badgeClass: 'club',
      category: 'Club Announcement',
      date: 'Nov 8, 2026',
      author: 'Club Secretariat',
      location: 'Arua City, Uganda',
      title: 'Daystar United FC Expands Technical Bench & Appoints Youth Development Lead',
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'The Executive Committee has formally bolstered the club\'s technical staff to oversee structured grassroots talent identification across Oluko Subcounty and the wider Ayivu East Constituency.',
      paragraphs: [
        "The Executive Committee of Daystar United Football Club is pleased to announce strategic additions to our technical bench and youth development department ahead of the critical mid-season campaign.",
        "In line with our founding mission as a Community-Based Organisation (CBO) committed to youth empowerment, the club has appointed a dedicated Youth Conditioning and Academy Lead to oversee player development across our junior age categories (U-14, U-17, and developmental reserves).",
        "Club Secretary affirmed that structured training methods, sports science fundamentals, and academic tracking will be integrated into the youth program to ensure young athletes thrive both on the field and in the classroom.",
        "\"Daystar United FC is built on five core pillars: Discipline, Teamwork, Development, Community, and Excellence. Expanding our technical staff gives our talented youngsters from Oluko and Ayivu East the professional coaching framework they deserve.\"",
        "The new coaching staff have already commenced work and will oversee weekend training sessions at Alua Primary School Playground."
      ]
    },
    {
      id: 'story_clinic',
      isHero: false,
      tag: 'COMMUNITY & YOUTH INITIATIVE',
      badgeClass: 'community',
      category: 'Community & Youth',
      date: 'Nov 5, 2026',
      author: 'Community Outreach Desk',
      location: 'Alua Primary School, Ayivu East',
      title: 'Grassroots Outreach: Over 120 Youths Participate in Daystar Football Clinic at Alua',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Inspiring the next generation through sports discipline: Daystar senior players and coaches hosted an uplifting football and life skills clinic for primary pupils in Ayivu East.',
      paragraphs: [
        "More than 120 boys and girls gathered at Alua Primary School Playground on Saturday for a day filled with football instruction, teamwork drills, and leadership mentoring, conducted by Daystar United FC players and officials.",
        "The outreach initiative was organized under the club's Community Social Responsibility (CSR) program, designed to harness the power of football in keeping youths engaged in positive community activities, avoiding antisocial vices, and developing discipline.",
        "Participants were grouped by age brackets and guided through basic dribbling, passing, ball control, and goalkeeping fundamentals. Senior club figures gave motivational talks on perseverance, time management, and the value of education.",
        "In addition to on-pitch coaching, Daystar United FC donated footballs, training bibs, and school exercise books to participating pupils from Alua Primary School and neighboring schools in Oluko.",
        "\"Our club belongs to the community. Every child here has potential, and by investing our time and resources into them today, we are building the leaders and football stars of tomorrow,\" noted the club's community liaison."
      ]
    },
    {
      id: 'story_captain',
      isHero: false,
      tag: 'SQUAD SPOTLIGHT · INTERVIEW',
      badgeClass: 'squad',
      category: 'Squad Spotlight',
      date: 'Nov 2, 2026',
      author: 'Daystar Media Team',
      location: 'Daystar Training Base',
      title: 'Captain\'s Corner: "Our Motto is \'Never Give Up\' — And We Live It Every Single Match"',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Skipper Ronald Otuti shares insights on squad brotherhood, tactical preparation, mental fortitude, and why playing for Daystar United FC is a badge of community pride.',
      paragraphs: [
        "In an intimate sit-down interview, Daystar United FC team captain Ronald Otuti reflected on the journey of the club, the unity inside the dressing room, and their ambitions for the current season.",
        "\"When you look around our dressing room, you see hunger, commitment, and genuine brotherhood. None of us takes the Daystar badge for granted. Many of our boys walk long distances to be on the pitch every single morning because we believe in where this club is heading.\"",
        "Asked about the origins of the club's motto — 'NEVER GIVE UP' — the captain shared a touching perspective on the club's grassroots beginnings in Oluko:",
        "\"We started with very little — just passion, a football, and a bare pitch at Alua. There were times when transport was difficult, or when kit was scarce. But our elders and supporters stood by us. We made a pact that no matter how hard things get, whether we are down a goal or facing life's hardships, Daystar never yields. That mentality defines who we are.\"",
        "The captain concluded with a message to the supporters: \"To our incredible fans across Arua City, we hear your drums, we hear your songs. Keep standing with us, and we will give everything on that pitch to bring honors home.\""
      ]
    },
    {
      id: 'story_paidha',
      isHero: false,
      tag: 'MATCH REPORT · AWAY DAY',
      badgeClass: 'match',
      category: 'Match Report',
      date: 'Oct 28, 2026',
      author: 'Matchday Reporter',
      location: 'Zombo District',
      title: 'Resilient Defense & Clean Sheet Seals Crucial Away Points at Paidha',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'A disciplined tactical showcase saw the Stars repel relentless pressure to emerge 1-0 victors in Zombo district, cementing our position atop the regional standings.',
      paragraphs: [
        "A resolute defensive display propelled Daystar United FC to a hard-fought 1-0 away victory against Paidha Black Angels Dev in a tense West Nile Regional League encounter.",
        "Goalkeeper Alex Koma produced three world-class saves in the first half to keep the hosts at bay amidst fierce pressure and heavy underfoot conditions.",
        "The decisive moment arrived shortly after the restart when midfielder Emmanuel Drani threaded a defense-splitting through pass to Ronald Otuti, who finished with clinical composure past the advancing goalkeeper.",
        "The back four held firm through eight minutes of injury time to claim a memorable clean sheet and all three points on the road, earning widespread praise from travelling supporters."
      ]
    },
    {
      id: 'story_membership',
      isHero: false,
      tag: 'CLUB ANNOUNCEMENT',
      badgeClass: 'club',
      category: 'Club Announcement',
      date: 'Oct 22, 2026',
      author: 'Club Secretariat',
      location: 'Oluko, Arua City',
      title: '2026/2027 Official Fans Membership & Supporters Drive Officially Launched',
      image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Fans across Arua City, West Nile, and the diaspora can now officially register as members, participate in club assemblies, and contribute towards our community sports complex vision.',
      paragraphs: [
        "Daystar United Football Club is thrilled to invite all fans, alumni, business partners, and well-wishers to become officially registered members of the club for the 2026/2027 season.",
        "As a registered Community-Based Organisation, club members enjoy voting privileges at annual general assemblies, receive exclusive club merchandise discounts, and directly support the youth sports academy and equipment fund.",
        "Membership categories have been tailored to cater for every supporter, including Ordinary Supporter, Silver Member, Gold Benefactor, and Corporate Community Patron.",
        "Registration forms and payment details can be obtained at the club secretariat in Oluko or by reaching out to the club's executive committee through official channels."
      ]
    }
  ],
  matchCenter: {
    competition: 'West Nile Regional League · Matchday 15',
    homeTeam: 'Daystar United',
    homeCrest: 'assets/daystar-logo.jpg',
    awayTeam: 'Arua Hill Youth',
    awayAbbr: 'AHY',
    venue: 'Alua Primary School Playground',
    venueSub: 'Oluko Subcounty, Ayivu East, Arua City',
    dateLabel: 'Saturday, Nov 14, 2026 · 4:00 PM EAT',
    targetDate: '2026-11-14T16:00:00'
  },
  latestResult: {
    homeTeam: 'Daystar United FC',
    homeScore: '2',
    awayTeam: 'Nebbi Central FC',
    awayScore: '1',
    scorers: '⚽ D. Aliga 74\', E. Drani 88\' (Daystar) | O. Patrick 31\' (Nebbi)'
  },
  fixtures: [
    { id: 'fix_1', date: 'Nov 14, 2026 · 4:00 PM', homeTeam: 'Daystar United', awayTeam: 'Arua Hill Youth', venue: 'Alua Primary Playground (Home)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { id: 'fix_2', date: 'Nov 21, 2026 · 4:00 PM', homeTeam: 'Onduparaka Junior', awayTeam: 'Daystar United', venue: 'Greenlight Stadium Annex (Away)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { id: 'fix_3', date: 'Nov 28, 2026 · 4:00 PM', homeTeam: 'Daystar United', awayTeam: 'Total FC', venue: 'Alua Primary Playground (Home)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { id: 'fix_4', date: 'Dec 05, 2026 · 4:00 PM', homeTeam: 'Koboko Rising Stars', awayTeam: 'Daystar United', venue: 'Koboko Boma Ground (Away)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { id: 'fix_5', date: 'Nov 10, 2026', homeTeam: 'Daystar United', awayTeam: 'Nebbi Central', score: '2 - 1', venue: 'Alua Primary Playground', comp: 'West Nile Regional League', status: 'Played', scorers: 'D. Aliga 74\', E. Drani 88\'' },
    { id: 'fix_6', date: 'Oct 28, 2026', homeTeam: 'Paidha Black Angels Dev', awayTeam: 'Daystar United', score: '0 - 1', venue: 'Zombo District Ground', comp: 'West Nile Regional League', status: 'Played', scorers: 'R. Otuti 52\'' },
    { id: 'fix_7', date: 'Oct 15, 2026', homeTeam: 'Daystar United', awayTeam: 'Moyo Town Council', score: '3 - 0', venue: 'Alua Primary Playground', comp: 'West Nile Regional League', status: 'Played', scorers: 'D. Aliga 14\', 68\', R. Otuti 81\'' }
  ],
  venueAdmission: {
    title: '🏟️ Match Venue & Supporter Admission',
    venueName: 'Alua Primary School Playground',
    location: 'Oluko Subcounty, Ayivu East Constituency, Arua City',
    description: 'All Daystar United FC home matches are hosted at Alua Primary School Playground in Oluko Subcounty. General admission is free for local community members. Come cheer on the Stars in your navy and red colors!'
  },
  standings: [
    { pos: 1, name: '⭐ Daystar United FC', played: 14, gd: '+18', pts: 33, isHighlight: true },
    { pos: 2, name: 'Onduparaka Junior Team', played: 14, gd: '+15', pts: 31, isHighlight: false },
    { pos: 3, name: 'Paidha Black Angels Dev', played: 14, gd: '+12', pts: 29, isHighlight: false },
    { pos: 4, name: 'Nebbi Central FC', played: 14, gd: '+9', pts: 27, isHighlight: false },
    { pos: 5, name: 'Arua Hill Youth FC', played: 14, gd: '+7', pts: 25, isHighlight: false }
  ],
  squadSpotlight: [
    { name: 'Otuti Ronald', role: 'Forward / Team Captain', number: '10', initials: 'RO', bg: '#071d3b', color: '#ffffff' },
    { name: 'Denis Aliga', role: 'Winger / Vice Captain', number: '7', initials: 'DA', bg: '#fee2e2', color: '#dc2626' },
    { name: 'Emmanuel Drani', role: 'Central Midfielder', number: '8', initials: 'ED', bg: '#e0f2fe', color: '#0284c7' },
    { name: 'Alex Koma', role: 'Goalkeeper', number: '1', initials: 'AK', bg: '#fef3c7', color: '#d97706' }
  ],
  sponsors: [
    '🏛️ Oluko Subcounty Sports Committee',
    '🌾 Ayivu East Farmers & Business Initiative',
    '🏫 Alua Community Education Fund',
    '⚽ West Nile Football Association'
  ]
};

function loadPublicContent() {
  try {
    const raw = localStorage.getItem(PUBLIC_CONTENT_KEY);
    if (!raw) {
      localStorage.setItem(PUBLIC_CONTENT_KEY, JSON.stringify(DEFAULT_PUBLIC_CONTENT_SEED));
      return { ...DEFAULT_PUBLIC_CONTENT_SEED };
    }
    const parsed = JSON.parse(raw);
    return {
      stories: parsed.stories && parsed.stories.length ? parsed.stories : DEFAULT_PUBLIC_CONTENT_SEED.stories,
      matchCenter: parsed.matchCenter || DEFAULT_PUBLIC_CONTENT_SEED.matchCenter,
      latestResult: parsed.latestResult || DEFAULT_PUBLIC_CONTENT_SEED.latestResult,
      fixtures: parsed.fixtures && parsed.fixtures.length ? parsed.fixtures : DEFAULT_PUBLIC_CONTENT_SEED.fixtures,
      venueAdmission: parsed.venueAdmission || DEFAULT_PUBLIC_CONTENT_SEED.venueAdmission,
      standings: parsed.standings || DEFAULT_PUBLIC_CONTENT_SEED.standings,
      squadSpotlight: parsed.squadSpotlight || DEFAULT_PUBLIC_CONTENT_SEED.squadSpotlight,
      sponsors: parsed.sponsors || DEFAULT_PUBLIC_CONTENT_SEED.sponsors
    };
  } catch (e) {
    return { ...DEFAULT_PUBLIC_CONTENT_SEED };
  }
}

function savePublicContent(data) {
  try {
    localStorage.setItem(PUBLIC_CONTENT_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save public content', e);
  }
}

let activeCmsTab = 'stories';

function cmsHTML() {
  if (!canAccessPage('cms')) return accessDeniedHTML();
  const content = loadPublicContent();
  const delegation = loadCmsDelegation();
  const isAdmin = currentUser?.role === 'Admin';

  const storyRows = content.stories.map((s, idx) => {
    const isHero = !!s.isHero;
    return `
      <div class="cms-card">
        <img src="${esc(s.image)}" class="cms-thumb" onerror="this.src='https://via.placeholder.com/60/071d3b/ffffff?text=DFC'">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
            <span class="cms-badge-cat" style="background:#e0f2fe;color:#0284c7">${esc(s.category)}</span>
            ${isHero ? '<span class="cms-badge-hero">⭐ FEATURED BREAKING HERO</span>' : '<span style="font-size:10px;color:var(--muted)">News Card</span>'}
            <small class="muted">📅 ${esc(s.date)} · ✍️ ${esc(s.author || 'Daystar Media')}</small>
          </div>
          <strong style="display:block;font-size:13px;color:var(--navy);margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${esc(s.title)}
          </strong>
          <p style="margin:0;font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${esc(s.excerpt)}
          </p>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          ${!isHero ? `<button class="btn light" style="font-size:11px;padding:5px 8px" title="Set as Breaking Hero on Public Homepage" onclick="setHeroStory('${esc(s.id)}')">⭐ Set Hero</button>` : ''}
          <button class="btn light" style="font-size:11px;padding:5px 8px" onclick="openStoryModal('${esc(s.id)}')">✏️ Edit</button>
          <button class="btn red light" style="font-size:11px;padding:5px 8px" onclick="deleteStory('${esc(s.id)}')">🗑️ Delete</button>
        </div>
      </div>
    `;
  }).join('');

  const mc = content.matchCenter;
  const lr = content.latestResult;

  const standingsRows = content.standings.map((st, i) => `
    <tr>
      <td><input type="number" class="st-pos" value="${st.pos}" style="width:40px;padding:3px;text-align:center"></td>
      <td><input type="text" class="st-name" value="${esc(st.name)}" style="width:100%;padding:3px"></td>
      <td><input type="number" class="st-played" value="${st.played}" style="width:45px;padding:3px;text-align:center"></td>
      <td><input type="text" class="st-gd" value="${esc(st.gd)}" style="width:50px;padding:3px;text-align:center"></td>
      <td><input type="number" class="st-pts" value="${st.pts}" style="width:45px;padding:3px;text-align:center;font-weight:bold"></td>
      <td style="text-align:center"><input type="checkbox" class="st-highlight" ${st.isHighlight ? 'checked' : ''}></td>
      <td style="text-align:center"><button type="button" class="btn light" style="padding:2px 6px;font-size:10px" onclick="this.closest('tr').remove()">✕</button></td>
    </tr>
  `).join('');

  const squadCards = content.squadSpotlight.map((p, idx) => `
    <div style="border:1px solid var(--line);border-radius:8px;padding:12px;background:#f8fafc">
      <div style="font-size:11px;font-weight:800;color:var(--navy);margin-bottom:8px">PLAYER SPOTLIGHT #${idx+1}</div>
      <div class="field" style="margin-bottom:6px">
        <label style="font-size:10px">Player Name</label>
        <input type="text" class="sq-name" value="${esc(p.name)}" required style="font-size:12px;padding:5px">
      </div>
      <div class="field" style="margin-bottom:6px">
        <label style="font-size:10px">Position / Role</label>
        <input type="text" class="sq-role" value="${esc(p.role)}" required style="font-size:12px;padding:5px">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div class="field">
          <label style="font-size:10px">Jersey #</label>
          <input type="text" class="sq-number" value="${esc(p.number)}" style="font-size:12px;padding:5px">
        </div>
        <div class="field">
          <label style="font-size:10px">Initials</label>
          <input type="text" class="sq-initials" value="${esc(p.initials)}" style="font-size:12px;padding:5px">
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="page-heading">
      <div>
        <h2>Website & Media CMS</h2>
        <p class="muted">Full admin and editorial control over the public club website (<a href="index.html" target="_blank" style="color:var(--navy);font-weight:700">index.html</a>). Publish breaking news, update live scores, and delegate content authority.</p>
      </div>
      <div class="heading-actions">
        <a href="index.html" target="_blank" class="btn blue" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
          <span>🌐 View Public Site ↗</span>
        </a>
        <button class="btn red" id="openCreateStoryTopBtn">+ Create & Publish Story</button>
      </div>
    </div>

    <!-- CMS Tab Navigation -->
    <div class="cms-nav-tabs">
      <button type="button" class="cms-tab-btn ${activeCmsTab==='stories'?'active':''}" data-cmstab="stories">📰 Club Stories & Articles (${content.stories.length})</button>
      <button type="button" class="cms-tab-btn ${activeCmsTab==='match'?'active':''}" data-cmstab="match">⚽ Match Center, Fixtures & Results</button>
      <button type="button" class="cms-tab-btn ${activeCmsTab==='standings'?'active':''}" data-cmstab="standings">🏆 League Standings</button>
      <button type="button" class="cms-tab-btn ${activeCmsTab==='squad'?'active':''}" data-cmstab="squad">👥 Squad Spotlight</button>
      ${isAdmin ? `<button type="button" class="cms-tab-btn ${activeCmsTab==='delegation'?'active':''}" data-cmstab="delegation">🛡️ Upload & Content Delegation</button>` : ''}
    </div>

    <!-- TAB 1: Stories & News Hub -->
    <div id="cmsTabStories" style="${activeCmsTab==='stories'?'':'display:none'}">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>Published Club Articles & Match Reports</h3>
            <div class="panel-sub">Stories are published instantly to the public website with interactive categories and reading modal.</div>
          </div>
          <button class="btn red" id="openCreateStoryInnerBtn">+ Publish New Story</button>
        </div>
        <div style="margin-top:14px">
          ${storyRows}
        </div>
      </div>
    </div>

    <!-- TAB 2: Match Center, Fixtures & Results -->
    <div id="cmsTabMatch" style="${activeCmsTab==='match'?'':'display:none'}">
      
      <!-- Panel 1: Featured Matchday Countdown Clock -->
      <form id="matchCenterForm">
        <div class="panel">
          <div class="panel-head">
            <div>
              <h3>⚽ 1. Featured Matchday Countdown (Hero Banner on Public Site)</h3>
              <div class="panel-sub">Configures the next match banner, teams, kickoff date, and live countdown clock on the homepage and <a href="fixtures.html" target="_blank" style="color:var(--navy);font-weight:700">fixtures.html</a>.</div>
            </div>
            <button type="submit" class="btn red">Save Matchday Countdown</button>
          </div>
          <div class="form-grid" style="margin-top:14px">
            <div class="field">
              <label>Matchday Round / Badge *</label>
              <input type="text" id="mcBadge" value="${esc(mc.badge || 'MATCHDAY 15')}" required placeholder="e.g. MATCHDAY 15">
            </div>
            <div class="field">
              <label>Competition Name *</label>
              <input type="text" id="mcComp" value="${esc(mc.competition)}" required placeholder="e.g. West Nile Regional League · Matchday 15">
            </div>
            <div class="field">
              <label>Home Team *</label>
              <input type="text" id="mcHome" value="${esc(mc.homeTeam)}" required>
            </div>
            <div class="field">
              <label>Away Opponent Team *</label>
              <input type="text" id="mcAway" value="${esc(mc.awayTeam)}" required placeholder="e.g. Arua Hill Youth">
            </div>
            <div class="field">
              <label>Away Team Abbreviation / Initials *</label>
              <input type="text" id="mcAwayAbbr" value="${esc(mc.awayAbbr)}" required placeholder="e.g. AHY">
            </div>
            <div class="field">
              <label>Match Venue *</label>
              <input type="text" id="mcVenue" value="${esc(mc.venue)}" required placeholder="Alua Primary School Playground">
            </div>
            <div class="field full">
              <label>Venue Subcounty, Constituency & City</label>
              <input type="text" id="mcVenueSub" value="${esc(mc.venueSub)}" placeholder="Oluko Subcounty, Ayivu East, Arua City">
            </div>
            <div class="field">
              <label>Kickoff Display String *</label>
              <input type="text" id="mcDateLabel" value="${esc(mc.dateLabel)}" required placeholder="Saturday, Nov 14, 2026 · 4:00 PM EAT">
            </div>
            <div class="field">
              <label>Countdown Target Date & Time (ISO/Local) *</label>
              <input type="datetime-local" id="mcTargetDate" value="${mc.targetDate ? mc.targetDate.slice(0, 16) : ''}" required>
            </div>
          </div>
          <div style="margin-top:14px;text-align:right">
            <button type="submit" class="btn red">Save Matchday Countdown & Timer</button>
          </div>
        </div>
      </form>

      <!-- Panel 2: Upcoming Fixtures Schedule -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>📅 2. Upcoming Fixtures Schedule (fixtures.html)</h3>
            <div class="panel-sub">Manage the list of scheduled season fixtures displayed under "Upcoming Fixtures" on the public website.</div>
          </div>
          <button type="button" class="btn red" onclick="openFixtureModal()">＋ Add Upcoming Fixture</button>
        </div>
        <div style="margin-top:14px">
          ${(content.fixtures || []).filter(f => f.status === 'Upcoming').length ? `
            <div style="display:flex;flex-direction:column;gap:10px">
              ${(content.fixtures || []).filter(f => f.status === 'Upcoming').map(f => `
                <div class="cms-card" style="align-items:center;padding:12px 14px">
                  <div style="width:140px;flex-shrink:0">
                    <b style="font-size:12px;color:var(--navy);display:block">🗓️ ${esc(f.date)}</b>
                    <small style="font-size:10px;color:var(--muted)">${esc(f.comp)}</small>
                  </div>
                  <div style="flex:1;min-width:0;padding:0 10px">
                    <b style="font-size:14px;color:var(--navy)">${esc(f.homeTeam)} <span style="background:var(--red);color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;margin:0 4px">VS</span> ${esc(f.awayTeam)}</b>
                    <div style="font-size:11px;color:var(--muted);margin-top:2px">📍 ${esc(f.venue)}</div>
                  </div>
                  <div style="display:flex;gap:6px;flex-shrink:0">
                    <button type="button" class="btn light small" onclick="openFixtureModal('${esc(f.id)}')">✏️ Edit</button>
                    <button type="button" class="btn blue light small" onclick="markFixtureAsPlayed('${esc(f.id)}')">✅ Enter Score</button>
                    <button type="button" class="btn red light small" onclick="deleteFixture('${esc(f.id)}')">🗑️</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">No upcoming fixtures scheduled. Click <b>"＋ Add Upcoming Fixture"</b> to add one.</div>
          `}
        </div>
      </div>

      <!-- Panel 3: Recent Match Results & Scorecards -->
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>🏁 3. Recent Match Results & Scorecards (fixtures.html)</h3>
            <div class="panel-sub">Manage completed match scorecards, final goals, and goalscorers displayed on the public site.</div>
          </div>
          <button type="button" class="btn red" onclick="openResultModal()">＋ Add Match Result / Scorecard</button>
        </div>
        <div style="margin-top:14px">
          ${(content.fixtures || []).filter(f => f.status === 'Played').length ? `
            <div style="display:flex;flex-direction:column;gap:10px">
              ${(content.fixtures || []).filter(f => f.status === 'Played').map(f => `
                <div class="cms-card" style="align-items:center;padding:12px 14px">
                  <div style="width:110px;flex-shrink:0">
                    <b style="font-size:12px;color:var(--navy);display:block">📅 ${esc(f.date)}</b>
                    <span style="font-size:10px;background:#fef3c7;color:#b45309;padding:2px 6px;border-radius:3px;font-weight:700">FULL TIME</span>
                  </div>
                  <div style="flex:1;min-width:0;padding:0 10px">
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                      <b style="font-size:14px;color:var(--navy)">${esc(f.homeTeam)}</b>
                      <span style="background:var(--red);color:#fff;font-size:13px;font-weight:900;padding:2px 8px;border-radius:4px">${esc(f.score || '0 - 0')}</span>
                      <b style="font-size:14px;color:var(--navy)">${esc(f.awayTeam)}</b>
                    </div>
                    <div style="font-size:11px;color:var(--muted);margin-top:3px">
                      ⚽ <b>${esc(f.scorers || 'Match concluded')}</b> · 📍 ${esc(f.venue)}
                    </div>
                  </div>
                  <div style="display:flex;gap:6px;flex-shrink:0">
                    <button type="button" class="btn light small" onclick="openResultModal('${esc(f.id)}')">✏️ Edit</button>
                    <button type="button" class="btn red light small" onclick="deleteFixture('${esc(f.id)}')">🗑️</button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">No match results recorded yet. Click <b>"＋ Add Match Result / Scorecard"</b> to add one.</div>
          `}
        </div>
      </div>

      <!-- Panel 4: Match Venue & Supporter Admission Notice -->
      <form id="venueAdmissionForm" onsubmit="event.preventDefault(); saveVenueAdmissionForm();">
        <div class="panel">
          <div class="panel-head">
            <div>
              <h3>🏟️ 4. Match Venue & Supporter Admission Notice (Bottom of fixtures.html)</h3>
              <div class="panel-sub">Edit the venue guidance and admission details shown to supporters at the bottom of the fixtures page.</div>
            </div>
            <button type="submit" class="btn red">Save Admission Notice</button>
          </div>
          <div class="form-grid" style="margin-top:14px">
            <div class="field">
              <label>Notice Heading / Title *</label>
              <input type="text" id="vaTitle" value="${esc(content.venueAdmission?.title || '🏟️ Match Venue & Supporter Admission')}" required>
            </div>
            <div class="field">
              <label>Home Ground Venue Name *</label>
              <input type="text" id="vaVenueName" value="${esc(content.venueAdmission?.venueName || 'Alua Primary School Playground')}" required>
            </div>
            <div class="field full">
              <label>Ground Location / Subcounty</label>
              <input type="text" id="vaLocation" value="${esc(content.venueAdmission?.location || 'Oluko Subcounty, Ayivu East Constituency, Arua City')}" required>
            </div>
            <div class="field full">
              <label>Supporter Guidance & Admission Description *</label>
              <textarea id="vaDesc" rows="3" required>${esc(content.venueAdmission?.description || 'All Daystar United FC home matches are hosted at Alua Primary School Playground in Oluko Subcounty. General admission is free for local community members. Come cheer on the Stars in your navy and red colors!')}</textarea>
            </div>
          </div>
          <div style="margin-top:14px;text-align:right">
            <button type="submit" class="btn red">Save Venue & Admission Notice</button>
          </div>
        </div>
      </form>

    </div>

    <!-- TAB 3: League Standings Table -->
    <div id="cmsTabStandings" style="${activeCmsTab==='standings'?'':'display:none'}">
      <div class="panel">
        <div class="panel-head">
          <div>
            <h3>🏆 Public League Table / Standings</h3>
            <div class="panel-sub">Directly edit the league standings table shown to fans on the public website.</div>
          </div>
          <div style="display:flex;gap:8px">
            <button type="button" class="btn light" id="btnAddStandingRow">+ Add Team Row</button>
            <button type="button" class="btn red" id="btnSaveStandings">Save League Table</button>
          </div>
        </div>
        <div class="table-wrap" style="margin-top:14px">
          <table class="data-table" id="cmsStandingsTable">
            <thead>
              <tr>
                <th style="width:50px">Pos</th>
                <th>Club Name</th>
                <th style="width:60px">Played</th>
                <th style="width:65px">GD</th>
                <th style="width:60px">Pts</th>
                <th style="width:80px;text-align:center">Highlight</th>
                <th style="width:50px;text-align:center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${standingsRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 4: Squad Spotlight -->
    <div id="cmsTabSquad" style="${activeCmsTab==='squad'?'':'display:none'}">
      <form id="squadSpotlightForm">
        <div class="panel">
          <div class="panel-head">
            <div>
              <h3>👥 Public Squad Spotlight (Key Players)</h3>
              <div class="panel-sub">Showcase 4 key first-team players prominently on the public homepage.</div>
            </div>
            <button type="submit" class="btn red">Save Squad Spotlight</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:14px" id="squadSpotlightMount">
            ${squadCards}
          </div>
          <div style="margin-top:16px;text-align:right">
            <button type="submit" class="btn red">Save Squad Spotlight</button>
          </div>
        </div>
      </form>
    </div>

    <!-- TAB 5: Content Control Delegation (Admin Only) -->
    ${isAdmin ? `
    <div id="cmsTabDelegation" style="${activeCmsTab==='delegation'?'':'display:none'}">
      <form id="cmsDelegationForm">
        <div class="panel">
          <div class="panel-head">
            <div>
              <h3>🛡️ Content Creation & Upload Access Delegation</h3>
              <div class="panel-sub">As Super Admin / CEO, you have authority to assign upload and content editing rights to other officials.</div>
            </div>
            <button type="submit" class="btn red">Save Delegation Settings</button>
          </div>
          <div style="margin-top:16px;display:grid;gap:14px">
            <div style="padding:14px;background:#f8fafc;border:1px solid var(--line);border-radius:8px">
              <label style="display:flex;align-items:center;gap:10px;font-weight:700;cursor:pointer">
                <input type="checkbox" checked disabled>
                <span>👑 Super Admin / CEO (admin) — Permanent Master Content Authority</span>
              </label>
              <p style="margin:4px 0 0 24px;font-size:11px;color:var(--muted)">Has full unconstrained authority to publish, edit, delete, upload images, and delegate access.</p>
            </div>

            <div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:8px">
              <label style="display:flex;align-items:center;gap:10px;font-weight:700;cursor:pointer">
                <input type="checkbox" id="delSecretary" ${delegation.allowSecretary ? 'checked' : ''}>
                <span>📋 Secretary General (secretary) — Allow News & Announcement Publishing</span>
              </label>
              <p style="margin:4px 0 0 24px;font-size:11px;color:var(--muted)">Grants the Secretary General access to this CMS module to create stories, publish club announcements, and upload photos.</p>
            </div>

            <div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:8px">
              <label style="display:flex;align-items:center;gap:10px;font-weight:700;cursor:pointer">
                <input type="checkbox" id="delManager" ${delegation.allowManager ? 'checked' : ''}>
                <span>⚽ Team Manager / Coach (manager) — Allow Match Reports & Squad Spotlight Control</span>
              </label>
              <p style="margin:4px 0 0 24px;font-size:11px;color:var(--muted)">Grants the Head Coach / Manager access to write match reports, update live results, and select featured squad players.</p>
            </div>

            <div style="padding:14px;background:#fff;border:1px solid var(--line);border-radius:8px">
              <label style="display:flex;align-items:center;gap:10px;font-weight:700;cursor:pointer">
                <input type="checkbox" id="delTreasurer" ${delegation.allowTreasurer ? 'checked' : ''}>
                <span>💰 Treasurer (treasurer) — Allow Sponsorship & Partner Announcements</span>
              </label>
              <p style="margin:4px 0 0 24px;font-size:11px;color:var(--muted)">Grants the Treasurer authority to post community donation drives and manage sponsor credits.</p>
            </div>
          </div>
          <div style="margin-top:20px;text-align:right">
            <button type="submit" class="btn red">Save & Apply Content Delegation</button>
          </div>
        </div>
      </form>
    </div>` : ''}
  `;
}

function wireCmsPage() {
  // Tab switching
  document.querySelectorAll('.cms-tab-btn').forEach(btn => {
    btn.onclick = () => {
      activeCmsTab = btn.dataset.cmstab;
      render();
    };
  });

  // Top and inner Publish story buttons
  const openCreateBtn1 = document.getElementById('openCreateStoryTopBtn');
  const openCreateBtn2 = document.getElementById('openCreateStoryInnerBtn');
  if (openCreateBtn1) openCreateBtn1.onclick = () => openStoryModal();
  if (openCreateBtn2) openCreateBtn2.onclick = () => openStoryModal();

  // Match Center form
  const mcForm = document.getElementById('matchCenterForm');
  if (mcForm) {
    mcForm.onsubmit = (e) => {
      e.preventDefault();
      saveMatchCenterForm();
    };
  }

  // Standings table actions
  const btnAddRow = document.getElementById('btnAddStandingRow');
  if (btnAddRow) {
    btnAddRow.onclick = () => {
      const tbody = document.querySelector('#cmsStandingsTable tbody');
      if (tbody) {
        const nextPos = tbody.querySelectorAll('tr').length + 1;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><input type="number" class="st-pos" value="${nextPos}" style="width:40px;padding:3px;text-align:center"></td>
          <td><input type="text" class="st-name" value="New Club FC" style="width:100%;padding:3px"></td>
          <td><input type="number" class="st-played" value="14" style="width:45px;padding:3px;text-align:center"></td>
          <td><input type="text" class="st-gd" value="+0" style="width:50px;padding:3px;text-align:center"></td>
          <td><input type="number" class="st-pts" value="15" style="width:45px;padding:3px;text-align:center;font-weight:bold"></td>
          <td style="text-align:center"><input type="checkbox" class="st-highlight"></td>
          <td style="text-align:center"><button type="button" class="btn light" style="padding:2px 6px;font-size:10px" onclick="this.closest('tr').remove()">✕</button></td>
        `;
        tbody.appendChild(tr);
      }
    };
  }

  const btnSaveStandings = document.getElementById('btnSaveStandings');
  if (btnSaveStandings) {
    btnSaveStandings.onclick = () => saveStandingsForm();
  }

  // Squad Spotlight form
  const sqForm = document.getElementById('squadSpotlightForm');
  if (sqForm) {
    sqForm.onsubmit = (e) => {
      e.preventDefault();
      saveSquadSpotlightForm();
    };
  }

  // Delegation form
  const delForm = document.getElementById('cmsDelegationForm');
  if (delForm) {
    delForm.onsubmit = (e) => {
      e.preventDefault();
      saveCmsDelegationForm();
    };
  }
}

// Story Modal: Create or Edit Article with Image File Upload or URL
function openStoryModal(storyId = null) {
  const content = loadPublicContent();
  const story = storyId ? content.stories.find(s => s.id === storyId) : null;
  const isEdit = !!story;

  const modal = document.getElementById('modalRoot');
  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal" style="max-width:680px">
        <div class="modal-head">
          <h3>${isEdit ? '✏️ Edit Public Story / Article' : '📰 Publish New Story to Public Website'}</h3>
          <button class="btn light" type="button" id="closeCmsModal">✕ Close</button>
        </div>
        <form id="storyModalForm">
          <div class="notice" style="margin-bottom:14px">
            <b>Public Website Publisher:</b> Articles saved here appear immediately on Daystar United FC's public news homepage.
          </div>
          <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:12px">
            <div class="field full">
              <label>Article Headline / Title *</label>
              <input type="text" id="storyTitle" value="${esc(story?.title || '')}" required placeholder="Enter compelling headline">
            </div>

            <div class="field">
              <label>News Category *</label>
              <select id="storyCategory" required>
                <option value="Match Report" ${story?.category === 'Match Report' ? 'selected' : ''}>Match Report</option>
                <option value="Club Announcement" ${story?.category === 'Club Announcement' ? 'selected' : ''}>Club Announcement</option>
                <option value="Community & Youth" ${story?.category === 'Community & Youth' ? 'selected' : ''}>Community & Youth</option>
                <option value="Squad Spotlight" ${story?.category === 'Squad Spotlight' ? 'selected' : ''}>Squad Spotlight</option>
              </select>
            </div>

            <div class="field">
              <label>Author / Byline *</label>
              <input type="text" id="storyAuthor" value="${esc(story?.author || (currentUser?.fullName || 'Daystar Media Team'))}" required>
            </div>

            <div class="field">
              <label>Match / Story Location</label>
              <input type="text" id="storyLocation" value="${esc(story?.location || 'Alua Primary School Playground, Oluko')}" placeholder="e.g. Alua Primary School Playground">
            </div>

            <div class="field">
              <label>Publication Date Display</label>
              <input type="text" id="storyDate" value="${esc(story?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))}" required>
            </div>

            <div class="field full">
              <label style="display:flex;align-items:center;gap:8px;font-weight:700;color:var(--navy);cursor:pointer">
                <input type="checkbox" id="storyIsHero" ${story?.isHero ? 'checked' : ''}>
                <span>⭐ Set as Featured Breaking Hero Story on Public Homepage</span>
              </label>
            </div>

            <!-- Image Upload or Image URL -->
            <div class="field full">
              <label>Featured Image (Upload file from device or provide Image URL) *</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px">
                <div>
                  <small style="display:block;margin-bottom:4px;color:var(--muted)">Option A: Upload Image File</small>
                  <input type="file" id="storyImageFile" accept="image/*" style="font-size:11px">
                </div>
                <div>
                  <small style="display:block;margin-bottom:4px;color:var(--muted)">Option B: Image Web URL</small>
                  <input type="url" id="storyImageUrl" value="${esc(story?.image || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop')}" required placeholder="https://...">
                </div>
              </div>
              <div class="img-preview-box">
                <small style="display:block;margin-bottom:6px;font-weight:700;color:var(--muted)">Live Image Preview</small>
                <img id="storyImagePreview" src="${esc(story?.image || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop')}" style="max-height:140px;margin:0 auto;border-radius:6px;object-fit:cover;display:block">
              </div>
            </div>

            <div class="field full">
              <label>Short Excerpt (Displayed on news cards) *</label>
              <textarea id="storyExcerpt" rows="2" required placeholder="Brief 1-2 sentence summary">${esc(story?.excerpt || '')}</textarea>
            </div>

            <div class="field full">
              <label>Full Article Body (Separated by empty lines for paragraphs) *</label>
              <textarea id="storyParagraphs" rows="6" required placeholder="Enter full story content. Hit enter twice between paragraphs to create neat reader paragraphs.">${esc(Array.isArray(story?.paragraphs) ? story.paragraphs.join('\n\n') : (story?.paragraphs || story?.excerpt || ''))}</textarea>
            </div>
          </div>

          <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px">
            <button type="button" class="btn light" id="cancelCmsModal">Cancel</button>
            <button type="submit" class="btn red">${isEdit ? 'Save Story Changes' : 'Publish to Public Website'}</button>
          </div>
        </form>
      </section>
    </div>
  `;

  const closeBtn = document.getElementById('closeCmsModal');
  const cancelBtn = document.getElementById('cancelCmsModal');
  const closeModalFn = () => modal.innerHTML = '';
  if (closeBtn) closeBtn.onclick = closeModalFn;
  if (cancelBtn) cancelBtn.onclick = closeModalFn;

  // Live image preview & file reader
  const imgUrlInput = document.getElementById('storyImageUrl');
  const imgFileInput = document.getElementById('storyImageFile');
  const imgPreview = document.getElementById('storyImagePreview');

  if (imgUrlInput && imgPreview) {
    imgUrlInput.oninput = () => {
      imgPreview.src = imgUrlInput.value || 'https://via.placeholder.com/600x300/071d3b/ffffff?text=Daystar+FC';
    };
  }

  if (imgFileInput && imgPreview && imgUrlInput) {
    imgFileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          imgUrlInput.value = ev.target.result;
          imgPreview.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  }

  // Handle Form Submit
  const form = document.getElementById('storyModalForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('storyTitle').value.trim();
      const category = document.getElementById('storyCategory').value;
      const author = document.getElementById('storyAuthor').value.trim();
      const location = document.getElementById('storyLocation').value.trim();
      const date = document.getElementById('storyDate').value.trim();
      const isHero = document.getElementById('storyIsHero').checked;
      const image = document.getElementById('storyImageUrl').value.trim();
      const excerpt = document.getElementById('storyExcerpt').value.trim();
      const rawBody = document.getElementById('storyParagraphs').value.trim();

      const paragraphs = rawBody.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

      let badgeClass = 'match';
      if (category.includes('Announcement')) badgeClass = 'club';
      else if (category.includes('Community')) badgeClass = 'community';
      else if (category.includes('Squad')) badgeClass = 'squad';

      const contentData = loadPublicContent();

      if (isHero) {
        // If this story is hero, unset hero flag on all other stories
        contentData.stories.forEach(s => s.isHero = false);
      }

      if (isEdit) {
        const targetStory = contentData.stories.find(s => s.id === storyId);
        if (targetStory) {
          targetStory.title = title;
          targetStory.category = category;
          targetStory.badgeClass = badgeClass;
          targetStory.author = author;
          targetStory.location = location;
          targetStory.date = date;
          targetStory.isHero = isHero;
          targetStory.image = image;
          targetStory.excerpt = excerpt;
          targetStory.paragraphs = paragraphs;
        }
        logActivity('update', `Updated public story: "${title}"`);
        toast('Story updated successfully on the public website!', 'success');
      } else {
        const newStory = {
          id: 'story_' + Date.now(),
          title,
          category,
          badgeClass,
          author,
          location,
          date,
          isHero,
          image,
          excerpt,
          paragraphs
        };
        contentData.stories.unshift(newStory);
        logActivity('create', `Published new public story: "${title}"`);
        toast('New story published to the public website!', 'success');
      }

      savePublicContent(contentData);
      closeModalFn();
      render();
    };
  }
}

// Set a story as the Breaking Hero story
function setHeroStory(storyId) {
  const content = loadPublicContent();
  const target = content.stories.find(s => s.id === storyId);
  if (!target) return;

  content.stories.forEach(s => s.isHero = false);
  target.isHero = true;

  savePublicContent(content);
  logActivity('update', `Set "${target.title}" as Breaking Hero banner on public site`);
  toast(`"${target.title}" is now the Featured Breaking Story on the homepage!`, 'success');
  render();
}

// Delete a story with confirmation
function deleteStory(storyId) {
  const content = loadPublicContent();
  const target = content.stories.find(s => s.id === storyId);
  if (!target) return;

  if (confirm(`Are you sure you want to delete the story: "${target.title}" from the public website?`)) {
    content.stories = content.stories.filter(s => s.id !== storyId);
    if (target.isHero && content.stories.length > 0) {
      content.stories[0].isHero = true;
    }
    savePublicContent(content);
    logActivity('delete', `Deleted story from public website: "${target.title}"`);
    toast('Story removed from public website.', 'info');
    render();
  }
}

// Save Match Center Form
function saveMatchCenterForm() {
  const content = loadPublicContent();
  const badgeEl = document.getElementById('mcBadge');

  content.matchCenter = {
    badge: badgeEl ? badgeEl.value.trim() : 'MATCHDAY 15',
    competition: document.getElementById('mcComp').value.trim(),
    homeTeam: document.getElementById('mcHome').value.trim(),
    homeCrest: 'assets/daystar-logo.jpg',
    awayTeam: document.getElementById('mcAway').value.trim(),
    awayAbbr: document.getElementById('mcAwayAbbr').value.trim().toUpperCase(),
    venue: document.getElementById('mcVenue').value.trim(),
    venueSub: document.getElementById('mcVenueSub').value.trim(),
    dateLabel: document.getElementById('mcDateLabel').value.trim(),
    targetDate: document.getElementById('mcTargetDate').value
  };

  savePublicContent(content);
  logActivity('update', `Updated public featured matchday countdown: vs ${content.matchCenter.awayTeam}`);
  toast('Featured Matchday Countdown & Timer updated on public website!', 'success');
  render();
}

// 1. Fixture Modal (Add or Edit upcoming fixture)
function openFixtureModal(fixtureId = null) {
  const content = loadPublicContent();
  const f = fixtureId ? (content.fixtures || []).find(x => x.id === fixtureId) : null;
  const isEdit = !!f;

  const modal = document.getElementById('modalRoot');
  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal" style="max-width:540px">
        <div class="modal-head">
          <h3>${isEdit ? '✏️ Edit Upcoming Fixture' : '📅 Schedule New Upcoming Fixture'}</h3>
          <button class="btn light" type="button" id="closeFixtureModal">✕ Close</button>
        </div>
        <form id="fixtureModalForm">
          <div class="notice" style="margin-bottom:14px">
            <b>Public Fixtures Schedule:</b> Fixtures saved here appear under "Upcoming Fixtures" on <a href="fixtures.html" target="_blank" style="color:var(--navy);font-weight:700">fixtures.html</a>.
          </div>
          <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:12px">
            <div class="field full">
              <label>Match Date & Kickoff Time *</label>
              <input type="text" id="fixDate" value="${esc(f?.date || '')}" required placeholder="e.g. Nov 28, 2026 · 4:00 PM">
            </div>
            <div class="field full">
              <label>Competition Name *</label>
              <input type="text" id="fixComp" value="${esc(f?.comp || 'West Nile Regional League')}" required>
            </div>
            <div class="field">
              <label>Home Team *</label>
              <input type="text" id="fixHome" value="${esc(f?.homeTeam || 'Daystar United')}" required>
            </div>
            <div class="field">
              <label>Away Team *</label>
              <input type="text" id="fixAway" value="${esc(f?.awayTeam || '')}" required placeholder="e.g. Total FC">
            </div>
            <div class="field full">
              <label>Venue (e.g. Pitch name & Home/Away tag) *</label>
              <input type="text" id="fixVenue" value="${esc(f?.venue || 'Alua Primary Playground (Home)')}" required>
            </div>
          </div>
          <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px">
            <button type="button" class="btn light" id="cancelFixtureModal">Cancel</button>
            <button type="submit" class="btn red">${isEdit ? 'Save Changes' : 'Add to Public Fixtures'}</button>
          </div>
        </form>
      </section>
    </div>
  `;

  const closeFn = () => modal.innerHTML = '';
  document.getElementById('closeFixtureModal').onclick = closeFn;
  document.getElementById('cancelFixtureModal').onclick = closeFn;

  document.getElementById('fixtureModalForm').onsubmit = (e) => {
    e.preventDefault();
    const contentData = loadPublicContent();
    if (!contentData.fixtures) contentData.fixtures = [];

    const fixObj = {
      id: f?.id || 'fix_' + Date.now(),
      date: document.getElementById('fixDate').value.trim(),
      comp: document.getElementById('fixComp').value.trim(),
      homeTeam: document.getElementById('fixHome').value.trim(),
      awayTeam: document.getElementById('fixAway').value.trim(),
      venue: document.getElementById('fixVenue').value.trim(),
      status: 'Upcoming'
    };

    if (isEdit) {
      const idx = contentData.fixtures.findIndex(x => x.id === f.id);
      if (idx !== -1) contentData.fixtures[idx] = fixObj;
      logActivity('update', `Updated fixture: ${fixObj.homeTeam} vs ${fixObj.awayTeam}`);
      toast('Fixture updated successfully on public site!', 'success');
    } else {
      contentData.fixtures.unshift(fixObj);
      logActivity('create', `Scheduled new upcoming fixture: ${fixObj.homeTeam} vs ${fixObj.awayTeam}`);
      toast('New fixture added to public schedule!', 'success');
    }

    savePublicContent(contentData);
    closeFn();
    render();
  };
}

// 2. Result Modal (Add or Edit match result scorecard)
function openResultModal(resultId = null) {
  const content = loadPublicContent();
  const f = resultId ? (content.fixtures || []).find(x => x.id === resultId) : null;
  const isEdit = !!f;

  const modal = document.getElementById('modalRoot');
  modal.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <section class="modal" style="max-width:560px">
        <div class="modal-head">
          <h3>${isEdit ? '✏️ Edit Match Result & Scorecard' : '🏁 Publish New Match Result & Scorecard'}</h3>
          <button class="btn light" type="button" id="closeResultModal">✕ Close</button>
        </div>
        <form id="resultModalForm">
          <div class="notice" style="margin-bottom:14px">
            <b>Public Results & Scorecards:</b> Results saved here appear under "Recent Match Results" on <a href="fixtures.html" target="_blank" style="color:var(--navy);font-weight:700">fixtures.html</a> and the homepage sidebar.
          </div>
          <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:12px">
            <div class="field">
              <label>Match Date *</label>
              <input type="text" id="resDate" value="${esc(f?.date || '')}" required placeholder="e.g. Nov 10, 2026">
            </div>
            <div class="field">
              <label>Competition *</label>
              <input type="text" id="resComp" value="${esc(f?.comp || 'West Nile Regional League')}" required>
            </div>
            <div class="field">
              <label>Home Team *</label>
              <input type="text" id="resHome" value="${esc(f?.homeTeam || 'Daystar United')}" required>
            </div>
            <div class="field">
              <label>Away Team *</label>
              <input type="text" id="resAway" value="${esc(f?.awayTeam || '')}" required placeholder="e.g. Nebbi Central">
            </div>
            <div class="field">
              <label>Final Score (e.g. 2 - 1) *</label>
              <input type="text" id="resScore" value="${esc(f?.score || '2 - 1')}" required placeholder="e.g. 2 - 1">
            </div>
            <div class="field">
              <label>Match Venue *</label>
              <input type="text" id="resVenue" value="${esc(f?.venue || 'Alua Primary Playground')}" required>
            </div>
            <div class="field full">
              <label>Goalscorers Commentary *</label>
              <input type="text" id="resScorers" value="${esc(f?.scorers || '')}" placeholder="e.g. D. Aliga 74', E. Drani 88' (Daystar) | O. Patrick 31' (Nebbi)">
            </div>
          </div>
          <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px">
            <button type="button" class="btn light" id="cancelResultModal">Cancel</button>
            <button type="submit" class="btn red">${isEdit ? 'Save Result' : 'Publish Result to Public Site'}</button>
          </div>
        </form>
      </section>
    </div>
  `;

  const closeFn = () => modal.innerHTML = '';
  document.getElementById('closeResultModal').onclick = closeFn;
  document.getElementById('cancelResultModal').onclick = closeFn;

  document.getElementById('resultModalForm').onsubmit = (e) => {
    e.preventDefault();
    const contentData = loadPublicContent();
    if (!contentData.fixtures) contentData.fixtures = [];

    const resObj = {
      id: f?.id || 'res_' + Date.now(),
      date: document.getElementById('resDate').value.trim(),
      comp: document.getElementById('resComp').value.trim(),
      homeTeam: document.getElementById('resHome').value.trim(),
      awayTeam: document.getElementById('resAway').value.trim(),
      score: document.getElementById('resScore').value.trim(),
      venue: document.getElementById('resVenue').value.trim(),
      scorers: document.getElementById('resScorers').value.trim(),
      status: 'Played'
    };

    if (isEdit) {
      const idx = contentData.fixtures.findIndex(x => x.id === f.id);
      if (idx !== -1) contentData.fixtures[idx] = resObj;
      logActivity('update', `Updated match result: ${resObj.homeTeam} ${resObj.score} ${resObj.awayTeam}`);
      toast('Match result updated successfully!', 'success');
    } else {
      contentData.fixtures.unshift(resObj);
      logActivity('create', `Published match result: ${resObj.homeTeam} ${resObj.score} ${resObj.awayTeam}`);
      toast('Match scorecard published to public website!', 'success');
    }

    // Also update contentData.latestResult if this involves Daystar United
    if (resObj.homeTeam.includes('Daystar') || resObj.awayTeam.includes('Daystar')) {
      const scoreParts = resObj.score.split('-').map(s => s.trim());
      contentData.latestResult = {
        homeTeam: resObj.homeTeam,
        homeScore: scoreParts[0] || '0',
        awayTeam: resObj.awayTeam,
        awayScore: scoreParts[1] || '0',
        scorers: resObj.scorers
      };
    }

    savePublicContent(contentData);
    closeFn();
    render();
  };
}

// 3. Mark Fixture as Played / Enter Score
function markFixtureAsPlayed(fixtureId) {
  const content = loadPublicContent();
  const f = (content.fixtures || []).find(x => x.id === fixtureId);
  if (!f) return;

  const score = prompt(`Enter final score for ${f.homeTeam} vs ${f.awayTeam} (e.g. 2 - 1):`, "2 - 1");
  if (!score) return;

  const scorers = prompt(`Enter goalscorers for ${f.homeTeam} vs ${f.awayTeam}:`, "D. Aliga 54'");

  f.status = 'Played';
  f.score = score.trim();
  f.scorers = scorers ? scorers.trim() : '';

  // Also update latestResult if Daystar United
  if (f.homeTeam.includes('Daystar') || f.awayTeam.includes('Daystar')) {
    const scoreParts = f.score.split('-').map(s => s.trim());
    content.latestResult = {
      homeTeam: f.homeTeam,
      homeScore: scoreParts[0] || '0',
      awayTeam: f.awayTeam,
      awayScore: scoreParts[1] || '0',
      scorers: f.scorers
    };
  }

  savePublicContent(content);
  logActivity('update', `Recorded final match result: ${f.homeTeam} ${f.score} ${f.awayTeam}`);
  toast(`Match completed! Final score ${f.score} saved to public site.`, 'success');
  render();
}

// 4. Delete Fixture / Result
function deleteFixture(fixtureId) {
  const content = loadPublicContent();
  const f = (content.fixtures || []).find(x => x.id === fixtureId);
  if (!f) return;

  if (confirm(`Are you sure you want to delete this match record:\n"${f.homeTeam} vs ${f.awayTeam}" (${f.date})?`)) {
    content.fixtures = content.fixtures.filter(x => x.id !== fixtureId);
    savePublicContent(content);
    logActivity('delete', `Deleted match record: ${f.homeTeam} vs ${f.awayTeam}`);
    toast('Match record deleted from public fixtures.', 'info');
    render();
  }
}

// 5. Save Venue & Admission Notice
function saveVenueAdmissionForm() {
  const content = loadPublicContent();
  content.venueAdmission = {
    title: document.getElementById('vaTitle').value.trim(),
    venueName: document.getElementById('vaVenueName').value.trim(),
    location: document.getElementById('vaLocation').value.trim(),
    description: document.getElementById('vaDesc').value.trim()
  };
  savePublicContent(content);
  logActivity('update', 'Updated match venue & supporter admission public notice');
  toast('Venue & admission notice updated on public website!', 'success');
  render();
}

// Global window bindings
window.openFixtureModal = openFixtureModal;
window.openResultModal = openResultModal;
window.markFixtureAsPlayed = markFixtureAsPlayed;
window.deleteFixture = deleteFixture;
window.saveVenueAdmissionForm = saveVenueAdmissionForm;
window.saveMatchCenterForm = saveMatchCenterForm;

// Save League Standings Table
function saveStandingsForm() {
  const tbody = document.querySelector('#cmsStandingsTable tbody');
  if (!tbody) return;

  const rows = Array.from(tbody.querySelectorAll('tr'));
  const standings = rows.map(r => ({
    pos: Number(r.querySelector('.st-pos').value) || 1,
    name: r.querySelector('.st-name').value.trim(),
    played: Number(r.querySelector('.st-played').value) || 0,
    gd: r.querySelector('.st-gd').value.trim(),
    pts: Number(r.querySelector('.st-pts').value) || 0,
    isHighlight: r.querySelector('.st-highlight').checked
  }));

  const content = loadPublicContent();
  content.standings = standings;
  savePublicContent(content);

  logActivity('update', 'Updated public league standings table');
  toast('League standings table updated on the public website!', 'success');
  render();
}

// Save Squad Spotlight Form
function saveSquadSpotlightForm() {
  const mount = document.getElementById('squadSpotlightMount');
  if (!mount) return;

  const cards = Array.from(mount.children);
  const spotlight = cards.map((c, i) => {
    const name = c.querySelector('.sq-name').value.trim();
    const role = c.querySelector('.sq-role').value.trim();
    const number = c.querySelector('.sq-number').value.trim();
    const initials = c.querySelector('.sq-initials').value.trim().toUpperCase() || 'DF';

    const colors = [
      { bg: '#071d3b', color: '#ffffff' },
      { bg: '#fee2e2', color: '#dc2626' },
      { bg: '#e0f2fe', color: '#0284c7' },
      { bg: '#fef3c7', color: '#d97706' }
    ];

    return {
      name,
      role,
      number,
      initials,
      bg: colors[i % colors.length].bg,
      color: colors[i % colors.length].color
    };
  });

  const content = loadPublicContent();
  content.squadSpotlight = spotlight;
  savePublicContent(content);

  logActivity('update', 'Updated squad spotlight on public website');
  toast('Squad spotlight updated on public website!', 'success');
  render();
}

// Save CMS Access Delegation (Admin Authority)
function saveCmsDelegationForm() {
  if (currentUser?.role !== 'Admin') {
    toast('Only Super Admin / CEO has authority to delegate content controls.', 'error');
    return;
  }

  const allowSecretary = document.getElementById('delSecretary')?.checked || false;
  const allowManager = document.getElementById('delManager')?.checked || false;
  const allowTreasurer = document.getElementById('delTreasurer')?.checked || false;

  const delegation = { allowSecretary, allowManager, allowTreasurer };
  saveCmsDelegation(delegation);

  logActivity('update', `Updated content creation and upload delegation permissions (Secretary: ${allowSecretary}, Manager: ${allowManager}, Treasurer: ${allowTreasurer})`);
  toast('Content creation & upload permissions successfully updated and applied!', 'success');
  render();
}

// Start
initApp();
