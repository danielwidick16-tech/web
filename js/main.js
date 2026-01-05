/**
 * Main JavaScript Entry Point - Volcanic Heating and Air
 * Initializes all modules and handles global functionality
 */

import { initNavigation } from './modules/navigation.js';
import { initZipValidator } from './modules/zip-validator.js';
import { initFAQ } from './modules/faq.js';
import { initForms } from './modules/forms.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Navigation (mobile menu, sticky header)
  initNavigation();

  // ZIP code validator
  initZipValidator();

  // FAQ accordions
  initFAQ();

  // Form validation
  initForms();

  // Log initialization (development only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Volcanic Heating and Air - Website initialized');
  }
});

// Handle page visibility changes (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});

// Prevent FOUC (Flash of Unstyled Content)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
