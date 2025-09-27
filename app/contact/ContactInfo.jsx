"use client";

import { useState } from "react";
import {
  FiPhone,
  FiMessageCircle,
  FiSend,
  FiMail,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("❌ Please enter a valid email address.", { autoClose: 3000 });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/contact", formData);
      toast.success("✅ Your message has been sent!", { autoClose: 3000 });
      console.log(res);
      setFormData({ name: "", email: "", subject: "", message: "" });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Try again!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4 text-center">
        Contact Us
      </h1>
      <p className="max-w-2xl text-center text-gray-600 mb-10">
        Have a question, feedback, or a business inquiry? Fill out the form or
        reach us through the information below. We usually respond within 24
        hours.
      </p>

      {/* Map */}
      <div className="w-full max-w-6xl h-[350px] md:h-[450px] rounded-2xl shadow-lg overflow-hidden mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13369.34354417689!2d36.29128!3d33.513807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6e16788e7d1%3A0x4f51d79b06fb1e8d!2sAleppo!5e0!3m2!1sen!2s!4v1636384590297!5m2!1sen!2s"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Form & Info */}
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 grid sm:grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Send a Message</h2>
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border p-3 h-40 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* ✅ Improved Button */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            aria-label={loading ? "Sending your message" : "Send message"}
            className={`bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md 
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 
              focus:ring-offset-2 transition-colors duration-200
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Message 🚀"
            )}
          </button>
        </form>

        {/* Contact Details */}
        <div className="flex flex-col space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            Feel free to reach us by phone, WhatsApp, or email. We’re happy to
            answer any questions or schedule a meeting.
          </p>

          <a
            href="tel:+963991566773"
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <FiPhone className="text-blue-600 text-xl" /> +963 991 566 773
          </a>

          <a
            href="mailto:abdullahxyzabc67@gmail.com"
            className="flex items-center gap-3 hover:text-red-500 transition"
          >
            <FiMail className="text-red-500 text-xl" /> abdullahxyzabc67@gmail.com
          </a>

          <a
            href="https://wa.me/963991566773"
            target="_blank"
            className="flex items-center gap-3 hover:text-green-600 transition"
          >
            <FiMessageCircle className="text-green-600 text-xl" /> WhatsApp Chat
          </a>

          <a
            href="https://t.me/abdullah1895328"
            target="_blank"
            className="flex items-center gap-3 hover:text-sky-500 transition"
          >
            <FiSend className="text-sky-500 text-xl" /> Telegram
          </a>

          <div className="flex items-center gap-3">
            <FiMapPin className="text-purple-600 text-xl" />
            Damascus, Syria
          </div>

          <div className="flex items-center gap-3">
            <FiClock className="text-orange-500 text-xl" />
            Mon – Fri: 9:00 AM – 6:00 PM
          </div>
        </div>
      </section>
    </main>
  );
}
