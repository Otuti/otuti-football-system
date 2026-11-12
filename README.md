# DAYSTAR UNITED FC — Official Web Platform & Management System

A decoupled, multi-page digital platform for **Daystar United Football Club** (Community-Based Organisation, Oluko Subcounty, Ayivu East Constituency, Arua City, West Nile Region, Uganda · Founded 2015 · Motto: *"NEVER GIVE UP"*).

The platform features:
1. **Dedicated Multi-Page Public Website** — All content is strictly organized into standalone pages rather than combined into a single page:
   - 🏠 **Homepage (`frontend/index.html`)**: Breaking news banner, match countdown, latest match results scorecard, mini standings, and quick-links.
   - 📰 **News & Reports Hub (`frontend/news.html`)**: Dedicated newsroom modeled after professional clubs like **KCCA FC** (`kccafc.co.ug/news`) with category filters (*All News, Match Reports, Club Announcements, Community & Youth, Squad Updates*) and story reader.
   - ⚽ **Fixtures, Results & Match Center (`frontend/fixtures.html`)**: Dedicated match center with upcoming fixture countdown, full season regional schedule, match scorecards, and Alua Playground admission info.
   - 🏆 **League Standings (`frontend/standings.html`)**: Dedicated West Nile Regional League (Ayivu East Zone) table with form chips, qualification rules, golden boot leaders, and clean sheets records.
   - 👥 **Senior First Team Squad (`frontend/squad.html`)**: Dedicated roster categorized by position (Goalkeepers, Defenders, Midfielders, Forwards) and Technical Bench.
   - 🌱 **Youth Football Academy (`frontend/academy.html`)**: Dedicated academy portal featuring the 4 age divisions (U-12 Cubs, U-15 Juniors, U-17 Youth, U-20 Reserves), core developmental pillars ("Education First"), senior team promotion showcase, enrolled scholars directory, and online parent/guardian trial enrollment.
2. **Official Management Portal (`frontend/portal.html`)** — Secure, role-gated administrative suite with 5 isolated roles, live system activity audit logs, Super Admin credential reset controls, and operational modules.
3. **Website & Media CMS (`cms`)** — Full administrative control panel directly inside the dashboard allowing Super Admin and delegated officials to create, edit, upload photos, manage breaking news banners, update match center countdowns, and edit league tables across all public pages in real time.
4. **Youth Academy Management Desk (`academy`)** — Complete grassroots development suite with roster tracking, academic progress monitoring, online parent application review desk, and one-click **"Promote to Senior Team ⬆️"** engine.
5. **Laravel REST API Backend (`backend/`)** — Enterprise-grade PHP/Laravel backend powering role-based access control, Sanctum token authentication, Eloquent database models, and financial/technical records.

---

## Architecture & Directory Layout

```
daystar_complete_demo/
├── frontend/
│   ├── index.html            # 🏠 DEDICATED CLUB HOMEPAGE
│   ├── news.html             # 📰 DEDICATED NEWS & MATCH REPORTS (Modeled after kccafc.co.ug/news)
│   ├── fixtures.html         # ⚽ DEDICATED MATCH CENTER, FIXTURES & RESULTS
│   ├── standings.html        # 🏆 DEDICATED WEST NILE REGIONAL LEAGUE STANDINGS
│   ├── squad.html            # 👥 DEDICATED SENIOR FIRST TEAM SQUAD & COACHING STAFF
│   ├── academy.html          # 🌱 DEDICATED YOUTH FOOTBALL ACADEMY & PARENT REGISTRATION
│   ├── public-style.css      # Shared styling for all public pages
│   ├── public.js             # Shared multi-page client engine & live storage sync
│   │
│   ├── portal.html           # 🔒 OFFICIAL MANAGEMENT PORTAL (Strict multi-user login)
│   ├── styles.css            # Portal dashboard styling, responsive layouts, data grids, CMS tabs
│   ├── app.js                # Portal state machine, role isolation, CMS manager, academy engine & audit log
│   │
│   └── assets/
│       └── daystar-logo.jpg  # Official Daystar United FC Crest
│
├── backend/                  # ⚙️ LARAVEL 11 REST API BACKEND
│   ├── app/
│   │   ├── Http/Controllers/ # Auth, Dashboard, Player, Match, Financial, User, Article, Academy & Audit controllers
│   │   ├── Http/Middleware/  # Role-Based Access Control (CheckRole middleware)
│   │   └── Models/           # User, Player, Match, Member, Financial, Article, AcademyPlayer Eloquent models
│   ├── database/
│   │   ├── migrations/       # 13 Database migrations (all modules + academy, articles, users & audit trail)
│   │   └── seeders/          # UserSeeder (5 roles) & ClubProfileSeeder
│   ├── routes/api.php        # RESTful API route definitions, articles CRUD, academy CRUD & password reset endpoint
│   ├── config/cors.php       # CORS policy for frontend connection
│   ├── composer.json         # PHP & Laravel package definition
│   └── .env.example          # Environment variables template
│
└── README.md
```

