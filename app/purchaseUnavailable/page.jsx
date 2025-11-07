"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PurchaseUnavailable() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    toast.info("Purchasing is currently disabled — demo mode.", {
      autoClose: 2800,
      pauseOnHover: true,
    });
  }, []);

  const containerVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 12 },
        enter: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      };

  const buttonTap = prefersReducedMotion ? {} : { whileTap: { scale: 0.98 } };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-6">
      {/* Toast container (top-right) */}
      <ToastContainer
        position="top-right"
        autoClose={2800}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <motion.section
        initial="hidden"
        animate="enter"
        variants={containerVariants}
        className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-none border border-green-100 dark:border-gray-800 p-6 md:p-10"
        aria-labelledby="purchase-unavailable-title"
        role="region"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon / Illustration */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M3 3h18v4H3z" fill="rgba(255,255,255,0.08)"></path>
              <path
                d="M7 11h10l-1.2 6.4a2 2 0 0 1-2 1.6H10.2a2 2 0 0 1-2-1.6L7 11z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="19" r="1" fill="white" />
              <circle cx="15" cy="19" r="1" fill="white" />
            </svg>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <h1
              id="purchase-unavailable-title"
              className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-50"
            >
              Sorry — Purchasing is temporarily unavailable
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl">
              We’ve disabled checkout for this demo to keep things simple for
              the portfolio. You can still browse products, add them to your
              wishlist, and test other site flows.
            </p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="inline-block w-8 h-8 rounded-full bg-green-100 dark:bg-emerald-700 text-green-700 dark:text-white flex items-center justify-center font-semibold">
                  ✓
                </span>
                <span>Browse products & view details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-block w-8 h-8 rounded-full bg-green-100 dark:bg-emerald-700 text-green-700 dark:text-white flex items-center justify-center font-semibold">
                  ★
                </span>
                <span>Add items to wishlist (demo)</span>
              </li>
            </ul>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <motion.div {...buttonTap}>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-800 text-white font-semibold shadow-md transition"
                  aria-label="Back to home"
                >
                  ← Back to Home
                </Link>
              </motion.div>

              <motion.button
                {...buttonTap}
                onClick={() =>
                  toast.info(
                    "Try again later — purchasing is disabled for the demo."
                  )
                }
                className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm hover:translate-y-[-2px] hover:scale-[1.01] transition transform"
                aria-label="Notify me"
              >
                Notify me when available
              </motion.button>
            </div>
          </div>
        </div>

        {/* subtle footer note */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center md:text-right">
          This is a demo state — no payments are processed.
        </div>
      </motion.section>
    </main>
  );
}
