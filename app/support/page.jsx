"use client";

import { useState } from "react";
import { FiPhone, FiMessageCircle, FiSend, FiClock } from "react-icons/fi";
import axios from "axios";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
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
      await axios.post("/api/support", formData);
      setStatus("✅ Your request has been submitted. Our team will contact you soon!");
      setFormData({ name: "", email: "", issue: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Support Center</h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10">
        Need help? Our support team is here 24/7 to assist you with your issues and inquiries.  
        Fill out the form below or contact us directly.
      </p>

      {/* Form & Info */}
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
            name="issue"
            placeholder="Subject / Issue"
            value={formData.issue}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit Request 🚀"}
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Ways to Reach Us</h2>

          <a
            href="tel:+963991566773"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition transform hover:translate-x-1"
          >
            <FiPhone className="text-blue-600 text-xl" /> +963991566773
          </a>
          <a
            href="https://wa.me/963991566773"
            target="_blank"
            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition transform hover:translate-x-1"
          >
            <FiMessageCircle className="text-green-600 text-xl" /> WhatsApp
          </a>
          <a
            href="https://t.me/abdullah1895328"
            target="_blank"
            className="flex items-center gap-3 text-gray-700 hover:text-sky-500 transition transform hover:translate-x-1"
          >
            <FiSend className="text-sky-500 text-xl" /> Telegram
          </a>

          {/* Working Hours */}
          <div className="flex items-center gap-3 text-gray-700">
            <FiClock className="text-orange-500 text-xl" />
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
          <p className="text-gray-500 text-sm">
            Average response time: <span className="text-green-600 font-semibold">1 - 2 hours</span>
          </p>
        </div>
      </div>
    </div>
  );
}
