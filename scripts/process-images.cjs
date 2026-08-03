const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function run() {
  console.log('Syncing real images...');

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

  // Helper to copy/convert image to multiple destination files
  async function syncImage(sourceFile, targets) {
    if (!fs.existsSync(sourceFile)) {
      console.log(`Skipping missing source: ${sourceFile}`);
      return;
    }
    console.log(`Processing ${sourceFile} -> ${targets.join(', ')}`);
    const isJpeg = sourceFile.toLowerCase().endsWith('.jpg') || sourceFile.toLowerCase().endsWith('.jpeg');
    let buffer;
    if (isJpeg) {
      buffer = await sharp(sourceFile).webp({ quality: 90 }).toBuffer();
    } else {
      buffer = fs.readFileSync(sourceFile);
    }

    for (const target of targets) {
      ensureDir(path.dirname(target));
      fs.writeFileSync(target, buffer);
    }
  }

  // 1. Author Hero
  await syncImage('IMG_9734.JPG (1).webp', [
    'public/author-photo.webp',
    'public/hero-creator.webp',
    'public/images/author-photo.webp',
    'public/images/hero-creator.webp',
    'src/assets/author-photo.webp',
    'src/assets/hero-creator.webp'
  ]);

  // 2. Bonus Image (IMG_1071 is latest bonus photo)
  if (fs.existsSync('IMG_1071.JPG (1).jpeg')) {
    await syncImage('IMG_1071.JPG (1).jpeg', [
      'public/bonus-image.webp',
      'public/images/bonus-image.webp',
      'src/assets/bonus-image.webp'
    ]);
  } else if (fs.existsSync('IMG_0482.JPG (1).webp')) {
    await syncImage('IMG_0482.JPG (1).webp', [
      'public/bonus-image.webp',
      'public/images/bonus-image.webp',
      'src/assets/bonus-image.webp'
    ]);
  }

  // 3. Testimonials
  await syncImage('IMG_8807 (1).webp', [
    'public/testimonials/review-1.webp',
    'public/images/testimonials/review-1.webp',
    'src/assets/testimonials/review-1.webp'
  ]);
  await syncImage('IMG_0747 (1).webp', [
    'public/testimonials/review-2.webp',
    'public/images/testimonials/review-2.webp',
    'src/assets/testimonials/review-2.webp'
  ]);
  await syncImage('IMG_0628 (1).webp', [
    'public/testimonials/review-3.webp',
    'public/images/testimonials/review-3.webp',
    'src/assets/testimonials/review-3.webp'
  ]);
  await syncImage('IMG_0629 (1).webp', [
    'public/testimonials/review-4.webp',
    'public/images/testimonials/review-4.webp',
    'src/assets/testimonials/review-4.webp'
  ]);

  // 4. Portfolio items
  const portfolioPairs = [
    { src: 'IMG_1056,JPG-1.webp', altSrc: 'IMG_1056.JPG.webp', target: 'IMG_1056.JPG.webp' },
    { src: 'IMG_1057,JPG-1.webp', altSrc: 'IMG_1057.JPG.webp', target: 'IMG_1057.JPG.webp' },
    { src: 'IMG_1058,JPG-1.webp', altSrc: 'IMG_1058.JPG.webp', target: 'IMG_1058.JPG.webp' },
    { src: 'IMG_1059.JPG.webp', altSrc: null, target: 'IMG_1059.JPG.webp' },
    { src: 'IMG_1060.JPG.webp', altSrc: null, target: 'IMG_1060.JPG.webp' },
    { src: 'IMG_1063.webp', altSrc: null, target: 'IMG_1063.webp' },
    { src: 'IMG_1067.webp', altSrc: null, target: 'IMG_1067.webp' },
    { src: 'IMG_1068.JPG.webp', altSrc: null, target: 'IMG_1068.JPG.webp' },
  ];

  for (const pair of portfolioPairs) {
    const file = fs.existsSync(pair.src) ? pair.src : (pair.altSrc && fs.existsSync(pair.altSrc) ? pair.altSrc : null);
    if (file) {
      await syncImage(file, [
        `public/portfolio/${pair.target}`,
        `public/images/portfolio/${pair.target}`,
        `src/assets/portfolio/${pair.target}`
      ]);
    }
  }

  console.log('Images sync complete!');
}

run().catch(console.error);
