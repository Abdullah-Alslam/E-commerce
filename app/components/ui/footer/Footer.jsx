"use client";

import FooterMainSections from "./FooterMainSections";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-16 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-300 transition-colors duration-500">
      <FooterMainSections />
      <FooterBottom />
    </footer>
  );
}
