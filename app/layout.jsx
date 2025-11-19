"use client";

import "./globals.css";
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { Roboto } from "next/font/google";
import PageWrapper from "./components/Loading/PageWrapper";
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
          <PageWrapper>
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
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
