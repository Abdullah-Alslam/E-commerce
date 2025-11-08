"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NewsTicker() {
  const news = [
    "🔥 Big Sale - Up to 50% off on Laptops!",
    "📱 New iPhone 16 Series Available Now!",
    "🎧 Grab your gaming accessories today!",
    "🖥️ Exclusive Desktop Deals this week!",
    "⌚ Smartwatch Flash Sale - Limited Time!",
  ];

  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-red-600 dark:bg-red-900 text-white py-3 shadow-md">
      <motion.div
        ref={containerRef}
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -width] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {news.concat(news).map((item, idx) => (
          <span
            key={idx}
            className="inline-block min-w-max px-4 py-1 bg-red-700/20 dark:bg-red-800/30 rounded hover:scale-105 transition-transform cursor-pointer"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
