"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, PhoneCall, User } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={session?.user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 shadow-md shadow-brand-600/25">
            <PhoneCall className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">
            R4<span className="text-brand-600">Referral</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {!session?.user && NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-brand-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {session?.user ? (
            <>
              <Link
                href="/settings"
                className={`p-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100 hover:text-slate-900`}
                title="Settings"
              >
                <User className="h-5 w-5" />
              </Link>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/login"
                    ? "text-brand-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Log In
              </Link>
              <div className="btn-gradient-wrap rounded-md">
                <Button
                  asChild
                  className="btn-gradient text-white border-0 transition-all duration-200"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <ul className="flex flex-col px-4 py-4 gap-1">
            {!session?.user && NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-center ${
                    pathname === link.href
                      ? "bg-brand-50 text-brand-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-slate-100 mt-1 flex gap-2">
              {session?.user ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <Link href="/settings">Settings</Link>
                  </Button>
                  <Button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <div className="flex-1 btn-gradient-wrap rounded-md">
                    <Button
                      asChild
                      className="w-full btn-gradient text-white border-0"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
