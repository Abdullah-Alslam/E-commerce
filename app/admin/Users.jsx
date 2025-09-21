"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Shield, Search } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب المستخدمين عند تحميل الصفحة
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  // حذف مستخدم
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/users?id=${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  }

  // تعديل مستخدم
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axios.put("/api/users", {
        id: editUser._id,       // مهم جداً: id من MongoDB
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
    }
  }

  // تصفية المستخدمين حسب البحث
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users Management</h1>

      {/* البحث */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
      </div>

      {/* جدول المستخدمين */}
      <div className="overflow-x-auto shadow rounded-2xl">
        <table className="min-w-full bg-white rounded-2xl">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left text-sm font-medium uppercase tracking-wide">Name</th>
              <th className="p-4 text-left text-sm font-medium uppercase tracking-wide">Email</th>
              <th className="p-4 text-left text-sm font-medium uppercase tracking-wide">Role</th>
              <th className="p-4 text-left text-sm font-medium uppercase tracking-wide">Join Date</th>
              <th className="p-4 text-left text-sm font-medium uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{user.name}</td>
                  <td className="p-4 text-gray-700">{user.email}</td>
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
                  <td className="p-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => setEditUser(user)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
                    >
                      <Shield className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              placeholder="Email"
              required
            />
            <select
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
