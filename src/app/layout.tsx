import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothCursor from "@/components/SmoothCursor";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meridian — The Operating System for Modern Teams",
  description:
    "Meridian brings your workflows, insights, and collaboration into one powerful platform. Built for teams that move fast and think clearly.",
  keywords: ["productivity", "team collaboration", "workflow", "SaaS", "B2B"],
  openGraph: {
    title: "Meridian — The Operating System for Modern Teams",
    description:
      "Meridian brings your workflows, insights, and collaboration into one powerful platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-screen antialiased" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-primary)" }}>
        <SmoothCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
