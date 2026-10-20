import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import site from "@/content/site.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.seo.siteName,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#1b182b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${jetbrains.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          {site.header.skipLink}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
