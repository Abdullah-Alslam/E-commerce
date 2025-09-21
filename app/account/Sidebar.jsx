"use client";

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "profile", label: "Profile Info" },
    { id: "orders", label: "Orders" },
    { id: "addresses", label: "Addresses" },
    { id: "wishlist", label: "Wishlist" },
    { id: "settings", label: "Settings" },
    { id: "security", label: "Security" },
  ];

  return (
    <aside className="w-64 bg-gray-100 border-r p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">My Account</h2>
      <ul className="space-y-3">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer p-2 rounded-lg ${
              activeTab === tab.id ? "bg-sky-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
