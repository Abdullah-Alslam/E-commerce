"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BiLockAlt } from "react-icons/bi";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 via-red-200 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 md:p-20 flex flex-col items-center text-center max-w-lg"
      >
        <BiLockAlt className="text-red-500 dark:text-red-400 w-16 h-16 mb-6 animate-bounce" />
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          403
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Forbidden
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You don’t have permission to access this page. Please login or return home.
        </p>
        <Link
          href="/"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
