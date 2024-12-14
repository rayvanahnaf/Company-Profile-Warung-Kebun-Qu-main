document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate");

  // Observer untuk memantau elemen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  });

  // Daftarkan setiap elemen untuk dipantau
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
