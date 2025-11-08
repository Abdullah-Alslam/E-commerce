"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HotDeals() {
  return (
    <section className="relative py-20 px-4 sm:px-10 overflow-hidden bg-gradient-to-r from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg">
      {/* Background Decorative Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-200/40 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-300/30 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>

      <motion.div
        className="relative max-w-4xl mx-auto text-center z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-red-600 dark:text-red-400"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🔥 Hot Deals Just for You
        </motion.h2>

        <motion.p
          className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Don’t miss our limited-time offers on top tech products.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/hot-deals"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition"
          >
            View All Deals
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
