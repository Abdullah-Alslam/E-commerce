"use client";
import { motion } from "framer-motion";

export default function EditUserModal({ editUser, setEditUser, handleUpdate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="relative w-full max-w-4xl p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl md:p-10"
      >
        <button
          onClick={() => setEditUser(null)}
          className="absolute text-gray-600 top-4 right-4 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          ✖
        </button>

        <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Edit User
        </h3>

        <form
          className="grid items-end grid-cols-1 gap-3 md:grid-cols-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate({
              id: editUser._id,
              name: editUser.name,
              email: editUser.email,
              role: editUser.role,
            });
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            className="p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            className="p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
          <select
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            className="p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
