"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQAccordion() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const faqData = [
    {
      question: "How long does it take to set up?",
      answer: "We get you up and running within 24–48 hours. Our onboarding team handles your entire menu upload, category mapping, and QR configuration for you.",
      icon: (
        <svg className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      question: "Do my customers need to install an app?",
      answer: "No app install required! Customers simply scan the QR code at their table to open your custom, high-speed digital menu directly in their mobile browser.",
      icon: (
        <svg className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
          <path d="M17 6L7 18M7 6l10 12" className="opacity-40" />
        </svg>
      )
    },
    {
      question: "Can we customize the branding?",
      answer: "Absolutely. You can customize the color palette, upload your brand logo, adjust typography, and design your digital menus to match your restaurant's unique identity.",
      icon: (
        <svg className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03456 19.176 5.12256 19.264 5.1613 19.3732C5.20005 19.4824 5.18342 19.5968 5.15017 19.8257L5.02188 20.7064C4.9458 21.2295 5.38575 21.6811 5.91262 21.6111L6.78652 21.495C7.02672 21.4632 7.14682 21.4473 7.2605 21.4883C7.37418 21.5293 7.46499 21.6214 7.64661 21.8055C8.83151 22.008 10.3892 22 12 22Z" />
          <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
          <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
          <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      question: "Can customers place multiple orders from the same table?",
      answer: "Yes! Multiple guests at the same table can scan the QR code concurrently, add items to a synchronized shared cart, and place orders smoothly.",
      icon: (
        <svg className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      )
    },
    {
      question: "Can I update menu items anytime?",
      answer: "Yes, all updates are instant. You can change prices, add daily specials, edit descriptions, or mark items as out-of-stock instantly from your manager dashboard.",
      icon: (
        <svg className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      )
    },
    {
      question: "How does the AI Google Review feature work?",
      answer: "After ordering or paying, Mesa Dines prompts satisfied diners to share feedback. Our built-in AI helps them write draft reviews in seconds, boosting your rankings.",
      icon: (
        <svg className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    }
  ];

  return (
    <section id="faq" className="w-full max-w-4xl px-4 sm:px-6 py-20 flex flex-col items-center relative z-20 border-t border-neutral-100">
      <span className="text-[#2D3E24] font-black text-xs uppercase tracking-widest mb-2">
        Have Questions?
      </span>
      <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-neutral-950 mb-10 text-center leading-tight">
        Frequently Asked Questions
      </h2>

      <div className="w-full flex flex-col gap-4">
        {faqData.map((faq, idx) => {
          const isOpen = openFaqIdx === idx;
          return (
            <div 
              key={idx}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                  setOpenFaqIdx(idx);
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                  setOpenFaqIdx((prev) => (prev === idx ? null : prev));
                }
              }}
              className={`transition-all duration-300 rounded-2xl border ${
                isOpen 
                  ? "bg-white/80 border-neutral-950 shadow-[0_10px_30px_rgba(0,0,0,0.03)]" 
                  : "bg-white/40 border-[#e5e5e0] hover:bg-white/60"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer outline-none select-none"
              >
                <div className="flex items-center gap-4">
                  {/* SVG Icon Box */}
                  <div className="w-10 h-10 rounded-xl bg-neutral-950/5 flex items-center justify-center flex-shrink-0">
                    {faq.icon}
                  </div>
                  <span className="text-[14.5px] sm:text-base font-black text-neutral-950 leading-tight">
                    {faq.question}
                  </span>
                </div>
                
                {/* Chevron Icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex-shrink-0 ml-4 text-neutral-500"
                >
                  <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-neutral-100 text-neutral-600 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed pl-[60px]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
