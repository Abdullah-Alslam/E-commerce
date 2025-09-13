"use client";

import { useState } from "react";
import {
  FiClock,
  FiUser,
  FiTag,
  FiShare2,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

/**
 * Blog Single Page (Large content) - Next.js (JS) + Tailwind
 * Put this file in: app/blog/sample-article/page.js
 */

export default function BlogSingle() {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  const toggleLike = () => setLiked((s) => !s);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <article className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* HERO */}
        <header className="relative">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcdef"
            alt="Laptop on desk"
            className="w-full h-72 object-cover"
          />
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              How to Choose the Best Laptop for Web Development — Complete Guide (2025)
            </h1>
            <p className="text-gray-600 max-w-3xl mb-4">
              A practical guide for junior and mid-level developers: specifications, buying tips, 
              and recommended models for building apps and eCommerce projects.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3">
              <div className="flex items-center text-sm text-gray-500 gap-3">
                <span className="inline-flex items-center gap-2">
                  <FiUser className="text-lg" aria-hidden />
                  <span>By Abdullah Abdalsalam</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiClock className="text-lg" aria-hidden />
                  <time dateTime="2025-09-13">Sep 13, 2025</time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <FiTag className="text-lg" aria-hidden />
                  <span>Laptop, Development, Tips</span>
                </span>
              </div>

              <div className="ml-auto flex items-center gap-3 mt-3 sm:mt-0">
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy article link"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <FiShare2 />
                  <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
                </button>

                <button
                  onClick={toggleLike}
                  aria-pressed={liked}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition transform ${
                    liked ? "bg-red-50 text-red-600 scale-105" : "bg-gray-100 hover:bg-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-red-300`}
                >
                  <FiHeart />
                  <span className="text-sm">{liked ? "Liked" : "Like"}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* LAYOUT: content + sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
          {/* Main content */}
          <section className="prose prose-lg col-span-2 max-w-none">
            <h2>Introduction</h2>
            <p>
              When choosing a laptop for web development, there are several key factors you need to 
              consider: processor (CPU), memory (RAM), storage (SSD), battery life, screen quality, 
              and weight. This article explains each point in detail and gives examples of suitable 
              models for different budgets.
            </p>

            <h3>1. Processor (CPU)</h3>
            <p>
              The CPU is the heart of the machine. For developers, I recommend at least 6 cores — 
              like modern Intel i5 or AMD Ryzen 5. If you work with emulators or large projects, 
              consider i7 / Ryzen 7.
            </p>

            <h3>2. Memory (RAM)</h3>
            <p>
              Don’t go below 16GB if you use VSCode + browser tabs + Docker. 
              8GB can work for beginners, but you’ll feel the slowdown with bigger projects.
            </p>

            <h3>3. Storage (SSD)</h3>
            <p>
              Choose an NVMe SSD — at least 512GB. Faster storage reduces build time and speeds up project loading.
            </p>

            <h3>4. Screen & Resolution</h3>
            <p>
              1080p is fine, but if you work on design or UI/UX, consider 2K or better. 
              Brightness and viewing angles matter for long working hours.
            </p>

            <h3>5. Battery & Weight</h3>
            <p>
              If you work remotely or in cafes, strong battery life and lightweight are important. 
              If you’re office-based, raw performance might be a higher priority.
            </p>

            <h3>6. Buying Tips</h3>
            <ol>
              <li>Never go below 16GB RAM for mid-sized projects.</li>
              <li>Always choose NVMe SSD over SATA for noticeable speed improvements.</li>
              <li>Cooling matters — especially in high-performance laptops.</li>
            </ol>

            <div className="bg-gray-50 p-4 rounded-lg my-6">
              <h4 className="font-semibold">Example: Suggested Developer Specs</h4>
              <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded-md border">
{`CPU: Intel i7 / AMD Ryzen 7
RAM: 16GB - 32GB
Storage: 1TB NVMe SSD
Screen: 15" 1080p (or 2K)
Battery: 6+ hours
Weight: < 2.0 kg`}
              </pre>
            </div>

            <h3>7. Choosing Based on Budget</h3>
            <p>
              - Low budget: prioritize RAM + SSD, go with i5 + 16GB RAM + 512GB SSD.  
              - Mid budget: i7 / Ryzen 7 with 16-32GB.  
              - Pro level: workstation laptops with RTX if you do ML or heavy simulations.  
            </p>

            <h3>8. Product Recommendations</h3>
            <p>
              Here are two recommended laptops from the store that fit different categories — 
              this helps convert readers into customers.
            </p>

            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
              <article className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&s=aaa"
                  alt="Laptop A"
                  className="w-28 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">Laptop A — Intel i5, 16GB</h4>
                  <p className="text-sm text-gray-600">Great starter laptop for developers.</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-bold">USD 699</span>
                    <button
                      className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                      aria-label="Add Laptop A to cart"
                    >
                      <FiShoppingCart />
                      Add
                    </button>
                  </div>
                </div>
              </article>

              <article className="flex gap-4 p-4 border rounded-lg hover:shadow-lg transition transform hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&s=bbb"
                  alt="Laptop B"
                  className="w-28 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">Laptop B — Ryzen 7, 32GB</h4>
                  <p className="text-sm text-gray-600">Powerful for heavy projects and multitasking.</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-bold">USD 1299</span>
                    <button
                      className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                      aria-label="Add Laptop B to cart"
                    >
                      <FiShoppingCart />
                      Add
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <h3>Conclusion</h3>
            <p>
              Choosing the right laptop for web development is all about balancing performance, price, 
              and your daily needs. If you can start with stronger specs, you’ll save time and effort 
              in the long run.
            </p>

            <div className="mt-10">
              <h4 className="text-lg font-bold mb-4">Related Posts</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <a className="p-4 border rounded-lg hover:shadow-md transition" href="#">
                  <h5 className="font-semibold">Secrets to Speeding Up React Apps</h5>
                  <p className="text-sm text-gray-600">Practical tips for better performance.</p>
                </a>
                <a className="p-4 border rounded-lg hover:shadow-md transition" href="#">
                  <h5 className="font-semibold">Best Developer Tools in 2025</h5>
                  <p className="text-sm text-gray-600">A must-have list for web developers.</p>
                </a>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-12 border-t pt-6">
              <h4 className="text-lg font-bold mb-3">Comments</h4>
              <p className="text-sm text-gray-600 mb-4">Comments are disabled (placeholder).</p>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="font-medium">Ahmed</p>
                  <p className="text-sm text-gray-700">Great article, thanks!</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="font-medium">Mona</p>
                  <p className="text-sm text-gray-700">Do you recommend a lightweight laptop for travel?</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=140&auto=format&fit=crop&ixlib=rb-4.0.3&s=ccc"
                    alt="Author"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">Abdullah Abdalsalam</p>
                    <p className="text-sm text-gray-600">Frontend Developer & Tech Writer</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold mb-3">Categories</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <a href="#" className="hover:text-blue-600 transition">Laptops</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600 transition">Cameras</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600 transition">Gaming</a>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold mb-3">Newsletter</h5>
                <p className="text-sm text-gray-600 mb-3">We send new articles and updates every month.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Subscribed (placeholder)");
                  }}
                >
                  <label htmlFor="newsletter" className="sr-only">Email</label>
                  <input
                    id="newsletter"
                    type="email"
                    required
                    placeholder="Your email"
                    className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold mb-3">Tags</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded text-sm">#laptops</span>
                  <span className="px-3 py-1 bg-gray-100 rounded text-sm">#webdev</span>
                  <span className="px-3 py-1 bg-gray-100 rounded text-sm">#reviews</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* CTA footer */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
            <div>
              <h3 className="text-xl font-bold">Ready to upgrade?</h3>
              <p className="text-sm">Check out the best laptop deals for developers now.</p>
            </div>
            <div className="ml-auto">
              <a
                href="#"
                className="inline-block bg-white text-blue-600 px-5 py-3 rounded-lg font-semibold shadow hover:translate-y-0.5 transition"
              >
                Browse Deals
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
