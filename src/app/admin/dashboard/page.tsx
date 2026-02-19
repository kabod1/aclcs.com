import { createClient } from "@/lib/supabase/server";
import { Users, FolderOpen, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { setClientStatus } from "@/lib/actions/clients";

export const metadata = { title: "Admin Dashboard | ACLCS" };

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalClients },
    { count: pendingClients },
    { count: totalCases },
    { count: activeCases },
    { data: pendingList },
    { data: recentCases },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client").eq("status", "pending"),
    supabase.from("cases").select("*", { count: "exact", head: true }),
    supabase.from("cases").select("*", { count: "exact", head: true }).not("status", "in", '("completed")'),
    supabase.from("profiles").select("id, full_name, email, created_at").eq("role", "client").eq("status", "pending").order("created_at", { ascending: false }).limit(5),
    supabase.from("cases").select("id, reference_number, title, status, created_at, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Total Clients", value: totalClients ?? 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Pending Approval", value: pendingClients ?? 0, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Total Cases", value: totalCases ?? 0, icon: FolderOpen, color: "text-brand-500", bg: "bg-brand-50" },
    { label: "Active Cases", value: activeCases ?? 0, icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
        <p className="text-navy-500 text-sm mt-1">Overview of your client portal</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-navy-100 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <Icon size={20} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-navy-900">{s.value}</p>
              <p className="text-xs text-navy-400 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">Pending Approvals</h2>
            <Link href="/admin/clients?status=pending" className="text-xs text-brand-500 hover:text-brand-600 font-medium">
              View all
            </Link>
          </div>
          {pendingList && pendingList.length > 0 ? (
            <ul className="divide-y divide-navy-50">
              {pendingList.map((client) => (
                <li key={client.id} className="px-6 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-brand-600">
                        {client.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{client.full_name}</p>
                      <p className="text-xs text-navy-400 truncate">{client.email}</p>
                    </div>
                  </div>
                  <form action={setClientStatus.bind(null, client.id, "active")}>
                    <button
                      type="submit"
                      className="text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors shrink-0"
                    >
                      Approve
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-8 text-sm text-navy-400 text-center">No pending approvals</p>
          )}
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">Recent Cases</h2>
            <Link href="/admin/cases" className="text-xs text-brand-500 hover:text-brand-600 font-medium">
              View all
            </Link>
          </div>
          {recentCases && recentCases.length > 0 ? (
            <ul className="divide-y divide-navy-50">
              {recentCases.map((c: any) => (
                <li key={c.id} className="px-6 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{c.title}</p>
                    <p className="text-xs text-navy-400">{c.reference_number} · {c.profiles?.full_name}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                    c.status === "completed" ? "bg-green-100 text-green-700" :
                    c.status === "approved" ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-8 text-sm text-navy-400 text-center">No cases yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
