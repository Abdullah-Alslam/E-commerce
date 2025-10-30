"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { LogOut, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState("");
  const [about, setAbout] = useState("");
  const router = useRouter();

  // Fetch settings from DB
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.get("/api/settings");
        setStoreName(res.data.storeName);
        setAbout(res.data.about);
        console.log(res);
      } catch (err) {
        toast.error("⚠️ Failed to load settings");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Handle save
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

  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.p
          className="mt-6 text-lg text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Loading settings...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex-1 p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />

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

        {/* Save Button */}
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
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </motion.button>
        </motion.div>

        {/* ✅ Version Info */}
        <motion.div
          className="text-center pt-6 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Project Version: <span className="font-semibold">v1.0.0</span></p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
