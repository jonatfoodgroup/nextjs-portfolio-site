import { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";
import { DataProvider } from "./providers/DataProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Blank Title",
  description: "Portfolio Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
      <GoogleAnalytics gaId="G-1PZR9P1E9V" />
    </html>
  );
}
