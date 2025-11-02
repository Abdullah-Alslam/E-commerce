"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Boxes,
  Users,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({ setSection }) {
  const [isOpen, setIsOpen] = useState(true);   

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5 text-indigo-400" />,
      section: "dashboard",
    },
    {
      title: "Add Product",
      icon: <PlusCircle className="w-5 h-5 text-green-400" />,
      section: "add",
    },
    {
      title: "Manage Products",
      icon: <Boxes className="w-5 h-5 text-yellow-400" />,
      section: "manage",
    },
    {
      title: "Add User",
      icon: <PlusCircle className="w-5 h-5 text-green-400" />,
      section: "add user",
    },
    {
      title: "Users",
      icon: <Users className="w-5 h-5 text-pink-400" />,
      section: "users",
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5 text-purple-400" />,
      section: "settings",
    },
  ];

  return (
    <>
      {/* زر فتح/غلق السايدبار للشاشات الصغيرة */}
      <button
        className="md:hidden fixed top-5 left-5 z-50 bg-indigo-500 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed md:relative z-40 w-64 h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col p-5 shadow-lg overflow-auto"
      >
        {/* العنوان */}
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h2>

        {/* الأزرار */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSection(item.section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
            >
              {item.icon}
              <span className="font-medium">{item.title}</span>
            </motion.button>
          ))}
        </nav>

        {/* مساحة سفلية */}
        <div className="mt-auto pt-6 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          © 2025 Your Store
        </div>
      </motion.aside>
    </>
  );
}
