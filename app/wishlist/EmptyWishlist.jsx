"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ProtectedRoute from "../components/ProtectedRoute";
import WishlistSkeleton from "./WishlistSkeleton";
import EmptyWishlist from "./EmptyWishlist";
import WishlistGrid from "./WishlistGrid";

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
      });

      toast.success("Added to cart 🛒");
    } catch {
      toast.error("Failed to add to cart 😢");
    } finally {
      setAddingToCart(null);
    }
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          ❤️ My Wishlist
        </h1>

        {loading ? (
          <WishlistSkeleton />
        ) : wishlist.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <WishlistGrid
            wishlist={wishlist}
            deleteWishlist={deleteWishlist}
            addToCart={addToCart}
            addingToCart={addingToCart}
          />
        )}
      </main>
    </ProtectedRoute>
  );
}
