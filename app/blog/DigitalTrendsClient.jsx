import Image from "next/image";
import DigitalTrendsClient from "./DigitalTrendsClient";

export const metadata = {
  title: "Digital Trends 2025 – How Digital Products Are Changing the Game",
  description:
    "A deep dive into the future of digital products, online marketplaces, and tools for developers and creators.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Digital Trends 2025 – How Digital Products Are Changing the Game
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-purple-200 mb-6">
          A deep dive into the future of digital products, online marketplaces, and tools for developers and creators.
        </p>
        {/* Client Component for Share Button */}
        <div className="flex justify-center mt-6">
          <DigitalTrendsClient />
        </div>
      </section>

      {/* CONTENT */}
      <article className="max-w-5xl mx-auto px-6 py-12 prose prose-lg md:prose-xl leading-relaxed">
        <h2>Introduction</h2>
        <p>
          Digital products—from downloadable software to cloud-based assets—are
          becoming the backbone of online business. Whether you sell design
          templates, eBooks, or SaaS subscriptions, understanding the trends of
          2025 will help you stay competitive and grow your audience.
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
          Customers now prefer <strong>subscription access</strong>. Platforms like Adobe Creative Cloud and Spotify have proven that recurring payments create stability for both creators and consumers.
        </p>

        <h3>2. AI-Powered Tools</h3>
        <p>
          From AI design generators to smart code assistants, digital stores are selling products that literally think for you.
        </p>

        <h3>3. Instant Delivery & Security</h3>
        <p>
          Users expect purchases to be ready within seconds—<strong>no waiting, no manual emails</strong>.
        </p>

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

        {/* AUTHOR BOX */}
        <footer className="mt-12 flex items-center gap-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
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
        </footer>
      </article>
    </main>
  );
}
