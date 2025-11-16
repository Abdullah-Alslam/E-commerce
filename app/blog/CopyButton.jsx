"use client";

import { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied ✅");

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copyLink}
      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
    >
      <FiShare2 /> {copied ? "Copied!" : "Share"}
    </button>
  );
}
