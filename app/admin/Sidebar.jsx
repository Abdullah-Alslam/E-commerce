"use client";
import { useState } from "react";

export default function Sidebar({ setSection }) {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <button
        className="mb-4 p-2 bg-gray-700 hover:bg-gray-600 rounded"
        onClick={() => setSection("add")}
      >
        Add Product
      </button>
      <button
        className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
        onClick={() => setSection("manage")}
      >
        Manage Products
      </button>
    </div>
  );
 }
