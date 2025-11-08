"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.slice(0, 10));
      } catch {
        toast.error("Failed to load products");
      }
    }
    fetchProducts();
  }, []);

  const handleNext = () => {
    if (index < products.length - 5) setIndex(index + 1);
  };
  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  // ✅ addToCart function
  const addToCart = useCallback(async (item) => {
    if (!item?._id) {
      toast.error("Product ID not found!");
      return;
    }

    try {
      setActionLoading(true);
      await axios.post("/api/cart", {
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      toast.success(`${item.name} added to cart 🛒`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  }, []);

  return (
    <section className="relative py-16 px-4 sm:px-10 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
        🆕 New Arrivals
      </h2>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg p-2 rounded-full hover:scale-110 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 shadow-lg p-2 rounded-full hover:scale-110 transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>

      {/* Slider */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: `-${index * 20}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          {products.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              className="min-w-[20%] bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group relative"
            >
              {/* Tags */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {p.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                {p.discount && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{p.discount}%
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="relative w-full h-36 overflow-hidden">
                <Image
                  src={p.image || "/images/default-product.png"}
                  alt={p.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => router.push(`/products/${p._id}`)}
                    className="flex items-center gap-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1.5 rounded-full font-semibold text-sm"
                  >
                    <Eye size={16} /> Quick View
                  </button>
                </div>
              </div>

              {/* Text */}
              <div className="p-3 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {p.category}
                </p>
                <h3 className="font-semibold dark:text-white text-base mt-1 line-clamp-1">
                  {p.name}
                </h3>
                <div className="flex justify-center items-center gap-1 mt-2 text-yellow-500">
                  {[...Array(5)].map((_, star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star < p.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-red-600 font-bold">
                    ${p.price?.toFixed(2)}
                  </span>
                  {p.oldPrice && (
                    <span className="text-gray-400 line-through ml-2 text-sm">
                      ${p.oldPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(p)}
                disabled={actionLoading}
                className="absolute bottom-0 left-0 right-0 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-t-none rounded-b-2xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
