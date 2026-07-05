document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.topbar__toggle');
  const nav = document.querySelector('.topbar__nav');

  if (toggleButton && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle('open', isOpen);
      toggleButton.setAttribute('aria-expanded', String(isOpen));
      toggleButton.classList.toggle('is-open', isOpen);
    };

    const closeMenu = () => {
      setMenuState(false);
    };

    const handleDocumentClick = (event) => {
      const target = event.target;
      if (target instanceof Node && !nav.contains(target) && !toggleButton.contains(target)) {
        closeMenu();
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        toggleButton.focus();
      }
    };

    const handleResize = () => {
      if (window.matchMedia('(min-width: 701px)').matches) {
        closeMenu();
      }
    };

    toggleButton.addEventListener('click', () => {
      const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    document.addEventListener('click', handleDocumentClick, { passive: true });
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) {
      return;
    }

    button.addEventListener('click', () => {
      item.classList.toggle('is-open');
      const isOpen = item.classList.contains('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.querySelectorAll('.button, .play-button, .faq-question, .topbar__nav a, .topbar__toggle, .footer-social a, .footer-links a').forEach((element) => {
    element.addEventListener('click', (event) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      element.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  const waitlistForm = document.querySelector('.waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = waitlistForm.querySelector('button');
      if (button) {
        button.textContent = 'Joined';
        button.disabled = true;
      }
    });
  }
});

const cursor = document.querySelector('.custom-cursor');

if (cursor) {
  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  const animateCursor = () => {
    posX += (mouseX - posX) * 0.18;
    posY += (mouseY - posY) * 0.18;
    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;
    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document.querySelectorAll('a, button').forEach((item) => {
    item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));
}

if (typeof emailjs !== 'undefined') {
  emailjs.init('OYjRQdCtjB1hsrT-Z');

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('sendBtn');

  if (form && status && btn) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      emailjs.sendForm('service_hxcx4vz', 'template_e62wxak', this)
        .then(() => {
          status.innerHTML = '✅ Thank you! Your message has been sent successfully.';
          status.style.color = '#D4AF37';
          form.reset();
          btn.innerHTML = 'Send Message';
          btn.disabled = false;
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          status.innerHTML = '❌ Failed to send your message. Please try again.';
          status.style.color = '#ff6b6b';
          btn.innerHTML = 'Send Message';
          btn.disabled = false;
        });
    });
  }
}