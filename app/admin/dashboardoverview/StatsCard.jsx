"use client";
import { motion } from "framer-motion";

export default function StatsCard({ icon, title, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition"
    >
      <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
    </motion.div>
  );
}
