let products = [];
let filteredProducts = []; // To store the filtered products for live search
let currentProductIndex = 0;
const productsContainer = document.getElementById('products');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchBar = document.getElementById('searchBar');

// Fetch products from the API
fetch('https://pos.warungkebunqu.com/api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data.data)) {
            products = data.data;
            filteredProducts = products; // Initially, no filter, so all products are shown
            displayProducts(filteredProducts, currentProductIndex, 8); // Show first 8 products initially
        } else {
            console.error("Data produk tidak ditemukan.");
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to display products
function displayProducts(productsList, startIndex, count) {
    const endIndex = Math.min(startIndex + count, productsList.length);
    const productsToDisplay = productsList.slice(startIndex, endIndex);

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'transition', 'duration-300', 'hover:shadow-lg');

        productCard.innerHTML = `
            <img src="https://pos.warungkebunqu.com/storage/produk/${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h2>
                <p class="text-lg text-red-500 font-bold mb-2">Harga: Rp ${product.price.toLocaleString()}</p>
                <div class="description hidden text-gray-700">
                    ${product.description}
                </div>
                <p class="text-sm text-gray-500">
                    <strong>Kategori:</strong> ${product.category.name}
                </p>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });

    currentProductIndex = endIndex; // Update the index for next load
}

// Load more products when the button is clicked
loadMoreBtn.addEventListener('click', () => {
    displayProducts(filteredProducts, currentProductIndex, 8);
});

// Live search functionality
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();

    // Filter products based on the search query
    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) || product.category.name.toLowerCase().includes(query)
    );

    // Reset the index and clear the products container to display filtered results
    productsContainer.innerHTML = '';
    currentProductIndex = 0;
    displayProducts(filteredProducts, currentProductIndex, 8); // Display first 8 filtered products
});