"use client";

import { Phone, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TermsPrivacy() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="space-y-4 w-full max-w-xl px-6">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 md:p-16 flex flex-col items-center space-y-12 text-gray-800 dark:text-gray-300"
    >
      <motion.h1
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-red-600 mb-6 text-center"
      >
        Terms & Privacy
      </motion.h1>

      {/* Summary */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg max-w-3xl shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Summary
        </h2>
        <ul className="list-disc list-inside leading-loose">
          <li>By using our website, you agree to our rules and policies.</li>
          <li>
            We collect your name, email, and messages submitted through forms.
          </li>
          <li>
            Your data is stored securely and will not be shared without consent.
          </li>
          <li>Users are responsible for providing accurate information.</li>
          <li>We may update these terms and privacy policy occasionally.</li>
        </ul>
      </motion.section>

      {/* Terms of Service */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 max-w-3xl space-y-4"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Terms of Service
        </h2>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">1. Introduction</h3>
          <p>
            Welcome to our website. By using our services, you agree to comply
            with these terms and conditions.
          </p>
          <h3 className="text-xl font-semibold">2. User Obligations</h3>
          <p>
            Users must provide accurate information and not misuse our services.
            Misuse may result in account suspension.
          </p>
          <h3 className="text-xl font-semibold">3. Limitation of Liability</h3>
          <p>
            We are not responsible for any direct or indirect damages arising
            from the use of our website.
          </p>
        </div>
      </motion.section>

      {/* Privacy Policy */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 max-w-3xl space-y-4"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h2>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">1. Data Collection</h3>
          <p>
            We collect your name, email, and any messages submitted through
            contact forms to provide our services effectively.
          </p>
          <h3 className="text-xl font-semibold">2. Data Usage</h3>
          <p>
            Collected data is used only to respond to inquiries, improve
            services, and send notifications if needed.
          </p>
          <h3 className="text-xl font-semibold">3. Data Protection</h3>
          <p>
            Your data is stored securely (MongoDB). We do not share personal
            information with third parties without consent.
          </p>
          <h3 className="text-xl font-semibold">4. User Rights</h3>
          <p>
            You can request to access, update, or delete your personal
            information at any time by contacting us.
          </p>
        </div>
      </motion.section>

      {/* Contact Buttons */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl w-full"
      >
        {[
          {
            href: "tel:+963991566773",
            icon: <Phone size={18} />,
            label: "Call Us",
            bg: "bg-blue-600 hover:bg-blue-700",
          },
          {
            href: "https://wa.me/963991566773",
            icon: <MessageCircle size={18} />,
            label: "WhatsApp",
            bg: "bg-green-600 hover:bg-green-700",
          },
          {
            href: "https://t.me/abdullah1895328",
            icon: <Send size={18} />,
            label: "Telegram",
            bg: "bg-sky-500 hover:bg-sky-600",
          },
        ].map((btn, idx) => (
          <a
            key={idx}
            href={btn.href}
            target="_blank"
            className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl transition transform hover:scale-105 ${btn.bg}`}
          >
            {btn.icon} {btn.label}
          </a>
        ))}
      </motion.section>

      <p className="text-gray-600 dark:text-gray-400 text-sm text-center max-w-3xl">
        © 2025 Your Company. All rights reserved. By using this site, you agree
        to our Terms & Privacy Policy.
      </p>
    </motion.div>
  );
}
