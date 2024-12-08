fetch("https://pos.warungkebunqu.com/api/products")
    .then((response) => response.json())
    .then((data) => {
        const productsContainer = document.getElementById("product-list");

        if (Array.isArray(data.data)) {
            data.data.forEach((product) => {
                const productElement = document.createElement("div");
                productElement.classList.add(
                    "bg-white",
                    "shadow-md",
                    "rounded-lg",
                    "overflow-hidden",
                    "hover:shadow-lg",
                    "transition"
                );

                productElement.innerHTML = `
                    <img src="https://pos.warungkebunqu.com/storage/produk/${
                      product.image
                    }" 
                        alt="${product.name}" 
                         class="w-full h-40 object-cover">
                    <div class="p-4">
                        <h5 class="text-lg font-semibold text-gray-800 truncate">${
                          product.name
                        }</h5>
                        <p class="text-gray-600">Harga: Rp ${product.price.toLocaleString()}</p>
                        <p class="text-sm text-gray-500"><strong>Kategori:</strong> ${
                          product.category.name
                        }</p>
                    </div>
                `;

                productsContainer.appendChild(productElement);
            });
        } else {
            productsContainer.innerHTML =
                '<p class="text-center text-red-500">Data produk tidak ditemukan.</p>';
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });