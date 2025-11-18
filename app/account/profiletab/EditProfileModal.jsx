"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function EditProfileModal({
  show,
  editUser,
  setEditUser,
  onCancel,
  onSave,
  actionLoading,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md p-6 bg-white shadow-2xl dark:bg-gray-900 md:p-8 rounded-3xl"
          >
            <h3 className="mb-4 text-2xl font-bold text-red-700 dark:text-red-400">
              Edit Profile
            </h3>

            <form onSubmit={onSave} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 text-gray-900 border border-red-300 peer rounded-2xl dark:border-red-500 bg-red-50 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-red-500"
                />
                <label className="absolute text-sm text-gray-400 left-4 top-1 peer-focus:text-red-500 peer-focus:-top-2">
                  Username
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 text-gray-900 border border-red-300 peer rounded-2xl dark:border-red-500 bg-red-50 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-red-500"
                />
                <label className="absolute text-sm text-gray-400 left-4 top-1 peer-focus:text-red-500 peer-focus:-top-2">
                  Email
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <motion.button
                  type="button"
                  onClick={onCancel}
                  whileHover={{ scale: 1.03 }}
                  className="px-5 py-2 font-semibold text-red-600 border border-red-400 rounded-2xl dark:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={actionLoading}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 font-semibold text-white bg-red-600 rounded-2xl hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Save"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
