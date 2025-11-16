"use client";

import { motion } from "framer-motion";

export default function AboutTeam() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const members = [
    { name: "Abdullah Abdalsalam", role: "Frontend Developer" },
    { name: "John Doe", role: "Backend Developer" },
    { name: "Jane Smith", role: "UI/UX Designer" },
  ];

  const cardHover = { scale: 1.05, y: -5, transition: { duration: 0.3 } };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-6xl mx-auto mb-20"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
        Meet the Team
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m, idx) => (
          <motion.div
            key={idx}
            whileHover={cardHover}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-center cursor-pointer transition-all"
          >
            <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-4xl text-red-600 dark:text-red-400">
              👤
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {m.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
