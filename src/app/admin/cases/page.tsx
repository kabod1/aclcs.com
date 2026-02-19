import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, FolderOpen } from "lucide-react";

export const metadata = { title: "Cases | ACLCS Admin" };

const STATUS_BADGE: Record<string, string> = {
  enquiry: "bg-gray-100 text-gray-600",
  documents_required: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  submitted: "bg-purple-100 text-purple-700",
  approved: "bg-brand-100 text-brand-700",
  completed: "bg-green-100 text-green-700",
};

export default async function AdminCasesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = await createClient();
  let query = supabase
    .from("cases")
    .select("id, reference_number, title, type, status, created_at, profiles(full_name, email)")
    .order("created_at", { ascending: false });

  if (searchParams.status) query = query.eq("status", searchParams.status);

  const { data: cases } = await query;

  const statuses = ["enquiry", "documents_required", "under_review", "submitted", "approved", "completed"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Cases</h1>
          <p className="text-sm text-navy-500 mt-1">{cases?.length ?? 0} cases</p>
        </div>
        <Link href="/admin/cases/new" className="btn-primary">
          <Plus size={16} />
          New Case
        </Link>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        <Link
          href="/admin/cases"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            !searchParams.status ? "bg-navy-900 text-white" : "bg-white border border-navy-200 text-navy-600 hover:border-brand-300"
          }`}
        >
          All
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/cases?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
              searchParams.status === s ? "bg-navy-900 text-white" : "bg-white border border-navy-200 text-navy-600 hover:border-brand-300"
            }`}
          >
            {s.replace(/_/g, " ")}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        {cases && cases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-50 border-b border-navy-100">
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Reference</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Case</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Client</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Status</th>
                  <th className="text-right px-5 py-3 font-semibold text-navy-600 text-xs uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {cases.map((c: any) => (
                  <tr key={c.id} className="hover:bg-navy-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-navy-500">{c.reference_number}</td>
                    <td className="px-5 py-3.5 font-semibold text-navy-900 max-w-[200px] truncate">{c.title}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-navy-700 font-medium">{c.profiles?.full_name}</p>
                      <p className="text-xs text-navy-400">{c.profiles?.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-navy-600 capitalize">{c.type.replace(/-/g, " ")}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[c.status] ?? ""}`}>
                        {c.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/cases/${c.id}`}
                        className="text-xs px-3 py-1.5 border border-navy-200 text-navy-600 rounded-lg font-semibold hover:border-brand-300 hover:text-brand-500 transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <FolderOpen size={32} className="text-navy-200 mx-auto mb-3" />
            <p className="text-navy-400 text-sm">No cases found</p>
          </div>
        )}
      </div>
    </div>
  );
}
