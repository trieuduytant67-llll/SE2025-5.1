async function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
        alert("Giỏ hàng trống");
        return;
    }

    const res = await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({
            items: cart
        })
    });

    if (res) {
        alert("Đặt hàng thành công");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    }
}
