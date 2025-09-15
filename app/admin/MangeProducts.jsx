"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleUpDate(id) {
    try {
      const res = await axios.put(`/api/products/${id}`, form);
    } catch (err) {
      console.log(err);
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
              <td className="border p-2">
                {/* تعديل لاحقًا */}
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
    </div>
  );
}
