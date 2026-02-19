import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FolderOpen, FileText, ArrowRight, AlertCircle } from "lucide-react";

export const metadata = { title: "Dashboard | ACLCS Client Portal" };

const STATUS_BADGE: Record<string, string> = {
  enquiry: "bg-gray-100 text-gray-600",
  documents_required: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  submitted: "bg-purple-100 text-purple-700",
  approved: "bg-brand-100 text-brand-700",
  completed: "bg-green-100 text-green-700",
};

export default async function PortalDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: cases }, { data: recentDocs }] = await Promise.all([
    supabase
      .from("cases")
      .select("id, reference_number, title, type, status, updated_at")
      .eq("client_id", user!.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("documents")
      .select("id, name, category, created_at, cases(reference_number)")
      .eq("cases.client_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const actionRequired = cases?.filter((c) => c.status === "documents_required") ?? [];
  const activeCases = cases?.filter((c) => c.status !== "completed") ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">My Dashboard</h1>
        <p className="text-sm text-navy-500 mt-1">Track your company formation progress</p>
      </div>

      {/* Action required banner */}
      {actionRequired.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Action Required</p>
            <p className="text-sm text-amber-700 mt-0.5">
              {actionRequired.length === 1
                ? `Case "${actionRequired[0].title}" requires documents from you.`
                : `${actionRequired.length} cases require documents from you.`}
            </p>
            <Link href="/portal/cases" className="text-sm font-semibold text-amber-800 underline hover:text-amber-900 mt-1 inline-block">
              Upload documents →
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-navy-100 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
            <FolderOpen size={20} className="text-brand-500" />
          </div>
          <p className="text-2xl font-bold text-navy-900">{cases?.length ?? 0}</p>
          <p className="text-xs text-navy-400 mt-1">Total Cases</p>
        </div>
        <div className="bg-white rounded-2xl border border-navy-100 p-5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3">
            <FileText size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-navy-900">{activeCases.length}</p>
          <p className="text-xs text-navy-400 mt-1">Active Cases</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active cases */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">My Cases</h2>
            <Link href="/portal/cases" className="text-xs text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {cases && cases.length > 0 ? (
            <ul className="divide-y divide-navy-50">
              {cases.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link href={`/portal/cases/${c.id}`} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-navy-50/50 transition-colors block">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{c.title}</p>
                      <p className="text-xs text-navy-400 font-mono">{c.reference_number}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize shrink-0 ${STATUS_BADGE[c.status] ?? ""}`}>
                      {c.status.replace(/_/g, " ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-10 text-sm text-navy-400 text-center">No cases yet. Your advisor will create your first case.</p>
          )}
        </div>

        {/* Recent documents */}
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <h2 className="font-bold text-navy-900">Recent Documents</h2>
            <Link href="/portal/documents" className="text-xs text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recentDocs && recentDocs.length > 0 ? (
            <ul className="divide-y divide-navy-50">
              {recentDocs.map((doc: any) => (
                <li key={doc.id} className="px-6 py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{doc.name}</p>
                    <p className="text-xs text-navy-400 capitalize">{doc.category}</p>
                  </div>
                  <a
                    href={`/api/portal/documents/download?path=${encodeURIComponent(doc.file_path ?? "")}`}
                    className="text-xs text-brand-500 hover:text-brand-600 font-medium shrink-0"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-6 py-10 text-sm text-navy-400 text-center">No documents yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
