"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users 😢");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/users?id=${id}`);
      toast.success("🗑️ User deleted successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
      console.log(err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axios.put("/api/users", {
        id: editUser._id,
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
      });
      toast.success("✅ User updated successfully!");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update user");
      console.log(err);
    }
  }

  // Filter users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Loading Screen
  if (loading)
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full shadow-lg"
        />
        <motion.p
          className="mt-6 text-lg text-gray-700 dark:text-gray-300 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Loading users...
        </motion.p>
      </motion.div>
    );

  return (
    <motion.div
      className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Manage Users
      </h2>

      {/* Search Input */}
      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />
      </div>

      {/* Modal for Editing User */}
      {editUser && (
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 max-w-4xl w-full relative"
          >
            <button
              onClick={() => setEditUser(null)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Edit User
            </h3>

            <form
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
              onSubmit={handleUpdate}
            >
              <input
                type="text"
                placeholder="Name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Join Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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
                <td className="px-4 py-2 flex justify-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditUser(user)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
                  >
                    Delete
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                currentPage === idx + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
