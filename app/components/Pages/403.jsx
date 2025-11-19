"use client";

import { motion } from "framer-motion";

export default function ForbiddenPage() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-red-50 dark:bg-gray-900">
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bg-red-200 rounded-full w-96 h-96 dark:bg-red-700 opacity-20 -z-10"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bg-red-300 rounded-full w-72 h-72 dark:bg-red-600 opacity-20 top-1/3 left-1/4 -z-10"
      />

      {/* 403 Number */}
      <motion.h1
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
        className="text-[8rem] font-extrabold text-red-600 dark:text-red-400 mb-4 select-none"
      >
        403
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-4 text-3xl font-bold text-center text-gray-800 dark:text-gray-100"
      >
        Forbidden
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-lg px-4 mb-8 text-center text-gray-600 dark:text-gray-300"
      >
        You do not have the required permissions to view this page. Please
        contact the administrator if you believe this is a mistake.
      </motion.p>

      {/* Home button */}
      <motion.a
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          delay: 0.7,
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
        href="/"
        className="px-10 py-3 font-semibold text-white transition bg-red-600 shadow-lg rounded-xl hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
      >
        Go Home
      </motion.a>
    </main>
  );
}
