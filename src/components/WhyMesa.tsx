"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


export default function WhyMesa() {
  const HORIZONTAL_SCROLL_OFFSET_ADJUST = -35;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalPathRef = useRef<SVGPathElement>(null);

  const whyChooseMesaCards = [
    {
      titleLine1: "Rich",
      titleLine2: "Experience",
      floaters: [
        {
          className: "top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center p-3.5 shadow-lg shadow-black/40 animate-float-slow floating-element",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M6 3h12l4 6-10 13L2 9z" />
              <path d="M11 3 8 9l4 13 4-13-3-6" />
              <path d="M2 9h20" />
            </svg>
          )
        }
      ]
    },
    {
      titleLine1: "Instant",
      titleLine2: "Ordering",
      floaters: [
        {
          className: "top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center p-3.5 shadow-lg shadow-black/40 animate-float-slow floating-element",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )
        }
      ]
    },
    {
      titleLine1: "Seamless",
      titleLine2: "Payments",
      floaters: [
        {
          className: "top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center p-3.5 shadow-lg shadow-black/40 animate-float-slow floating-element",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          )
        }
      ]
    },
    {
      titleLine1: "More Google",
      titleLine2: "Reviews",
      floaters: [
        {
          className: "top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center p-3.5 shadow-lg shadow-black/40 animate-float-slow floating-element",
          svg: (
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          )
        }
      ]
    },
    {
      titleLine1: "Lowest",
      titleLine2: "Price",
      floaters: [
        {
          className: "top-4 right-4 md:top-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center p-3.5 shadow-lg shadow-black/40 animate-float-slow floating-element",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
          )
        }
      ]
    }
  ];

  useEffect(() => {
    let hzScrollTween: any = null;
    let hzPathTween: any = null;
    const hzCardTweens: any[] = [];
    let refreshTimer: any = null;
    let resizeHandler: (() => void) | null = null;

    const initGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Subtle GSAP scroll animation for the CTA buttons and hero card
      gsap.fromTo(
        ".scroll-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".scroll-fade-trigger",
            start: "top 85%",
          },
        }
      );

      const hzSection = horizontalSectionRef.current;
      const hzTrack = horizontalTrackRef.current;
      const hzPath = horizontalPathRef.current;

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

      if (hzSection && hzTrack) {
        hzScrollTween = gsap.to(hzTrack, {
          x: () => {
            try {
              if (!hzTrack || !hzTrack.parentElement) return 0;
              const parentWidth = hzTrack.parentElement.clientWidth || window.innerWidth || 1200;
              const scrollWidth = getScrollWidth();
              return -(scrollWidth - parentWidth);
            } catch (e) {
              console.error("Error in calculating horizontal offset:", e);
              return 0;
            }
          },
          ease: "none",
          scrollTrigger: {
            trigger: hzSection,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => {
              try {
                if (!hzTrack || !hzTrack.parentElement) return "+=0";
                const parentWidth = hzTrack.parentElement.clientWidth || window.innerWidth || 1200;
                const scrollWidth = getScrollWidth();
                return `+=${scrollWidth - parentWidth}`;
              } catch (e) {
                console.error("Error in calculating pinning end height:", e);
                return "+=3000";
              }
            },
            invalidateOnRefresh: true,
          }
        });

        if (hzPath) {
          try {
            const width = typeof window !== "undefined" ? window.innerWidth : 1200;
            let wavyWidth = 1100;
            let paddingLeft = width * 0.1;
            if (width >= 768) {
              wavyWidth = 1750;
              paddingLeft = width * 0.25;
            } else if (width >= 640) {
              wavyWidth = 1400;
              paddingLeft = width * 0.1;
            }
            const scrollWidth = getScrollWidth();
            const svgScrollWidth = scrollWidth * (1750 / wavyWidth);
            const svgPaddingLeft = paddingLeft * (1750 / wavyWidth);
            
            const svgEl = hzPath.ownerSVGElement;
            const startText = svgPaddingLeft + 50;
            if (svgEl) {
              svgEl.setAttribute("viewBox", `0 0 ${1750 + svgPaddingLeft} 500`);
              const textPath = svgEl.querySelector("#wavy-text-path");
              if (textPath) {
                textPath.setAttribute("d", `M ${startText},250 Q ${startText + 400},30 ${startText + 825},250 T ${startText + 1650},250`);
              }
            }

            const waveSpacing = 825;
            const N = Math.ceil(startText / waveSpacing);
            const x0 = startText - N * waveSpacing;
            
            let dPath = `M ${x0},250`;
            if (N % 2 === 0) {
              dPath += ` Q ${x0 + 412.5},30 ${x0 + waveSpacing},250`;
            } else {
              dPath += ` Q ${x0 + 412.5},470 ${x0 + waveSpacing},250`;
            }
            
            for (let i = 1; i < N; i++) {
              dPath += ` T ${x0 + (i + 1) * waveSpacing},250`;
            }
            
            let currentX = startText;
            while (currentX < svgScrollWidth + waveSpacing) {
              currentX += waveSpacing;
              dPath += ` T ${currentX},250`;
            }
            hzPath.setAttribute("d", dPath);

            const pathLength = hzPath.getTotalLength();
            gsap.set(hzPath, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              attr: {
                "stroke-dasharray": pathLength,
                "stroke-dashoffset": pathLength
              }
            });

            hzPathTween = gsap.to(hzPath, {
              strokeDashoffset: 0,
              ease: "none",
              attr: {
                "stroke-dashoffset": 0
              },
              scrollTrigger: {
                trigger: hzSection,
                start: "top top",
                end: () => {
                  try {
                    if (!hzTrack || !hzTrack.parentElement) return "+=0";
                    const parentWidth = hzTrack.parentElement.clientWidth || window.innerWidth || 1200;
                    const scrollWidth = getScrollWidth();
                    return `+=${scrollWidth - parentWidth}`;
                  } catch (e) {
                    return "+=3000";
                  }
                },
                scrub: true,
                invalidateOnRefresh: true
              }
            });
          } catch (e) {
            console.error("Error setting up horizontal path tracing:", e);
          }
        }

        const cards = hzTrack.querySelectorAll(".mesa-horizontal-card");
        cards.forEach((card) => {
          const floaters = card.querySelectorAll(".floating-element");
          if (floaters.length > 0) {
            const floaterTween = gsap.fromTo(floaters, 
              { x: 40, y: 30, opacity: 0, scale: 0.8, rotate: -5 },
              {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                stagger: 0.08,
                onInterrupt: undefined,
                ease: "power1.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: hzScrollTween!,
                  start: "left 90%",
                  end: "left 40%",
                  scrub: true,
                }
              }
            );
            hzCardTweens.push(floaterTween);
          }

          const textElements = card.querySelectorAll(".mesa-card-text > span");
          if (textElements.length > 0) {
            const textTween = gsap.fromTo(textElements,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: hzScrollTween!,
                  start: "left 85%",
                  toggleActions: "play none none reverse",
                }
              }
            );
            hzCardTweens.push(textTween);
          }
        });

        refreshTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);

        resizeHandler = () => {
          try {
            if (hzPath) {
              const width = typeof window !== "undefined" ? window.innerWidth : 1200;
              let wavyWidth = 1100;
              let paddingLeft = width * 0.1;
              if (width >= 768) {
                wavyWidth = 1750;
                paddingLeft = width * 0.25;
              } else if (width >= 640) {
                wavyWidth = 1400;
                paddingLeft = width * 0.1;
              }
              const scrollWidth = getScrollWidth();
              const svgScrollWidth = scrollWidth * (1750 / wavyWidth);
              const svgPaddingLeft = paddingLeft * (1750 / wavyWidth);
              
              let dPath = `M ${-svgPaddingLeft},250 L 50,250 Q 450,30 875,250 T 1700,250`;
              let currentX = 1700;
              const waveSpacing = 825;
              while (currentX < svgScrollWidth + waveSpacing) {
                currentX += waveSpacing;
                dPath += ` T ${currentX},250`;
              }
              hzPath.setAttribute("d", dPath);

              const pathLength = hzPath.getTotalLength();
              gsap.set(hzPath, {
                strokeDasharray: pathLength,
                attr: {
                  "stroke-dasharray": pathLength
                }
              });
            }
            ScrollTrigger.refresh();
          } catch (e) {
            console.error("Error in resize handler:", e);
          }
        };

        window.addEventListener("resize", resizeHandler);
      }
    };

    initGsap();

    // Handles media query checks
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 361);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("resize", checkScreenSize);
      
      if (hzScrollTween) {
        hzScrollTween.scrollTrigger?.kill();
        hzScrollTween.kill();
      }
      if (hzPathTween) {
        hzPathTween.scrollTrigger?.kill();
        hzPathTween.kill();
      }
      hzCardTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div id="why-mesa" className="w-full block">
      <section 
        ref={horizontalSectionRef} 
        className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-transparent z-20"
      >
        <div className="h-full w-full flex flex-col justify-center py-12 md:py-16 overflow-hidden relative">
          
          {/* Static Title (Remains pinned at the top of the viewport) */}
          <div className="flex flex-col items-center text-center w-full px-6 flex-shrink-0 z-30 mb-8 md:absolute md:top-8 md:left-0 md:right-0 md:mb-0">
            <h2 className="text-[32px] sm:text-[40px] md:text-[46px] font-black tracking-tight text-neutral-950 leading-tight relative overflow-visible inline-block">
              <span className="relative inline-block">
                Why Choose Mesa?
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
              Empower your restaurant with technology that leaves a lasting impression on your customers.
            </p>
          </div>

          {/* Sliding Track for Horizontal Scroll */}
          <div className="w-full flex-grow flex items-center overflow-hidden z-20 md:mt-28">
            <div 
              ref={horizontalTrackRef} 
              className="flex flex-row flex-nowrap gap-8 md:gap-16 pr-[10vw] md:pr-[25vw] pl-0 min-w-max items-center relative"
            >
              {/* GIANT CURVY INTRO TEXT WITH INTEGRATED ANIMATED LINE */}
              <div className="h-[350px] sm:h-[450px] md:h-[450px] w-[calc(1400px+10vw)] md:w-[calc(1750px+25vw)] flex-shrink-0 select-none pointer-events-none flex items-center justify-start overflow-visible">
                <svg viewBox="0 0 1750 500" className="w-full h-full text-[#0a0a0a] fill-current overflow-visible">
                  <defs>
                    <path 
                      id="wavy-text-path" 
                      d="M 50,250 Q 450,30 875,250 T 1700,250" 
                    />
                  </defs>
                  
                  {/* CURVY ANIMATED LINE (First element, so it underlays the text) */}
                  <path
                    ref={horizontalPathRef}
                    stroke="#111111"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    transform="translate(0, 135)"
                  />

                  <text 
                    fontSize="145" 
                    fontWeight="900" 
                    letterSpacing="0.08em" 
                    className="font-black uppercase"
                    fontFamily="var(--font-primary), sans-serif"
                  >
                    <textPath href="#wavy-text-path" startOffset="4%">
                      I mean, Why not?
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* REASONS CARDS */}
              {whyChooseMesaCards.map((card, idx) => {
                const reasonNum = idx + 1;
                return (
                  <div 
                    key={idx}
                    className="mesa-horizontal-card w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] bg-neutral-950 text-white rounded-[28px] md:rounded-[36px] flex flex-col justify-center p-8 md:p-12 relative overflow-hidden select-none flex-shrink-0 shadow-[20px_20px_60px_rgba(0,0,0,0.15)]"
                  >
                    {/* Floating SVGs (Parallax animated on scroll) */}
                    {card.floaters?.map((floater, fIdx) => (
                      <div 
                        key={fIdx} 
                        className={`absolute pointer-events-none z-10 ${floater.className}`}
                      >
                        {floater.svg}
                      </div>
                    ))}

                    {/* Card Title & Counter Label */}
                    <div className="flex flex-col text-left w-full z-20 mesa-card-text">
                      <span className="text-[10px] md:text-[12px] font-black text-[#25D366] uppercase tracking-[0.2em] mb-2 opacity-90">
                        Reason 0{reasonNum}
                      </span>
                      <span className="text-[36px] sm:text-[46px] md:text-[58px] font-black tracking-tighter text-white leading-[0.95] uppercase">
                        {card.titleLine1}
                      </span>
                      <span className="text-[36px] sm:text-[46px] md:text-[58px] font-black tracking-tighter text-white leading-[0.95] uppercase mt-1">
                        {card.titleLine2}
                      </span>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
