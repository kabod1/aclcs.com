"use server";

import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  // Determine where to send the user based on their role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication failed." };

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();

  if (!profile) return { error: "Account setup incomplete. Please contact support." };
  if (profile.status === "pending") return { redirectTo: "/pending-approval" };
  if (profile.status === "suspended") return { redirectTo: "/suspended" };
  if (profile.role === "admin") return { redirectTo: "/admin/dashboard" };
  return { redirectTo: "/portal/dashboard" };
}

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const nationality = formData.get("nationality") as string;

    const admin = createAdminClient();

    // Use admin.createUser so we control the full flow and avoid any
    // conflicting database triggers on auth.users that cause "Database error saving new user"
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, phone, nationality },
    });

    if (error) return { error: error.message };
    if (!data.user) return { error: "Registration failed. Please try again." };

    // Upsert the profile row (handles any trigger-created partial rows)
    const { error: profileError } = await admin.from("profiles").upsert({
      id: data.user.id,
      email,
      full_name: fullName,
      phone: phone || null,
      nationality: nationality || null,
      role: "client",
      status: "active",
    }, { onConflict: "id" });

    if (profileError) {
      await admin.auth.admin.deleteUser(data.user.id);
      return { error: "Account creation failed. Please try again." };
    }

    // Sign the user in immediately since email is auto-confirmed
    const supabase = await createClient();
    await supabase.auth.signInWithPassword({ email, password });

    return { redirectTo: "/portal/dashboard" };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Registration failed. Please try again." };
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aclcs.com"}/api/auth/confirm`,
    }
  );

  if (error) {
    return { error: error.message };
  }

  return { success: "Check your email for the password reset link." };
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/portal/dashboard");
}
