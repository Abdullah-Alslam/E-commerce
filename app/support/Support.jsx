"use client";

import { Phone, MessageCircle, Send, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function Support() {
  const [fakeLoading, setFakeLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/support", formData);
      toast.success(
        "✅ Your request has been submitted. Our team will contact you soon!"
      );
      setFormData({ name: "", email: "", issue: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fakeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 md:px-12 flex flex-col items-center space-y-10"
    >
      {/* Title */}
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

      {/* Form & Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {["name", "email", "issue"].map((field, idx) => (
            <input
              key={idx}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={
                field === "issue"
                  ? "Subject / Issue"
                  : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`
              }
              value={formData[field]}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base bg-white dark:bg-gray-800 dark:border-gray-700"
              required
            />
          ))}

          <textarea
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
            className="border w-full p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base bg-white dark:bg-gray-800 dark:border-gray-700"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Submit Request 🚀"
            )}
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-base sm:text-sm bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <motion.h2
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center md:text-left"
          >
            Other Ways to Reach Us
          </motion.h2>

          {[
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
          ].map((item, idx) => (
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

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Clock className="text-orange-500" />{" "}
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Average response time:{" "}
            <span className="text-green-600 font-semibold">1 - 2 hours</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
