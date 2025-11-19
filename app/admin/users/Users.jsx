"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserTable from "./UserTable";
import EditUserModal from "./EditUserModal";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      console.log(res);

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

  async function handleUpdate(updatedUser) {
    try {
      await axios.put("/api/users", updatedUser);
      toast.success("✅ User updated successfully!");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update user");
      console.log(err);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading)
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="border-4 border-indigo-500 rounded-full shadow-lg w-14 h-14 border-t-transparent"
        />
        <motion.p
          className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Loading users...
        </motion.p>
      </motion.div>
    );

  return (
    <motion.div
      className="flex-1 min-h-screen p-6 transition-colors duration-500 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Manage Users
      </h2>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 transition border rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>

      <UserTable
        users={currentUsers}
        setEditUser={setEditUser}
        handleDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
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

      {editUser && (
        <EditUserModal
          editUser={editUser}
          setEditUser={setEditUser}
          handleUpdate={handleUpdate}
        />
      )}
    </motion.div>
  );
}
