"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { User, Lock, CreditCard } from "lucide-react";
import { PRICING_PLANS } from "@/lib/constants";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"account" | "security" | "billing">("account");
  const [currentPlan] = useState("Starter");

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to update profile");
        return;
      }

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to change password");
        return;
      }

      setSuccessMessage("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async (newPlan: string) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/change-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: newPlan }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to change plan");
        return;
      }

      setSuccessMessage("Plan updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account and security preferences</p>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="mb-6 p-4 pl-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg text-emerald-800 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="flex-1">{successMessage}</span>
            <button onClick={() => setSuccessMessage("")} className="text-emerald-600 hover:text-emerald-700">
              ✕
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 pl-5 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-800 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="flex-1">{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="text-red-600 hover:text-red-700">
              ✕
            </button>
          </div>
        )}

        {/* Settings Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-brand-50 text-brand-600 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Account</h2>
                      <p className="text-slate-600 text-sm mt-1">Update your profile information</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                      <p className="text-xs text-slate-500 mt-1">This is the name displayed on your profile</p>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                      <p className="text-xs text-slate-500 mt-1">Used for login and account notifications</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password Card */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Security</h2>
                      <p className="text-slate-600 text-sm mt-1">Manage your password and security settings</p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-semibold text-slate-900 mb-2">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-6">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4">New Password</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-2">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                            placeholder="••••••••"
                          />
                          <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                            Confirm Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Billing & Plans */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                {/* Current Plan Card */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Billing & Plans</h2>
                      <p className="text-slate-600 text-sm mt-1">Manage your subscription and upgrade or downgrade anytime</p>
                    </div>
                  </div>

                  <div className="mb-8 p-4 bg-brand-50 rounded-lg border border-brand-200">
                    <p className="text-sm text-slate-600 mb-2">Current Plan</p>
                    <h3 className="text-xl font-bold text-slate-900">{currentPlan}</h3>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4">Choose a Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PRICING_PLANS.map((plan) => (
                      <div
                        key={plan.name}
                        className={`relative rounded-lg border-2 p-6 transition-all ${
                          currentPlan === plan.name
                            ? "border-brand-600 bg-brand-50"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        {currentPlan === plan.name && (
                          <div className="absolute top-0 right-0 bg-brand-600 text-white px-3 py-1 rounded-bl-lg text-xs font-semibold">
                            Current
                          </div>
                        )}

                        <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                          <span className="text-slate-600 text-sm">{plan.period}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{plan.description}</p>

                        <ul className="space-y-2 mb-6">
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <svg className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {currentPlan !== plan.name && (
                          <button
                            onClick={() => handlePlanChange(plan.name)}
                            disabled={loading}
                            className="w-full px-4 py-2 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors"
                          >
                            {loading ? "Changing..." : "Switch Plan"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing Info Card */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Billing Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Billing Cycle</span>
                      <span className="font-semibold text-slate-900">Monthly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Next Billing Date</span>
                      <span className="font-semibold text-slate-900">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between">
                      <span className="text-slate-600">Auto-renewal</span>
                      <span className="font-semibold text-brand-600">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}          </div>
        </div>
      </div>
    </div>
  );
}