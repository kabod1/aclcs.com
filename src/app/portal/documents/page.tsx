import { createClient } from "@/lib/supabase/server";
import DocumentUploadZone from "@/components/portal/DocumentUploadZone";
import { deleteDocument } from "@/lib/actions/documents";
import { FileText, Download, Trash2 } from "lucide-react";

export const metadata = { title: "Documents | ACLCS Client Portal" };

const CATEGORY_BADGE: Record<string, string> = {
  required: "bg-red-100 text-red-700",
  submitted: "bg-blue-100 text-blue-700",
  issued: "bg-green-100 text-green-700",
};

export default async function PortalDocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: cases }, { data: allDocs }] = await Promise.all([
    supabase
      .from("cases")
      .select("id, title, reference_number")
      .eq("client_id", user!.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("documents")
      .select("*, cases(reference_number, title)")
      .eq("cases.client_id", user!.id)
      .order("created_at", { ascending: false }),
  ]);

  const firstCaseId = cases?.[0]?.id ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Documents</h1>
        <p className="text-sm text-navy-500 mt-1">Upload and manage your case documents</p>
      </div>

      {/* Upload zone */}
      {cases && cases.length > 0 ? (
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6">
          <h2 className="font-bold text-navy-900 mb-4">Upload Documents</h2>
          <DocumentUploadZone caseId={firstCaseId} cases={cases} />
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">
          No active cases. Documents can only be uploaded once a case has been created by your advisor.
        </div>
      )}

      {/* Document list */}
      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-navy-100">
          <h2 className="font-bold text-navy-900">All Documents</h2>
        </div>
        {allDocs && allDocs.length > 0 ? (
          <ul className="divide-y divide-navy-50">
            {allDocs.map((doc: any) => (
              <li key={doc.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-brand-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-900 truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${CATEGORY_BADGE[doc.category] ?? ""}`}>
                      {doc.category}
                    </span>
                    <span className="text-xs text-navy-400">{doc.cases?.reference_number}</span>
                    <span className="text-xs text-navy-400">{(doc.size / 1024).toFixed(0)} KB</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`/api/portal/documents/download?path=${encodeURIComponent(doc.file_path)}`}
                    className="w-9 h-9 rounded-xl border border-navy-200 flex items-center justify-center text-navy-500 hover:text-brand-500 hover:border-brand-300 transition-colors"
                    title="Download"
                  >
                    <Download size={15} />
                  </a>
                  <form action={deleteDocument.bind(null, doc.id)}>
                    <button
                      type="submit"
                      className="w-9 h-9 rounded-xl border border-navy-200 flex items-center justify-center text-navy-500 hover:text-red-500 hover:border-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center">
            <FileText size={32} className="text-navy-200 mx-auto mb-3" />
            <p className="text-sm text-navy-400">No documents uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
