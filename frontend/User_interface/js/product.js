const params = new URLSearchParams(location.search);
const productId = params.get("id");

async function loadProduct() {
    try {
        const p = await apiRequest(`/products/${productId}`);

        document.getElementById("name").innerText = p.name;
        document.getElementById("price").innerText = Number(p.price).toLocaleString() + " ₫";
        document.getElementById("desc").innerText = p.description || "";

        document.getElementById("image").src = p.image_url;
        document.getElementById("model").src = p.model_url;
    } catch (e) {
        alert("Không tải được sản phẩm");
        console.error(e);
    }
}

loadProduct();
