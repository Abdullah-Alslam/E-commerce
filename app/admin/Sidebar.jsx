"use client";
import { useState } from "react";
import { LayoutDashboard, PlusCircle, Boxes } from "lucide-react";

export default function Sidebar({ setSection }) {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col p-5 shadow-lg">
      {/* العنوان */}
      <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h2>

      {/* الأزرار */}
      <nav className="flex flex-col gap-4">
        <button
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          onClick={() => setSection("dashboard")}
        >
          <LayoutDashboard className="w-5 h-5 text-indigo-400" />
          <span className="font-medium">Dashboard</span>
        </button>

        <button
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          onClick={() => setSection("add")}
        >
          <PlusCircle className="w-5 h-5 text-green-400" />
          <span className="font-medium">Add Product</span>
        </button>

        <button
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          onClick={() => setSection("manage")}
        >
          <Boxes className="w-5 h-5 text-yellow-400" />
          <span className="font-medium">Manage Products</span>
        </button>
      </nav>

      {/* مساحة سفلية (اختياري) */}
      <div className="mt-auto pt-6 border-t border-gray-700 text-sm text-gray-400">
        © 2025 Your Store
      </div>
    </aside>
  );
}
