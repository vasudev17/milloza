// ============================================
// MILLOZA - JavaScript
// ============================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.navbar')) {
        navLinks.classList.remove('active');
      }
    });
  }
  
  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = this.classList.contains('active');
      
      // Close all other FAQ items
      faqQuestions.forEach(q => {
        if (q !== this) {
          q.classList.remove('active');
          q.parentElement.querySelector('.faq-answer').classList.remove('active');
        }
      });
      
      // Toggle current FAQ item
      if (isActive) {
        this.classList.remove('active');
        answer.classList.remove('active');
      } else {
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
  
  // Form Handling
  const emailForms = document.querySelectorAll('.email-form');
  
  emailForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('.form-input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email && isValidEmail(email)) {
        // Here you would typically send the email to your backend
        // For now, we'll just show a success message
        showNotification('Thank you! We\'ll notify you when we launch.', 'success');
        emailInput.value = '';
      } else {
        showNotification('Please enter a valid email address.', 'error');
      }
    });
  });
  
  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Simple notification system
  function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: ${type === 'success' ? '#6F8F72' : '#C38E70'};
      color: #FAF8F4;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Add CSS animations for notifications
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
