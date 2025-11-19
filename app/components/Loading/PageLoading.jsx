"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function PageLoading() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const glowColor = isDark ? "#ff3b30" : "#3b82f6";
  const bgGradient = isDark
    ? "from-gray-900 to-black"
    : "from-gray-100 to-gray-300";

  return (
    <motion.div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b ${bgGradient} z-50`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`text-6xl font-extrabold tracking-widest ${
          isDark ? "text-white" : "text-gray-900"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.9, 1.05, 1],
          opacity: 1,
          textShadow: [
            `0 0 8px ${glowColor}`,
            `0 0 16px ${glowColor}`,
            `0 0 32px ${glowColor}`,
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        E-Commerce
      </motion.div>

      <div className="h-2 mt-8 overflow-hidden bg-gray-300 rounded-full w-60 dark:bg-gray-700">
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${glowColor}, #fff, ${glowColor})`,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex mt-4 space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: glowColor }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
