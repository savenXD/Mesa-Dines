import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Mesa Dines",
  description: "Read the Terms of Service for Mesa Dines — your agreement for using our restaurant technology platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Top bar */}
      <nav className="w-full border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-lg tracking-tight group-hover:text-amber-400 transition-colors duration-200">← Mesa Dines</span>
        </Link>
        <span className="text-neutral-500 text-sm font-semibold hidden sm:block">Terms of Service</span>
      </nav>

      {/* Hero */}
      <div className="w-full bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-16 md:py-24 text-center border-b border-neutral-800/50">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Terms of Service</h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto">Last updated: June 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20 space-y-12">

        <Section title="1. Acceptance of Terms">
          By accessing or using the Mesa Dines platform, website, or any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including restaurant owners, café operators, and any other business representatives.
        </Section>

        <Section title="2. Description of Services">
          Mesa Dines provides a suite of restaurant and café technology solutions including but not limited to:
          <ul className="list-disc list-outside pl-5 space-y-2 text-neutral-400 mt-3">
            <li>QR-based digital menu and ordering systems</li>
            <li>AI-powered Google Review automation and response tools</li>
            <li>WhatsApp and customer communication integrations</li>
            <li>Restaurant analytics and reporting dashboards</li>
            <li>Custom branding and white-label solutions</li>
          </ul>
          <p className="mt-3">Services are subject to change at our discretion. We will notify users of significant changes where possible.</p>
        </Section>

        <Section title="3. Account Registration & Eligibility">
          To use Mesa Dines, you must represent a legitimate food business and provide accurate, complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old or have the legal authority to enter into agreements on behalf of your business.
        </Section>

        <Section title="4. Subscription & Billing">
          Mesa Dines operates on a subscription basis. By subscribing, you authorise us to charge the applicable fees as described in your selected plan. Subscriptions renew automatically unless cancelled before the renewal date. All fees are in Indian Rupees (INR) and are exclusive of applicable taxes.
        </Section>

        <Section title="5. Acceptable Use">
          You agree not to:
          <ul className="list-disc list-outside pl-5 space-y-2 text-neutral-400 mt-3">
            <li>Use our platform for any unlawful, fraudulent, or deceptive purpose</li>
            <li>Attempt to reverse-engineer, copy, or replicate our proprietary software or systems</li>
            <li>Upload harmful, offensive, or misleading content</li>
            <li>Interfere with the operation of our platform or other users&apos; access</li>
            <li>Resell, sublicense, or commercially exploit our services without written permission</li>
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          All content, designs, logos, software, and materials on the Mesa Dines platform are the exclusive property of Mesa Dines and are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable licence to use our services for your business operations. You retain full ownership of your own business data and content uploaded to the platform.
        </Section>

        <Section title="7. Data & Privacy">
          Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using Mesa Dines, you consent to the collection and use of data as described in our Privacy Policy.
        </Section>

        <Section title="8. Service Availability">
          We strive for maximum uptime but do not guarantee uninterrupted access. Mesa Dines is not liable for downtime caused by maintenance, third-party infrastructure failures, or events outside our control. We will communicate planned maintenance in advance wherever possible.
        </Section>

        <Section title="9. Limitation of Liability">
          To the maximum extent permitted by law, Mesa Dines shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our services. Our total liability shall not exceed the amount you paid to us in the three (3) months preceding the claim.
        </Section>

        <Section title="10. Termination">
          We reserve the right to suspend or terminate your access to Mesa Dines at any time if you violate these Terms or engage in conduct harmful to our platform or other users. You may cancel your subscription at any time, subject to the terms in our Refund Policy.
        </Section>

        <Section title="11. Governing Law">
          These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in India. We encourage you to contact us first to resolve any disputes amicably.
        </Section>

        <Section title="12. Changes to Terms">
          We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised date. Continued use of our services after changes means you accept the updated Terms.
        </Section>

        <Section title="13. Contact Us">
          For questions about these Terms, please reach out to us:
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
