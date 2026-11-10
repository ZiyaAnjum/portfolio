const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');

// Helper to pack PNG buffers into an ICO file
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type (1)
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + 16 * count;
  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
}

// Ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.toString().replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

async function generateFavicons() {
  console.log('Generating favicons...');
  const svg = `
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#030712"/>
    <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" stroke="url(#borderGlow)" stroke-width="2.5"/>
    <circle cx="32" cy="32" r="24" fill="#6366f1" fill-opacity="0.12" filter="blur(8px)"/>
    <text x="32" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" letter-spacing="-1" text-anchor="middle">ZA</text>
    <defs>
      <linearGradient id="borderGlow" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stop-color="#38bdf8"/>
        <stop offset="0.5" stop-color="#6366f1"/>
        <stop offset="1" stop-color="#a855f7"/>
      </linearGradient>
    </defs>
  </svg>`;

  const svgBuffer = Buffer.from(svg);
  const b16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const b32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const b48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: b16 },
    { width: 32, height: 32, buffer: b32 },
    { width: 48, height: 48, buffer: b48 },
  ]);

  fs.writeFileSync(path.join(root, 'src', 'app', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(root, 'src', 'app', 'icon.png'), b48);
  console.log('Favicons generated successfully.');
}

async function generateOgImage() {
  console.log('Generating og-image.png...');
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Deep Space Background -->
    <rect width="${width}" height="${height}" fill="#030712"/>

    <!-- Subtle Grid Pattern -->
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" stroke-width="1" stroke-opacity="0.35"/>
      </pattern>
      <radialGradient id="nebula1" cx="0.2" cy="0.3" r="0.6">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="nebula2" cx="0.85" cy="0.75" r="0.55">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="nebula3" cx="0.5" cy="0.9" r="0.4">
        <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0f172a" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#090d16" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="glowBorder" x1="0" y1="0" x2="1120" y2="550" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6"/>
        <stop offset="35%" stop-color="#6366f1" stop-opacity="0.3"/>
        <stop offset="70%" stop-color="#8b5cf6" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#ec4899" stop-opacity="0.3"/>
      </linearGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#grid)"/>
    <rect width="${width}" height="${height}" fill="url(#nebula1)"/>
    <rect width="${width}" height="${height}" fill="url(#nebula2)"/>
    <rect width="${width}" height="${height}" fill="url(#nebula3)"/>

    <!-- Cosmic Accent Card -->
    <rect x="40" y="40" width="1120" height="550" rx="24" fill="url(#cardGrad)"/>
    <rect x="40" y="40" width="1120" height="550" rx="24" stroke="url(#glowBorder)" stroke-width="2"/>

    <!-- Decorative Top Status Bar -->
    <circle cx="80" cy="80" r="7" fill="#ef4444"/>
    <circle cx="104" cy="80" r="7" fill="#f59e0b"/>
    <circle cx="128" cy="80" r="7" fill="#10b981"/>

    <!-- Pill Badge -->
    <rect x="160" y="66" width="310" height="28" rx="14" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1.2"/>
    <text x="315" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12" fill="#a5b4fc" letter-spacing="1.5" text-anchor="middle">PORTFOLIO // AI &amp; FULL-STACK</text>

    <!-- Main Title -->
    <text x="80" y="195" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="68" fill="#ffffff" letter-spacing="-1.5">Ziya Anjum</text>

    <!-- Role Subtitle -->
    <text x="80" y="255" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="30" fill="#38bdf8" letter-spacing="-0.5">AI/ML &amp; Full-Stack Developer</text>

    <!-- Tagline -->
    <text x="80" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="22" fill="#cbd5e1">I build and ship full-stack and AI-powered products.</text>
    <text x="80" y="350" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="400" font-size="17" fill="#94a3b8">B.E. AI &amp; ML at AITM Bhatkal • MERN Stack &amp; Machine Learning</text>

    <!-- Feature Project Pills -->
    <g transform="translate(80, 395)">
      <!-- Pill 1: Campus2Career -->
      <rect x="0" y="0" width="180" height="42" rx="10" fill="#111827" stroke="#374151" stroke-width="1.2"/>
      <circle cx="20" cy="21" r="5" fill="#6366f1"/>
      <text x="35" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="15" fill="#f3f4f6">Campus2Career</text>

      <!-- Pill 2: Stashly -->
      <rect x="195" y="0" width="130" height="42" rx="10" fill="#111827" stroke="#374151" stroke-width="1.2"/>
      <circle cx="215" cy="21" r="5" fill="#10b981"/>
      <text x="230" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="15" fill="#f3f4f6">Stashly</text>

      <!-- Pill 3: ThreatLensAI -->
      <rect x="340" y="0" width="175" height="42" rx="10" fill="#111827" stroke="#374151" stroke-width="1.2"/>
      <circle cx="360" cy="21" r="5" fill="#f43f5e"/>
      <text x="375" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="15" fill="#f3f4f6">ThreatLensAI</text>

      <!-- Pill 4: DormFix -->
      <rect x="530" y="0" width="140" height="42" rx="10" fill="#111827" stroke="#374151" stroke-width="1.2"/>
      <circle cx="550" cy="21" r="5" fill="#f59e0b"/>
      <text x="565" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="15" fill="#f3f4f6">DormFix</text>

      <!-- Pill 5: Digital Legacy -->
      <rect x="685" y="0" width="180" height="42" rx="10" fill="#111827" stroke="#374151" stroke-width="1.2"/>
      <circle cx="705" cy="21" r="5" fill="#a855f7"/>
      <text x="720" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="15" fill="#f3f4f6">Digital Legacy</text>
    </g>

    <!-- Footer Meta -->
    <line x1="80" y1="480" x2="1080" y2="480" stroke="#1e293b" stroke-width="1.5"/>
    <text x="80" y="525" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="17" fill="#94a3b8">Shiroor, India</text>
    <circle cx="215" cy="520" r="3" fill="#475569"/>
    <text x="235" y="525" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="17" fill="#818cf8">github.com/ZiyaAnjum</text>
    <circle cx="430" cy="520" r="3" fill="#475569"/>
    <text x="450" y="525" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="17" fill="#818cf8">linkedin.com/in/ziya-anjum</text>
    <text x="1080" y="525" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" fill="#38bdf8" text-anchor="end">Interactive 3D Portfolio</text>
  </svg>`;

  const destDir = path.join(root, 'public', 'assets', 'seo');
  ensureDir(destDir);
  await sharp(Buffer.from(svg)).resize(width, height).png({ quality: 95 }).toFile(path.join(destDir, 'og-image.png'));
  console.log('og-image.png generated successfully.');
}

// Project Definitions
const projects = [
  {
    id: 'campus2career',
    title: 'Campus2Career',
    category: 'EdTech & AI Roadmap Engine',
    tagline: 'Personalised Skill Roadmap & AI Interview Platform',
    accent: '#6366f1',
    accentSecondary: '#8b5cf6',
    url: 'https://campus2career.app',
    features: [
      'Resume Skill Extraction & Knowledge Gap Mapping',
      'Target Role Alignment & Real-Time Match Scoring',
      'Adaptive Step-by-Step Learning Milestones',
      'Interactive AI Mock Technical Interviews',
    ],
    stack: ['React', 'Node.js', 'Express', 'Supabase', 'Gemini AI'],
  },
  {
    id: 'stashly',
    title: 'Stashly',
    category: 'FinTech & AI Utility',
    tagline: 'AI Assistant for Warranty & Receipt Tracking',
    accent: '#10b981',
    accentSecondary: '#06b6d4',
    url: 'https://stashly.app',
    features: [
      'Automated Receipt & Invoice Optical Extraction',
      'Warranty Expiry Timelines & Smart Reminders',
      'Streamlined Step-by-Step Claim Assistants',
      'Return Window Tracking & Central Vault',
    ],
    stack: ['React', 'Node.js', 'Express', 'OCR Engine', 'Tailwind CSS'],
  },
  {
    id: 'threatlensai',
    title: 'ThreatLensAI',
    category: 'Cybersecurity & Threat Intel',
    tagline: 'Intelligent Email Threat & Phishing Detection Platform',
    accent: '#f43f5e',
    accentSecondary: '#fb7185',
    url: 'https://threatlens.ai',
    features: [
      'Multi-Model Phishing & Domain Spoof Detection',
      'End-to-End Email Origin & Route Traceback',
      'Gemini-Powered Realtime Scam Check API',
      'Supabase-Backed Community Threat Reports',
    ],
    stack: ['Python', 'Machine Learning', 'Gemini API', 'Next.js', 'Supabase'],
  },
  {
    id: 'dormfix',
    title: 'DormFix',
    category: 'Facility Management & Operations',
    tagline: 'Hostel Complaint Tracking & Auto-Escalation System',
    accent: '#f59e0b',
    accentSecondary: '#ea580c',
    url: 'https://dormfix.internal',
    features: [
      'Instant Complaint Logging with Photo Proof Uploads',
      '48-Hour Auto-Escalation SLA Engine',
      'Duplicate Grievance Detection & Rate Limiting',
      'Role-Based Admin Dashboard with Status Triage',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'JWT / Bcrypt', 'Render'],
  },
  {
    id: 'digitallegacy',
    title: 'Digital Legacy & Password Vault',
    category: 'Information Security & Cryptography',
    tagline: 'Encrypted Credential Vault with Nominee Emergency Flow',
    accent: '#a855f7',
    accentSecondary: '#c084fc',
    url: 'https://vault.internal',
    features: [
      'Zero-Knowledge Client-Side AES-256-GCM Encryption',
      'Time-Delayed Nominee Emergency Access Protocol',
      'User Heartbeat & Inactivity Trigger Detection',
      'Tamper-Evident Audit Logs & Secret Key Delegation',
    ],
    stack: ['Node.js', 'MySQL', 'AES-256-GCM', 'JWT', 'REST API'],
  },
];

async function generateProjectScreenshots() {
  console.log('Generating project screenshots (landing.png)...');
  const width = 1200;
  const height = 800;

  for (const proj of projects) {
    const featureSvgItems = proj.features
      .map(
        (f, idx) => `
        <g transform="translate(60, ${370 + idx * 56})">
          <rect x="0" y="0" width="1080" height="46" rx="8" fill="#111827" fill-opacity="0.8" stroke="#1f2937" stroke-width="1"/>
          <circle cx="24" cy="23" r="5" fill="${proj.accent}"/>
          <text x="44" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="16" fill="#e2e8f0">${escapeXml(f)}</text>
        </g>
      `
      )
      .join('');

    const stackPills = proj.stack
      .map((tech, idx) => {
        const offset = idx * 135;
        return `
        <g transform="translate(${60 + offset}, 630)">
          <rect x="0" y="0" width="120" height="34" rx="17" fill="#1e293b" stroke="${proj.accent}" stroke-opacity="0.4" stroke-width="1.2"/>
          <text x="60" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="13" fill="#cbd5e1" text-anchor="middle">${escapeXml(tech)}</text>
        </g>
      `;
      })
      .join('');

    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#080c16"/>

      <!-- Accent Ambient Glow -->
      <defs>
        <radialGradient id="projGlow_${proj.id}" cx="0.85" cy="0.15" r="0.6">
          <stop offset="0%" stop-color="${proj.accent}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#080c16" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="projGlow2_${proj.id}" cx="0.1" cy="0.9" r="0.5">
          <stop offset="0%" stop-color="${proj.accentSecondary}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#080c16" stop-opacity="0"/>
        </radialGradient>
        <pattern id="cardGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1f2937" stroke-width="0.8" stroke-opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#cardGrid)"/>
      <rect width="${width}" height="${height}" fill="url(#projGlow_${proj.id})"/>
      <rect width="${width}" height="${height}" fill="url(#projGlow2_${proj.id})"/>

      <!-- Browser Window Frame Mockup -->
      <rect x="30" y="30" width="1140" height="740" rx="16" fill="#0b1120" fill-opacity="0.95" stroke="#1e293b" stroke-width="2"/>

      <!-- Window Header Bar -->
      <path d="M 30 46 A 16 16 0 0 1 46 30 L 1154 30 A 16 16 0 0 1 1170 46 L 1170 80 L 30 80 Z" fill="#0f172a"/>
      <line x1="30" y1="80" x2="1170" y2="80" stroke="#1e293b" stroke-width="1"/>

      <!-- Window Traffic Lights -->
      <circle cx="62" cy="55" r="6" fill="#ef4444"/>
      <circle cx="82" cy="55" r="6" fill="#f59e0b"/>
      <circle cx="102" cy="55" r="6" fill="#10b981"/>

      <!-- Mock URL Bar -->
      <rect x="140" y="42" width="460" height="26" rx="13" fill="#1e293b" stroke="#334155" stroke-width="1"/>
      <circle cx="160" cy="55" r="4" fill="${proj.accent}"/>
      <text x="175" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="12" fill="#94a3b8">${escapeXml(proj.url)}</text>

      <!-- Watermark Tag -->
      <rect x="910" y="44" width="230" height="22" rx="11" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
      <text x="1025" y="59" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="10" fill="#a5b4fc" letter-spacing="1" text-anchor="middle">ZIYA ANJUM PORTFOLIO</text>

      <!-- App Header / Hero Area inside Window -->
      <g transform="translate(60, 120)">
        <!-- Category Badge -->
        <rect x="0" y="0" width="260" height="28" rx="14" fill="${proj.accent}" fill-opacity="0.15" stroke="${proj.accent}" stroke-opacity="0.5" stroke-width="1"/>
        <text x="130" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="11" fill="${proj.accent}" letter-spacing="0.8" text-anchor="middle">${escapeXml(proj.category.toUpperCase())}</text>

        <!-- Project Title -->
        <text x="0" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="48" fill="#ffffff" letter-spacing="-1">${escapeXml(proj.title)}</text>

        <!-- Tagline -->
        <text x="0" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="20" fill="#94a3b8">${escapeXml(proj.tagline)}</text>
      </g>

      <!-- Core Features List Mockup -->
      ${featureSvgItems}

      <!-- Tech Stack Badges -->
      <text x="60" y="615" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12" fill="#64748b" letter-spacing="1">BUILT WITH</text>
      ${stackPills}

      <!-- Bottom Card Status -->
      <text x="1110" y="735" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="13" fill="#64748b" text-anchor="end">Production Ready Architecture • Real-Time AI</text>
    </svg>`;

    const destDir = path.join(root, 'public', 'assets', 'projects-screenshots', proj.id);
    ensureDir(destDir);
    await sharp(Buffer.from(svg)).resize(width, height).png({ quality: 95 }).toFile(path.join(destDir, 'landing.png'));
    console.log(`Generated ${proj.id}/landing.png`);
  }
}

