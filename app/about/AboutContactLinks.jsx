"use client";

import { motion } from "framer-motion";
import { FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";

export default function AboutContactLinks({ handleContact }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-6 justify-center"
    >
      <motion.a
        whileHover={{ scale: 1.05 }}
        href="tel:+963991566773"
        onClick={() => handleContact("Call")}
        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition"
      >
        <FiPhone /> Call Us
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.05 }}
        href="https://wa.me/963991566773"
        target="_blank"
        onClick={() => handleContact("WhatsApp")}
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
      >
        <FiMessageCircle /> WhatsApp
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.05 }}
        href="https://t.me/abdullah1895328"
        target="_blank"
        onClick={() => handleContact("Telegram")}
        className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-600 transition"
      >
        <FiSend /> Telegram
      </motion.a>
    </motion.section>
  );
}
