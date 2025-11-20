"use client";

import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

export default function WishlistCard({
  item,
  removing,
  adding,
  deleteWishlist,
  addToCart,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="p-5 transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-xl"
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="object-cover w-full h-56 rounded-xl"
        whileHover={{ scale: 1.02 }}
      />

      <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
        {item.title}
      </h2>

      <p className="mt-1 text-lg font-semibold text-red-600 dark:text-red-400">
        ${item.price}
      </p>

      <div className="flex gap-3 mt-6">
        {/* ADD TO CART BUTTON */}
        <button
          onClick={() => addToCart(item)}
          disabled={adding === item._id}
          className="flex items-center justify-center flex-1 py-2 text-white transition-all bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50"
        >
          {adding === item._id ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart size={18} className="mr-2" /> Add to Cart
            </>
          )}
        </button>

        {/* REMOVE BUTTON */}
        <button
          onClick={() => deleteWishlist(item._id)}
          className="p-3 transition-all bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {removing === item._id ? (
            <span className="text-sm">...</span>
          ) : (
            <Trash2 size={20} className="text-red-600" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
