"use client";

import { useRef, useState } from "react";
import {
  FiPhone,
  FiMessageCircle,
  FiSend,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function ContactInfo() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    try {
      await emailjs.sendForm(
        "service_y7b134k",
        "template_r4l69sn",
        formRef.current,
        "gWjvmkr5gtTUaSo21"
      );

      toast.success("✅ Your message has been sent!", { autoClose: 3000 });
      formRef.current.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send message. Try again!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center py-10 px-4">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4 text-center"
      >
        Contact Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl text-center text-gray-600 dark:text-gray-400 mb-10"
      >
        Have a question, feedback, or a business inquiry? Fill out the form or
        reach us through the information below. We usually respond within 24
        hours.
      </motion.p>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl h-[350px] md:h-[450px] rounded-3xl shadow-2xl overflow-hidden mb-12 border-2 border-red-500"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13369.34354417689!2d36.29128!3d33.513807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6e16788e7d1%3A0x4f51d79b06fb1e8d!2sAleppo!5e0!3m2!1sen!2s!4v1636384590297!5m2!1sen!2s"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          className="rounded-3xl"
        ></iframe>
      </motion.div>

      {/* Form & Info */}
      <section className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 grid sm:grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Send a Message
          </h2>
          {["name", "email", "subject"].map((field) => (
            <motion.input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={
                field === "name"
                  ? "Your Name"
                  : field === "email"
                  ? "Your Email"
                  : "Subject"
              }
              whileFocus={{ scale: 1.02, borderColor: "#f87171" }}
              transition={{ duration: 0.2 }}
              className="border p-3 rounded-xl focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 outline-none"
              required={field !== "subject" ? true : false}
            />
          ))}
          <motion.textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            whileFocus={{ scale: 1.02, borderColor: "#f87171" }}
            transition={{ duration: 0.2 }}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 outline-none"
            required
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Message 🚀"
            )}
          </motion.button>
        </motion.form>

        {/* Contact Details */}
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
            Feel free to reach us by phone, WhatsApp, or email. We’re happy to
            answer any questions or schedule a meeting.
          </p>

          {/* Contact Links with Hover Motion */}
          {[
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
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                whileHover={{ scale: 1.05, color: "#f87171" }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-3 transition-all`}
              >
                <Icon className={`${item.color} text-xl`} />
                {item.text}
              </motion.a>
            );
          })}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 transition-all"
          >
            <FiMapPin className="text-purple-600 text-xl" /> Damascus, Syria
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 transition-all"
          >
            <FiClock className="text-orange-500 text-xl" /> Mon – Fri: 9:00 AM –
            6:00 PM
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
