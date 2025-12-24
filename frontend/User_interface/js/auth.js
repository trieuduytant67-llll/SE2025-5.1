async function login(e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const res = await apiRequest("/login", "POST", { email, password });
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        location.href = "index.html";
    } catch (e) {
        alert("Sai tài khoản hoặc mật khẩu");
    }
}

function logout() {
    localStorage.clear();
    location.href = "login.html";
}
