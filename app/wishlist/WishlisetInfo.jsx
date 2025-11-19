"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../components/ProtectedRoute";

export default function WishlistInfo() {
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
      <div className="grid min-h-screen grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3 animate-pulse bg-gray-50 dark:bg-gray-900">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white shadow-md rounded-2xl dark:bg-gray-800"
          >
            <div className="w-full h-56 mb-4 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-10 mt-4 bg-gray-300 rounded dark:bg-gray-600"></div>
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
      <main className="min-h-screen px-6 py-16 bg-gray-50 dark:bg-gray-900">
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-4xl font-extrabold text-center text-transparent sm:text-5xl bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text"
        >
          ❤️ My Wishlist
        </motion.h1>

        {/* Wishlist Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3"
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
                className="relative overflow-hidden transition-all duration-300 bg-white shadow-xl dark:bg-gray-800 rounded-3xl hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Product Image */}
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-64"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Delete Button */}
                <motion.button
                  onClick={() => deleteWishlist(item._id)}
                  whileHover={{ scale: 1.1 }}
                  className="absolute p-2 text-white transition bg-red-500 rounded-full shadow-lg top-3 right-3 hover:bg-red-600"
                  title="Remove from wishlist"
                >
                  🗑
                </motion.button>

                {/* Info Section */}
                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 truncate dark:text-gray-100">
                    {item.name}
                  </h2>
                  <p className="mb-6 text-xl font-semibold text-red-500 dark:text-red-400">
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
