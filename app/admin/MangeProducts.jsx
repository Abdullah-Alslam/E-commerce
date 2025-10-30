"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch products
  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products 😢");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Delete product
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/item/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("🗑️ Product deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete product");
      console.log(err);
    }
  }

  // Start edit
  function startEdit(product) {
    setEditingId(product._id);
    setForm({ name: product.name, price: product.price, category: product.category, image: product.image });
  }

  // Cancel edit
  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", price: "", category: "", image: "" });
  }

  // Update product
  async function handleUpdate() {
    try {
      const res = await axios.put(`/api/products/item/${editingId}`, form);
      setProducts(products.map((p) => (p._id === editingId ? res.data : p)));
      toast.success("✅ Product updated successfully!");
      cancelEdit();
    } catch (err) {
      toast.error("Failed to update product");
      console.log(err);
    }
  }

  useEffect(() => { fetchProducts(); }, []);

  // Filtered products based on search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading)
    return (
      <motion.div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full shadow-lg"></motion.div>
        <motion.p className="mt-6 text-lg text-gray-700 dark:text-gray-300 font-medium">Loading products...</motion.p>
      </motion.div>
    );

  return (
    <motion.div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <ToastContainer position="bottom-right" autoClose={2500} />

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        className="mb-4 p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full max-w-md"
      />

      <AnimatePresence>
        {editingId && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow max-w-md mx-auto"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Product</h3>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">Save</button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-300">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!editingId && (
        <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentProducts.map((p) => (
                  <motion.tr key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <td className="px-4 py-2">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg shadow mx-auto" />
                    </td>
                    <td className="px-4 py-2 font-medium">{p.name}</td>
                    <td className="px-4 py-2">${p.price}</td>
                    <td className="px-4 py-2">{p.category}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => startEdit(p)} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500">Edit</motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500">Delete</motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!editingId && totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`px-3 py-1 rounded-md text-sm font-medium transition ${currentPage === idx + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"}`}>
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
