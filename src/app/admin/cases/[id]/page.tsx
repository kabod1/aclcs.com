import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateCaseStatus, addCaseUpdate } from "@/lib/actions/cases";
import type { CaseStatus } from "@/lib/supabase/types";

const STATUSES: CaseStatus[] = [
  "enquiry",
  "documents_required",
  "under_review",
  "submitted",
  "approved",
  "completed",
];

const STATUS_BADGE: Record<string, string> = {
  enquiry: "bg-gray-100 text-gray-600",
  documents_required: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  submitted: "bg-purple-100 text-purple-700",
  approved: "bg-brand-100 text-brand-700",
  completed: "bg-green-100 text-green-700",
};

export default async function AdminCaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const [caseRes, updatesRes, documentsRes] = await Promise.all([
    supabase
      .from("cases")
      .select("*, profiles(id, full_name, email, phone, nationality)")
      .eq("id", params.id)
      .single(),
    supabase
      .from("case_updates")
      .select("*, profiles(full_name, role)")
      .eq("case_id", params.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("documents")
      .select("*")
      .eq("case_id", params.id)
      .order("created_at", { ascending: false }),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = caseRes.data as any;
  const updates = updatesRes.data;
  const documents = documentsRes.data;

  if (!c) notFound();

  async function handleStatusChange(formData: FormData) {
    "use server";
    await updateCaseStatus(params.id, formData.get("status") as CaseStatus);
  }

  async function handleAddUpdate(formData: FormData) {
    "use server";
    formData.set("case_id", params.id);
    await addCaseUpdate(formData);
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/cases" className="text-navy-400 hover:text-navy-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-navy-900">{c.title}</h1>
          <p className="text-sm text-navy-400 font-mono mt-0.5">{c.reference_number}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Timeline / Updates */}
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-navy-100">
              <h2 className="font-bold text-navy-900">Case Timeline</h2>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {updates && updates.length > 0 ? (
                updates.map((u: any) => (
                  <div key={u.id} className={`flex gap-3 ${u.is_internal ? "opacity-70" : ""}`}>
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center shrink-0 text-xs font-bold text-navy-500">
                      {u.profiles?.full_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-navy-700">{u.profiles?.full_name}</span>
                        {u.is_internal && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">Internal</span>
                        )}
                        <span className="text-xs text-navy-400">
                          {new Date(u.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <p className="text-sm text-navy-600 mt-1 leading-relaxed">{u.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-navy-400 text-center py-4">No updates yet</p>
              )}
            </div>
            {/* Add update form */}
            <form action={handleAddUpdate} className="px-6 py-4 border-t border-navy-100 space-y-3">
              <textarea
                name="content"
                required
                rows={3}
                placeholder="Add a timeline update or message to client..."
                className="input-field resize-none"
              />
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-navy-500 cursor-pointer">
                  <input type="checkbox" name="is_internal" value="true" className="rounded" />
                  Internal note (hidden from client)
                </label>
                <button type="submit" className="btn-primary text-sm py-2">
                  Post Update
                </button>
              </div>
            </form>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
              <h2 className="font-bold text-navy-900">Documents</h2>
              <span className="text-sm text-navy-400">{documents?.length ?? 0} files</span>
            </div>
            {documents && documents.length > 0 ? (
              <ul className="divide-y divide-navy-50">
                {documents.map((doc: any) => (
                  <li key={doc.id} className="px-6 py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-navy-800">{doc.name}</p>
                      <p className="text-xs text-navy-400 capitalize">{doc.category} · {(doc.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <a
                      href={`/api/portal/documents/download?path=${encodeURIComponent(doc.file_path)}`}
                      className="text-xs px-3 py-1.5 border border-navy-200 text-navy-600 rounded-lg font-semibold hover:border-brand-300 hover:text-brand-500 transition-colors"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-6 py-8 text-sm text-navy-400 text-center">No documents uploaded yet</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status control */}
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-5">
            <h3 className="font-bold text-navy-900 mb-3">Case Status</h3>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${STATUS_BADGE[c.status] ?? ""}`}>
              {c.status.replace(/_/g, " ")}
            </span>
            <form action={handleStatusChange} className="mt-4 space-y-3">
              <select name="status" defaultValue={c.status} className="select-field text-sm">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn-primary w-full justify-center text-sm py-2.5">
                Update Status
              </button>
            </form>
          </div>

          {/* Client info */}
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-5">
            <h3 className="font-bold text-navy-900 mb-3">Client</h3>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-navy-800">{(c as any).profiles?.full_name}</p>
              <p className="text-navy-500">{(c as any).profiles?.email}</p>
              {(c as any).profiles?.phone && (
                <p className="text-navy-500">{(c as any).profiles.phone}</p>
              )}
              {(c as any).profiles?.nationality && (
                <p className="text-navy-400 text-xs">{(c as any).profiles.nationality}</p>
              )}
            </div>
            <Link
              href={`/admin/clients/${(c as any).profiles?.id}`}
              className="mt-4 block text-xs text-brand-500 hover:text-brand-600 font-medium"
            >
              View client profile →
            </Link>
          </div>

          {/* Case info */}
          <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-5">
            <h3 className="font-bold text-navy-900 mb-3">Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-navy-400">Type</span>
                <span className="text-navy-700 capitalize font-medium">{c.type.replace(/-/g, " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-400">Created</span>
                <span className="text-navy-700 font-medium">
                  {new Date(c.created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
            {c.notes && (
              <div className="mt-4 pt-4 border-t border-navy-100">
                <p className="text-xs font-semibold text-navy-500 mb-1">Internal Notes</p>
                <p className="text-xs text-navy-500 leading-relaxed">{c.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
