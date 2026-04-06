import Link from "next/link";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Dummy DB fetch
  const getProduct = (id: string) => {
    const products: Record<string, {name: string, desc: string}> = {
      "1": { name: "Điện thoại iPhone 16 Pro", desc: "Sản phẩm công nghệ mới nhất của Apple với chip A18 Pro." },
      "2": { name: "Laptop MacBook Air M3", desc: "Thiết kế siêu mỏng nhẹ, pin trâu, đủ sức cân mọi tác vụ văn phòng." },
      "3": { name: "Tai nghe AirPods Pro", desc: "Chống ồn chủ động xuất sắc, âm thanh không gian." },
    };
    return products[id];
  };

  const product = getProduct(id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white">Chi tiết Sản phẩm #{id}</h1>
        <Link 
          href="/demo/products"
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          &larr; Quay lại danh sách
        </Link>
      </div>

      {product ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mt-4">
          <h2 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">{product.name}</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">{product.desc}</p>
        </div>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl border border-red-200 dark:border-red-800">
          Sản phẩm không tồn tại!
        </div>
      )}
    </div>
  );
}
