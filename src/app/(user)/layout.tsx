import type { Metadata } from "next";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import PageButton from "@/components/PageButton";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { Josefin_Sans } from "next/font/google";
import { products } from "@/lib/sanityClient";

export const metadata: Metadata = {
  title: "E-COM",
  description: "DeveolopedByUsama",
};

// using my custom fonts
const Josef = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={Josef.className}>
        <Layout>
        <Navbar/>
        <PageButton />
        {children}
        <Footer />
        </Layout>
      </body>
    </html>
  );
}
