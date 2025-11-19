"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function SettingsForm({ initialStoreName, initialAbout }) {
  const [storeName, setStoreName] = useState(initialStoreName || "");
  const [about, setAbout] = useState(initialAbout || "");
  const router = useRouter();

  // Save settings to API
  async function handleSave() {
    try {
      const res = await axios.put("/api/settings", { storeName, about });
      toast.success("✅ Settings saved successfully!");
      console.log(res);
    } catch (err) {
      toast.error("❌ Failed to save settings");
      console.log(err);
    }
  }

  // Logout function
  function handleLogout() {
    localStorage.clear();
    router.push("/auth/login");
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 space-y-8"
      initial={{ scale: 0.97 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ⚙️ Settings
      </motion.h1>

      {/* Store Name */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Store Name
        </h2>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your store name"
        />
      </motion.div>

      {/* About */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          About Store
        </h2>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full h-32 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
          placeholder="Write about your store..."
        />
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex justify-center gap-4 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          <Save size={18} /> Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          <LogOut size={18} /> Logout
        </motion.button>
      </motion.div>

      {/* Version Info */}
      <motion.div
        className="text-center pt-6 text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>
          Project Version: <span className="font-semibold">v1.0.0</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
