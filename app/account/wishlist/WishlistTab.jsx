"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistCard from "../../wishlist/WishlistCard";

export default function WishlistTab() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [adding, setAdding] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const res = await axios.get("/api/wishlist");
      setWishlist(res.data || []);
    } catch (err) {
      toast.error("Failed to load wishlist ❌");
    } finally {
      setLoading(false);
    }
  }

  // ------------------ ADD TO CART ------------------
  async function addToCart(item) {
    try {
      const data = {
        productId: item.productId || item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      };

      console.log("Sending data:", data);

      const res = await axios.post("/api/cart", data);

      toast.success("Added to cart 🛒");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add to cart ❌");
    }
  }

  // ------------------ DELETE ------------------
  async function deleteWishlist(id) {
    const old = wishlist;

    setWishlist((prev) => prev.filter((item) => item._id !== id));
    setRemoving(id);

    try {
      await axios.delete(`/api/wishlist/${id}`);
      toast.success("Removed from wishlist ❤️");
    } catch {
      toast.error("Failed to remove ❌");
      setWishlist(old);
    } finally {
      setRemoving(null);
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-screen grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3 bg-gray-50 dark:bg-gray-900">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white shadow-md dark:bg-gray-800 rounded-2xl animate-pulse"
          >
            <div className="w-full mb-4 bg-gray-300 h-52 dark:bg-gray-700 rounded-xl"></div>
            <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-10 mt-4 bg-gray-400 rounded dark:bg-gray-600"></div>
          </div>
        ))}
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Your wishlist is empty 💔
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16 bg-gray-50 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-4xl font-extrabold text-center text-transparent sm:text-5xl bg-gradient-to-r from-red-500 to-red-700 bg-clip-text"
      >
        ❤️ My Wishlist
      </motion.h1>

      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 gap-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3"
        >
          {wishlist.map((item) => (
            <WishlistCard
              key={item._id}
              item={item}
              removing={removing}
              adding={adding}
              deleteWishlist={deleteWishlist}
              addToCart={addToCart}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
