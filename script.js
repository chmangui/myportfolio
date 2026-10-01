// <!-- =======================================================
//        JAVASCRIPT
//   ======================================================== -->

(() => {
  "use strict";

  /* =====================================================
         ELEMENTS
      ===================================================== */

  const siteHeader = document.getElementById("siteHeader");

  const mainNavigation = document.getElementById("mainNavigation");

  const themeButton = document.getElementById("themeButton");

  const themeIcon = document.getElementById("themeIcon");

  const menuButton = document.getElementById("menuButton");

  const currentYear = document.getElementById("currentYear");

  /* =====================================================
         MOBILE MENU
      ===================================================== */

  function closeMobileMenu() {
    mainNavigation.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.textContent = "☰";
  }

  menuButton.addEventListener("click", () => {
    const isOpen = mainNavigation.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.textContent = isOpen ? "×" : "☰";
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !mainNavigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  /* =====================================================
         HEADER SCROLL EFFECT
      ===================================================== */

  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, {
    passive: true,
  });

  handleHeaderScroll();

  /* =====================================================
         THEME
      ===================================================== */

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");

      themeIcon.textContent = "☾";
    } else {
      document.body.classList.remove("light-theme");

      themeIcon.textContent = "☀";
    }

    localStorage.setItem("chmangui-theme", theme);
  }

  const savedTheme = localStorage.getItem("chmangui-theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;

    setTheme(prefersLight ? "light" : "dark");
  }

  themeButton.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");

    setTheme(isLight ? "dark" : "light");
  });

  /* =====================================================
         REVEAL ANIMATIONS
      ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  /* =====================================================
         CURRENT YEAR
      ===================================================== */

  currentYear.textContent = new Date().getFullYear();

  /* =====================================================
         ESCAPE KEY
      ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
})();
