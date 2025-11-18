"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SubmitButton({ loading, text }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center w-full gap-2 p-3 font-semibold text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={20} />{" "}
          {text || "Submitting..."}
        </>
      ) : (
        text || "Submit"
      )}
    </motion.button>
  );
}
