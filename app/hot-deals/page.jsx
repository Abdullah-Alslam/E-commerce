"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HotDealsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination states (Frontend only)
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchHotDeals();
  }, []);

  async function fetchHotDeals() {
    try {
      setLoading(true);
      const res = await axios.get("/api/hot-deals");
      const productsWithDiscount = res.data.map((item) => ({
        ...item,
        discountedPrice: item.discount
          ? item.price - item.price * (item.discount / 100)
          : item.price,
      }));
      setProducts(productsWithDiscount);
    } catch (err) {
      console.error("Error fetching Hot Deals:", err);
    } finally {
      setLoading(false);
    }
  }

  function resetFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setPage(1);
  }

  // Filters + Sort
  const filteredProducts = products
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      const matchesPrice =
        item.discountedPrice >= min && item.discountedPrice <= max;
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortType === "price-asc") return a.discountedPrice - b.discountedPrice;
      if (sortType === "price-desc") return b.discountedPrice - a.discountedPrice;
      if (sortType === "name-asc") return a.name.localeCompare(b.name);
      if (sortType === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  // Pagination logic (frontend only)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  async function addToWishlist(product) {
    try {
      setLoading(true);
      await axios.post("/api/wishlist", {
        productId: product._id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image,
      });
      alert("Product added to wishlist");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  async function addToCart(product) {
    try {
      setLoading(true);
      await axios.post("/api/cart", {
        productId: product._id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image,
      });
      alert("Product added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">🔥 Hot Deals</h1>
        <p className="text-lg mb-6">Grab the best deals before they are gone!</p>
        <button
          onClick={fetchHotDeals}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition shadow-md"
        >
          Refresh Deals
        </button>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search hot deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-full md:w-72 bg-white dark:bg-gray-800"
          />

          {/* Filters & Sort */}
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-32 bg-white dark:bg-gray-800"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-32 bg-white dark:bg-gray-800"
            />
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white dark:bg-gray-800"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No hot deals available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col relative"
              >
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded font-bold shadow">
                  🔥 Hot Deal
                </div>

                <Link href={`/products/${item._id}`}>
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                </Link>

                <Link href={`/products/${item._id}`} className="hover:underline">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                </Link>

                <div className="mb-3">
                  <p className="text-gray-400 line-through">${item.price}</p>
                  <p className="text-red-500 font-bold">
                    ${item.discountedPrice} (
                    {Math.round(
                      ((item.price - item.discountedPrice) / item.price) * 100
                    )}
                    % Off)
                  </p>
                </div>

                <div className="flex justify-between mt-auto">
                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingCart size={18} />
                  </button>
                  <button
                    className="p-2 bg-gray-200 dark:bg-gray-700 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition"
                    onClick={() => addToWishlist(item)}
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-semibold text-red-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
