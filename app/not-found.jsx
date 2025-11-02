// app/not-found.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";



export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      {/* Animated 404 Number */}
      <motion.h1
        className="text-8xl md:text-[10rem] font-extrabold text-red-600 dark:text-red-400 mb-6 select-none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>

      {/* Go Home Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="px-8 py-4 bg-red-600 text-white dark:bg-red-500 dark:text-gray-900 rounded-lg shadow-lg hover:bg-red-700 dark:hover:bg-red-400 transition-all duration-300 font-semibold"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Optional small animation or icon */}
      <motion.div
        className="mt-12 text-gray-400 dark:text-gray-500"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        💻🎮
      </motion.div>
    </div>
  );
}
