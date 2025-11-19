"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

export default function FooterMainSections() {
  return (
    <div className="grid grid-cols-1 gap-10 mb-10 text-center sm:grid-cols-2 md:grid-cols-4 md:text-left">
      {/* About Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-red-500">About Us</h2>
        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
          We are a modern electronics store offering high-quality laptops,
          smartphones, and accessories with fast delivery and trusted service.
        </p>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-red-500">Categories</h2>
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

      {/* Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-red-500">Information</h2>
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

      {/* Customer Service Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-red-500">
          Customer Service
        </h2>
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
  );
}
