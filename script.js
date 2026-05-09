const engineCards = document.querySelectorAll("[data-engine-card]");
const revealItems = document.querySelectorAll("[data-reveal]");
const orbitPanel = document.querySelector(".logo-orbit");
const cursorGlow = document.querySelector(".cursor-glow");
const siteHeader = document.querySelector(".site-header");

engineCards.forEach((card) => {
  const activate = () => {
    engineCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
  };

  card.addEventListener("mouseenter", activate);
  card.addEventListener("focusin", activate);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -30px 0px"
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
  revealObserver.observe(item);
});

if (orbitPanel) {
  const resetOrbit = () => {
    orbitPanel.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  orbitPanel.addEventListener("mousemove", (event) => {
    const bounds = orbitPanel.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;

    orbitPanel.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  orbitPanel.addEventListener("mouseleave", resetOrbit);
  orbitPanel.addEventListener("blur", resetOrbit, true);
}

if (cursorGlow) {
  window.addEventListener("pointermove", (event) => {
    const x = `${event.clientX}px`;
    const y = `${event.clientY}px`;

    cursorGlow.style.transform = `translate3d(calc(${x} - 50%), calc(${y} - 50%), 0)`;
    document.documentElement.style.setProperty("--mouse-x", x);
    document.documentElement.style.setProperty("--mouse-y", y);
  });

  window.addEventListener("pointerdown", () => {
    document.body.classList.add("has-pointer-down");
  });

  window.addEventListener("pointerup", () => {
    document.body.classList.remove("has-pointer-down");
  });
}

const updateScrollEffects = () => {
  const scrollY = window.scrollY || window.pageYOffset;

  document.documentElement.style.setProperty("--scroll-shift", `${Math.min(scrollY, 600)}px`);

  if (siteHeader) {
    siteHeader.classList.toggle("is-scrolled", scrollY > 24);
  }
};

updateScrollEffects();
window.addEventListener("scroll", updateScrollEffects, { passive: true });
