import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 p-8 sm:p-20">
      <main className="flex flex-col w-full max-w-4xl gap-8 relative">
        <header className="flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-4">
            Next.js App Router Demos
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Các ví dụ trực quan đi kèm với báo cáo Next.js App Router trong file README.md. Hãy click vào các liên kết bên dưới để xem từng khái niệm.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <DemoCard
            title="1. Basic Routing & Layout"
            description="Tìm hiểu cơ chế nested layouts và routing cơ bản thông qua thư mục /demo"
            href="/demo"
          />
          <DemoCard
            title="2. Dynamic Routes"
            description="Thử nghiệm truyền tham số động trên URL với thư mục [id]."
            href="/demo/products"
          />
          <DemoCard
            title="3. Route Groups"
            description="Tổ chức thư mục code bằng (marketing) nhưng không chèn vào URL path."
            href="/about"
          />
          <DemoCard
            title="4. Loading & Error UI"
            description="Xử lý giao diện chờ (loading) và bắt lỗi (error boundaries) một cách thanh lịch."
            href="/demo/posts"
          />
          <DemoCard
            title="5. Navigation Hooks"
            description="Phân biệt sức mạnh của thẻ Link và hook useRouter() để chuyển trang."
            href="/demo/navigation"
          />
        </div>
      </main>
    </div>
  );
}

function DemoCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 p-6 rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-lg hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title} &rarr;
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
