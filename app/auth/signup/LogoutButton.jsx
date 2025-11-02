"use client";

import { useRouter } from "next/navigation";
import Cookie from "cookie-universal";
import axios from "axios";

export default function LogoutButton() {
  const router = useRouter();
  const cookie = Cookie();

  async function handleLogout() {
    try {
      const res= await axios.post("/api/logout");
      console.log(res);
      
      cookie.remove("token", { path: "/" });
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
