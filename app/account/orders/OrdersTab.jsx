"use client";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrdersTab() {
  const handleClick = () => {
    toast.info("⚠️ Orders functionality is currently unavailable!");
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md text-center">
      {/* Animated SVG */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-48 h-48 mb-6"
        initial={{ y: -20, rotate: -5, opacity: 0 }}
        animate={{ y: 0, rotate: 5, opacity: 1 }}
        transition={{ yoyo: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <rect x="8" y="20" width="48" height="32" rx="4" fill="#ef4444" />
        <line x1="8" y1="20" x2="56" y2="20" stroke="#fff" strokeWidth="2" />
        <line x1="8" y1="40" x2="56" y2="40" stroke="#fff" strokeWidth="2" />
      </motion.svg>

      {/* Title */}
      <motion.h2
        className="mb-2 text-2xl font-bold text-red-600 md:text-3xl dark:text-red-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Orders Unavailable
      </motion.h2>

      {/* Description */}
      <motion.p
        className="max-w-md mb-6 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        You currently have no orders. This feature is disabled for this demo,
        but you can check back later when the system is fully functional.
      </motion.p>

      {/* Action Button */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 text-white transition bg-red-600 rounded-lg shadow dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600"
      >
        Notify Me
      </motion.button>
    </div>
  );
}
