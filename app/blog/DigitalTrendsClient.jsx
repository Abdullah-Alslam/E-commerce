"use client";

import { useState } from "react";
import Image from "next/image";
import { FiClock, FiUser, FiShare2, FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";

export default function DigitalTrendsClient() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied is done");
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Digital Trends 2025 – How Digital Products Are Changing the Game
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-purple-200 mb-6">
            A deep dive into the future of digital products, online
            marketplaces, and tools for developers and creators.
          </p>
          <div className="flex justify-center items-center gap-6 mt-6 text-sm text-purple-300 flex-wrap">
            <span className="flex items-center gap-2">
              <FiUser /> Abdullah Abdalsalam
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> Sep 27, 2025
            </span>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
            >
              <FiShare2 /> {copied ? "Link Copied!" : "Share"}
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="max-w-5xl mx-auto px-6 py-12 prose prose-lg md:prose-xl leading-relaxed">
        <h2>Introduction</h2>
        <p>
          Digital products—from downloadable software to cloud-based
          assets—are becoming the backbone of online business. Whether you sell
          design templates, eBooks, or SaaS subscriptions, understanding the
          trends of 2025 will help you stay competitive and grow your audience.
        </p>

        <div className="relative w-full h-80 md:h-[28rem] mb-10">
          <Image
            src="/images/digital-workspace.jpg"
            alt="Digital workspace"
            fill
            className="rounded-2xl shadow-lg object-cover"
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
          for both creators and consumers. In 2025, expect to see more eCommerce
          stores offering monthly download packages for fonts, plugins, and code
          snippets.
        </p>

        <h3>2. AI-Powered Tools</h3>
        <p>
          Artificial intelligence isn’t just a buzzword anymore. From AI design
          generators to smart code assistants, digital stores are now selling
          products that literally think for you. Creators who leverage
          AI-powered apps can offer <strong>premium experiences</strong> and
          higher productivity.
        </p>

        <h3>3. Instant Delivery & Security</h3>
        <p>
          Speed is everything. Users expect their purchase to be ready within
          seconds—<strong>no waiting, no manual emails</strong>. Using
          blockchain verification or encrypted links ensures customers receive
          authentic files safely.
        </p>

        {/* Product CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-2xl my-12 flex flex-col md:flex-row items-center gap-6 shadow-xl transition-transform hover:scale-105">
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
        </div>

        <h3>4. Community-Driven Growth</h3>
        <p>
          Stores that integrate{" "}
          <strong>forums, Discord servers, or live Q&A sessions</strong> are
          seeing higher retention. Digital product buyers love learning from
          each other and sharing tips.
        </p>

        <h3>5. Cross-Platform Compatibility</h3>
        <p>
          Customers now expect downloads that work on{" "}
          <strong>macOS, Windows, Linux, iOS, and Android</strong>. Cross-platform
          support is no longer optional if you want a global audience.
        </p>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Offer subscriptions for stable income.</li>
          <li>Integrate AI-based products and tools.</li>
          <li>Focus on instant delivery and strong security.</li>
          <li>Build a community around your store.</li>
          <li>Ensure cross-platform compatibility.</li>
        </ul>

        <div className="my-10 p-6 bg-gray-100 rounded-2xl">
          <p className="text-lg font-medium">
            💡 <strong>Pro Tip:</strong> Combine a fast Next.js front-end with
            secure API routes to handle instant downloads and real-time product
            updates.
          </p>
        </div>

        <h2>Related Articles</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <a
            href="#"
            className="p-5 rounded-xl bg-white shadow hover:shadow-lg hover:scale-105 transition block"
          >
            <h4 className="font-semibold mb-2">
              How to Build a Next.js Digital Store
            </h4>
            <p className="text-gray-600 text-sm">
              Step-by-step guide to create a fast digital marketplace.
            </p>
          </a>
          <a
            href="#"
            className="p-5 rounded-xl bg-white shadow hover:shadow-lg hover:scale-105 transition block"
          >
            <h4 className="font-semibold mb-2">
              Monetizing Digital Templates in 2025
            </h4>
            <p className="text-gray-600 text-sm">
              Pricing strategies and marketing tips for selling design assets.
            </p>
          </a>
        </div>
      </article>

      {/* AUTHOR BOX */}
      <footer className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
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
            <p className="text-gray-600">
              Frontend Developer & Digital Product Enthusiast
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
