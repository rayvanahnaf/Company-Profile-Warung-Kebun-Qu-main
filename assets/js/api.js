let products = []; // Menyimpan data produk dari API
let filteredProducts = []; // Data produk setelah disaring
let currentIndex = 0; // Index saat ini untuk data produk yang dimuat
const itemsPerPage = 8; // Jumlah item yang dimuat setiap klik

// Fungsi untuk memuat produk ke dalam grid
function loadProducts() {
    const productsContainer = document.getElementById("product-list");
    const endIndex = currentIndex + itemsPerPage;

    // Menampilkan produk dari currentIndex hingga endIndex
    for (let i = currentIndex; i < endIndex && i < filteredProducts.length; i++) {
        const product = filteredProducts[i];

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
    }

    // Update index saat ini
    currentIndex = endIndex;

    // Sembunyikan tombol jika semua produk sudah dimuat
    if (currentIndex >= filteredProducts.length) {
        document.getElementById("load-more").style.display = "none";
    }
}

// Fungsi untuk menyaring produk berdasarkan pencarian
function searchProducts(keyword) {
    currentIndex = 0; // Reset index
    const productsContainer = document.getElementById("product-list");
    productsContainer.innerHTML = ""; // Hapus produk yang ditampilkan

    // Filter produk berdasarkan keyword
    filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    // Tampilkan produk yang sesuai
    if (filteredProducts.length > 0) {
        loadProducts();
        document.getElementById("load-more").style.display =
            filteredProducts.length > itemsPerPage ? "block" : "none";
    } else {
        productsContainer.innerHTML =
            '<p class="text-center text-gray-500">Tidak ada menu ditemukan.</p>';
        document.getElementById("load-more").style.display = "none";
    }
}

// Fetch data dari API
fetch("https://pos.warungkebunqu.com/api/products")
    .then((response) => response.json())
    .then((data) => {
        if (Array.isArray(data.data)) {
            products = data.data; // Simpan data produk
            filteredProducts = products; // Awalnya semua produk tampil
            loadProducts(); // Muat produk pertama kali
        } else {
            console.error("Data produk tidak ditemukan.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Event listener untuk tombol Load More
document.getElementById("load-more").addEventListener("click", loadProducts);

// Event listener untuk pencarian
document.getElementById("search-bar").addEventListener("input", (event) => {
    const keyword = event.target.value;
    searchProducts(keyword);
});