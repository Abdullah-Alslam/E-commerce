"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./sidebar/Sidebar";
import ProfileTab from "./profile/ProfileTab";
import OrdersTab from "./orders/OrdersTab";
import AddressesTab from "./addresses/AddressesTab";
import WishlistTab from "./wishlist/WishlistTab";
import SecurityTab from "./security/SecurityTab";
import ProtectedRoute from "../components/ProtectedRoute";
import Cart from "./cart/Cart";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const currentUserId = "1234567890";

  const tabs = {
    profile: <ProfileTab userId={currentUserId} />,
    orders: <OrdersTab />,
    addresses: <AddressesTab />,
    wishlist: <WishlistTab />,
    cart: <Cart />,
    security: <SecurityTab />,
  };

  return (
    <ProtectedRoute>
      <div className="flex justify-center min-h-screen px-4 py-10 pb-16 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full overflow-hidden bg-white shadow-xl max-w-7xl dark:bg-gray-800 rounded-2xl md:flex-row">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <main className="relative flex-1 p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabs[activeTab]}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