---

## 1. Separate Multi-Page Public Website Structure

Every section now lives on its own dedicated HTML page, eliminating page clutter while maintaining a unified, responsive header, navigation, and footer:

* 🏠 **Homepage (`index.html`)**:
  - Breaking news banner
  - Matchday countdown widget
  - Latest match result scorecard
  - Top 4 news preview cards linking to `news.html`
  - Academy callout card linking to `academy.html`
  - Mini standings table linking to `standings.html`
  - Direct portal access link

* 📰 **News & Reports Hub (`news.html`)**:
  - Modeled directly on `kccafc.co.ug/news`
  - Category filtering tabs (*All News*, *Match Reports*, *Club Announcements*, *Community & Youth*, *Squad Updates*)
  - Responsive news cards grid with badges, dates, and excerpts
  - Full modal story reader with high-resolution imagery and player quotes

* ⚽ **Fixtures & Results (`fixtures.html`)**:
  - Upcoming match countdown to next fixture vs Arua Hill Youth FC
  - Full season schedule with dates, venues, and status
  - Full-time match scorecards with goalscorers
  - Match venue and supporter admission guidance for Alua Playground

* 🏆 **Standings & League Table (`standings.html`)**:
  - KPI summary cards (1st Place, 34 Points, 10W-4D-0L, +19 GD)
  - Full standings table with form chips (W, D, L)
  - Promotion playoff and relegation zone color-coded legends
  - Ayivu East Zone golden boot top scorers and clean sheets leaderboards

* 👥 **First Team Squad (`squad.html`)**:
  - Roster categorized by position: Goalkeepers, Defenders, Midfielders, Forwards
  - Player profile cards with squad numbers, appearances, goals, and clean sheets
  - Technical Bench & Coaching Staff directory led by Coach Otuti Ronald

