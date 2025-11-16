"use client";

import { motion } from "framer-motion";

export default function AboutHeader() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-center mb-14"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 dark:text-red-400 mb-4">
        About Our Store
      </h1>
      <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        We provide high-quality electronics at affordable prices. Our mission is
        to make online shopping simple, secure, and enjoyable for everyone.
      </p>
    </motion.section>
  );
}
