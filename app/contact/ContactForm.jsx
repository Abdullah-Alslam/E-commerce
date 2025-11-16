"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function ContactForm() {
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
          required={field !== "subject"}
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
        className={`bg-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-all duration-200 ${
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
  );
}
