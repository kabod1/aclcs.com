import { createClient } from "@/lib/supabase/server";
import { createCase } from "@/lib/actions/cases";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "New Case | ACLCS Admin" };

async function handleCreate(formData: FormData) {
  "use server";
  const result = await createCase(formData);
  if (!result?.error) redirect("/admin/cases");
}

export default async function NewCasePage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("role", "client")
    .eq("status", "active")
    .order("full_name");

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/cases" className="text-navy-400 hover:text-navy-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">New Case</h1>
          <p className="text-sm text-navy-500 mt-0.5">Create a new company formation case</p>
        </div>
      </div>

      <form action={handleCreate} className="bg-white rounded-2xl border border-navy-100 shadow-sm p-7 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-2">Client *</label>
          <select name="client_id" required className="select-field">
            <option value="">Select client</option>
            {clients?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name} — {c.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-2">Case Title *</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Cyprus LTD — Thomas Richter"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-2">Company Type *</label>
          <select name="type" required className="select-field">
            <option value="">Select type</option>
            <option value="cyprus">Cyprus Company</option>
            <option value="europe">European Structure</option>
            <option value="outside-europe">International Company</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy-700 mb-2">Internal Notes</label>
          <textarea
            name="notes"
            rows={4}
            placeholder="Internal notes visible only to admin..."
            className="input-field resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/admin/cases" className="flex-1 px-4 py-2.5 border border-navy-200 text-navy-600 rounded-xl text-sm font-medium hover:bg-navy-50 transition-colors text-center">
            Cancel
          </Link>
          <button type="submit" className="flex-1 btn-primary justify-center">
            Create Case
          </button>
        </div>
      </form>
    </div>
  );
}
