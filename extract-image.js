#!/usr/bin/env node

/**
 * Extract the base64-encoded default image from the old standalone HTML file
 * Usage: node extract-image.js
 */

const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'backup', 'savings-tracker-standalone.html');
const OUTPUT_FILE = path.join(__dirname, 'assets', 'piggy-bank-default.jpg');

console.log('🎨 Extracting default image from old standalone file...\n');

try {
  // Check if source file exists
  if (!fs.existsSync(HTML_FILE)) {
    console.error('❌ Error: Could not find backup/savings-tracker-standalone.html');
    console.log('Make sure the file exists at:', HTML_FILE);
    process.exit(1);
  }

  // Read the HTML file
  console.log('📖 Reading file...');
  const html = fs.readFileSync(HTML_FILE, 'utf8');

  // Extract base64 string
  console.log('🔍 Searching for image data...');
  const match = html.match(/DEFAULT_IMAGE\s*=\s*"data:image\/jpeg;base64,([^"]+)"/);
  
  if (!match || !match[1]) {
    console.error('❌ Error: Could not find image data in file');
    console.log('The file format may have changed.');
    process.exit(1);
  }

  const base64Data = match[1];
  console.log(`✅ Found image data (${Math.round(base64Data.length / 1024)}KB)`);

  // Ensure assets directory exists
  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.log('📁 Creating assets directory...');
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Convert base64 to buffer and write to file
  console.log('💾 Writing image file...');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(OUTPUT_FILE, buffer);

  console.log('✅ Success! Image extracted to:', OUTPUT_FILE);
  console.log(`📊 File size: ${Math.round(buffer.length / 1024)}KB`);
  console.log('\n🎉 Done! You can now use this image as your default piggy bank.');
  console.log('\n💡 Next steps:');
  console.log('   1. Verify the image looks correct');
  console.log('   2. Generate PWA icons (see MIGRATION.md)');
  console.log('   3. Test the app at http://localhost:8000');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

