"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiUser, FiBox, FiShoppingCart, FiSettings, FiGrid } from "react-icons/fi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [productView, setProductView] = useState("manage"); // 'add' | 'manage'
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "laptops",
    image: null,
    specs: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (activeTab === "Products" && productView === "manage") fetchProducts();
  }, [activeTab, productView]);

  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products/category");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  }

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
        setProductView("manage");
      }
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add product. Check server logs.");
    }
  }

  async function handleDeleteProduct(id) {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  }

  async function handleUpdateProduct(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", editingProduct.name);
      formData.append("price", editingProduct.price);
      formData.append("category", editingProduct.category);
      formData.append("specs", editingProduct.specs);
      if (editingProduct.image instanceof File) {
        formData.append("image", editingProduct.image);
      }

      const res = await axios.put(`/api/products/${editingProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedProduct = res.data;
      setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
      setEditingProduct(null);
    } catch (err) {
      console.log("❌ Error updating product:", err);
      alert("Failed to update product. Check server logs.");
    }
  }

  const sidebarItems = [
    { name: "Dashboard", icon: <FiGrid size={24} /> },
    { name: "Products", icon: <FiBox size={24} /> },
    { name: "Orders", icon: <FiShoppingCart size={24} /> },
    { name: "Users", icon: <FiUser size={24} /> },
    { name: "Settings", icon: <FiSettings size={24} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        {sidebarItems.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`mb-3 p-3 rounded text-left font-semibold hover:bg-gray-700 flex items-center gap-2 ${
              activeTab === tab.name ? "bg-red-600" : ""
            }`}
          >
            <span className="text-red-500">{tab.icon}</span> {tab.name}
          </button>
        ))}

        {/* Product sub-tabs */}
        {activeTab === "Products" && (
          <div className="ml-4 mt-2 flex flex-col gap-2">
            <button
              onClick={() => setProductView("add")}
              className={`p-2 rounded text-left font-medium hover:bg-gray-700 ${
                productView === "add" ? "bg-red-600" : ""
              }`}
            >
              Add Product
            </button>
            <button
              onClick={() => setProductView("manage")}
              className={`p-2 rounded text-left font-medium hover:bg-gray-700 ${
                productView === "manage" ? "bg-red-600" : ""
              }`}
            >
              Manage Products
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "Dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
            <p>Welcome to the admin panel. Use the sidebar to navigate between sections.</p>
          </div>
        )}

        {/* Add Product */}
        {activeTab === "Products" && productView === "add" && (
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
        )}

        {/* Manage Products */}
        {activeTab === "Products" && productView === "manage" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow overflow-hidden">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Specs</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="border-b">
                      <td className="p-2">
                        {p.image ? (
                          <img
                            src={`data:image/jpeg;base64,${Buffer.from(p.image.data).toString("base64")}`}
                            alt={p.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">${p.price}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.specs}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded flex items-center"
                        >
                          <FiEdit className="mr-1" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded flex items-center"
                        >
                          <FiTrash className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleUpdateProduct}
              className="bg-white p-6 rounded shadow max-w-lg w-full"
            >
              <h3 className="text-xl font-bold mb-4">Edit Product</h3>
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="p-2 border rounded mb-3 w-full"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="p-2 border rounded mb-3 w-full"
              />
              <select
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="p-2 border rounded mb-3 w-full"
              >
                <option value="laptops">Laptops</option>
                <option value="mobiles">Mobiles</option>
                <option value="tablets">Tablets</option>
                <option value="smart watches">Smart Watches</option>
                <option value="accessories">Accessories</option>
              </select>
              <textarea
                value={editingProduct.specs}
                onChange={(e) => setEditingProduct({ ...editingProduct, specs: e.target.value })}
                rows={4}
                className="p-2 border rounded mb-3 w-full"
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] })}
                className="mb-3"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "Orders" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Orders</h2>
            <p>Orders management coming soon.</p>
          </div>
        )}

        {activeTab === "Users" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Users</h2>
            <p>
              <FiUser className="inline mr-2" />
              Users management coming soon.
            </p>
          </div>
        )}

        {activeTab === "Settings" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <p>Settings coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
