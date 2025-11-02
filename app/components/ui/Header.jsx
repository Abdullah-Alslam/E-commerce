"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const cookie = Cookie();

  // ✅ Mount
  useEffect(() => setMounted(true), []);

  // ✅ Fetch Store Logo
  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await axios.get("/api/settings");
        setLogo(res.data.storeName);
      } catch (err) {
        console.log("Logo fetch error:", err);
      }
    }
    fetchLogo();
  }, []);

  // ✅ Fetch User
  useEffect(() => {
    async function fetchUser() {
      try {
        const userId = cookie.get("userId");
        if (!userId) return;

        const res = await axios.get(`/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.log("User fetch error:", err);
      }
    }

    fetchUser();
  }, []);

  // ✅ Logout handler
  async function handleLogout() {
    try {
      await axios.post("/api/logout");
      cookie.remove("token");
      cookie.remove("userId");
      setUser(null);
      router.push("/auth/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  }

  if (!mounted) return null;

  return (
    <header className="w-full border-b-4 border-red-600">
      {/* --------- Top Bar --------- */}
      <div className="w-full bg-gray-900 text-gray-200 dark:bg-gray-950 dark:text-gray-300 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>📞 +963991566773</span>
            <span>✉️ asabd7307@gmail.com</span>
            <span>📍 AL Nile Street</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
            <span>$ USD</span>
            <Link
              href={user ? "/account" : "/auth/login"}
              className="flex items-center gap-1 hover:text-white"
            >
              <User size={14} /> {user ? user.name : "My Account"}
            </Link>
            <Link
              href="/wishlist"
              className="relative flex items-center gap-1 hover:text-white"
            >
              <Heart size={14} />
              <span>Wishlist</span>
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1 hover:text-white"
            >
              <ShoppingCart size={14} />
              <span>Cart</span>
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* --------- Middle Navbar --------- */}
      <div className="w-full bg-[#111] dark:bg-[#0c0c0c] text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {logo && logo.startsWith("http") ? (
              <motion.img
                src={logo}
                alt="Logo"
                className="h-10 w-auto object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <motion.span
                className="text-3xl font-extrabold tracking-tight text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {logo || ""}
              </motion.span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-base">
            {["Home", "About", "Contact", "Admin", "Blog"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1, color: "#ef4444" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-red-500 transition"
                  prefetch={false}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:block p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="text-white" size={18} />
            ) : (
              <Moon className="text-white" size={18} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden flex flex-col bg-[#111] border-t border-red-600 text-white px-4 pb-4 space-y-2"
          >
            {["Home", "About", "Contact", "Admin", "Blog"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block py-2 border-b border-gray-800 hover:text-red-500 transition"
                prefetch={false}
              >
                {item}
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 py-2 hover:text-red-500 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} Toggle
              Theme
            </button>
          </motion.div>
        )}
      </div>

      {/* --------- Bottom Categories Bar --------- */}
      <div className="w-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-3 gap-3">
          <div className="flex items-center gap-2 font-medium cursor-pointer hover:text-red-600 transition">
            <span>Categories</span>
            <ChevronDown size={18} />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/products/laptops"
              className="hover:text-red-600 transition"
            >
              💻 Laptops
            </Link>
            <Link
              href="/products/mobiles"
              className="hover:text-red-600 transition"
            >
              📱 Mobiles
            </Link>
            <Link
              href="/products/accessories"
              className="hover:text-red-600 transition"
            >
              🎧 Accessories
            </Link>
            <Link
              href="/products/tablets"
              className="hover:text-red-600 transition"
            >
              🖥 Tablets
            </Link>
            <Link
              href="/products/watches"
              className="hover:text-red-600 transition"
            >
              🕹 Smart Watches
            </Link>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex"
          >
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Login/Sigup
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
