const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function processImages() {
  console.log('🚀 Starting image optimization...');

  const dirs = [
    'public',
    'public/images',
    'public/testimonials',
    'public/images/testimonials',
    'public/portfolio',
    'public/images/portfolio',
    'public/modules',
    'public/images/modules',
    'src/assets',
    'src/assets/testimonials',
    'src/assets/portfolio',
    'src/assets/modules'
  ];
  dirs.forEach(ensureDir);

  // 1. Author Hero
  const heroSource = 'IMG_9734.JPG (1).webp';
  if (fs.existsSync(heroSource)) {
    console.log('📸 Hero image...');
    const heroBuffer = await sharp(heroSource)
      .resize({ width: 1080, height: 1440, fit: 'cover' })
      .webp({ quality: 85 })
      .toBuffer();

    const heroTargets = [
      'public/author-photo.webp',
      'public/hero-creator.webp',
      'public/images/author-photo.webp',
      'public/images/hero-creator.webp',
      'src/assets/author-photo.webp',
      'src/assets/hero-creator.webp'
    ];
    for (const t of heroTargets) fs.writeFileSync(t, heroBuffer);
  }

  // 2. Testimonials
  const reviewSources = {
    'review-1': 'IMG_8807 (1).webp',
    'review-2': 'IMG_0747 (1).webp',
    'review-3': 'IMG_0628 (1).webp',
    'review-4': 'IMG_0629 (1).webp'
  };

  for (const [name, srcFile] of Object.entries(reviewSources)) {
    if (fs.existsSync(srcFile)) {
      console.log(`💬 Review ${name}...`);
      const reviewBuffer = await sharp(srcFile)
        .resize({ width: 1080, height: 2340, fit: 'inside' })
        .webp({ quality: 85 })
        .toBuffer();

      const targets = [
        `public/testimonials/${name}.webp`,
        `public/images/testimonials/${name}.webp`,
        `src/assets/testimonials/${name}.webp`
      ];
      for (const t of targets) fs.writeFileSync(t, reviewBuffer);
    }
  }

  // Helper for clean SVG
  async function svgToWebp(svgString, width, height) {
    return await sharp(Buffer.from(svgString))
      .resize(width, height)
      .webp({ quality: 90 })
      .toBuffer();
  }

  // 3. Portfolio
  console.log('🎨 Portfolio covers...');
  const portfolioCases = [
    { id: 'work-1', label: 'Рилс түсірілімі', cat: 'Видео съемка', stat: '850K+ қаралым', color: '#3b82f6' },
    { id: 'work-2', label: 'Монтаж & Бояу', cat: 'Монтаж', stat: '1.2M+ қаралым', color: '#8b5cf6' },
    { id: 'work-3', label: 'Контент проект', cat: 'Сценарий', stat: '450K+ қаралым', color: '#ec4899' },
    { id: 'work-4', label: 'Динамикалық рилс', cat: 'Сторителл', stat: '2.1M+ қаралым', color: '#10b981' },
    { id: 'work-5', label: 'Өтімді рилс', cat: 'Оформление', stat: '620K+ қаралым', color: '#f59e0b' },
    { id: 'work-6', label: 'Диас Тугамбаев', cat: 'Кейс', stat: '3.5M+ қаралым', color: '#ef4444' },
    { id: 'work-7', label: 'Мобилография', cat: 'Мобильдік', stat: '980K+ қаралым', color: '#06b6d4' }
  ];

  for (const item of portfolioCases) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="1200" fill="#09090b" />
      <circle cx="400" cy="450" r="280" fill="${item.color}" opacity="0.2" />
      <rect x="50" y="50" width="700" height="1100" rx="32" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
      
      <rect x="120" y="180" width="560" height="680" rx="24" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
      
      <text x="400" y="480" font-family="Arial, sans-serif" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle">${escapeXml(item.stat)}</text>
      <text x="400" y="550" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="rgba(255,255,255,0.6)" text-anchor="middle">REELS TERMINATOR CASE</text>

      <rect x="120" y="920" width="560" height="120" rx="20" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
      <text x="400" y="990" font-family="Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">${escapeXml(item.label)}</text>
    </svg>`;

    const buf = await svgToWebp(svg, 800, 1200);
    const targets = [
      `public/portfolio/${item.id}.webp`,
      `public/images/portfolio/${item.id}.webp`,
      `src/assets/portfolio/${item.id}.webp`
    ];
    for (const t of targets) fs.writeFileSync(t, buf);
  }

  // 4. Modules
  console.log('📚 Module covers...');
  const modules = [
    { id: 'filming', title: '01. ТҮСІРІЛІМ', color: '#3b82f6', desc: 'Дайындық & Сенімділік' },
    { id: 'editing', title: '02. МОНТАЖ', color: '#8b5cf6', desc: 'Идея, Сценарий & Контент' },
    { id: 'growth', title: '03. ӨСУ & ОРТА', color: '#10b981', desc: 'Түсірілім & Тұрақтылық' }
  ];

  for (const m of modules) {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" rx="40" fill="#18181b" />
      <circle cx="300" cy="300" r="180" fill="${m.color}" opacity="0.25" />
      <rect x="30" y="30" width="540" height="540" rx="32" fill="none" stroke="${m.color}" stroke-width="3" opacity="0.4" />
      <text x="300" y="270" font-family="Arial, sans-serif" font-size="40" font-weight="900" fill="#ffffff" text-anchor="middle">${escapeXml(m.title)}</text>
      <text x="300" y="340" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="rgba(255,255,255,0.7)" text-anchor="middle">${escapeXml(m.desc)}</text>
    </svg>`;

    const buf = await svgToWebp(svg, 600, 600);
    const targets = [
      `public/modules/${m.id}.webp`,
      `public/images/modules/${m.id}.webp`,
      `src/assets/modules/${m.id}.webp`
    ];
    for (const t of targets) fs.writeFileSync(t, buf);
  }

  // 5. Bonus
  console.log('🎁 Bonus image...');
  const bonusSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="800" rx="48" fill="#09090b" />
    <circle cx="600" cy="400" r="320" fill="#f59e0b" opacity="0.15" />
    <rect x="40" y="40" width="1120" height="720" rx="36" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.5" />
    <text x="600" y="320" font-family="Arial, sans-serif" font-size="60" font-weight="900" fill="#ffffff" text-anchor="middle">VIP БОНУСТАР</text>
    <text x="600" y="420" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#f59e0b" text-anchor="middle">Дайын шаблон + Сценарийлер пагы + Орта</text>
    <text x="600" y="500" font-family="Arial, sans-serif" font-size="22" font-weight="normal" fill="rgba(255,255,255,0.8)" text-anchor="middle">REELS TERMINATOR ЕРЕКШЕ МҮМКІНДІКТЕРІ</text>
  </svg>`;

  const bonusBuf = await svgToWebp(bonusSvg, 1200, 800);
  const bonusTargets = [
    'public/bonus-image.webp',
    'public/images/bonus-image.webp',
    'src/assets/bonus-image.webp'
  ];
  for (const t of bonusTargets) fs.writeFileSync(t, bonusBuf);

  console.log('🎉 ALL IMAGES OPTIMIZED SUCCESSFULLY!');
}

processImages().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
