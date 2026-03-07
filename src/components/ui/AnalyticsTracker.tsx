"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getOrCreateSession(): string {
  let id = sessionStorage.getItem("_sid");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem("_sid", id);
  }
  return id;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const session_id = getOrCreateSession();
      const referrer = document.referrer || null;

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, session_id, referrer }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // silently ignore
    }
  }, [pathname]);

  return null;
}
