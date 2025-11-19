"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductCard = React.memo(function ProductCard({
  item,
  addToCart,
  addToWishlist,
  actionLoading,
}) {
  const priceFormatted =
    typeof item.price === "number" ? item.price.toFixed(2) : item.price;

  return (
    <motion.article
      className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative group"
      initial={{ scale: 0.995 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-labelledby={`product-${item._id}-title`}
      role="group"
    >
      {/* Image + Link */}
      <div className="relative w-full h-48 sm:h-56 md:h-44 lg:h-52 bg-gray-100 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
        <Image
          src={item.image || "/placeholder.png"}
          alt={item.name || "Product image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        <Link
          href={`/products/${item._id}`}
          className="absolute inset-0 z-10 block"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-3 z-20 relative">
        <h3
          id={`product-${item._id}-title`}
          className="text-sm font-semibold text-red-600 line-clamp-2"
        >
          {item.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {item.description || "Great product."}
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-bold text-red-700 dark:text-red-400">
            ${priceFormatted}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            ({item.category || "—"})
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            disabled={actionLoading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
            aria-label={`Add ${item.name} to cart`}
          >
            Add to cart
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(item);
            }}
            disabled={actionLoading}
            className="inline-flex items-center justify-center p-2 rounded-lg border border-red-100 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition"
            aria-label={`Add ${item.name} to wishlist`}
            title="Wishlist"
            role="button"
          >
            ♥
          </button>
        </div>
      </div>
    </motion.article>
  );
});

export default ProductCard;
