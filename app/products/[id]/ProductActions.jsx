"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductActions({ addToCart, addToWishlist, product }) {
  const prefersReducedMotion = useReducedMotion();
  const btnTap = prefersReducedMotion ? {} : { whileTap: { scale: 0.97 } };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {/* Add To Cart */}
      <motion.button
        {...btnTap}
        onClick={addToCart}
        whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 
        text-white px-5 py-3 rounded-lg hover:from-red-500 hover:to-red-400 shadow-sm"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </motion.button>

      {/* Add to Wishlist */}
      <motion.button
        {...btnTap}
        onClick={() => addToWishlist(product)}
        whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
        className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 
        text-red-600 dark:text-red-400 px-5 py-3 rounded-lg hover:bg-red-50 
        dark:hover:bg-red-900/30"
      >
        <Heart size={18} /> Add to Wishlist
      </motion.button>
    </div>
  );
}
