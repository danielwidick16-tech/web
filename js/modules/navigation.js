/**
 * Navigation Module - Volcanic Heating and Air
 * Handles mobile menu, sticky header, and smooth scroll
 */

import { throttle, trapFocus, getScrollPosition } from '../utils/helpers.js';

class Navigation {
  constructor() {
    // Elements
    this.header = document.getElementById('header');
    this.menuToggle = document.getElementById('menu-toggle');
    this.mobileNav = document.getElementById('mobile-nav');
    this.mobileNavClose = document.getElementById('mobile-nav-close');
    this.navOverlay = document.getElementById('nav-overlay');

    // State
    this.isOpen = false;
    this.lastScrollPosition = 0;
    this.headerHeight = this.header?.offsetHeight || 80;

    // Bind methods
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    if (!this.header || !this.menuToggle || !this.mobileNav) return;

    // Event listeners
    this.menuToggle.addEventListener('click', this.toggleMenu);
    this.mobileNavClose?.addEventListener('click', this.closeMenu);
    this.navOverlay?.addEventListener('click', this.closeMenu);

    // Scroll handling (throttled)
    window.addEventListener('scroll', throttle(this.handleScroll, 100));

    // Keyboard handling
    document.addEventListener('keydown', this.handleKeydown);

    // Resize handling (close mobile nav on resize to desktop)
    window.addEventListener('resize', throttle(this.handleResize, 250));

    // Smooth scroll for anchor links
    this.initSmoothScroll();

    // Set initial scroll state
    this.handleScroll();
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isOpen = true;

    // Update ARIA attributes
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.mobileNav.setAttribute('aria-hidden', 'false');

    // Add active classes
    this.menuToggle.classList.add('header__menu-toggle--active');
    this.mobileNav.classList.add('mobile-nav--open');
    this.navOverlay.classList.add('nav-overlay--visible');

    // Prevent body scroll
    document.body.classList.add('nav-open');

    // Trap focus in mobile nav
    this.focusTrap = trapFocus(this.mobileNav);
  }

  closeMenu() {
    this.isOpen = false;

    // Update ARIA attributes
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.mobileNav.setAttribute('aria-hidden', 'true');

    // Remove active classes
    this.menuToggle.classList.remove('header__menu-toggle--active');
    this.mobileNav.classList.remove('mobile-nav--open');
    this.navOverlay.classList.remove('nav-overlay--visible');

    // Restore body scroll
    document.body.classList.remove('nav-open');

    // Release focus trap
    this.focusTrap?.();

    // Return focus to toggle button
    this.menuToggle.focus();
  }

  handleScroll() {
    const currentScroll = getScrollPosition();

    // Add scrolled class for shadow
    if (currentScroll > 10) {
      this.header.classList.add('header--scrolled');
    } else {
      this.header.classList.remove('header--scrolled');
    }

    this.lastScrollPosition = currentScroll;
  }

  handleKeydown(e) {
    // Close menu on Escape
    if (e.key === 'Escape' && this.isOpen) {
      this.closeMenu();
    }
  }

  handleResize() {
    // Close mobile nav when resizing to desktop
    if (window.innerWidth >= 1024 && this.isOpen) {
      this.closeMenu();
    }
  }

  initSmoothScroll() {
    // Handle anchor links for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        // Close mobile nav if open
        if (this.isOpen) {
          this.closeMenu();
        }

        // Calculate offset (header height + some padding)
        const offset = this.headerHeight + 20;

        // Smooth scroll to target
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, '', targetId);
      });
    });
  }
}

// Initialize navigation
export function initNavigation() {
  return new Navigation();
}

export default Navigation;
