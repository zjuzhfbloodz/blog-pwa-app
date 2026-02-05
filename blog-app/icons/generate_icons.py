#!/usr/bin/env python3
"""
Generate simple placeholder icons for Blog PWA
Use PIL to create simple icons
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, text):
    """Create a simple icon with text"""
    # Create gradient background
    img = Image.new('RGB', (size, size), '#3b82f6')
    draw = ImageDraw.Draw(img)
    
    # Draw border
    draw.rectangle([0, 0, size-1, size-1], fill='#2563eb', width=3)
    
    # Add some decoration
    draw.rectangle([10, 10, size-10, size-10], fill='#60a5fa', width=2)
    
    # Try to add text
    try:
        font_size = size // 4
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        
        # Draw emoji/text
        emoji = "📝"
        draw.text((size//2 - font_size//3, size//2 - font_size//2), emoji, font=font)
    except:
        pass
    
    return img

# Icon sizes needed
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

# Create icons directory
icon_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Generating icons in: {icon_dir}")
print(f"Sizes: {sizes}")
print("\nGenerating placeholder icons...")

for size in sizes:
    try:
        img = create_icon(size, '📝')
        filename = f"icon-{size}.png"
        filepath = os.path.join(icon_dir, filename)
        img.save(filepath, 'PNG')
        print(f"✅ Created: {filename} ({size}x{size})")
    except Exception as e:
        print(f"❌ Failed to create {size}: {e}")

print("\n" + "="*60)
print("📱 Icon Generation Complete!")
print("="*60)
print("\n⚠️  Note: These are placeholder icons.")
print("For production, replace them with real icons.")
print("\n💡 Tip: Use https://realfavicongenerator.net for real icons")
