import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import PortalSidebar from "@/components/portal/PortalSidebar";
import GoogleTranslate from "@/components/ui/GoogleTranslate";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("role, status, full_name, email")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");
  if (profile.status === "pending") redirect("/pending-approval");
  if (profile.status === "suspended") redirect("/suspended");
  if (profile.role === "admin") redirect("/admin/dashboard");

  const headersList = headers();
  const isChina = headersList.get("x-vercel-ip-country") === "CN";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-navy-50">
      <GoogleTranslate isChina={isChina} />
      <PortalSidebar fullName={profile.full_name ?? ""} email={profile.email ?? ""} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
