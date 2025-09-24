// app/layout.js
"use client";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayout =
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/login";

  return (
    <html lang="en">
      <body>
        {!hideLayout && <Header />}
        {children}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
