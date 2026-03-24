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
    default: "R4Referral — Premium Real Estate Referrals",
    template: "%s | R4Referral",
  },
  description:
    "R4Referral is a digital real estate referral network delivering verified, high-intent buyer and seller referrals directly to agents across all 50 states.",
  keywords: ["real estate referrals", "buyer referrals", "seller referrals", "real estate leads", "verified referrals"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <Providers>
          <PageLoader />
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
