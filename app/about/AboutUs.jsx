"use client";

import { useState, useEffect } from "react";
import {
  FiPhone,
  FiMessageCircle,
  FiSend,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function AboutUs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleContact = (type) => {
    toast.info(`${type} link clicked 🚀`, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardHover = { scale: 1.05, y: -5, transition: { duration: 0.3 } };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4">
      <ToastContainer />

      {/* Header */}
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
          We provide high-quality electronics at affordable prices. Our mission
          is to make online shopping simple, secure, and enjoyable for everyone.
        </p>
      </motion.section>

      {/* Highlights */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16"
      >
        {[
          { icon: <FiUsers />, label: "Experienced Team" },
          { icon: <FiShoppingCart />, label: "Quality Products" },
          { icon: <FiSend />, label: "Fast Delivery" },
        ].map((item, idx) => (
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

      {/* Team Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Abdullah Abdalsalam", role: "Frontend Developer" },
            { name: "John Doe", role: "Backend Developer" },
            { name: "Jane Smith", role: "UI/UX Designer" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={cardHover}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center cursor-pointer transition-all"
            >
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-4xl text-red-600 dark:text-red-400">
                👤
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Links */}
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
    </div>
  );
}
