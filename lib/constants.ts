import {
  Home,
  Headphones,
  Globe,
  Target,
  MapPin,
  Bot,
  ShieldCheck,
  CalendarCheck,
  ClipboardList,
  Users,
  Code,
  Database,
  Cloud,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string; icon: LucideIcon; description: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Real Estate Referrals", href: "/services/lead-generation", icon: Home, description: "AI-verified buyer & seller referrals" },
      { label: "Virtual Assistant", href: "/services/virtual-assistant", icon: Headphones, description: "Dedicated VAs for real estate" },
      { label: "Web Development", href: "/services/web-development", icon: Globe, description: "Full-stack development by a 15+ engineer team" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { target: 1250, suffix: "+", decimals: 0, label: "Agents Onboard" },
  { target: 36, suffix: "K+", decimals: 0, label: "Referrals Delivered" },
  { target: 98, suffix: "%", decimals: 0, label: "Satisfaction Rate" },
  { target: 50, suffix: "", decimals: 0, label: "States Covered" },
];

export const SERVICES = [
  {
    icon: Home,
    slug: "lead-generation",
    title: "Real Estate Referrals",
    description:
      "AI-powered, verified buyer and seller referrals delivered directly to your inbox — pre-screened for genuine intent.",
    metric: "Multi-stage verification process",
    bullets: [
      "Hyper-local targeting by zip code, city, or county",
      "AI filtering eliminates fake and duplicate referrals",
      "ISA-validated referrals with confirmed contact info",
    ],
    href: "/services/lead-generation",
  },
  {
    icon: Headphones,
    slug: "virtual-assistant",
    title: "Virtual Assistant",
    description:
      "Dedicated virtual assistants who handle admin, follow-ups, and referral nurturing so you can focus on closing deals.",
    metric: "Save 20+ hrs/week on admin tasks",
    bullets: [
      "Trained VAs familiar with real estate workflows",
      "Referral follow-up and appointment scheduling",
      "CRM updates, transaction coordination, and more",
    ],
    href: "/services/virtual-assistant",
  },
  {
    icon: Globe,
    slug: "web-development",
    title: "Website Development",
    description:
      "Full-stack web & mobile development by our 15+ engineer software house — React, Next.js, Node.js, Python, Flutter, AWS, and more.",
    metric: "Full-stack team across 12+ tech stacks",
    bullets: [
      "React, Next.js, Angular, Vue.js & Node.js",
      "Python, Django, .NET, Laravel & Spring Boot",
      "AWS, Azure, GCP, Docker & Kubernetes",
    ],
    href: "/services/web-development",
  },
];

export const SERVICE_PAGE_CONTENT: Record<string, {
  badge: string;
  headline: string;
  highlightedText: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  features: { icon: LucideIcon; title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faq: { question: string; answer: string }[];
}> = {
  "lead-generation": {
    badge: "Real Estate Referrals",
    headline: "Verified Referrals That ",
    highlightedText: "Actually Convert",
    subtitle:
      "Stop wasting time on dead-end referrals. Our AI-powered verification and ISA team deliver pre-screened, high-intent buyer and seller referrals directly to your dashboard.",
    stats: [
      { value: "36K+", label: "Referrals Delivered" },
      { value: "98%", label: "Verification Rate" },
      { value: "50", label: "States Covered" },
    ],
    features: [
      { icon: Target, title: "Hyper-Local Targeting", description: "Target referrals by zip code, city, county, or entire state. You define your farm area, we deliver referrals in it." },
      { icon: ShieldCheck, title: "Multi-Stage Verification", description: "Every referral passes through AI filtering and human ISA validation before reaching your dashboard." },
      { icon: MapPin, title: "Nationwide Coverage", description: "We generate and verify referrals across all 50 US states with deep market penetration in every region." },
      { icon: Bot, title: "AI-Powered Filtering", description: "Our AI eliminates fake entries, duplicates, and low-intent inquiries so you only see real opportunities." },
    ],
    process: [
      { step: "01", title: "Set Your Preferences", description: "Tell us your target areas, property types, and budget range. We tailor every referral to your market." },
      { step: "02", title: "We Source & Verify", description: "Our AI filters and ISA team validate every referral for genuine intent — no fakes, no duplicates." },
      { step: "03", title: "Referrals Delivered", description: "Verified referrals appear in your dashboard in real-time with full contact info and property details." },
      { step: "04", title: "Close & Grow", description: "Focus on closing deals. Track your ROI with transparent reporting and scale when you're ready." },
    ],
    faq: [
      { question: "How are referrals verified?", answer: "Every referral goes through a multi-stage process: AI filtering removes fakes and duplicates, then our trained ISA team validates intent via phone and email confirmation." },
      { question: "How quickly will I receive referrals?", answer: "Most agents start receiving verified referrals within 3–5 business days of signing up and setting their targeting preferences." },
      { question: "Can I target specific areas?", answer: "Yes. You can target by zip code, city, county, or entire state. Set as many target areas as you need — there's no limit." },
      { question: "What information comes with each referral?", answer: "Each referral includes full name, verified phone number, email, property address, property type, timeline, and intent signals." },
    ],
  },
  "virtual-assistant": {
    badge: "Virtual Assistant",
    headline: "Your Dedicated ",
    highlightedText: "Real Estate VA",
    subtitle:
      "Free up 20+ hours per week with a trained virtual assistant who handles admin, follow-ups, and referral nurturing so you can focus on showings and closings.",
    stats: [
      { value: "20+", label: "Hours Saved Weekly" },
      { value: "100%", label: "US-Trained VAs" },
      { value: "24/7", label: "Availability" },
    ],
    features: [
      { icon: CalendarCheck, title: "Appointment Scheduling", description: "Your VA books showings, follow-up calls, and meetings directly on your calendar — no more phone tag." },
      { icon: ClipboardList, title: "Transaction Coordination", description: "From contract to close, your VA manages paperwork, deadlines, and vendor communication." },
      { icon: Users, title: "Referral Follow-Up", description: "Systematic follow-up sequences ensure no referral falls through the cracks. Your VA nurtures until they're ready." },
      { icon: Bot, title: "CRM Management", description: "Your VA keeps your CRM updated with notes, status changes, and activity logs after every interaction." },
    ],
    process: [
      { step: "01", title: "Onboarding Call", description: "We learn your workflows, tools, and preferences to match you with the perfect VA for your business." },
      { step: "02", title: "VA Assignment", description: "Your dedicated VA is trained on your specific systems, scripts, and processes before day one." },
      { step: "03", title: "Daily Operations", description: "Your VA handles admin tasks, referral follow-ups, and scheduling while you focus on revenue-generating activities." },
      { step: "04", title: "Weekly Reviews", description: "Regular check-ins ensure your VA stays aligned with your goals and continuously improves." },
    ],
    faq: [
      { question: "What tasks can a VA handle?", answer: "Referral follow-up, appointment scheduling, CRM updates, transaction coordination, email management, social media posting, and general admin work." },
      { question: "Are VAs trained in real estate?", answer: "Yes. All our VAs are specifically trained in real estate workflows, terminology, and common tools like KvCORE, Follow Up Boss, and more." },
      { question: "How many hours per week?", answer: "We offer flexible plans from 20 to 40 hours per week depending on your needs. Most agents start with 20 hours and scale up." },
      { question: "Can I communicate directly with my VA?", answer: "Absolutely. You'll have direct access via phone, email, and your preferred messaging platform for real-time communication." },
    ],
  },
  "web-development": {
    badge: "Software House — 15+ Engineers",
    headline: "Full-Stack Development, ",
    highlightedText: "Any Technology",
    subtitle:
      "We're a 15+ engineer software house delivering production-grade web apps, mobile apps, and cloud infrastructure. React, Next.js, Angular, Vue, Node.js, Python, Django, .NET, Laravel, Flutter, AWS — we work across every major stack.",
    stats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "12+", label: "Tech Stacks" },
      { value: "99%", label: "Client Retention" },
    ],
    features: [
      { icon: Code, title: "Frontend Engineering", description: "React, Next.js, Angular, Vue.js, TypeScript, Tailwind CSS, Framer Motion — responsive, mobile-first interfaces built for performance and accessibility." },
      { icon: Database, title: "Backend & Databases", description: "Node.js, Express, Python, Django, Flask, .NET, Laravel, Spring Boot, PHP. PostgreSQL, MySQL, MongoDB, Redis, Firebase, and Supabase." },
      { icon: Smartphone, title: "Mobile Development", description: "Flutter, React Native, Swift, and Kotlin for cross-platform and native iOS/Android apps with shared business logic and native performance." },
      { icon: Cloud, title: "Cloud & DevOps", description: "AWS, Azure, GCP, Docker, Kubernetes, CI/CD pipelines, Terraform. Scalable infrastructure with monitoring, auto-scaling, and zero-downtime deployments." },
    ],
    process: [
      { step: "01", title: "Discovery & Architecture", description: "We scope your requirements, choose the optimal tech stack, and design the system architecture — database schemas, API contracts, and infrastructure." },
      { step: "02", title: "UI/UX & Prototyping", description: "Figma designs and interactive prototypes using your brand guidelines. Mobile-first wireframes reviewed and approved before any code is written." },
      { step: "03", title: "Agile Development", description: "Sprint-based development with weekly demos. Code reviews, automated testing, CI/CD pipelines, and staging deployments throughout." },
      { step: "04", title: "Deploy & Scale", description: "Production deployment on your preferred cloud (AWS, Azure, Vercel, GCP) with SSL, CDN, monitoring, and ongoing maintenance." },
    ],
    faq: [
      { question: "What technologies do you work with?", answer: "Frontend: React, Next.js, Angular, Vue.js, TypeScript, Tailwind CSS. Backend: Node.js, Express, Python, Django, Flask, .NET, PHP, Laravel, Java, Spring Boot. Mobile: Flutter, React Native, Swift, Kotlin. Databases: PostgreSQL, MySQL, MongoDB, Redis, Firebase, Supabase. Cloud: AWS, Azure, GCP, Docker, Kubernetes, Terraform." },
      { question: "How large is your team?", answer: "We have 15+ full-time engineers across frontend, backend, mobile, DevOps, and QA — plus dedicated project managers and UI/UX designers. Every project gets a cross-functional team assigned from day one." },
      { question: "How long does a project take?", answer: "Landing pages and marketing sites take 1–2 weeks. Full-stack web apps with dashboards and auth take 4–8 weeks. Enterprise platforms and mobile apps typically run 8–16 weeks depending on scope." },
      { question: "Do you build custom dashboards, portals, and SaaS products?", answer: "Yes. We've built admin panels, client portals, CRM systems, referral management dashboards, analytics platforms, and multi-tenant SaaS products — all custom-coded from scratch." },
      { question: "What about hosting, deployment, and ongoing support?", answer: "We deploy to AWS, Azure, Vercel, GCP, or your own infrastructure. All projects include SSL, CDN, CI/CD pipelines, automated backups, and optional monthly maintenance plans with SLA-backed support." },
      { question: "Can you integrate with third-party services?", answer: "Absolutely. We've integrated Stripe, PayPal, Twilio, SendGrid, Resend, Google Maps, Mapbox, Salesforce, HubSpot, MLS/IDX feeds, OpenAI, and custom REST/GraphQL APIs." },
    ],
  },
};

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign Up & Set Preferences",
    description:
      "Tell us your target areas, property types, and referral preferences. We'll tailor everything to your market.",
  },
  {
    step: "02",
    title: "We Source & Verify Referrals",
    description:
      "Our AI filters and ISA team validate every referral for genuine intent — no fakes, no duplicates, no tire-kickers.",
  },
  {
    step: "03",
    title: "Referrals Delivered to You",
    description:
      "Verified referrals are sent directly to your dashboard in real-time. Contact info, intent signals, and property details included.",
  },
  {
    step: "04",
    title: "Close & Grow",
    description:
      "Focus on what you do best — closing deals. Track your ROI with transparent reporting and scale when you're ready.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Honestly didn't expect much at first, but the referrals were actually legit. Closed my first deal within three weeks and I've been getting consistent ones since. Way better than what I was getting from Zillow.",
    name: "Marcus T.",
    title: "Licensed Realtor",
    company: "eXp Realty",
    result: "3 closings in first 30 days",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    quote:
      "I was spending like 2 hours a day just following up with dead referrals. Switched to R4Referral and the difference is night and day — these people actually want to talk to you. Saved me so much time.",
    name: "Sarah K.",
    title: "Broker Associate",
    company: "Keller Williams",
    result: "12 verified referrals in 60 days",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
  },
  {
    quote:
      "The VA handles all my scheduling and follow-ups now. I used to miss callbacks all the time, but now everything's organized. Honestly can't imagine going back to doing it all myself.",
    name: "David R.",
    title: "Real Estate Agent",
    company: "Coldwell Banker",
    result: "20+ hours saved weekly",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
  },
];

