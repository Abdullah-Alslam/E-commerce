"use client";

import { motion } from "framer-motion";
import { FiUsers, FiShoppingCart, FiSend } from "react-icons/fi";

export default function AboutHighlights() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardHover = { scale: 1.05, y: -5, transition: { duration: 0.3 } };

  const items = [
    { icon: <FiUsers />, label: "Experienced Team" },
    { icon: <FiShoppingCart />, label: "Quality Products" },
    { icon: <FiSend />, label: "Fast Delivery" },
  ];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16"
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={cardHover}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md text-center cursor-pointer transition-all"
        >
          <div className="text-5xl text-red-600 dark:text-red-400 mb-3">
            {item.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {item.label}
          </h3>
        </motion.div>
      ))}
    </motion.section>
  );
}
