"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/actions/auth";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Cases", href: "/admin/cases", icon: FolderOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-navy-900 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image
            src="/images/20260304_191137.png"
            alt="ACLCS"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg"
          />
          <span className="text-sm font-bold text-white">Admin Panel</span>
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="text-white/60 hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "flex" : "hidden"
        } lg:flex flex-col w-full lg:w-60 bg-navy-900 border-r border-white/10 lg:min-h-screen`}
      >
        {/* Desktop logo */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-4 border-b border-white/10">
          <Image
            src="/images/20260305_055231.png"
            alt="ACLCS – A&C Lazarou Corporate Services Limited"
            width={180}
            height={54}
            className="h-12 w-auto"
          />
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
