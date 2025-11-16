"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

export default function CTASection() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-2xl my-12 flex flex-col md:flex-row items-center gap-6 shadow-xl transition-transform"
    >
      <div className="flex-1">
        <h4 className="text-2xl font-bold mb-2">
          Try Our Best-Selling Digital Bundle
        </h4>

        <p className="text-purple-100 mb-4">
          30+ premium templates for developers & designers – instant download,
          lifetime updates.
        </p>

        <button
          disabled
          className="bg-white text-blue-700 px-6 py-3 rounded-lg cursor-not-allowed font-semibold hover:bg-gray-100 transition flex items-center gap-2"
        >
          <FiDownload /> Coming Soon
        </button>
      </div>

      <div className="relative w-full md:w-80 h-48 md:h-40">
        <Image
          src="/images/digital-workspace.jpg"
          alt="Digital bundle"
          fill
          className="rounded-lg object-cover shadow-md"
          placeholder="blur"
          blurDataURL="/images/digital-workspace.jpg"
        />
      </div>
    </motion.div>
  );
}
