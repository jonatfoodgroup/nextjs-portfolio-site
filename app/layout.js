import { Manrope } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./providers/DataProvider";
import { BrandingProvider } from "./providers/BrandingProvider";
import "aos/dist/aos.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import ServiceWorkerProvider from "./providers/ServiceWorkerProvider";
import AuthProvider from "./providers/AuthProvider";
import AOSProvider from "./providers/AOSProvider";
import { WordpressProvider } from "./providers/WordpressProvider";
import { HubspotProvider } from "./providers/HubspotProvider";
import DrawerProvider from "./providers/DrawerProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Manrope({
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
      <body className={inter.className}>
        <ServiceWorkerProvider>
          <HubspotProvider>
            <WordpressProvider>
              <BrandingProvider>
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
              </BrandingProvider>
            </WordpressProvider>
          </HubspotProvider>
        </ServiceWorkerProvider>
        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/22555624.js"></script>
      </body>
      <GoogleAnalytics gaId="G-1PZR9P1E9V" />
    </html>
  );
}
