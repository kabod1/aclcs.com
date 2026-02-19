import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { setClientStatus } from "@/lib/actions/clients";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  suspended: "bg-red-100 text-red-700",
};

export default async function AdminClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const [{ data: client }, { data: cases }] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", params.id)
      .eq("role", "client")
      .single(),
    supabase
      .from("cases")
      .select("id, reference_number, title, type, status, created_at")
      .eq("client_id", params.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!client) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/clients" className="text-navy-400 hover:text-navy-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{client.full_name}</h1>
          <p className="text-sm text-navy-400 mt-0.5">{client.email}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center">
              <span className="text-xl font-bold text-brand-600">
                {client.full_name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[client.status] ?? ""}`}>
                {client.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-navy-500">{client.phone ?? "No phone"}</p>
            <p className="text-navy-500">{client.nationality ?? "No nationality"}</p>
            <p className="text-xs text-navy-400">
              Registered {new Date(client.created_at).toLocaleDateString("en-GB")}
            </p>
          </div>

          {/* Status actions */}
          <div className="pt-3 border-t border-navy-100 space-y-2">
            {client.status !== "active" && (
              <form action={setClientStatus.bind(null, client.id, "active")}>
                <button type="submit" className="w-full text-sm px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                  Activate Account
                </button>
              </form>
            )}
            {client.status !== "suspended" && (
              <form action={setClientStatus.bind(null, client.id, "suspended")}>
                <button type="submit" className="w-full text-sm px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors">
                  Suspend Account
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Cases */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">Cases ({cases?.length ?? 0})</h2>
            <Link
              href={`/admin/cases/new?client=${client.id}`}
              className="text-xs text-brand-500 hover:text-brand-600 font-medium"
            >
              + New case
            </Link>
          </div>
          {cases && cases.length > 0 ? (
            <ul className="divide-y divide-navy-50">
              {cases.map((c) => (
                <li key={c.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{c.title}</p>
                    <p className="text-xs text-navy-400">{c.reference_number} · {c.type.replace(/-/g, " ")}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                      c.status === "completed" ? "bg-green-100 text-green-700" :
                      c.status === "approved" ? "bg-brand-100 text-brand-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {c.status.replace(/_/g, " ")}
                    </span>
                    <Link
                      href={`/admin/cases/${c.id}`}
                      className="text-xs px-2.5 py-1 border border-navy-200 text-navy-600 rounded-lg font-semibold hover:border-brand-300 hover:text-brand-500 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-10 text-sm text-navy-400 text-center">No cases for this client yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
