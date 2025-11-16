"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ProductTable({ products, startEdit, handleDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {products.map((p) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg shadow mx-auto"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">${p.price}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startEdit(p)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
