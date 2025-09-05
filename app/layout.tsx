import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "MyStore",
  description: "The best place to find laptops & smartphones",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F1F5F9]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
