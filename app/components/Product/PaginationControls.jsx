"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PaginationControls({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded font-medium 
                   bg-red-100 text-red-700 hover:bg-red-200 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
      >
        Prev
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.span
          key={page}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-gray-900 dark:text-white"
        >
          Page {page} of {totalPages}
        </motion.span>
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded font-medium 
             bg-gray-200 text-gray-900 hover:bg-gray-300 
             dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700
             disabled:opacity-50 disabled:cursor-not-allowed
             transition-colors duration-200"
      >
        Next
      </motion.button>
    </div>
  );
}
