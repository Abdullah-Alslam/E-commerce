"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      const res = await axios.put(
        "/api/users/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <ToastContainer position="bottom-right" autoClose={2500} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white border-2 border-red-500 shadow-2xl dark:bg-gray-800 rounded-3xl"
      >
        <h1 className="mb-6 text-3xl font-bold text-center text-red-600 dark:text-red-400">
          Security Settings
        </h1>

        <form onSubmit={handleChangePassword} className="space-y-5">
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field, i) => (
              <motion.div
                key={field}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <label className="block mb-1 font-medium text-gray-700 capitalize dark:text-gray-300">
                  {field === "currentPassword"
                    ? "Current Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password"}
                </label>
                <motion.input
                  type="password"
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  required
                  whileFocus={{
                    scale: 1.02,
                    borderColor: "#EF4444",
                    boxShadow: "0 0 0 3px rgba(239,68,68,0.3)",
                  }}
                  className="w-full p-3 transition-all border-2 border-gray-300 rounded-xl dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"
                />
              </motion.div>
            )
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full py-3 font-semibold text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            {loading ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              "Change Password"
            )}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
