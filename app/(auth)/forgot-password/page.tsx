"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneCall, ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-md shadow-brand-600/30">
          <PhoneCall className="h-4.5 w-4.5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900">
          Call<span className="text-brand-600">Pro</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
        {submitted ? (
          /* Success state */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
              <Mail className="h-6 w-6 text-brand-600" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-2">
              Check your email
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              If an account exists for <strong>{email}</strong>, we&apos;ve sent
              a password reset link. It expires in 1 hour.
            </p>
            <Link
              href="/login"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          /* Form state */
          <>
            <div className="mb-7">
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                Forgot your password?
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold h-10 mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Reset Link <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-400">
        © {new Date().getFullYear()} CallPro ·{" "}
        <Link
          href="/privacy-policy"
          className="hover:text-slate-600 transition-colors"
        >
          Privacy
        </Link>
        {" "}·{" "}
        <Link
          href="/terms-of-service"
          className="hover:text-slate-600 transition-colors"
        >
          Terms
        </Link>
      </p>
    </div>
  );
}
