"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { DocumentCategory } from "@/lib/supabase/types";

export async function registerDocument(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const admin = createAdminClient();

  const { error } = await admin.from("documents").insert({
    case_id: formData.get("case_id") as string,
    name: formData.get("name") as string,
    file_path: formData.get("file_path") as string,
    uploaded_by: user.id,
    category: (formData.get("category") as DocumentCategory) ?? "submitted",
    size: parseInt(formData.get("size") as string, 10),
    mime_type: formData.get("mime_type") as string,
  });

  if (error) return { error: error.message };

  const caseId = formData.get("case_id") as string;
  revalidatePath(`/portal/cases/${caseId}`);
  revalidatePath("/portal/documents");
  revalidatePath(`/admin/cases/${caseId}`);
  return { success: true };
}

export async function deleteDocument(documentId: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const admin = createAdminClient();

  // Fetch doc to get the storage path
  const { data: doc } = await admin
    .from("documents")
    .select("file_path, case_id, uploaded_by")
    .eq("id", documentId)
    .single();

  if (!doc) return;

  // Check ownership (client) or admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && doc.uploaded_by !== user.id) return;

  // Delete from storage
  await admin.storage.from("case-documents").remove([doc.file_path]);

  // Delete from DB
  await admin.from("documents").delete().eq("id", documentId);

  revalidatePath(`/portal/cases/${doc.case_id}`);
  revalidatePath("/portal/documents");
  revalidatePath(`/admin/cases/${doc.case_id}`);
}
