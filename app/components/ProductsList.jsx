"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import FiltersBar from "./Product/FiltersBar";
import LoadingScreen from "./Product/LoadingScreen";
import HeroSection from "./Product/HeroSection";
import ProductCard from "./Product/ProductCard";
import PaginationControls from "./Product/PaginationControls";

export default function ProductsList({ category, title, product, link }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortType, setSortType] = useState("");

  const [pageLoading, setPageLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`/api/products/category/${category}`);
      setProducts(res.data);
    } catch {
      toast.error("Please check your internet connection");
    }
  }

  function resetFilters() {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setPage(1);
  }

  const filtered = products
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      return matchesSearch && item.price >= min && item.price <= max;
    })
    .sort((a, b) => {
      if (sortType === "price-asc") return a.price - b.price;
      if (sortType === "price-desc") return b.price - a.price;
      if (sortType === "name-asc") return a.name.localeCompare(b.name);
      if (sortType === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  async function addToWishlist(product) {
    try {
      setActionLoading(true);
      await axios.post("/api/wishlist", product);
      toast.success("Product added to wishlist");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  }

  async function addToCart(product) {
    try {
      setActionLoading(true);
      await axios.post("/api/cart", product);
      toast.success("Product added to cart");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setActionLoading(false);
    }
  }

  if (pageLoading) return <LoadingScreen />;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <HeroSection
        title={title}
        product={product}
        link={link}
        fetchProducts={fetchProducts}
      />

      <section className="max-w-7xl mx-auto px-6 py-10">
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

        <h2 className="text-3xl font-bold text-blue-500 mb-10">
          {product} Collection
        </h2>

        {paginated.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No {product} available</p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              <AnimatePresence>
                {paginated.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
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
  );
}