export const PRICING_PLANS = [
  {
    name: "Standard",
    price: "$375",
    period: "lifetime",
    description:
      "Start with zero risk. Pay only for referrals you accept — cancel anytime.",
    features: [
      "$375 one-time setup (lifetime access)",
      "$100 per accepted referral",
      "Minimum 2 referrals",
      "Human verified referrals",
      "Live transfers",
      "Scheduled appointments (with recording)",
      "Premium portal access",
      "Free follow-up",
      "24/7 customer support",
      "Cancel anytime",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Gold",
    price: "$949",
    originalPrice: "$1,375",
    period: "one-time",
    description:
      "Best value — 10 guaranteed referrals at a steep discount. Everything included.",
    features: [
      "10 guaranteed referrals",
      "Human verified referrals",
      "Live transfers",
      "Scheduled appointments (with recording)",
      "Premium portal access",
      "Free follow-up",
      "24/7 customer support",
    ],
    cta: "Best Value",
    highlighted: true,
  },
  {
    name: "Platinum",
    price: "$699",
    period: "/4 months",
    description:
      "High volume referrals with low upfront cost and a small referral fee on closings.",
    features: [
      "$699 for 4-month term",
      "8–12 referrals included",
      "15% referral fee per closing",
      "Human verified referrals",
      "Scheduled appointments (with recording)",
      "Exclusive referrals",
      "Premium portal access",
      "Free follow-up",
      "Reimbursement offer",
      "24/7 customer support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
];

export const PRICING_FAQ = [
  {
    question: "How does the Standard plan work?",
    answer:
      "You pay a one-time $375 setup fee for lifetime access, then $100 for each referral you accept. All referrals are human verified with live transfers and scheduled appointments. You can cancel anytime.",
  },
  {
    question: "What's included in the Gold plan?",
    answer:
      "The Gold plan gives you 10 guaranteed, human-verified referrals for a one-time payment of $949 (originally $1,375). Every referral comes with live transfers, scheduled appointments with recordings, premium portal access, free follow-up, and 24/7 support.",
  },
  {
    question: "How does the Platinum plan work?",
    answer:
      "For $699 you get 8–12 exclusive referrals over a 4-month term. There's a 15% referral fee on closings. If referrals don't meet our quality standards, we offer reimbursement. Includes scheduled appointments, premium portal, and 24/7 support.",
  },
  {
    question: "What does 'human verified' mean?",
    answer:
      "Every referral is verified by a real person on our team — not just a form submission. We confirm intent, contact details, and readiness before a referral is delivered to you.",
  },
  {
    question: "What are live transfers?",
    answer:
      "When we connect with a qualified referral, we transfer the call directly to you in real time. You speak with them while their interest is at its highest.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade or switch plans at any time. Contact our team and we'll help you transition to the plan that fits your needs.",
  },
  {
    question: "How quickly will I start receiving referrals?",
    answer:
      "Most agents start receiving verified referrals within 3–5 business days of signing up and setting their targeting preferences.",
  },
  {
    question: "What's the reimbursement offer on the Platinum plan?",
    answer:
      "You get full upfront payment reimbursed on the first close through the Platinum plan. Not valid for the Standard or Gold plans.",
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
    { label: "Real Estate Referrals", href: "/services/lead-generation" },
    { label: "Virtual Assistant", href: "/services/virtual-assistant" },
    { label: "Web Development", href: "/services/web-development" },
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

export const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

/** O(1) lookup: state code → full label (e.g. "FL" → "Florida") */
export const US_STATE_MAP = new Map(US_STATES.map((s) => [s.value, s.label]));
