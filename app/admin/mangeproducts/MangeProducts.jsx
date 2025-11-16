"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditProductForm from "./EditProductForm";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch products from API
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

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Start editing a product
  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    });
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

  // Filter products based on search
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full shadow-lg"
        ></motion.div>
        <motion.p className="mt-6 text-lg text-gray-700 dark:text-gray-300 font-medium">
          Loading products...
        </motion.p>
      </motion.div>
    );

  return (
    <motion.div
      className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ToastContainer position="bottom-right" autoClose={2500} />

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Manage Products
      </h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full max-w-md"
      />

      {/* Edit Product Form */}
      <AnimatePresence>
        {editingId && (
          <EditProductForm
            form={form}
            setForm={setForm}
            handleUpdate={handleUpdate}
            cancelEdit={cancelEdit}
          />
        )}
      </AnimatePresence>

      {/* Product Table */}
      {!editingId && (
        <>
          <ProductTable
            products={currentProducts}
            startEdit={startEdit}
            handleDelete={handleDelete}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </motion.div>
  );
}
