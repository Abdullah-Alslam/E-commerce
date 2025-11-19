import Support from "./Support";

export const metadata = {
  title: "Support Center | Abdullah Abdalsalam",
  description:
    "Need help? Contact Abdullah Abdalsalam's support team 24/7 for assistance with web development inquiries, technical issues, or collaborations.",
  keywords: [
    "Support",
    "Help Center",
    "Contact",
    "Web Development",
    "Frontend Developer",
    "React",
    "Next.js",
    "Abdullah Abdalsalam",
  ],
  openGraph: {
    title: "Support Center | Abdullah Abdalsalam",
    description:
      "Get fast support for any questions, technical issues, or project inquiries. We respond within hours!",
    url: "https://your-domain.com/support",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/images/support-og.jpg",
        width: 1200,
        height: 630,
        alt: "Support Center - Abdullah Abdalsalam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Center | Abdullah Abdalsalam",
    description:
      "Contact Abdullah Abdalsalam for any support or collaboration inquiries. Fast and friendly help 24/7.",
    images: ["https://your-domain.com/images/support-og.jpg"],
  },
};

export default function SupportPage() {
  return <Support />;
}
