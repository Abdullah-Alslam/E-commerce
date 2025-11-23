"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

export default function CTASection() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center gap-6 p-8 my-12 text-white transition-transform shadow-xl bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl md:flex-row"
    >
      <div className="flex-1">
        <h4 className="mb-2 text-2xl font-bold">
          Try Our Best-Selling Digital Bundle
        </h4>

        <p className="mb-4 text-purple-100">
          30+ premium templates for developers & designers – instant download,
          lifetime updates.
        </p>

        <button
          disabled
          className="flex items-center gap-2 px-6 py-3 font-semibold text-blue-700 transition bg-white rounded-lg cursor-not-allowed hover:bg-gray-100"
        >
          <FiDownload /> Coming Soon
        </button>
      </div>

      <div className="relative w-full h-48 md:w-80 md:h-40">
        <Image
          src="/images/digital-workspace.jpg"
          alt="Digital bundle"
          fill
          className="object-cover rounded-lg shadow-md"
          placeholder="blur"
          blurDataURL="/images/digital-workspace.jpg"
        />
      </div>
    </motion.div>
  );
}
