"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

// Main header wrapper
import TopBar from "./TopBar";
import CategoriesBar from "./CategoriesBar";
import MiddleNavbar from "./MiddleNavbar";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const [user, setUser] = useState(null);

  const cookie = Cookie();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // Fetch store logo
  useEffect(() => {
    async function fetchLogo() {
      const res = await axios.get("/api/settings");
      setLogo(res.data.storeName);
    }
    fetchLogo();
  }, []);

  // Fetch user info
  useEffect(() => {
    async function fetchUser() {
      const id = cookie.get("userId");
      if (!id) return;
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
    }
    fetchUser();
  }, []);

  // User logout
  async function handleLogout() {
    await axios.post("/api/logout");
    cookie.remove("token");
    cookie.remove("userId");
    setUser(null);
    router.push("/auth/login");
  }

  if (!mounted) return null;

  return (
    <header className="w-full border-b-4 border-red-600">
      <TopBar user={user} />
      <MiddleNavbar
        theme={theme}
        setTheme={setTheme}
        logo={logo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <CategoriesBar user={user} handleLogout={handleLogout} />
    </header>
  );
}
