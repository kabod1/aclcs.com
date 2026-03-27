import Link from "next/link";
import type { Metadata } from "next";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | ACLCS Corporate Services",
  description:
    "Cookie policy for ACLCS Corporate Services. Learn what cookies we use, why we use them, and how you can manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  const lastUpdated = "27 March 2026";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-300 text-sm font-medium border border-white/10 mb-6">
              <Cookie size={14} />
              Legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Cookie <span className="text-brand-400">Policy</span>
            </h1>
            <p className="mt-5 text-lg text-white/50">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="space-y-10 text-navy-700 text-[15px] leading-relaxed">

            {/* Intro */}
            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
              <p className="text-navy-800 font-medium">
                This Cookie Policy explains how ACLCS Corporate Services Ltd
                (&ldquo;ACLCS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and
                similar technologies on our website{" "}
                <strong>aclcs.com</strong>. It should be read alongside our{" "}
                <Link href="/privacy-policy" className="text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <Section title="1. What Are Cookies?">
              <p>
                Cookies are small text files that are placed on your computer, tablet, or mobile device when you visit a website. They are widely used to make websites work correctly, function more efficiently, and to provide information to website owners.
              </p>
              <p className="mt-3">
                Cookies can be <strong>session cookies</strong> (deleted when you close your browser) or <strong>persistent cookies</strong> (which remain on your device for a set period or until you delete them). They can be set by us (&ldquo;first-party cookies&rdquo;) or by third-party services we use (&ldquo;third-party cookies&rdquo;).
              </p>
            </Section>

            <Section title="2. How We Use Cookies">
              <p>
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To ensure our website works correctly and securely</li>
                <li>To remember your preferences (such as language and cookie consent)</li>
                <li>To understand how visitors use our website so we can improve it</li>
                <li>To enable third-party services (Google Maps, Google Translate) that enhance functionality</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> use cookies for targeted advertising or sell cookie data to third parties.
              </p>
            </Section>

            <Section title="3. Categories of Cookies We Use">
              <div className="space-y-5 mt-3">

                {/* Essential */}
                <div className="border border-navy-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-navy-50">
                    <div>
                      <p className="font-bold text-navy-900">Essential Cookies</p>
                      <p className="text-xs text-navy-500 mt-0.5">Always active — cannot be disabled</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">Required</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-navy-600 mb-4">
                      These cookies are strictly necessary for our website to function. They cannot be switched off in our systems. They are usually set in response to actions you take such as setting privacy preferences, logging in, or filling in forms.
                    </p>
                    <CookieTable cookies={[
                      { name: "aclcs-cookie-consent", provider: "aclcs.com", purpose: "Stores your cookie consent preferences", expiry: "12 months", type: "First-party / localStorage" },
                      { name: "sb-* (Supabase auth)", provider: "aclcs.com", purpose: "Authentication session management for the Client Portal", expiry: "Session / 1 year", type: "First-party" },
                    ]} />
                  </div>
                </div>

                {/* Functional */}
                <div className="border border-navy-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-navy-50">
                    <div>
                      <p className="font-bold text-navy-900">Functional Cookies</p>
                      <p className="text-xs text-navy-500 mt-0.5">Enhance your experience — can be disabled</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Optional</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-navy-600 mb-4">
                      These cookies enable enhanced functionality and personalisation. They may be set by us or third-party providers whose services we use. If you do not allow these cookies, some or all of these services may not function properly.
                    </p>
                    <CookieTable cookies={[
                      { name: "googtrans", provider: "translate.google.com", purpose: "Stores your language translation preference for Google Translate", expiry: "Session / 1 year", type: "Third-party" },
                      { name: "NID, CONSENT", provider: "google.com", purpose: "Used by Google Translate widget for preferences and security", expiry: "6 months – 2 years", type: "Third-party" },
                    ]} />
                  </div>
                </div>

                {/* Analytics */}
                <div className="border border-navy-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-navy-50">
                    <div>
                      <p className="font-bold text-navy-900">Analytics & Performance Cookies</p>
                      <p className="text-xs text-navy-500 mt-0.5">Help us improve — can be disabled</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">Optional</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-navy-600 mb-4">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our website. All information these cookies collect is aggregated and therefore anonymous.
                    </p>
                    <CookieTable cookies={[
                      { name: "_ga, _ga_*", provider: "google-analytics.com", purpose: "Distinguishes users and tracks page visits for Google Analytics", expiry: "2 years", type: "Third-party" },
                      { name: "_gid", provider: "google-analytics.com", purpose: "Distinguishes users for Google Analytics", expiry: "24 hours", type: "Third-party" },
                    ]} />
                  </div>
                </div>

                {/* Google Maps */}
                <div className="border border-navy-100 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 bg-navy-50">
                    <div>
                      <p className="font-bold text-navy-900">Third-Party Embedded Content</p>
                      <p className="text-xs text-navy-500 mt-0.5">External services — governed by their own policies</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">Optional</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-navy-600 mb-4">
                      When you interact with embedded Google Maps on our website, Google may set additional cookies. These are governed by Google&apos;s own privacy policy at{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                        policies.google.com/privacy
                      </a>
                      .
                    </p>
                    <CookieTable cookies={[
                      { name: "NID, 1P_JAR, CONSENT", provider: "maps.google.com", purpose: "Used by Google Maps to display interactive maps", expiry: "Varies", type: "Third-party" },
                    ]} />
                  </div>
                </div>

              </div>
            </Section>

            <Section title="4. Your Cookie Choices">
              <p>
                When you first visit our website, a cookie consent banner is displayed. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Accept All</strong> — Allow all cookie categories</li>
                <li><strong>Reject All</strong> — Only essential cookies will be set</li>
                <li><strong>Manage Preferences</strong> — Choose which optional categories to enable or disable</li>
              </ul>
              <p className="mt-3">
                You can change your cookie preferences at any time by clicking the cookie icon at the bottom of any page on our website. Your preferences are stored for 12 months.
              </p>
            </Section>

            <Section title="5. Managing Cookies in Your Browser">
              <p>
                You can also control cookies directly through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block all cookies from specific sites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
              <p className="mt-4">
                Browser-specific guidance for managing cookies:
              </p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                  { name: "Mozilla Firefox", url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
                  { name: "Safari", url: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac" },
                  { name: "Microsoft Edge", url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
                  { name: "Opera", url: "https://help.opera.com/en/latest/web-preferences/#cookies" },
                ].map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-navy-100 bg-navy-50 text-sm font-medium text-navy-700 hover:border-brand-300 hover:text-brand-600 transition-colors"
                  >
                    {name} →
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-navy-500">
                <strong>Note:</strong> Disabling essential cookies may prevent parts of the website from working correctly, including the Client Portal login.
              </p>
            </Section>

            <Section title="6. Do Not Track">
              <p>
                Some browsers have a &ldquo;Do Not Track&rdquo; (DNT) feature that sends a signal to websites requesting that your browsing activity not be tracked. Currently there is no universally accepted standard for responding to DNT signals. We will continue to monitor developments and update this policy accordingly.
              </p>
            </Section>

            <Section title="7. Changes to This Cookie Policy">
              <p>
                We may update this Cookie Policy from time to time as our use of cookies changes or to comply with new legal requirements. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. We encourage you to review this page periodically.
              </p>
            </Section>

            <Section title="8. Contact Us">
              <p>
                If you have any questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="mt-4 p-5 bg-navy-50 rounded-2xl border border-navy-100 text-sm text-navy-700 space-y-1">
                <p className="font-semibold text-navy-800">ACLCS Corporate Services Ltd</p>
                <p>Katsoni 19, Nicosia, Cyprus</p>
                <a href="mailto:admin@aclcs.com" className="text-brand-600 hover:underline">
                  admin@aclcs.com
                </a>
                <p>+357 96 186 440</p>
              </div>
            </Section>

            <div className="border-t border-navy-100 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <p className="text-sm text-navy-400">
                This policy is governed by the laws of the Republic of Cyprus and the GDPR.
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/privacy-policy" className="text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/gdpr-rights" className="text-brand-600 hover:underline">
                  GDPR Rights
                </Link>
                <Link href="/terms" className="text-brand-600 hover:underline">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function CookieTable({
  cookies,
}: {
  cookies: { name: string; provider: string; purpose: string; expiry: string; type: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-navy-100/60">
            <th className="text-left px-3 py-2.5 font-semibold text-navy-700 border border-navy-100">Cookie Name</th>
            <th className="text-left px-3 py-2.5 font-semibold text-navy-700 border border-navy-100">Provider</th>
            <th className="text-left px-3 py-2.5 font-semibold text-navy-700 border border-navy-100">Purpose</th>
            <th className="text-left px-3 py-2.5 font-semibold text-navy-700 border border-navy-100">Expiry</th>
            <th className="text-left px-3 py-2.5 font-semibold text-navy-700 border border-navy-100">Type</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((c, i) => (
            <tr key={i} className="border-b border-navy-100 hover:bg-navy-50/50">
              <td className="px-3 py-2.5 border border-navy-100 font-mono text-[11px] text-navy-800">{c.name}</td>
              <td className="px-3 py-2.5 border border-navy-100 text-navy-600">{c.provider}</td>
              <td className="px-3 py-2.5 border border-navy-100 text-navy-600">{c.purpose}</td>
              <td className="px-3 py-2.5 border border-navy-100 text-navy-600 whitespace-nowrap">{c.expiry}</td>
              <td className="px-3 py-2.5 border border-navy-100 text-navy-600 whitespace-nowrap">{c.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
