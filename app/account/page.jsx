"use client";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl flex overflow-hidden">
        
        {/* القائمة الجانبية */}
        <aside className="w-64 bg-gray-100 border-r p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">My Account</h2>
          <ul className="space-y-3">
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === "profile" ? "bg-sky-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Info
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === "orders" ? "bg-sky-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === "addresses" ? "bg-sky-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === "wishlist" ? "bg-sky-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === "settings" ? "bg-sky-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg ${
                activeTab === "security" ? "bg-sky-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </li>
          </ul>
        </aside>

        {/* محتوى الصفحة */}
        <main className="flex-1 p-8">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Profile Information</h3>
              <div className="flex items-center gap-6">
                <img
                  src="https://via.placeholder.com/100"
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border"
                />
                <div>
                  <p className="text-lg font-semibold">John Doe</p>
                  <p className="text-gray-500">johndoe@email.com</p>
                  <button className="mt-3 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h3 className="text-xl font-bold mb-4">My Orders</h3>
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">#1234</td>
                    <td className="p-3">2025-09-10</td>
                    <td className="p-3">$250</td>
                    <td className="p-3 text-green-600 font-semibold">Delivered</td>
                    <td className="p-3">
                      <button className="text-sky-500 hover:underline">View Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h3 className="text-xl font-bold mb-4">My Addresses</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Home</p>
                  <p className="text-gray-600">123 Main Street, City, Country</p>
                  <div className="mt-2 space-x-3">
                    <button className="text-sky-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
                <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg">
                  Add New Address
                </button>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h3 className="text-xl font-bold mb-4">My Wishlist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Product"
                    className="rounded mb-3"
                  />
                  <p className="font-semibold">Laptop HP</p>
                  <p className="text-gray-500">$700</p>
                  <div className="mt-2 space-x-2">
                    <button className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600">
                      Move to Cart
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Change Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" /> Email Notifications
                  </label>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Payment Methods</label>
                  <p className="text-gray-500">No payment methods added</p>
                  <button className="mt-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3 className="text-xl font-bold mb-4">Security</h3>
              <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Logout
              </button>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Active Sessions (Optional)</h4>
                <p className="text-gray-500">Session info goes here...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
