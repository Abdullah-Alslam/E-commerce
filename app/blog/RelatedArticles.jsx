"use client";

import { motion } from "framer-motion";

export default function RelatedArticles() {
  const data = [
    "How to Build a Next.js Digital Store",
    "Monetizing Digital Templates in 2025",
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {data.map((title, idx) => (
        <motion.a
          key={idx}
          href="#"
          whileHover={{ scale: 1.03 }}
          className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition block"
        >
          <h4 className="font-semibold mb-2">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Step-by-step guide & tips.
          </p>
        </motion.a>
      ))}
    </div>
  );
}
