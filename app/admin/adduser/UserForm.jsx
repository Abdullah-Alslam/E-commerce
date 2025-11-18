"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  // Update form inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form, setForm, setLoading);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-100"
    >
      {/* Full Name */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role */}
      <div className="flex flex-col">
        <label className="mb-2 font-medium">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2">
        <SubmitButton loading={loading} text="Add User" />
      </div>
    </form>
  );
}
