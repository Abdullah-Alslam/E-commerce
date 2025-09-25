// app/layout.js
"use client"; // مهم إذا استخدمنا usePathname أو Toastify
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      </body>
    </html>
  );
}
