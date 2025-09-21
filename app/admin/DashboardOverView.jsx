"use client";
import { ShoppingBag, Users, Package, DollarSign } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    { title: "Total Sales", value: "$12,450", icon: <DollarSign className="w-6 h-6 text-green-500" /> },
    { title: "Products", value: "120", icon: <Package className="w-6 h-6 text-blue-500" /> },
    { title: "Orders", value: "85", icon: <ShoppingBag className="w-6 h-6 text-purple-500" /> },
    { title: "Users", value: "540", icon: <Users className="w-6 h-6 text-orange-500" /> },
  ];

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className="p-3 rounded-xl bg-gray-100">
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
