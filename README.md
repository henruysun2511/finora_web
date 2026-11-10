# FINORA Web Admin Portal (`finora_fe`)

Phân hệ Web Admin Dashboard cho nền tảng quản trị tài chính cá nhân & bạn bè **FINORA**.

Dự án được xây dựng dựa trên kiến trúc chuẩn từ `SOLARN/solarn_fe`, kế thừa ngôn ngữ thiết kế FinTech từ `static-ui/ui-sample-3` và kết nối trực tiếp với backend NestJS `finora_be`.

---

## 🛠️ Công nghệ cốt lõi

* **Framework**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
* **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) + `tw-animate-css`
* **Components**: Shadcn UI (Radix UI primitives: Dialog, Table, Dropdown, Button, Input, Badge, Select, Switch)
* **Quản lý State & Auth**: Zustand (`useAuthStore` với `persist` và `js-cookie`)
* **Data Fetching**: `@tanstack/react-query` v5
* **Form & Validation**: `react-hook-form` + `zod` + `@hookform/resolvers`
* **HTTP Client**: Axios với Interceptors tự động đính kèm `Bearer Token` và cơ chế auto refresh token khi mã `401`
* **Icons & Notifications**: `lucide-react`, `sonner`
* **Theme**: `next-themes` (Dark Mode & Light Mode)

---

## 🚀 Hướng dẫn khởi chạy

### 1. Cài đặt phụ thuộc
```bash
npm install
```

### 2. Cấu hình môi trường (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_NAME=Finora Admin
```

### 3. Khởi chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3001](http://localhost:3001)

### 4. Build Production
```bash
npm run build
npm start
```

---

## 🧭 Cấu trúc định tuyến (Routes)

* `/login`: Trang đăng nhập quản trị viên với giao diện thẻ kính FinTech
* `/admin/dashboard`: Bảng điều khiển tổng quan, thẻ thống kê nhanh và chỉ số tài chính
* `/admin/categories`: Trang Quản lý danh mục hệ thống (CRUD danh mục Thu/Chi, cây phân cấp, phân loại màu sắc, icon, cờ mặc định hệ thống)

