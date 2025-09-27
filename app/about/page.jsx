import AboutUs from "./AboutUs"; 

export const metadata = {
  title: "About Us | Abdullah Abdalsalam",
  description:
    "Learn more about Abdullah Abdalsalam's eCommerce store. We offer high-quality electronics with fast delivery and excellent customer service.",
  keywords: [
    "About Abdullah Abdalsalam",
    "eCommerce Store",
    "Frontend Developer",
    "Next.js",
    "Electronics Shop",
    "High Quality Products",
  ],
  openGraph: {
    title: "About Us | Abdullah Abdalsalam",
    description:
      "Discover the story behind our online electronics store and meet the team that makes it all possible.",
    url: "https://your-domain.com/about",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Abdullah Abdalsalam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Abdullah Abdalsalam",
    description:
      "Learn more about Abdullah Abdalsalam and his mission to provide top-quality electronics.",
    images: ["https://your-domain.com/og-image-about.jpg"],
  },
};

export default function AboutPage() {
  return <AboutUs />;
}
