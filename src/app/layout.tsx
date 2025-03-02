import type { Metadata } from "next";
import "./globals.css";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Dot Blog",
  description: "Get the latest tech updates, breaking news, and expert health tips all in one place. Explore in-depth articles, guides, and insights on technology, current events, and wellness. Stay informed with fresh updates every day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <div>
       <div className=" container mx-auto px-4 md:px-8 lg:px-12 min-h-screen">
       <div className=" fixed hidden z-50 md:block px-12 w-full left-0 top-0 bg-white">
        <DesktopNavbar />
        </div>
        <div className=" fixed z-50 block md:hidden px-4 w-full left-0 top-0 bg-white">
        <MobileNavbar />
        </div>
        <div className="md:pt-24 pt-20">
        {children}
        </div>
       </div>
       <div>
        <Footer />
       </div>
       </div>
      </body>
    </html>
  );
}
