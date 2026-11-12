/**
 * DAYSTAR UNITED FC - PUBLIC MULTI-PAGE ENGINE
 * Powers all public pages:
 * - index.html (Homepage)
 * - news.html (Dedicated News & Match Reports Hub)
 * - fixtures.html (Dedicated Fixtures, Results & Match Center)
 * - standings.html (Dedicated West Nile Regional League Standings)
 * - squad.html (Dedicated First Team Squad & Technical Staff)
 * - academy.html (Dedicated Youth Football Academy & Parent Enrollment)
 * 
 * Synchronized with Management Portal CMS (daystar_public_content)
 */

const PUBLIC_CONTENT_KEY = 'daystar_public_content';

const DEFAULT_PUBLIC_CONTENT = {
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
    { date: 'Nov 14, 2026 · 4:00 PM', homeTeam: 'Daystar United', awayTeam: 'Arua Hill Youth', venue: 'Alua Primary Playground (Home)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { date: 'Nov 21, 2026 · 4:00 PM', homeTeam: 'Onduparaka Junior', awayTeam: 'Daystar United', venue: 'Greenlight Stadium Annex (Away)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { date: 'Nov 28, 2026 · 4:00 PM', homeTeam: 'Daystar United', awayTeam: 'Total FC', venue: 'Alua Primary Playground (Home)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { date: 'Dec 05, 2026 · 4:00 PM', homeTeam: 'Koboko Rising Stars', awayTeam: 'Daystar United', venue: 'Koboko Boma Ground (Away)', comp: 'West Nile Regional League', status: 'Upcoming' },
    { date: 'Nov 10, 2026', homeTeam: 'Daystar United', awayTeam: 'Nebbi Central', score: '2 - 1', venue: 'Alua Primary Playground', comp: 'West Nile Regional League', status: 'Played', scorers: 'D. Aliga 74\', E. Drani 88\'' },
    { date: 'Oct 28, 2026', homeTeam: 'Paidha Black Angels Dev', awayTeam: 'Daystar United', score: '0 - 1', venue: 'Zombo District Ground', comp: 'West Nile Regional League', status: 'Played', scorers: 'R. Otuti 52\'' },
    { date: 'Oct 15, 2026', homeTeam: 'Daystar United', awayTeam: 'Moyo Town Council', score: '3 - 0', venue: 'Alua Primary Playground', comp: 'West Nile Regional League', status: 'Played', scorers: 'D. Aliga 14\', 68\', R. Otuti 81\'' }
  ],

  venueAdmission: {
    title: '🏟️ Match Venue & Supporter Admission',
    venueName: 'Alua Primary School Playground',
    location: 'Oluko Subcounty, Ayivu East Constituency, Arua City',
    description: 'All Daystar United FC home matches are hosted at Alua Primary School Playground in Oluko Subcounty. General admission is free for local community members. Come cheer on the Stars in your navy and red colors!'
  },

  standings: [
    { pos: 1, name: '⭐ Daystar United FC', played: 14, won: 10, drawn: 3, lost: 1, gf: 26, ga: 8, gd: '+18', pts: 33, isHighlight: true, form: ['w', 'w', 'd', 'w', 'w'] },
    { pos: 2, name: 'Onduparaka Junior Team', played: 14, won: 9, drawn: 4, lost: 1, gf: 23, ga: 8, gd: '+15', pts: 31, isHighlight: false, form: ['w', 'w', 'w', 'd', 'd'] },
    { pos: 3, name: 'Paidha Black Angels Dev', played: 14, won: 9, drawn: 2, lost: 3, gf: 20, ga: 8, gd: '+12', pts: 29, isHighlight: false, form: ['l', 'w', 'w', 'w', 'd'] },
    { pos: 4, name: 'Nebbi Central FC', played: 14, won: 8, drawn: 3, lost: 3, gf: 19, ga: 10, gd: '+9', pts: 27, isHighlight: false, form: ['l', 'w', 'd', 'w', 'w'] },
    { pos: 5, name: 'Arua Hill Youth FC', played: 14, won: 7, drawn: 4, lost: 3, gf: 18, ga: 11, gd: '+7', pts: 25, isHighlight: false, form: ['w', 'd', 'd', 'l', 'w'] },
    { pos: 6, name: 'Total FC (Arua)', played: 14, won: 6, drawn: 3, lost: 5, gf: 16, ga: 14, gd: '+2', pts: 21, isHighlight: false, form: ['w', 'l', 'd', 'w', 'l'] },
    { pos: 7, name: 'Koboko Rising Stars', played: 14, won: 5, drawn: 4, lost: 5, gf: 14, ga: 15, gd: '-1', pts: 19, isHighlight: false, form: ['d', 'w', 'l', 'l', 'w'] },
    { pos: 8, name: 'Moyo Town Council FC', played: 14, won: 3, drawn: 2, lost: 9, gf: 11, ga: 22, gd: '-11', pts: 11, isHighlight: false, form: ['l', 'l', 'w', 'l', 'l'] }
  ],

  squad: {
    goalkeepers: [
      { name: 'Alex Koma', number: '1', role: 'First Choice Goalkeeper', age: 24, appearances: 14, cleanSheets: 8, initials: 'AK', bg: '#fef3c7', color: '#d97706' },
      { name: 'David Andama', number: '18', role: 'Goalkeeper', age: 21, appearances: 2, cleanSheets: 1, initials: 'DA', bg: '#e0f2fe', color: '#0284c7' }
    ],
    defenders: [
      { name: 'Rashid Ezama', number: '3', role: 'Center Back (Vice Captain)', age: 26, appearances: 14, cleanSheets: 8, initials: 'RE', bg: '#fee2e2', color: '#dc2626' },
      { name: 'Geoffrey Bada', number: '4', role: 'Center Back / Stopper', age: 23, appearances: 13, cleanSheets: 7, initials: 'GB', bg: '#071d3b', color: '#fff' },
      { name: 'Derrick Draniku', number: '2', role: 'Right Back (Academy Graduate)', age: 19, appearances: 11, cleanSheets: 6, initials: 'DD', bg: '#dcfce7', color: '#16a34a' },
      { name: 'Innocent Candia', number: '5', role: 'Left Back', age: 22, appearances: 12, cleanSheets: 6, initials: 'IC', bg: '#f1f5f9', color: '#071d3b' }
    ],
    midfielders: [
      { name: 'Emmanuel Drani', number: '8', role: 'Central Midfielder / Playmaker', age: 22, appearances: 14, goals: 6, initials: 'ED', bg: '#e0f2fe', color: '#0284c7' },
      { name: 'Denis Aliga', number: '7', role: 'Attacking Winger / Vice Captain', age: 23, appearances: 14, goals: 8, initials: 'DA', bg: '#fee2e2', color: '#dc2626' },
      { name: 'Patrick Anguyo', number: '6', role: 'Defensive Midfielder / Anchor', age: 25, appearances: 13, goals: 1, initials: 'PA', bg: '#fef3c7', color: '#d97706' },
      { name: 'Stephen Mundua', number: '16', role: 'Attacking Midfielder', age: 20, appearances: 9, goals: 3, initials: 'SM', bg: '#071d3b', color: '#fff' }
    ],
    forwards: [
      { name: 'Otuti Ronald', number: '10', role: 'Forward / Club Captain', age: 25, appearances: 14, goals: 11, initials: 'RO', bg: '#071d3b', color: '#fff' },
      { name: 'Samuel Draniku', number: '9', role: 'Center Forward / Striker', age: 22, appearances: 12, goals: 7, initials: 'SD', bg: '#fee2e2', color: '#dc2626' },
      { name: 'Ronald Otuti Junior', number: '19', role: 'Forward (Academy Scholar)', age: 19, appearances: 8, goals: 4, initials: 'RJ', bg: '#dcfce7', color: '#16a34a' }
    ],
    technicalStaff: [
      { name: 'Otuti Ronald', role: 'Head Coach & Team Manager' },
      { name: 'Coach Denis Aliga', role: 'Assistant Coach & Conditioning Lead' },
      { name: 'Dr. Michael Dralega', role: 'Team Medical Officer / Physiotherapist' },
      { name: 'Moses Bada', role: 'Equipment & Logistics Manager' }
    ]
  },

  sponsors: [
    '🏛️ Oluko Subcounty Sports Committee',
    '🌾 Ayivu East Farmers & Business Initiative',
    '🏫 Alua Community Education Fund',
    '⚽ West Nile Football Association'
  ]
};

function getPublicContent() {
  try {
    const raw = localStorage.getItem(PUBLIC_CONTENT_KEY);
    if (!raw) {
      localStorage.setItem(PUBLIC_CONTENT_KEY, JSON.stringify(DEFAULT_PUBLIC_CONTENT));
      return DEFAULT_PUBLIC_CONTENT;
    }
    const parsed = JSON.parse(raw);
    return {
      stories: parsed.stories && parsed.stories.length ? parsed.stories : DEFAULT_PUBLIC_CONTENT.stories,
      matchCenter: parsed.matchCenter || DEFAULT_PUBLIC_CONTENT.matchCenter,
      latestResult: parsed.latestResult || DEFAULT_PUBLIC_CONTENT.latestResult,
      fixtures: parsed.fixtures || DEFAULT_PUBLIC_CONTENT.fixtures,
      venueAdmission: parsed.venueAdmission || DEFAULT_PUBLIC_CONTENT.venueAdmission,
      standings: parsed.standings || DEFAULT_PUBLIC_CONTENT.standings,
      squad: parsed.squad || DEFAULT_PUBLIC_CONTENT.squad,
      sponsors: parsed.sponsors || DEFAULT_PUBLIC_CONTENT.sponsors
    };
  } catch (e) {
    return DEFAULT_PUBLIC_CONTENT;
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 1. Homepage Rendering (index.html)
 */
function renderHomePage() {
  const data = getPublicContent();

  // Hero Story
  const heroStory = data.stories.find(s => s.isHero) || data.stories[0];
  const heroEl = document.getElementById('homeHeroBanner');
  if (heroEl && heroStory) {
    heroEl.style.background = `linear-gradient(180deg, rgba(7, 29, 59, 0.4) 0%, rgba(4, 18, 38, 0.95) 100%), url('${heroStory.image}') center/cover no-repeat`;
    heroEl.innerHTML = `
      <div>
        <span class="hero-tag">${escapeHtml(heroStory.tag || 'FEATURED STORY · BREAKING NEWS')}</span>
        <h2 class="hero-title">${escapeHtml(heroStory.title)}</h2>
        <div class="hero-meta">
          <span>📅 ${escapeHtml(heroStory.date)}</span>
          <span>✍️ ${escapeHtml(heroStory.author || 'Daystar Media')}</span>
          <span>📍 ${escapeHtml(heroStory.location || 'Alua Primary Playground')}</span>
        </div>
        <p class="hero-excerpt">${escapeHtml(heroStory.excerpt)}</p>
        <button type="button" class="hero-btn" onclick="openStory('${heroStory.id}')">
          <span>Read Full Story</span>
          <span>→</span>
        </button>
      </div>
    `;
  }

  // Home News Preview (Top 3 stories)
  const homeNewsGrid = document.getElementById('homeNewsCards');
  if (homeNewsGrid) {
    const previewStories = data.stories.slice(0, 4);
    homeNewsGrid.innerHTML = previewStories.map(story => `
      <article class="news-card">
        <img src="${story.image}" alt="${escapeHtml(story.title)}" class="news-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop'">
        <div class="news-card-body">
          <div class="news-card-meta">
            <span class="category-badge ${story.badgeClass || 'match'}">${escapeHtml(story.category)}</span>
            <span class="news-card-date">${escapeHtml(story.date)}</span>
          </div>
          <h3 class="news-card-title">${escapeHtml(story.title)}</h3>
          <p class="news-card-excerpt">${escapeHtml(story.excerpt)}</p>
          <span class="news-card-link" onclick="openStory('${story.id}')">Read Story →</span>
        </div>
      </article>
    `).join('');
  }

  renderSharedWidgets(data);
}

/**
 * 2. Dedicated News Page Rendering (news.html)
 */
function renderNewsPage() {
  const data = getPublicContent();

  // News Hero
  const heroStory = data.stories.find(s => s.isHero) || data.stories[0];
  const newsHero = document.getElementById('newsHeroBanner');
  if (newsHero && heroStory) {
    newsHero.style.background = `linear-gradient(180deg, rgba(7, 29, 59, 0.4) 0%, rgba(4, 18, 38, 0.95) 100%), url('${heroStory.image}') center/cover no-repeat`;
    newsHero.innerHTML = `
      <div>
        <span class="hero-tag">${escapeHtml(heroStory.tag || 'BREAKING STORY')}</span>
        <h2 class="hero-title">${escapeHtml(heroStory.title)}</h2>
        <div class="hero-meta">
          <span>📅 ${escapeHtml(heroStory.date)}</span>
          <span>✍️ ${escapeHtml(heroStory.author || 'Daystar Media')}</span>
          <span>📍 ${escapeHtml(heroStory.location || 'Alua Playground')}</span>
        </div>
        <p class="hero-excerpt">${escapeHtml(heroStory.excerpt)}</p>
        <button type="button" class="hero-btn" onclick="openStory('${heroStory.id}')">
          <span>Read Full Story</span>
          <span>→</span>
        </button>
      </div>
    `;
  }

  // All News Cards Feed
  const cardsContainer = document.getElementById('newsCardsContainer');
  if (cardsContainer) {
    cardsContainer.innerHTML = data.stories.map(story => {
      const catSlug = getCategorySlug(story.category);
      return `
        <article class="news-card" data-category="${catSlug}">
          <img src="${story.image}" alt="${escapeHtml(story.title)}" class="news-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop'">
          <div class="news-card-body">
            <div class="news-card-meta">
              <span class="category-badge ${story.badgeClass || 'match'}">${escapeHtml(story.category)}</span>
              <span class="news-card-date">${escapeHtml(story.date)}</span>
            </div>
            <h3 class="news-card-title">${escapeHtml(story.title)}</h3>
            <p class="news-card-excerpt">${escapeHtml(story.excerpt)}</p>
            <span class="news-card-link" onclick="openStory('${story.id}')">Read Story →</span>
          </div>
        </article>
      `;
    }).join('');
  }

  initCategoryFiltering();
  renderSharedWidgets(data);
}

/**
 * 3. Dedicated Fixtures & Results Page (fixtures.html)
 */
function renderFixturesPage() {
  const data = getPublicContent();
  const listEl = document.getElementById('fixturesListContainer');
  if (!listEl) return;

  const fixtures = data.fixtures || [];
  const upcoming = fixtures.filter(f => f.status === 'Upcoming');
  const played = fixtures.filter(f => f.status === 'Played');

  listEl.innerHTML = `
    <h3 style="font-size:18px;font-weight:900;color:var(--navy);margin:24px 0 14px;border-bottom:2px solid var(--red);padding-bottom:6px">
      📅 Upcoming Fixtures (West Nile Regional League)
    </h3>
    ${upcoming.map(f => `
      <div class="fixture-row-card">
        <div class="fixture-date-box">
          <b>${escapeHtml(f.date)}</b>
          <span>${escapeHtml(f.comp)}</span>
        </div>
        <div class="fixture-teams-box">
          <span>${escapeHtml(f.homeTeam)}</span>
          <span style="background:var(--red);color:#fff;font-size:10px;padding:3px 8px;border-radius:4px">VS</span>
          <span>${escapeHtml(f.awayTeam)}</span>
        </div>
        <div class="fixture-venue-box">
          <b>📍 ${escapeHtml(f.venue)}</b>
        </div>
      </div>
    `).join('')}

    <h3 style="font-size:18px;font-weight:900;color:var(--navy);margin:36px 0 14px;border-bottom:2px solid var(--navy);padding-bottom:6px">
      🏁 Recent Match Results & Scorecards
    </h3>
    ${played.map(f => `
      <div class="fixture-row-card">
        <div class="fixture-date-box">
          <b>${escapeHtml(f.date)}</b>
          <span style="color:var(--gold);font-weight:700">FULL TIME</span>
        </div>
        <div class="fixture-teams-box">
          <span style="${f.homeTeam.includes('Daystar') ? 'color:var(--red)' : ''}">${escapeHtml(f.homeTeam)}</span>
          <span class="score-pill">${escapeHtml(f.score)}</span>
          <span style="${f.awayTeam.includes('Daystar') ? 'color:var(--red)' : ''}">${escapeHtml(f.awayTeam)}</span>
        </div>
        <div class="fixture-venue-box">
          <b>${escapeHtml(f.scorers || 'Match Completed')}</b>
          <div>${escapeHtml(f.venue)}</div>
        </div>
      </div>
    `).join('')}
  `;

  renderSharedWidgets(data);
}

/**
 * 4. Dedicated Standings Page (standings.html)
 */
function renderStandingsPage() {
  const data = getPublicContent();
  const tableEl = document.querySelector('#fullStandingsTable tbody');
  if (!tableEl) return;

  tableEl.innerHTML = data.standings.map(row => {
    const formHtml = (row.form || ['w', 'w', 'd', 'w', 'w'])
      .map(ch => `<span class="form-chip ${ch}">${ch.toUpperCase()}</span>`)
      .join('');

    return `
      <tr class="${row.isHighlight ? 'highlight' : ''}">
        <td><b>${row.pos}</b></td>
        <td>${row.isHighlight ? '⭐ <b>' : ''}${escapeHtml(row.name)}${row.isHighlight ? '</b>' : ''}</td>
        <td>${row.played}</td>
        <td>${row.won || 0}</td>
        <td>${row.drawn || 0}</td>
        <td>${row.lost || 0}</td>
        <td>${row.gf || 0}</td>
        <td>${row.ga || 0}</td>
        <td><b>${row.gd}</b></td>
        <td><b style="font-size:14px">${row.pts}</b></td>
        <td>${formHtml}</td>
      </tr>
    `;
  }).join('');

  renderSharedWidgets(data);
}

/**
 * 5. Dedicated First Team Squad Page (squad.html)
 */
function renderSquadPage() {
  const data = getPublicContent();
  const squadMount = document.getElementById('squadFullRosterContainer');
  if (!squadMount) return;

  const sq = data.squad || {};

  function renderGroup(title, list) {
    if (!list || !list.length) return '';
    return `
      <div class="position-group-title">${title}</div>
      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-bottom:24px">
        ${list.map(p => `
          <div class="player-full-card">
            <div class="player-avatar" style="${p.bg ? `background:${p.bg};` : ''}${p.color ? `color:${p.color};` : ''}">
              ${escapeHtml(p.initials || 'DF')}
            </div>
            <b style="display:block;font-size:15px;color:var(--navy);margin-bottom:2px">${escapeHtml(p.name)}</b>
            <span style="display:block;font-size:12px;color:var(--text-muted)">${escapeHtml(p.role)}</span>
            <div style="margin:8px 0;font-size:11px;color:var(--navy)">
              ${p.appearances ? `<span>Apps: <b>${p.appearances}</b></span> · ` : ''}
              ${p.goals ? `<span>Goals: <b>${p.goals}</b></span>` : ''}
              ${p.cleanSheets ? `<span>Clean Sheets: <b>${p.cleanSheets}</b></span>` : ''}
            </div>
            <span class="jersey-pill"># ${escapeHtml(p.number)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  squadMount.innerHTML = `
    ${renderGroup('🧤 Goalkeepers', sq.goalkeepers)}
    ${renderGroup('🛡️ Defenders', sq.defenders)}
    ${renderGroup('🎯 Midfielders', sq.midfielders)}
    ${renderGroup('⚡ Forwards & Attackers', sq.forwards)}

    <div class="position-group-title">👔 Technical Bench & Coaching Staff</div>
    <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-bottom:30px">
      ${(sq.technicalStaff || []).map(st => `
        <div class="squad-card" style="text-align:left;padding:16px">
          <b style="font-size:14px;color:var(--navy)">${escapeHtml(st.name)}</b>
          <span style="font-size:11px;color:var(--red);font-weight:700">${escapeHtml(st.role)}</span>
          <p style="font-size:11px;color:var(--text-muted);margin-top:6px">Daystar United FC Technical Staff · Ayivu East Base</p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * 6. Dedicated Youth Academy Page (academy.html)
 */
function renderAcademyPage() {
  initCountdown();
  renderAcademyScholarsList('all');
}

function getAcademyScholarsList() {
  try {
    const raw = localStorage.getItem('daystar_db');
    if (raw) {
      const db = JSON.parse(raw);
      if (db && Array.isArray(db.academy) && db.academy.length > 0) {
        return db.academy;
      }
    }
  } catch (e) {}

  return [
    {
      fullName: 'Brian Anguyo',
      academyId: 'DFA-U12-001',
      ageCategory: 'U-12 Cubs (Ages 8-12)',
      position: 'Forward / Winger',
      school: 'Alua Primary School',
      village: 'Alua Village, Oluko',
      status: 'Active Scholar',
      academicGrade: 'Top 10%',
      jersey: 9
    },
    {
      fullName: 'Joel Candia',
      academyId: 'DFA-U15-014',
      ageCategory: 'U-15 Juniors (Ages 13-15)',
      position: 'Central Midfielder',
      school: 'Oluko Secondary School',
      village: 'Bunyu Parish, Ayivu East',
      status: 'Active Scholar',
      academicGrade: 'Distinction',
      jersey: 8
    },
    {
      fullName: 'Godfrey Onzima',
      academyId: 'DFA-U17-009',
      ageCategory: 'U-17 Youth (Ages 16-17)',
      position: 'Goalkeeper',
      school: 'Mvara Secondary School',
      village: 'Oluko Subcounty Center',
      status: 'Active Scholar',
      academicGrade: 'Credit',
      jersey: 1
    },
    {
      fullName: 'Francis Alionzi',
      academyId: 'DFA-U17-022',
      ageCategory: 'U-17 Youth (Ages 16-17)',
      position: 'Center Back / Stopper',
      school: 'Arua Public Secondary School',
      village: 'Onzivu Parish, Ayivu East',
      status: 'Active Scholar',
      academicGrade: 'Credit',
      jersey: 4
    },
    {
      fullName: 'Moses Acidri',
      academyId: 'DFA-U20-003',
      ageCategory: 'U-20 Reserves (Ages 18-20)',
      position: 'Defensive Midfielder',
      school: 'West Nile Technical Institute',
      village: 'Ayivu East Constituency',
      status: 'Reserve Captain',
      academicGrade: 'Upper Credit',
      jersey: 6
    },
    {
      fullName: 'Ronald Otuti Junior',
      academyId: 'DFA-U20-001',
      ageCategory: 'U-20 Reserves (Ages 18-20)',
      position: 'Forward / Striker',
      school: 'Arua Comprehensive College',
      village: 'Oluko Subcounty',
      status: 'Promoted to Senior Team',
      academicGrade: 'Top 5%',
      jersey: 19
    }
  ];
}

function renderAcademyScholarsList(filterCategory = 'all') {
  const mount = document.getElementById('academyScholarsRoster');
  if (!mount) return;

  const allScholars = getAcademyScholarsList();
  const filtered = filterCategory === 'all'
    ? allScholars
    : allScholars.filter(s => (s.ageCategory || '').toLowerCase().includes(filterCategory.toLowerCase()));

  if (!filtered.length) {
    mount.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 30px; text-align: center; color: var(--text-muted); background: #f8fafc; border-radius: 8px;">
        No scholars registered under this division yet. Trials are held every Saturday at Alua Primary School Playground.
      </div>
    `;
    return;
  }

  mount.innerHTML = filtered.map(s => {
    const isPromoted = (s.status || '').toLowerCase().includes('promoted');
    const badgeColor = s.ageCategory?.includes('U-12') ? 'u12'
      : s.ageCategory?.includes('U-15') ? 'u15'
      : s.ageCategory?.includes('U-17') ? 'u17' : 'u20';

    return `
      <div class="scholar-card">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <span class="academy-badge ${badgeColor}">${escapeHtml(s.ageCategory || 'Youth')}</span>
            <span style="font-size:11px;font-weight:700;color:var(--text-muted)">${escapeHtml(s.academyId || '')}</span>
          </div>
          <b style="font-size:15px;color:var(--navy);display:block;margin-bottom:3px">${escapeHtml(s.fullName)}</b>
          <div style="font-size:12px;color:var(--red);font-weight:700;margin-bottom:8px">⚽ ${escapeHtml(s.position || 'Player')}</div>
          <div style="font-size:11px;color:var(--text-muted);line-height:1.6">
            <div>🏫 <b>School:</b> ${escapeHtml(s.school || 'Ayivu East Institution')}</div>
            <div>📍 <b>Village:</b> ${escapeHtml(s.village || 'Oluko')}</div>
            ${s.academicGrade ? `<div>📚 <b>Academics:</b> ${escapeHtml(s.academicGrade)}</div>` : ''}
          </div>
        </div>
        <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:11px;font-weight:800;color:${isPromoted ? '#16a34a' : 'var(--navy)'}">
            ${isPromoted ? '⭐ Senior Team' : '🌱 Active Scholar'}
          </span>
          ${s.jersey ? `<span class="jersey-pill" style="font-size:10px"># ${s.jersey}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function filterAcademyScholars(cat, btn) {
  document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderAcademyScholarsList(cat);
}


/**
 * Shared sidebar & widgets across pages
 */
function renderSharedWidgets(data) {
  // Match Center details
  const mc = data.matchCenter;
  if (mc) {
    const badgeEl = document.getElementById('nextMatchBadge');
    if (badgeEl) badgeEl.textContent = mc.badge || 'MATCHDAY 15';

    const compEl = document.querySelector('.next-match-comp');
    if (compEl) compEl.textContent = mc.competition || 'West Nile Regional League';

    const homeB = document.querySelector('.teams-clash .team-side:first-child b');
    if (homeB) homeB.textContent = mc.homeTeam || 'Daystar United';

    const awayB = document.querySelector('.teams-clash .team-side:last-child b');
    if (awayB) awayB.textContent = mc.awayTeam || 'Arua Hill Youth';

    const awayAvatar = document.querySelector('.teams-clash .team-side:last-child div');
    if (awayAvatar) awayAvatar.textContent = mc.awayAbbr || 'AHY';

    const venueDiv = document.querySelector('.match-venue-time');
    if (venueDiv) {
      venueDiv.innerHTML = `
        <div>📍 <b>${escapeHtml(mc.venue || 'Alua Primary School Playground')}</b></div>
        <div>${escapeHtml(mc.venueSub || 'Oluko Subcounty, Ayivu East, Arua City')}</div>
        <div style="margin-top:4px;color:var(--navy);font-weight:700">🗓️ ${escapeHtml(mc.dateLabel || 'Upcoming Match')}</div>
      `;
    }
  }

  // Match Venue & Supporter Admission text
  if (data.venueAdmission) {
    const vaTitle = document.getElementById('venueAdmissionTitle');
    const vaText = document.getElementById('venueAdmissionText');
    if (vaTitle && data.venueAdmission.title) vaTitle.textContent = data.venueAdmission.title;
    if (vaText && data.venueAdmission.description) vaText.textContent = data.venueAdmission.description;
  }

  // Mini Standings Table
  const miniTable = document.querySelector('.standings-table tbody');
  if (miniTable && data.standings && data.standings.length) {
    miniTable.innerHTML = data.standings.slice(0, 5).map(row => `
      <tr class="${row.isHighlight ? 'highlight' : ''}">
        <td><b>${row.pos}</b></td>
        <td>${row.isHighlight ? '⭐ <b>' : ''}${escapeHtml(row.name)}${row.isHighlight ? '</b>' : ''}</td>
        <td>${row.played}</td>
        <td>${row.gd}</td>
        <td><b>${row.pts}</b></td>
      </tr>
    `).join('');
  }

  // Sponsors
  const sponsorsList = document.querySelector('.sponsors-list');
  if (sponsorsList && data.sponsors) {
    sponsorsList.innerHTML = data.sponsors.map(s => `
      <div class="sponsor-badge">${escapeHtml(s)}</div>
    `).join('');
  }

  initCountdown();
}

function getCategorySlug(categoryName) {
  if (!categoryName) return 'all';
  const c = categoryName.toLowerCase();
  if (c.includes('match')) return 'match';
  if (c.includes('club') || c.includes('announcement')) return 'club';
  if (c.includes('community') || c.includes('youth')) return 'community';
  if (c.includes('squad')) return 'squad';
  return 'all';
}

function initCountdown() {
  const content = getPublicContent();
  let target;

  if (content.matchCenter && content.matchCenter.targetDate) {
    target = new Date(content.matchCenter.targetDate);
  }

  if (!target || isNaN(target.getTime()) || target - new Date() <= 0) {
    target = new Date();
    const dayOfWeek = target.getDay();
    let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    if (daysUntilSaturday === 0 && target.getHours() >= 16) daysUntilSaturday = 7;
    target.setDate(target.getDate() + daysUntilSaturday);
    target.setHours(16, 0, 0, 0);
  }

  function updateTimer() {
    const diff = target - new Date();
    const dEl = document.getElementById('cdDays');
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMinutes');
    const sEl = document.getElementById('cdSeconds');

    if (diff <= 0) {
      if (dEl) dEl.textContent = '00';
      if (hEl) hEl.textContent = '00';
      if (mEl) mEl.textContent = '00';
      if (sEl) sEl.textContent = '00';
      return;
    }

    const pad = (n) => String(n).padStart(2, '0');
    if (dEl) dEl.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
    if (hEl) hEl.textContent = pad(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    if (mEl) mEl.textContent = pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    if (sEl) sEl.textContent = pad(Math.floor((diff % (1000 * 60)) / 1000));
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function initCategoryFiltering() {
  const tabs = document.querySelectorAll('.filter-tabs .tab-btn');
  const cards = document.querySelectorAll('.news-cards .news-card');

  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.dataset.category;
      cards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };
  });
}

function openStory(storyId) {
  const data = getPublicContent();
  const story = data.stories.find(s => s.id === storyId);
  if (!story) return;

  const modalBackdrop = document.getElementById('newsModalBackdrop');
  const modalContent = document.getElementById('modalStoryContent');
  if (!modalBackdrop || !modalContent) return;

  const paragraphs = Array.isArray(story.paragraphs) ? story.paragraphs : [story.paragraphs || story.excerpt];
  const paragraphsHtml = paragraphs
    .map(p => `<p style="margin-bottom:14px;line-height:1.75;font-size:14px;color:#334155">${escapeHtml(p)}</p>`)
    .join('');

  modalContent.innerHTML = `
    <div style="margin-bottom:16px">
      <span class="category-badge ${story.badgeClass || 'match'}" style="font-size:11px;padding:4px 10px">${escapeHtml(story.category)}</span>
      <div style="font-size:11px;color:#64748b;margin-top:8px;display:flex;gap:12px;flex-wrap:wrap">
        <span>📅 ${escapeHtml(story.date)}</span>
        <span>✍️ ${escapeHtml(story.author || 'Daystar Media')}</span>
        <span>📍 ${escapeHtml(story.location || 'Alua Primary Playground')}</span>
      </div>
    </div>

    <h2 id="modalStoryTitle" style="font-size:24px;font-weight:900;color:var(--navy);line-height:1.3;margin-bottom:18px">
      ${escapeHtml(story.title)}
    </h2>

    <img src="${story.image}" alt="${escapeHtml(story.title)}" style="width:100%;height:320px;object-fit:cover;border-radius:8px;margin-bottom:20px;background:var(--navy-light)" onerror="this.src='https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop'">

    <div class="story-body-content" style="border-top:1px solid #e2e8f0;padding-top:16px">
      ${paragraphsHtml}
    </div>

    <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div style="font-size:11px;color:#64748b">
        <b>DAYSTAR UNITED FC MEDIA</b> · Oluko Subcounty, Ayivu East, Arua City
      </div>
      <button type="button" onclick="closeStory()" style="background:var(--navy);color:#fff;font-weight:700;font-size:12px;padding:8px 18px;border-radius:6px;cursor:pointer">
        Close Story ✕
      </button>
    </div>
  `;

  modalBackdrop.style.display = 'grid';
  document.body.style.overflow = 'hidden';
}

function closeStory() {
  const modalBackdrop = document.getElementById('newsModalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function openAcademyModal() {
  const modal = document.getElementById('academyModalBackdrop');
  if (modal) {
    modal.style.display = 'grid';
    document.body.style.overflow = 'hidden';
  }
}

function closeAcademyModal() {
  const modal = document.getElementById('academyModalBackdrop');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function handleAcademyEnroll(event) {
  event.preventDefault();
  const childName = document.getElementById('acadChildName')?.value.trim();
  const dob = document.getElementById('acadChildDob')?.value;
  const category = document.getElementById('acadCategory')?.value;
  const school = document.getElementById('acadSchool')?.value.trim();
  const position = document.getElementById('acadPosition')?.value;
  const parentName = document.getElementById('acadParentName')?.value.trim();
  const parentPhone = document.getElementById('acadParentPhone')?.value.trim();
  const village = document.getElementById('acadVillage')?.value.trim();

  if (!childName || !parentPhone) {
    alert('Please fill in the child name and parent phone number.');
    return;
  }

  const application = {
    id: 'app_' + Date.now(),
    submittedAt: new Date().toISOString(),
    childName,
    dob,
    category,
    school,
    position,
    parentName,
    parentPhone,
    village,
    status: 'Pending Review'
  };

  try {
    const raw = localStorage.getItem('daystar_academy_applications');
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(application);
    localStorage.setItem('daystar_academy_applications', JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save academy application', e);
  }

  closeAcademyModal();
  alert(`🌟 Thank you, ${parentName}!\n\nRegistration for ${childName} (${category}) has been submitted to the Daystar Youth Football Academy desk.\n\nOur technical coaching staff will contact you at ${parentPhone} to confirm attendance for Saturday morning evaluation trials at Alua Primary School Playground!`);
  
  const form = document.getElementById('academyEnrollForm');
  if (form) form.reset();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStory();
    closeAcademyModal();
  }
});

// Auto-detect page and initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('homeHeroBanner')) renderHomePage();
  if (document.getElementById('newsHeroBanner')) renderNewsPage();
  if (document.getElementById('fixturesListContainer')) renderFixturesPage();
  if (document.querySelector('#fullStandingsTable')) renderStandingsPage();
  if (document.getElementById('squadFullRosterContainer')) renderSquadPage();
  if (document.getElementById('academyPageContent')) renderAcademyPage();
});
