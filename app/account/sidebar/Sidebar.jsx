"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Package, MapPin, Heart, Lock, CarFront } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: <User size={20} /> },
  { id: "orders", label: "Orders", icon: <Package size={20} /> },
  { id: "addresses", label: "Addresses", icon: <MapPin size={20} /> },
  { id: "wishlist", label: "Wishlist", icon: <Heart size={20} /> },
  { id: "cart", label: "Cart", icon: <CarFront size={20} /> },
  { id: "security", label: "Security", icon: <Lock size={20} /> },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="relative flex-shrink-0 bg-white shadow-lg w-60 dark:bg-gray-900">
      <div className="relative flex flex-col h-full py-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative flex items-center gap-4 px-6 py-3 my-1 transition rounded-r-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {/* Highlight bar */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-highlight"
                  className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-r-full dark:bg-red-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div
                className={`${
                  isActive
                    ? "text-red-600 dark:text-red-500"
                    : "text-gray-700 dark:text-gray-300"
                } transition-colors`}
              >
                {tab.icon}
              </div>

              {/* Label */}
              <span
                className={`${
                  isActive
                    ? "text-red-600 dark:text-red-500 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                } transition-colors`}
              >
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
