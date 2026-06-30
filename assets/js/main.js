document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.topbar__toggle');
  const nav = document.querySelector('.topbar__nav');

  if (!toggleButton || !nav) {
    return;
  }

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
});

const cursor = document.querySelector(".custom-cursor");

if (cursor) {

    let mouseX = 0;
    let mouseY = 0;

    let posX = 0;
    let posY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    function animateCursor(){

        posX += (mouseX - posX) * 0.18;
        posY += (mouseY - posY) * 0.18;

        cursor.style.left = posX + "px";
        cursor.style.top = posY + "px";

        requestAnimationFrame(animateCursor);

    }

    animateCursor();

    document.querySelectorAll("a, button").forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            cursor.classList.add("hover");

        });

        item.addEventListener("mouseleave",()=>{

            cursor.classList.remove("hover");

        });

    });

    document.addEventListener("mousedown",()=>{

        cursor.classList.add("click");

    });

    document.addEventListener("mouseup",()=>{

        cursor.classList.remove("click");

    });

}