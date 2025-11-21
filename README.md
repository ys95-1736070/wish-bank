# 🏦 Wish Bank - Savings Tracker

A beautiful, gamified savings tracker Progressive Web App (PWA) that helps you visualize and achieve your financial goals.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 💰 **Visual Savings Tracking** - Interactive piggy bank interface
- 📱 **Mobile-First Design** - Optimized for mobile devices
- 🎨 **Custom Images** - Upload your own piggy bank image
- 💾 **Auto-Save** - All progress saved to localStorage
- 🎯 **Goal Setting** - Set custom savings titles and deposit amounts
- 📊 **Statistics** - Track deposits and savings progress
- 🎉 **Animations** - Celebratory confetti on each deposit
- 🔒 **Offline Support** - Works without internet via PWA
- 🌈 **Beautiful UI** - Modern gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A web server (for local development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wish-bank
```

2. Add your assets:
   - Place your app icons in the `assets/` folder
   - See `assets/.gitkeep` for required file names and sizes
   - Or use an icon generator to create all sizes from one image

3. Serve the app:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

4. Open your browser:
   - Navigate to `http://localhost:8000`
   - For mobile testing, use your computer's IP address

### PWA Installation

Once the app is running:
1. Open it in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will install like a native app
4. Launch from your home screen!

## 📁 Project Structure

```
wish-bank/
├── index.html              # Main HTML file with PWA meta tags
├── manifest.json           # PWA manifest configuration
├── service-worker.js       # Service worker for offline support
├── css/
│   └── styles.css         # Custom styles and animations
├── js/
│   ├── app.js             # Main React application
│   └── constants.js       # Configuration constants
├── assets/                # Icons, images, and screenshots
│   └── .gitkeep
└── README.md             # This file
```

## 🎨 Customization

### Changing Default Settings

Edit `js/constants.js`:

```javascript
export const APP_CONFIG = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // Maximum upload size
  MAX_TITLE_LENGTH: 50,             // Max characters for title
  CURRENCY: 'USD',                  // Currency code
  LOCALE: 'en-US',                  // Number formatting locale
  STORAGE_KEY: 'savingsTrackerData' // localStorage key
};
```

### Changing Colors

The app uses Tailwind CSS. Modify classes in `js/app.js` or add custom colors in `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color-here'
      }
    }
  }
}
```

### Default Image

Replace the default piggy bank image by updating the path in `js/constants.js`:

```javascript
export const DEFAULT_IMAGE = './assets/your-custom-image.jpg';
```

## 💡 Usage

1. **Setup**: Enter your savings goal title, amount per tap, and optionally upload a custom image
2. **Save**: Tap the piggy bank to add money
3. **Track**: View your total savings and number of deposits
4. **Withdraw**: Use the withdraw button when needed
5. **Settings**: Update your goal, amount, or image anytime
6. **Reset**: Start over with the reset button (with confirmation)

## 🔒 Privacy

- All data is stored locally in your browser (localStorage)
- No data is sent to any server
- No tracking or analytics
- Complete privacy and offline functionality

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide Icons** - Beautiful icons
- **Service Workers** - Offline support
- **localStorage** - Data persistence
- **Progressive Web App** - Native-like experience

## 📱 Browser Support

- Chrome/Edge (recommended)
- Safari (iOS 11.3+)
- Firefox
- Samsung Internet
- Other modern browsers with PWA support

## 🐛 Troubleshooting

**App not installing as PWA:**
- Ensure you're using HTTPS (or localhost)
- Check browser console for service worker errors
- Verify all manifest icons exist

**Images not loading:**
- Check file paths in `constants.js`
- Ensure images are in the `assets/` folder
- Verify image formats (jpg, png, webp)

**Data not saving:**
- Check browser localStorage isn't disabled
- Clear cache and reload
- Check browser console for errors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev/)
- Design inspiration from modern fintech apps
- Built with ❤️ for better financial habits

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with 💜 to help you achieve your savings goals!**

