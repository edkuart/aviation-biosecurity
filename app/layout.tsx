import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/language";
import SiteHeader from "@/components/layout/SiteHeader";
import SidebarNav from "@/components/layout/SidebarNav";
import SiteFooter from "@/components/layout/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aviation Biosecurity Knowledge Platform",
    template: "%s | Aviation Biosecurity",
  },
  description:
    "Academic study platform for aviation cabin biosecurity, sanitation, ozone, corrosion, disinsection, and airport drone safety. Bilingual: Azerbaijani and English.",
  keywords: ["aviation biosecurity", "ICAO", "WHO", "cabin sanitation", "disinsection", "ozone", "corrosion", "UAS", "airport safety"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="az"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-foreground flex flex-col">
        <LangProvider>
          <SiteHeader />
          <div className="flex flex-1 w-full">
            <SidebarNav />
            <main className="flex-1 min-w-0 flex flex-col">
              {children}
            </main>
          </div>
          <SiteFooter />
        </LangProvider>
      </body>
    </html>
  );
}
