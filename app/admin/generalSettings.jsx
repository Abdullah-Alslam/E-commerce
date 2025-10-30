"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch store data from MongoDB
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get("/api/settings");
        setStoreName(data.storeName || "");
        setAbout(data.about || "");
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Save settings
  const handleSave = async () => {
    try {
      await axios.post("/api/settings", { storeName, about });
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  // Log out
  const handleLogout = () => {
    // clear token or session logic
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading settings...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Settings ⚙️
      </motion.h1>

      <motion.div
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* Store Name */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            Store Name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter store name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* About */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            About Store
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write a short description..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.button
            onClick={handleSave}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>

          <motion.button
            onClick={handleLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={18} />
            Log out
          </motion.button>
        </div>

        {/* Version Info */}
        <motion.div
          className="text-center text-gray-500 dark:text-gray-400 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>
            Project Version: <span className="font-semibold">v1.0.0</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
