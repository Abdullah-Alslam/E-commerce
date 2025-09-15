"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/api/products/item/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">Loading product...</p>
    );

  const images = product.images || [product.image]; // array of images

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* Carousel */}
      <div className="relative w-full mb-8">
        <img
          src={images[currentImage]}
          alt={product.name}
          className="w-full h-[450px] object-cover rounded-xl shadow-lg"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <p className="text-gray-500">Category: {product.category}</p>

          {/* Tabs */}
          <div className="flex gap-4 mt-6 border-b">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-2 ${
                activeTab === "description" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-2 ${
                activeTab === "specs" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
              }`}
            >
              Specs
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-2 ${
                activeTab === "reviews" ? "border-b-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500"
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="mt-4 text-gray-700">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "specs" && (
              <ul className="list-disc list-inside">
                <li>High performance laptop</li>
                <li>Fast processor and RAM</li>
                <li>Lightweight and portable</li>
                <li>Long battery life</li>
              </ul>
            )}
            {activeTab === "reviews" && <p>No reviews yet.</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-red-500 px-6 py-3 rounded-lg hover:bg-red-400 hover:text-white transition">
              <Heart size={18} /> Add to Wishlist
            </button>
          </div>
        </div>

        {/* Side Image / Placeholder */}
        <div className="flex-1 hidden md:flex justify-center items-center">
          <img
            src={images[currentImage]}
            alt={product.name}
            className="w-72 h-72 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Floating Buy Button */}
      <button className="fixed bottom-6 right-6 flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition z-50">
        <ShoppingCart size={18} /> Buy Now
      </button>
    </div>
  );
}
