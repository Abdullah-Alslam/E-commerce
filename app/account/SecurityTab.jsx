"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function SecurityPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put("/api/users/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success(res.data.message || "Password changed successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/logout"); // الكوكي بتنمسح بالـ API
      toast.success(res.data.message || "Logged out successfully!");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Logout failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Security Settings
        </h1>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({ ...form, currentPassword: e.target.value })
              }
              required
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              required
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex justify-center items-center transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Change Password"}
          </motion.button>
        </form>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-4 rounded-lg font-medium flex justify-center items-center transition-all"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Logout"}
        </motion.button>
      </motion.div>
    </main>
  );
}