async function generateBackgrounds() {
  console.log('Generating project wallpapers in public/assets/backgrounds/...');
  const width = 1200;
  const height = 800;

  for (const proj of projects) {
    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dark Cosmic Base -->
      <rect width="${width}" height="${height}" fill="#030712"/>

      <defs>
        <radialGradient id="bgNebula1_${proj.id}" cx="0.7" cy="0.3" r="0.65">
          <stop offset="0%" stop-color="${proj.accent}" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bgNebula2_${proj.id}" cx="0.25" cy="0.75" r="0.5">
          <stop offset="0%" stop-color="${proj.accentSecondary}" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
        </radialGradient>
        <pattern id="bgGrid_${proj.id}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" stroke-width="0.8" stroke-opacity="0.25"/>
        </pattern>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bgGrid_${proj.id})"/>
      <rect width="${width}" height="${height}" fill="url(#bgNebula1_${proj.id})"/>
      <rect width="${width}" height="${height}" fill="url(#bgNebula2_${proj.id})"/>

      <!-- Abstract Geometric Circuit Lines -->
      <path d="M 0 200 L 400 200 L 550 350 L 1200 350" stroke="${proj.accent}" stroke-opacity="0.15" stroke-width="2" fill="none"/>
      <path d="M 0 550 L 300 550 L 450 400 L 1200 400" stroke="${proj.accentSecondary}" stroke-opacity="0.12" stroke-width="1.5" fill="none"/>

      <!-- Subtle Glowing Ring -->
      <circle cx="850" cy="350" r="180" stroke="${proj.accent}" stroke-opacity="0.15" stroke-width="1.5" fill="none" stroke-dasharray="8 6"/>

      <!-- Watermark Typography -->
      <text x="1120" y="730" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="72" fill="#ffffff" fill-opacity="0.05" text-anchor="end">${escapeXml(proj.title.toUpperCase())}</text>
    </svg>`;

    const destFile = path.join(root, 'public', 'assets', 'backgrounds', `${proj.id}.jpg`);
    await sharp(Buffer.from(svg)).resize(width, height).jpeg({ quality: 90 }).toFile(destFile);
    console.log(`Generated background ${proj.id}.jpg`);
  }
}

async function generateNavPreviews() {
  console.log('Generating nav link preview cards...');
  const width = 600;
  const height = 450;

  const navs = [
    { name: 'landing.png', title: 'Home', subtitle: 'Hero, 3D Keyboard & Introduction', accent: '#6366f1' },
    { name: 'about.png', title: 'About Me', subtitle: 'B.E. AI & ML Student • Ziya Anjum', accent: '#38bdf8' },
    { name: 'skills.png', title: 'Tech Stack', subtitle: 'Languages, MERN, AI/ML & Cloud', accent: '#10b981' },
    { name: 'projects.png', title: 'Featured Projects', subtitle: 'Campus2Career, Stashly & ThreatLensAI', accent: '#f43f5e' },
    { name: 'contact.png', title: 'Get In Touch', subtitle: 'Shiroor, India • Email & Socials', accent: '#a855f7' },
  ];

  const destDir = path.join(root, 'public', 'assets', 'nav-link-previews');
  ensureDir(destDir);

  for (const nav of navs) {
    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#050811"/>
      <defs>
        <radialGradient id="navGlow_${nav.title}" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stop-color="${nav.accent}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#050811" stop-opacity="0"/>
        </radialGradient>
        <pattern id="navPattern" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1f2937" stroke-width="0.6" stroke-opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#navPattern)"/>
      <rect width="${width}" height="${height}" fill="url(#navGlow_${nav.title})"/>

      <rect x="24" y="24" width="552" height="402" rx="16" fill="#0b1120" fill-opacity="0.9" stroke="#1e293b" stroke-width="1.5"/>

      <!-- Top Bar -->
      <circle cx="50" cy="50" r="5" fill="#ef4444"/>
      <circle cx="66" cy="50" r="5" fill="#f59e0b"/>
      <circle cx="82" cy="50" r="5" fill="#10b981"/>

      <rect x="420" y="40" width="130" height="20" rx="10" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
      <text x="485" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="9" fill="#a5b4fc" letter-spacing="0.8" text-anchor="middle">ZIYA ANJUM</text>

      <!-- Center Content -->
      <g transform="translate(50, 160)">
        <rect x="0" y="0" width="14" height="14" rx="3" fill="${nav.accent}"/>
        <text x="24" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="12" fill="${nav.accent}" letter-spacing="1">SECTION PREVIEW</text>

        <text x="0" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="38" fill="#ffffff" letter-spacing="-0.5">${escapeXml(nav.title)}</text>
        <text x="0" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="17" fill="#94a3b8">${escapeXml(nav.subtitle)}</text>
      </g>

      <!-- Bottom Card Status -->
      <line x1="50" y1="360" x2="550" y2="360" stroke="#1e293b" stroke-width="1"/>
      <text x="50" y="390" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="13" fill="#64748b">Ziya Anjum Portfolio</text>
      <text x="550" y="390" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="13" fill="${nav.accent}" text-anchor="end">Jump to section &#8594;</text>
    </svg>`;

    await sharp(Buffer.from(svg)).resize(width, height).png({ quality: 90 }).toFile(path.join(destDir, nav.name));
    console.log(`Generated nav preview ${nav.name}`);
  }
}

