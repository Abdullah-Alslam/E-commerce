"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus, Minus, X } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on mount
  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      setLoading(true);
      const res = await axios.get("/api/cart");
      setCart(res.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }

  // Remove item from cart
  async function removeFromCart(id) {
    try {
      await axios.delete(`/api/cart/${id}`);
      setCart(cart.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  }

  // Update quantity
  async function updateQuantity(id, delta) {
    const item = cart.find((i) => i._id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    try {
      await axios.put(`/api/cart/${id}`, { quantity: newQuantity });
      setCart(
        cart.map((i) =>
          i._id === id ? { ...i, quantity: newQuantity } : i
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-12 text-gradient bg-clip-text text-transparent bg-blue-500">
          My Cart
        </h1>

        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row items-center md:justify-between transition hover:scale-105 duration-300"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-cover rounded-xl mb-4 md:mb-0 md:mr-6"
              />

              {/* Product Details */}
              <div className="flex-1 flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition">
                    {item.name}
                  </h2>
                  <p className="text-xl font-semibold text-blue-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    onClick={() => updateQuantity(item._id, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold text-lg">{item.quantity}</span>
                  <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    onClick={() => updateQuantity(item._id, 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Checkout */}
        <div className="mt-10 flex justify-end items-center gap-6">
          <p className="text-2xl font-bold">
            Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-500 hover:to-blue-500 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
