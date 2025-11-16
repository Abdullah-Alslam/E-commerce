"use client";

import { motion } from "framer-motion";
import { FiClock, FiUser } from "react-icons/fi";
import CopyButton from "./CopyButton";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-red-600 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
        >
          Digital Trends 2025 – How Digital Products Are Changing the Game
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-purple-200 mb-6"
        >
          A deep dive into the future of digital products, online marketplaces,
          and tools for developers and creators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center gap-6 mt-6 text-sm text-purple-300 flex-wrap"
        >
          <span className="flex items-center gap-2">
            <FiUser /> Abdullah Abdalsalam
          </span>

          <span className="flex items-center gap-2">
            <FiClock /> Sep 27, 2025
          </span>

          <CopyButton />
        </motion.div>
      </div>
    </section>
  );
}
