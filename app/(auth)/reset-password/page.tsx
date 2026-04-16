"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return null;
  // COMMENTED OUT - Reset password page temporarily disabled (login/register disabled)
  // return (
  //   <Suspense>
  //     <ResetPasswordContent />
  //   </Suspense>
  // );
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8">
          <Image src="/logo.png" alt="R4Referral" width={40} height={40} className="h-[40px] w-[40px] object-contain dark:brightness-0 dark:invert" />
        </Link>

        <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-8 shadow-sm text-center">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-5 left-5 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image src="/logo.png" alt="R4Referral" width={40} height={40} className="h-[40px] w-[40px] object-contain dark:brightness-0 dark:invert" />
      </Link>

      {/* Card */}
      <div className="w-full max-w-[400px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-8 shadow-sm">
        {success ? (
          /* Success state */
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2">
              Password reset!
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
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
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                Set new password
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
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
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                  Min 8 characters with uppercase, lowercase, and a number
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm new password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
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

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
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
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
        © {new Date().getFullYear()} R4Referral LLC ·{" "}
        <Link
          href="/privacy-policy"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          Privacy
        </Link>
        {" "}·{" "}
        <Link
          href="/terms-of-service"
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          Terms
        </Link>
      </p>
    </div>
  );
}
