// app/contact/page.jsx
import ProtectedRoute from "../components/ProtectedRoute";
import ContactInfo from "./ContactInfo";

export const metadata = {
  title: "Contact Us | Abdullah Abdalsalam",
  description:
    "Get in touch with Abdullah Abdalsalam for web development projects, collaborations, or questions. Quick response guaranteed within 24 hours.",
  keywords: [
    "Contact Abdullah",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Freelance Developer",
    "Remote Developer",
    "Hire Web Developer",
  ],
  openGraph: {
    title: "Contact Abdullah Abdalsalam | Frontend Developer",
    description:
      "Reach out for Next.js, React, or web development services and collaborations.",
    url: "https://your-domain.com/contact",
    type: "website",
    locale: "en_US",
    siteName: "Abdullah Abdalsalam Portfolio",
    images: [
      {
        url: "https://your-domain.com/images/contact-og.jpg", // ضع صورة مناسبة (1200x630)
        width: 1200,
        height: 630,
        alt: "Contact Abdullah Abdalsalam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Abdullah Abdalsalam",
    description:
      "Get in touch for frontend development, Next.js, and React projects.",
    images: ["https://your-domain.com/images/contact-og.jpg"],
  },
  alternates: {
    canonical: "https://your-domain.com/contact",
  },
};

export default function Contact() {
  return (
    <ProtectedRoute>
      <ContactInfo />
    </ProtectedRoute>
  );
}
