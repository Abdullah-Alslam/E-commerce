"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

const categories = [
  { name: "Laptops", to: "/products/laptops" },
  { name: "Mobiles", to: "/products/mobiles" },
  { name: "Accessories", to: "/products/accessories" },
  { name: "Gaming", to: "/products/gaming" },
  { name: "Monitors", to: "/products/monitors" },
];

const informationLinks = [
  { info: "About Us", to: "/about" },
  { info: "Contact Us", to: "/contact" },
  { info: "Blog", to: "/blog" },
  { info: "Privacy Policy", to: "/terms-privacy" },
  { info: "Support", to: "/support" },
];

const customerServices = [
  { info: "My Account", to: "/account" },
  { info: "Wishlist", to: "/wishlist" },
  { info: "Shopping Cart", to: "/cart" },
  { info: "Checkout", to: "/checkout" },
  { info: "Support", to: "/support" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-16 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-300 transition-colors duration-500">
      {/* Grid Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10 text-center md:text-left">
        {/* About Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-500">About Us</h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            We are a modern electronics store offering high-quality laptops,
            smartphones, and accessories with fast delivery and trusted service.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-500">Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link href={cat.to} className="transition hover:text-red-500">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-500">Information</h2>
          <ul className="space-y-3">
            {informationLinks.map((item) => (
              <li key={item.info}>
                <Link href={item.to} className="transition hover:text-red-500">
                  {item.info}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-500">Customer Service</h2>
          <ul className="space-y-3">
            {customerServices.map((service) => (
              <li key={service.info}>
                <Link href={service.to} className="transition hover:text-red-500">
                  {service.info}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="border-t-2 border-red-500 pt-6 flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-sm text-center md:text-left text-gray-600 dark:text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            GameTech Store
          </span>
          . All Rights Reserved.
        </p>

        {/* Payment Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {[FaCcVisa, FaCcMastercard, FaCcPaypal].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, color: "#f87171" }}
              className="text-gray-400 transition"
            >
              <Icon size={36} />
            </motion.div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
            <motion.a
              key={i}
              whileHover={{ scale: 1.2, color: "#f87171" }}
              href="#"
              className="transition text-gray-600 dark:text-gray-400"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
