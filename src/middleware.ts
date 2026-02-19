import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
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

  const { pathname } = request.nextUrl;

  // If the user is logged in and tries to access auth pages, redirect them
  if (user && (pathname === "/login" || pathname === "/register" || pathname === "/reset-password")) {
    // Need to know their role to redirect correctly
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, status")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/portal/dashboard", request.url));
  }

  // Protected routes — must be logged in
  if (!user && (pathname.startsWith("/portal") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If logged in on protected routes, check status and role
  if (user && (pathname.startsWith("/portal") || pathname.startsWith("/admin"))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, status")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Pending approval
    if (profile.status === "pending" && pathname !== "/pending-approval") {
      return NextResponse.redirect(new URL("/pending-approval", request.url));
    }

    // Suspended
    if (profile.status === "suspended" && pathname !== "/suspended") {
      return NextResponse.redirect(new URL("/suspended", request.url));
    }

    // Client trying to access admin
    if (profile.role === "client" && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/portal/dashboard", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
