export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4"></div>
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2"></div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mt-4 space-y-4">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/4 mb-4"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4"></div>
      </div>
      <p className="text-zinc-500 italic mt-2 text-sm">ang tải dữ liệu (Chậm 2s giả lập)...</p>
    </div>
  );
}
