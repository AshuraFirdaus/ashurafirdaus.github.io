const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

function initRevealOnScroll() {
  const options = {
    root: null,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    rootMargin: "-50px 0px",
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When element enters viewport
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("active");
        }, parseInt(delay));
      } else {
        // When element leaves viewport
        // Added longer delay before hiding
        setTimeout(() => {
          if (!entry.isIntersecting) {
            entry.target.classList.remove("active");
          }
        }, 300); // Increased from 100ms to 300ms
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, options);

  const revealElements = document.querySelectorAll(
    ".reveal-from-left, .reveal-from-right, .reveal-from-bottom, .reveal-from-top"
  );

  revealElements.forEach((element) => {
    element.classList.remove("active");
    observer.observe(element);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initRevealOnScroll);
