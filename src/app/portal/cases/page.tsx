import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

export const metadata = { title: "My Cases | ACLCS Client Portal" };

const STATUS_BADGE: Record<string, string> = {
  enquiry: "bg-gray-100 text-gray-600",
  documents_required: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  submitted: "bg-purple-100 text-purple-700",
  approved: "bg-brand-100 text-brand-700",
  completed: "bg-green-100 text-green-700",
};

const STATUS_STEPS = [
  "enquiry",
  "documents_required",
  "under_review",
  "submitted",
  "approved",
  "completed",
];

export default async function PortalCasesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: cases } = await supabase
    .from("cases")
    .select("id, reference_number, title, type, status, created_at, updated_at")
    .eq("client_id", user!.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">My Cases</h1>
        <p className="text-sm text-navy-500 mt-1">Track the progress of your company formations</p>
      </div>

      {cases && cases.length > 0 ? (
        <div className="space-y-4">
          {cases.map((c) => {
            const stepIndex = STATUS_STEPS.indexOf(c.status);
            return (
              <Link
                key={c.id}
                href={`/portal/cases/${c.id}`}
                className="block bg-white rounded-2xl border border-navy-100 shadow-sm p-6 hover:shadow-md hover:border-brand-200 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-bold text-navy-900">{c.title}</p>
                    <p className="text-xs text-navy-400 font-mono mt-0.5">{c.reference_number} · {c.type.replace(/-/g, " ")}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize shrink-0 ${STATUS_BADGE[c.status] ?? ""}`}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex gap-1">
                  {STATUS_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1.5 rounded-full transition-all ${
                        i <= stepIndex ? "bg-brand-500" : "bg-navy-100"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-navy-400 mt-2">
                  Step {stepIndex + 1} of {STATUS_STEPS.length} · Updated {new Date(c.updated_at).toLocaleDateString("en-GB")}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm py-16 text-center">
          <FolderOpen size={40} className="text-navy-200 mx-auto mb-4" />
          <p className="text-navy-500 font-medium">No cases yet</p>
          <p className="text-sm text-navy-400 mt-1">Your advisor will create your first case shortly.</p>
        </div>
      )}
    </div>
  );
}
