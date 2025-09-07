"use client";

import { useState } from "react";
import DashboardOverview from "./DashBoardOverView";
import ManageProducts from "./products/MangeProducts";
import AddProductForm from "./products/AddProductForm";
import Sidebar from "./Sidebar";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [productView, setProductView] = useState("manage"); // 'add' | 'manage'
  const [products, setProducts] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productView={productView}
        setProductView={setProductView}
      />

      <main className="flex-1 p-8">
        {activeTab === "Dashboard" && <DashboardOverview />}
        {activeTab === "Products" && productView === "add" && (
          <AddProductForm products={products} setProducts={setProducts} />
        )}
        {activeTab === "Products" && productView === "manage" && (
          <ManageProducts products={products} setProducts={setProducts} />
        )}
        {activeTab === "Orders" && <h2>Orders management coming soon.</h2>}
        {activeTab === "Users" && <h2>Users management coming soon.</h2>}
        {activeTab === "Settings" && <h2>Settings coming soon.</h2>}
      </main>
    </div>
  );
}
