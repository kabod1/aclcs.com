"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { UserStatus } from "@/lib/supabase/types";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") throw new Error("Forbidden");
  return user;
}

export async function setClientStatus(clientId: string, status: UserStatus): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("profiles").update({ status }).eq("id", clientId);

  // If activating, also confirm their email in auth so they can log in
  if (status === "active") {
    await admin.auth.admin.updateUserById(clientId, {
      email_confirm: true,
    });
  }

  revalidatePath("/admin/clients");
  revalidatePath(`/admin/clients/${clientId}`);
}

export async function inviteClient(formData: FormData) {
  await requireAdmin();
  const admin = createAdminClient();

  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;

  // Create auth user with a random password — they'll reset via email
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
  });

  if (error) return { error: error.message };

  // Upsert profile with active status since admin is inviting them directly
  if (data.user) {
    await admin.from("profiles").upsert({
      id: data.user.id,
      email,
      full_name: fullName,
      role: "client",
      status: "active",
    });
  }

  revalidatePath("/admin/clients");
  return { success: true };
}
