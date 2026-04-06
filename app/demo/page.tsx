export default function DemoPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold dark:text-white">1. Basic Routing & Layouts</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Bạn đang ở trang <code>/demo</code>. Các thành phần điều hướng (sidebar bên trái) chính là một phần của <b>Nested Layout</b> (Layout lồng nhau) được định nghĩa trong file <code>app/demo/layout.tsx</code>.
      </p>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mt-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">Tại sao lại cần Layout?</h2>
        <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
          <li>Khi bạn chuyển sang các màn hình con trong <code>/demo/*</code>, cấu trúc sidebar này sẽ <b>không bị render lại</b> (giữ nguyên trạng thái State nếu có).</li>
          <li>Giúp dễ dàng xây dựng khung giao diện chung như Headers, Footers, Sidebars.</li>
        </ul>
      </div>
    </div>
  );
}
