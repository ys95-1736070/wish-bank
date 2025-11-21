console.log('🔍 [DEBUG] constants.js loading...');

// Default piggy bank image - using a placeholder for now
// You can replace this with your own image path
const DEFAULT_IMAGE = './assets/piggy-bank-default.jpg';

// App configuration
const APP_CONFIG = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_TITLE_LENGTH: 50,
  CURRENCY: 'USD',
  LOCALE: 'en-US',
  STORAGE_KEY: 'savingsTrackerData'
};

// Animation configuration
const ANIMATION_CONFIG = {
  CONFETTI_COUNT: 30,
  ANIMATION_DURATION: 300,
  CONFETTI_COLORS: ['#ec4899', '#8b5cf6', '#3b82f6']
};

// Export to global scope for use in other scripts
window.AppConstants = {
  DEFAULT_IMAGE,
  APP_CONFIG,
  ANIMATION_CONFIG
};

console.log('✅ [DEBUG] constants.js loaded successfully');
console.log('🔍 [DEBUG] DEFAULT_IMAGE:', window.AppConstants.DEFAULT_IMAGE);

