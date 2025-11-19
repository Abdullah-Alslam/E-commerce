"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

export default function FooterBottom() {
  return (
    <div className="flex flex-col items-center justify-between pt-6 border-t-2 border-red-500 md:flex-row">
      {/* Copyright */}
      <p className="text-sm text-center text-gray-600 md:text-left dark:text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          GameTech Store
        </span>
        . All Rights Reserved.
      </p>

      {/* Payment Icons */}
      <div className="flex items-center mt-4 space-x-4 md:mt-0">
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
      <div className="flex items-center mt-4 space-x-4 md:mt-0">
        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
          <motion.a
            key={i}
            whileHover={{ scale: 1.2, color: "#f87171" }}
            href="#"
            className="text-gray-600 transition dark:text-gray-400"
          >
            <Icon size={20} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
