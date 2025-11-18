"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AddressModal({
  show,
  form,
  setForm,
  editAddress,
  onCancel,
  onSubmit,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="w-full max-w-md p-6 bg-white shadow-xl dark:bg-gray-800 sm:p-8 rounded-2xl"
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {editAddress ? "Edit Address" : "Add New Address"}
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 text-gray-900 transition bg-gray-100 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 text-gray-900 transition bg-gray-100 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Street Address"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className="w-full px-4 py-2 text-gray-900 transition bg-gray-100 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-gray-700 transition border rounded-lg dark:border-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-white transition bg-red-600 rounded-lg shadow-md hover:bg-red-700"
                >
                  {editAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
