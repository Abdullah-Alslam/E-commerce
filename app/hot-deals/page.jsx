"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FiltersBar from "../components/Product/FiltersBar";
import ProductCard from "./ProductCard";
import PaginationControls from "../components/Product/PaginationControls";

export default function HotDealsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // 🔥 Fetch Hot Deals
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
      console.error(err);
      toast.error("Failed to load deals 😔");
    } finally {
      setLoading(false);
    }
  }

  // 🔄 Reset Filters
  function resetFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setPage(1);
  }

  // 🔍 Filter and Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        const matchesPrice =
          item.discountedPrice >= min && item.discountedPrice <= max;
        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortType === "price-asc")
          return a.discountedPrice - b.discountedPrice;
        if (sortType === "price-desc")
          return b.discountedPrice - a.discountedPrice;
        if (sortType === "name-asc") return a.name.localeCompare(b.name);
        if (sortType === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, search, minPrice, maxPrice, sortType]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 💖 Add to Wishlist
  async function addToWishlist(product) {
    if (!product?._id) {
      toast.error("Product ID not found!");
      return;
    }

    try {
      await axios.post("/api/wishlist", {
        productId: product._id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image,
      });
      toast.success("Added to wishlist 💖", { icon: "❤️" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist 😢");
    }
  }

  // 🛒 Add to Cart
  async function addToCart(product) {
    if (!product?._id) {
      toast.error("Product ID not found!");
      return;
    }

    try {
      await axios.post("/api/cart", {
        productId: product._id,
        name: product.name,
        price: product.discountedPrice,
        image: product.image,
      });
      toast.success("Added to cart 🛒");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart 😢");
    }
  }

  // 🧱 Render
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* 🔥 Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20 px-6 text-center shadow-lg"
      >
        <h1 className="text-5xl font-extrabold mb-4">🔥 Hot Deals</h1>
        <p className="text-lg mb-6">Grab the best deals before they’re gone!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={fetchHotDeals}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition shadow-md"
        >
          Refresh Deals
        </motion.button>
      </motion.section>

      {/* 💎 Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Filters */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md sticky top-6 h-fit max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl font-semibold mb-4 text-red-500 dark:text-red-400">
            Filter & Search
          </h2>
          <FiltersBar
            {...{
              search,
              setSearch,
              minPrice,
              setMinPrice,
              maxPrice,
              setMaxPrice,
              sortType,
              setSortType,
              resetFilters,
            }}
          />
        </motion.aside>

        {/* 🧩 Products Grid */}
        <div className="flex-1">
          {loading ? (
            // 🔄 Skeleton Loading
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 animate-pulse"
                >
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="mt-4 h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            // 🛍️ Product Cards
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {paginatedProducts.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls {...{ page, totalPages, setPage }} />
          )}
        </div>
      </section>
    </div>
  );
}
