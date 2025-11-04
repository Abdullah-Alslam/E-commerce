"use client";
import { X, Search, DollarSign, BarChart3 } from "lucide-react";

export default function FiltersBar({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortType,
  setSortType,
  resetFilters,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 flex-wrap">
      {/* Search */}
      <div className="relative w-full md:w-64">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
          size={16}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-2xl border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-800 shadow-sm
               text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
               hover:shadow-md hover:scale-[1.02]
               transition-all duration-200"
        />
      </div>

      {/* Min Price */}
      <div className="relative w-24">
        <DollarSign
          className="absolute left-2 top-1/2 -translate-y-1/2 text-green-500 dark:text-green-400"
          size={16}
        />
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full pl-7 pr-2 py-2 rounded-2xl border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-800 shadow-sm
               text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm
               focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
               hover:shadow-md hover:scale-[1.02]
               transition-all duration-200"
        />
      </div>

      {/* Max Price */}
      <div className="relative w-24">
        <DollarSign
          className="absolute left-2 top-1/2 -translate-y-1/2 text-red-500 dark:text-red-400"
          size={16}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full pl-7 pr-2 py-2 rounded-2xl border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-800 shadow-sm
               text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm
               focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400
               hover:shadow-md hover:scale-[1.02]
               transition-all duration-200"
        />
      </div>

      {/* Sort */}
      <div className="relative w-28">
        <BarChart3
          className="absolute left-2 top-1/2 -translate-y-1/2 text-indigo-500 dark:text-indigo-400"
          size={16}
        />
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="w-full pl-7 pr-3 py-2 rounded-2xl border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-800 shadow-sm
               text-gray-900 dark:text-gray-100 text-sm appearance-none
               focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
               hover:shadow-md hover:scale-[1.02]
               transition-all duration-200"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="flex items-center gap-1 px-3 py-2 rounded-2xl
             bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800
             text-gray-900 dark:text-gray-100 font-medium text-sm shadow-sm
             hover:from-red-400 hover:to-red-500 hover:text-white hover:shadow-md hover:scale-[1.05]
             active:scale-95
             transition-all duration-200"
      >
        <X size={16} /> Reset
      </button>
    </div>
  );
}
