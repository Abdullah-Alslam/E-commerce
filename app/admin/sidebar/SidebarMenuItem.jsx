"use client";
import { motion } from "framer-motion";

export default function SidebarMenuItem({ title, icon, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 p-3 transition-colors duration-200 bg-gray-100 shadow-sm rounded-xl dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {icon}
      <span className="font-medium">{title}</span>
    </motion.button>
  );
}
