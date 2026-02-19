"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { updatePassword } from "@/lib/actions/auth";
import { toast } from "sonner";
import { User, Lock, Shield, Eye, EyeOff } from "lucide-react";
import { NATIONALITIES } from "@/lib/utils";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data }) => setProfile(data));
      }
    });
  }, []);

  async function handleProfileUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.get("full_name") as string,
        phone: formData.get("phone") as string,
        nationality: formData.get("nationality") as string,
      })
      .eq("id", profile.id);

    setSaving(false);
    if (error) {
      toast.error("Failed to update profile: " + error.message);
    } else {
      toast.success("Profile updated successfully");
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const result = await updatePassword(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Password updated");
      (e.target as HTMLFormElement).reset();
    }
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">My Profile</h1>
        <p className="text-sm text-navy-500 mt-1">Manage your account information</p>
      </div>

      {/* Profile info */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <User size={18} className="text-brand-500" />
          <h2 className="font-bold text-navy-900">Personal Information</h2>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              defaultValue={profile.full_name ?? ""}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email ?? ""}
              disabled
              className="input-field opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-navy-400 mt-1">Email cannot be changed. Contact support if needed.</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              defaultValue={profile.phone ?? ""}
              placeholder="+357 XX XXX XXX"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Nationality</label>
            <select name="nationality" defaultValue={profile.nationality ?? ""} className="select-field">
              <option value="">Select nationality</option>
              {NATIONALITIES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary disabled:opacity-60 disabled:pointer-events-none"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Password change */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={18} className="text-brand-500" />
          <h2 className="font-bold text-navy-900">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Min 8 characters"
                className="input-field pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              required
              placeholder="Repeat new password"
              className="input-field"
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="btn-primary">
              <Shield size={16} />
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
