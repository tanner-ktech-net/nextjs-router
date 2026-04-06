import Link from "next/link";
import React from "react";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar Navigation for Demos */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6">
        <div className="font-bold text-xl dark:text-white">
          <Link href="/">⏪ Về trang chủ</Link>
        </div>
        <nav className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm text-zinc-500 uppercase tracking-wide">
            Danh sách Demo
          </h3>
          <NavLink href="/demo" label="1. Basic Route" />
          <NavLink href="/demo/products" label="2. Dynamic Routes" />
          <NavLink href="/about" label="3. Route Groups (/about)" />
          <NavLink href="/demo/posts" label="4. Loading & Error" />
          <NavLink href="/demo/navigation" label="5. Navigation" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 sm:p-12">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium p-2 -mx-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
    >
      {label}
    </Link>
  );
}
