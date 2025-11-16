"use client";
import { motion } from "framer-motion";

export default function Summary() {
  return (
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
  );
}
