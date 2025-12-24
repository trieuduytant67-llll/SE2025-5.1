Đồ Án: Hệ Thống Thương Mại Điện Tử Tích Hợp AR (ShopWeb AR)
I. Goals (Mục tiêu tổng quát)
Xây dựng một nền tảng thương mại điện tử toàn diện tích hợp công nghệ Thực tế tăng cường (AR) nhằm tối ưu hóa trải nghiệm mua sắm trực tuyến. Dự án hướng tới việc xóa bỏ rào cản giữa sản phẩm ảo và không gian thật, cho phép người dùng tương tác 360 độ và ướm thử sản phẩm thực tế, từ đó nâng cao quyết định mua hàng và khẳng định tính chuyên nghiệp trong quy trình quản lý bán hàng hiện đại. Dự án phù hợp với bối cảnh phát triển của công nghệ thông tin hiện nay, đồng thời bắt kịp xu hướng tìm kiếm và trải nghiệm những công nghệ mới của người dùng hiện đại.

II. Objectives (Mục tiêu cụ thể)
1. Về Kỹ thuật & Hạ tầng (Infrastructure & DevOps)
Mono-repo Management: Hợp nhất thành công hai kho lưu trữ riêng biệt thành một cấu trúc duy nhất (shopweb_ar) để đồng bộ hóa logic giữa Frontend và Backend.

Containerization: Triển khai giải pháp Dockerize toàn bộ hệ thống. Sử dụng docker-compose.yml để điều phối đồng thời 3 dịch vụ cốt lõi: Nginx (Web Server), Laravel (App Server) và MySQL (Database).

Deployment & Networking: Cấu hình Nginx Reverse Proxy để phân phối lưu lượng: điều hướng các yêu cầu trang tĩnh tới Frontend và các yêu cầu dữ liệu (/api) tới Backend Laravel một cách bảo mật.

2. Về Frontend & Trải nghiệm AR (Augmented Reality)
3D Visualization: Sử dụng Google Model-Viewer để hiển thị mô hình 3D định dạng .glb sắc nét, cho phép xoay, thu phóng và tương tác trực tiếp trên trình duyệt.

WebAR Implementation: Kích hoạt tính năng xem AR trên các thiết bị di động (Android/iOS), hỗ trợ nhận diện mặt phẳng để đặt sản phẩm vào không gian thực qua camera.

Order System Interface: Xây dựng giao diện thanh toán thông minh, cho phép người dùng gửi đơn hàng và tra cứu lịch sử mua hàng theo thời gian thực.

3. Về Backend & Quản lý Dữ liệu
RESTful API Development: Xây dựng hệ thống API bằng Laravel 11 để xử lý toàn bộ luồng dữ liệu từ danh mục sản phẩm đến quản lý đơn hàng (Orders).

Database Design: Thiết kế lược đồ MySQL tối ưu để lưu trữ thông tin sản phẩm đồng bộ với các thuộc tính 3D và dữ liệu người dùng.

Admin Management Logic: Thiết lập cơ chế kiểm tra quyền truy cập để quản trị viên có thể theo dõi và quản lý danh sách đơn hàng được gửi từ hệ thống.

III. Cấu Trúc Dự Án (Project Structure)
Plaintext

SE2025-5.1/
├── backend/                 # Phần xử lý logic Backend
│   ├── app/                 # Controllers, Models, Business logic của Laravel
│   ├── routes/              # Định nghĩa các API endpoints
│   ├── database/            # Migration, seeders
│   └── Dockerfile           # Cấu hình đóng gói backend
├── frontend/                # Giao diện người dùng (Frontend)
│   ├── assets/              # Hình ảnh, mô hình 3D, CSS/JS
│   ├── index.html           # Trang chính hiển thị sản phẩm
│   └── orders.html          # Trang lịch sử đơn hàng
├── nginx/                   # Cấu hình web server (Reverse Proxy)
│   └── default.conf         # Thiết lập Nginx – điều hướng Frontend/API
└── docker-compose.yml       # Khởi chạy đồng thời các dịch vụ hệ thống

IV. Thành Viên Thực Hiện
Triệu Duy Tân (22001638) - Phụ trách Frontend & AR Integration.

Hoàng Hoài Nam (22001619) - Phụ trách Backend API & DevOps.

Giảng viên hướng dẫn: Bùi Sỹ Nguyên
