"use client";
import { X } from "lucide-react";

export default function FiltersBar({
  search, setSearch,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  sortType, setSortType,
  resetFilters
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
      {/* Search */}
      <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-72"
        />
      </div>

      {/* Price + Sorting */}
      <div className="flex gap-4 items-center">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm w-32"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm w-32"
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          <X size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
