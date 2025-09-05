"use client";

import Link from "next/link";
import { useState } from "react";
import { FaRegHeart, FaShoppingCart, FaSun, FaUser } from "react-icons/fa";
import { HiOutlineMenu, HiChevronDown } from "react-icons/hi";
import { BsMoonStars } from "react-icons/bs";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const productCategories = [
    { name: "Laptops", href: "/products/laptops" },
    { name: "Mobiles", href: "/products/mobiles" },
    { name: "Tablets", href: "/products/tablets" },
    { name: "Smart Watches", href: "/products/watches" },
    { name: "Accessories", href: "/products/accessories" },
  ];

  return (
    <header className="bg-white text-gray-800 shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E40AF] hover:text-[#2563EB] transition-colors">
            MyStore
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center text-lg font-medium">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center hover:text-[#2563EB] transition-colors"
            >
              Products <HiChevronDown className="ml-1 h-5 w-5" />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-4 py-2 text-sm hover:underline hover:bg-gray-100"
                    onClick={() => setProductsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="hover:text-[#2563EB] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#2563EB] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="hover:text-[#2563EB] transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <Link
            href="/wishlist"
            className="hover:text-[#F59E0B] transition-colors"
          >
            <FaRegHeart className="h-7 w-7" />
          </Link>

          <Link
            href="/account"
            className="hover:text-[#F59E0B] transition-colors"
          >
            <FaUser className="h-7 w-7" />
          </Link>

          <Link
            href="/cart"
            className="flex items-center space-x-1 hover:text-[#F59E0B] transition-colors"
          >
            <FaShoppingCart className="h-7 w-7" />
            <span className="hidden md:inline font-semibold">Cart</span>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            className="hover:text-[#2563EB] transition-colors"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <FaSun className="h-7 w-7" />
            ) : (
              <BsMoonStars className="h-7 w-7" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 hover:text-[#2563EB] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <HiOutlineMenu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-50 text-gray-800 px-6 py-4 space-y-3 border-t border-gray-200">
          <Link
            href="/"
            className="block hover:text-[#2563EB] transition-colors"
          >
            Home
          </Link>

          {/* Mobile Products Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex justify-between items-center px-2 py-2 hover:text-[#2563EB] transition-colors"
            >
              Products <HiChevronDown className="h-5 w-5" />
            </button>
            {productsOpen && (
              <div className="pl-4 space-y-1">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="block px-2 py-1 text-sm hover:underline hover:bg-gray-100 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/admin"
            className="block hover:text-[#2563EB] transition-colors"
          >
            Admin
          </Link>
          <Link
            href="/about"
            className="block hover:text-[#2563EB] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block hover:text-[#2563EB] transition-colors"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
