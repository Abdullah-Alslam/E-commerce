"use client";

export default function ProductFormFields({
  form,
  handleChange,
  handleCheckboxChange,
}) {
  return (
    <>
      {/* Product Name */}
      <div>
        <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Price & Old Price */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
            Old Price (optional)
          </label>
          <input
            type="number"
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
            placeholder="Enter old price"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          <option value="Laptops">Laptops</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Tablets">Tablets</option>
          <option value="Accessories">Accessories</option>
          <option value="Smart Watches">Smart Watches</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="text-gray-700 dark:text-gray-300 text-sm mb-1 block">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Write a short product description..."
          rows={3}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Hot Deal Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            name="hotDeal"
            checked={form.hotDeal}
            onChange={handleCheckboxChange}
            className="w-12 h-6 appearance-none rounded-full bg-gray-300 checked:bg-orange-500 transition-colors relative cursor-pointer"
          />
          <span
            className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
              form.hotDeal ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </div>
        <span className="text-gray-800 dark:text-gray-300">
          Mark as Hot Deal 🔥
        </span>
      </label>
    </>
  );
}
