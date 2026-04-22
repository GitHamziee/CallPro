import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/site-settings";
// import TawkChat from "@/components/shared/TawkChat";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hidePages } = await getSiteSettings();
  return (
    <>
      <Navbar showAuthLinks={!hidePages} />
      <main>{children}</main>
      <Footer />
      {/* <TawkChat /> */}
    </>
  );
}
