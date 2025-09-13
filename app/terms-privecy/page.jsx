"use client";

import { Phone, MessageCircle, Send } from "lucide-react";

export default function TermsPrivacy() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-16 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Terms & Privacy
      </h1>

      {/* Summary */}
      <section className="mb-10 bg-gray-100 p-6 rounded-lg max-w-3xl">
        <h2 className="text-2xl font-semibold mb-3">Summary</h2>
        <ul className="list-disc list-inside text-gray-700 leading-loose">
          <li>By using our website, you agree to our rules and policies.</li>
          <li>We collect your name, email, and messages submitted through forms.</li>
          <li>Your data is stored securely and will not be shared without consent.</li>
          <li>Users are responsible for providing accurate information.</li>
          <li>We may update these terms and privacy policy occasionally.</li>
        </ul>
      </section>

      {/* Terms of Service */}
      <section className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Terms of Service</h2>

        <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
        <p className="text-gray-600 leading-loose mb-4">
          Welcome to our website. By using our services, you agree to comply with these terms and conditions.
        </p>

        <h3 className="text-xl font-semibold mb-2">2. User Obligations</h3>
        <p className="text-gray-600 leading-loose mb-4">
          Users must provide accurate information and not misuse our services. Misuse may result in account suspension.
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Limitation of Liability</h3>
        <p className="text-gray-600 leading-loose">
          We are not responsible for any direct or indirect damages arising from the use of our website.
        </p>
      </section>

      {/* Privacy Policy */}
      <section className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Privacy Policy</h2>

        <h3 className="text-xl font-semibold mb-2">1. Data Collection</h3>
        <p className="text-gray-600 leading-loose mb-4">
          We collect your name, email, and any messages submitted through contact forms to provide our services effectively.
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Data Usage</h3>
        <p className="text-gray-600 leading-loose mb-4">
          Collected data is used only to respond to your inquiries, improve our services, and send important notifications if needed.
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Data Protection</h3>
        <p className="text-gray-600 leading-loose mb-4">
          Your data is stored securely in our database (MongoDB). We do not share your personal information with third parties without consent.
        </p>

        <h3 className="text-xl font-semibold mb-2">4. User Rights</h3>
        <p className="text-gray-600 leading-loose">
          You can request to access, update, or delete your personal information at any time by contacting us.
        </p>
      </section>

      {/* Contact Info */}
      <section className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mb-16 w-full">
        <a
          href="tel:+963991566773"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-105"
        >
          <Phone size={18} /> Call Us
        </a>
        <a
          href="https://wa.me/963991566773"
          target="_blank"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition transform hover:scale-105"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
        <a
          href="https://t.me/abdullah1895328"
          target="_blank"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition transform hover:scale-105"
        >
          <Send size={18} /> Telegram
        </a>
      </section>

      {/* Footer Note */}
      <p className="text-gray-600 text-sm text-center max-w-3xl">
        © 2025 Your Company. All rights reserved. By using this site, you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
}
