import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <div className="font-bold text-xl dark:text-white">
          <Link href="/demo">&larr; Trở lại danh sách Demo</Link>
        </div>
        
        <h1 className="text-4xl font-bold dark:text-white">3. Route Groups</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Trang này minh họa về <b>Route Groups</b> trong Next.js App Router.
        </p>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-500">Cấu trúc thư mục của trang này:</h2>
          <code className="block bg-zinc-100 dark:bg-zinc-950 p-4 rounded-lg mt-4 text-sm font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300">
            app/<br/>
            └─ (marketing)/ &lt;-- Thư mục bị ẩn đi trên URL<br/>
            &nbsp;&nbsp; └─ about/<br/>
            &nbsp;&nbsp; &nbsp;&nbsp; └─ page.tsx
          </code>
          
          <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 space-y-2 mt-6">
            <li>Dấu ngoặc đơn <code>(marketing)</code> giúp tạo nhóm thư mục logic mà <b>không ảnh hưởng đến URL mapping</b>.</li>
            <li>URL của trang này hiện tại là <code>/about</code> chứ không phải là <code>/(marketing)/about</code>.</li>
            <li>Rất hữu ích để chia chung một <code>&lt;Layout&gt;</code> cho nhóm marketing riêng biệt (không dính tới nhóm auth hay admin).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
