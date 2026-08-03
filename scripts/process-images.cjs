const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function processImage(sourceFile, targets, width = null, quality = 85) {
  if (!fs.existsSync(sourceFile)) {
    console.log(`[SKIP] Missing source: ${sourceFile}`);
    return;
  }
  
  let pipeline = sharp(sourceFile);
  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }
  
  const buffer = await pipeline.webp({ quality }).toBuffer();

  for (const target of targets) {
    ensureDir(path.dirname(target));
    fs.writeFileSync(target, buffer);
    console.log(`  -> Saved: ${target} (${Math.round(buffer.length / 1024)} KB)`);
  }
}

async function run() {
  console.log('=== Syncing & Optimizing Project Images ===\n');

  // 1. Author Photo (Hero & Small)
  if (fs.existsSync('IMG_9734.JPG (1).webp')) {
    await processImage('IMG_9734.JPG (1).webp', [
      'public/author-photo.webp',
      'public/hero-creator.webp',
      'public/images/author-photo.webp',
      'public/images/hero-creator.webp',
      'src/assets/author-photo.webp',
      'src/assets/hero-creator.webp'
    ], 1200, 85);

    await processImage('IMG_9734.JPG (1).webp', [
      'public/author-photo-small.webp',
      'public/images/author-photo-small.webp'
    ], 400, 80);
  }

  // 2. Bonus Image
  if (fs.existsSync('IMG_1071.JPG (1).jpeg')) {
    await processImage('IMG_1071.JPG (1).jpeg', [
      'public/bonus-image.webp',
      'public/images/bonus-image.webp',
      'src/assets/bonus-image.webp'
    ], 1000, 85);
  } else if (fs.existsSync('IMG_0482.JPG (1).webp')) {
    await processImage('IMG_0482.JPG (1).webp', [
      'public/bonus-image.webp',
      'public/images/bonus-image.webp',
      'src/assets/bonus-image.webp'
    ], 1000, 85);
  }

  // 3. Testimonials
  const reviews = [
    { src: 'IMG_8807 (1).webp', name: 'review-1.webp' },
    { src: 'IMG_0747 (1).webp', name: 'review-2.webp' },
    { src: 'IMG_0628 (1).webp', name: 'review-3.webp' },
    { src: 'IMG_0629 (1).webp', name: 'review-4.webp' }
  ];
  for (const r of reviews) {
    await processImage(r.src, [
      `public/testimonials/${r.name}`,
      `public/images/testimonials/${r.name}`,
      `src/assets/testimonials/${r.name}`
    ], 800, 85);
  }

  // 4. Portfolio items
  const portfolioItems = [
    { src: 'IMG_1056,JPG-1.webp', altSrc: 'IMG_1056.JPG.webp', target: 'IMG_1056.JPG.webp' },
    { src: 'IMG_1057,JPG-1.webp', altSrc: 'IMG_1057.JPG.webp', target: 'IMG_1057.JPG.webp' },
    { src: 'IMG_1058,JPG-1.webp', altSrc: 'IMG_1058.JPG.webp', target: 'IMG_1058.JPG.webp' },
    { src: 'IMG_1059.JPG.webp', altSrc: null, target: 'IMG_1059.JPG.webp' },
    { src: 'IMG_1060.JPG.webp', altSrc: null, target: 'IMG_1060.JPG.webp' },
    { src: 'IMG_1063.webp', altSrc: null, target: 'IMG_1063.webp' },
    { src: 'IMG_1067.webp', altSrc: null, target: 'IMG_1067.webp' },
    { src: 'IMG_1068.JPG.webp', altSrc: null, target: 'IMG_1068.JPG.webp' },
  ];

  for (const p of portfolioItems) {
    const file = fs.existsSync(p.src) ? p.src : (p.altSrc && fs.existsSync(p.altSrc) ? p.altSrc : null);
    if (file) {
      await processImage(file, [
        `public/portfolio/${p.target}`,
        `public/images/portfolio/${p.target}`,
        `src/assets/portfolio/${p.target}`
      ], 1000, 85);
    }
  }

  console.log('\n=== Image Processing Complete! ===');
}

run().catch(console.error);
