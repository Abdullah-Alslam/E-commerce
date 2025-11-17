"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../components/ProtectedRoute";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      setLoading(true);
      const res = await axios.get("/api/wishlist");
      setWishlist(res.data || []);
    } catch (err) {
      console.log("Error fetching wishlist:", err);
      toast.error("Failed to load wishlist 😢");
    } finally {
      setLoading(false);
    }
  }

  async function deleteWishlist(id) {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
      toast.success("Removed from wishlist 🗑️");
    } catch {
      toast.error("Failed to remove item 😔");
    }
  }

  async function addToCart(item) {
    try {
      setAddingToCart(item._id);
      await axios.post("/api/cart", {
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Failed to add to cart 😢");
    } finally {
      setAddingToCart(null);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 animate-pulse min-h-screen bg-gray-50 dark:bg-gray-900">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-md p-4"
          >
            <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="mt-4 h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Your wishlist is empty 💔
        </p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent"
        >
          ❤️ My Wishlist
        </motion.h1>

        {/* Wishlist Grid */}
        <motion.div
          layout
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Product Image */}
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Delete Button */}
                <motion.button
                  onClick={() => deleteWishlist(item._id)}
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition"
                  title="Remove from wishlist"
                >
                  🗑
                </motion.button>

                {/* Info Section */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">
                    {item.name}
                  </h2>
                  <p className="text-xl font-semibold text-red-500 dark:text-red-400 mb-6">
                    ${item.price}
                  </p>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => addToCart(item)}
                    disabled={addingToCart === item._id}
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
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </ProtectedRoute>
  );
}
