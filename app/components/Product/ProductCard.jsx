"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({
  item,
  addToCart,
  addToWishlist,
  actionLoading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition flex flex-col"
    >
      {/* Product Image */}
      <Link href={`/products/${item._id}`}>
        <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }}>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200"></div>
          )}
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name + Badges */}
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/products/${item._id}`}
            className="hover:underline flex-1"
          >
            <h3 className="text-md font-semibold text-gray-800 truncate">
              {item.name}
            </h3>
          </Link>

          {/* Inline badges */}
          <div className="flex gap-1 shrink-0">
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
            <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              SUPER
            </span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              HOT
            </span>
          </div>
        </div>

        {/* Price */}
        <p className="text-lg font-extrabold text-blue-600 mb-3">
          ${item.price}
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-2 mt-auto">
          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            disabled={actionLoading}
            className={`p-2 rounded-full bg-blue-500 text-white shadow-md ${
              actionLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            } transition`}
            onClick={() => addToCart(item)}
          >
            {actionLoading ? "..." : <ShoppingCart size={18} />}
          </motion.button>

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            disabled={actionLoading}
            className={`p-2 rounded-full bg-pink-100 text-pink-500 shadow-md ${
              actionLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-pink-500 hover:text-white"
            } transition`}
            onClick={() => addToWishlist(item)}
          >
            {actionLoading ? "..." : <Heart size={18} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
