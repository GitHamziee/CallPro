import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/shared/PageLoader";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CallPro — Outbound Sales & Lead Generation",
    template: "%s | CallPro",
  },
  description:
    "CallPro is a results-driven call center specializing in outbound sales, appointment setting, and lead generation for B2B businesses.",
  keywords: ["call center", "outbound sales", "lead generation", "appointment setting", "B2B sales"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Providers>
          <PageLoader />
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
