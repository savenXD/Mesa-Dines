import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Mesa Dines",
  description: "Learn how Mesa Dines collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Top bar */}
      <nav className="w-full border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-lg tracking-tight group-hover:text-amber-400 transition-colors duration-200">← Mesa Dines</span>
        </Link>
        <span className="text-neutral-500 text-sm font-semibold hidden sm:block">Privacy Policy</span>
      </nav>

      {/* Hero */}
      <div className="w-full bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-16 md:py-24 text-center border-b border-neutral-800/50">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Privacy Policy</h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto">Last updated: June 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20 space-y-12">

        <Section title="1. Introduction">
          Mesa Dines (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and services. By accessing or using Mesa Dines, you agree to the terms of this policy.
        </Section>

        <Section title="2. Information We Collect">
          <ul className="list-disc list-outside pl-5 space-y-2 text-neutral-400">
            <li><strong className="text-neutral-200">Business Information:</strong> Name, restaurant/café name, phone number, email address, and location provided during onboarding.</li>
            <li><strong className="text-neutral-200">Usage Data:</strong> Pages visited, features used, session duration, and interaction patterns on our platform.</li>
            <li><strong className="text-neutral-200">Device & Technical Data:</strong> IP address, browser type, operating system, and device identifiers.</li>
            <li><strong className="text-neutral-200">Communication Data:</strong> Messages, queries, or feedback you send to us via WhatsApp or contact forms.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc list-outside pl-5 space-y-2 text-neutral-400">
            <li>To provide, operate, and improve our services</li>
            <li>To communicate with you about your account and updates</li>
            <li>To personalise your experience on the platform</li>
            <li>To analyse usage trends and improve product features</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="4. Sharing of Information">
          We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our platform — such as hosting, analytics, or communication tools — under strict confidentiality agreements. We may disclose information if required by law or to protect our rights.
        </Section>

        <Section title="5. Data Storage & Security">
          Your data is stored on secure servers. We implement industry-standard security measures including encryption, access controls, and regular audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </Section>

        <Section title="6. Cookies">
          We use cookies and similar tracking technologies to enhance your experience, remember preferences, and analyse traffic. You may disable cookies through your browser settings, though some features may not function properly without them.
        </Section>

        <Section title="7. Your Rights">
          You have the right to access, correct, or delete your personal data held by us. To exercise these rights, contact us at the details below. We will respond within 30 days.
        </Section>

        <Section title="8. Third-Party Links">
          Our platform may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.
        </Section>

        <Section title="9. Changes to This Policy">
          We may update this Privacy Policy periodically. Changes will be posted on this page with a revised &quot;Last updated&quot; date. Continued use of our services after changes constitutes acceptance of the updated policy.
        </Section>

        <Section title="10. Contact Us">
          If you have any questions or concerns about this Privacy Policy, reach out to us:
          <p className="mt-3 text-amber-400 font-semibold">Mesa Dines — via WhatsApp or the contact form on our website.</p>
        </Section>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-neutral-800/50 pb-10">
      <h2 className="text-white font-bold text-xl mb-4">{title}</h2>
      <div className="text-neutral-400 leading-relaxed text-[15px]">{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-800/60 px-6 py-10 mt-4">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-semibold">
        <span>© 2026 Mesa Dines. All rights reserved.</span>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
