"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingBag,
  Users,
  Package,
  DollarSign,
  PlusCircle,
  Boxes,
  Settings,
} from "lucide-react";
import StatsCard from "./StatsCard";
import QuickLinkButton from "./QuickLinkButton";
import LoadingDashboard from "./LoadingDashboard";
import { motion } from "framer-motion";

export default function DashboardOverview({ setSection }) {
  const [stats, setStats] = useState({
    totalSales: 0,
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/users"),
        ]);

        const products = productsRes?.data || [];
        const users = usersRes?.data || [];
        const orders = ordersRes?.data || [];

        const totalSales = orders.reduce(
          (acc, order) => acc + (order.total || 0),
          0
        );

        setStats({
          totalSales,
          productsCount: products.length,
          ordersCount: orders.length,
          usersCount: users.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to fetch stats. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <LoadingDashboard />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  const statsData = [
    {
      title: "Total Sales",
      value: `$${stats.totalSales}`,
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Products",
      value: stats.productsCount,
      icon: <Package className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Orders",
      value: stats.ordersCount,
      icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Users",
      value: stats.usersCount,
      icon: <Users className="w-6 h-6 text-orange-500" />,
    },
  ];

  const quickLinks = [
    {
      title: "Add Product",
      icon: <PlusCircle className="w-5 h-5 text-green-400" />,
      action: () => setSection("add"),
    },
    {
      title: "Manage Products",
      icon: <Boxes className="w-5 h-5 text-yellow-400" />,
      action: () => setSection("manage"),
    },
    {
      title: "Users",
      icon: <Users className="w-5 h-5 text-pink-400" />,
      action: () => setSection("users"),
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5 text-purple-400" />,
      action: () => setSection("settings"),
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-500 overflow-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            A
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Welcome Back, Admin!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here’s a quick overview of your store.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link, idx) => (
            <QuickLinkButton
              key={idx}
              icon={link.icon}
              title={link.title}
              onClick={link.action}
            />
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, idx) => (
          <StatsCard
            key={idx}
            icon={item.icon}
            title={item.title}
            value={item.value}
            delay={idx * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
