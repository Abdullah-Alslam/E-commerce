"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingIds, setSavingIds] = useState(new Set());

  useEffect(() => {
    let mounted = true;

    async function fetchCart() {
      try {
        setLoading(true);
        const res = await axios.get("/api/cart");
        if (!mounted) return;
        setCart(res.data || []);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCart();
    return () => (mounted = false);
  }, []);

  const removeFromCart = useCallback(async (id) => {
    if (!id) return;

    try {
      setSavingIds((prev) => new Set(prev).add(id));
      await axios.delete(`/api/cart/${id}`);

      setCart((prev) => prev.filter((item) => item._id !== id));

      toast.success("Item removed.", { icon: "🗑️" });
    } finally {
      setSavingIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, i) => acc + Number(i.price) * Number(i.quantity),
      0
    );
  }, [cart]);

  return { cart, loading, savingIds, removeFromCart, totalPrice, setCart };
}
