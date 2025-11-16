"use client";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.h1
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-bold text-red-600 mb-6 text-center"
    >
      Terms & Privacy
    </motion.h1>
  );
}
