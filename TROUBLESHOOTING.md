# 🔧 Troubleshooting Guide

Common issues and solutions for Wish Bank Savings Tracker.

---

## ✅ Issue Fixed: React Error #130

### Problem
```
Error: Minified React error #130
```

### Solution ✅
**This has been fixed!** The issue was mixing ES6 modules with global CDN scripts.

The app now uses global variables instead of ES6 imports:
- `window.AppConstants` for configuration
- `window.lucide` for icons
- Global `React` and `ReactDOM` from CDN

If you still see this error:
1. **Clear browser cache** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Hard refresh** the page
3. **Restart the server**
4. Check that scripts load in correct order in `index.html`

---

## ℹ️ Harmless Warning: DevTools 404

### Message
```
::1 - - [date] "GET /.well-known/appspecific/com.chrome.devtools.json HTTP/1.1" 404
```

### Why This Happens
Chrome DevTools automatically looks for debugging configuration files. This is completely normal and can be safely ignored.

### Impact
- ✅ No impact on app functionality
- ✅ No impact on performance
- ✅ No action needed

### If It Bothers You
You can suppress these in your server logs, but it's not necessary.

---

## 🚀 Common Issues & Solutions

### App Not Loading

**Symptom:** Blank page or loading spinner doesn't disappear

**Solutions:**
1. Check browser console for errors (F12)
2. Verify server is running: `python3 -m http.server 8000`
3. Try accessing: `http://localhost:8000` (not file://)
4. Clear browser cache and hard refresh
5. Check that all files exist:
   ```bash
   ls -la index.html js/app.js js/constants.js css/styles.css
   ```

---

### PWA Not Installing

**Symptom:** No "Add to Home Screen" option

**Solutions:**
1. **Use HTTPS or localhost** (required for PWA)
   - ✅ `http://localhost:8000` works
   - ✅ `https://yourdomain.com` works
   - ❌ `http://192.168.x.x:8000` might not work on some browsers

2. **Check manifest.json loads**
   - Open browser DevTools
   - Go to Application/Storage tab
   - Check "Manifest" section

3. **Verify all icons exist**
   ```bash
   ls -la assets/icon-*.png
   ```
   Should show 14 icon files

4. **Try different browser**
   - Chrome/Edge: Best PWA support
   - Safari: Good on iOS, limited on macOS
   - Firefox: Partial PWA support

---

### Service Worker Errors

**Symptom:** Offline mode not working

**Solutions:**
1. **Check registration**
   - Open DevTools → Application → Service Workers
   - Should show "activated and running"

2. **Update service worker**
   - In DevTools, click "Unregister"
   - Refresh page
   - Check if it re-registers

3. **Clear cache**
   - DevTools → Application → Clear storage
   - Check all boxes
   - Click "Clear site data"

---

### Images Not Showing

**Symptom:** Broken image icons or default image missing

**Solutions:**
1. **Verify image exists**
   ```bash
   ls -la assets/piggy-bank-default.jpg
   ```

2. **Check path in constants.js**
   - Should be: `./assets/piggy-bank-default.jpg`
   - Relative to index.html location

3. **Re-extract image**
   ```bash
   node extract-image.js
   ```

4. **Check browser console**
   - Look for 404 errors
   - Verify file paths

---

### localStorage Not Saving

**Symptom:** Data doesn't persist after page reload

**Solutions:**
1. **Check browser settings**
   - Ensure cookies/storage not blocked
   - Not in private/incognito mode

2. **Check storage quota**
   - Open DevTools → Application → Storage
   - Check usage and quota

3. **Verify key in console**
   ```javascript
   localStorage.getItem('savingsTrackerData')
   ```

4. **Check for errors**
   - Open console
   - Look for storage-related errors

---

### Image Upload Not Working

**Symptom:** Can't upload custom images

**Solutions:**
1. **Check file size**
   - Must be under 5MB
   - See error message in alert

2. **Check file type**
   - Accepts: jpg, jpeg, png, gif, webp
   - Browser will filter automatically

3. **Try different image**
   - Some images may be corrupted
   - Try a simple PNG or JPG

---

### Mobile Issues

**Symptom:** App looks wrong on mobile

**Solutions:**
1. **Check viewport meta tag** (should already be correct)
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test in mobile mode**
   - DevTools → Toggle device toolbar (Cmd+Shift+M)
   - Select a mobile device

3. **Check on actual device**
   - Use your computer's IP address
   - Make sure on same WiFi network

---

### Styling Issues

**Symptom:** App looks unstyled or broken

**Solutions:**
1. **Verify Tailwind CSS loads**
   - Check network tab for cdn.tailwindcss.com
   - Should return 200 OK

2. **Check custom CSS**
   ```bash
   ls -la css/styles.css
   ```

3. **Clear browser cache**
   - Hard refresh (Cmd+Shift+R)

4. **Check console for CSS errors**

---

## 🛠️ Advanced Debugging

### Enable React Dev Mode

For better error messages, switch to development React:

In `index.html`, replace:
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

With:
```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

Remember to switch back to production before deploying!

---

### Check Script Load Order

Scripts must load in this exact order:
1. React
2. ReactDOM
3. Lucide Icons
4. constants.js
5. app.js

Verify in browser DevTools → Network tab.

---

### Verify Global Variables

Open browser console and type:
```javascript
console.log(window.React);          // Should show object
console.log(window.ReactDOM);       // Should show object
console.log(window.lucide);         // Should show object
console.log(window.AppConstants);   // Should show object
```

All should return objects, not `undefined`.

---

### Service Worker Cache Issues

If changes don't appear:
1. **Unregister service worker**
   - DevTools → Application → Service Workers
   - Click "Unregister"

2. **Clear all cache**
   - DevTools → Application → Clear storage
   - Select all and clear

3. **Hard refresh**
   - Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

4. **Update cache version**
   - Edit `service-worker.js`
   - Change `CACHE_NAME = 'wish-bank-v1'` to `v2`, `v3`, etc.

---

## 📱 Mobile-Specific Issues

### iOS Safari

**Issue:** PWA not installing
- Tap share icon (not menu)
- Scroll down to "Add to Home Screen"

**Issue:** Viewport not correct
- Check for zoom settings
- Ensure no user-scalable conflicts

### Android Chrome

**Issue:** Install banner not showing
- May need to wait for Chrome's criteria
- Or use menu → "Install app"

**Issue:** Status bar color wrong
- Check `theme-color` in index.html
- Should be `#8b5cf6`

---

## 🔍 Still Having Issues?

### Check These Files Exist
```bash
cd /Users/haosenliu/projects/wish-bank
ls -la index.html                    # Entry point
ls -la js/app.js js/constants.js    # JavaScript
ls -la css/styles.css               # Styles
ls -la manifest.json                # PWA config
ls -la service-worker.js            # Offline support
ls -la assets/piggy-bank-default.jpg # Default image
```

### Verify File Contents
```bash
# Check if files are not empty
wc -l index.html js/*.js css/*.css
```

Should show:
- index.html: ~130 lines
- js/app.js: ~540 lines
- js/constants.js: ~25 lines
- css/styles.css: ~190 lines

---

## 📧 Getting Help

If you're still stuck:

1. **Check browser console** (F12) for error messages
2. **Check network tab** for failed requests
3. **Try in different browser** (Chrome recommended)
4. **Read documentation:**
   - START_HERE.md
   - QUICKSTART.md
   - README.md

---

## ✅ Quick Health Check

Run this in your project directory:

```bash
# Check all core files exist
test -f index.html && echo "✅ index.html" || echo "❌ index.html missing"
test -f js/app.js && echo "✅ js/app.js" || echo "❌ js/app.js missing"
test -f js/constants.js && echo "✅ js/constants.js" || echo "❌ js/constants.js missing"
test -f css/styles.css && echo "✅ css/styles.css" || echo "❌ css/styles.css missing"
test -f manifest.json && echo "✅ manifest.json" || echo "❌ manifest.json missing"
test -f service-worker.js && echo "✅ service-worker.js" || echo "❌ service-worker.js missing"
test -f assets/piggy-bank-default.jpg && echo "✅ default image" || echo "❌ default image missing"

# Count icons (should be 14)
echo "Icons: $(ls assets/icon-*.png 2>/dev/null | wc -l | tr -d ' ')/14"
```

All should show ✅. If any show ❌, that file needs attention.

---

**Last Updated:** After fixing React Error #130  
**Status:** All known issues resolved ✅

