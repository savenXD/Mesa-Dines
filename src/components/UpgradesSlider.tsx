"use client";

import React from "react";

interface UpgradesSliderProps {
  handleBuyNowClick: (e: React.MouseEvent) => void;
}

export default function UpgradesSlider({ handleBuyNowClick }: UpgradesSliderProps) {
  const premiumServices = [
    {
      title: "Google Review Booster",
      price: "182",
      period: "month",
      desc: "Get more stars and rank higher on Google search results.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
      ),
      features: [
        {
          text: "1-Tap Scan to Review (Zero typing required)",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          )
        },
        {
          text: "AI drafts custom 5-star reviews for the guest",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
            </svg>
          )
        },
        {
          text: "Automated smart replies to thank reviewers on Google",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        },
        {
          text: "Boosts your Google ranking to get 10x more walk-ins",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          )
        }
      ]
    },
    {
      title: "WhatsApp Automation",
      price: "349",
      period: "month",
      desc: "Frictionless AI chat agent to handle orders and inquiries instantly.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]">
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.473 1.332 4.988L2 22l5.166-1.356c1.47.8 3.118 1.22 4.834 1.22h.004c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.069 14.157c-.248.696-1.248 1.272-1.74 1.344-.456.072-.888.084-2.868-.72-2.532-1.032-4.14-3.624-4.26-3.792-.12-.168-.972-1.296-.972-2.472 0-1.176.612-1.752.828-1.992.216-.24.468-.3.624-.3h.456c.12 0 .288.012.444.384.168.408.576 1.404.624 1.5.048.096.084.216.024.336-.06.12-.132.228-.264.384-.132.156-.276.348-.396.468-.132.132-.276.276-.12.54 1.092 1.884 2.292 2.76 3.204 3.168.216.096.384.024.492-.096.12-.132.516-.6.66-.804.144-.204.3-.168.516-.096.216.072 1.368.648 1.608.768.24.12.396.18.456.288.06.108.06.624-.188 1.32z"/>
        </svg>
      ),
      features: [
        {
          text: "Not generic Quick Replies (Speaks like a human)",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )
        },
        {
          text: "AI-generated intelligent, customized answers",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.008 3.008 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.008 3.008 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
          )
        },
        {
          text: "Takes orders and reservations 24/7 autonomously",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )
        },
        {
          text: "Replies in milliseconds so no customer is left waiting",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          )
        }
      ]
    },
    {
      title: "AI Voice Agent",
      price: "1399",
      period: "month",
      desc: "Warm, natural-sounding AI phone receptionist for reservations.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8" />
        </svg>
      ),
      features: [
        {
          text: "Speaks in a warm, natural human-like voice",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
            </svg>
          )
        },
        {
          text: "Answers calls instantly (Never miss a booking again)",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          )
        },
        {
          text: "Fully trained on your menu, timings & prices",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M4 19.5v-15c0-1.1.9-2 2-2h14v20H6c-1.1 0-2-.9-2-2z" />
              <path d="M6 2v18" />
            </svg>
          )
        },
        {
          text: "Books tables & records orders directly into your system",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl lg:max-w-none lg:w-full mt-12 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-neutral-400 font-black text-xs uppercase tracking-widest mb-1.5">
          Premium Upgrades
        </span>
        <h3 className="text-neutral-950 font-black text-2xl md:text-3xl tracking-tight leading-none">
          Other Premium Services
        </h3>
      </div>

      <div className="lg:hidden flex flex-col items-center gap-6 w-full px-2 py-4">
        {premiumServices.map((service, idx) => (
          <div 
            key={idx} 
            className="w-full max-w-[540px] sm:max-w-[640px] md:max-w-[750px] flex justify-center overflow-visible"
          >
            <div className="w-full flex flex-col justify-between items-stretch min-h-[365px] text-left border border-neutral-950/15 rounded-[32px] p-6 sm:p-7 bg-white shadow-xl shadow-black/5 relative overflow-hidden transition-all duration-300">
              
              {/* Top half */}
              <div>
                {/* Header section (Icon + Title & Price) */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  
                  {/* Dark Wrapper Icon Div */}
                  <div className="w-12 h-12 bg-neutral-950 text-white rounded-2xl flex items-center justify-center p-3 border border-neutral-800 shadow-md flex-shrink-0">
                    {service.icon}
                  </div>
                  
                  {/* Price Badge */}
                  <div className="flex items-baseline bg-neutral-900/5 px-3 py-1.5 rounded-xl border border-neutral-950/5">
                    <span className="text-neutral-950 font-black text-base">
                      ₹{service.price}
                    </span>
                    <span className="text-neutral-500 text-[9px] font-black uppercase ml-1">
                      / {service.period}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="text-neutral-900 text-base font-black tracking-tight mb-1">
                  {service.title}
                </h4>
                <p className="text-neutral-500 font-extrabold text-[11px] leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Feature Bullets Grid (4 points) */}
                <div className="flex flex-col gap-2 mb-5">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      {feat.icon}
                      <span className="text-[11px] font-extrabold text-neutral-600 tracking-wide leading-tight">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Now CTA Button */}
              <button onClick={handleBuyNowClick} className="w-full flex items-center justify-center bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-2xl transition-all duration-300 group shadow-md shadow-black/10 cursor-pointer">
                <span>Buy Now</span>
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Desktop Row Layout (Lg Screens and Above) */}
      <div className="hidden lg:flex lg:flex-row lg:justify-center lg:items-stretch lg:gap-6 xl:gap-8 lg:w-full lg:max-w-[1800px] lg:px-2 lg:py-4">
        {premiumServices.map((service, idx) => (
          <div 
            key={idx} 
            className="w-[33%] min-w-[370px] max-w-[650px] flex justify-center overflow-visible"
          >
            <div className="w-full flex flex-col justify-between items-stretch min-h-[365px] lg:min-h-[420px] text-left border border-neutral-950/15 rounded-[32px] p-5 md:p-7 bg-white shadow-xl shadow-black/5 relative overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-950/25 transition-all duration-300">
              
              {/* Top half */}
              <div>
                {/* Header section (Icon + Title & Price) */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  
                  {/* Dark Wrapper Icon Div */}
                  <div className="w-12 h-12 bg-neutral-950 text-white rounded-2xl flex items-center justify-center p-3 border border-neutral-800 shadow-md flex-shrink-0">
                    {service.icon}
                  </div>
                  
                  {/* Price Badge */}
                  <div className="flex items-baseline bg-neutral-900/5 px-3 py-1.5 rounded-xl border border-neutral-950/5">
                    <span className="text-neutral-950 font-black text-base">
                      ₹{service.price}
                    </span>
                    <span className="text-neutral-500 text-[9px] font-black uppercase ml-1">
                      / {service.period}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h4 className="text-neutral-900 text-base font-black tracking-tight mb-1">
                  {service.title}
                </h4>
                <p className="text-neutral-500 font-extrabold text-[11px] leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Feature Bullets Grid (4 points) */}
                <div className="flex flex-col gap-2 mb-5">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      {feat.icon}
                      <span className="text-[11px] font-extrabold text-neutral-600 tracking-wide leading-tight">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Now CTA Button */}
              <button onClick={handleBuyNowClick} className="w-full flex items-center justify-center bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-2xl transition-all duration-300 group shadow-md shadow-black/10 cursor-pointer">
                <span>Buy Now</span>
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
