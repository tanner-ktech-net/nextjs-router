import Link from "next/link";

// Fake API Call 
async function getPosts(shouldCrash: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldCrash) {
        reject(new Error("Lỗi server giả lập: Không thể kết nối đến Database!"));
      } else {
        resolve([
          { id: 1, title: "Next.js 15 ra mắt có gì mới?" },
          { id: 2, title: "Sự khác biệt giữa React Server Components và Client Components" },
          { id: 3, title: "Ứng dụng Route Groups vào dự án lớn" },
        ]);
      }
    }, 2000); // Trì hoãn 2 giây để demo "loading.tsx"
  });
}

// Next 15 searchParams resolution
export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ crash?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const shouldCrash = resolvedSearchParams.crash === "true";
  
  // Await the faux request 
  const posts: any = await getPosts(shouldCrash);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold dark:text-white">4. Loading & Error Handling</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Trang này đã cố tình sử dụng <code>setTimeout</code> chậm 2 giây khi render trên Server để hiện file <code>loading.tsx</code>. <br/>
        Nhấn vào nút bên dưới để ép trang vào luồng lỗi và kích hoạt <code>error.tsx</code>.
      </p>

      <div className="mt-2">
        <Link 
          href="/demo/posts?crash=true" 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          💥 Click để giả lập Lỗi (Crash)
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mt-4">
        <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-500">Danh sách bài viết tải thành công:</h2>
        <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 space-y-2">
          {posts.map((post: any) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
