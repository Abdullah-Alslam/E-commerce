"use client";

import { useState } from "react";
import Image from "next/image";
import { FiClock, FiUser, FiShare2, FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

export default function DigitalTrendsClient() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied ✅");
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-red-600 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          >
            Digital Trends 2025 – How Digital Products Are Changing the Game
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-purple-200 mb-6"
          >
            A deep dive into the future of digital products, online
            marketplaces, and tools for developers and creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center gap-6 mt-6 text-sm text-purple-300 flex-wrap"
          >
            <span className="flex items-center gap-2">
              <FiUser /> Abdullah Abdalsalam
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> Sep 27, 2025
            </span>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
            >
              <FiShare2 /> {copied ? "Link Copied!" : "Share"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-12 prose prose-lg md:prose-xl leading-relaxed dark:prose-invert"
      >
        <h2>Introduction</h2>
        <p>
          Digital products—from downloadable software to cloud-based assets—are
          becoming the backbone of online business. Whether you sell design
          templates, eBooks, or SaaS subscriptions, understanding the trends of
          2025 will help you stay competitive and grow your audience.
        </p>

        <div className="relative w-full h-80 md:h-[28rem] mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/digital-workspace.jpg"
            alt="Digital workspace"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="/images/digital-workspace.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
          />
        </div>

        <h3>1. Subscription-Based Downloads</h3>
        <p>
          Instead of one-time purchases, customers now prefer{" "}
          <strong>subscription access</strong>. Platforms like Adobe Creative
          Cloud and Spotify have proven that recurring payments create stability
          for both creators and consumers.
        </p>

        <h3>2. AI-Powered Tools</h3>
        <p>
          From AI design generators to smart code assistants, digital stores are
          now selling products that literally think for you.
        </p>

        <h3>3. Instant Delivery & Security</h3>
        <p>
          Speed is everything. Users expect their purchase to be ready within
          seconds—<strong>no waiting, no manual emails</strong>.
        </p>

        {/* Product CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-2xl my-12 flex flex-col md:flex-row items-center gap-6 shadow-xl transition-transform"
        >
          <div className="flex-1">
            <h4 className="text-2xl font-bold mb-2">
              Try Our Best-Selling Digital Bundle
            </h4>
            <p className="text-purple-100 mb-4">
              30+ premium templates for developers & designers – instant
              download, lifetime updates.
            </p>
            <button
              disabled
              className="bg-white text-blue-700 px-6 py-3 rounded-lg cursor-not-allowed font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <FiDownload /> Coming Soon
            </button>
          </div>
          <div className="relative w-full md:w-80 h-48 md:h-40">
            <Image
              src="/images/digital-workspace.jpg"
              alt="Digital bundle"
              fill
              className="rounded-lg object-cover shadow-md"
              placeholder="blur"
              blurDataURL="/images/digital-workspace.jpg"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </motion.div>

        <h3>4. Community-Driven Growth</h3>
        <p>
          Stores that integrate{" "}
          <strong>forums, Discord servers, or live Q&A sessions</strong> are
          seeing higher retention.
        </p>

        <h3>5. Cross-Platform Compatibility</h3>
        <p>
          Customers now expect downloads that work on{" "}
          <strong>macOS, Windows, Linux, iOS, and Android</strong>.
        </p>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Offer subscriptions for stable income.</li>
          <li>Integrate AI-based products and tools.</li>
          <li>Focus on instant delivery and strong security.</li>
          <li>Build a community around your store.</li>
          <li>Ensure cross-platform compatibility.</li>
        </ul>

        <div className="my-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <p className="text-lg font-medium">
            💡 <strong>Pro Tip:</strong> Combine a fast Next.js front-end with
            secure API routes to handle instant downloads and real-time updates.
          </p>
        </div>

        <h2>Related Articles</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            "How to Build a Next.js Digital Store",
            "Monetizing Digital Templates in 2025",
          ].map((title, idx) => (
            <motion.a
              key={idx}
              href="#"
              whileHover={{ scale: 1.03 }}
              className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition block"
            >
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Step-by-step guide & tips.
              </p>
            </motion.a>
          ))}
        </div>
      </motion.article>

      {/* AUTHOR BOX */}
      <footer className="max-w-5xl mx-auto px-6 pb-20 mt-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          <div className="relative w-20 h-20">
            <Image
              src="/images/profile.jpg"
              alt="Author"
              fill
              className="rounded-full object-cover"
              placeholder="blur"
              blurDataURL="/images/profile.jpg"
              sizes="80px"
            />
          </div>
          <div>
            <h4 className="font-bold text-lg">Abdullah Abdalsalam</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Frontend Developer & Digital Product Enthusiast
            </p>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
