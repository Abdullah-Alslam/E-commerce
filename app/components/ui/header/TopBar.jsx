"use client";

import Link from "next/link";
import { User, Heart, ShoppingCart } from "lucide-react";

// Top info bar (email, phone, wishlist, account, cart)
export default function TopBar({ user }) {
  return (
    <div className="w-full bg-gray-900 text-gray-200 dark:bg-gray-950 dark:text-gray-300 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 py-2">
        {/* Left contact info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span>📞 +963991566773</span>
          <span>✉️ asabd7307@gmail.com</span>
          <span>📍 AL Nile Street</span>
        </div>

        {/* Right account actions */}
        <div className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-0">
          <span>$ USD</span>

          {/* User account */}
          <Link
            href={user ? "/account" : "/auth/login"}
            className="flex items-center gap-1 hover:text-white"
          >
            <User size={14} /> {user ? user.name : "My Account"}
          </Link>

          {/* Wishlist */}
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

          {/* Cart */}
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
  );
}
