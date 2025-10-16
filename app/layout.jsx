// app/layout.jsx
"use client"; // مهم إذا استخدمنا usePathname أو Toastify

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {!hideLayout && <Header />}
          <main>{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {!hideLayout && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
