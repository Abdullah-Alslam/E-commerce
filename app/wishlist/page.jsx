"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  async function deleteWishlist(id) {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      setWishlist(wishlist.filter((item) => item._id !== id)); // ✅ تحديث القائمة
    } catch (err) {
      console.log("Error deleting wishlist item:", err);
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">
          Your wishlist is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-12 text-gradient bg-clip-text text-transparent bg-blue-500">
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 relative"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />

              {/* Delete Button */}
              <button
                onClick={() => deleteWishlist(item._id)}
                className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition"
              >
                🗑
              </button>

              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-blue-500 transition">
                  {item.name}
                </h2>
                <p className="text-xl font-semibold text-blue-600 mb-4">
                  ${item.price}
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-500 hover:to-blue-500 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
