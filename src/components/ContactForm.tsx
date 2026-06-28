"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ContactFormProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function ContactForm({ onVisibilityChange }: ContactFormProps) {
  const contactElementWidthPercent = "94%";
  const contactSmallScreenShiftX = "-10px";
  const supportWhatsApp = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "919100000000";

  const [contactName, setContactName] = useState("");
  const [contactWhatsApp, setContactWhatsApp] = useState("");
  const [contactBusinessName, setContactBusinessName] = useState("");
  const [contactCity, setContactCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [contactImageError, setContactImageError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 361);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (onVisibilityChange) {
          onVisibilityChange(entry.isIntersecting);
        }
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, [onVisibilityChange]);

  return (
    <section id="contact" className="w-full relative z-20 border-t border-neutral-100 py-20 flex flex-col items-center">
      {/* Desktop-only Full Window Background Image */}
      <div className="hidden lg:block absolute left-0 right-0 top-[28%] bottom-[-28%] z-0 pointer-events-none">
        <Image
          src="/hands.png"
          alt="Background hands"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Semi-transparent overlay for text readability and smooth bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f7f7]/85 via-[#f7f7f7]/85 to-[#f7f7f7] backdrop-blur-[1px]" />
      </div>

      {/* Centered Content Wrapper (Without card styling) */}
      <div className="w-full max-w-5xl md:max-w-6xl px-4 sm:px-6 relative z-10 mx-auto">
        
        {/* Desktop-only Big Header */}
        <div className="hidden md:flex flex-col items-center text-center w-full mb-10">
          <span className="text-[#2D3E24] font-black text-xs md:text-sm uppercase tracking-widest mb-3 text-center w-full">
            Make your business premium now
          </span>
          <h2 className="text-[28px] sm:text-[38px] md:text-[46px] font-black tracking-tight text-neutral-950 leading-none w-full text-center">
            Schedule a Call with the Experts
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column (renders on top on mobile / left on desktop): Dynamic Call booking Image */}
          <div className="col-span-12 md:col-span-12 flex items-center justify-center w-full">
            <div 
              className="relative rounded-[36px] border border-white/60 bg-white/20 backdrop-blur-sm shadow-clay-card flex flex-col items-center justify-center text-center p-4 md:p-5 animate-none w-[94%] md:w-[440px] min-h-[180px] md:min-h-0 h-auto md:h-[248px] aspect-[16/9] mx-auto"
              style={{
                position: "relative",
                left: isSmallScreen ? contactSmallScreenShiftX : "0px"
              }}
            >
              {!contactImageError ? (
                <div className="w-full h-full relative rounded-[26px] overflow-hidden">
                  <Image
                    src="/contact-image.png"
                    alt="Contact Mesa Dines Experts"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    onError={() => setContactImageError(true)}
                  />
                </div>
              ) : (
                // Elegant vector fallback representing scheduling a call / experts consult
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-neutral-800 relative select-none">
                  {/* Decorative background circle */}
                  <div className="absolute inset-10 bg-neutral-950/[0.02] rounded-full blur-2xl" />
                  
                  {/* Calendar / Phone Vector Fallback Graphic */}
                  <svg viewBox="0 0 100 120" className="w-24 h-24 text-[#2D3E24] fill-none stroke-current relative z-10 mb-4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="15" y="20" width="70" height="85" rx="8" strokeWidth="2" fill="white" fillOpacity="0.4" />
                    <line x1="15" y1="42" x2="85" y2="42" strokeWidth="2" />
                    <path d="M30 14v12M70 14v12" strokeWidth="3" />
                    <circle cx="32" cy="58" r="3" fill="currentColor" />
                    <circle cx="50" cy="58" r="3" fill="currentColor" />
                    <circle cx="68" cy="58" r="3" fill="currentColor" />
                    <circle cx="32" cy="74" r="3" fill="currentColor" />
                    <circle cx="50" cy="74" r="3" fill="currentColor" />
                    <circle cx="68" cy="74" r="6" className="fill-[#2D3E24] text-white" strokeWidth="0" />
                    <path d="M66 74l1.5 1.5 2.5-3" stroke="white" strokeWidth="1.5" />
                    <g transform="translate(10, 75)" className="animate-bounce">
                      <rect x="0" y="0" width="40" height="25" rx="6" fill="#2D3E24" strokeWidth="0" />
                      <polygon points="12,25 8,30 16,25" fill="#2D3E24" />
                      <svg x="10" y="4" width="20" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.1 15.1 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.56-.44-1-1-1H4c-.56 0-1 .44-1 1 0 9.39 7.61 17 17 17 .56 0 1-.44 1-1v-3.5c0-.56-.44-1-1-1z" />
                      </svg>
                    </g>
                  </svg>
                  <span className="text-neutral-400 font-extrabold text-[10.5px] uppercase tracking-wider max-w-xs relative z-10">
                    Upload dynamic cover here<br />(Recommended Aspect Ratio 16:9)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Form */}
          <div 
            className="col-span-12 md:col-span-12 flex flex-col items-center text-center w-full mx-auto"
            style={{ 
              width: contactElementWidthPercent,
              maxWidth: "100%",
              position: "relative",
              left: isSmallScreen ? contactSmallScreenShiftX : "0px"
            }}
          >
            {/* Mobile-only Header */}
            <div className="flex md:hidden flex-col items-start text-left w-full mb-6">
              <span className="text-[#2D3E24] font-black text-xs uppercase tracking-widest mb-2 text-left w-full">
                Make your business premium now
              </span>
              <h2 className="text-[22px] sm:text-[28px] font-black tracking-tight text-neutral-950 leading-tight w-full text-left">
                Schedule a Call with the Experts
              </h2>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center text-center p-8 md:p-12 bg-white/40 backdrop-blur-md border border-white/60 rounded-[32px] shadow-xl shadow-black/5 md:max-w-2xl"
              >
                {/* Animated SVG Checkmark */}
                <div className="w-20 h-20 bg-neutral-950/5 rounded-full flex items-center justify-center mb-6 border border-neutral-950/5 relative overflow-hidden shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),_inset_-1px_-1px_2px_rgba(255,255,255,0.8)]">
                  <svg viewBox="0 0 52 52" className="w-10 h-10 text-[#2D3E24] stroke-current" fill="none" strokeWidth="4">
                    <motion.circle 
                      cx="26" 
                      cy="26" 
                      r="23" 
                      initial={{ pathLength: 0 }} 
                      animate={{ pathLength: 1 }} 
                      transition={{ duration: 0.6, ease: "easeOut" }} 
                    />
                    <motion.path 
                      d="M16 26l7 7 13-13" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      initial={{ pathLength: 0 }} 
                      animate={{ pathLength: 1 }} 
                      transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }} 
                    />
                  </svg>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-neutral-950 tracking-tight leading-tight mb-2">
                  Thank You, {contactName}!
                </h3>
                
                <span className="text-[#2D3E24] font-black text-[11px] uppercase tracking-wider bg-neutral-950/5 px-3 py-1 rounded-lg border border-neutral-950/5">
                  Let's Grow {contactBusinessName} Together
                </span>
                
                <p className="text-neutral-500 font-extrabold text-xs md:text-sm max-w-md w-full leading-relaxed mt-5">
                  Thank you for showing trust in us. We will reach out to you on WhatsApp at <strong className="font-black text-neutral-900">+91 {contactWhatsApp}</strong> shortly to discuss your custom branding and tech rollout.
                </p>

                {/* WhatsApp Text Option and Green Button */}
                <div className="flex flex-col items-center gap-3 w-full mt-6 pt-6 border-t border-neutral-950/5">
                  <span className="text-neutral-400 font-extrabold text-[10px] uppercase tracking-wider">
                    Or you can text us directly:
                  </span>
                  {(() => {
                    const getFormattedInterests = () => {
                      if (selectedInterests.length === 0) return "";
                      if (selectedInterests.length === 1) return selectedInterests[0];
                      if (selectedInterests.length === 2) return `${selectedInterests[0]} and ${selectedInterests[1]}`;
                      return `${selectedInterests.slice(0, -1).join(", ")}, and ${selectedInterests[selectedInterests.length - 1]}`;
                    };
                    
                    const interestsText = getFormattedInterests();
                    const defaultMessage = interestsText
                      ? `Hi! I would like to enquire about how ${interestsText} from Mesa Dines can help my business skyrocket.`
                      : "Hi! I would like to enquire about how I can grow my business with Mesa Dines.";
                      
                    const waUrl = `https://wa.me/${supportWhatsApp}?text=${encodeURIComponent(defaultMessage)}`;
                    
                    return (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs md:text-sm tracking-wider uppercase rounded-2xl transition-all duration-300 hover:scale-[0.98] active:scale-[0.95] cursor-pointer shadow-lg shadow-[#25D366]/20"
                      >
                        <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M12.031 2C6.49 2 2 6.49 2 12.03c0 1.916.536 3.708 1.464 5.253L2 22l4.896-1.282c1.478.807 3.167 1.282 4.966 1.282C17.57 22 22 17.51 22 11.97 22 6.49 17.57 2 12.03 2zm4.335 13.916c-.226.634-1.3 1.238-1.808 1.32-.472.075-1.079.132-3.14-.726-2.632-1.094-4.302-3.793-4.434-3.969-.132-.176-1.079-1.433-1.079-2.736 0-1.302.68-1.943.925-2.207.245-.264.547-.33.725-.33.176 0 .356.006.509.013.162.006.384-.063.597.453.226.547.774 1.887.843 2.025.069.138.113.302.019.49-.094.188-.145.302-.289.471-.145.17-.308.384-.44.516-.151.15-.31.314-.132.616.176.302.78 1.283 1.673 2.075.918.818 1.692 1.076 1.993 1.226.302.151.478.126.66-.088.183-.214.774-.906.981-1.214.208-.308.415-.258.698-.151.283.107 1.792.843 2.1.993.308.15.515.226.59.358.076.132.076.761-.15 1.396z" />
                        </svg>
                        <span>Message us on WhatsApp</span>
                      </a>
                    );
                  })()}
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactName("");
                    setContactWhatsApp("");
                    setContactBusinessName("");
                    setContactCity("");
                    setSelectedInterests([]);
                  }}
                  className="mt-8 text-xs font-black text-[#2D3E24] hover:text-neutral-950 transition-colors underline cursor-pointer"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (contactName && contactWhatsApp && contactBusinessName && contactCity) {
                    setIsSubmitting(true);
                    setSubmitError(null);
                    try {
                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          name: contactName,
                          whatsapp: contactWhatsApp,
                          businessName: contactBusinessName,
                          city: contactCity,
                          interests: selectedInterests,
                        }),
                      });

                      const data = await response.json();

                      if (response.ok && data.status === "success") {
                        setFormSubmitted(true);
                      } else {
                        setSubmitError(data.message || "Failed to submit request. Please try again.");
                      }
                    } catch (error) {
                      console.error("Submission error:", error);
                      setSubmitError("Network error. Please check your internet connection.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }
                }}
                className="w-full flex flex-col gap-5 md:max-w-3xl"
              >
                {/* Row 1: Name and WhatsApp */}
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5 w-full md:w-1/2 items-start text-left">
                    <label htmlFor="contact-name" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase text-left w-full">
                      Your Name
                    </label>
                    <div className="relative w-full">
                      {/* Rounded black div with profile/user icon */}
                      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-[40px] bg-neutral-950 rounded-lg flex items-center justify-center shadow-sm">
                        <svg className="w-[18px] h-[18px] fill-none stroke-current text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full h-[52px] pl-[58px] pr-4 rounded-xl bg-white/60 border border-[#e5e5e0] focus:border-neutral-950 focus:bg-white text-sm font-extrabold text-neutral-950 outline-none transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number Input */}
                  <div className="flex flex-col gap-1.5 w-full md:w-1/2 items-start text-left">
                    <label htmlFor="contact-whatsapp" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase text-left w-full">
                      WhatsApp Number
                    </label>
                    <div className="relative w-full">
                      {/* Rounded black div with WhatsApp logo */}
                      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-[40px] bg-neutral-950 rounded-lg flex items-center justify-center shadow-sm z-10">
                        <svg className="w-[18px] h-[18px] fill-current text-white" viewBox="0 0 24 24">
                          <path d="M12.031 2C6.49 2 2 6.49 2 12.03c0 1.916.536 3.708 1.464 5.253L2 22l4.896-1.282c1.478.807 3.167 1.282 4.966 1.282C17.57 22 22 17.51 22 11.97 22 6.49 17.57 2 12.03 2zm4.335 13.916c-.226.634-1.3 1.238-1.808 1.32-.472.075-1.079.132-3.14-.726-2.632-1.094-4.302-3.793-4.434-3.969-.132-.176-1.079-1.433-1.079-2.736 0-1.302.68-1.943.925-2.207.245-.264.547-.33.725-.33.176 0 .356.006.509.013.162.006.384-.063.597.453.226.547.774 1.887.843 2.025.069.138.113.302.019.49-.094.188-.145.302-.289.471-.145.17-.308.384-.44.516-.151.15-.31.314-.132.616.176.302.78 1.283 1.673 2.075.918.818 1.692 1.076 1.993 1.226.302.151.478.126.66-.088.183-.214.774-.906.981-1.214.208-.308.415-.258.698-.151.283.107 1.792.843 2.1.993.308.15.515.226.59.358.076.132.076.761-.15 1.396z" />
                        </svg>
                      </div>
                      <span className="absolute left-[56px] top-1/2 -translate-y-1/2 text-sm font-extrabold text-neutral-400 select-none z-10">
                        +91
                      </span>
                      <input
                        id="contact-whatsapp"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="WhatsApp number"
                        value={contactWhatsApp}
                        onChange={(e) => setContactWhatsApp(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="w-full h-[52px] pl-[92px] pr-4 rounded-xl bg-white/60 border border-[#e5e5e0] focus:border-neutral-950 focus:bg-white text-sm font-extrabold text-neutral-950 outline-none transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Business Name and City */}
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  {/* Business Name Input */}
                  <div className="flex flex-col gap-1.5 w-full md:w-1/2 items-start text-left">
                    <label htmlFor="contact-business" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase text-left w-full">
                      Business Name
                    </label>
                    <div className="relative w-full">
                      {/* Rounded briefcase icon */}
                      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-[40px] bg-neutral-950 rounded-lg flex items-center justify-center shadow-sm">
                        <svg className="w-[18px] h-[18px] fill-none stroke-current text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      </div>
                      <input
                        id="contact-business"
                        type="text"
                        required
                        placeholder="Enter your business name"
                        value={contactBusinessName}
                        onChange={(e) => setContactBusinessName(e.target.value)}
                        className="w-full h-[52px] pl-[58px] pr-4 rounded-xl bg-white/60 border border-[#e5e5e0] focus:border-neutral-950 focus:bg-white text-sm font-extrabold text-neutral-950 outline-none transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* City Input */}
                  <div className="flex flex-col gap-1.5 w-full md:w-1/2 items-start text-left">
                    <label htmlFor="contact-city" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase text-left w-full">
                      City
                    </label>
                    <div className="relative w-full">
                      {/* Rounded pin icon */}
                      <div className="absolute left-[6px] top-[6px] bottom-[6px] w-[40px] bg-neutral-950 rounded-lg flex items-center justify-center shadow-sm">
                        <svg className="w-[18px] h-[18px] fill-none stroke-current text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <input
                        id="contact-city"
                        type="text"
                        required
                        placeholder="Enter your city"
                        value={contactCity}
                        onChange={(e) => setContactCity(e.target.value)}
                        className="w-full h-[52px] pl-[58px] pr-4 rounded-xl bg-white/60 border border-[#e5e5e0] focus:border-neutral-950 focus:bg-white text-sm font-extrabold text-neutral-950 outline-none transition-all placeholder:text-neutral-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Suggestions / Interests */}
                <div className="flex flex-col gap-2.5 w-full mt-1 items-start text-left md:items-center">
                  <span className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase text-left w-full md:text-center">
                    I am interested in...
                  </span>
                  <div className="flex flex-wrap gap-2 w-full md:justify-center">
                    {[
                      "Smart Ordering",
                      "AI Reviews",
                      "WhatsApp Automation",
                      "Voice AI"
                    ].map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl border text-[11.5px] font-black cursor-pointer transition-all duration-200 hover:scale-[0.97] active:scale-[0.94] flex items-center justify-center text-center ${
                            isSelected
                              ? "bg-neutral-950 text-white border-neutral-950 shadow-sm"
                              : "bg-white/60 text-neutral-600 border-[#e5e5e0] hover:bg-neutral-100/50 hover:text-neutral-800"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error alert */}
                {submitError && (
                  <div className="text-red-600 font-extrabold text-xs text-left w-full bg-red-50 border border-red-200 p-3.5 rounded-xl mt-1">
                    ⚠️ {submitError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !contactName || !contactWhatsApp || !contactBusinessName || !contactCity}
                  className="w-full flex items-center justify-center h-[54px] rounded-2xl bg-[#2D3E24] hover:bg-[#202D1A] text-white font-extrabold text-[14px] tracking-wide mt-2 shadow-clay-button transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none hover:scale-[0.98] active:scale-[0.95] cursor-pointer md:max-w-md md:mx-auto"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Scheduling...</span>
                    </div>
                  ) : (
                    "Schedule Call"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
