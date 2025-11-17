"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function CartItem({
  item,
  savingIds,
  removeFromCart,
  variants,
}) {
  return (
    <motion.article
      className="bg-gray-100/70 dark:bg-gray-800/80 rounded-3xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center border border-gray-200 dark:border-gray-700"
      initial="hidden"
      animate="enter"
      whileHover="hover"
      variants={variants}
    >
      <div className="w-full sm:w-36 h-36 relative rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={item.image || "/placeholder.png"}
          alt={item.name}
          fill
          sizes="144px"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
            ${item.price.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {item.description || "No description available."}
          </p>
        </div>

        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
          <button
            onClick={() => removeFromCart(item._id)}
            disabled={savingIds.has(item._id)}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            <Trash2 size={16} />
          </button>

          <p className="text-sm font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
