"use client";

import { useEffect, useState } from "react";
import Hero from "./components/home/Hero";
import NewsTicker from "./components/home/NewsTicker";
import Categories from "./components/home/Categories";
import HotDeals from "./components/home/HotDeals";
import LoadingSkeleton from "./components/home/LoadingSkeleton";
import NewProducts from "./components/home/NewProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <main className="min-h-screen pb-16 transition-colors duration-300 bg-white dark:bg-gray-900">
      <ToastContainer position="top-center" autoClose={2000} />
      <Hero />
      <NewsTicker />
      <Categories />
      <NewProducts />
      <HotDeals />
    </main>
  );
}
