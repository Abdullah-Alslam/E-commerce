"use client";

import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import axios from "axios";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // المنتج الجاري تعديله
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  function startEdit(product) {
    setEditingProduct(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageUpload(url) {
    setForm({ ...form, image: url });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/products/${editingProduct}`, form);
      const updated = res.data;
      setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
      setEditingProduct(null);
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    }
  }

  return (
    <div className="p-4 flex-1">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
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
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => startEdit(p)}
                  className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-400"
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
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-96"
          >
            <h3 className="text-xl font-bold mb-2">Edit Product</h3>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="p-2 border rounded"
            />
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
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 border rounded"
            />
            <ImageUploader onUploadedUrl={handleImageUpload} />
            {form.image && (
              <img src={form.image} alt="Uploaded" className="w-32 mt-2" />
            )}
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-2 bg-gray-400 text-white rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
