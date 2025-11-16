"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import SupportHeader from "./SupportHeader";
import LoadingSpinner from "./LoadingSpinner";
import SupportForm from "./SupportForm";
import ContactMethods from "./ContactMethods";
import ContactInfoBox from "./ContactInfoBox";

export default function Support() {
  const [fakeLoading, setFakeLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/support", formData);
      toast.success("Your request has been submitted!");
      setFormData({ name: "", email: "", issue: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (fakeLoading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 md:px-12 flex flex-col items-center space-y-10"
    >
      <SupportHeader />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        <SupportForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <div className="flex flex-col gap-6">
          <ContactMethods />
          <ContactInfoBox />
        </div>
      </motion.div>
    </motion.div>
  );
}
