"use client";

import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import FiltersBar from "./FiltersBar";
import HeroSection from "./HeroSection";
import ProductCard from "./ProductCard";
import PaginationControls from "./PaginationControls";
import LoadingSkeleton from "./LoadingSkelton";

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
  const itemsPerPage = 8;

  // Skeleton Loading
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Debounce Search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  // Fetch products by category
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`/api/products/category/${category}`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("fetchProducts error:", err);
      toast.error("Please check your internet connection");
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setPage(1);
  }, []);

  // Filter & Sort
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

  // 🩶 Add to Wishlist
  const addToWishlist = useCallback(async (item) => {
    if (!item?._id) {
      toast.error("Product ID not found!");
      return;
    }

    try {
      setActionLoading(true);
      await axios.post("/api/wishlist", {
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
      });

      toast.success("Added to wishlist ❤️", { icon: "💖" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    } finally {
      setActionLoading(false);
    }
  }, []);

  // 🛒 Add to Cart
  const addToCart = useCallback(async (item) => {
    if (!item?._id) {
      toast.error("Product ID not found!");
      return;
    }

    try {
      setActionLoading(true);
      await axios.post("/api/cart", {
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      toast.success("Product added to cart 🛒");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  }, []);

  if (pageLoading) return <LoadingSkeleton />;

  return (
    <main className="min-h-screen pb-16 text-gray-900 transition-colors duration-300 bg-red-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6 text-center fl sm:text-left">
          <h1 className="text-2xl font-extrabold text-red-600 sm:text-3xl">
            {title || product} Collection
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Browse curated {product} — updated and optimized for performance.
          </p>
        </header>

        {/* Hero Section */}
        <HeroSection
          title={title}
          product={product}
          link={link}
          fetchProducts={fetchProducts}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-4">
          {/* Filters */}
          <aside className="p-4 bg-white border border-red-100 rounded-lg lg:col-span-1 dark:bg-gray-800 dark:border-gray-700">
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
          <section className="space-y-8 lg:col-span-3">
            {paginated.length === 0 ? (
              <div className="p-8 text-center bg-white border border-red-100 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">
                  plaese wait to see {product}
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
