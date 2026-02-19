import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { setClientStatus } from "@/lib/actions/clients";
import InviteClientModal from "@/components/admin/InviteClientModal";

export const metadata = { title: "Clients | ACLCS Admin" };

const STATUS_BADGE: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  suspended: "bg-red-100 text-red-700",
};

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: { status?: string; q?: string };
}) {
  const supabase = await createClient();
  let query = supabase
    .from("profiles")
    .select("id, full_name, email, phone, nationality, status, created_at")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  if (searchParams.status) query = query.eq("status", searchParams.status);
  if (searchParams.q) query = query.ilike("full_name", `%${searchParams.q}%`);

  const { data: clients } = await query;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Clients</h1>
          <p className="text-sm text-navy-500 mt-1">{clients?.length ?? 0} registered clients</p>
        </div>
        <InviteClientModal />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["", "active", "pending", "suspended"].map((s) => (
          <Link
            key={s}
            href={s ? `/admin/clients?status=${s}` : "/admin/clients"}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              (searchParams.status ?? "") === s
                ? "bg-navy-900 text-white"
                : "bg-white border border-navy-200 text-navy-600 hover:border-brand-300"
            }`}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        {clients && clients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-50 border-b border-navy-100">
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Client</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Phone</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Nationality</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Status</th>
                  <th className="text-right px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-navy-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-brand-600">
                            {client.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <Link
                            href={`/admin/clients/${client.id}`}
                            className="font-semibold text-navy-900 hover:text-brand-500 transition-colors"
                          >
                            {client.full_name}
                          </Link>
                          <p className="text-xs text-navy-400">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-navy-600">{client.phone ?? "—"}</td>
                    <td className="px-5 py-3.5 text-navy-600">{client.nationality ?? "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[client.status] ?? ""}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        {client.status === "pending" && (
                          <form action={setClientStatus.bind(null, client.id, "active")}>
                            <button type="submit" className="text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">
                              Approve
                            </button>
                          </form>
                        )}
                        {client.status === "active" && (
                          <form action={setClientStatus.bind(null, client.id, "suspended")}>
                            <button type="submit" className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                              Suspend
                            </button>
                          </form>
                        )}
                        {client.status === "suspended" && (
                          <form action={setClientStatus.bind(null, client.id, "active")}>
                            <button type="submit" className="text-xs px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                              Reactivate
                            </button>
                          </form>
                        )}
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="text-xs px-3 py-1.5 border border-navy-200 text-navy-600 rounded-lg font-semibold hover:border-brand-300 hover:text-brand-500 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <UserPlus size={32} className="text-navy-200 mx-auto mb-3" />
            <p className="text-navy-400 text-sm">No clients found</p>
          </div>
        )}
      </div>
    </div>
  );
}
