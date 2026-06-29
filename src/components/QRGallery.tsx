"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_PLAY_INTERVAL = 4500;

interface QRSlide {
  image: string;
  title: string;
  subtitle: string;
  isCustom?: boolean;
  customPara?: string;
  features?: { icon: React.ReactNode; text: string }[];
}

const slides: QRSlide[] = [
  {
    image: "/qr1.png",
    title: "Premium Table Plaque",
    subtitle: "Clean & Minimalist",
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
        text: "Sleek flat design — sits flush and clean on any table",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
        text: "Stays securely in place — no fuss, no moving parts",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h.01M18 14h.01M14 18h.01M18 18h.01" />
          </svg>
        ),
        text: "High-contrast QR code — reliable scan from any angle",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        text: "Fully custom branding — your logo, colors & layout",
      },
    ],
  },
  {
    image: "/qr2.png",
    title: "Acrylic Tent Stand",
    subtitle: "Transparent & Modern",
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        text: "Free-standing design — just place it and it stands",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
        text: "Solid, rigid build — stable and resistant to everyday wear",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ),
        text: "Clear, refined finish — looks premium on any table",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
        text: "Branding on both sides — more visibility, more impact",
      },
    ],
  },
  {
    image: "/qr3.png",
    title: "Wooden QR Stand",
    subtitle: "Warm & Artisan",
    features: [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M17 8C8 10 5.9 16.17 3.82 21L3 23l1-2c.9-1.39 5.07-3.75 8-2 3-1.69 4.91-4.38 5-7" /><path d="M7 12c.71-3.74 4.05-6.67 7-8" />
          </svg>
        ),
        text: "Natural wood look — warm, premium feel on every table",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        ),
        text: "Compact and stable — sits confidently on any surface",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        ),
        text: "Adds a cozy, artisan character to your café or restaurant",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        text: "Custom branding options — make it distinctly yours",
      },
    ],
  },
  {
    image: "/qr4.png",
    title: "Get a Custom Design",
    subtitle: "Matches Your Brand Theme",
    isCustom: true,
    customPara:
      "Your brand, your rules. Tell us your colors, material, and style — we'll design and deliver a bespoke QR stand that's built around your restaurant's identity. No templates, no compromises.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
  }),
};

