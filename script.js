const toggleButton = document.querySelector('.topbar__toggle');
const nav = document.querySelector('.topbar__nav');

if (toggleButton && nav) {
  const setMenuState = (isOpen) => {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(() => {
        nav.classList.toggle('open', isOpen);
        toggleButton.setAttribute('aria-expanded', String(isOpen));
      });
    }
  };

  const handleDocumentClick = (event) => {
    if (!nav.contains(event.target) && !toggleButton.contains(event.target)) {
      setMenuState(false);
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
      toggleButton.focus();
    }
  };

  toggleButton.addEventListener('click', () => {
    const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeydown);

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
}
