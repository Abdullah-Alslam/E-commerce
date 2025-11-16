"use client";

import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

// Middle section of header (logo, nav links, mobile menu, theme toggle)
export default function MiddleNavbar({
  theme,
  setTheme,
  logo,
  menuOpen,
  setMenuOpen,
}) {
  const navItems = ["Home", "About", "Contact", "Admin", "Blog"];

  return (
    <div className="w-full bg-[#111] dark:bg-[#0c0c0c] text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {logo?.startsWith("http") ? (
            <motion.img
              src={logo}
              alt="Logo"
              className="h-10 w-auto object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          ) : (
            <motion.span
              className="text-3xl font-extrabold tracking-tight text-red-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {logo}
            </motion.span>
          )}
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-base">
          {navItems.map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1, color: "#ef4444" }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="hover:text-red-500"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-white"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hidden md:block p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden flex flex-col bg-[#111] border-t border-red-600 text-white px-4 pb-4 space-y-2"
        >
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block py-2 border-b border-gray-800 hover:text-red-500"
            >
              {item}
            </Link>
          ))}

          {/* Mobile theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 py-2 hover:text-red-500"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} Toggle
            Theme
          </button>
        </motion.div>
      )}
    </div>
  );
}
