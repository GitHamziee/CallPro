"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PhoneCall, ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // No token in URL
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="flex items-center gap-2.5 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-md shadow-brand-600/30">
            <PhoneCall className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            R4<span className="text-brand-600">Referral</span>
          </span>
        </Link>

        <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm text-center">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            This password reset link is missing or invalid. Please request a new
            one.
          </p>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

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
          R4<span className="text-brand-600">Referral</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm">
        {success ? (
          /* Success state */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight mb-2">
              Password reset!
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Your password has been updated successfully. You can now sign in
              with your new password.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Go to sign in <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          /* Form state */
          <>
            <div className="mb-7">
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                Set new password
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Min 8 characters with uppercase, lowercase, and a number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm new password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
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
                    Resetting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Reset Password <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                <Link
                  href="/forgot-password"
                  className="font-medium text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Request a new reset link
                </Link>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-400">
        © {new Date().getFullYear()} R4Referral ·{" "}
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
