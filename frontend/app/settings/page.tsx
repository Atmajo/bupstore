"use client";

import { useState } from "react";
import { withAuth, useAuth } from "@/context/AuthContext";
import { apiClient } from "@/hooks/useApi";
import Navbar from "@/components/Navbar";
import { ProgressBar } from "@/components/ProgressBar";
import Link from "next/link";

function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("general");

  // Profile form
  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 2FA Dialog
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [twoFAPassword, setTwoFAPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await apiClient.put("/api/settings/profile", {
        name,
        username,
      });
      setSuccess("Profile updated successfully!");
      await refreshUser();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.put("/api/settings/password", {
        currentPassword,
        newPassword,
      });
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASetup = () => {
    setShow2FADialog(true);
    setError("");
    setSuccess("");
  };

  const confirm2FA = async () => {
    if (!twoFAPassword) {
      setError("Please enter your current password");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await apiClient.post("/api/settings/2fa", {
        password: twoFAPassword,
      });
      setSuccess("Two-Factor Authentication enabled successfully!");
      setShow2FADialog(false);
      setTwoFAPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to enable 2FA. Please check your password.");
    } finally {
      setIsLoading(false);
    }
  };

  const cancel2FADialog = () => {
    setShow2FADialog(false);
    setTwoFAPassword("");
    setError("");
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-400">
          <Link href="/dashboard" className="hover:text-primary">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-white">Settings</span>
        </nav>

        {/* Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">
              Account Settings
            </h1>
            <p className="text-slate-400">
              Update your personal details, security preferences, and data
              portability.
            </p>
          </div>
          <button
            onClick={handleProfileUpdate}
            disabled={isLoading}
            className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Side Navigation */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="p-2 glass-card rounded-xl">
              <button
                onClick={() => setActiveTab("general")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "general"
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined">person</span>
                <span>General</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "security"
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined">security</span>
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab("data")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "data"
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined">database</span>
                <span>Data Management</span>
              </button>
            </div>

            <div className="p-4 glass-card rounded-xl mt-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Storage Usage
              </p>
              <ProgressBar
                value={0.1}
                max={1}
                height="md"
                showPercentage
                label="Used Storage"
              />
              <p className="text-xs text-[#9d9db9] mt-2">0.1 GB of 1 GB used</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* General Tab */}
            {activeTab === "general" && (
              <section className="glass-card rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">
                    account_circle
                  </span>
                  <h2 className="text-xl font-bold">Profile Information</h2>
                </div>

                <form onSubmit={handleProfileUpdate}>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-32 rounded-full border-4 border-primary/20 p-1">
                        <div className="size-full rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
                          {user?.name?.toUpperCase()[0] ||
                            user?.email?.toUpperCase()[0] ||
                            "U"}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-sm font-bold text-primary hover:underline"
                      >
                        Change Photo
                      </button>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">
                          Username
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <section className="glass-card rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">
                    lock_reset
                  </span>
                  <h2 className="text-xl font-bold">Security</h2>
                </div>

                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/5 border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </button>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center">
                        <span className="material-symbols-outlined">
                          verified_user
                        </span>
                      </div>
                      <div>
                        <p className="font-bold">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-400">
                          Add an extra layer of security to your account.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handle2FASetup}
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      Configure 2FA
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Data Management Tab */}
            {activeTab === "data" && (
              <section className="glass-card rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary">
                    data_usage
                  </span>
                  <h2 className="text-xl font-bold">Data Management</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div>
                      <h3 className="font-bold mb-1">Export Data</h3>
                      <p className="text-sm text-slate-400">
                        Download a complete backup of all your codes and
                        settings in CSV or JSON format.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all">
                        CSV
                      </button>
                      <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-primary hover:text-white transition-all">
                        JSON
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 space-y-4">
                    <div>
                      <h3 className="font-bold text-red-500 mb-1">
                        Danger Zone
                      </h3>
                      <p className="text-sm text-slate-400">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>
                    </div>
                    <button className="w-full py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* 2FA Confirmation Dialog */}
      {show2FADialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">
                  verified_user
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Enable Two-Factor Authentication</h3>
                <p className="text-sm text-slate-400">Confirm your password to continue</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">
                Current Password
              </label>
              <input
                type="password"
                value={twoFAPassword}
                onChange={(e) => setTwoFAPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && confirm2FA()}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Enter your current password"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancel2FADialog}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg font-bold hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirm2FA}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(SettingsPage);
