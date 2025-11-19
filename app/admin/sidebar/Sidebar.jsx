"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import SidebarToggle from "./SidebarToggle";
import SidebarMenuItem from "./SidebarMenuItem";
import { menuItems } from "./sidebarItems";

export default function Sidebar({ setSection }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <SidebarToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed z-40 flex flex-col w-64 h-screen p-5 text-gray-900 bg-white shadow-lg md:relative dark:bg-gray-900 dark:text-gray-100"
      >
        <h2 className="mb-8 text-2xl font-bold tracking-wide">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item, idx) => (
            <SidebarMenuItem
              key={idx}
              title={item.title}
              icon={item.icon}
              onClick={() => setSection(item.section)}
            />
          ))}
        </nav>

        <div className="pt-6 mt-auto text-sm text-gray-500 border-t dark:text-gray-400">
          © 2025 Your Store
        </div>
      </motion.aside>
    </>
  );
}
