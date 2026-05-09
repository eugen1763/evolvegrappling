const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertImage(inputPath, outputPath, width, quality = 80) {
    await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality })
        .toFile(outputPath);
    const inSize = fs.statSync(inputPath).size;
    const outSize = fs.statSync(outputPath).size;
    const reduction = ((1 - outSize / inSize) * 100).toFixed(1);
    const inMB = (inSize / 1024 / 1024).toFixed(1);
    const outKB = (outSize / 1024).toFixed(0);
    console.log(`  ${path.basename(inputPath)}: ${inMB}MB → ${outKB}KB (${reduction}% smaller)`);
}

async function main() {
    console.log('=== Hero images (desktop) → 1920px ===');
    const heroDesktopDir = 'src/lib/assets/title_backgrounds';
    const heroDesktop = fs.readdirSync(heroDesktopDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    for (const file of heroDesktop) {
        await convertImage(path.join(heroDesktopDir, file), `static/optimized/${path.parse(file).name}.webp`, 1920, 80);
    }

    console.log('\n=== Hero images (mobile) → 768px ===');
    const heroMobileDir = 'src/lib/assets/title_backgrounds_mobile';
    const heroMobile = fs.readdirSync(heroMobileDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    for (const file of heroMobile) {
        await convertImage(path.join(heroMobileDir, file), `static/optimized/${path.parse(file).name}.webp`, 768, 75);
    }

    console.log('\n=== Static images → 800px ===');
    const staticDir = 'static';
    const staticFiles = fs.readdirSync(staticDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f)).filter(f => f !== 'main_bg.jpg');
    for (const file of staticFiles) {
        await convertImage(path.join(staticDir, file), `static/optimized/${path.parse(file).name}.webp`, 800, 80);
    }

    const totalOptimized = fs.readdirSync('static/optimized').reduce((sum, f) => sum + fs.statSync(path.join('static/optimized', f)).size, 0);
    console.log(`\nTotal optimized: ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
}

main().catch(console.error);
