"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();

  if (profile?.status === "pending") redirect("/pending-approval");
  if (profile?.status === "suspended") redirect("/suspended");
  if (profile?.role === "admin") redirect("/admin/dashboard");
  redirect("/portal/dashboard");
}

export async function signUp(formData: FormData) {
  try {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("full_name") as string;
    const phone = formData.get("phone") as string;
    const nationality = formData.get("nationality") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          nationality,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/confirm`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { redirectTo: "/pending-approval" };
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
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
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
