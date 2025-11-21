# Changelog

All notable changes to the Wish Bank Savings Tracker project.

## [2.0.1] - 2025-11-21

### 🔧 Bug Fixes

- **Fixed React Error #130**
  - Changed from ES6 modules to global variables
  - Updated script loading to remove `type="module"`
  - Scripts now properly access window.React, window.ReactDOM, window.lucide
  - All constants now exported to window.AppConstants

- **Documented Chrome DevTools 404**
  - Added explanation for harmless .well-known warning
  - Updated troubleshooting documentation

### 📚 Documentation

- **Added TROUBLESHOOTING.md**
  - Comprehensive troubleshooting guide
  - Solutions for common issues
  - Advanced debugging techniques
  - Mobile-specific problems

- **Added FIXES_APPLIED.md**
  - Detailed explanation of bug fixes
  - Technical analysis
  - Before/after comparisons

- **Updated existing docs**
  - MIGRATION.md: Added troubleshooting section
  - START_HERE.md: Added fix information
  - All docs reference new troubleshooting guide

### 🔄 Modified Files

- `js/app.js` - Uses global variables instead of imports
- `js/constants.js` - Exports to window.AppConstants
- `index.html` - Removed type="module" attribute

## [2.0.0] - 2025-11-21

### 🎉 Major Refactor - Mobile-First PWA

Complete restructuring of the application from a single standalone HTML file to a proper Progressive Web App with separated concerns and mobile optimization.

### Added
- ✨ **Progressive Web App (PWA) Support**
  - Service worker for offline functionality
  - Web app manifest for installability
  - Add to home screen capability
  - Standalone app experience

- 📁 **Modular File Structure**
  - Separated HTML, CSS, and JavaScript
  - Constants file for easy configuration
  - Organized asset management
  - Proper project structure

- 📱 **Mobile Optimizations**
  - Mobile-first responsive design
  - Touch-optimized interactions
  - Viewport meta tags for proper scaling
  - Safe area support for notched devices
  - Prevent pull-to-refresh
  - No-zoom inputs

- 🎨 **Enhanced Styling**
  - Custom CSS animations
  - Smooth transitions
  - Custom scrollbar styling
  - Accessibility improvements
  - Better focus states

- 🖼️ **Better Image Handling**
  - Extracted base64 image to separate file
  - All PWA icons generated (16px to 512px)
  - Favicons for all platforms
  - Apple Touch Icon support
  - Optimized image loading

- 🛠️ **Developer Tools**
  - `extract-image.js` - Extract image from old file
  - `generate-icons.py` - Python icon generator
  - `generate-icons.sh` - Bash icon generator
  - `package.json` - npm scripts for common tasks
  - `.gitignore` - Proper git exclusions

- 📚 **Documentation**
  - Comprehensive README.md
  - QUICKSTART.md for easy setup
  - MIGRATION.md with upgrade guide
  - CHANGELOG.md (this file)
  - Inline code comments

### Changed
- 🔄 **Code Organization**
  - Split 270-line monolithic file into modular components
  - Moved configuration to constants file
  - Separated presentation from logic
  - Better component structure

- 🎯 **Performance**
  - External files enable better caching
  - Service worker provides offline support
  - Optimized image delivery
  - Reduced initial load with proper file separation

- 💅 **UI/UX**
  - Better mobile responsiveness
  - Improved touch targets
  - Enhanced animations
  - Loading spinner during initialization
  - Better error handling

### Improved
- ♿ **Accessibility**
  - Better focus indicators
  - Proper ARIA attributes
  - Keyboard navigation support
  - Screen reader friendly

- 🔒 **Security**
  - No inline scripts (CSP friendly)
  - Proper HTTPS enforcement for PWA
  - Secure image handling

- 📦 **Maintainability**
  - Clear separation of concerns
  - Easy to customize and extend
  - Well-documented code
  - Version control friendly

### Migration Notes
- Old standalone file moved to `backup/` directory
- All data persists (uses same localStorage key)
- No breaking changes for users
- See MIGRATION.md for detailed upgrade instructions

### Technical Stack
- React 18 (production build)
- Tailwind CSS (CDN)
- Lucide Icons
- Service Workers API
- localStorage API
- File API for image uploads

## [1.0.0] - Previous Version

### Features
- Single standalone HTML file
- Basic savings tracking
- Custom image upload
- localStorage persistence
- Beautiful gradient UI
- Confetti animations
- Withdraw functionality
- Settings management
- Reset capability

---

## Upgrade Instructions

See [MIGRATION.md](MIGRATION.md) for detailed upgrade instructions from v1.0.0 to v2.0.0.

## Compatibility

- **Browsers**: Chrome 67+, Safari 11.1+, Firefox 63+, Edge 79+
- **Mobile**: iOS 11.3+, Android 5+
- **Node.js**: v12+ (for development tools)
- **Python**: 3.6+ (for icon generation)

