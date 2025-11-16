"use client";
import { motion } from "framer-motion";

export default function TermsSection() {
  return (
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
          with these terms.
        </p>

        <h3 className="text-xl font-semibold">2. User Obligations</h3>
        <p>
          Users must provide accurate information and not misuse our services.
          Misuse may result in suspension.
        </p>

        <h3 className="text-xl font-semibold">3. Limitation of Liability</h3>
        <p>
          We are not responsible for damages arising from using our website.
        </p>
      </div>
    </motion.section>
  );
}
