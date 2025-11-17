"use client";

import { AnimatePresence, motion } from "framer-motion";
import WishlistCard from "./WishlistCard";

export default function WishlistGrid({
  wishlist,
  deleteWishlist,
  addToCart,
  addingToCart,
}) {
  return (
    <motion.div
      layout
      className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <AnimatePresence>
        {wishlist.map((item) => (
          <WishlistCard
            key={item._id}
            item={item}
            deleteWishlist={deleteWishlist}
            addToCart={addToCart}
            addingToCart={addingToCart}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
