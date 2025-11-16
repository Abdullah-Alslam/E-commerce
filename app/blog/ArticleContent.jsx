import Image from "next/image";
import CTASection from "./CTASection";
import RelatedArticles from "./RelatedArticles";

export default function ArticleContent() {
  return (
    <article className="max-w-5xl mx-auto px-6 py-12 prose prose-lg md:prose-xl leading-relaxed dark:prose-invert">
      <h2>Introduction</h2>
      <p>
        Digital products—from downloadable software to cloud-based assets—are
        becoming the backbone of online business.
      </p>

      <div className="relative w-full h-80 md:h-[28rem] mb-10 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/digital-workspace.jpg"
          alt="Digital workspace"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="/images/digital-workspace.jpg"
        />
      </div>

      <h3>1. Subscription-Based Downloads</h3>
      <p>
        Instead of one-time purchases, customers now prefer subscriptions...
      </p>

      <h3>2. AI-Powered Tools</h3>
      <p>From AI design generators to smart code assistants...</p>

      <h3>3. Instant Delivery & Security</h3>
      <p>Speed is everything. Users expect instant delivery...</p>

      <CTASection />

      <h3>4. Community-Driven Growth</h3>
      <p>Platforms integrating forums and Discord servers...</p>

      <h3>5. Cross-Platform Compatibility</h3>
      <p>Customers want downloads for macOS, Windows, Linux...</p>

      <h2>Related Articles</h2>
      <RelatedArticles />
    </article>
  );
}
