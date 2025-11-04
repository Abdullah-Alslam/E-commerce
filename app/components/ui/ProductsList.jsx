"use client";

import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import FiltersBar from "../Product/FiltersBar";
import HeroSection from "../Product/HeroSection";
import ProductCard from "../Product/ProductCard";
import PaginationControls from "../Product/PaginationControls";
import LoadingSkeleton from "../Product/LoadingSkelton";

export default function ProductsList({ category, title, product, link }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("");

  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Simulated initial loading
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`/api/products/category/${category}`);
      setProducts(res.data || []);
    } catch (e) {
      toast.error("Please check your internet connection");
      console.error("fetchProducts error:", e);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setPage(1);
  }, []);

  // Filter + Sort
  const filtered = useMemo(() => {
    const s = debouncedSearch.toLowerCase().trim();
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;

    return products
      .filter((item) => {
        const matchesSearch = item.name?.toLowerCase().includes(s);
        const price = Number(item.price || 0);
        return matchesSearch && price >= min && price <= max;
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
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Actions
  const addToWishlist = useCallback(async (productItem) => {
    try {
      setActionLoading(true);
      await axios.post("/api/wishlist", {
        productId: productItem._id,
        name: productItem.name,
        price: productItem.price,
        image: productItem.image,
      });
      toast.success("Product added to wishlist");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productItem) => {
    try {
      setActionLoading(true);
      await axios.post("/api/cart", {
        productId: productItem._id,
        name: productItem.name,
        price: productItem.price,
        image: productItem.image,
        quantity: 1,
      });
      toast.success("Product added to cart");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  }, []);

  if (pageLoading) return <LoadingSkeleton />;

  return (
    <main className="pb-16 min-h-screen bg-red-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="fl py-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600">
            {title || product} Collection
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Browse curated {product} — updated and optimized for performance.
          </p>
        </header>

        {/* Hero */}
        <HeroSection
          title={title}
          product={product}
          link={link}
          fetchProducts={fetchProducts}
        />

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <aside className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-100 dark:border-gray-700">
            <FiltersBar
              search={search}
              setSearch={setSearch}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortType={sortType}
              setSortType={setSortType}
              resetFilters={resetFilters}
            />
          </aside>

          {/* Products */}
          <section className="lg:col-span-3 space-y-8">
            {paginated.length === 0 ? (
              <div className="rounded-lg p-8 bg-white dark:bg-gray-800 border border-red-100 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No {product} available
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  <AnimatePresence>
                    {paginated.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.28 }}
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

                <PaginationControls
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
