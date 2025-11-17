"use client";

import { motion } from "framer-motion";

export default function WishlistCard({
  item,
  deleteWishlist,
  addToCart,
  addingToCart,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <motion.img
        src={item.image}
        alt={item.name}
        className="w-full h-64 object-cover"
        whileHover={{ scale: 1.05 }}
      />

      <motion.button
        onClick={() => deleteWishlist(item._id)}
        whileHover={{ scale: 1.1 }}
        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition"
        title="Remove"
      >
        🗑
      </motion.button>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">
          {item.name}
        </h2>

        <p className="text-xl font-semibold text-red-500 dark:text-red-400 mb-6">
          ${item.price}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          disabled={addingToCart === item._id}
          onClick={() => addToCart(item)}
          className={`w-full py-3 font-bold rounded-xl transition-all shadow-md ${
            addingToCart === item._id
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white"
          }`}
        >
          {addingToCart === item._id ? "Adding..." : "Add to Cart 🛒"}
        </motion.button>
      </div>
    </motion.div>
  );
}
