"use client";

import ArticleContent from "./ArticleContent";
import AuthorBox from "./AuthorBox";
import HeroSection from "./HeroSection";

export default function DigitalTrendsClient() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <HeroSection />

      <ArticleContent />

      <footer className="max-w-5xl mx-auto px-6 pb-20 mt-12">
        <AuthorBox />
      </footer>
    </main>
  );
}
