"use client";
import { motion } from "framer-motion";

export default function LoadingDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <motion.div
        className="w-16 h-16 rounded-full border-[5px] border-indigo-500 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      ></motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 text-lg font-medium text-gray-700 dark:text-gray-300"
      >
        Loading dashboard data...
      </motion.p>
    </div>
  );
}
