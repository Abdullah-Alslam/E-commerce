"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/users", form);
      toast.success("✅ User added successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (err) {
      console.error("❌ Error adding user:", err);
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="min-h-screen flex justify-end items-center bg-gray-100 dark:bg-gray-900 px-4 md:px-10 lg:px-20 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 w-full max-w-6xl mr-6"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center md:text-left">
          Add New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-100"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Submit Button (Full Width) */}
          <div className="col-span-1 md:col-span-2">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Adding User...
                </>
              ) : (
                "Add User"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
