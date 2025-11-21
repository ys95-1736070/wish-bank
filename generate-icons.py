#!/usr/bin/env python3
"""
Generate PWA icons from the default image using Python and PIL/Pillow
Usage: python3 generate-icons.py
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("❌ Error: Pillow (PIL) is not installed.")
    print("")
    print("Please install it first:")
    print("  pip3 install Pillow")
    print("  or")
    print("  python3 -m pip install Pillow")
    print("")
    print("Or use an online tool instead:")
    print("  - https://www.pwabuilder.com/imageGenerator")
    print("  - https://realfavicongenerator.net/")
    sys.exit(1)

def generate_icon(source_path, output_path, size, padding_percent=10):
    """Generate a single icon with padding"""
    # Open and process image
    img = Image.open(source_path)
    
    # Convert to RGB if necessary
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Calculate dimensions
    padding = int(size * padding_percent / 100)
    inner_size = size - (padding * 2)
    
    # Resize image to fit with padding
    img_resized = img.resize((inner_size, inner_size), Image.Resampling.LANCZOS)
    
    # Create new image with background
    background_color = (243, 232, 255)  # Light purple
    new_img = Image.new('RGB', (size, size), background_color)
    
    # Paste resized image in center
    new_img.paste(img_resized, (padding, padding))
    
    # Save
    new_img.save(output_path, 'PNG', quality=95)
    print(f"  ✓ Created {output_path.name}")

def main():
    print("🎨 Generating PWA icons with Python...")
    print("")
    
    # Paths
    base_dir = Path(__file__).parent
    source_path = base_dir / "assets" / "piggy-bank-default.jpg"
    assets_dir = base_dir / "assets"
    
    # Check source image
    if not source_path.exists():
        print(f"❌ Error: Source image not found at {source_path}")
        print("Run 'node extract-image.js' first to extract the default image.")
        sys.exit(1)
    
    print(f"📸 Source image: {source_path}")
    print(f"📁 Output directory: {assets_dir}/")
    print("")
    
    # Icon sizes
    sizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512]
    
    try:
        # Generate all icon sizes
        for size in sizes:
            output_path = assets_dir / f"icon-{size}x{size}.png"
            generate_icon(source_path, output_path, size)
        
        # Generate favicons
        print("\nGenerating favicons...")
        generate_icon(source_path, assets_dir / "favicon-32x32.png", 32)
        generate_icon(source_path, assets_dir / "favicon-16x16.png", 16)
        
        # Generate Apple Touch Icon
        print("\nGenerating Apple Touch Icon...")
        generate_icon(source_path, assets_dir / "apple-touch-icon.png", 180)
        
        print("")
        print("✅ Done! Generated all icons successfully.")
        print("")
        print("📋 Generated files:")
        for size in sizes:
            print(f"   ✓ icon-{size}x{size}.png")
        print("   ✓ favicon-32x32.png")
        print("   ✓ favicon-16x16.png")
        print("   ✓ apple-touch-icon.png")
        print("")
        print("🎉 All icons ready! You can now test your PWA.")
        
    except Exception as e:
        print(f"\n❌ Error generating icons: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

