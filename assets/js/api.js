// Melakukan fetch data dari API
fetch('https://pos.warungkebunqu.com/api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Mengubah response menjadi JSON
    })
    .then(data => {
        // Menampilkan data di HTML
        const productsContainer = document.getElementById('products');
        
        // Cek apakah data mengandung array produk
        if (Array.isArray(data.data)) {
            data.data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                
                // Menambahkan informasi produk ke dalam elemen HTML
                productElement.innerHTML = `
                    <img src="https://pos.warungkebunqu.com/storage/produk/${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p class="price">Harga: Rp ${product.price.toLocaleString()}</p>
                    <div class="description">${product.description}</div>
                    <p><strong>Kategori:</strong> ${product.category.name}</p>
                    <p><strong>Stok:</strong> ${product.stock}</p>
                `;
                
                // Menambahkan elemen produk ke dalam container
                productsContainer.appendChild(productElement);
            });
        } else {
            console.error('Data produk tidak ditemukan atau format tidak sesuai');
        }
    })
    .catch(error => {
        // Menangani error
        console.error('There was a problem with the fetch operation:', error);
    });
