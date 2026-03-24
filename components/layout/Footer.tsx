import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin, Heart } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-section-dark">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <Image
                src="/logo-footer.png"
                alt="R4Referral"
                width={75}
                height={60}
                className="h-[60px] w-[75px] object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-xs text-sm text-white/60 leading-relaxed text-center md:text-left mx-auto md:mx-0">
              A digital real estate referral network delivering verified,
              high-intent referrals to agents across all 50 states.
            </p>
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white/50 transition-colors hover:border-brand-400/60 hover:text-brand-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2 text-sm text-white/60 items-center md:items-start">
              <a
                href="tel:+15126780096"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +1 (512) 678-0096
              </a>
              <a
                href="mailto:hello@r4referral.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                hello@r4referral.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                5900 Balcones Dr, Ste 100, Austin, TX 78731
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} R4Referral LLC. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by{" "}
            <a
              href="https://www.linkedin.com/in/hamziee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-brand-400 transition-colors"
            >
              Hamza
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
