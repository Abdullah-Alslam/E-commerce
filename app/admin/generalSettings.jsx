"use client";
import { useState } from "react";
import Image from "next/image";

export default function GeneralSettings() {
  const [siteName, setSiteName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);

  function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  }

  function handleSave() {
    // ⚠️ UI فقط – مجرد تجربة
    console.log({ siteName, description, logo });
    alert("✅ Settings Saved (Demo)");
  }

  return (
    <div className="flex-1 p-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        {/* العنوان */}
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-gray-100">
          General Settings
        </h1>

        {/* اسم الموقع */}
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Site Name
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter site name"
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* شعار الموقع */}
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Site Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="block w-full text-sm text-gray-700 dark:text-gray-300
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-600 file:text-white
                       hover:file:bg-indigo-700 cursor-pointer"
          />
          {logo && (
            <div className="mt-4">
              <Image
                src={logo}
                alt="Logo Preview"
                width={120}
                height={120}
                className="rounded-xl border border-gray-300 dark:border-gray-700"
              />
            </div>
          )}
        </div>

        {/* وصف الموقع */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Site Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description about the site..."
            rows={4}
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* زر الحفظ */}
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700
                     active:bg-indigo-800 text-white font-semibold rounded-xl
                     shadow-md transition-transform transform hover:scale-105"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
