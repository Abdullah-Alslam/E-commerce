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
import "react-toastify/dist/ReactToastify.css";

export default function AboutUs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  function handleContact(type) {
    toast.info(`${type} link clicked 🚀`, {
      position: "bottom-center",
      autoClose: 2000,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <ToastContainer />

      {/* Header */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          About Our Store
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
          We provide high-quality electronics at affordable prices. Our mission
          is to make online shopping simple, secure, and enjoyable for everyone.
        </p>
      </section>

      {/* Highlights */}
      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          { icon: <FiUsers />, label: "Experienced Team" },
          { icon: <FiShoppingCart />, label: "Quality Products" },
          { icon: <FiSend />, label: "Fast Delivery" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition hover:-translate-y-1"
          >
            <div className="text-5xl text-blue-600 mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {item.label}
            </h3>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Abdullah Abdalsalam", role: "Frontend Developer" },
            { name: "John Doe", role: "Backend Developer" },
            { name: "Jane Smith", role: "UI/UX Designer" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-600">
                👤
              </div>
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Links */}
      <section className="flex flex-col sm:flex-row gap-6 justify-center">
        <a
          href="tel:+963991566773"
          onClick={() => handleContact("Call")}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          <FiPhone /> Call Us
        </a>
        <a
          href="https://wa.me/963991566773"
          target="_blank"
          onClick={() => handleContact("WhatsApp")}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
        >
          <FiMessageCircle /> WhatsApp
        </a>
        <a
          href="https://t.me/abdullah1895328"
          target="_blank"
          onClick={() => handleContact("Telegram")}
          className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-sky-600 transition"
        >
          <FiSend /> Telegram
        </a>
      </section>
    </div>
  );
}
