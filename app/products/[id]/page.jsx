"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion, useReducedMotion } from "framer-motion";

import ImageCarousel from "./ImageCarousel";
import ProductHeader from "./ProductHeader";
import ProductTabs from "./ProductTabs";
import ProductActions from "./ProductActions";
import ProductAside from "./ProductAside";

export default function ProductDetail({ params }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams?.id;

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const prefersReducedMotion = useReducedMotion();

  // Fetch product
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        const res = await axios.get(`/api/products/item/${id}`, {
          signal: controller.signal,
        });
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
    return () => controller.abort();
  }, [id]);

  const images = useMemo(
    () =>
      product
        ? product.images?.length
          ? product.images
          : [product.image]
        : [],
    [product]
  );

  const formatPrice = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  const addToCart = useCallback(async () => {
    try {
      await axios.post("/api/cart", { productId: product._id, quantity: 1 });
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  }, [product]);

  const addToWishlist = useCallback(async (item) => {
    try {
      await axios.post("/api/wishlist", {
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  }, []);

  if (loading || !product)
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-300 rounded-xl" />
          <div className="h-6 w-3/4 bg-gray-300 rounded-md" />
        </div>
      </div>
    );

  return (
    <article className="max-w-6xl mx-auto p-6">
      {/* Carousel */}
      <ImageCarousel
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      {/* Product Content */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-b
      from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-md"
      >
        <div className="flex flex-col gap-4">
          <ProductHeader product={product} formatPrice={formatPrice} />
          <ProductTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
          />
          <ProductActions
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            product={product}
          />
        </div>

        <ProductAside
          product={product}
          images={images}
          currentImage={currentImage}
        />
      </section>

      {/* Floating Buy Button */}
      <Link href="/purchaseUnavailable">
        <motion.button
          whileHover={!prefersReducedMotion ? { scale: 1.03 } : {}}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-red-500 
          text-white px-6 py-3 rounded-full shadow-lg"
        >
          Buy Now
        </motion.button>
      </Link>
    </article>
  );
}
