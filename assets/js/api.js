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
                        const productCard = document.createElement('div');
                        productCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'transition', 'duration-300', 'hover:shadow-lg');

                        productCard.innerHTML = `
                            <img src="https://pos.warungkebunqu.com/storage/produk/${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h2 class="text-lg font-bold text-gray-900">${product.name}</h2>
                                <p class="text-gray-700 mb-2">Harga: Rp ${product.price.toLocaleString()}</p>
                                <div class="description hidden text-gray-700">
                                    ${product.description}
                                </div>
                                <p class="text-sm text-gray-500">
                                    <strong>Kategori:</strong> ${product.category.name}
                                </p>
                                <p class="text-sm text-gray-500">
                                    <strong>Stok:</strong> ${product.stock}
                                </p>
                            </div>
                        `;

                        productsContainer.appendChild(productCard);
                    });
                } else {
                    console.error("Data produk tidak ditemukan.");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
