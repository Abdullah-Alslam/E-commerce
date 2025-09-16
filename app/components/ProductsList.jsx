"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, X } from "lucide-react";
import Link from "next/link";

export default function ProductsList(props) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`/api/products/category/${props.category}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching Products:", err);
    }
  }

  function resetFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setPage(1); // reset to first page
  }

  // Filters + Sort
  const filteredProducts = products
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      const matchesPrice = item.price >= min && item.price <= max;
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "name-asc") return a.name.localeCompare(b.name);
      if (sortType === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProfilteredProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Add to Wishlist
  async function addToWishlist(product) {
    try {
      setLoading(true);
      const res = await axios.post("/api/wishlist", {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      console.log("✅ Added to wishlist:", res.data);
      alert("Product added to wishlist");
    } catch (err) {
      console.error("❌ Error adding to wishlist:", err);
      alert("Failed to add product, please try again");
    } finally {
      setLoading(false);
    }
  }

  // Add to Cart
  async function addToCart(product) {
    try {
      setLoading(true);
      const res = await axios.post("/api/cart", {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      console.log("✅ Added to cart:", res.data);
      alert("Product added to cart");
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Failed to add product, please try again");
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
            <h1 className="text-5xl font-bold mb-4">{props.title}</h1>
            <p className="text-gray-200 mb-6 text-lg">
              Browse high-performance {props.product} for work, gaming, and study.
            </p>
            <button
              onClick={fetchProducts}
              className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded hover:opacity-90 transition"
            >
              Show {props.product}
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={props.link}
              alt={props.title}
              className="w-80 h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Search, Filter & Sort Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Search */}
          <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-72"
            />
          </div>

          {/* Filters */}
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

            {/* Sorting Dropdown */}
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <X size={16} /> Reset
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-blue-500 mb-10">
          {props.product} Collection
        </h2>

        {paginatedProfilteredProducts.length === 0 ? (
          <p className="text-gray-600">No {props.product} available</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProfilteredProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col"
                >
                  {/* Product Image */}
                  <Link href={`/products/${item._id}`}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                    )}
                  </Link>

                  {/* Product Name */}
                  <Link href={`/products/${item._id}`} className="hover:underline">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  </Link>

                  {/* Product Price */}
                  <p className="text-blue-600 font-bold mb-3">${item.price}</p>

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-auto">
                    <button
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart size={18} />
                    </button>
                    <button
                      className="p-2 bg-gray-200 text-red-500 rounded-full hover:bg-red-400 hover:text-white transition"
                      onClick={() => addToWishlist(item)}
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="font-semibold text-blue-600">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
