import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vanforces.com"),
  title: {
    default: "Vanforces | Connected Distribution Operations Platform",
    template: "%s | Vanforces",
  },
  description:
    "Vanforces connects field sales, van sales, routes, inventory, delivery, collections and business reporting for distribution businesses.",
  openGraph: {
    siteName: "Vanforces",
    type: "website",
    title: "Vanforces | Distribution Simplified.",
    description:
      "Connect your entire distribution operation, from the warehouse to the road and back to the office.",
    images: [{ url: "/product/cxo-finance.png", width: 1895, height: 902, alt: "Vanforces CXO Business Command Center" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Scroll reveals only hide content while JavaScript can show it again. If the page scripts never start, the timer removes the hiding. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__vfReveal)document.documentElement.classList.remove('js')},5000)",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
