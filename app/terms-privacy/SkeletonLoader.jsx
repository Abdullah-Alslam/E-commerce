export default function SkeletonLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="space-y-4 w-full max-w-xl px-6">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
