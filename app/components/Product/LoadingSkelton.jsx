"use client";

export default function LoadingSkeleton() {
  const items = Array.from({ length: 8 });

  return (
    <main className="min-h-screen bg-red-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse mb-6">
          <div className="h-8 bg-red-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-red-100 rounded w-1/4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-red-50 dark:border-gray-700"
            >
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="mt-4 h-10 bg-red-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
