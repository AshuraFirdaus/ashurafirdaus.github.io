const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

// // Function to handle reveal animations
// function initRevealOnScroll() {
//   const options = {
//     root: null, // use viewport as root
//     threshold: 0.1, // Trigger when 10% of element is visible
//     rootMargin: "0px", // no margin
//   };

//   const revealCallback = (entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         // When element enters viewport
//         entry.target.classList.add("active");

//         // If there's a delay attribute, apply it
//         const delay = entry.target.getAttribute("data-delay");
//         if (delay) {
//           entry.target.style.setProperty("--delay", `${delay}ms`);
//         }
//       } else {
//         // When element leaves viewport
//         // Add a small delay before hiding to make exit smoother
//         setTimeout(() => {
//           if (!entry.isIntersecting) {
//             entry.target.classList.remove("active");
//           }
//         }, 100);
//       }
//     });
//   };

//   const observer = new IntersectionObserver(revealCallback, options);

//   // Observe all elements with reveal classes
//   const revealElements = document.querySelectorAll(
//     ".reveal-from-left, .reveal-from-right, .reveal-from-bottom, .reveal-from-top"
//   );

//   revealElements.forEach((element) => {
//     // Ensure elements start hidden
//     element.classList.remove("active");
//     observer.observe(element);
//   });
// }

// // Initialize when DOM is loaded
// document.addEventListener("DOMContentLoaded", initRevealOnScroll);

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
