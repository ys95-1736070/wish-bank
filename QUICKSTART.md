# 🚀 Quick Start Guide

Get your Wish Bank app running in 5 minutes!

## Prerequisites

- A modern web browser
- Python 3 or Node.js (for local server)

## Step 1: Extract Image & Generate Icons ✅

**Already done!** The default image has been extracted and all PWA icons have been generated.

If you need to regenerate icons later:
```bash
python3 generate-icons.py
# or
./generate-icons.sh  # requires ImageMagick
```

## Step 2: Start the Server

Choose one of these methods:

### Option A: Python (Recommended)
```bash
python3 -m http.server 8000
# or
npm start
```

### Option B: Node.js
```bash
npx http-server -p 8000
```

### Option C: PHP
```bash
php -S localhost:8000
```

## Step 3: Open in Browser

Navigate to:
- Desktop: `http://localhost:8000`
- Mobile (same network): `http://YOUR_IP:8000`

## Step 4: Install as PWA (Optional)

### On Mobile (iOS/Android):
1. Open the app in your browser
2. Tap the browser menu (three dots or share icon)
3. Select "Add to Home Screen"
4. Tap "Add"
5. Find the app on your home screen!

### On Desktop (Chrome/Edge):
1. Open the app
2. Look for the install icon in the address bar
3. Click "Install"
4. The app opens in its own window!

## Step 5: Set Up Your Savings Goal

1. Upload your own piggy bank image (optional)
2. Enter your savings goal title
3. Set the amount per tap
4. Click "Start Saving"
5. Start tapping to save! 💰

## Features to Try

- 🖼️ **Custom Image**: Upload any image as your piggy bank
- 💰 **Quick Save**: Tap the piggy bank to add money
- 📊 **Track Progress**: See total savings and deposit count
- ⚙️ **Settings**: Update your goal anytime
- 💸 **Withdraw**: Take money out when needed
- 🔄 **Reset**: Start fresh (with confirmation)
- 💾 **Auto-Save**: Everything saves automatically

## Troubleshooting

### App not loading?
- Check that the server is running
- Try a different port if 8000 is busy
- Clear browser cache and reload

### PWA not installing?
- Use HTTPS or localhost (required for PWA)
- Ensure all icons are generated
- Try a different browser

### Images not showing?
- Check that `assets/` folder has all files
- Verify file paths in `js/constants.js`
- Open browser console for error messages

## Next Steps

- 📖 Read the full [README.md](README.md) for detailed information
- 🔧 Check [MIGRATION.md](MIGRATION.md) for customization options
- 🎨 Customize colors and styles in `css/styles.css`
- ⚙️ Adjust settings in `js/constants.js`

## Getting Your IP Address

To access from mobile on the same network:

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig | findstr IPv4
```

Use the IP shown (e.g., `192.168.1.100`) and navigate to:
`http://192.168.1.100:8000`

---

## 🎉 That's it!

You're now ready to start saving with your Wish Bank!

Need help? Check the [README.md](README.md) or open an issue.

**Happy Saving! 💰🎯**

