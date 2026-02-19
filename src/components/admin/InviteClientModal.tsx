"use client";

import { useState } from "react";
import { UserPlus, X, Send } from "lucide-react";
import { inviteClient } from "@/lib/actions/clients";
import { toast } from "sonner";

export default function InviteClientModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await inviteClient(formData);
    setLoading(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Invitation sent successfully!");
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary"
      >
        <UserPlus size={16} />
        Invite Client
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-navy-900">Invite Client</h2>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-navy-100 flex items-center justify-center text-navy-400"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  placeholder="Client's full name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@company.com"
                  className="input-field"
                />
              </div>
              <p className="text-xs text-navy-400">
                The client will receive an email invitation to set their password and access the portal immediately.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-navy-200 text-navy-600 rounded-xl text-sm font-medium hover:bg-navy-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary justify-center disabled:opacity-60 disabled:pointer-events-none"
                >
                  {loading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Invite
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
