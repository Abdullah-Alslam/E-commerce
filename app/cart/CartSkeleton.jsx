export default function CartSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow p-4 flex gap-4 items-center animate-pulse"
        >
          <div className="w-28 h-28 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1">
            <div className="h-6 w-3/5 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
            <div className="h-5 w-1/5 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
