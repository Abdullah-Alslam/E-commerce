"use client";

import { useState } from "react";
import axios from "axios";
import ImageUploader from "./ImageUploader";

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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageUpload(url) {
    setForm({ ...form, image: url });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/products", form);
      alert("✅ Product added successfully!");
      // Reset form after adding
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
      console.log("❌ Error adding product:", err);
      alert("Failed to add product");
    }
  }

  return (
    <div className="p-4 flex-1">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
        {/* Product Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="p-2 border rounded"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="p-2 border rounded"
        />

        {/* Old Price */}
        <input
          type="number"
          name="oldPrice"
          value={form.oldPrice}
          onChange={handleChange}
          placeholder="Old Price (optional)"
          className="p-2 border rounded"
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Laptops">Laptops</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Tablets">Tablets</option>
          <option value="Accessories">Accessories</option>
          <option value="Smart Watches">Smart Watches</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded"
        />

        {/* Hot Deal Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hotDeal"
            checked={form.hotDeal}
            onChange={(e) =>
              setForm({ ...form, hotDeal: e.target.checked })
            }
          />
          Mark as Hot Deal 🔥
        </label>

        {/* Image Upload */}
        <ImageUploader onUploadedUrl={handleImageUpload} />
        {form.image && (
          <img src={form.image} alt="Uploaded" className="w-32 mt-2 mx-auto" />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
