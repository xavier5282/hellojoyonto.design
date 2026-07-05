const revealItems = Array.from(document.querySelectorAll('.reveal'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
  rootMargin: '0px 0px -40px 0px'
});

revealItems.forEach((item) => observer.observe(item));

const faqItems = Array.from(document.querySelectorAll('.faq-item'));

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    faqItems.forEach((faq) => {
      faq.classList.remove('is-open');
      const q = faq.querySelector('.faq-question');
      const a = faq.querySelector('.faq-answer');
      if (q) q.setAttribute('aria-expanded', 'false');
      if (a) a.hidden = true;
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

const buttons = Array.from(document.querySelectorAll('.button'));

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (button.classList.contains('button--primary') || button.classList.contains('button--secondary')) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
  });
});

const form = document.querySelector('.waitlist-form');
const status = document.querySelector('.form-status');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      status.textContent = 'Please enter a valid email to join the waitlist.';
      return;
    }

    status.textContent = `Thank you, ${email}. You are on the list.`;
    form.reset();
  });
}
