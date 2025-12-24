

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const catalogFilter = document.getElementById("catalogFilter");

let currentCatalogFilter = "all";

// Hàm hiển thị sao đánh giá
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";
    
    for (let i = 0; i < fullStars; i++) {
        stars += "★";
    }
    if (hasHalfStar) {
        stars += "☆";
    }
    
    return stars;
}

// Hiển thị sản phẩm
function renderProducts(list = products) {
    productList.innerHTML = "";

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.onclick = () => {
            window.location.href = `product.html?id=${product.id}`;
        };

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <div class="product-rating">
                <span class="star">${renderStars(product.rating)}</span>
                <span>(${product.rating}/5)</span>
            </div>
            <p class="price">${product.price.toLocaleString()} ₫</p>
            <p class="desc">${product.shortDesc}</p>
        `;

        productList.appendChild(card);
    });
}

// Hiển thị nút lọc theo danh mục
function renderCatalogFilter() {
    catalogFilter.innerHTML = "";
    
    const catalogs = ["all", ...new Set(products.map(p => p.catalog))];
    
    catalogs.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "catalog-btn";
        btn.innerText = cat === "all" ? "Tất cả" : cat;
        
        if (cat === currentCatalogFilter) {
            btn.classList.add("active");
        }
        
        btn.onclick = () => {
            currentCatalogFilter = cat;
            filterProducts();
            renderCatalogFilter();
        };
        
        catalogFilter.appendChild(btn);
    });
}

// Giỏ hàng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const user = localStorage.getItem("user");
    if (!user) {
        showToast("Vui lòng đăng nhập trước!");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
        return;
    }

    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("✅ Đã thêm vào giỏ hàng!");
}

// Tìm kiếm + lọc
function filterProducts() {
    let keyword = searchInput.value.toLowerCase();
    let price = priceFilter.value;

    let filtered = products.filter(p => p.name.toLowerCase().includes(keyword));

    // Lọc theo danh mục
    if (currentCatalogFilter !== "all") {
        filtered = filtered.filter(p => p.catalog === currentCatalogFilter);
    }

    if (price === "low") filtered = filtered.filter(p => p.price < 100000);
    if (price === "mid") filtered = filtered.filter(p => p.price >= 100000 && p.price <= 150000);
    if (price === "high") filtered = filtered.filter(p => p.price > 150000);

    renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
priceFilter.addEventListener("change", filterProducts);

// Khởi tạo
renderProducts();
renderCatalogFilter();

// ===== KIỂM TRA ĐĂNG NHẬP =====
const userInfo = document.getElementById("user-info");
const loginLink = document.getElementById("login-link");
const logoutBtn = document.getElementById("logout-btn");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    userInfo.innerText = `👤 ${user.user}`;
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";

    logoutBtn.onclick = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        alert("Đã đăng xuất!");
        location.reload();
    };
}

function showToast(message, duration = 2000) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}
