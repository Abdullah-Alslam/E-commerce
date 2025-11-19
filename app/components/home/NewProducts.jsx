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
    <section className="relative px-4 py-16 sm:px-10 bg-gray-50 dark:bg-gray-900">
      <h2 className="mb-12 text-3xl font-bold text-center dark:text-white">
        🆕 New Arrivals
      </h2>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute z-20 p-2 transition -translate-y-1/2 bg-white rounded-full shadow-lg left-2 top-1/2 dark:bg-gray-800 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute z-20 p-2 transition -translate-y-1/2 bg-white rounded-full shadow-lg right-2 top-1/2 dark:bg-gray-800 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>

      {/* Slider */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: `-${index * 22}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          {products.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              className="min-w-[22%] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden group relative transition-transform duration-300"
            >
              {/* Tags */}
              <div className="absolute z-10 flex gap-2 top-3 left-3">
                {p.isNew && (
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-lg">
                    NEW
                  </span>
                )}
                {p.discount && (
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-lg">
                    -{p.discount}%
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={p.image || "/images/default-product.png"}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Quick View Overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition opacity-0 bg-black/0 group-hover:bg-black/30 group-hover:opacity-100">
                  <button
                    onClick={() => router.push(`/products/${p._id}`)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 transition-transform bg-white rounded-full shadow-lg dark:bg-gray-700 dark:text-white hover:scale-105"
                  >
                    <Eye size={16} /> Quick View
                  </button>
                </div>
              </div>

              {/* Text */}
              <div className="p-4 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {p.category}
                </p>
                <h3 className="mt-2 text-lg font-bold dark:text-white line-clamp-1">
                  {p.name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-3 text-yellow-400">
                  {[...Array(5)].map((_, star) => (
                    <Star
                      key={star}
                      size={18}
                      fill={star < p.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <span className="text-xl font-extrabold text-red-600">
                    ${p.price?.toFixed(2)}
                  </span>
                  {p.oldPrice && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ${p.oldPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(p)}
                disabled={actionLoading}
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-3 py-3 font-semibold text-white transition bg-red-600 rounded-t-none shadow-lg opacity-0 hover:bg-red-700 rounded-b-3xl group-hover:opacity-100 disabled:opacity-50"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
