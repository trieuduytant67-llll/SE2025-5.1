// 1. Khởi tạo giỏ hàng với Key chuẩn đã thống nhất
let cart = JSON.parse(localStorage.getItem("ar_pro_cart")) || [];

// 2. Hàm thêm vào giỏ hàng (Có xử lý nhóm sản phẩm trùng nhau)
function addToCart(product, color = "Mặc định") {
    // Tìm xem sản phẩm cùng ID và cùng màu đã tồn tại chưa
    const existingItem = cart.find(item => item.id === product.id && item.color === color);

    if (existingItem) {
        // Nếu tồn tại rồi thì tăng số lượng
        existingItem.quantity += 1;
    } else {
        // Nếu chưa có thì thêm mới với quantity = 1
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            color: color,
            image: product.images?.[0]?.image_path || 'https://via.placeholder.com/150',
            quantity: 1
        });
    }

    // Lưu lại vào localStorage
    saveCart();
    
    // Thông báo cho người dùng (Sử dụng SweetAlert2 nếu có, hoặc alert thường)
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Đã thêm vào giỏ hàng',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        alert("Đã thêm vào giỏ hàng");
    }
}

// 3. Hàm lưu giỏ hàng và cập nhật Badge (số lượng hiển thị trên icon)
function saveCart() {
    localStorage.setItem("ar_pro_cart", JSON.stringify(cart));
    updateCartBadge();
}

// 4. Cập nhật số lượng hiển thị trên Icon giỏ hàng (ở Header)
function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (badge) {
        const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = totalQty;
    }
}

// 5. Hàm hiển thị giỏ hàng (Dùng cho trang có danh sách giỏ hàng)
function renderCart() {
    const list = document.getElementById("cart-list");
    if (!list) return; // Nếu không có element này thì thoát

    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = "<li class='text-muted'>Giỏ hàng trống</li>";
        return;
    }

    cart.forEach((p, index) => {
        const li = document.createElement("li");
        li.className = "d-flex justify-content-between align-items-center mb-2 border-bottom pb-2";
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${p.image}" width="40" class="rounded me-2">
                <div>
                    <div class="fw-bold">${p.name}</div>
                    <small class="text-muted">Màu: ${p.color} x ${p.quantity}</small>
                </div>
            </div>
            <div class="text-end">
                <div class="fw-bold text-primary">${(p.price * p.quantity).toLocaleString()} ₫</div>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(li);
    });
}

// 6. Hàm xóa sản phẩm (Giảm số lượng hoặc xóa hẳn)
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart(); // Vẽ lại danh sách sau khi xóa
}

// Chạy cập nhật Badge ngay khi nạp file
updateCartBadge();
