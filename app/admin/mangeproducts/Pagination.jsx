"use client";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-center mt-6 flex-wrap gap-2">
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentPage(idx + 1)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            currentPage === idx + 1
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
