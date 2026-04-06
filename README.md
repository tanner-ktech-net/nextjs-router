# 🚀 Technical Report: Next.js  App Router Architecture

> [!NOTE]
> Tài liệu này cung cấp cái nhìn toàn diện về hệ thống **App Router** trong phiên bản **Next.js +**, bao gồm những cập nhật mới nhất về kiến trúc, **React 19**, cơ chế **Caching** mới, và các **Async Request APIs**.

---

## 📑 Mục Lục

- [1. Tổng Quan về Kiến Trúc Next.js ](#1-tổng-quan-về-kiến-trúc-nextjs-15)
- [2. React 19 & React Server Components (RSC)](#2-react-19--react-server-components-rsc)
- [3. Caching Semantics (Cập nhập cực kỳ quan trọng)](#3-caching-semantics-cập-nhập-cực-kỳ-quan-trọng)
- [4. File-system Routing & Async APIs](#4-file-system-routing--async-apis)
- [5. Server Actions & Mutations](#5-server-actions--mutations)
- [6. Navigation & Enhanced `<Form>`](#6-navigation--enhanced-form)

---

## 1. Tổng Quan về Kiến Trúc Next.js 

Next.js  củng cố App Router làm kiến trúc lõi, loại bỏ dần các mô hình cũ để hướng tới trải nghiệm Server-First tối ưu.

| Feature | Pages Router (Legacy) | App Router (Next.js +) |
| :--- | :--- | :--- |
| **Routing Model** | Dựa trên hệ thống tệp tĩnh | Dựa trên thư mục & Layouts lồng nhau |
| **Component Model** | Chủ yếu Client-side | **React 19 Server Components (RSC)** |
| **Data Fetching** | `getServerSideProps` | Native `fetch` API, Server Actions |
| **Caching Default** | Theo từng trang (Page-level) | **Uncached by default** (Opt-in Caching) |
| **Bundler** | Webpack | **Turbopack** (Stable for Dev) |

---

## 2. React 19 & React Server Components (RSC)

Kiến trúc App Router hiện được vận hành hoàn toàn trên nền tảng **React 19**.

- **Server Components (Mặc định):** Chạy duy nhất trên Server. Không đẩy JavaScript xuống Client, giúp Bundle Size gần như bằng 0. Trực tiếp gọi vào Database hoặc Backend API.
- **Client Components:** Khai báo bằng `"use client"`. Chỉ dùng khi cần tính tương tác (Event Listeners, Hooks như `useState`, `useEffect`) hoặc Browser APIs.

> [!TIP]
> Tận dụng tối đa các Hooks mới của React 19 như `useActionState`, `useFormStatus`, và `useOptimistic` để xây dựng UI tương tác mà không cần quản lý state thủ công phức tạp.

---

## 3. Caching Semantics (Cập nhập cực kỳ quan trọng)

> [!WARNING]
> **Breaking Change trong Next.js :** Các requests cấu hình trước đây hay được tự động cache nay sẽ **KHÔNG còn tự động cache** nữa.

Để đảm bảo kết quả luôn là dữ liệu mới nhất nếu nhà phát triển không chủ động cài đặt, cấu hình mặc định (Defaults) đã được thay đổi:

- Các lệnh gọi `fetch()` **không** còn được cache mặc định. Bạn phải dùng `{ cache: 'force-cache' }` để opt-in.
- Các hàm `GET` Route Handlers mặc định **không** được cache.
- Client Router Cache mặc định không lưu trữ (hoặc lưu trữ rất ngắn) việc điều hướng giữa các Pages để đảm bảo người dùng luôn thấy dữ liệu "tươi" (fresh data).

---

## 4. File-system Routing & Async APIs

Hệ thống định tuyến vẫn tuân theo quy tắc thư mục, nhưng với Next.js , các Request APIs đã trở thành **Bất đồng bộ (Asynchronous)**.

### 🏠 Special Files Quy Ước

- `page.tsx`: Định nghĩa UI chính.
- `layout.tsx`: Định nghĩa vùng UI dùng chung (Shared UI) không bị re-render.
- `loading.tsx`: Tự động bọc Suspense Boundary để hiển thị Loading State (Streaming).

### ⚡ Async Dynamic APIs (Breaking Change)

Các thuộc tính phụ thuộc vào Request (trước đây là Synchronous) hiện nay bắt buộc phải dùng `await`:

```tsx
// app/blog/[slug]/page.tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params;
  const queries = await searchParams;
  
  return <h1>Post: {slug}</h1>;
}
```

---

## 5. Server Actions & Mutations

**Server Actions** đã hoàn toàn thay thế khái niệm API Routes (`/api/*`) cho mục đích đột biến dữ liệu (Data Mutations).

- **"use server"**: Đánh dấu một hàm chỉ được thực thi trên máy chủ.
- Tích hợp trực tiếp vào Form: `<form action={myServerAction}>`
- Bảo mật và tiện lợi: Tự động xử lý Progressive Enhancement và tích hợp liền mạch với RSC.

```tsx
// actions.ts
'use server'
export async function createPost(formData: FormData) {
  const title = formData.get('title');
  // Thực thi lưu vào Database trực tiếp
}
```

---

## 6. Navigation & Enhanced `<Form>`

Ngoài việc sử dụng `<Link>` để prefetching thông minh, Next.js  ra mắt component `<Form>` mới (`next/form`).

### 🆕 `next/form`

Cho phép bạn điều hướng (navigate) dưới Client-side một cách mượt mà khi submit dữ liệu form (ví dụ: chức năng Search) thay vì load lại toàn trang:

- Tự động Prefetch nội dung trang tiếp theo.
- Khớp với hệ thống Client Router của App Router.

```tsx
import Form from 'next/form'
 
export default function SearchBar() {
  return (
    <Form action="/search">
      <input name="query" placeholder="Tìm kiếm..." />
      <button type="submit">Tìm</button>
    </Form>
  )
}
```

---

*Tài liệu được phân tích và cập nhật cấu trúc dựa trên phiên bản Next.js  mới nhất bởi Antigravity.*
