/**
 * FAQ Accordion Module - Volcanic Heating and Air
 * Handles expand/collapse functionality for FAQ sections
 */

class FAQAccordion {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll('.faq__item');
    this.allowMultiple = container.dataset.allowMultiple === 'true';

    this.init();
  }

  init() {
    this.items.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer) return;

      // Set initial ARIA attributes
      const answerId = answer.id || `faq-answer-${Math.random().toString(36).substr(2, 9)}`;
      answer.id = answerId;
      question.setAttribute('aria-controls', answerId);
      question.setAttribute('aria-expanded', 'false');

      // Click handler
      question.addEventListener('click', () => this.toggle(item));

      // Keyboard handler
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle(item);
        }
      });
    });
  }

  toggle(item) {
    const isActive = item.classList.contains('faq__item--active');

    // Close others if not allowing multiple
    if (!this.allowMultiple && !isActive) {
      this.closeAll();
    }

    // Toggle current item
    if (isActive) {
      this.close(item);
    } else {
      this.open(item);
    }
  }

  open(item) {
    const question = item.querySelector('.faq__question');

    item.classList.add('faq__item--active');
    question?.setAttribute('aria-expanded', 'true');
  }

  close(item) {
    const question = item.querySelector('.faq__question');

    item.classList.remove('faq__item--active');
    question?.setAttribute('aria-expanded', 'false');
  }

  closeAll() {
    this.items.forEach(item => this.close(item));
  }

  openAll() {
    this.items.forEach(item => this.open(item));
  }
}

// Initialize FAQ accordions
export function initFAQ() {
  const accordions = [];

  document.querySelectorAll('.faq__list').forEach(container => {
    accordions.push(new FAQAccordion(container));
  });

  return accordions;
}

export default FAQAccordion;
