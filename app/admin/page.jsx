"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [view, setView] = useState("add"); // add | edit
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    specs: "",
  });

  // fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newProduct = await res.json();
    if (!newProduct.error) {
      setProducts([...products, newProduct]);
      setForm({ name: "", price: "", category: "", image: "", specs: "" });
    }
  };

  // delete product
  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-red-600 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
        <button
          onClick={() => setView("add")}
          className={`mb-3 p-2 rounded text-left font-semibold ${
            view === "add"
              ? "bg-white text-red-600"
              : "hover:bg-red-500 text-white"
          }`}
        >
          ➕ Add Product
        </button>
        <button
          onClick={() => setView("edit")}
          className={`p-2 rounded text-left font-semibold ${
            view === "edit"
              ? "bg-white text-red-600"
              : "hover:bg-red-500 text-white"
          }`}
        >
          ✏️ Manage Products
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        {view === "add" && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-10 rounded-lg shadow-lg w-[500px]"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-6 text-center">
              Add New Product
            </h2>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Product Name"
                className="p-3 rounded bg-gray-700 focus:outline-red-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="p-3 rounded bg-gray-700 focus:outline-red-500"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                className="p-3 rounded bg-gray-700 focus:outline-red-500"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-3 rounded bg-gray-700 focus:outline-red-500"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <textarea
                placeholder="Specifications"
                rows={5}
                className="p-3 rounded bg-gray-700 focus:outline-red-500"
                value={form.specs}
                onChange={(e) => setForm({ ...form, specs: e.target.value })}
              ></textarea>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold text-white"
              >
                ➕ Add Product
              </button>
            </div>
          </form>
        )}

        {view === "edit" && (
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-[800px]">
            <h2 className="text-2xl font-bold text-red-400 mb-6 text-center">
              Manage Products
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-red-400">
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-gray-700">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">${p.price}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">
                      <button className="bg-red-600 px-3 py-1 rounded mr-2 hover:bg-red-700">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