export default function QRGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag/swipe state (mobile only)
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = useCallback((idx: number, customDirection?: number) => {
    const clamped = (idx + slides.length) % slides.length;
    if (customDirection !== undefined) {
      setDirection(customDirection);
    } else {
      setDirection(clamped > activeIdx ? 1 : -1);
    }
    setActiveIdx(clamped);

    // Scroll mobile track
    if (trackRef.current && window.innerWidth < 1024) {
      const cardWidth = trackRef.current.scrollWidth / slides.length;
      trackRef.current.scrollTo({ left: cardWidth * clamped, behavior: "smooth" });
    }
  }, [activeIdx]);

  const handleNext = useCallback(() => {
    goTo(activeIdx + 1, 1);
  }, [activeIdx, goTo]);

  const handlePrev = useCallback(() => {
    goTo(activeIdx - 1, -1);
  }, [activeIdx, goTo]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % slides.length;
        setDirection(1);
        if (trackRef.current && window.innerWidth < 1024) {
          const cardWidth = trackRef.current.scrollWidth / slides.length;
          trackRef.current.scrollTo({ left: cardWidth * next, behavior: "smooth" });
        }
        return next;
      });
    }, AUTO_PLAY_INTERVAL);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPaused, startTimer, stopTimer]);

  // Sync active dot when user manually scrolls
  const handleScroll = useCallback(() => {
    if (!trackRef.current || window.innerWidth >= 1024) return;
    const cardWidth = trackRef.current.scrollWidth / slides.length;
    const idx = Math.round(trackRef.current.scrollLeft / cardWidth);
    setActiveIdx(Math.max(0, Math.min(slides.length - 1, idx)));
  }, []);

  // Mouse drag (mobile/tablet only)
  const onMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return;
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024 || dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024 || dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    dragStartX.current = null;
    if (Math.abs(diff) > 40) {
      setIsPaused(true);
      goTo(activeIdx + (diff > 0 ? 1 : -1));
    }
    isDragging.current = false;
  };

  // Touch drag (mobile/tablet only)
  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    dragStartX.current = null;
    if (Math.abs(diff) > 40) {
      goTo(activeIdx + (diff > 0 ? 1 : -1));
    }
  };

  const handleDotClick = (idx: number) => {
    setIsPaused(true);
    goTo(idx, idx > activeIdx ? 1 : -1);
  };

  const handleCardAreaClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    setIsPaused(true);
    handleNext();
  };

  const activeSlide = slides[activeIdx];

  return (
    <section className="w-full py-16 flex flex-col items-center">

      {/* Section Header */}
      <div className="flex flex-col items-center text-center w-full max-w-xl mb-10 px-6">
        <span className="text-neutral-400 font-black text-xs uppercase tracking-widest mb-1.5">
          Included with ₹999
        </span>
        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-black tracking-tight text-neutral-950 leading-tight relative overflow-visible inline-block">
          <span className="relative inline-block">
            The QR Gallery
            <span className="absolute left-0 -bottom-2 w-full pointer-events-none">
              <svg width="100%" height="10" viewBox="0 0 200 10" fill="none" className="overflow-visible">
                <path d="M4 7C50 3 140 3 196 7" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h2>
        <p className="text-neutral-500 font-extrabold text-[12.5px] sm:text-[13.5px] leading-relaxed mt-5 tracking-wide">
          Every plan comes with a physical QR stand. Pick the style that fits your space.
        </p>
      </div>

      {/* ==================== DESKTOP LAYOUT (one card at a time, landscape design, slide animations) ==================== */}
      <div 
        className="hidden lg:flex items-center justify-center gap-6 w-full max-w-5xl px-6 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="flex-shrink-0 w-14 h-14 rounded-full border border-neutral-950/10 bg-white flex items-center justify-center text-neutral-900 shadow-md hover:bg-neutral-950 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Previous QR design"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Card Animation Area (Fixed size for transition containment) */}
        <div className="relative overflow-hidden w-full max-w-[780px] h-[372px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 28 },
                opacity: { duration: 0.25 },
              }}
              onClick={handleCardAreaClick}
              className="absolute w-full h-full border border-neutral-950/12 rounded-[28px] bg-white shadow-xl shadow-black/5 flex flex-row overflow-hidden hover:shadow-2xl cursor-pointer select-none"
            >
              {/* Left: Product Image in White Hug Frame (Square) */}
              <div className="p-4 pr-2 flex-shrink-0">
                <div className="w-[340px] h-[340px] relative rounded-[20px] overflow-hidden border border-neutral-100 shadow-inner">
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    className="object-cover pointer-events-none select-none"
                    sizes="340px"
                    draggable={false}
                    priority
                  />
                </div>
              </div>

              {/* Right: Content details */}
              <div className="flex-1 p-6 pl-4 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-neutral-900 text-[20px] font-black tracking-tight leading-tight">
                      {activeSlide.title}
                    </h3>
                    <p className="text-neutral-400 text-[11px] font-black uppercase tracking-widest mt-1.5">
                      {activeSlide.subtitle}
                    </p>
                  </div>

                  {activeSlide.isCustom ? (
                    <p className="text-neutral-500 font-extrabold text-[12.5px] leading-relaxed pr-2 mt-1">
                      {activeSlide.customPara}
                    </p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {activeSlide.features?.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          {feat.icon}
                          <span className="text-[12.5px] font-extrabold text-neutral-600 tracking-wide leading-tight">
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Seller Button */}
                <a
                  href="#contact"
                  className="w-full flex items-center justify-between bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-4 rounded-2xl transition-all duration-300 group shadow-lg shadow-black/10 cursor-pointer"
                >
                  <span>Contact Seller</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="flex-shrink-0 w-14 h-14 rounded-full border border-neutral-950/10 bg-white flex items-center justify-center text-neutral-900 shadow-md hover:bg-neutral-950 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Next QR design"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>


      {/* ==================== MOBILE/TABLET LAYOUT (swipeable grid track) ==================== */}
      <div
        ref={trackRef}
        className="lg:hidden no-scrollbar w-full overflow-x-auto pb-2 select-none"
        style={{
          display: isDesktop ? "none" : "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "min(85vw, 440px)",
          gap: "16px",
          padding: "0 16px 8px",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="w-full h-full border border-neutral-950/12 rounded-[28px] bg-white shadow-xl shadow-black/5 flex flex-col overflow-hidden">
              <div className="p-3 pb-0">
                <div className="w-full aspect-square relative rounded-[20px] overflow-hidden border border-neutral-100 shadow-inner">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="440px"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="px-5 pt-5 pb-5 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="text-neutral-900 text-[17px] font-black tracking-tight leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-neutral-400 text-[10.5px] font-black uppercase tracking-widest mt-1">
                    {slide.subtitle}
                  </p>
                </div>

                {slide.isCustom ? (
                  <p className="text-neutral-500 font-extrabold text-[11.5px] leading-relaxed">
                    {slide.customPara}
                  </p>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {slide.features?.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        {feat.icon}
                        <span className="text-[11.5px] font-extrabold text-neutral-600 tracking-wide leading-tight">
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href="#contact"
                  className="w-full mt-auto flex items-center justify-between bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-4 rounded-2xl transition-all duration-300 group shadow-lg shadow-black/10 cursor-pointer"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <span>Contact Seller</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Dots (visible underneath, on both mobile & desktop) */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIdx
                ? "w-6 h-2 bg-neutral-950"
                : "w-2 h-2 bg-neutral-300 hover:bg-neutral-500"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
