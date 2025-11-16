"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4 text-center"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-2xl text-center text-gray-600 dark:text-gray-400 mb-10"
      >
        Have a question or business inquiry? We're here to help!
      </motion.p>

      <section className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 grid sm:grid-cols-1 md:grid-cols-2 gap-12">
        <ContactForm />
        <ContactDetails />
      </section>
    </main>
  );
}
