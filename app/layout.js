import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight
  : ['400', '700'],

})

export const metadata = {
  title: "Jon Senterfitt",
  description: "Portfolio Site",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        
        {children}</body>
    </html>
  );
}
