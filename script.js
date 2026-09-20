document.getElementById("year").textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(
  "main section, .feature-card, .step, .setup-card"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

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
  }
);

revealElements.forEach((element) => observer.observe(element));
