"use client";

import axios from "axios";
import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import HeroSection from "../Product/HeroSection";
import ProductCard from "../Product/ProductCard";
import PaginationControls from "../Product/PaginationControls";

export default function ProductsList({ category, title, product, link }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  // Debounce Search Input
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/category/${category}`);
      setProducts(res.data);
    } catch {
      toast.error("Connection failed. Please check your internet.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = useMemo(() => {
    return products
      .filter((item) => {
        const nameMatch = item.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        return nameMatch && item.price >= min && item.price <= max;
      })
      .sort((a, b) => {
        if (sortType === "price-asc") return a.price - b.price;
        if (sortType === "price-desc") return b.price - a.price;
        if (sortType === "name-asc") return a.name.localeCompare(b.name);
        if (sortType === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, debouncedSearch, minPrice, maxPrice, sortType]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const resetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
  };

  const addToWishlist = useCallback(async (product) => {
    try {
      setActionLoading(true);
      await axios.post("/api/wishlist", product);
      toast.success("Added to wishlist");
    } catch {
      toast.error("Failed to add to wishlist");
    } finally {
      setActionLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (product) => {
    try {
      setActionLoading(true);
      await axios.post("/api/cart", product);
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setActionLoading(false);
    }
  }, []);

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <HeroSection
        title={title}
        product={product}
        link={link}
        fetchProducts={fetchProducts}
      />

      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md"
        >
          {/* Search */}
          <div className="flex items-center w-full md:w-auto gap-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${product}...`}
              className="w-full md:w-80 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-red-500 transition-all"
            />
            <span className="text-gray-500 dark:text-gray-400 text-sm">–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-red-500 transition-all"
            />

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-red-500 transition-all"
            >
              <option value="">Sort</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name-asc">Name A→Z</option>
              <option value="name-desc">Name Z→A</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 text-sm font-medium transition-all"
            >
              <RotateCcw size={16} />
              Reset
            </motion.button>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-gray-900 dark:from-red-500 dark:to-gray-100 mt-10 mb-6 text-center"
        >
          {product} Collection
        </motion.h2>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            No {product} found.
          </p>
        ) : (
          <>
            <motion.div
              key={page}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={gridVariants}
            >
              <AnimatePresence>
                {paginated.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0px 8px 20px rgba(255,0,0,0.2)",
                    }}
                    className="rounded-2xl overflow-hidden 
                    bg-gradient-to-b from-gray-50 to-gray-100 
                    dark:from-gray-800 dark:to-gray-700
                    shadow-lg hover:shadow-2xl 
                    border border-gray-200 dark:border-gray-600 
                    transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ProductCard
                      item={item}
                      addToCart={addToCart}
                      addToWishlist={addToWishlist}
                      actionLoading={actionLoading}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="mt-8 flex justify-center">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                setPage={setPage}
                className="flex gap-2"
                buttonClassName="px-3 py-2 rounded-md font-medium transition-colors border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-600"
                activeButtonClassName="bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400"
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
