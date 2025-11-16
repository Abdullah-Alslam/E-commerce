"use client";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Send } from "lucide-react";

export default function ContactButtons() {
  const buttons = [
    {
      href: "tel:+963991566773",
      icon: <Phone size={18} />,
      label: "Call Us",
      bg: "bg-blue-600 hover:bg-blue-700",
    },
    {
      href: "https://wa.me/963991566773",
      icon: <MessageCircle size={18} />,
      label: "WhatsApp",
      bg: "bg-green-600 hover:bg-green-700",
    },
    {
      href: "https://t.me/abdullah1895328",
      icon: <Send size={18} />,
      label: "Telegram",
      bg: "bg-sky-500 hover:bg-sky-600",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl w-full"
    >
      {buttons.map((btn, i) => (
        <a
          key={i}
          href={btn.href}
          target="_blank"
          className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl transition transform hover:scale-105 ${btn.bg}`}
        >
          {btn.icon} {btn.label}
        </a>
      ))}
    </motion.section>
  );
}
