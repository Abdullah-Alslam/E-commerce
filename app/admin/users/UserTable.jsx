"use client";
import { motion } from "framer-motion";

export default function UserTable({ users, setEditUser, handleDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl dark:bg-gray-800">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
        <thead className="text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Join Date</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="transition border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2 font-medium">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="flex justify-center gap-2 px-4 py-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditUser(user)}
                  className="px-3 py-1 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-500"
                >
                  Delete
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
