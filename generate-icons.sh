#!/bin/bash

# Generate PWA icons from the default image
# This script uses ImageMagick to create icons in all required sizes

echo "🎨 Generating PWA icons..."
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick is not installed."
    echo ""
    echo "Please install it first:"
    echo "  macOS:   brew install imagemagick"
    echo "  Ubuntu:  sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    echo ""
    echo "Or use an online tool instead:"
    echo "  - https://www.pwabuilder.com/imageGenerator"
    echo "  - https://realfavicongenerator.net/"
    exit 1
fi

SOURCE="assets/piggy-bank-default.jpg"

if [ ! -f "$SOURCE" ]; then
    echo "❌ Error: Source image not found at $SOURCE"
    echo "Run 'node extract-image.js' first to extract the default image."
    exit 1
fi

echo "📸 Source image: $SOURCE"
echo "📁 Output directory: assets/"
echo ""

# Create icons with proper sizing and padding
SIZES=(16 32 72 96 128 144 152 180 192 384 512)

for size in "${SIZES[@]}"; do
    output="assets/icon-${size}x${size}.png"
    echo "Creating ${size}x${size}..."
    
    # Calculate padding (10% on each side)
    padding=$((size / 10))
    inner_size=$((size - padding * 2))
    
    # Resize, add padding, and save
    convert "$SOURCE" \
        -resize "${inner_size}x${inner_size}" \
        -gravity center \
        -background "rgba(139, 92, 246, 0.1)" \
        -extent "${size}x${size}" \
        "$output"
done

# Create favicons
echo "Creating favicons..."
convert "$SOURCE" -resize 32x32 assets/favicon-32x32.png
convert "$SOURCE" -resize 16x16 assets/favicon-16x16.png

# Create Apple Touch Icon
echo "Creating Apple Touch Icon..."
convert "$SOURCE" -resize 180x180 assets/apple-touch-icon.png

echo ""
echo "✅ Done! Generated all icons successfully."
echo ""
echo "📋 Generated files:"
for size in "${SIZES[@]}"; do
    echo "   ✓ icon-${size}x${size}.png"
done
echo "   ✓ favicon-32x32.png"
echo "   ✓ favicon-16x16.png"
echo "   ✓ apple-touch-icon.png"
echo ""
echo "🎉 All icons ready! You can now test your PWA."

