const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDir = path.join(__dirname, 'public', 'icons');
const svgPath = path.join(iconDir, 'icon.svg');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(svgPath);
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iconDir, `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }

  // Generate apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate maskable icon with padding (512x512 with 20% safe zone padding)
  const maskableSize = 512;
  const padding = Math.round(maskableSize * 0.1);
  const innerSize = maskableSize - (padding * 2);
  
  const innerIcon = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .png()
    .toBuffer();
  
  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 4,
      background: { r: 16, g: 16, b: 34, alpha: 1 }
    }
  })
    .composite([{ input: innerIcon, top: padding, left: padding }])
    .png()
    .toFile(path.join(iconDir, 'maskable-icon-512x512.png'));
  console.log('Generated maskable-icon-512x512.png');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
