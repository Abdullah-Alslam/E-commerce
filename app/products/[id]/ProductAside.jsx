"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductAside({ product, images, currentImage }) {
  return (
    <aside className="flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-xs"
      >
        <Image
          src={images[currentImage]}
          width={400}
          height={300}
          alt="preview"
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />

        <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>SKU: {product.sku || "—"}</span>
          <span>
            {product.stock ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
