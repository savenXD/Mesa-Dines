import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Mesa Dines",
  description: "Understand Mesa Dines' refund and cancellation policy for subscriptions and services.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Top bar */}
      <nav className="w-full border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white font-black text-lg tracking-tight group-hover:text-amber-400 transition-colors duration-200">← Mesa Dines</span>
        </Link>
        <span className="text-neutral-500 text-sm font-semibold hidden sm:block">Refund Policy</span>
      </nav>

      {/* Hero */}
      <div className="w-full bg-gradient-to-b from-neutral-900 to-neutral-950 px-6 py-16 md:py-24 text-center border-b border-neutral-800/50">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">Refund Policy</h1>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto">Last updated: June 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20 space-y-12">

        <Section title="1. Overview">
          At Mesa Dines, we stand behind the quality of our products and services. This Refund Policy outlines the conditions under which refunds are provided for subscriptions, one-time purchases, and add-on services. Please read this policy carefully before making a purchase.
        </Section>

        <Section title="2. Subscription Refunds">
          <ul className="list-disc list-outside pl-5 space-y-3 text-neutral-400">
            <li>
              <strong className="text-neutral-200">Monthly Plans:</strong> If you are on a monthly plan and wish to cancel, you may do so at any time. Access continues until the end of the current billing period. No refund is issued for the remaining days of the current month.
            </li>
            <li>
              <strong className="text-neutral-200">Annual Plans:</strong> Annual subscriptions are eligible for a full refund within <strong className="text-neutral-200">7 days</strong> of the original purchase date, provided no significant usage has occurred. After 7 days, no refund will be issued for the unused portion of the annual plan.
            </li>
            <li>
              <strong className="text-neutral-200">Trial Periods:</strong> If Mesa Dines offers a free trial, no charges are made during the trial. If you cancel before the trial ends, you will not be charged.
            </li>
          </ul>
        </Section>

        <Section title="3. One-Time Setup & Onboarding Fees">
          Setup fees, onboarding charges, and custom configuration fees are <strong className="text-neutral-200">non-refundable</strong> once the onboarding process has commenced, as these represent time and resources already invested by our team.
        </Section>

        <Section title="4. Add-On Services">
          Refunds for add-on services (such as custom menu design, advanced integrations, or white-label configurations) are evaluated on a case-by-case basis. If work has not yet commenced, a full refund will be issued. If work is in progress, a partial refund proportional to the work remaining may be offered.
        </Section>

        <Section title="5. Technical Issues & Service Failures">
          If you experience a service outage or technical failure directly attributable to Mesa Dines that significantly impacts your operations, you may be eligible for a credit toward future subscription periods. Refund eligibility in such cases is assessed based on the duration and severity of the issue.
          <p className="mt-3">To report a service issue, contact us immediately through WhatsApp or our contact form with details of the problem.</p>
        </Section>

        <Section title="6. How to Request a Refund">
          To request a refund, contact us within the eligible timeframe with:
          <ul className="list-disc list-outside pl-5 space-y-2 text-neutral-400 mt-3">
            <li>Your registered business name and email address</li>
            <li>The plan or service you purchased</li>
            <li>Date of purchase / payment reference</li>
            <li>Reason for the refund request</li>
          </ul>
          <p className="mt-3">We aim to process refund requests within <strong className="text-neutral-200">7–10 business days</strong> of approval. Refunds are returned to the original payment method used.</p>
        </Section>

        <Section title="7. Non-Refundable Situations">
          Refunds will <strong className="text-neutral-200">not</strong> be provided in the following cases:
          <ul className="list-disc list-outside pl-5 space-y-2 text-neutral-400 mt-3">
            <li>Change of mind after the refund eligibility window</li>
            <li>Failure to use the service during the subscription period</li>
            <li>Violations of our Terms of Service leading to account termination</li>
            <li>Requests made after the subscription has already been renewed</li>
          </ul>
        </Section>

        <Section title="8. Cancellation">
          You may cancel your Mesa Dines subscription at any time from your account settings or by contacting us. Cancellation stops future billing. It does not trigger an automatic refund for the current period unless you are within the eligible refund window described above.
        </Section>

        <Section title="9. Currency & Taxes">
          All transactions are processed in Indian Rupees (INR). Any taxes (GST or applicable levies) charged at the time of purchase are non-refundable as they are remitted to the government.
        </Section>

        <Section title="10. Contact Us">
          If you have any questions about this Refund Policy or would like to initiate a refund request, contact us:
          <p className="mt-3 text-amber-400 font-semibold">Mesa Dines — via WhatsApp or the contact form on our website.</p>
          <p className="mt-2 text-neutral-500 text-sm">We are committed to resolving all concerns fairly and promptly.</p>
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
