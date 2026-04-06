"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Lỗi từ Posts Demo:", error);
  }, [error]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-12 bg-red-50 dark:bg-red-950/20 border-2 border-dashed border-red-300 dark:border-red-900 rounded-2xl text-center">
      <div className="text-5xl">⚠️</div>
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-500">Ôi hỏng! Đã xảy ra lỗi.</h2>
      <p className="text-red-700 dark:text-red-400 max-w-md">
        {error.message || "Lỗi không xác định."}
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
        >
          Thử lại
        </button>
        <Link 
          href="/demo/posts" 
          className="bg-white border text-red-600 hover:bg-zinc-50 px-6 py-2 rounded-full transition-colors"
        >
          Bỏ mode Crash
        </Link>
      </div>
    </div>
  );
}
