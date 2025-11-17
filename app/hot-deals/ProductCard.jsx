"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ item, addToCart, addToWishlist }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.04, y: -6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden"
    >
      {/* 🔥 Badge */}
      <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 text-xs rounded font-semibold shadow-md">
        🔥 Hot Deal
      </div>

      {/* 🖼️ Product Image */}
      <Link href={`/products/${item._id}`} className="block">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="overflow-hidden rounded-xl"
        >
          <Image
            src={item.image || "/placeholder.jpg"}
            alt={item.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-xl"
          />
        </motion.div>
      </Link>

      {/* 🏷️ Name */}
      <Link href={`/products/${item._id}`} className="hover:underline mt-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
          {item.name}
        </h3>
      </Link>

      {/* 💰 Prices */}
      <div className="my-2">
        <p className="text-gray-400 text-sm line-through">${item.price}</p>
        <p className="text-orange-500 font-bold text-lg">
          ${item.discountedPrice}{" "}
          <span className="text-xs text-gray-500">
            (
            {Math.round(
              ((item.price - item.discountedPrice) / item.price) * 100
            )}
            % Off)
          </span>
        </p>
      </div>

      {/* 🧡 Buttons */}
      <div className="flex justify-between items-center mt-auto pt-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(item)}
          className="flex items-center justify-center gap-2 px-3 py-2 
            bg-gradient-to-r from-orange-400 to-red-500 
            text-white rounded-xl font-medium shadow-md
            hover:shadow-lg hover:brightness-110 transition-all duration-200"
        >
          <ShoppingCart size={18} /> Add to Cart
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addToWishlist(item)}
          className="p-2 rounded-full 
            bg-gradient-to-r from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-800 
            text-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 
            hover:text-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Heart size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
