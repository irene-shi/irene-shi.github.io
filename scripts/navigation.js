(() => {
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  let scheduled = false;

  function updateNavigation() {
    const threshold = window.innerWidth <= 520 ? 145 : 125;
    let current = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    }

    const bottom = window.innerHeight + window.scrollY;
    if (bottom >= document.documentElement.scrollHeight - 5) {
      current = sections.at(-1);
    }

    links.forEach((link) => {
      const active = link.hash === `#${current.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    scheduled = false;
  }

  // Coalesce scroll events into one update per animation frame.
  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateNavigation);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", updateNavigation);
  updateNavigation();
})();
