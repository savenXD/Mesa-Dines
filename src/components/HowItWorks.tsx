"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function HowItWorks() {
  const featureImageSize = 480;
  const featureImageAspectRatio = 2 / 3;
  const HORIZONTAL_SCROLL_OFFSET_ADJUST = -35;

  const [featureErrors, setFeatureErrors] = useState([false, false, false, false]);

  const handleFeatureError = (index: number) => {
    setFeatureErrors((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const featuresRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const features = [
    {
      title: "Scan the QR",
      desc: "Scan the table QR code with your phone camera to access our digital menu instantly without waiting for a waiter.",
      img: "/feature1.png",
      fallbackSvg: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#2D3E24] stroke-current" fill="none" strokeWidth="2.5">
          <rect x="15" y="15" width="70" height="70" rx="6" />
          <rect x="25" y="25" width="20" height="20" rx="2" />
          <rect x="55" y="25" width="20" height="20" rx="2" />
          <rect x="25" y="55" width="20" height="20" rx="2" />
          <rect x="31" y="31" width="8" height="8" fill="currentColor" />
          <rect x="61" y="31" width="8" height="8" fill="currentColor" />
          <rect x="31" y="61" width="8" height="8" fill="currentColor" />
          <path d="M55 55h5v5h-5zm10 0h5v5h-5zm10 10h5v5h-5zm-10 10h5v5h-5zm10 0h5v5h-5z" fill="currentColor" />
        </svg>
      ),
      miniSvg: (
        <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] text-white stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h1v1h-1zm3 0h3v3h-3zm-3 3h3v3h-3zm6 0h1v1h-1zm-3 3h3v1h-3z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: "Add Items & Order",
      desc: "Browse our catalog, customize your dishes, and place your order directly from your seat in seconds.",
      img: "/feature2.png",
      fallbackSvg: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#2D3E24] stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="round">
          <rect x="20" y="15" width="60" height="22" rx="4" />
          <circle cx="32" cy="26" r="5" fill="currentColor" opacity="0.2" />
          <line x1="45" y1="23" x2="65" y2="23" />
          <line x1="45" y1="29" x2="57" y2="29" />
          
          <rect x="20" y="45" width="60" height="22" rx="4" />
          <circle cx="32" cy="56" r="5" fill="currentColor" opacity="0.2" />
          <line x1="45" y1="53" x2="65" y2="53" />
          <line x1="45" y1="59" x2="57" y2="59" />

          <circle cx="75" cy="72" r="12" className="fill-[#25D366] stroke-[#25D366]" />
          <line x1="75" y1="67" x2="75" y2="77" stroke="white" strokeWidth="3" />
          <line x1="70" y1="72" x2="80" y2="72" stroke="white" strokeWidth="3" />
        </svg>
      ),
      miniSvg: (
        <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] text-white stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" fill="currentColor" />
          <circle cx="20" cy="21" r="1" fill="currentColor" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          <line x1="12" y1="9" x2="16" y2="9" />
          <line x1="14" y1="7" x2="14" y2="11" />
        </svg>
      )
    },
    {
      title: "Cook Gets the Order",
      desc: "Your order instantly syncs with the kitchen display screen, allowing the chef to begin cooking immediately.",
      img: "/feature3.png",
      fallbackSvg: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#2D3E24] stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="round">
          <rect x="15" y="25" width="70" height="50" rx="6" />
          <line x1="15" y1="65" x2="85" y2="65" />
          <circle cx="30" cy="71" r="2" fill="currentColor" />
          <circle cx="70" cy="71" r="2" fill="currentColor" />
          <path d="M40 45l5-8h10l5 8" />
          <path d="M35 50h30" />
          <path d="M45 33v-4M55 33v-4" />
        </svg>
      ),
      miniSvg: (
        <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] text-white stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 2.2 1 4.2 2.7 5.5l-.7 2.5h8l-.7-2.5A5.9 5.9 0 0 0 18 8Z" />
          <path d="M6 19h12" />
        </svg>
      )
    },
    {
      title: "Wait & chill",
      desc: "Relax, listen to music, chat with friends, and watch your food arrive piping hot at your table.",
      img: "/feature4.png",
      fallbackSvg: (
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#2D3E24] stroke-current" fill="none" strokeWidth="2.5" strokeLinecap="round">
          <path d="M20 75h60M25 75c0-15 10-25 25-25s25 10 25 25" fill="none" />
          <path d="M50 30c5 0 10 5 10 10s-5 10-10 10-10-5-10-10 5-10 10-10z" fill="none" />
          <path d="M72 45c2-4-2-6 0-10M78 43c2-4-2-6 0-10" />
          <rect x="70" y="48" width="14" height="12" rx="2" />
          <path d="M84 51c2 0 3 1 3 3v2c0 2-1 3-3 3" />
        </svg>
      ),
      miniSvg: (
        <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] text-white stroke-current" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <path d="M6 2v2M10 2v2M14 2v2" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    let tl: any = null;
    let frameId: number | null = null;
    const cardTriggers: any[] = [];

    const initGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const getScrollWidth = () => {
        try {
          const width = typeof window !== "undefined" ? window.innerWidth : 1200;
          let wavyWidth = 1100;
          let cardWidth = 290;
          let gap = 32;
          let padding = width * 0.2;
          
          if (width >= 768) {
            wavyWidth = 1750;
            cardWidth = 420;
            gap = 64;
            padding = width * 0.5;
          } else if (width >= 640) {
            wavyWidth = 1400;
            cardWidth = 350;
            gap = 32;
            padding = width * 0.2;
          }
          
          const totalTrackWidth = wavyWidth + (4 * cardWidth) + (5 * gap) + (padding / 2) + (cardWidth / 2) + (width / 2) + HORIZONTAL_SCROLL_OFFSET_ADJUST;
          return totalTrackWidth;
        } catch (e) {
          console.error("Error in getScrollWidth:", e);
          return 5000;
        }
      };

      const path = pathRef.current;
      const container = featuresRef.current;
      if (path && container) {
        const samples: { screenY: number; screenDist: number }[] = [];
        let totalScreenLength = 0;

        const getScreenDistAtY = (targetY: number) => {
          try {
            if (samples.length === 0) return 0;
            if (targetY <= samples[0].screenY) return 0;
            if (targetY >= samples[samples.length - 1].screenY) return totalScreenLength;

            let low = 0;
            let high = samples.length - 1;
            while (low < high - 1) {
              const mid = Math.floor((low + high) / 2);
              if (samples[mid].screenY < targetY) {
                low = mid;
              } else {
                high = mid;
              }
            }

            const s0 = samples[low];
            const s1 = samples[high];
            if (!s0 || !s1 || s1.screenY === s0.screenY) return 0;
            const t = (targetY - s0.screenY) / (s1.screenY - s0.screenY);
            return s0.screenDist + t * (s1.screenDist - s0.screenDist);
          } catch (e) {
            console.error("Error in getScreenDistAtY:", e);
            return 0;
          }
        };

        const computeSamples = () => {
          try {
            const localLength = path.getTotalLength();
            const pathSvg = path.ownerSVGElement || path.parentElement;
            const containerWidth = pathSvg ? pathSvg.getBoundingClientRect().width : container.offsetWidth;
            const containerHeight = container.offsetHeight;
            if (!containerWidth || !containerHeight || !localLength) return false;

            const scaleX = containerWidth / 100;
            const scaleY = containerHeight / 100;

            samples.length = 0;
            let prevScreenX = 0;
            let prevScreenY = 0;
            totalScreenLength = 0;

            const numSamples = 200;
            for (let i = 0; i <= numSamples; i++) {
              const t = i / numSamples;
              const pt = path.getPointAtLength(t * localLength);
              const screenX = pt.x * scaleX;
              const screenY = pt.y * scaleY;

              if (i > 0) {
                const dx = screenX - prevScreenX;
                const dy = screenY - prevScreenY;
                totalScreenLength += Math.sqrt(dx * dx + dy * dy);
              }

              samples.push({
                screenY,
                screenDist: totalScreenLength
              });

              prevScreenX = screenX;
              prevScreenY = screenY;
            }

            gsap.set(path, {
              strokeDasharray: totalScreenLength,
              strokeDashoffset: totalScreenLength,
              attr: {
                "stroke-dasharray": totalScreenLength,
                "stroke-dashoffset": totalScreenLength
              }
            });

            return true;
          } catch (e) {
            console.error("Error in computeSamples:", e);
            return false;
          }
        };

        const initPath = () => {
          if (!computeSamples()) {
            frameId = requestAnimationFrame(initPath);
            return;
          }

          const obj = { progress: 0 };
          tl = gsap.to(obj, {
            progress: 1,
            ease: "none",
            onUpdate: () => {
              try {
                const p = obj.progress;
                const containerHeight = container.offsetHeight || 1000;
                const targetY = (2 + p * 96) * (containerHeight / 100);
                const screenDist = getScreenDistAtY(targetY);
                const offset = totalScreenLength - screenDist;

                gsap.set(path, {
                  strokeDashoffset: offset,
                  attr: {
                    "stroke-dashoffset": offset
                  }
                });
              } catch (e) {
                console.error("Error in path tracing update:", e);
              }
            },
            scrollTrigger: {
              trigger: container,
              start: "top center",
              end: "bottom center",
              scrub: 0.2,
            }
          });

          ScrollTrigger.refresh();

          const cards = container.querySelectorAll(".feature-card-scroll");
          cards.forEach((card) => {
            const trigger = ScrollTrigger.create({
              trigger: card,
              start: "top 60%",
              end: "bottom 40%",
              toggleClass: "feature-card-active"
            });
            cardTriggers.push(trigger);
          });
        };

        frameId = requestAnimationFrame(initPath);
      }
    };

    initGsap();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (tl) tl.kill();
      cardTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="how-it-works" className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl px-4 sm:px-6 py-20 flex flex-col items-center relative z-20">
      {/* Section Heading & Subtitle */}
      <div className="flex flex-col items-center text-center w-full mb-16">
        <h2 className="text-[32px] sm:text-[40px] md:text-[46px] font-black tracking-tight text-neutral-950 leading-tight relative overflow-visible inline-block">
          <span className="relative inline-block">
            How it works?
            <span className="absolute left-0 -bottom-2 w-full pointer-events-none">
              <svg
                width="100%"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                <motion.path
                  d="M4 8.5C40 4.5 130 4 196 8.5"
                  stroke="#111111"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                />
              </svg>
            </span>
          </span>
        </h2>
        <p className="text-neutral-500 font-extrabold text-[12.5px] sm:text-[14px] leading-[1.4] mt-5 max-w-md tracking-wide">
          Mesa Dines simplifies your operations from the table to the kitchen. Here is how we make dining seamless for you and your guests.
        </p>
      </div>

      {/* Features Container */}
      <div ref={featuresRef} className="relative w-full flex flex-col gap-24 sm:gap-32 md:gap-40 my-8 px-4 features-container">
        
        {/* Scroll-Linked Tracing Line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none z-10 overflow-visible">
          <svg 
            className="w-full h-full"
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M -10,2 C 10,2, 15,6, 22.5,12.5 C 30,19, 70,25, 77.5,37.5 C 85,50, 15,50, 22.5,62.5 C 30,75, 70,81, 77.5,87.5 C 85,94, 20,98, -10, 98"
              stroke="#111111"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* 4 Feature Items */}
        {features.map((feat, index) => {
          return (
            <div
              key={index}
              className="relative w-full max-w-[540px] md:max-w-none mx-auto md:mx-0 z-20"
            >
              <div className={`feature-card-scroll w-full bg-white rounded-[28px] p-6 sm:p-8 md:p-8 border border-[#e5e5e0] md:border-transparent transition-all duration-700 ease-out flex flex-col items-start text-left md:items-center md:gap-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Image Container with overlapping Badge */}
                <div 
                  className="relative w-full max-w-[340px] rounded-[20px] overflow-visible mb-6 md:mb-0 md:w-[480px] md:max-w-[480px] md:flex-shrink-0"
                  style={{
                    aspectRatio: `1 / ${featureImageAspectRatio}`
                  }}
                >
                  {/* Black Circular Overlapping Index Badge */}
                  <div className="absolute -top-3.5 -left-3.5 w-10 h-10 bg-neutral-950 text-white rounded-full flex items-center justify-center font-black text-lg z-20 shadow-md">
                    {index + 1}
                  </div>

                  {!featureErrors[index] ? (
                    <Image
                      src={feat.img}
                      alt={feat.title}
                      fill
                      sizes={`(max-width: 768px) 100vw, ${featureImageSize}px`}
                      className="object-cover rounded-[16px]"
                      onError={() => handleFeatureError(index)}
                      priority
                    />
                  ) : (
                    // Fallback visual
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm rounded-[16px] border border-white/30">
                      {feat.fallbackSvg}
                    </div>
                  )}
                </div>

                {/* Content Beside Image */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full md:flex-1"
                >
                  <div className="flex items-center gap-2.5 md:gap-4 mb-2.5 md:mb-4 w-full">
                    <div className="w-8 h-8 md:w-11 md:h-11 bg-neutral-950 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      {feat.miniSvg}
                    </div>
                    <h3 className="text-[20px] sm:text-[22px] md:text-[32px] font-black tracking-tight text-neutral-950 md:leading-tight">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-neutral-500 font-extrabold text-[12px] sm:text-[13px] md:text-[15px] leading-[1.4] md:leading-relaxed max-w-sm md:max-w-md tracking-wide">
                    {feat.desc}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
