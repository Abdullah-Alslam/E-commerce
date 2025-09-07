"use client";

import { FiUser, FiBox, FiShoppingCart, FiSettings, FiGrid } from "react-icons/fi";

export default function Sidebar({ activeTab, setActiveTab, productView, setProductView }) {
  const sidebarItems = [
    { name: "Dashboard", icon: <FiGrid size={22} /> },
    { name: "Products", icon: <FiBox size={22} /> },
    { name: "Orders", icon: <FiShoppingCart size={22} /> },
    { name: "Users", icon: <FiUser size={22} /> },
    { name: "Settings", icon: <FiSettings size={22} /> },
  ];

  return (
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
  );
}
