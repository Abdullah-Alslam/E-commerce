"use client";

import { Loader2 } from "lucide-react";

export default function SupportForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {["name", "email", "issue"].map((field, idx) => (
        <input
          key={idx}
          type={field === "email" ? "email" : "text"}
          name={field}
          placeholder={
            field === "issue"
              ? "Subject / Issue"
              : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`
          }
          value={formData[field]}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base bg-white dark:bg-gray-800 dark:border-gray-700"
          required
        />
      ))}

      <textarea
        name="message"
        placeholder="Describe your issue..."
        value={formData.message}
        onChange={handleChange}
        className="border w-full p-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base bg-white dark:bg-gray-800 dark:border-gray-700"
        required
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          "Submit Request 🚀"
        )}
      </button>
    </form>
  );
}
