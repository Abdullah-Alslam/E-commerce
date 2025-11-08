"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background*/}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 dark:from-red-800 dark:to-black"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/*INFO*/}
      <motion.div
        className="relative z-10 text-center text-white px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Upgrade Your Tech Today
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Discover the latest gadgets, unbeatable deals, and more.
        </p>
        <Link
          href="/hot-deals"
          className="bg-white text-red-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition"
        >
          Explore Hot Deals
        </Link>
      </motion.div>
    </section>
  );
}
