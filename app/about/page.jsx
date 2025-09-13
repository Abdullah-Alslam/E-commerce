"use client";

import {
  FiPhone,
  FiMessageCircle,
  FiSend,
  FiUsers,
  FiShoppingCart,
} from "react-icons/fi";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Us</h1>

      {/* Short Description */}
      <p className="max-w-3xl text-center text-gray-700 mb-12">
        We provide high-quality electronics at affordable prices. 
        Our mission is to make online shopping simple, secure, 
        and enjoyable for everyone.
      </p>

      {/* Team Section */}
      <div className="max-w-6xl w-full grid sm:grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Team Member 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
          <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 text-3xl transition-colors duration-300 hover:bg-blue-200">
            👤
          </div>
          <h3 className="text-xl font-bold">Abdullah Abdalslam</h3>
          <p className="text-gray-600">Frontend Developer</p>
        </div>
        {/* Team Member 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
          <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 text-3xl transition-colors duration-300 hover:bg-blue-200">
            👤
          </div>
          <h3 className="text-xl font-bold">John Doe</h3>
          <p className="text-gray-600">Backend Developer</p>
        </div>
        {/* Team Member 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
          <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 text-3xl transition-colors duration-300 hover:bg-blue-200">
            👤
          </div>
          <h3 className="text-xl font-bold">Jane Smith</h3>
          <p className="text-gray-600">UI/UX Designer</p>
        </div>
      </div>

      {/* Icons Section */}
      <div className="max-w-4xl w-full flex gap-8 justify-center mb-12 text-gray-700">
        <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110 hover:text-blue-600">
          <FiUsers className="text-4xl mb-2" aria-label="Experienced Team" />
          <p>Experienced Team</p>
        </div>
        <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110 hover:text-green-600">
          <FiShoppingCart className="text-4xl mb-2" aria-label="Quality Products" />
          <p>Quality Products</p>
        </div>
        <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110 hover:text-sky-500">
          <FiSend className="text-4xl mb-2" aria-label="Fast Delivery" />
          <p>Fast Delivery</p>
        </div>
      </div>

      {/* Contact Links */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <a
          href="tel:+963991566773"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          <FiPhone /> Call Us
        </a>
        <a
          href="https://wa.me/963991566773"
          target="_blank"
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          <FiMessageCircle /> WhatsApp
        </a>
        <a
          href="https://t.me/abdullah1895328"
          target="_blank"
          className="flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition"
        >
          <FiSend /> Telegram
        </a>
      </div>
    </div>
  );
}
