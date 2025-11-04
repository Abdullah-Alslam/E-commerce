"use client";

import { motion } from "framer-motion";

export default function HeroSection({ title, product, link, fetchProducts }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-lg p-8 flex flex-col lg:flex-row items-center gap-6
                 bg-gradient-to-r from-red-600 to-red-200 dark:from-red-800 dark:to-gray-700
                 transition-colors duration-500"
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="/laptop.png"
          alt="Laptop"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-gray-100">
          {title || product} Collection
        </h2>
        <p className="text-white/90 dark:text-gray-300 text-sm sm:text-base">
          Browse curated {product} — updated and optimized for performance.
        </p>
        <button
          onClick={fetchProducts}
          className="mt-2 sm:mt-4 px-5 py-3 rounded-xl bg-white text-red-600 font-medium
                     hover:bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700
                     transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Refresh Products
        </button>
      </div>
    </motion.section>
  );
}
