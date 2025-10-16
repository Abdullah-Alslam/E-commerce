"use client";
import { X, Search, DollarSign, BarChart3 } from "lucide-react";

export default function FiltersBar({
  search, setSearch,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  sortType, setSortType,
  resetFilters
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 
                     bg-gradient-to-r from-white to-blue-50 shadow-sm
                     text-gray-700 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                     hover:shadow-md hover:scale-[1.02]
                     transition-all duration-200"
        />
      </div>

      {/* Price + Sorting */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-32 pl-9 pr-3 py-3 rounded-2xl border border-gray-200 
                       bg-gradient-to-r from-white to-green-50 shadow-sm
                       text-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
                       hover:shadow-md hover:scale-[1.02]
                       transition-all duration-200"
          />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-32 pl-9 pr-3 py-3 rounded-2xl border border-gray-200 
                       bg-gradient-to-r from-white to-red-50 shadow-sm
                       text-gray-700 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400
                       hover:shadow-md hover:scale-[1.02]
                       transition-all duration-200"
          />
        </div>

        <div className="relative">
          <BarChart3 className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="pl-9 pr-4 py-3 rounded-2xl border border-gray-200 
                       bg-gradient-to-r from-white to-indigo-50 shadow-sm
                       text-gray-700 appearance-none
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

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-5 py-3 rounded-2xl 
                     bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium shadow-sm
                     hover:from-red-400 hover:to-red-500 hover:text-white hover:shadow-md hover:scale-[1.05]
                     active:scale-95
                     transition-all duration-200"
        >
          <X size={18} /> Reset
        </button>
      </div>
    </div>
  );
}
