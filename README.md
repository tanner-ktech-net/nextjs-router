# Báo Cáo: Next.js App Router & Routing System

Dự án này là một báo cáo chi tiết kèm theo các đoạn code sample trực tiếp trong mã nguồn để phục vụ cho việc tìm hiểu về cơ chế **Routing của Next.js (App Router)**.

## 1. Giới thiệu: Next.js App Router là gì?
Từ Next.js phiên bản 13, Vercel đã giới thiệu một mô hình định tuyến mới với tên gọi **App Router** (thay thế cho Pages Router cũ). App Router được xây dựng trên nền tảng React Server Components (RSC), mang đến những tính năng đột phá về hiệu suất, layout nhúng lồng nhau (nested layouts) và cơ chế tải dữ liệu tiên tiến.

*Tính năng chính:*
- Thư mục `app/` làm cốt lõi định tuyến.
- Các component mặc định là Server Components (chạy phía server, tối ưu SEO, dung lượng nhỏ gọn).
- Hỗ trợ tốt hơn cho Layouts lồng nhau.
- Các trạng thái Loading, Error được xử lý mượt mà và khai báo rõ ràng.

## 2. File-system based Routing (Định tuyến bằng File & Folder)
Trong thư mục `app`, Next.js sử dụng cách đặt tên và cấu trúc folder đặc thù để tạo HTTP Routes. 

1. **Folder** định hình đường dẫn của Route (URL Path). Ví dụ folder `app/demo` tương ứng với URL `/demo`.
2. **File** định nghĩa cụ thể UI của một Route Segment.

**Các tệp quy ước quan trọng nhất (Special Files):**
- `page.tsx`: File duy nhất để public một Route. Giao diện chính của URL đó (Vd: `app/demo/page.tsx`).
- `layout.tsx`: Giao diện bao bọc (Wrapper/Layout) cho nhiều page. Có khả năng tái sử dụng mà không re-render khi chuyển trang giữa route được bao bọc.
- `loading.tsx`: Giao diện Loading chờ trong thời gian gọi API hoặc render (dùng chung với React Suspense).
- `error.tsx`: Màn hình lỗi riêng biệt không làm crash toàn ứng dụng (dùng chung với React Error Boundary).
- `not-found.tsx`: UI riêng cho trang lỗi 404 Not Found.

## 3. Dynamic Routes (Routes Động)
Dynamic Routes cho phép bạn định nghĩa các Route không có đường dẫn xác định từ trước, ví dụ trang chi tiết Sản phẩm hoặc Blog: `/products/123`.

Cấu trúc: Tạo folder bọc bởi cặp ngoặc vuông `[tên_param]`.
Ví dụ: `app/demo/products/[id]/page.tsx`
Tham số `id` sẽ được chuyển vào `params` trong hàm component `Page({ params })`.

## 4. Route Groups (Nhóm Route không bắt đường dẫn)
Đôi khi bạn muốn gom chung các màn hình vào từng phân hệ cụ thể để viết chung một `layout.tsx` (như Marketing, Auth, Dashboard), nhưng bạn KHÔNG MUỐN nhóm đó thêm phần tử vào trong URL Path của mình.
- Dùng dấu ngoặc đơn: `(tên_nhóm)`.
Ví dụ: Thư mục có tên `(marketing)` với bên trong là file `about/page.tsx` thì URL trên trình duyệt sẽ là `/about` chứ không phải là `/(marketing)/about`.

## 5. Navigation: Thẻ `<Link>` vs `useRouter`
Next.js khuyên dùng `<Link>` cho gần như mọi trường hợp để tận dụng được sức mạnh Pre-fetching.
- **`<Link href="/demo">`**: Sử dụng cho điều hướng thông thường (nhấp chuột chuyển màn).
- **`useRouter` (hook)**: Dùng riêng cho Component chạy trên Client (`"use client"`). Rất tiện lợi cho việc trigger chuyển trang sau khi thực hiện việc kết nối thay đổi dữ liệu hoặc login/logout ở phía javascript xử lý logic. Ví dụ: `router.push('/dashboard')`.

---

# Hướng dẫn chạy Demo

Xem dự án thực tế thông qua các route trong thư mục `app`. Hãy bắt đầu máy chủ để quan sát trực tiếp:

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường phát triển (Dev server):**
   ```bash
   npm run dev
   ```

3. Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt mạng của bạn để xem và trải nghiệm.

### Danh sách các tuyến Demo đã xây dựng sẵn để kiểm tra:
1. **[Trang chủ chung toàn hệ thống]**: `/` -> Hiển thị danh sách route bài học
2. **[Layouts & Basic Route]**: `/demo`
3. **[Dynamic Route]**: `/demo/products` và `/demo/products/123`
4. **[Route Groups]**: `/about` 
5. **[Loading & Error boundaries]**: `/demo/posts` 
6. **[Navigation Events]**: `/demo/navigation`
