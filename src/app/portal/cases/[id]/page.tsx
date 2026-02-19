import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { addCaseUpdate } from "@/lib/actions/cases";

const STATUS_STEPS = [
  { key: "enquiry", label: "Enquiry" },
  { key: "documents_required", label: "Documents" },
  { key: "under_review", label: "Under Review" },
  { key: "submitted", label: "Submitted" },
  { key: "approved", label: "Approved" },
  { key: "completed", label: "Completed" },
];

export default async function PortalCaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: c }, { data: updates }, { data: documents }] = await Promise.all([
    supabase
      .from("cases")
      .select("*")
      .eq("id", params.id)
      .eq("client_id", user!.id)
      .single(),
    supabase
      .from("case_updates")
      .select("*, profiles(full_name, role)")
      .eq("case_id", params.id)
      .eq("is_internal", false)
      .order("created_at", { ascending: true }),
    supabase
      .from("documents")
      .select("*")
      .eq("case_id", params.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!c) notFound();

  const stepIndex = STATUS_STEPS.findIndex((s) => s.key === c.status);

  async function handleMessage(formData: FormData) {
    "use server";
    formData.set("case_id", params.id);
    formData.set("is_internal", "false");
    await addCaseUpdate(formData);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/portal/cases" className="text-navy-400 hover:text-navy-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-navy-900">{c.title}</h1>
          <p className="text-sm text-navy-400 font-mono mt-0.5">{c.reference_number}</p>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6">
        <h2 className="font-bold text-navy-900 mb-5">Progress</h2>
        <div className="flex items-center gap-0">
          {STATUS_STEPS.map((step, i) => {
            const done = i < stepIndex;
            const current = i === stepIndex;
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  {i > 0 && <div className={`flex-1 h-0.5 ${done || current ? "bg-brand-500" : "bg-navy-100"}`} />}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      done ? "bg-brand-500 border-brand-500 text-white" :
                      current ? "border-brand-500 text-brand-500 bg-white" :
                      "border-navy-200 text-navy-400 bg-white"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  {i < STATUS_STEPS.length - 1 && <div className={`flex-1 h-0.5 ${done ? "bg-brand-500" : "bg-navy-100"}`} />}
                </div>
                <p className={`text-center text-xs mt-2 font-medium ${current ? "text-brand-600" : done ? "text-navy-500" : "text-navy-300"}`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Messages / Timeline */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100">
            <h2 className="font-bold text-navy-900">Messages & Updates</h2>
          </div>
          <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
            {updates && updates.length > 0 ? (
              updates.map((u: any) => {
                const isAdmin = u.profiles?.role === "admin";
                return (
                  <div key={u.id} className={`flex gap-3 ${isAdmin ? "" : "flex-row-reverse"}`}>
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center shrink-0 text-xs font-bold text-navy-500">
                      {u.profiles?.full_name?.charAt(0)}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${isAdmin ? "bg-navy-50" : "bg-brand-500 text-white"}`}>
                      <p className={`text-xs font-semibold mb-0.5 ${isAdmin ? "text-navy-600" : "text-white/80"}`}>
                        {isAdmin ? "ACLCS Team" : "You"}
                      </p>
                      <p className={`text-sm leading-relaxed ${isAdmin ? "text-navy-700" : "text-white"}`}>{u.content}</p>
                      <p className={`text-xs mt-1 ${isAdmin ? "text-navy-400" : "text-white/60"}`}>
                        {new Date(u.created_at).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-navy-400 text-center py-4">No messages yet</p>
            )}
          </div>
          <form action={handleMessage} className="px-5 py-4 border-t border-navy-100 flex gap-3">
            <textarea
              name="content"
              required
              rows={2}
              placeholder="Send a message to your advisor..."
              className="flex-1 input-field resize-none text-sm py-2"
            />
            <button type="submit" className="btn-primary text-sm py-2 px-4 shrink-0 self-end">
              Send
            </button>
          </form>
        </div>

        {/* Documents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-navy-100">
            <h2 className="font-bold text-navy-900 text-sm">Documents</h2>
          </div>
          {c.status === "documents_required" && (
            <div className="px-5 py-3 bg-amber-50 border-b border-amber-100">
              <p className="text-xs font-semibold text-amber-800 mb-1">Documents needed</p>
              <Link href="/portal/documents" className="text-xs text-amber-700 underline">Upload documents →</Link>
            </div>
          )}
          {documents && documents.length > 0 ? (
            <ul className="divide-y divide-navy-50 max-h-72 overflow-y-auto">
              {documents.map((doc: any) => (
                <li key={doc.id} className="px-5 py-3">
                  <p className="text-xs font-semibold text-navy-800 truncate">{doc.name}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-navy-400 capitalize">{doc.category}</span>
                    <a
                      href={`/api/portal/documents/download?path=${encodeURIComponent(doc.file_path)}`}
                      className="text-xs text-brand-500 hover:text-brand-600 font-medium"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-xs text-navy-400 text-center">No documents yet</p>
          )}
          <div className="px-5 py-4 border-t border-navy-100">
            <Link href="/portal/documents" className="text-xs text-brand-500 hover:text-brand-600 font-medium">
              Manage all documents →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
