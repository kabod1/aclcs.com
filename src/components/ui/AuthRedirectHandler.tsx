"use client";

import { useEffect } from "react";

/**
 * Handles Supabase auth redirects that land on the wrong page due to
 * the service worker serving cached pages (bypassing server-side redirects).
 *
 * Supabase PKCE: sends ?code= to site root → forward to /api/auth/confirm
 * Supabase errors: sends ?error=access_denied → forward to login
 */
export default function AuthRedirectHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    const errorCode = params.get("error_code");

    if (code) {
      window.location.replace(`/api/auth/confirm?code=${code}`);
    } else if (error === "access_denied" || errorCode === "otp_expired") {
      window.location.replace("/login?error=link_expired");
    }
  }, []);

  return null;
}
