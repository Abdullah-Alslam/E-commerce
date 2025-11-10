"use client";

import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideLayout = [
    "/login",
    "/signup",
    "/auth/login",
    "/auth/signup",
    "/forbidden",
    "/purchaseUnavailable",
  ].includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* الهيدر يظهر فقط إذا hideLayout = false */}
          {!hideLayout && <Header />}

          {/* محتوى الصفحة */}
          <main>{children}</main>

          {/* Toast notifications */}
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

          {/* الفوتر يظهر فقط إذا hideLayout = false */}
          {!hideLayout && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
