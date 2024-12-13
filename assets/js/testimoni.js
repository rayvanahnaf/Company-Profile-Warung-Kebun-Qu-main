fetch("testimonials.json")
  .then((response) => response.json())
  .then((data) => {
    const swiperWrapper = document.getElementById("swiper-wrapper");

    // Iterasi data JSON untuk membuat elemen slide
    data.forEach((item) => {
      const slide = document.createElement("div");
      slide.classList.add(
        "swiper-slide",
        "p-6",
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "flex",
        "flex-col",
        "items-center",
        "text-center",
        "space-y-4"
      );
      slide.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.name}" class="w-20 h-20 rounded-full border-4 border-green-500 shadow-md">
        <h3 class="text-xl font-semibold text-gray-800">${item.name}</h3>
        <p class="text-sm text-gray-500"><strong>Rating:</strong> ${item.rating} ⭐</p>
        <p class="text-gray-600 text-base">${item.snippet}</p>
        <a href="${item.link}" target="_blank" 
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold text-sm rounded-full shadow-lg hover:from-green-700 hover:to-green-900 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.25 6.75l-6.5 6.5m0 0l6.5 6.5m-6.5-6.5H21" />
          </svg>
          View Profile
        </a>

      `;
      swiperWrapper.appendChild(slide);
    });

    // Inisialisasi Swiper.js dengan Grid
    new Swiper(".mySwiper", {
      grid: {
        rows: 1, // Jumlah baris
        fill: "row", // Mengisi per baris
      },
      slidesPerView: 2, // Jumlah kolom
      spaceBetween: 20, // Jarak antar slide
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
