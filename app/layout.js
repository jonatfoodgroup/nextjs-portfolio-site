import { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight
  : ['400', '500','600','700'],

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
