// js/login.js
import { login } from "./auth.js";

const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await login(email, password);
        alert("Login successful!");
        window.location.href = "index.html";
    } catch (err) {
        alert(err.message || "Login failed");
    }
});
