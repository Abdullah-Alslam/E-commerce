"use client";
import { useState } from "react";
import { FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await axios.post("/api/contact", formData);
      setStatus("✅ Your message has been sent!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.log(err);
      setStatus("❌ Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>

      {/* Map */}
      <div className="w-full max-w-6xl h-[450px] rounded-2xl shadow-lg overflow-hidden mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13369.34354417689!2d36.29128!3d33.513807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6e16788e7d1%3A0x4f51d79b06fb1e8d!2sDamascus!5e0!3m2!1sen!2s!4v1636384590297!5m2!1sen!2s"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Form & Contact Info */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 grid sm:grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

          {status && (
            <p
              className={`text-center font-medium ${
                status.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-lg bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          
          {/* Interactive Links */}
          <a
            href="tel:+963991566773"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <FiPhone className="text-blue-600 text-xl" /> +963991566773
          </a>
          <a
            href="https://wa.me/963991566773"
            target="_blank"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
          >
            <FiMessageCircle className="text-green-600 text-xl" /> WhatsApp
          </a>
          <a
            href="https://t.me/abdullah1895328"
            target="_blank"
            className="flex items-center gap-3 text-gray-700 hover:text-sky-500 transition"
          >
            <FiSend className="text-sky-500 text-xl" /> Telegram
          </a>
        </div>
      </div>
    </div>
  );
}
