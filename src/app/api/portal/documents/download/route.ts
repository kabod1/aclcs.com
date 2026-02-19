import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Verify the document belongs to this user (or user is admin)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    // Verify doc belongs to user's case
    const { data: doc } = await admin
      .from("documents")
      .select("cases(client_id)")
      .eq("file_path", path)
      .single();

    if ((doc as any)?.cases?.client_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Generate a 60-second signed URL
  const { data, error } = await admin.storage
    .from("case-documents")
    .createSignedUrl(path, 60);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "Failed to generate download URL" }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
