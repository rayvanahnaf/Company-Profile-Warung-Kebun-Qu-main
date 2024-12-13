// File: testimonials.js
fetch("testimonials.json")
  .then((response) => response.json())
  .then((data) => {
    const swiperWrapper = document.getElementById("swiper-wrapper");

    // Iterasi data JSON untuk membuat elemen slide
    data.forEach((item) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.name}" style="border-radius: 50%; width: 80px; height: 80px;">
        <h3>${item.name}</h3>
        <p><strong>Rating:</strong> ${item.rating} ⭐</p>
        <p>${item.snippet}</p>
        <a href="${item.link}" target="_blank" style="color: blue; text-decoration: underline;">View Profile</a>
      `;
      swiperWrapper.appendChild(slide);
    });

    // Inisialisasi Swiper.js setelah data dimuat
    new Swiper(".mySwiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
