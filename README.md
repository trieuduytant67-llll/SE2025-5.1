# Đồ Án: Hệ Thống Thương Mại Điện Tử Tích Hợp AR (ShopWeb AR)

## I. Goals (Mục tiêu tổng quát)

Xây dựng một nền tảng thương mại điện tử toàn diện tích hợp công nghệ **Thực tế tăng cường (Augmented Reality - AR)** nhằm tối ưu hóa trải nghiệm mua sắm trực tuyến.  
Dự án hướng tới việc **xóa bỏ rào cản giữa sản phẩm ảo và không gian thật**, cho phép người dùng:

- Tương tác sản phẩm **360 độ**
- Ướm thử sản phẩm trong môi trường thực tế thông qua camera
- Nâng cao độ tin cậy và hiệu quả trong **quyết định mua hàng**

Hệ thống được thiết kế theo hướng **chuyên nghiệp – hiện đại – dễ mở rộng**, phù hợp với bối cảnh phát triển mạnh mẽ của công nghệ thông tin hiện nay và bắt kịp xu hướng khám phá các trải nghiệm công nghệ mới của người dùng hiện đại.

---

## II. Objectives (Mục tiêu cụ thể)

### 1. Về Kỹ thuật & Hạ tầng (Infrastructure & DevOps)

- **Mono-repo Management**  
  Hợp nhất hai kho lưu trữ Frontend và Backend thành một cấu trúc duy nhất (`shopweb_ar`) nhằm:
  - Đồng bộ hóa logic hệ thống
  - Dễ quản lý mã nguồn và triển khai

- **Containerization**  
  Dockerize toàn bộ hệ thống, sử dụng `docker-compose.yml` để điều phối đồng thời **3 dịch vụ cốt lõi**:
  - **Nginx** – Web Server & Reverse Proxy  
  - **Laravel** – Application Server  
  - **MySQL** – Database Server  

- **Deployment & Networking**  
  Cấu hình **Nginx Reverse Proxy** để:
  - Điều hướng các request trang tĩnh tới Frontend
  - Chuyển tiếp các request `/api` tới Backend Laravel
  - Đảm bảo hiệu năng và bảo mật trong quá trình giao tiếp client–server

---

### 2. Về Frontend & Trải nghiệm AR (Augmented Reality)

- **3D Visualization**  
  Sử dụng **Google Model-Viewer** để hiển thị mô hình 3D định dạng `.glb`, cho phép:
  - Xoay
  - Thu phóng
  - Tương tác trực tiếp trên trình duyệt web

- **WebAR Implementation**  
  Kích hoạt tính năng **AR trên thiết bị di động (Android/iOS)**:
  - Nhận diện mặt phẳng
  - Đặt sản phẩm ảo vào không gian thực thông qua camera

- **Order System Interface**  
  Xây dựng giao diện:
  - Gửi đơn hàng trực tuyến
  - Tra cứu lịch sử mua hàng theo thời gian thực
  - Thao tác đơn giản, thân thiện với người dùng

---

### 3. Về Backend & Quản lý Dữ liệu

- **RESTful API Development**  
  Phát triển hệ thống API bằng **Laravel 11** để xử lý:
  - Danh mục sản phẩm
  - Thông tin mô hình 3D
  - Quản lý đơn hàng (Orders)

- **Database Design**  
  Thiết kế **MySQL Schema** tối ưu, lưu trữ:
  - Thông tin sản phẩm
  - Thuộc tính liên quan đến AR/3D
  - Dữ liệu người dùng và đơn hàng

- **Admin Management Logic**  
  Xây dựng cơ chế:
  - Kiểm tra và phân quyền truy cập
  - Cho phép quản trị viên theo dõi và quản lý danh sách đơn hàng

---

## III. Cấu Trúc Dự Án (Project Structure)

```plaintext
SE2025-5.1/
├── backend/                 # Phần xử lý logic Backend
│   ├── app/                 # Controllers, Models, Business logic (Laravel)
│   ├── routes/              # Định nghĩa các API endpoints
│   ├── database/            # Migration, seeders
│   └── Dockerfile           # Cấu hình đóng gói backend
│
├── frontend/                # Giao diện người dùng (Frontend)
│   ├── assets/              # Hình ảnh, CSS/JS
│   └── ui/                  # HTML pages
│
├── nginx/                   # Cấu hình Web Server (Reverse Proxy)
│   └── default.conf         # Thiết lập Nginx – điều hướng Frontend/API
│
└── docker-compose.yml       # Khởi chạy đồng thời các dịch vụ hệ thống
```
## IV. Thành Viên Thực Hiện

- **Triệu Duy Tân (22001638)**  
  *Phụ trách Frontend & AR Integration*

- **Hoàng Hoài Nam (22001619)**  
  *Phụ trách Backend API & DevOps*

**Giảng viên hướng dẫn:**  
**Bùi Sỹ Nguyên**

---

## V. Công Nghệ Sử Dụng

- **Frontend:**  
  HTML, CSS, JavaScript, Google Model-Viewer, WebAR

- **Backend:**  
  Laravel 11 (PHP)

- **Database:**  
  MySQL

- **DevOps:**  
  Docker, Docker Compose, Nginx
