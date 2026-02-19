import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Service role client — bypasses all RLS policies.
// NEVER import this in client components or expose to the browser.
// Use only in Server Actions and Route Handlers.
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
