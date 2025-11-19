"use client";

import { motion } from "framer-motion";

export default function HeroSection({ title, product, link, fetchProducts }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center w-full gap-6 p-8 transition-colors duration-500 rounded-lg lg:flex-row bg-gradient-to-r from-red-600 to-red-200 dark:from-red-800 dark:to-gray-700"
    >
      {/* Image */}
      <div className="flex justify-center w-full lg:w-1/2">
        <img
          src={link}
          alt="Laptop"
          className="h-auto max-w-full rounded-lg shadow-lg"
          height={400}
          width={400}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col w-full gap-4 text-center lg:w-1/2 lg:text-left">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl dark:text-gray-100">
          {title || product} Collection
        </h2>
        <p className="text-sm text-white/90 dark:text-gray-300 sm:text-base">
          Browse curated {product} — updated and optimized for performance.
        </p>
        <button
          onClick={fetchProducts}
          className="px-5 py-3 mt-2 font-medium text-red-600 transition-all duration-300 bg-white shadow-sm sm:mt-4 rounded-xl hover:bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700 hover:shadow-md"
        >
          Refresh Products
        </button>
      </div>
    </motion.section>
  );
}
