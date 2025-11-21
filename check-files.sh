#!/bin/bash

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║         🔍 CHECKING APP FILES                            ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check critical files
echo "📁 Checking critical files..."
echo ""

files=(
  "index.html"
  "js/app.js"
  "js/constants.js"
  "css/styles.css"
  "manifest.json"
  "service-worker.js"
  "assets/piggy-bank-default.jpg"
)

all_good=true

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    size=$(ls -lh "$file" | awk '{print $5}')
    echo "  ✅ $file ($size)"
  else
    echo "  ❌ $file MISSING!"
    all_good=false
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check JavaScript syntax
echo "🔍 Checking JavaScript syntax..."
echo ""

if command -v node &> /dev/null; then
  if node -c js/constants.js 2>&1; then
    echo "  ✅ js/constants.js - No syntax errors"
  else
    echo "  ❌ js/constants.js - HAS SYNTAX ERRORS!"
    all_good=false
  fi
  
  if node -c js/app.js 2>&1; then
    echo "  ✅ js/app.js - No syntax errors"
  else
    echo "  ❌ js/app.js - HAS SYNTAX ERRORS!"
    all_good=false
  fi
else
  echo "  ⚠️  Node.js not found - skipping syntax check"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Count icons
icon_count=$(ls assets/icon-*.png 2>/dev/null | wc -l | tr -d ' ')
echo "🖼️  PWA Icons: $icon_count/14"
if [ "$icon_count" -eq 14 ]; then
  echo "  ✅ All icons present"
else
  echo "  ⚠️  Missing icons (expected 14, found $icon_count)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$all_good" = true ]; then
  echo "✅ ALL CHECKS PASSED!"
  echo ""
  echo "🚀 Next steps:"
  echo "  1. Start server: python3 -m http.server 8000"
  echo "  2. Open browser: http://localhost:8000"
  echo "  3. Open console: F12 or Cmd+Option+I"
  echo "  4. Check for debug logs (🔍 [DEBUG])"
else
  echo "❌ SOME CHECKS FAILED!"
  echo ""
  echo "Please fix the issues above before continuing."
fi

echo ""

