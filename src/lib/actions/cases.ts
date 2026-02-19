"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CaseStatus } from "@/lib/supabase/types";

async function getCallerProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();
  return { supabase, user, profile };
}

export async function createCase(formData: FormData) {
  const { profile } = await getCallerProfile();
  if (profile?.role !== "admin") return { error: "Forbidden" };

  const admin = createAdminClient();
  const { error } = await admin.from("cases").insert({
    client_id: formData.get("client_id") as string,
    title: formData.get("title") as string,
    type: formData.get("type") as string,
    notes: formData.get("notes") as string || null,
    status: "enquiry",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/cases");
  return { success: true };
}

export async function updateCaseStatus(caseId: string, status: CaseStatus) {
  const { profile } = await getCallerProfile();
  if (profile?.role !== "admin") return { error: "Forbidden" };

  const admin = createAdminClient();
  const { error } = await admin.from("cases").update({ status }).eq("id", caseId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/cases/${caseId}`);
  revalidatePath("/admin/cases");
  return { success: true };
}

export async function addCaseUpdate(formData: FormData) {
  const { user, profile } = await getCallerProfile();
  if (!profile) return { error: "Unauthorized" };

  const admin = createAdminClient();
  const isInternal = formData.get("is_internal") === "true" && profile.role === "admin";

  const { error } = await admin.from("case_updates").insert({
    case_id: formData.get("case_id") as string,
    author_id: user.id,
    content: formData.get("content") as string,
    is_internal: isInternal,
  });

  if (error) return { error: error.message };

  const caseId = formData.get("case_id") as string;
  revalidatePath(`/admin/cases/${caseId}`);
  revalidatePath(`/portal/cases/${caseId}`);
  return { success: true };
}
