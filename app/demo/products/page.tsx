import Link from "next/link";

export default function ProductsPage() {
  const products = [
    { id: "1", name: "Điện thoại iPhone 16 Pro" },
    { id: "2", name: "Laptop MacBook Air M3" },
    { id: "3", name: "Tai nghe AirPods Pro" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold dark:text-white">2. Dynamic Routes (Danh sách SP)</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Trang này lấy dữ liệu danh sách sản phẩm. Hãy bấm vào một sản phẩm để sang trang chi tiết sử dụng tham số động <code>[id]</code>.
      </p>

      <div className="grid gap-4 mt-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/demo/products/${product.id}`}
            className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 transition-colors flex justify-between items-center"
          >
            <span className="font-medium dark:text-white">{product.name}</span>
            <span className="text-zinc-400 text-sm text-blue-500">Xem chi tiết &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
