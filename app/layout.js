import { Playfair_Display, Inter, Bebas_Neue, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { DataProvider } from "./providers/DataProvider";
import { BrandingProvider } from "./providers/BrandingProvider";
import "aos/dist/aos.css";
import ServiceWorkerProvider from "./providers/ServiceWorkerProvider";
import AuthProvider from "./providers/AuthProvider";
import AOSProvider from "./providers/AOSProvider";
import { WordpressProvider } from "./providers/WordpressProvider";
import DrawerProvider from "./providers/DrawerProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { Toaster } from "react-hot-toast";
import { HubspotProvider } from "./providers/HubspotProvider";
import { ProposalProvider } from "./providers/ProposalProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import ForceGraph from "./components/ForceGraph";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const press2p = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "StrongStart Network",
  description: ""
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={`${inter.className} ${bebas_neue.className} ${press2p.className}
      bg-white text-black`}>
        <ServiceWorkerProvider>
          <Analytics />
          <SpeedInsights />
          <WordpressProvider>
            <HubspotProvider>
              <DataProvider>
                <BrandingProvider>
                  <AOSProvider>
                    <DrawerProvider>
                      <AuthProvider>
                        <FirebaseProvider>
                          <ProposalProvider>
                            <Toaster position="top-right" reverseOrder={false} />
                              {children}
                            <div className="fixed inset-0 flex justify-center items-center top-0 left-0 right-0 bottom-0 sticky min-h-screen cursor-pointer" style={{ zIndex: -1 }}>
                              <ForceGraph backgroundColor="black" />
                            </div>
                          </ProposalProvider>
                        </FirebaseProvider>
                      </AuthProvider>
                    </DrawerProvider>
                  </AOSProvider>
                </BrandingProvider>
              </DataProvider>
            </HubspotProvider>
          </WordpressProvider>
        </ServiceWorkerProvider>
        <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/22555624.js"></script>
      </body>
      {/* <GoogleAnalytics gaId="G-1PZR9P1E9V" /> */}
    </html>
  );
}
