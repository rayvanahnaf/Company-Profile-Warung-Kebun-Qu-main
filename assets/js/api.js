fetch('https://pos.warungkebunqu.com/api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const productsContainer = document.getElementById('products');

        if (Array.isArray(data.data)) {
            data.data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'p-4', 'hover:shadow-xl', 'transition-shadow', 'duration-300');

                productElement.innerHTML = `
                    <img src="https://pos.warungkebunqu.com/storage/produk/${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-lg">
                    <div class="p-4">
                        <h2 class="text-lg font-bold mb-2">${product.name}</h2>
                        <p class="text-gray-700 font-semibold mb-2">Harga: Rp ${product.price.toLocaleString()}</p>
                        <div class="text-sm text-gray-600 mb-4">${product.description}</div>
                        <p class="text-sm text-gray-800"><strong>Kategori:</strong> ${product.category.name}</p>
                        <p class="text-sm text-gray-800"><strong>Stok:</strong> ${product.stock}</p>
                    </div>
                `;

                productsContainer.appendChild(productElement);
            });
        } else {
            console.error('Data produk tidak ditemukan atau format tidak sesuai');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    