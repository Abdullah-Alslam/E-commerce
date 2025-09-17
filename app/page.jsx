"use client";
import axios from "axios";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [deals, setDeals] = useState([]);

  async function handleDeals() {
    try {
      const res = await axios.get("/api/hot-deals");
      setDeals(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-400 to-purple-500 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Up to 50% Off</h1>
        <p className="text-lg mb-6">Limited Time Deals on Top Products</p>
        <Link href="/hot-deals">
          <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg shadow hover:opacity-90 transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* 2. Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["Laptops", "Mobiles", "Tablets"].map((cat, i) => (
            <Link
              key={i}
              href={`/category/${cat.toLowerCase()}`}
              className="bg-white rounded-xl shadow hover:shadow-lg p-8 flex items-center justify-center text-xl font-semibold"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Hot Deals */}
      <section className="bg-red-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">🔥 Hot Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {deals.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow p-4 text-center">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">Product {i}</h3>
              <p className="text-gray-400 line-through">{item.price }</p>
              <p className="text-red-500 font-bold">$120 (40% Off)</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          ⭐ Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 text-center">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">Best Seller {i}</h3>
              <p className="text-blue-600 font-bold">$300</p>
              <div className="flex justify-center text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="gold" stroke="gold" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. New Arrivals */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          🆕 New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 text-center">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">New Product {i}</h3>
              <p className="text-blue-600 font-bold">$250</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Promotional Banner */}
      <section className="bg-yellow-300 py-12 text-center text-gray-900">
        <h2 className="text-2xl font-bold">
          Free Shipping on Orders Over $100 🚚
        </h2>
      </section>

      {/* 7. Customer Reviews */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 text-center">
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

      {/* 8. Newsletter */}
      <section className="bg-blue-400 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Subscribe for the Latest Deals
        </h2>
        <p className="mb-6">
          Get updates on sales, new arrivals, and special offers.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-lg w-64 text-gray-900"
          />
          <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-r-lg hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
