async function loadTestimonials() {
    try {
        const response = await fetch('testimonials.json');
        const testimonials = await response.json();

        const container = document.querySelector('#testimonialSlider');
        const indicatorsContainer = document.querySelector('.absolute.z-30'); // For slider indicators
        container.innerHTML = ''; // Clear existing content
        indicatorsContainer.innerHTML = ''; // Clear previous indicators

        // Generate testimonial cards and indicators
        testimonials.slice(0, 4).forEach((review, index) => {
            const stars = Array(review.rating).fill('<i data-feather="star" class="text-yellow-500"></i>').join('');
            container.innerHTML += `
                <div class="bg-white rounded-lg shadow-lg p-6 mb-10 md:mb-0 w-80 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <img src="${review.thumbnail || 'assets/image/default.png'}" alt="Image" class="rounded-full mx-auto mb-6 w-24 h-24 object-cover">
                    <div class="flex items-center justify-center gap-2 mb-4">
                        ${stars}
                    </div>
                    <p class="font-normal text-sm lg:text-md text-gray-600 mb-4">
                        ${review.snippet || 'No testimonial available.'}
                    </p>
                    <h3 class="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl text-center">
                        ${review.name || 'Anonymous'}
                    </h3>
                </div>
            `;

            // Add an indicator for each slide
            const indicator = document.createElement('button');
            indicator.type = "button";
            indicator.classList.add('w-3', 'h-3', 'rounded-full');
            indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            indicator.setAttribute('data-carousel-slide-to', index);
            indicatorsContainer.appendChild(indicator);
        });

        feather.replace(); // Reinitialize Feather icons

        let currentIndex = 0;
        const slides = container.children;
        const totalSlides = slides.length;

        // Ensure all testimonial cards are aligned in a row
        container.style.width = `${totalSlides * 320}px`; // Adjust width based on the number of items

        // Function to change slide
        function changeSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            container.style.transform = `translateX(-${currentIndex * 320}px)`; // Adjust '320' based on the width of a testimonial card
        }

        // Auto slide every 5 seconds
        setInterval(changeSlide, 5000);

        // Add event listeners for manual controls
        document.querySelector('[data-carousel-prev]').addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            container.style.transform = `translateX(-${currentIndex * 320}px)`;
        });

        document.querySelector('[data-carousel-next]').addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            container.style.transform = `translateX(-${currentIndex * 320}px)`;
        });

    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Load testimonials when the page loads
window.onload = loadTestimonials;