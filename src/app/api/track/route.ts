import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { path, session_id, referrer } = await request.json();
    const country = request.headers.get("x-vercel-ip-country") || null;

    // Skip tracking admin/portal/api routes
    if (!path || path.startsWith("/admin") || path.startsWith("/portal") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true });
    }

    const admin = createAdminClient();
    await admin.from("page_views").insert({ path, country, referrer, session_id });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
