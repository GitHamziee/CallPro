"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Menu, X, User, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  function handleMouseEnter() {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link href={session?.user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="R4Referral"
            width={40}
            height={40}
            className="h-[40px] w-[40px] object-contain dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {!session?.user && NAV_LINKS.map((link) => {
            const isActive = link.children
              ? pathname.startsWith(link.href)
              : pathname === link.href;

            // Link with dropdown (Services)
            if (link.children) {
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Dropdown panel */}
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72">
                      <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 shadow-xl shadow-slate-900/10 dark:shadow-black/30">
                        {link.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                            >
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 flex-shrink-0 mt-0.5 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                                <ChildIcon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                  {child.label}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {child.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                        <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                          <Link
                            href="/services"
                            className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
                          >
                            View All Services <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            // Regular link
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {session?.user ? (
            <>
              <Link
                href="/settings"
                className={`p-2 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white`}
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
            <></>
            /* COMMENTED OUT - Login/Register buttons temporarily disabled
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/login"
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
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
            */
          )}
        </div>

        {/* Mobile: theme toggle + hamburger grouped on the right */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <ul className="flex flex-col px-4 py-4 gap-1">
            {!session?.user && NAV_LINKS.map((link) => {
              const isActive = link.children
                ? pathname.startsWith(link.href)
                : pathname === link.href;

              // Link with mobile expandable sub-menu
              if (link.children) {
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`flex items-center justify-center gap-1.5 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-2 space-y-1">
                        {link.children.map((child) => {
                          const ChildIcon = child.icon;
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-start gap-3 rounded-lg px-3 py-3 transition-colors ${
                                isChildActive
                                  ? "bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700"
                                  : "hover:bg-white dark:hover:bg-slate-800 border border-transparent"
                              }`}
                            >
                              <div className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 ${
                                isChildActive
                                  ? "bg-brand-100 dark:bg-brand-900/50 border border-brand-200 dark:border-brand-700"
                                  : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                              }`}>
                                <ChildIcon className={`h-4 w-4 ${isChildActive ? "text-brand-600 dark:text-brand-400" : "text-slate-600 dark:text-slate-300"}`} />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-sm font-semibold ${isChildActive ? "text-brand-600 dark:text-brand-400" : "text-slate-900 dark:text-white"}`}>
                                  {child.label}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                  {child.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                        <Link
                          href="/services"
                          className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 mt-1 border border-dashed border-slate-300 dark:border-slate-600 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-white dark:hover:bg-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
                        >
                          View All Services <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </li>
                );
              }

              // Regular mobile link
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-center ${
                      isActive
                        ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1 flex gap-2">
              {session?.user ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
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
                <></>
                /* COMMENTED OUT - Login/Register buttons temporarily disabled
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
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
                */
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
