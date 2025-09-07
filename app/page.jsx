"use client";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Promo Banner */}
      <section className="bg-yellow-400 text-gray-900 py-4 text-center font-semibold">
        Super Sale! Up to 50% off on selected products
      </section>

      {/* Hero Section */}
      <section className="relative bg-blue-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-6">High-Quality Tech Products</h1>
            <p className="text-gray-700 mb-6 text-lg">
              Explore our wide range of laptops, mobiles, and accessories with unbeatable deals.
            </p>
            <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded hover:bg-blue-500 transition">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-80 h-80 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {["Laptops", "Mobiles", "Tablets", "Watches", "Accessories"].map((cat) => (
            <div
              key={cat}
              className="bg-white hover:bg-yellow-300 transition rounded-xl p-6 flex flex-col items-center justify-center shadow-md"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">Hot Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white hover:bg-yellow-300 transition rounded-xl p-4 flex flex-col items-center shadow-md"
            >
              <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="text-lg font-semibold mb-1">Product Name</h3>
              <p className="text-gray-700 mb-2">$199.99</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-semibold transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Free Shipping", desc: "On all orders over $50" },
            { title: "24/7 Support", desc: "We are here to help" },
            { title: "Secure Payment", desc: "100% secure payment" },
          ].map((f, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-blue-700">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-gray-700 mb-4">"Excellent product quality and fast delivery!"</p>
              <h3 className="font-semibold text-blue-700">John Doe</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">Our Brands</h2>
        <div className="flex justify-center flex-wrap gap-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="w-32 h-16 bg-gray-300 rounded-xl flex items-center justify-center">
              Brand {idx + 1}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-100 py-16 text-gray-900">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Subscribe for Updates</h2>
          <p className="text-gray-700 mb-6">
            Receive exclusive offers and updates on new products directly in your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-l bg-white text-gray-900 focus:outline-none"
            />
            <button className="bg-yellow-400 text-gray-900 px-6 rounded-r font-bold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