* 🌱 **Youth Football Academy (`academy.html`)**:
  - **4 Age Divisions**:
    - 🦁 **U-12 Grassroots Cubs** (Ages 8-12): Ball mastery, coordination, fun, small-sided games
    - ⚡ **U-15 Developmental Juniors** (Ages 13-15): Positional play, passing tempo, school fixtures
    - 🦅 **U-17 Competitive Youth** (Ages 16-17): Match intensity, athletic conditioning, regional youth cups
    - 🛡️ **U-20 Pre-Professional Reserves** (Ages 18-20): Senior squad feeder team and shadow sessions
  - **Core Academy Pillars**: "Education First" (school report cards monitored), Technical Foundation, Character Mentorship, and Senior Pathway.
  - **Senior Team Promotion Showcase**: Featuring graduates Derrick Draniku (#2) and Ronald Otuti Junior (#19).
  - **Active Scholars Roster**: Interactive category filter tabs displaying enrolled youth athletes.
  - **Online Parent Registration Form**: Parents across Oluko, Ayivu East, and Arua City can enroll children online for trials at Alua Playground. Form submissions route directly into the Club Management Portal.

---

## 2. Youth Academy Management in the Portal (`frontend/portal.html`)

In the Management Portal, click **🌱 Youth Academy** (`academy`):
1. **KPI Statistics**: Total Scholars, U-12 Cubs, U-15 Juniors, U-17 Youth, and Graduated to Senior.
2. **Scholars Roster Management**: Add, view, and edit youth scholars with school, guardian phone, and academic performance tracking.
3. **"Promote to Senior Team ⬆️" Engine**:
   - One-click button promotes youth players to the Senior Team.
   - Automatically moves the player into `db.players` / Senior roster, updates their status, and logs the promotion into the System Audit Log.
4. **Online Applications Review Desk**:
   - Click **"📩 Online Applications"** to view registrations submitted by parents on `academy.html`.
   - Click **"✓ Approve & Enroll"** to admit the child into the academy database with automated ID generation.

---

## 3. Website & Media CMS: 100% Admin Control

In the Management Portal, navigate to **📰 Website & Media CMS** (`cms`) or click the **"⚽ Match Center & Fixtures"** quick action on your dashboard:
* **⚽ Match Center, Fixtures & Results (Tab 2)**:
  - **Featured Matchday Countdown Clock**: Change opponent, venue, kickoff date, round badge (`MATCHDAY 15`), and live ticking countdown clock for the public site.
  - **Upcoming Season Fixtures**: Click **"＋ Add Upcoming Fixture"** to schedule new games; edit dates, venues, or home/away teams, and click **"✅ Enter Score"** to transition completed games to Recent Results.
  - **Recent Match Results & Scorecards**: Click **"＋ Add Match Result / Scorecard"** to publish final scores, goalscorers commentary, and match venues.
  - **Match Venue & Admission Notice**: Directly edit the public admission notice, ground location, and community supporter information.
* **📰 Club Stories & News Articles (Tab 1)**: Create, edit, upload photos directly from your device, and toggle the *"⭐ Set as Hero"* breaking banner.
* **🏆 League Standings Table (Tab 3)**: Edit team rows, games played, goal differences, and points across the site.
* **👥 Squad Spotlight (Tab 4)**: Change featured first-team players.
* **🛡️ Content Delegation (Tab 5)**: Super Admin can assign content creation and upload rights to the Secretary, Manager, or Treasurer with one click.

---

## 4. Official Management Portal (`frontend/portal.html`)

Access is restricted by username and password. Credential autofill/caching is disabled to prevent unauthorized access.

### Pre-Configured Access Roles:

| Role | Username | Initial Password | Access Scope & Permissions |
| :--- | :--- | :--- | :--- |
| **👑 Super Admin / CEO** | `admin` | `password` | **Full system control**: User Management, Settings, Finances, Squad, Matches, Youth Academy, CMS, Password Resets, and the **Live Activity Log / Audit Trail**. |
| **💰 Treasurer** | `treasurer` | `DemoTreasurer!2026#` | **Finances Only**: Contributions, Expenses, Sponsors, Financial Reports & Receipts. |
| **⚽ Team Manager / Coach** | `manager` | `DemoManager!2026#` | **Technical Team**: Senior Players, **Youth Academy Management**, Fixtures & Matches, Staff, Activities. |
| **📋 Secretary General** | `secretary` | `DemoSecretary!2026#` | **Secretariat**: Members & Supporters, **Youth Academy Directory**, Club Events, Official Club Profile. |
| **👁️ Read-Only Viewer** | `viewer` | `DemoViewer!2026#` | **Auditor / Viewer**: Read-only access to approved reports, youth academy records, and dashboard metrics. |

---

## 5. How to Launch & Test

### Option A: Direct Browser Launch (Instant, Zero Setup)
1. Double-click or open [`frontend/index.html`](file:///c:/Users/r.otuti/Downloads/daystar_united_fc_complete_demo%20(2)/daystar_complete_demo/frontend/index.html) in Google Chrome, Microsoft Edge, Firefox, or Safari to explore the public site and scroll down to the **Youth Academy** section.
2. Click **"📝 Register Young Player Online"** to test the academy registration modal.
3. Click **🔒 Official Portal** to open [`frontend/portal.html`](file:///c:/Users/r.otuti/Downloads/daystar_united_fc_complete_demo%20(2)/daystar_complete_demo/frontend/portal.html).
4. Log in with `admin` and `password`.
5. Click **🌱 Youth Academy** in the sidebar:
   - View the academy KPI cards.
   - Click **"⬆️ Promote"** on an academy scholar to test promoting them to the Senior First Team!
   - Click **"📩 Online Applications"** to view and approve parent enrollments submitted from the public site!

### Option B: Running the Laravel API Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
The API runs at `http://localhost:8000/api`. The frontend automatically synchronizes with the API when running.

---

## Core Club Identity
* **Name**: Daystar United Football Club (CBO)
* **Academy**: Daystar Youth Football Academy (U-12, U-15, U-17, U-20)
* **Motto**: *"NEVER GIVE UP"*
* **Home Ground**: Alua Primary School Playground, Oluko Subcounty, Ayivu East, Arua City, Uganda
* **Core Pillars**: Discipline · Teamwork · Development · Excellence · Community
#   o t u t i - f o o t b a l l - s y s t e m  
 #   o t u t i - f o o t b a l l - s y s t e m  
 