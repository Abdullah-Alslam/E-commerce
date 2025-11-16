"use client";

import { Phone, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactMethods() {
  const contacts = [
    {
      href: "tel:+963991566773",
      icon: <Phone />,
      label: "+963991566773",
      color: "text-blue-600",
      hover: "hover:text-blue-600",
    },
    {
      href: "https://wa.me/963991566773",
      icon: <MessageCircle />,
      label: "WhatsApp",
      color: "text-green-600",
      hover: "hover:text-green-600",
    },
    {
      href: "https://t.me/abdullah1895328",
      icon: <Send />,
      label: "Telegram",
      color: "text-sky-500",
      hover: "hover:text-sky-500",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 text-base sm:text-sm">
      {contacts.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.href}
          target="_blank"
          whileHover={{ x: 5 }}
          className={`flex items-center gap-3 text-gray-700 dark:text-gray-300 transition ${item.hover}`}
        >
          {item.icon} <span className={item.color}>{item.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
