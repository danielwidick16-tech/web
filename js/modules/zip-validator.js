/**
 * ZIP Code Validator Module - Volcanic Heating and Air
 * Validates if a ZIP code is within the Central Oregon service area
 */

import { ALL_VALID_ZIPS, getAreaByZip } from '../utils/constants.js';

class ZipValidator {
  constructor(formElement) {
    this.form = formElement;
    this.input = formElement?.querySelector('input');
    this.resultElement = document.getElementById('zip-result');

    if (!this.form || !this.input) return;

    this.init();
  }

  init() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate();
    });

    // Real-time validation on input (optional)
    this.input.addEventListener('input', () => {
      // Only allow numbers
      this.input.value = this.input.value.replace(/\D/g, '').slice(0, 5);

      // Clear previous result when typing
      this.hideResult();
    });

    // Validate on blur if has value
    this.input.addEventListener('blur', () => {
      if (this.input.value.length === 5) {
        this.validate();
      }
    });
  }

  validate() {
    const zip = this.input.value.trim();

    // Check if empty
    if (!zip) {
      this.showResult('Please enter a ZIP code.', false);
      return false;
    }

    // Check if valid format
    if (!/^\d{5}$/.test(zip)) {
      this.showResult('Please enter a valid 5-digit ZIP code.', false);
      return false;
    }

    // Check if in service area
    const isValid = ALL_VALID_ZIPS.includes(zip);
    const area = getAreaByZip(zip);

    if (isValid) {
      this.showResult(`Great news! We service ${area}. Schedule your appointment today!`, true);
      return true;
    } else {
      this.showResult('Sorry, this ZIP code is outside our current service area. Please call us to discuss options.', false);
      return false;
    }
  }

  showResult(message, isSuccess) {
    if (!this.resultElement) return;

    // Remove hidden attribute
    this.resultElement.hidden = false;

    // Update classes
    this.resultElement.classList.remove('zip-validator__result--success', 'zip-validator__result--error');
    this.resultElement.classList.add(
      isSuccess ? 'zip-validator__result--success' : 'zip-validator__result--error'
    );

    // Update content
    this.resultElement.innerHTML = `
      <svg width="20" height="20">
        <use href="/assets/icons/icon-sprite.svg#icon-${isSuccess ? 'check-circle' : 'alert'}"></use>
      </svg>
      <span>${message}</span>
    `;

    // Update input style
    this.input.classList.remove('form-input--success', 'form-input--error');
    this.input.classList.add(isSuccess ? 'form-input--success' : 'form-input--error');
  }

  hideResult() {
    if (!this.resultElement) return;

    this.resultElement.hidden = true;
    this.input.classList.remove('form-input--success', 'form-input--error');
  }
}

// Initialize ZIP validator
export function initZipValidator() {
  const form = document.getElementById('zip-validator');
  if (form) {
    return new ZipValidator(form);
  }
  return null;
}

export default ZipValidator;
