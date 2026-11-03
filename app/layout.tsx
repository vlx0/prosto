import type { Metadata } from "next";
import { Caveat, Cormorant, Inter } from "next/font/google";
import { content } from "@/content";
import { ApplyDialog } from "@/components/ApplyDialog";
import { Atmosphere } from "@/components/Atmosphere";
import { Hotbar } from "@/components/Hotbar";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="night"){document.documentElement.dataset.theme="night"}}catch(e){}})();`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-cream focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
        >
          {content.meta.skipToContent}
        </a>
        <Atmosphere />
        <Hotbar />
        {children}
        <ApplyDialog />
      </body>
    </html>
  );
}
