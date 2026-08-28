import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";

import "./globals.css";

import AppProvider from "@/components/providers/AppProvider";
import { SITE } from "@/constants/site";

import { AppPreloader } from "@/components/ui/Preloader";
import AppToaster from "@/components/ui/AppToaster";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marketsparks.top"),

  title: {
    default: "MarketSparks",
    template: "%s | MarketSparks",
  },

  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning className={cn("font-sans", geist.variable)}
    >
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AppProvider>
          <AppPreloader>
            {children}
          </AppPreloader>



          <AppToaster />
        </AppProvider>
      </body>
    </html>
  );
}