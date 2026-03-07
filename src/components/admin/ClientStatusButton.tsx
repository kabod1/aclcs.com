"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setClientStatus } from "@/lib/actions/clients";
import type { UserStatus } from "@/lib/supabase/types";

interface Props {
  clientId: string;
  targetStatus: UserStatus;
  label: string;
  className: string;
}

export default function ClientStatusButton({ clientId, targetStatus, label, className }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await setClientStatus(clientId, targetStatus);
      if (result?.error) {
        toast.error(`Failed: ${result.error}`);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isPending ? "..." : label}
    </button>
  );
}
