"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import ProtectedRout from "./components/ProtectedRoute"
export default function HomePage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  async function fetchDeals() {
    try {
      const res = await axios.get("/api/hot-deals");
      setDeals(res.data);
    } catch (err) {
      console.error("Error fetching deals:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRout>
    <div className="bg-gray-50 text-gray-900">
      {/* 1️⃣ Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow">
          Up to 50% Off
        </h1>
        <p className="text-lg mb-6 opacity-90">
          Limited Time Deals on Top Products
        </p>
        <Link href="/hot-deals">
          <button className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-xl shadow hover:scale-105 hover:shadow-lg transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* 2️⃣ Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["Laptops", "Mobiles", "Tablets"].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 flex items-center justify-center text-xl font-semibold hover:-translate-y-1 transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* 3️⃣ Hot Deals */}
      <section className="bg-gradient-to-b from-red-50 to-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">🔥 Hot Deals</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading deals...</p>
        ) : deals.length === 0 ? (
          <p className="text-center text-gray-500">No deals available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {deals.map((item, i) => (
              <div
                key={item._id || i}
                className="bg-white rounded-2xl shadow hover:shadow-xl p-4 text-center transition hover:-translate-y-1"
              >
                {/* صورة المنتج */}
                <div className="h-44 bg-gray-200 rounded mb-4 flex items-center justify-center">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name || "Product"}
                    className="max-h-40 object-cover rounded"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-2">
                  {item.name || `Product ${i + 1}`}
                </h3>
                <p className="text-gray-400 line-through">
                  ${item.oldPrice || item.price}
                </p>
                <p className="text-red-500 font-bold text-xl">
                  ${item.newPrice || 120} (40% Off)
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4️⃣ Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">⭐ Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-xl transition hover:-translate-y-1"
            >
              <div className="h-44 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">Best Seller {i}</h3>
              <p className="text-blue-600 font-bold mb-2">$300</p>
              <div className="flex justify-center text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="gold" stroke="gold" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ New Arrivals */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">🆕 New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-xl transition hover:-translate-y-1"
            >
              <div className="h-44 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">New Product {i}</h3>
              <p className="text-blue-600 font-bold">$250</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6️⃣ Promotional Banner */}
      <section className="bg-yellow-300 py-12 text-center text-gray-900">
        <h2 className="text-2xl font-bold">
          Free Shipping on Orders Over $100 🚚
        </h2>
      </section>

      {/* 7️⃣ Customer Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-xl transition hover:-translate-y-1"
            >
              <p className="italic mb-4">
                "This store is amazing! Great quality and fast delivery."
              </p>
              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="gold" stroke="gold" />
                ))}
              </div>
              <h3 className="font-semibold">Customer {i}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 8️⃣ Newsletter */}
      <section className="bg-blue-500 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Subscribe for the Latest Deals
        </h2>
        <p className="mb-6 opacity-90">
          Get updates on sales, new arrivals, and special offers.
        </p>
        <div className="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-xl w-64 text-gray-900 focus:outline-none"
          />
          <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-r-xl hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </section>
      </div>
      </ProtectedRout>
  );
}
