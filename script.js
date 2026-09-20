document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const sections = Array.from(document.querySelectorAll(".reveal-section"));

  const showAll = () => {
    sections.forEach((section) => section.classList.add("is-visible"));
  };

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Safety fallback: never leave content hidden if a browser fails to fire the observer.
  window.setTimeout(() => {
    sections.forEach((section) => {
      if (!section.classList.contains("is-visible")) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.15) {
          section.classList.add("is-visible");
        }
      }
    });
  }, 1200);
});
