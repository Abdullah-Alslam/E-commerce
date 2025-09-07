"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState([]);

  // إذا بدك تجيب المنتجات مباشرة عند تحميل الصفحة
  useEffect(() => {
    fetchLaptops();
  }, []);

  async function fetchLaptops() {
    try {
      const res = await axios.get("/api/products/category");
      console.log("API response:", res.data);
      setLaptops(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-300 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Our Latest Laptops</h1>
            <p className="text-gray-200 mb-6 text-lg">
              Browse high-performance laptops for work, gaming, and study.
            </p>
            <button
              onClick={fetchLaptops}
              className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded hover:opacity-90 transition"
            >
              Show Laptops
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-80 h-80 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Laptop Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-500 mb-10">
          Laptops Collection
        </h2>
        {laptops.length === 0 ? (
          <p className="text-gray-600">No laptops available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {laptops.map((laptop, idx) => (
              <div
                key={idx}
                className="bg-white hover:bg-yellow-400 transition rounded-xl p-4 flex flex-col items-center shadow-md"
              >
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <h3 className="text-lg font-semibold mb-1">{laptop.name}</h3>
                <p className="text-gray-700 mb-2">${laptop.price}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Free Shipping", desc: "On all laptops over $1000" },
            { title: "24/7 Support", desc: "We are here to help" },
            { title: "Secure Payment", desc: "100% secure payment" },
          ].map((f, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-blue-500">
                {f.title}
              </h3>
              <p className="text-gray-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
