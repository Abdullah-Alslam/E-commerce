"use client";

import { useState } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    description: "",
    category: "",
    image: "",
    hotDeal: false,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageUpload(url) {
    setForm({ ...form, image: url });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/products", form);
      toast.success("✅ Product added successfully!");
      setForm({
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        category: "",
        image: "",
        hotDeal: false,
      });
    } catch (err) {
      console.error("❌ Error adding product:", err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-6 flex justify-center items-start bg-gray-100 dark:bg-gray-900 transition-colors duration-500 min-h-screen overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Name */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
                Old Price (optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleChange}
                placeholder="Enter old price"
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="Laptops">Laptops</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Tablets">Tablets</option>
              <option value="Accessories">Accessories</option>
              <option value="Smart Watches">Smart Watches</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short product description..."
              rows={3}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Hot Deal */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="hotDeal"
              checked={form.hotDeal}
              onChange={(e) =>
                setForm({ ...form, hotDeal: e.target.checked })
              }
              className="w-5 h-5 accent-orange-500"
            />
            <span className="text-gray-800 dark:text-gray-300">
              Mark as Hot Deal 🔥
            </span>
          </label>

          {/* Image Upload */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
              Product Image
            </label>
            <ImageUploader onUploadedUrl={handleImageUpload} />
            {form.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full mt-3 flex justify-center overflow-hidden rounded-lg shadow"
              >
                <img
                  src={form.image}
                  alt="Uploaded"
                  className="max-w-full max-h-80 object-contain rounded-lg"
                />
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="mt-2 p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow flex items-center justify-center transition disabled:opacity-70"
          >
            {loading ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Adding Product...</span>
              </motion.div>
            ) : (
              "Add Product"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
