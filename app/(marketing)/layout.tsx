import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TawkChat from "@/components/shared/TawkChat";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <TawkChat />
    </>
  );
}
