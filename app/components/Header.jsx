"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#1E293B] text-[#F8FAFC] shadow-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight hover:text-[#3B82F6] transition-colors">
            MyStore
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center text-lg font-medium">
          <Link href="/" className="hover:text-[#3B82F6] transition-colors">Home</Link>
          <Link href="/products" className="hover:text-[#3B82F6] transition-colors">Products</Link>
          <Link href="/about" className="hover:text-[#3B82F6] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#3B82F6] transition-colors">Contact</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          {/* Wishlist/Favorites */}
          <Link href="/wishlist" className="hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" 
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </Link>

          {/* User/Account (new icon) */}
          <Link href="/account" className="hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" 
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M16 14a4 4 0 00-8 0v5h8v-5zM12 10a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex items-center space-x-1 hover:text-[#FACC15] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h14l-2-8M17 13l1.6-8M9 21h.01M15 21h.01" />
            </svg>
            <span className="hidden md:inline font-semibold">Cart</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 hover:text-[#3B82F6] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" 
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#0F172A] text-[#F8FAFC] px-6 py-4 space-y-3 border-t border-gray-700">
          <Link href="/" className="block hover:text-[#3B82F6] transition-colors">Home</Link>
          <Link href="/products" className="block hover:text-[#3B82F6] transition-colors">Products</Link>
          <Link href="/about" className="block hover:text-[#3B82F6] transition-colors">About</Link>
          <Link href="/contact" className="block hover:text-[#3B82F6] transition-colors">Contact</Link>
        </nav>
      )}
    </header>
  );
}
