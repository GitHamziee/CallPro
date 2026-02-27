"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Lock, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"account" | "security" | "billing">("account");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Sync form data when session loads
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

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

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to update profile");
        return;
      }

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
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

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to change password");
        return;
      }

      setSuccessMessage("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = session?.user?.role === "ADMIN";

  type TabId = "account" | "security" | "billing";
  const allTabs: { id: TabId; label: string; icon: typeof User; userOnly?: boolean }[] = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing & Plans", icon: CreditCard, userOnly: true },
  ];

  const tabs = allTabs.filter((tab) => !tab.userOnly || !isAdmin);

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm text-slate-500 mb-6">
        Manage your account, security, and billing preferences.
      </p>

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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tab Navigation */}
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
                        <p className="text-xs text-slate-500 mt-1">Min 8 characters with uppercase, lowercase, and a number</p>
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

          {/* Billing & Plans — users only */}
          {activeTab === "billing" && !isAdmin && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Billing & Plans</h2>
                    <p className="text-slate-600 text-sm mt-1">Manage your subscription and billing</p>
                  </div>
                </div>

                <div className="text-center py-12">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Subscription</h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                    Browse our available packages to find the right plan for your business.
                  </p>
                  <a
                    href="/packages"
                    className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    View Packages
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
