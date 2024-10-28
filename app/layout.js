import { IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./providers/DataProvider";
import "aos/dist/aos.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import ServiceWorkerProvider from "./providers/ServiceWorkerProvider";
import AuthProvider from "./providers/AuthProvider";
import AOSProvider from "./providers/AOSProvider";
import DrawerProvider from "./providers/DrawerProvider";

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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="">
        <ServiceWorkerProvider>
          <AOSProvider>
            <DrawerProvider>
              <AuthProvider>
                <DataProvider>
                  <div>
                    {children}
                  </div>
                </DataProvider>
              </AuthProvider>
            </DrawerProvider>
          </AOSProvider>
        </ServiceWorkerProvider>
      </body>
      <GoogleAnalytics gaId="G-1PZR9P1E9V" />
    </html>
  );
}
