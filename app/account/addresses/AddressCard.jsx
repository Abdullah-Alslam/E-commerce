"use client";

import { motion } from "framer-motion";

export default function AddressCard({ addr, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
      className="flex flex-col items-start justify-between gap-4 p-4 transition shadow sm:p-6 bg-red-50 dark:bg-red-900 rounded-xl sm:flex-row sm:items-center hover:shadow-lg"
    >
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {addr.name}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          📞 {addr.phone}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          🏠 {addr.street}
        </p>
      </div>

      <div className="flex gap-2 mt-3 sm:mt-0">
        <button
          className="px-4 py-2 text-white transition bg-red-600 rounded-lg shadow-sm hover:bg-red-700"
          onClick={() => onEdit(addr)}
        >
          Edit
        </button>

        <button
          className="px-4 py-2 text-gray-800 transition bg-gray-300 rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={() => onDelete(addr.id)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
