"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./LoadingScreen";
import SettingsForm from "./SettingsForm";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.get("/api/settings");
        setStoreName(res.data.storeName);
        setAbout(res.data.about);
      } catch (err) {
        toast.error("⚠️ Failed to load settings");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  if (loading) return <LoadingScreen text="Loading settings..." />;

  return (
    <motion.div
      className="flex-1 min-h-screen p-6 transition-colors duration-500 bg-gray-100 md:p-10 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />
      <SettingsForm initialStoreName={storeName} initialAbout={about} />
    </motion.div>
  );
}
