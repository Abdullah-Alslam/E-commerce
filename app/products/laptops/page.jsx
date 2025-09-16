"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, X } from "lucide-react";
import Link from "next/link";

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState("");
  useEffect(() => {
    fetchLaptops();
  }, []);

  async function fetchLaptops() {
    try {
      const res = await axios.get("/api/products/category/Laptops");
      setLaptops(res.data);
    } catch (err) {
      console.log("Error fetching laptops:", err);
    }
  }

  function resetFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
  }

  const filteredLaptops = laptops.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const matchesPrice = item.price >= min && item.price <= max;

    return matchesSearch && matchesPrice;
  });
  async function addToWishlist(product) {
    try {
      setLoading(true);
      const res = await axios.post("/api/wishlist", {
        productId: product._id,  // من قاعدة بيانات المنتجات
        name: product.name,
        price: product.price,
        image: product.image,
      });
      console.log("✅ تمت الإضافة:", res.data);
      alert("تمت إضافة المنتج إلى المفضلة");
    } catch (err) {
      console.error("❌ خطأ أثناء الإضافة:", err.response?.data || err.message);
      alert("تعذر إضافة المنتج، حاول لاحقًا");
    } finally {
      setLoading(false);
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
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              alt="Laptop"
              className="w-80 h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* البحث */}
          <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-72"
            />
          </div>

          {/* الفلترة */}
          <div className="flex gap-4 items-center">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
            />
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <X size={16} /> Reset
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-blue-500 mb-10">
          Laptops Collection
        </h2>

        {filteredLaptops.length === 0 ? (
          <p className="text-gray-600">No laptops available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredLaptops.map((laptop) => (
              <div
                key={laptop._id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col"
              >
                {/* صورة المنتج مع الرابط */}
                <Link href={`/products/${laptop._id}`}>
                  {laptop.image ? (
                    <img
                      src={laptop.image}
                      alt={laptop.name}
                      className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                  )}
                </Link>

                {/* اسم المنتج مع الرابط */}
                <Link
                  href={`/products/${laptop._id}`}
                  className="hover:underline"
                >
                  <h3 className="text-lg font-semibold mb-1">{laptop.name}</h3>
                </Link>

                {/* السعر */}
                <p className="text-blue-600 font-bold mb-3">${laptop.price}</p>

                {/* Actions */}
                <div className="flex justify-between mt-auto">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    className="p-2 bg-gray-200 text-red-500 rounded-full hover:bg-red-400 hover:text-white transition"
                    onClick={() => addToWishlist(laptop)}
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
