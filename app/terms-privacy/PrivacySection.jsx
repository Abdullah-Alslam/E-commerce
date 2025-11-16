"use client";
import { motion } from "framer-motion";

export default function PrivacySection() {
  return (
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
        <p>We collect your name, email, and messages from contact forms.</p>

        <h3 className="text-xl font-semibold">2. Data Usage</h3>
        <p>Data is used for responding to inquiries and improving services.</p>

        <h3 className="text-xl font-semibold">3. Data Protection</h3>
        <p>Your data is stored securely (MongoDB) and never shared.</p>

        <h3 className="text-xl font-semibold">4. User Rights</h3>
        <p>You may request to view or delete your data anytime.</p>
      </div>
    </motion.section>
  );
}
