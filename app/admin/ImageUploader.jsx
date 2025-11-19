"use client";
import { useState } from "react";

export default function ImageUploader({ onUploadedUrl }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImageUrl(data.secure_url);

      if (onUploadedUrl) onUploadedUrl(data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="px-4 py-2 text-white transition bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-500">
        Select Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {loading && (
        <p className="text-sm text-gray-600 dark:text-gray-300 animate-pulse">
          Uploading...
        </p>
      )}

      {imageUrl && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-green-600">
            ✅ Image uploaded successfully!
          </p>
        </div>
      )}
    </div>
  );
}
