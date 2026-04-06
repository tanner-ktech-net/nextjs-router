"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavigationDemo() {
  const router = useRouter();

  const handleSimulateLogin = () => {
    // Giả lập delay khi xử lý logic login
    setTimeout(() => {
      // Sau khi login xong thì tự động đẩy dev sang dashboard (Route Groups)
      router.push("/about");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold dark:text-white">5. Navigation & Hooks</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Demo hai phương pháp chuyển trang cơ bản trong Next.js App Router.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* The Link Component */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-4">
          <h2 className="text-xl font-bold text-amber-600 dark:text-amber-500">1. Sử dụng thẻ <code>&lt;Link&gt;</code></h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dùng cho cấu trúc HTML thuần khi người dùng bấm trực tiếp vào một Hyperlink. Có hỗ trợ tự động prefetch ngầm nội dung trang ở client.
          </p>
          <Link 
            href="/demo" 
            className="flex justify-center items-center h-12 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium transition-colors mt-auto"
          >
            Quay lại Basic Route
          </Link>
        </div>

        {/* The useRouter Hook */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple-600 dark:text-purple-500">2. Sử dụng <code>useRouter()</code></h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dùng bên trong Event Handlers (ví dụ onClick) khi cần chạy 1 đoạn logic xong mới chuyển trang (Login xong mới qua Dashboard).
          </p>
          <button
            onClick={handleSimulateLogin}
            className="flex justify-center items-center h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors mt-auto"
          >
            Giả lập Login &rarr; /about
          </button>
        </div>
      </div>
    </div>
  );
}
