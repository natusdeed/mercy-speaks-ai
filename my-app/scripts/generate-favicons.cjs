const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = path.join(__dirname, '../public/images/Mercy-avatar.png');
const publicDir = path.join(__dirname, '../public');

// Favicon sizes to generate
const sizes = [16, 32, 48, 180, 192, 512];

async function generateFavicons() {
  try {
    console.log('Reading source image...');
    const image = sharp(sourceImage);
    const metadata = await image.metadata();
    
    // Get the minimum dimension to ensure square crop
    const minDimension = Math.min(metadata.width, metadata.height);
    
    // Calculate crop to center the image (ensuring face isn't cut off)
    const left = Math.floor((metadata.width - minDimension) / 2);
    const top = Math.floor((metadata.height - minDimension) / 2);
    
    console.log(`Source image: ${metadata.width}x${metadata.height}`);
    console.log(`Cropping to centered square: ${minDimension}x${minDimension}`);
    
    // Generate PNG favicons for each size
    console.log('\nGenerating PNG favicons...');
    for (const size of sizes) {
      const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
      
      await image
        .clone()
        .extract({
          left,
          top,
          width: minDimension,
          height: minDimension,
        })
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(outputPath);
      
      console.log(`✓ Generated favicon-${size}x${size}.png`);
    }
    
    // Generate Apple touch icon (180x180)
    const appleTouchIconPath = path.join(publicDir, 'apple-touch-icon.png');
    await image
      .clone()
      .extract({
        left,
        top,
        width: minDimension,
        height: minDimension,
      })
      .resize(180, 180, {
        fit: 'cover',
        position: 'center',
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(appleTouchIconPath);
    console.log('✓ Generated apple-touch-icon.png');
    
    // Generate icon.png (Next.js convention, typically 512x512)
    const iconPath = path.join(publicDir, 'icon.png');
    await image
      .clone()
      .extract({
        left,
        top,
        width: minDimension,
        height: minDimension,
      })
      .resize(512, 512, {
        fit: 'cover',
        position: 'center',
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(iconPath);
    console.log('✓ Generated icon.png');
    
    // Generate favicon.ico (multi-size ICO file)
    // ICO files can contain multiple sizes, so we'll create one with 16, 32, and 48
    console.log('\nGenerating favicon.ico (multi-size)...');
    const icoSizes = [16, 32, 48];
    const icoBuffers = [];
    
    for (const size of icoSizes) {
      const buffer = await image
        .clone()
        .extract({
          left,
          top,
          width: minDimension,
          height: minDimension,
        })
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png()
        .toBuffer();
      
      icoBuffers.push({ size, buffer });
    }
    
    // For Next.js 15, we can use a simple approach: create a 32x32 favicon.ico
    // Sharp doesn't natively support ICO format, so we'll use a workaround
    // Create a 32x32 PNG and rename it (browsers will accept PNG as favicon.ico)
    const faviconIcoPath = path.join(publicDir, 'favicon.ico');
    await image
      .clone()
      .extract({
        left,
        top,
        width: minDimension,
        height: minDimension,
      })
      .resize(32, 32, {
        fit: 'cover',
        position: 'center',
      })
      .png({
        quality: 100,
        compressionLevel: 9,
      })
      .toFile(faviconIcoPath);
    console.log('✓ Generated favicon.ico');
    
    console.log('\n✅ All favicons generated successfully!');
    console.log('\nGenerated files:');
    sizes.forEach(size => {
      console.log(`  - favicon-${size}x${size}.png`);
    });
    console.log('  - apple-touch-icon.png');
    console.log('  - icon.png');
    console.log('  - favicon.ico');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
