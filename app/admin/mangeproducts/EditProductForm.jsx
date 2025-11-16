"use client";

import { motion } from "framer-motion";

export default function EditProductForm({
  form,
  setForm,
  handleUpdate,
  cancelEdit,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow max-w-md mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Edit Product
      </h3>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
          >
            Save
          </button>
          <button
            onClick={cancelEdit}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
