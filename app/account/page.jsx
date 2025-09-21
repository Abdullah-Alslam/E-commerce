"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import AddressesTab from "./AddressesTab";
import WishlistTab from "./WishlistTab";
import SettingsTab from "./SettingsTab";
import SecurityTab from "./SecurityTab";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "addresses" && <AddressesTab />}
          {activeTab === "wishlist" && <WishlistTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "security" && <SecurityTab />}
        </main>
      </div>
    </div>
  );
}
