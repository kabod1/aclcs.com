import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, status, full_name, email")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/portal/dashboard");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-navy-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
