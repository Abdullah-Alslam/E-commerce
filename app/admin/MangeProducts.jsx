"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  // جلب جميع المنتجات
  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // حذف منتج
  async function handleDelete(id) {
    try {
      await axios.delete(`/api/products/item/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  // بدء التعديل على منتج
  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  }

  // إلغاء التعديل
  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", price: "", category: "", image: "" });
  }

  // تحديث منتج
  async function handleUpdate() {
    try {
      const res = await axios.put(`/api/products/item/${editingId}`, form);
      setProducts(
        products.map((p) => (p._id === editingId ? res.data : p))
      );
      cancelEdit();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 flex-1">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      {/* جدول المنتجات */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">
                <img src={p.image} alt={p.name} className="w-16 mx-auto" />
              </td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="p-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* نموذج التعديل */}
      {editingId && (
        <div className="mt-6 p-4 border rounded bg-gray-50 max-w-md">
          <h3 className="text-xl font-bold mb-4">Edit Product</h3>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="p-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="p-2 bg-gray-400 text-white rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
