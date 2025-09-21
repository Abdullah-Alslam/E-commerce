"use client";
import { useState } from "react";
import { Search, Trash2, Shield } from "lucide-react";

export default function Users() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "Abdullah", email: "abdullah@test.com", role: "Admin", date: "2025-09-10" },
    { id: 2, name: "Sara Ali", email: "sara@test.com", role: "User", date: "2025-09-12" },
    { id: 3, name: "Omar Hasan", email: "omar@test.com", role: "User", date: "2025-09-15" },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function toggleRole(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === "Admin" ? "User" : "Admin" } : u
      )
    );
  }

  function deleteUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      {/* العنوان */}
      <h1 className="text-2xl font-semibold mb-6">Users Management</h1>

      {/* البحث */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* جدول المستخدمين */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-2xl shadow">
          <thead>
            <tr className="bg-gray-200 text-left text-sm uppercase tracking-wide">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Join Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "Admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{user.date}</td>
                <td className="p-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleRole(user.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
                  >
                    <Shield className="w-4 h-4" />
                    Change Role
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
