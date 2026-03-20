import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const BLOCKED_COUNTRIES = ["US", "DE"];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Geo-block: deny access from restricted countries
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  if (country && BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>Access Restricted</title><meta charset="utf-8">
      <style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0a1628;color:#fff}
      .box{text-align:center;padding:2rem}h1{font-size:1.5rem;margin-bottom:.5rem}p{color:#94a3b8}</style></head>
      <body><div class="box"><h1>Access Restricted</h1><p>This service is not available in your region.</p></div></body></html>`,
      { status: 403, headers: { "content-type": "text/html" } }
    );
  }

  // Run auth-redirect checks BEFORE Supabase session call so they are never
  // swallowed by the catch block if Supabase is slow or unreachable.

  // If Supabase redirects here with an auth error (e.g. otp_expired), send to login with message
  if (searchParams.get("error_code") === "otp_expired" || searchParams.get("error") === "access_denied") {
    return NextResponse.redirect(new URL("/login?error=link_expired", request.url));
  }

  // PKCE flow: Supabase sends ?code= to the root when redirectTo isn't matched —
  // forward it to the confirm route so the code can be exchanged for a session
  if (pathname === "/" && searchParams.get("code")) {
    return NextResponse.redirect(
      new URL(`/api/auth/confirm?code=${searchParams.get("code")}`, request.url)
    );
  }

  try {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session — required by @supabase/ssr
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();

    // If the user is logged in and tries to access auth pages, redirect them
    if (user && (pathname === "/login" || pathname === "/register" || pathname === "/reset-password")) {
      // Need to know their role to redirect correctly
      const { data: profile } = await admin
        .from("profiles")
        .select("role, status")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      if (profile?.status === "pending") {
        return NextResponse.redirect(new URL("/pending-approval", request.url));
      }
      if (profile?.status === "suspended") {
        return NextResponse.redirect(new URL("/suspended", request.url));
      }
      if (profile) {
        return NextResponse.redirect(new URL("/portal/dashboard", request.url));
      }
      // No profile found — don't redirect, let them stay on the auth page
    }

    // Protected routes — must be logged in
    if (!user && (pathname.startsWith("/portal") || pathname.startsWith("/admin"))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // If logged in on protected routes, check status and role
    if (user && (pathname.startsWith("/portal") || pathname.startsWith("/admin"))) {
      const { data: profile } = await admin
        .from("profiles")
        .select("role, status")
        .eq("id", user.id)
        .single();

      if (!profile) {
        // Sign out to avoid redirect loop (logged in but no profile)
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL("/login?error=no_profile", request.url));
      }

      // Legacy pending (admin-invited users not yet activated)
      if (profile.status === "pending") {
        return NextResponse.redirect(new URL("/pending-approval", request.url));
      }

      // Suspended
      if (profile.status === "suspended") {
        return NextResponse.redirect(new URL("/suspended", request.url));
      }

      // Client trying to access admin
      if (profile.role === "client" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/portal/dashboard", request.url));
      }
    }

    return supabaseResponse;
  } catch {
    // If middleware throws (e.g. Supabase unreachable), allow the request through
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
