// app/auth/login/page.js

import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login - MyWebsite",
  description: "Login to access your account securely.",
  keywords: "login, sign in, MyWebsite",
  openGraph: {
    title: "Login - MyWebsite",
    description: "Login to access your account securely.",
    url: "https://mywebsite.com/auth/login",
    siteName: "MyWebsite",
    images: [{ url: "/login-og.png", width: 1200, height: 630 }],
    type: "website",
  },
};
export default function LoginPage() {
  return <LoginForm />;
}
