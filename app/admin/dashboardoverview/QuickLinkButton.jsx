"use client";
import { motion } from "framer-motion";

export default function QuickLinkButton({ icon, title, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={title}
      className="flex items-center gap-2 bg-indigo-500 dark:bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-600 dark:hover:bg-indigo-700 transition"
    >
      {icon}
      <span>{title}</span>
    </motion.button>
  );
}
