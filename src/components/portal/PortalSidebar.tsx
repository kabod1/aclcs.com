"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/actions/auth";

const NAV = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "My Cases", href: "/portal/cases", icon: FolderOpen },
  { label: "Documents", href: "/portal/documents", icon: FileText },
  { label: "Profile", href: "/portal/profile", icon: User },
];

export default function PortalSidebar({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-navy-900 border-b border-white/10">
        <Link href="/portal/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-sm font-bold text-white">Client Portal</span>
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="text-white/60 hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`${
          open ? "flex" : "hidden"
        } lg:flex flex-col w-full lg:w-60 bg-navy-900 border-r border-white/10 lg:min-h-screen`}
      >
        {/* Logo */}
        <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-bold text-white">ACLCS Portal</p>
            <p className="text-xs text-white/40">Client Dashboard</p>
          </div>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-brand-400">
                {fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{fullName}</p>
              <p className="text-xs text-white/40 truncate">{email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-brand-500/20 text-brand-400"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-white/10">
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white/80 transition-all w-full"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
