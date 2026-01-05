/**
 * Forms Module - Volcanic Heating and Air
 * Handles form validation and submission
 */

import { ALL_VALID_ZIPS } from '../utils/constants.js';

class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.submitButton = formElement.querySelector('button[type="submit"]');
    this.messageContainer = formElement.querySelector('.form-message') || this.createMessageContainer();

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation on blur
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearFieldError(field));
    });
  }

  createMessageContainer() {
    const container = document.createElement('div');
    container.className = 'form-message';
    container.hidden = true;
    this.form.insertBefore(container, this.form.firstChild);
    return container;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    if (!this.validateForm()) {
      return;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show loading state
    this.setLoading(true);

    try {
      // For now, simulate form submission
      // In production, replace with actual API endpoint
      await this.simulateSubmit(data);

      // Show success message
      this.showMessage('Thank you for contacting us! We\'ll get back to you within 24 hours.', 'success');

      // Reset form
      this.form.reset();

    } catch (error) {
      // Show error message
      this.showMessage('Sorry, there was an error submitting your form. Please try again or call us directly.', 'error');
      console.error('Form submission error:', error);

    } finally {
      this.setLoading(false);
    }
  }

  validateForm() {
    let isValid = true;

    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    const type = field.type;
    const required = field.hasAttribute('required');

    // Clear previous errors
    this.clearFieldError(field);

    // Required check
    if (required && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }

    // Skip further validation if empty and not required
    if (!value) return true;

    // Email validation
    if (type === 'email' || name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // Phone validation
    if (type === 'tel' || name === 'phone') {
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      const digitsOnly = value.replace(/\D/g, '');
      if (!phoneRegex.test(value) || digitsOnly.length < 10) {
        this.showFieldError(field, 'Please enter a valid phone number');
        return false;
      }
    }

    // ZIP code validation
    if (name === 'zip') {
      if (!/^\d{5}$/.test(value)) {
        this.showFieldError(field, 'Please enter a valid 5-digit ZIP code');
        return false;
      }

      // Optional: Warn if outside service area (don't block submission)
      if (!ALL_VALID_ZIPS.includes(value)) {
        // Show warning but allow submission
        this.showFieldWarning(field, 'This ZIP code may be outside our service area');
      }
    }

    return true;
  }

  showFieldError(field, message) {
    field.classList.add('form-input--error');

    // Create or update error message
    let errorElement = field.parentElement.querySelector('.form-error');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  showFieldWarning(field, message) {
    let warningElement = field.parentElement.querySelector('.form-helper');
    if (!warningElement) {
      warningElement = document.createElement('span');
      warningElement.className = 'form-helper';
      field.parentElement.appendChild(warningElement);
    }
    warningElement.textContent = message;
    warningElement.style.color = 'var(--color-warning)';
  }

  clearFieldError(field) {
    field.classList.remove('form-input--error', 'form-input--success');

    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  showMessage(message, type) {
    this.messageContainer.hidden = false;
    this.messageContainer.className = `form-message form-message--${type}`;
    this.messageContainer.textContent = message;

    // Scroll to message
    this.messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Hide success message after delay
    if (type === 'success') {
      setTimeout(() => {
        this.messageContainer.hidden = true;
      }, 10000);
    }
  }

  setLoading(loading) {
    this.form.classList.toggle('form--loading', loading);
    this.submitButton.disabled = loading;

    if (loading) {
      this.submitButton.dataset.originalText = this.submitButton.textContent;
      this.submitButton.textContent = 'Sending...';
    } else {
      this.submitButton.textContent = this.submitButton.dataset.originalText || 'Send Message';
    }
  }

  // Simulate form submission (replace with actual API call in production)
  simulateSubmit(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Log form data (for development)
        console.log('Form submitted:', data);

        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Simulated error'));
        }
      }, 1500);
    });
  }
}

// Initialize contact forms
export function initForms() {
  const forms = [];

  document.querySelectorAll('form[data-validate="true"], #contact-form').forEach(form => {
    forms.push(new ContactForm(form));
  });

  return forms;
}

export default ContactForm;
