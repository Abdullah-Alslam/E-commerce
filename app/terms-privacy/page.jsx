// app/terms-privecy/page.js

import TermsPrivacy from "./Terms";

export const metadata = {
  title: "Terms & Privacy | Abdullah Abdalsalam",
  description:
    "Read Abdullah Abdalsalam's website Terms of Service and Privacy Policy. Learn how we collect, protect, and use your data while using our services.",
  keywords: [
    "Terms of Service",
    "Privacy Policy",
    "Abdullah Abdalsalam",
    "Data Protection",
    "User Rights",
    "Web Development",
  ],
  openGraph: {
    title: "Terms & Privacy | Abdullah Abdalsalam",
    description:
      "Detailed Terms of Service and Privacy Policy explaining data collection, usage, and user rights.",
    url: "https://your-domain.com/terms-privacy",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/images/terms-privacy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Terms and Privacy illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Privacy | Abdullah Abdalsalam",
    description:
      "Review our Terms of Service and Privacy Policy to understand how we handle and protect your data.",
    images: ["https://your-domain.com/images/terms-privacy-og.jpg"],
  },
};

export default function TermsPage() {
  return <TermsPrivacy />;
}
