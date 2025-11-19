"use client";

import { useState, useEffect } from "react";
import PageLoading from "./PageLoading";

export default function PageWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => setIsLoading(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null; // prevent hydration mismatch

  return isLoading ? <PageLoading /> : children;
}
