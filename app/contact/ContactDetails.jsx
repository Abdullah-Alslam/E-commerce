"use client";

import {
  FiPhone,
  FiMessageCircle,
  FiSend,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactDetails() {
  const links = [
    {
      icon: FiPhone,
      text: "+963 991 566 773",
      href: "tel:+963991566773",
      color: "text-red-500",
    },
    {
      icon: FiMail,
      text: "abdullahxyzabc67@gmail.com",
      href: "mailto:abdullahxyzabc67@gmail.com",
      color: "text-red-500",
    },
    {
      icon: FiMessageCircle,
      text: "WhatsApp Chat",
      href: "https://wa.me/963991566773",
      color: "text-green-600",
    },
    {
      icon: FiSend,
      text: "Telegram",
      href: "https://t.me/abdullah1895328",
      color: "text-sky-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col space-y-6 text-gray-700 dark:text-gray-300"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Get in Touch
      </h2>

      <p className="text-gray-600 dark:text-gray-400">
        Feel free to reach us by phone, WhatsApp, or email. We're happy to help!
      </p>

      {links.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={i}
            href={item.href}
            target="_blank"
            whileHover={{ scale: 1.05, color: "#f87171" }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <Icon className={`${item.color} text-xl`} />
            {item.text}
          </motion.a>
        );
      })}

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3"
      >
        <FiMapPin className="text-purple-600 text-xl" /> Damascus, Syria
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3"
      >
        <FiClock className="text-orange-500 text-xl" /> Mon – Fri: 9:00 AM –
        6:00 PM
      </motion.div>
    </motion.div>
  );
}
