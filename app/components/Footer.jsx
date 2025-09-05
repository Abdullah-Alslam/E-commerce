"use client";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-blue-800">About MyStore</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            MyStore offers the best laptops and smartphones with fast shipping and excellent support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-blue-800">Quick Links</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Shop</a></li>
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-blue-800">Customer Service</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li><a href="#" className="hover:text-blue-600">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-600">Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-blue-800">Follow Us</h3>
          <div className="flex space-x-4 text-gray-700 text-2xl">
            <a href="#" className="hover:text-blue-600">🌐</a>
            <a href="#" className="hover:text-blue-600">🐦</a>
            <a href="#" className="hover:text-blue-600">📸</a>
            <a href="#" className="hover:text-blue-600">💼</a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600 text-sm mt-12 border-t border-gray-300 pt-6">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700">MyStore</span>. All rights reserved.
      </div>
    </footer>
  );
}
