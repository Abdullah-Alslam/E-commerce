"use client";
import { useState } from "react";
import { FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been sent!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* عنوان الصفحة */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Contact Us
      </h1>

      {/* الخريطة */}
      <div className="w-full max-w-6xl h-[450px] rounded-2xl shadow-lg overflow-hidden mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13369.34354417689!2d36.29128!3d33.513807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6e16788e7d1%3A0x4f51d79b06fb1e8d!2sDamascus!5e0!3m2!1sen!2s!4v1636384590297!5m2!1sen!2s"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* الفورم + معلومات التواصل */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">
        {/* الفورم */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
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
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Send Message 🚀
          </button>
        </form>

        {/* معلومات التواصل */}
        <div className="flex flex-col justify-center space-y-6 text-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="flex items-center gap-3 text-gray-700">
            <FiPhone className="text-blue-600 text-xl" /> +963991566773
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FiMessageCircle className="text-green-600 text-xl" /> WhatsApp: +963991566773
          </p>
          <p className="flex items-center gap-3 text-gray-700">
            <FiSend className="text-sky-500 text-xl" /> Telegram: @abdullah1895328
          </p>
        </div>
      </div>
    </div>
  );
}
