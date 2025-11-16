"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AboutHeader from "./AboutHeader";
import AboutHighlights from "./AboutHighlights";
import AboutTeam from "./AboutTeam";
import AboutContactLinks from "./AboutContactLinks";

export default function AboutUs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleContact = (type) => {
    toast.info(`${type} link clicked 🚀`, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4">
      <ToastContainer />

      <AboutHeader />
      <AboutHighlights />
      <AboutTeam />
      <AboutContactLinks handleContact={handleContact} />
    </div>
  );
}
