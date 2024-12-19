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

  // Modify your Intersection Observer options
  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px 50px 50px 0px", // Add margin to right and bottom
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // multiple thresholds // Reduce threshold to make detection more lenient
  };

  const observer = new IntersectionObserver(
    revealCallback,
    options,
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          const visiblePercentage = entry.intersectionRatio * 100;
          // Optional: unobserve after animation is triggered
          observer.unobserve(entry.target);
          // Only trigger when element is at least 30% visible
          if (entry.isIntersecting && visiblePercentage >= 30) {
            entry.target.classList.add("show");
            // Optional: unobserve after animation is triggered
            observer.unobserve(entry.target);
          }
        }
      });
    },
    observerOptions
  );

  // Apply to all cards
  document.querySelectorAll(".services__card").forEach((card) => {
    observer.observe(card);
  });

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

// Pop Up Button

document.addEventListener("DOMContentLoaded", function () {
  // Get all card buttons
  const cardButtons = document.querySelectorAll(".card-button");
  const popups = document.querySelectorAll(".popup-overlay");

  // Add click event to all card buttons
  cardButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const popup = popups[index];
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Add close functionality to all popups
  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".close-popup");

    closeButton.addEventListener("click", function () {
      popup.style.display = "none";
      document.body.style.overflow = "";
    });

    // Close when clicking outside the image
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  });

  // Close popup when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      popups.forEach((popup) => {
        popup.style.display = "none";
        document.body.style.overflow = "";
      });
    }
  });
});
