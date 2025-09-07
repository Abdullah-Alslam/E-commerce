"use client";

import { useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

export default function AddProductForm({ products, setProducts }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "laptops",
    image: null,
    specs: "",
  });

  async function handleAddProduct(e) {
    e.preventDefault();
    if (!form.image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("specs", form.specs);
    formData.append("image", form.image);

    try {
      const res = await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newProduct = res.data;
      if (!newProduct.error) {
        setProducts([...products, newProduct]);
        setForm({ name: "", price: "", category: "laptops", image: null, specs: "" });
      }
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add product. Check server logs.");
    }
  }

  return (
    <form onSubmit={handleAddProduct} className="bg-white p-6 rounded shadow w-full max-w-lg">
      <h3 className="text-xl font-bold mb-4">Add New Product</h3>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="p-2 border rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <select
          className="p-2 border rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="laptops">Laptops</option>
          <option value="mobiles">Mobiles</option>
          <option value="tablets">Tablets</option>
          <option value="smart watches">Smart Watches</option>
          <option value="accessories">Accessories</option>
        </select>
        <input
          type="file"
          accept="image/*"
          className="p-2 border rounded"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <textarea
          placeholder="Specifications"
          rows={4}
          className="p-2 border rounded"
          value={form.specs}
          onChange={(e) => setForm({ ...form, specs: e.target.value })}
        ></textarea>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold flex items-center justify-center gap-2"
        >
          <FiEdit /> Add Product
        </button>
      </div>
    </form>
  );
}
