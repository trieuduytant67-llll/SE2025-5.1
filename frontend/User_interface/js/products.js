const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const catalogFilter = document.getElementById("catalogFilter");

let products = [];
let currentCatalogFilter = "all";

/* ===== LOAD PRODUCTS ===== */
async function loadProducts() {
    try {
        products = await apiRequest("/products"); // gọi API ProductController@index
        renderProducts(products);
        renderCatalogFilter();
    } catch (e) {
        alert("Lỗi tải sản phẩm");
        console.error(e);
    }
}

/* ===== RENDER STARS ===== */
function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? "★" : "☆";
    }
    return stars;
}

/* ===== RENDER PRODUCTS ===== */
function renderProducts(list) {
    productList.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.onclick = () => location.href = `product.html?id=${p.id}`;

        // lấy ảnh chính
        const primaryImage = p.images.find(img => img.is_primary) || p.images[0];

        // lấy AR model link đầu tiên
        const arModel = p.ar_models?.[0];

        card.innerHTML = `
            <img src="${primaryImage?.image_path || ''}" class="product-img">
            <h3>${p.name}</h3>
            <div class="product-rating">${renderStars(p.rating || 5)}</div>
            <p class="price">${Number(p.price).toLocaleString()} ₫</p>
            <p>${p.description || ""}</p>
            ${arModel ? `<a href="${arModel.file_path}" target="_blank">Xem AR Model</a>` : ""}
        `;

        productList.appendChild(card);
    });
}

/* ===== RENDER CATALOG FILTER ===== */
function renderCatalogFilter() {
    catalogFilter.innerHTML = "";

    const catalogs = ["all", ...new Set(products.map(p => p.category?.name).filter(Boolean))];

    catalogs.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat === "all" ? "Tất cả" : cat;
        btn.className = cat === currentCatalogFilter ? "active" : "";

        btn.onclick = () => {
            currentCatalogFilter = cat;
            filterProducts();
            renderCatalogFilter();
        };

        catalogFilter.appendChild(btn);
    });
}

/* ===== FILTER PRODUCTS ===== */
function filterProducts() {
    let list = [...products];
    const keyword = searchInput.value.toLowerCase();

    list = list.filter(p => p.name.toLowerCase().includes(keyword));

    if (currentCatalogFilter !== "all") {
        list = list.filter(p => p.category?.name === currentCatalogFilter);
    }

    if (priceFilter.value === "low") list = list.filter(p => p.price < 100000);
    if (priceFilter.value === "mid") list = list.filter(p => p.price >= 100000 && p.price <= 200000);
    if (priceFilter.value === "high") list = list.filter(p => p.price > 200000);

    renderProducts(list);
}

searchInput.oninput = filterProducts;
priceFilter.onchange = filterProducts;

loadProducts();
