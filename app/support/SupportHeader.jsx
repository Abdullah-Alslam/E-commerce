"use client";

import { motion } from "framer-motion";

export default function SupportHeader() {
  return (
    <>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 text-center"
      >
        Support Center
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-10 text-sm md:text-base px-2"
      >
        Need help? Our support team is here 24/7 to assist you with your issues
        and inquiries. Fill out the form below or contact us directly.
      </motion.p>
    </>
  );
}
