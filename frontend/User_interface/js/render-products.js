// Renders a global `products` array into the page and wires filters.
(function () {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("searchInput");
    const priceFilter = document.getElementById("priceFilter");
    const catalogFilter = document.getElementById("catalogFilter");

    if (!productList) return;

    const allProducts = (typeof window !== 'undefined' && window.products) ? window.products : [];
    let currentCatalog = 'all';

    function renderStars(rating) {
        const r = Math.round(rating || 0);
        let s = '';
        for (let i = 1; i <= 5; i++) s += i <= r ? '★' : '☆';
        return s;
    }

    function renderProducts(list) {
        productList.innerHTML = '';
        if (!list || list.length === 0) {
            productList.innerHTML = '<p>Không có sản phẩm.</p>';
            return;
        }

        list.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = () => location.href = `product.html?id=${p.id}`;

            const imgSrc = p.image || p.image_url || 'images/placeholder.png';

            card.innerHTML = `
                <img src="${imgSrc}" class="product-img" alt="${p.name}">
                <h3>${p.name}</h3>
                <div class="product-rating">${renderStars(p.rating)}</div>
                <p class="price">${Number(p.price).toLocaleString()} ₫</p>
                <p>${p.shortDesc || p.short_description || ''}</p>
            `;

            productList.appendChild(card);
        });
    }

    function renderCatalogFilter() {
        if (!catalogFilter) return;
        catalogFilter.innerHTML = '';
        const catalogs = ['all', ...new Set(allProducts.map(p => p.catalog).filter(Boolean))];

        catalogs.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat === 'all' ? 'Tất cả' : cat;
            btn.className = (cat === currentCatalog) ? 'active' : '';
            btn.onclick = () => {
                currentCatalog = cat;
                filterProducts();
                renderCatalogFilter();
            };
            catalogFilter.appendChild(btn);
        });
    }

    function filterProducts() {
        let list = [...allProducts];
        const keyword = (searchInput && searchInput.value || '').toLowerCase();

        if (keyword) list = list.filter(p => (p.name || '').toLowerCase().includes(keyword));
        if (currentCatalog !== 'all') list = list.filter(p => p.catalog === currentCatalog);
        if (priceFilter) {
            if (priceFilter.value === 'low') list = list.filter(p => p.price < 100000);
            if (priceFilter.value === 'mid') list = list.filter(p => p.price >= 100000 && p.price <= 200000);
            if (priceFilter.value === 'high') list = list.filter(p => p.price > 200000);
        }

        renderProducts(list);
    }

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);

    // initial render
    renderCatalogFilter();
    renderProducts(allProducts);
})();
