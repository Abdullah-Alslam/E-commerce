"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Search, DollarSign, BarChart3 } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  const FiltersContent = (
    <div className="flex flex-col gap-5 p-4 text-sm">
      {/* Search */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          Search
        </label>
        <div className="relative">
          <Search
            className="absolute text-blue-400 -translate-y-1/2 left-3 top-1/2 dark:text-blue-300"
            size={16}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 pr-3 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white border border-gray-300 shadow-sm pl-9 rounded-xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:shadow-md"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          Price Range
        </label>
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <DollarSign
              className="absolute text-green-500 -translate-y-1/2 left-2 top-1/2"
              size={16}
            />
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full py-2 pr-2 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white border border-gray-300 shadow-sm pl-7 rounded-xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 hover:shadow-md"
            />
          </div>

          <div className="relative w-full">
            <DollarSign
              className="absolute text-red-500 -translate-y-1/2 left-2 top-1/2"
              size={16}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full py-2 pr-2 text-gray-900 placeholder-gray-400 transition-all duration-200 bg-white border border-gray-300 shadow-sm pl-7 rounded-xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 hover:shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          Sort By
        </label>
        <div className="relative">
          <BarChart3
            className="absolute text-indigo-500 -translate-y-1/2 left-2 top-1/2"
            size={16}
          />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full py-2 pr-3 text-gray-900 transition-all duration-200 bg-white border border-gray-300 shadow-sm appearance-none pl-7 rounded-xl dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 hover:shadow-md"
          >
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="my-2 border-t border-gray-300 dark:border-gray-700"></div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-gray-900 transition-all duration-200 shadow-sm rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100 hover:from-red-400 hover:to-red-500 hover:text-white active:scale-95"
      >
        <X size={16} /> Reset Filters
      </button>
    </div>
  );

  return (
    <>
      {/* 📱 mobile button */}
      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-500 shadow rounded-xl hover:bg-blue-600"
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* backgroud */}
            <motion.div
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

            {/* sidebare */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative z-50 h-full p-5 bg-white shadow-2xl dark:bg-gray-900 w-72"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute text-gray-600 top-3 right-3 dark:text-gray-300 hover:text-red-500"
              >
                <X />
              </button>
              {FiltersContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💻 desctop mode */}
      <div className="hidden p-4 shadow-md md:block bg-gray-50 dark:bg-gray-900 rounded-2xl">
        {FiltersContent}
      </div>
    </>
  );
}
