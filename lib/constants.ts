import { Phone, Calendar, Users, BarChart3, MessageSquare, Target } from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: "10M+", label: "Calls Made" },
  { value: "500+", label: "Clients Served" },
  { value: "38%", label: "Avg. Conversion Lift" },
  { value: "99.2%", label: "Client Retention Rate" },
];

export const SERVICES = [
  {
    icon: Phone,
    title: "Cold Calling",
    description:
      "Our trained agents deliver high-impact cold calling campaigns that open doors and generate qualified pipeline fast.",
    metric: "500+ calls/day per agent",
    bullets: [
      "Agents trained on your ICP, value prop & objections",
      "Real-time call monitoring with live coaching",
      "Daily outcome tracking with conversion metrics",
    ],
    href: "/services",
  },
  {
    icon: Calendar,
    title: "Appointment Setting",
    description:
      "We fill your calendar with verified, high-intent appointments so your closers can focus on closing.",
    metric: "47 avg. booked meetings/month",
    bullets: [
      "Pre-qualified prospects matched to your ideal buyer",
      "Calendar integration with instant booking confirmations",
      "No-show follow-up and rescheduling included",
    ],
    href: "/services",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description:
      "Every lead is pre-screened and scored against your ideal customer profile before it ever reaches your team.",
    metric: "3× higher close rate on qualified leads",
    bullets: [
      "Custom qualification criteria based on your ICP",
      "BANT-style scoring on every prospect",
      "Detailed handoff notes delivered to your sales team",
    ],
    href: "/services",
  },
  {
    icon: MessageSquare,
    title: "Follow-Up Campaigns",
    description:
      "Multi-touch follow-up sequences that nurture cold and warm prospects until they're ready to buy.",
    metric: "5-touch avg. follow-up sequence",
    bullets: [
      "Multi-channel follow-up coordinated across phone & email",
      "Automated scheduling with human touch points",
      "Warm lead reactivation from your existing database",
    ],
    href: "/services",
  },
  {
    icon: Target,
    title: "CRM Management",
    description:
      "We keep your CRM clean, accurate, and up-to-date so your pipeline data is always reliable.",
    metric: "100% data accuracy SLA",
    bullets: [
      "Real-time CRM updates after every call outcome",
      "Custom field mapping to your CRM structure",
      "Duplicate removal and ongoing data hygiene",
    ],
    href: "/services",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description:
      "Transparent, real-time dashboards with call recordings, conversion metrics, and actionable insights.",
    metric: "Live dashboard access 24/7",
    bullets: [
      "Full call recordings accessible anytime in your portal",
      "Weekly executive summary reports emailed to your team",
      "KPI tracking: calls, contacts, appointments, conversions",
    ],
    href: "/services",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Onboarding & Discovery",
    description:
      "We deep-dive into your product, target market, and goals to build a campaign tailored precisely to your needs.",
  },
  {
    step: "02",
    title: "Script Development",
    description:
      "Our copywriters craft proven, conversion-tested scripts aligned with your voice, value prop, and objection handling.",
  },
  {
    step: "03",
    title: "Campaign Launch",
    description:
      "Your dedicated agent team hits the phones. We monitor every call for quality and continuously optimize performance.",
  },
  {
    step: "04",
    title: "Results & Reporting",
    description:
      "Weekly performance reports with full transparency. Meetings booked, pipelines built, revenue driven.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Within 90 days they booked us 47 qualified appointments. Our close rate jumped 22%. Absolute game-changer for our sales team.",
    name: "Marcus T.",
    title: "VP of Sales",
    company: "ProGrowth Solutions",
    result: "47 appointments · 22% close rate lift",
  },
  {
    quote:
      "We'd tried two other call centers before. This team is different — they actually understand our product and sound like they work for us.",
    name: "Sarah K.",
    title: "Founder & CEO",
    company: "Apex Realty Group",
    result: "Pipeline filled in under 45 days",
  },
  {
    quote:
      "The reporting is crystal clear and the agents are professional. Our pipeline went from dry to full in under 60 days.",
    name: "David R.",
    title: "Director of Business Development",
    company: "Meridian Financial",
    result: "$280K pipeline built in 60 days",
  },
];

export const PRICING_PLANS = [
  {
    name: "Pay Per Lead",
    price: "$375",
    period: "one-time setup",
    description: "Only pay for the leads you receive. No commitment, no risk.",
    features: [
      "$375 one-time setup fee",
      "$100 per qualified lead",
      "Lifetime access — no expiry",
      "Pay as you go",
      "Lead details shown after payment",
      "Cancel anytime",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Bi-Annual",
    price: "$699",
    period: "/6 months",
    description:
      "Our most popular plan. High volume leads with performance-based pricing.",
    features: [
      "$699 for 6-month term",
      "12–15 qualified leads included",
      "15% commission per closing",
      "Lead info available immediately",
      "Re-activate after 6 months",
      "Priority support",
    ],
    cta: "Most Popular",
    highlighted: true,
  },
  {
    name: "Mega Bundle",
    price: "$825",
    period: "one-time",
    description:
      "Maximum value with guaranteed leads and the biggest savings.",
    features: [
      "$825 one-time payment",
      "10 guaranteed leads",
      "40% off standard pricing",
      "Lead info available immediately",
      "Plan expires after 10 leads",
      "Best value per lead",
    ],
    cta: "Best Value",
    highlighted: false,
  },
];

export const PRICING_FAQ = [
  {
    question: "How does Pay Per Lead work?",
    answer:
      "You pay a one-time $375 setup fee, then $100 for each qualified lead we deliver. There's no expiry — your account stays active for life. Lead details are shared after payment.",
  },
  {
    question: "What's included in the Bi-Annual plan?",
    answer:
      "For $699 you get 12–15 qualified leads over a 6-month period, plus a 15% commission on each successful closing. Lead information is available immediately. You can re-activate after the term ends.",
  },
  {
    question: "How does the Mega Bundle expire?",
    answer:
      "The Mega Bundle gives you 10 guaranteed leads at 40% off. Once all 10 leads have been delivered, the plan is complete. It's the best value per lead we offer.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade or switch plans at any time. Contact our team and we'll help you transition to the plan that fits your needs.",
  },
  {
    question: "How quickly can you get started?",
    answer:
      "Most campaigns launch within 5–7 business days of signing. Onboarding and setup are included with every plan.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We serve B2B businesses across real estate, financial services, SaaS, insurance, and professional services. Our agents are trained in your vertical.",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "James Harlow",
    title: "Founder & CEO",
    image: null,
  },
  {
    name: "Priya Anand",
    title: "Head of Operations",
    image: null,
  },
  {
    name: "Carlos Mendez",
    title: "Director of Training",
    image: null,
  },
  {
    name: "Leah Fontaine",
    title: "Client Success Manager",
    image: null,
  },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Cold Calling", href: "/services" },
    { label: "Appointment Setting", href: "/services" },
    { label: "Lead Qualification", href: "/services" },
    { label: "CRM Management", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};
