const API_BASES = ["/api/v1"]; // Ép buộc sử dụng đường dẫn chuẩn đã test curl

async function apiRequest(url, method = "GET", data = null) {
    const headers = {
        "Content-Type": "application/json",
    };

    const token = localStorage.getItem("token");
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (data) {
        options.body = JSON.stringify(data);
    }

    const base = API_BASES[0];
    const fullUrl = base + url;

    try {
        const res = await fetch(fullUrl, options);
        
        // Kiểm tra nếu trả về HTML thay vì JSON
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            throw new Error("Server trả về HTML thay vì JSON. Kiểm tra lại Route Laravel.");
        }

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API Error ${res.status}: ${errorText}`);
        }

        return await res.json();
    } catch (e) {
        console.error(`Lỗi kết nối tại ${fullUrl}:`, e.message);
        throw e;
    }
}
