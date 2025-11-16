"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Summary from "./Summary";
import TermsSection from "./TermsSection";
import PrivacySection from "./PrivacySection";
import ContactButtons from "./ContactButtons";
import SkeletonLoader from "./SkeletonLoader";

export default function TermsPrivacy() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonLoader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 md:p-16 flex flex-col items-center space-y-12 text-gray-800 dark:text-gray-300"
    >
      <Header />
      <Summary />
      <TermsSection />
      <PrivacySection />
      <ContactButtons />

      <p className="text-gray-600 dark:text-gray-400 text-sm text-center max-w-3xl">
        © 2025 Your Company — All rights reserved.
      </p>
    </motion.div>
  );
}
