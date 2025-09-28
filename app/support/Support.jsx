"use client";

import { useEffect, useState } from "react";
import { FiPhone, FiMessageCircle, FiSend, FiClock } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

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
    const timer = setTimeout(() => setFakeLoading(false), 1500);
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
      toast.success("✅ Your request has been submitted. Our team will contact you soon!");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-100 py-12 sm:px-4 px-6 flex flex-col items-center transition-opacity duration-700 ease-out opacity-0 animate-fadeIn"
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 text-center">
        Support Center
      </h1>

      <p className="text-gray-600 text-center max-w-2xl mb-10 text-sm md:text-base px-2">
        Need help? Our support team is here 24/7 to assist you with your issues
        and inquiries. Fill out the form below or contact us directly.
      </p>

      {/* Form & Info */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            required
          />
          <input
            type="text"
            name="issue"
            placeholder="Subject / Issue"
            value={formData.issue}
            onChange={handleChange}
            className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            required
          />
          <textarea
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
            className="border w-full p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Submit Request 🚀"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-base sm:text-sm bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Other Ways to Reach Us
          </h2>

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
            Average response time:{" "}
            <span className="text-green-600 font-semibold">1 - 2 hours</span>
          </p>
        </div>
      </div>
    </div>
  );
}
