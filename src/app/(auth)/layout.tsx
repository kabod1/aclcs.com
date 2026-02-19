import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
          A
        </div>
        <span className="text-xl font-bold text-white">
          ACLCS<span className="text-brand-400"> Corporate</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {children}
      </div>

      <p className="mt-6 text-xs text-white/30 text-center">
        &copy; {new Date().getFullYear()} ACLCS Corporate Services. All rights reserved.
      </p>
    </div>
  );
}
