import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ServiceCards from "@/components/services/ServiceCards";
import ServiceProcess from "@/components/services/ServiceProcess";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full suite of outbound sales services: outbound calling, appointment setting, lead qualification, CRM management, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="Our Services"
        title="Everything You Need to Dominate Outbound"
        subtitle="A complete outbound sales engine — from first dial to booked meeting. Powered by trained agents who understand how to sell."
      />
      <ServiceCards />
      <ServiceProcess />
    </>
  );
}
