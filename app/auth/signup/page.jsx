// app/auth/signup/page.js

import SignupForm from "./SignupForm";

//  Metadata for SEO
export const metadata = {
  title: "Create New Account - MyWebsite",
  description:
    "Sign up now to get the best experience on MyWebsite. Fast, secure, and easy.",
  keywords: "signup, register, create account, MyWebsite",
  openGraph: {
    title: "Create New Account - MyWebsite",
    description:
      "Sign up now to get the best experience on MyWebsite. Fast, secure, and easy.",
    url: "https://mywebsite.com/auth/signup",
    siteName: "MyWebsite",
    images: [{ url: "/signup-og.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
