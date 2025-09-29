"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

export default function ProductCard({ item, addToCart, addToWishlist, actionLoading }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col">
      <Link href={`/products/${item._id}`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
        )}
      </Link>

      <Link href={`/products/${item._id}`} className="hover:underline">
        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
      </Link>

      <p className="text-blue-600 font-bold mb-3">${item.price}</p>

      <div className="flex justify-between mt-auto">
        <button
          disabled={actionLoading}
          className={`p-2 bg-blue-500 text-white rounded-full ${
            actionLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          } transition`}
          onClick={() => addToCart(item)}
        >
          {actionLoading ? "..." : <ShoppingCart size={18} />}
        </button>
        <button
          disabled={actionLoading}
          className={`p-2 bg-gray-200 text-red-500 rounded-full ${
            actionLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-400 hover:text-white"
          } transition`}
          onClick={() => addToWishlist(item)}
        >
          {actionLoading ? "..." : <Heart size={18} />}
        </button>
      </div>
    </div>
  );
}
