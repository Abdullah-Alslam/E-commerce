"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({ text = "Loading..." }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-6 text-lg text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