function cleanLegacyAssets() {
  console.log('Cleaning legacy template assets...');

  // 1. Delete legacy author project screenshot directories
  const legacyProjectDirs = [
    'codingducks',
    'gumbalup',
    'kanbi',
    'peakposts',
    'portfolio',
    'storekit',
    'unottr',
  ];
  for (const dir of legacyProjectDirs) {
    const target = path.join(root, 'public', 'assets', 'projects-screenshots', dir);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
      console.log(`Deleted legacy screenshot folder: ${dir}`);
    }
  }

  // 2. Delete legacy author wallpapers in public/assets/backgrounds/
  const legacyBackgrounds = [
    'codingducks.jpg',
    'gumbalup.jpg',
    'kanbi.jpg',
    'peakposts.jpg',
    'portfolio.jpg',
    'storekit.jpg',
    'unottr.jpg',
  ];
  for (const bg of legacyBackgrounds) {
    const target = path.join(root, 'public', 'assets', 'backgrounds', bg);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { force: true });
      console.log(`Deleted legacy background: ${bg}`);
    }
  }

  // 3. Delete author's photo me.jpg and old logos
  const legacyFiles = [
    path.join(root, 'public', 'assets', 'me.jpg'),
    path.join(root, 'public', 'assets', 'logo-dark.svg'),
    path.join(root, 'public', 'assets', 'projects-screenshots', 'logo-dark.svg'),
    path.join(root, 'public', 'assets', 'projects-screenshots', 'logo-dark.webp'),
  ];
  for (const file of legacyFiles) {
    if (fs.existsSync(file)) {
      fs.rmSync(file, { force: true });
      console.log(`Deleted legacy file: ${path.basename(file)}`);
    }
  }

  console.log('Legacy asset cleanup complete.');
}

async function main() {
  try {
    cleanLegacyAssets();
    await generateFavicons();
    await generateOgImage();
    await generateProjectScreenshots();
    await generateBackgrounds();
    await generateNavPreviews();
    console.log('All assets successfully processed and generated!');
  } catch (err) {
    console.error('Asset generation failed:', err);
    process.exit(1);
  }
}

main();

