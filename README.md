# Báo Cáo Chuyên Sâu: Cơ chế Định tuyến (Routing) trong Next.js App Router

Tài liệu này là một báo cáo kỹ thuật toàn diện, đi sâu vào hệ thống **App Router** được giới thiệu từ Next.js phiên bản 13 trở lên. Đi kèm với báo cáo là các ví dụ mã nguồn trực tiếp (demos) trong dự án này (thư mục `app/`).

---

## MỤC LỤC
1. [Tổng quan về App Router](#1-tổng-quan-về-app-router)
2. [Cấu trúc Thư mục và File Quy ước](#2-cấu-trúc-thư-mục-và-file-quy-ước)
3. [Định tuyến Căn bản và Layout Lồng nhau](#3-định-tuyến-căn-bản-và-layout-lồng-nhau)
4. [Định tuyến Động (Dynamic Routing) Nâng cao](#4-định-tuyến-động-dynamic-routing-nâng-cao)
5. [Tổ chức Code với Route Groups](#5-tổ-chức-code-với-route-groups)
6. [Quản lý Loading State & Error Boundaries](#6-quản-lý-loading-state--error-boundaries)
7. [Các Cơ chế Định tuyến Xuyên suốt (Advanced Routing)](#7-các-cơ-chế-định-tuyến-xuyên-suốt-advanced-routing)
8. [Client & Server - Sự Khác Biệt Trong Điều Hướng (Navigation)](#8-client--server---sự-khác-biệt-trong-điều-hướng-navigation)
9. [Hướng Dẫn Khởi Chạy Dự Án Demo](#9-hướng-dẫn-khởi-chạy-dự-án-demo)

---

## 1. Tổng quan về App Router
App Router là thế hệ định tuyến mới được Next.js xây dựng nhằm tận dụng tối đa nền tảng **React Server Components (RSC)** và **Streaming**. So với thế hệ cũ (Pages Router), App Router giải quyết hiệu quả:
- **Layouts lồng nhau (Nested Layouts)** khổng lồ mà không cần re-render.
- Hỗ trợ kiến trúc máy chủ / máy khách riêng biệt theo từng Component.
- Quản lý hiệu suất, Caching và Loading UI dễ dàng hơn bao giờ hết.

## 2. Cấu trúc Thư mục và File Quy ước
Khác với mô hình mọi file trong `pages/` đều biến thành UI như ở hệ cũ, ở hệ `app/`, **thư mục dùng để lập bản đồ tuyến đường (route path)**, và chỉ có một số file quy định đặc biệt (Special Files) mới thực sự được render ra UI.

Các **Special Files** quan trọng bao gồm:
* `page.tsx`: Quyết định UI công khai duy nhất cho thư mục đó.
* `layout.tsx`: Giao diện bao bọc (Wrapper) có thể dùng chung cho nhiều file con. Giữ trạng thái (state) ngay cả khi chuyển trang.
* `template.tsx`: Giống Layout nhưng tạo một Instand mới (re-render) hoàn toàn khi định vị (navigate).
* `loading.tsx`: Giao diện chờ tự động kích hoạt bởi React Suspense.
* `error.tsx` / `global-error.tsx`: Màn hình bắt lỗi và thay thế UI bị lỗi (React Error Boundary).
* `not-found.tsx`: Màn hình tùy chỉnh cho mã HTTP 404.
* `route.ts`: Dùng để tạo các API endpoints (REST) hỗ trợ xử lý Server-side thay thế cho `pages/api`.

## 3. Định tuyến Căn bản và Layout Lồng nhau
Khi truy cập URL `/demo`, hệ thống đọc thư mục `app/demo/`. Cả thư mục này sẽ render dữ liệu như sau: Đầu tiên gói với `app/layout.tsx` (Root Layout) ➔ chèn vào `app/demo/layout.tsx` ➔ và cuối cùng nhét UI `app/demo/page.tsx` vào trong biến `children`.

**Lợi ích của Nested Layouts:**
- Các thành phần sidebar, topbar trong `layout.tsx` sẽ **không render lại** khi ta thao tác giữa các phân hệ con.
- Vòng đời component (mounted/unmounted) không bị phá vỡ, tối ưu DOM.

## 4. Định tuyến Động (Dynamic Routing) Nâng cao
Bằng cách đặt tên folder theo dạng `[tên_biến]`, bạn có thể lấy tham số động từ URL.

* **Single Segments:** `app/products/[id]/page.tsx` sẽ xử lý `/products/1` và `/products/abc`.
* **Catch-all Segments:** `app/shop/[...slug]/page.tsx` gom toàn bộ các cấp tiếp theo. Xử lý cho cả `/shop/clothes/shirts/red`. 
    - Biến `slug` trả về mảng `['clothes', 'shirts', 'red']`.
* **Optional Catch-all:** `app/shop/[[...slug]]/page.tsx` hoạt động với mọi đường dẫn nằm dưới bao gồm cả đường dẫn gốc `/shop/`.

*Lưu ý từ Next.js 15: Biến `params` hiện đã chuyển thành Promise nên phải khai báo `await params`.*

## 5. Tổ chức Code với Route Groups
Tạo một thư mục được ngoặc đơn, ví dụ `(marketing)`. Tính năng này cho phép:
1. Gom nhóm code lại với nhau để dễ tìm và quản trị.
2. Thêm Layout chung (ví dụ một Banner Quảng cáo) vào một nhóm các Page không liên kết với nhau.
3. Hoàn toàn **âm thầm (Invisible)**, chữ thư mục này không bao giờ xuất hiện trong URL Path. 
   - Ví dụ: `app/(marketing)/about/page.tsx` tạo ra URL `/about`.

## 6. Quản lý Loading State & Error Boundaries
App Router tự động áp dụng concept **React Suspense / Boundaries**.
* Bất kỳ khi nào một file `page.tsx` thực hiện Async Fetch chậm, nếu xung quanh nó có mặt một file `loading.tsx`, file loading sẽ hiện lên tức thì, che dấu khoảng trống, đợi data về rồi swap lại UI hoàn chỉnh.
* Sử dụng `error.tsx` kèm cờ `"use client"`, ta có thể thu phát các lỗi runtime hay API fail, hiện thông báo cho User kèm nút "Thử Khôi Phục" (`reset()`) thay vì văng ra trang trắng đáng sợ (Crash app).

## 7. Các Cơ chế Định tuyến Xuyên suốt (Advanced Routing)
Next.js nâng tầm quản trị UI với:

* **Parallel Routes (`@folder`)**: Cho phép render *song song* cùng lúc hai trang (hay nhiều hơn) trong cùng một màn hình (VD: Dashboard hiển thị cột Analytics đồng thời cột TeamMembers nhưng lại lấy dữ liệu loading khác nhau).
* **Intercepting Routes (`(...)`)**: Khả năng "Đánh chặn" Route nhằm load UI ngay trên trang hiện tại theo dạng Popup (Web) nhưng vẫn tạo liên kết URL đúng chuẩn. VD: Link hình ảnh mở popup hình mà URL vẫn điều hướng tới `photo/1`, nhưng nếu refresh trình duyệt (hoặc ấn link ngoài) thì mới nhảy tới trang gốc.

## 8. Client & Server - Sự Khác Biệt Trong Điều Hướng (Navigation)
Trong Next.js App Router, khác biệt lớn nhất giữa `use client` và Server Components là ở chuyển trang.

* **Thẻ `<Link href="...">`**: 
   Dùng được cả Client và Server Components. Là Option luôn được ưu tiên (Best Practice), bởi Next.js sẽ tự động **Pre-fetching** ngầm trang tiếp theo bằng Javascript khi link bắt đầu hiện vô tầm nhìn người dùng.
* **Hook `useRouter()`**: 
   Ràng buộc khắt khe vào `"use client"`. Dùng khi ta cần thực thi vài Logic Javascript hoàn tất xong mới cho phép chuyển trang (Ví dụ onClick submit form -> Login Database -> Thành Công -> `router.push("/abc")`).
* **Hàm `redirect()`**: Nên dùng cho phía Server (sau Server Actions / Route Handlers) muốn chuyển hướng ai đó lập tức.

---

## 9. Hướng Dẫn Khởi Chạy Dự Án Demo

Phần lý thuyết bên trên đã được thiết kế thành một bộ Demo Website thực hành hoàn chỉnh. Để kiểm định các concept:

1. **Khởi chạy môi trường máy tính của bạn:**
   ```bash
   npm install
   npm run dev
   ```

2. **Truy cập Trình duyệt:** Mở liên kết `http://localhost:3000`

3. **Thực Hành Demos (Tại Trang DashBoard):** 
   * **[Demo 1]** - **Nested Layouts**: Kiểm tra sự tĩnh tại Sidebar trên URL `/demo`.
   * **[Demo 2]** - **Dynamic Routing**: Chuyển hướng tham số tại URL `/demo/products`.
   * **[Demo 3]** - **Route Groups**: Check đường dẫn gốc độc lập tại URL `/about`.
   * **[Demo 4]** - **Loading & Errors**: Truy cập `/demo/posts` theo dõi 2 giây chờ Skeleton. Ấn nút Lỗi để thấy Error Boundaries.
   * **[Demo 5]** - **Navigation / Router**: Vào link `/demo/navigation` thực hành chuyển route giữa thẻ `<Link>` và Hooks.
