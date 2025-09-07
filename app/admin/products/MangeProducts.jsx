"use client";

import { FiEdit, FiTrash } from "react-icons/fi";
import axios from "axios";

export default function ManageProducts({ products, setProducts }) {
  async function handleDeleteProduct(id) {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  }

  return (
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
                  <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded flex items-center">
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
  );
}
