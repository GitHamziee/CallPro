"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  return null;
  // COMMENTED OUT - Login page temporarily disabled
  // return (
  //   <Suspense>
  //     <LoginContent />
  //   </Suspense>
  // );
}

function LoginContent() {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    registered,
    registerHref,
    handleSubmit,
  } = useLogin();

  const [smsConsent, setSmsConsent] = useState(false);

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

        <div className="mb-7">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Sign in to R4Referral
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enter your credentials to access your portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {registered === "1" && (
            <p className="text-sm text-green-600">Account created, please sign in.</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-brand-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800 px-3.5 py-2.5 pr-10 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500/20"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
          </label>

          {/* SMS Consent (Optional) */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500/20 flex-shrink-0"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-700 dark:text-slate-300">SMS Updates </span>
                <span className="text-slate-400">(Optional)</span> — By checking this box, you agree to receive SMS from R4Referral LLC regarding your appointment request, including confirmations and follow-ups. Message frequency varies. Message &amp; data rates may apply. Reply STOP to opt out or HELP for assistance.
              </span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold h-10 mt-1"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            <Link href="/privacy-policy" className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            {" | "}
            <Link href="/terms-of-service" className="underline hover:text-slate-700 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
          </p>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href={registerHref} className="font-medium text-brand-600 hover:text-brand-700 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
        © {new Date().getFullYear()} R4Referral LLC ·{" "}
        <Link href="/privacy-policy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy</Link>
        {" "}·{" "}
        <Link href="/terms-of-service" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms</Link>
      </p>
    </div>
  );
}
