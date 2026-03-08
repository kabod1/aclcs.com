import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Users, FolderOpen, Clock, CheckCircle, Eye, TrendingUp, Globe, FileText } from "lucide-react";
import Link from "next/link";
import ClientStatusButton from "@/components/admin/ClientStatusButton";

export const metadata = { title: "Admin Dashboard | ACLCS" };

function formatPath(path: string) {
  if (path === "/") return "Home";
  return path.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Core portal queries — must not fail
  const [r1, r2, r3, r4, r5, r6] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client").eq("status", "pending"),
    supabase.from("cases").select("*", { count: "exact", head: true }),
    supabase.from("cases").select("*", { count: "exact", head: true }).not("status", "in", '("completed")'),
    supabase.from("profiles").select("id, full_name, email, created_at").eq("role", "client").eq("status", "pending").order("created_at", { ascending: false }).limit(5),
    supabase.from("cases").select("id, reference_number, title, status, created_at, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
  ]);

  const totalClients = r1.count;
  const pendingClients = r2.count;
  const totalCases = r3.count;
  const activeCases = r4.count;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pendingList = r5.data as any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentCases = r6.data as any[];

  // Analytics queries — isolated so they never crash the page
  let pvTodayCount = 0;
  let pvWeekCount = 0;
  let pvMonthCount = 0;
  let topPages: [string, number][] = [];
  let topCountries: [string, number][] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentVisits: any[] = [];
  let analyticsError = false;
  let analyticsDebug = "";

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    analyticsDebug = `url=${url.length}chars key=${key.length}chars`;
    const admin = createAdminClient();
    const [pvToday, pvWeek, pvMonth, pvTopPages, pvCountries, pvRecent] = await Promise.all([
      admin.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", todayStart),
      admin.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", weekStart),
      admin.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", monthStart),
      admin.from("page_views").select("path").gte("created_at", monthStart),
      admin.from("page_views").select("country").gte("created_at", monthStart).not("country", "is", null),
      admin.from("page_views").select("path, country, created_at").order("created_at", { ascending: false }).limit(8),
    ]);

    if (pvToday.error || pvWeek.error || pvMonth.error) {
      analyticsError = true;
      analyticsDebug += ` err=${JSON.stringify(pvToday.error || pvWeek.error || pvMonth.error)}`;
    } else {
      pvTodayCount = pvToday.count ?? 0;
      pvWeekCount = pvWeek.count ?? 0;
      pvMonthCount = pvMonth.count ?? 0;

      const pageCounts: Record<string, number> = {};
      (pvTopPages.data ?? []).forEach((row: { path: string }) => {
        pageCounts[row.path] = (pageCounts[row.path] ?? 0) + 1;
      });
      topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

      const countryCounts: Record<string, number> = {};
      (pvCountries.data ?? []).forEach((row: { country: string }) => {
        if (row.country) countryCounts[row.country] = (countryCounts[row.country] ?? 0) + 1;
      });
      topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

      recentVisits = (pvRecent.data ?? []) as any[];
    }
  } catch (e) {
    analyticsError = true;
    analyticsDebug += ` catch=${e instanceof Error ? e.message : String(e)}`;
  }

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

      {/* Portal Stats */}
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

      {/* Website Analytics */}
      <div>
        <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-brand-500" />
          Website Traffic
        </h2>

        {analyticsError ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-sm text-amber-700 break-all">
            {analyticsDebug}
          </div>
        ) : (
          <>
            {/* Traffic counters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Views Today", value: pvTodayCount, icon: Eye, color: "text-purple-500", bg: "bg-purple-50" },
                { label: "Views This Week", value: pvWeekCount, icon: TrendingUp, color: "text-brand-500", bg: "bg-brand-50" },
                { label: "Views This Month", value: pvMonthCount, icon: Globe, color: "text-green-500", bg: "bg-green-50" },
              ].map((s) => {
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

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Top Pages */}
              <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-navy-100">
                  <h3 className="font-bold text-navy-900 flex items-center gap-2">
                    <FileText size={15} className="text-navy-400" />
                    Top Pages (30 days)
                  </h3>
                </div>
                {topPages.length > 0 ? (
                  <ul className="divide-y divide-navy-50">
                    {topPages.map(([path, count]) => (
                      <li key={path} className="px-6 py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">{formatPath(path)}</p>
                          <p className="text-xs text-navy-400 truncate">{path}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-16 bg-navy-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-brand-400 rounded-full"
                              style={{ width: `${Math.round((count / (topPages[0]?.[1] ?? 1)) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-navy-600 w-6 text-right">{count}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-6 py-8 text-sm text-navy-400 text-center">No data yet</p>
                )}
              </div>

              {/* Top Countries */}
              <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-navy-100">
                  <h3 className="font-bold text-navy-900 flex items-center gap-2">
                    <Globe size={15} className="text-navy-400" />
                    Top Countries (30 days)
                  </h3>
                </div>
                {topCountries.length > 0 ? (
                  <ul className="divide-y divide-navy-50">
                    {topCountries.map(([country, count]) => (
                      <li key={country} className="px-6 py-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-navy-800">{country}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-navy-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-green-400 rounded-full"
                              style={{ width: `${Math.round((count / (topCountries[0]?.[1] ?? 1)) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-navy-600 w-6 text-right">{count}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-6 py-8 text-sm text-navy-400 text-center">No data yet</p>
                )}
              </div>

              {/* Recent Visits */}
              <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-navy-100">
                  <h3 className="font-bold text-navy-900 flex items-center gap-2">
                    <Eye size={15} className="text-navy-400" />
                    Recent Visits
                  </h3>
                </div>
                {recentVisits.length > 0 ? (
                  <ul className="divide-y divide-navy-50">
                    {recentVisits.map((row, i) => (
                      <li key={i} className="px-6 py-2.5 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-navy-800 truncate">{formatPath(row.path)}</p>
                          <p className="text-xs text-navy-400">{row.country ?? "Unknown"}</p>
                        </div>
                        <p className="text-xs text-navy-400 shrink-0">
                          {new Date(row.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-6 py-8 text-sm text-navy-400 text-center">No visits yet</p>
                )}
              </div>
            </div>
          </>
        )}
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
                  <ClientStatusButton
                    clientId={client.id}
                    targetStatus="active"
                    label="Approve"
                    className="text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors shrink-0"
                  />
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
