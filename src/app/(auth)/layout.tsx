import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center mb-8">
        <Image
          src="/images/20260305_055231.png"
          alt="ACLCS – A&C Lazarou Corporate Services Limited"
          width={280}
          height={84}
          className="h-20 w-auto"
          priority
        />
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
