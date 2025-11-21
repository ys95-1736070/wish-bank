# Migration Guide

## Extracting the Default Image from Old Standalone File

The original `savings-tracker-standalone.html` file contains a large base64-encoded default piggy bank image. To extract it:

### Option 1: Manual Extraction

1. Open `savings-tracker-standalone.html` in a text editor
2. Find line 24 that starts with `const DEFAULT_IMAGE = "data:image/jpeg;base64,`
3. Copy the entire base64 string (including the data URI prefix)
4. Use an online tool like [Base64 Image Decoder](https://codebeautify.org/base64-to-image-converter)
5. Paste the string and download the image
6. Save it as `assets/piggy-bank-default.jpg`

### Option 2: Using Browser Console

1. Open `savings-tracker-standalone.html` in a browser
2. Open Developer Console (F12)
3. Run this code:

```javascript
// Get the base64 string from the page
const base64String = document.querySelector('script').textContent
  .match(/DEFAULT_IMAGE = "(data:image\/jpeg;base64,[^"]+)"/)[1];

// Create a download link
const link = document.createElement('a');
link.href = base64String;
link.download = 'piggy-bank-default.jpg';
link.click();
```

### Option 3: Using Node.js Script

Create a file `extract-image.js`:

```javascript
const fs = require('fs');

// Read the HTML file
const html = fs.readFileSync('savings-tracker-standalone.html', 'utf8');

// Extract base64 string
const match = html.match(/DEFAULT_IMAGE = "(data:image\/jpeg;base64,([^"]+))"/);
if (match) {
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync('assets/piggy-bank-default.jpg', buffer);
  console.log('Image extracted successfully!');
} else {
  console.log('Could not find image data');
}
```

Run it:
```bash
node extract-image.js
```

## Generating App Icons

You'll need icons in multiple sizes for PWA support. Use one of these tools:

1. **PWA Asset Generator** (Recommended)
   ```bash
   npx @pwa/asset-generator assets/piggy-bank-default.jpg assets/ --icon-only
   ```

2. **Online Tools**
   - [PWA Builder](https://www.pwabuilder.com/imageGenerator)
   - [Favicon Generator](https://realfavicongenerator.net/)

3. **Manual Creation**
   - Use image editing software (Photoshop, GIMP, etc.)
   - Create the following sizes:
     - 16x16, 32x32 (favicons)
     - 72x72, 96x96, 128x128, 144x144, 152x152 (Android)
     - 180x180 (Apple Touch Icon)
     - 192x192, 384x384, 512x512 (PWA standard)

## File Changes Summary

### Old Structure
```
wish-bank/
└── savings-tracker-standalone.html  (single monolithic file)
```

### New Structure
```
wish-bank/
├── index.html              (Clean HTML with PWA support)
├── manifest.json           (PWA configuration)
├── service-worker.js       (Offline support)
├── css/
│   └── styles.css         (Separated styles)
├── js/
│   ├── app.js             (Main application logic)
│   └── constants.js       (Configuration)
├── assets/                (Icons and images)
└── README.md              (Documentation)
```

## Key Improvements

1. **Separation of Concerns**: HTML, CSS, and JavaScript are now in separate files
2. **PWA Support**: Added manifest.json and service worker for app-like experience
3. **Mobile Optimized**: Better meta tags and mobile-specific optimizations
4. **Maintainability**: Modular code structure easier to update
5. **Performance**: External files can be cached separately
6. **Offline Support**: Service worker enables offline functionality
7. **Constants File**: Configuration centralized for easy customization
8. **Better Images**: Uses actual image files instead of base64 (better performance)

## Testing Checklist

- [x] Extract and add default piggy bank image
- [x] Generate and add all required icon sizes
- [ ] Test on mobile device
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Verify localStorage persistence
- [ ] Test image upload feature
- [ ] Check all buttons and modals
- [ ] Verify responsive design on different screen sizes
- [ ] Test in different browsers

## Troubleshooting

### Common Issues

**React Error #130 or module errors:**
- The app uses global variables from CDN scripts (not ES6 modules)
- Make sure all scripts load in order: React → ReactDOM → Lucide → constants.js → app.js
- Check browser console for script loading errors

**404 for .well-known/appspecific/com.chrome.devtools.json:**
- This is harmless - Chrome DevTools looking for debugging config
- Does not affect app functionality
- Can be safely ignored

**Service Worker not registering:**
- Must use HTTPS or localhost
- Check browser console for errors
- Try clearing browser cache and reloading

## Rollback

If you need to revert to the old version:
- The old `savings-tracker-standalone.html` file has been moved to `backup/` folder
- Simply use that file as before (it's completely standalone)

## Data Migration

The new version uses the same localStorage key (`savingsTrackerData`), so your existing data should transfer automatically. No migration needed!

