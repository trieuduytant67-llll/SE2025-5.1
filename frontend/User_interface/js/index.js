// js/index.js
import { apiFetch } from "./api.js";
import { logout } from "./auth.js";

async function loadProducts() {
    try {
        const products = await apiFetch("/products");
        const container = document.getElementById("productList");
        container.innerHTML = products.map(p => `<div>${p.name} - ${p.price}</div>`).join("");
    } catch (err) {
        alert("Error loading products");
    }
}

loadProducts();
