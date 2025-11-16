"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesBar({ user, handleLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop section */}
        <div className="hidden md:flex justify-between items-center">
          {/* Categories label */}
          <div className="flex items-center font-medium cursor-pointer hover:text-red-600 mr-16">
            <span>Categories</span>
            <ChevronDown size={18} />
          </div>

          {/* Links aligned horizontally with spacing */}
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/products/laptops">💻 Laptops</Link>
            <Link href="/products/mobiles">📱 Mobiles</Link>
            <Link href="/products/accessories">🎧 Accessories</Link>
            <Link href="/products/tablets">🖥 Tablets</Link>
            <Link href="/products/watches">🕹 Smart Watches</Link>
          </div>

          {/* Login/Logout */}
          <motion.div whileHover={{ scale: 1.05 }}>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Login/Signup
              </Link>
            )}
          </motion.div>
        </div>

        {/* Mobile section */}
        <div className="flex justify-between items-center md:hidden">
          {/* Categories button */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 font-medium cursor-pointer hover:text-red-600"
          >
            <span>Categories</span>
            <ChevronDown size={18} />
          </div>

          {/* Login/Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Login/Signup
            </Link>
          )}
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-3 text-sm font-medium mt-3 md:hidden"
            >
              <Link href="/products/laptops">💻 Laptops</Link>
              <Link href="/products/mobiles">📱 Mobiles</Link>
              <Link href="/products/accessories">🎧 Accessories</Link>
              <Link href="/products/tablets">🖥 Tablets</Link>
              <Link href="/products/watches">🕹 Smart Watches</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
