"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">About MyStore</h3>
          <p className="text-gray-300 text-sm">
            MyStore offers the best laptops and smartphones with fast shipping and excellent support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-[#3B82F6]">Home</a></li>
            <li><a href="#" className="hover:text-[#3B82F6]">Shop</a></li>
            <li><a href="#" className="hover:text-[#3B82F6]">About</a></li>
            <li><a href="#" className="hover:text-[#3B82F6]">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-bold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-[#3B82F6]">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-[#3B82F6]">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-[#3B82F6]">FAQ</a></li>
            <li><a href="#" className="hover:text-[#3B82F6]">Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-300 text-2xl">
            <a href="#" className="hover:text-[#3B82F6]">🌐</a>
            <a href="#" className="hover:text-[#3B82F6]">🐦</a>
            <a href="#" className="hover:text-[#3B82F6]">📸</a>
            <a href="#" className="hover:text-[#3B82F6]">💼</a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-12">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
