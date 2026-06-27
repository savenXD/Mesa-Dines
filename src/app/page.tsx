"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  // UNIVERSAL IMAGE CONFIGURATION: Change these to style the hero image and its spacing project-wide
  const heroImageSize = 680; // Maximum width in pixels to fit in one frame on desktop
  const heroImageAspectRatio = 0.92; // Height ratio relative to width (e.g. 0.62)
  const heroImageMarginTop = "0px"; // Top margin for the hero image
  const heroImageMarginBottom = "0px"; // Bottom margin for the hero image

  // FEATURE IMAGES CONFIGURATION (How It Works section)
  const featureImageSize = 480; // Maximum width in pixels for the process images on desktop
  const featureImageAspectRatio = 0.75; // Aspect ratio of features images (height / width)

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const pathRef = useRef<SVGPathElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const horizontalPathRef = useRef<SVGPathElement>(null);
  const [featureErrors, setFeatureErrors] = useState([false, false, false, false]);

  const handleFeatureError = (index: number) => {
    setFeatureErrors((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // Swipe-to-buy slider configuration and logic
  const [swiped, setSwiped] = useState(false);
  const [dragWidth, setDragWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const handleControls = useAnimation();
  const handleX = useMotionValue(0);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDevPage, setShowDevPage] = useState(false);

  const handleBack = () => {
    setShowDevPage(false);
    setIsTransitioning(false);
    // Reset swipe handle
    handleControls.start({ x: 0, transition: { duration: 0.5, ease: "easeInOut" } });
    setSwiped(false);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && handleRef.current) {
        const trackW = trackRef.current.offsetWidth;
        const handleW = handleRef.current.offsetWidth;
        setDragWidth(trackW - handleW - 10); // 10px accounts for p-[5px] (5px left & right padding)
      }
    };
    
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener("resize", updateWidth);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handleDragEnd = async (event: any, info: any) => {
    const currentX = handleX.get();
    if (currentX >= dragWidth * 0.85) {
      setSwiped(true);
      await handleControls.start({ x: dragWidth, transition: { duration: 0.15, ease: "easeOut" } });
      
      // Trigger liquid page transition
      setIsTransitioning(true);
      setTimeout(() => {
        setShowDevPage(true);
      }, 1000);
    } else {
      handleControls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
    }
  };

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

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

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
    }
  ];

  // Initialize GSAP and ScrollTrigger for scroll-based animations
  useEffect(() => {
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

    // Wavy Path Tracing Animation
    let tl: gsap.core.Tween | null = null;
    let resizeHandler: (() => void) | null = null;
    let frameId: number | null = null;
    const cardTriggers: any[] = [];

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

          // Binary search on precomputed samples
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

          // Linear interpolation between low and high
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

          // Set initial SVG presentation attributes
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
        // If features container height or width is 0, DOM layout hasn't completed. Wait for next frame.
        if (!computeSamples()) {
          frameId = requestAnimationFrame(initPath);
          return;
        }

        const obj = { progress: 0 };
        // Animate attribute with ScrollTrigger (starts only after user crosses the 1st feature)
        tl = gsap.to(obj, {
          progress: 1,
          ease: "none",
          onUpdate: () => {
            try {
              const p = obj.progress;
              const containerHeight = container.offsetHeight || 1000;
              // The path starts at Y=2% and ends at Y=98%. So target Y is:
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

        // Force ScrollTrigger to compute coordinates immediately
        ScrollTrigger.refresh();

        // ScrollTrigger for each card highlight
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

        resizeHandler = () => {
          if (computeSamples()) {
            ScrollTrigger.refresh();
          }
        };

        window.addEventListener("resize", resizeHandler);
      };

      // Trigger initialization after initial render paints
      frameId = requestAnimationFrame(initPath);
    }

    // Why Choose Mesa horizontal pinning and scroll logic
    const hzSection = horizontalSectionRef.current;
    const hzTrack = horizontalTrackRef.current;
    const hzPath = horizontalPathRef.current;
    let hzScrollTween: gsap.core.Tween | null = null;
    let hzPathTween: gsap.core.Tween | null = null;
    const hzCardTweens: any[] = [];
    let refreshTimer: any = null;

    if (hzSection && hzTrack) {
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
          
          // 1 wavy text + 4 cards = 5 elements -> 4 gaps + 1800px scroll buffer to ensure all elements scroll fully into view
          const totalTrackWidth = wavyWidth + (4 * cardWidth) + (4 * gap) + padding + 1800;
          return totalTrackWidth;
        } catch (e) {
          console.error("Error in getScrollWidth:", e);
          return 5000;
        }
      };

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
          scrub: 1.2, // Smooth scroll with inertia
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

      // Generate the horizontal path dynamically based on screen width
      if (hzPath) {
        try {
          const width = typeof window !== "undefined" ? window.innerWidth : 1200;
          const scrollWidth = getScrollWidth();
          let dPath = "";
          if (width >= 768) {
            dPath = `M 0,390 Q 450,170 875,390 T 1700,390 L ${scrollWidth},390`;
          } else if (width >= 640) {
            dPath = `M 0,320 Q 350,140 700,320 T 1350,320 L ${scrollWidth},320`;
          } else {
            dPath = `M 0,250 Q 275,100 550,250 T 1050,250 L ${scrollWidth},250`;
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
              scrub: true
            }
          });
        } catch (e) {
          console.error("Error setting up horizontal path tracing:", e);
        }
      }

      // Implement parallax animations for floating elements inside the cards
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
      });

      // Refresh ScrollTrigger coordinates after layouts have fully painted
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
      cardTriggers.forEach((t) => t.kill());

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
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, []);

  // Split heading text for staggered entry
  const headingWords = [
    { text: "Premium", line: 1 },
    { text: "Cafe", line: 1 },
    { text: "Tech", line: 1 },
    { text: "at", line: 1 },
    { text: "affordable", line: 2, underline: true },
    { text: "prices", line: 2 }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as const, // Custom cubic-bezier for luxury feel
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: any) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.15 + custom * 0.08,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center select-none">
      {/* Mesh Grid Background (starts from the top and fades out by the end of the Features section) */}
      <div className="absolute top-0 left-0 right-0 h-[220vh] grid-mesh pointer-events-none -z-10" />

      {/* NAVIGATION BAR */}
      <header className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 py-7 flex items-center justify-between z-40 relative">
        {/* Left Side: Claymorphic Logo Container */}
        <div className="bg-[#ffffff] rounded-[15px] py-0 px-3 shadow-clay-logo flex items-center justify-center h-[64px] md:h-[76px] min-w-[130px] md:min-w-[175px] overflow-hidden">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Mesa Dines Logo"
              width={220}
              height={60}
              className="object-contain h-[56px] md:h-[66px] w-auto"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            // Premium Vector Fallback Logo
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 100 100" className="text-[#2D3E24] fill-current w-[48px] h-[48px] md:w-[60px] md:h-[60px]">
                <circle cx="50" cy="40" r="30" stroke="#2D3E24" strokeWidth="8" fill="none" />
                <line x1="10" y1="75" x2="90" y2="75" stroke="#2D3E24" strokeWidth="8" strokeLinecap="round" />
                <path d="M50 75v15" stroke="#2D3E24" strokeWidth="8" strokeLinecap="round" />
                <path d="M40 30v15M60 30v15" stroke="#2D3E24" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <span className="font-extrabold text-[20px] md:text-[26px] tracking-wider text-[#2D3E24] uppercase">
                Mesa Dines
              </span>
            </div>
          )}
        </div>

        {/* Center: Desktop Navigation Links with sliding pill hover */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#ffffff]/80 backdrop-blur-md rounded-[15px] p-1.5 shadow-clay-logo border border-white/40 h-[58px]">
          {["Home", "Our Tech", "Pricing", "About Us", "Contact"].map((item, idx) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative px-5 py-2 rounded-[12px] text-[14.5px] font-extrabold text-neutral-800 transition-colors duration-200 animate-none"
            >
              <span className="relative z-10">{item}</span>
              {hoveredIdx === idx && (
                <motion.span
                  layoutId="navHoverPill"
                  className="absolute inset-0 bg-neutral-950/[0.04] rounded-[10px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),_inset_-1px_-1px_2px_rgba(255,255,255,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Side: Desktop CTA Button / Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <button className="hidden md:flex items-center justify-center gap-2 bg-neutral-950 text-white rounded-[15px] h-[58px] px-7 text-[15.5px] font-extrabold shadow-clay-button hover:bg-neutral-900 transition-all duration-200 active:scale-[0.97] cursor-pointer">
            <span>Buy now</span>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" fill="currentColor" />
              <circle cx="20" cy="21" r="1" fill="currentColor" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden bg-[#ffffff] rounded-[15px] shadow-clay-logo flex items-center justify-center h-[64px] aspect-square focus:outline-none cursor-pointer relative z-50 hover:bg-neutral-50 transition-all duration-200 active:scale-[0.97]"
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" className="stroke-current text-neutral-900">
              <motion.path
                animate={menuOpen ? { d: "M18 6L6 18" } : { d: "M4 7h16" }}
                transition={{ duration: 0.3 }}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <motion.path
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                d="M4 12h16"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <motion.path
                animate={menuOpen ? { d: "M6 6l12 12" } : { d: "M4 17h16" }}
                transition={{ duration: 0.3 }}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 bg-[#f7f7f7]/98 backdrop-blur-md z-30 flex flex-col justify-center px-8 md:px-24"
          >
            <div className="absolute inset-0 grid-mesh pointer-events-none -z-10" />
            <nav className="flex flex-col gap-6 text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
              {["Home", "Our Tech", "Pricing", "About Us", "Contact"].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  variants={menuItemVariants}
                  custom={idx}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#2D3E24] w-fit transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <motion.div
              variants={menuItemVariants}
              custom={5}
              className="mt-12 flex flex-col gap-4 max-w-sm"
            >
              <a
                href="#book"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 border border-neutral-950 bg-transparent text-neutral-950 font-bold py-4 px-6 rounded-2xl hover:bg-neutral-900 hover:text-white transition-all duration-200"
              >
                <span>Get Started Now</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 pt-2 pb-12 md:pb-16 flex flex-col items-center flex-grow">
        <div className="flex flex-col md:grid md:grid-cols-12 w-full gap-y-6 md:gap-y-8 gap-x-8 md:gap-x-12 lg:gap-x-16 items-center mt-6 md:mt-10">
          
          {/* Text Column: Heading & Subheading */}
          <div className="col-span-12 md:col-span-7 order-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
            {/* Animated Heading */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center md:items-start text-center md:text-left w-full"
            >
              {/* Line 1 */}
              <h1 className="text-[clamp(15px,9.3vw,44px)] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[60px] font-black tracking-tight text-[#111111] leading-[1.12] w-full text-center md:text-left">
                <span className="block w-full md:whitespace-nowrap text-center md:text-left">
                  {headingWords
                    .filter((w) => w.line === 1)
                    .map((w, idx, arr) => (
                      <span key={idx} className="inline-block">
                        <span className="overflow-hidden inline-block px-[0.06em]">
                          <motion.span variants={wordVariants} className="inline-block origin-bottom">
                            {w.text}
                          </motion.span>
                        </span>
                        {idx < arr.length - 1 && " "}
                      </span>
                    ))}
                </span>

                {/* Line 2 */}
                <span className="block w-full md:whitespace-nowrap text-center md:text-left mt-0.5 sm:mt-1.5">
                  {headingWords
                    .filter((w) => w.line === 2)
                    .map((w, idx, arr) => (
                      <span key={idx} className="inline-block">
                        <span className="relative overflow-visible inline-block px-[0.06em]">
                          <span className="overflow-hidden inline-block px-[0.06em]">
                            <motion.span variants={wordVariants} className="inline-block origin-bottom">
                              {w.text}
                            </motion.span>
                          </span>
                          {w.underline && (
                            <span className="absolute left-0 -bottom-[0.1em] w-full pointer-events-none">
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 200 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="overflow-visible h-[0.22em]"
                              >
                                <motion.path
                                  d="M4 8.5C40 4.5 130 4 196 8.5"
                                  stroke="#111111"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    delay: 1.1,
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1] as const,
                                  }}
                                />
                              </svg>
                            </span>
                          )}
                        </span>
                        {idx < arr.length - 1 && " "}
                      </span>
                    ))}
                </span>
              </h1>
            </motion.div>

            {/* Subheading text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-neutral-500 font-extrabold text-[11.5px] sm:text-[13.5px] md:text-[15px] lg:text-[17px] leading-[1.35] mt-3 md:mt-5 max-w-xs sm:max-w-md md:max-w-md lg:max-w-xl tracking-wide text-center md:text-left mx-auto md:mx-0"
            >
              Empower your food business with 5-star restaurant technology. Delight diners, automate tasks, and scale margins effortlessly.
            </motion.p>
          </div>

          {/* Hero Image */}
          <div className="col-span-12 md:col-span-5 order-2 md:row-span-2 flex items-center justify-center md:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.65, ease: [0.25, 1, 0.5, 1] as const }}
              className="w-full max-w-[500px] md:max-w-[680px] -mt-8 md:mt-0 -mb-7 md:mb-0 flex items-center justify-center relative overflow-hidden pointer-events-none"
              style={{ 
                aspectRatio: `1 / ${heroImageAspectRatio}`
              }}
            >
              {!heroError ? (
                <Image
                  src="/hero-image.png"
                  alt="Mesa Dines QR Order Scan"
                  fill
                  sizes="(max-width: 768px) 100vw, 680px"
                  className="object-contain"
                  onError={() => setHeroError(true)}
                  priority
                />
              ) : (
                // Premium fall-back vector art representing phone scanning QR code (transparent layout)
                <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-neutral-800">
                  <svg viewBox="0 56 200 98" className="w-full h-full text-neutral-800" fill="none">
                    <path d="M40 140l30-80h45l30 80H40z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" fill="none" />
                    <path d="M50 140l5-15h60l5 15" stroke="currentColor" strokeWidth="3.5" />
                    <rect x="65" y="80" width="50" height="40" rx="3" stroke="currentColor" strokeWidth="3" />
                    <path d="M72 87h12v12H72zm0 14h6v6h-6zm14 0h6v6h-6zM88 87h10v10H88zm0 14h6v6h-6z" fill="currentColor" />
                    <rect x="75" y="125" width="30" height="6" rx="2" fill="currentColor" opacity="0.1" />
                    
                    {/* Hand holding phone scanning */}
                    <g className="animate-pulse">
                      {/* Shadow scan line */}
                      <path d="M90 100l35-15" stroke="#25D366" strokeWidth="1.5" strokeDasharray="3 3" />
                      {/* Phone body */}
                      <rect x="110" y="60" width="50" height="90" rx="8" transform="rotate(10 135 105)" stroke="currentColor" strokeWidth="3.5" fill="#f7f7f7" />
                      {/* Phone Screen QR */}
                      <rect x="118" y="70" width="34" height="60" rx="3" transform="rotate(10 135 105)" stroke="currentColor" strokeWidth="2" />
                      <rect x="126" y="82" width="16" height="16" transform="rotate(10 135 105)" fill="#25D366" opacity="0.75" />
                      <circle cx="140" cy="142" r="3" fill="currentColor" />
                    </g>

                    {/* Scan beam */}
                    <path d="M90 90 L125 78" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="col-span-12 md:col-span-7 order-3 flex items-center justify-center md:justify-start w-full">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-row gap-3 w-full md:w-auto max-w-sm md:max-w-none justify-center md:justify-start mt-0 items-center mx-auto md:mx-0"
            >
              {/* Watch 2-minute demo */}
              <button className="w-1/2 md:w-[175px] relative flex items-center h-[54px] sm:h-[56px] rounded-2xl bg-neutral-950 text-white font-extrabold border border-neutral-950 shadow-clay-button hover:bg-neutral-900 transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] cursor-pointer origin-center">
                <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-white/10 md:bg-white/12 rounded-xl flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] fill-current text-white" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
                <span className="w-full text-center pl-8 md:pl-10 text-[13.5px] sm:text-[14.5px] md:text-[15px] tracking-wide whitespace-nowrap">Watch Demo</span>
              </button>

              {/* Book Call */}
              <button className="group w-1/2 md:w-[175px] relative flex items-center h-[54px] sm:h-[56px] rounded-2xl bg-white text-neutral-950 font-extrabold border border-[#e5e5e0] shadow-clay-card cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] origin-center">
                {/* Liquid Fill background element */}
                <div className="absolute inset-0 bg-[#25D366] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                
                {/* Icon Container */}
                <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-[#25D366] group-hover:bg-white rounded-xl flex items-center justify-center shadow-sm z-10 transition-colors duration-500">
                  <svg className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] fill-current text-white group-hover:text-[#25D366] transition-colors duration-500" viewBox="0 0 24 24">
                    <path d="M12.031 2C6.49 2 2 6.49 2 12.03c0 1.916.536 3.708 1.464 5.253L2 22l4.896-1.282c1.478.807 3.167 1.282 4.966 1.282C17.57 22 22 17.51 22 11.97 22 6.49 17.57 2 12.03 2zm4.335 13.916c-.226.634-1.3 1.238-1.808 1.32-.472.075-1.079.132-3.14-.726-2.632-1.094-4.302-3.793-4.434-3.969-.132-.176-1.079-1.433-1.079-2.736 0-1.302.68-1.943.925-2.207.245-.264.547-.33.725-.33.176 0 .356.006.509.013.162.006.384-.063.597.453.226.547.774 1.887.843 2.025.069.138.113.302.019.49-.094.188-.145.302-.289.471-.145.17-.308.384-.44.516-.151.15-.31.314-.132.616.176.302.78 1.283 1.673 2.075.918.818 1.692 1.076 1.993 1.226.302.151.478.126.66-.088.183-.214.774-.906.981-1.214.208-.308.415-.258.698-.151.283.107 1.792.843 2.1.993.308.15.515.226.59.358.076.132.076.761-.15 1.396z" />
                  </svg>
                </div>
                
                {/* Text Span */}
                <span className="relative z-10 w-full text-center pl-8 md:pl-10 text-[13.5px] sm:text-[14.5px] md:text-[15px] tracking-wide whitespace-nowrap text-neutral-950 group-hover:text-white transition-colors duration-500">Book Call</span>
              </button>
            </motion.div>
          </div>

        </div>
      </main>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl px-4 sm:px-6 py-20 flex flex-col items-center relative z-20">
        
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
                <div className={`feature-card-scroll w-full bg-white md:bg-transparent rounded-[28px] p-6 sm:p-8 md:p-8 border border-[#e5e5e0] md:border-transparent transition-all duration-700 ease-out flex flex-col items-start text-left md:items-center md:gap-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
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

                  {/* Content Below/Beside Image - animated on scroll */}
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

      {/* WHY CHOOSE MESA? SECTION WITH GSAP PINNING & HORIZONTAL SCROLL */}
      <div className="w-full block">
        <section 
          ref={horizontalSectionRef} 
          className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-transparent z-20"
        >
          <div className="h-full w-full flex flex-col justify-center py-12 md:py-16 overflow-hidden relative">
            
            {/* Static Title (Remains pinned at the top of the viewport) */}
            <div className="flex flex-col items-center text-center w-full px-6 flex-shrink-0 z-30 mb-8">
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
            <div className="w-full flex-grow flex items-center overflow-hidden z-20">
              <div 
                ref={horizontalTrackRef} 
                className="flex flex-row flex-nowrap gap-8 md:gap-16 px-[10vw] md:px-[25vw] min-w-max items-center relative"
              >
                {/* Dynamic SVG Animated Line underlaying the track */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
                  <svg className="w-full h-full overflow-visible" fill="none">
                    <path
                      ref={horizontalPathRef}
                      stroke="#111111"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                {/* GIANT CURVY INTRO TEXT (I MEAN, WHY NOT?) */}
                <div className="w-[1100px] sm:w-[1400px] md:w-[1750px] h-[350px] sm:h-[450px] md:h-[550px] flex-shrink-0 select-none pointer-events-none flex items-center justify-center">
                  <svg viewBox="0 0 1750 500" className="w-full h-full text-[#0a0a0a] fill-current">
                    <defs>
                      <path 
                        id="wavy-text-path" 
                        d="M 50,250 Q 450,30 875,250 T 1700,250" 
                      />
                    </defs>
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
                      <div className="flex flex-col text-left w-full z-20">
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

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-neutral-200/40 rounded-t-[24px] py-4 px-4 sm:px-6 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="max-w-md mx-auto w-full">
          <div ref={trackRef} className="w-full relative flex items-center h-[56px] rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 border border-neutral-800/40 p-[5px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden select-none">
            
            {/* Swipe Guidance Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <AnimatePresence mode="wait">
                <motion.span 
                  key="swipe-prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-300 font-extrabold text-[13.5px] sm:text-[14.5px] tracking-wide"
                >
                  Swipe to Buy @just ₹999
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Loop Chevron Indicator on Right */}
            {!swiped && (
              <div className="absolute right-[18px] top-0 bottom-0 flex items-center pointer-events-none z-10">
                <motion.div
                  animate={{ x: [0, 6, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="flex items-center text-white"
                >
                  <svg className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                  </svg>
                </motion.div>
              </div>
            )}

            {/* Draggable Handle */}
            <motion.div
              ref={handleRef}
              drag="x"
              dragConstraints={{ left: 0, right: dragWidth }}
              dragElastic={0.05}
              dragMomentum={false}
              animate={handleControls}
              onDragEnd={handleDragEnd}
              className="h-full aspect-square bg-[#2D3E24] rounded-xl flex items-center justify-center shadow-sm cursor-grab active:cursor-grabbing z-20"
              style={{ x: handleX }}
            >
              <svg className="w-[22px] h-[22px] fill-none stroke-current text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Expanding Liquid transition circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isTransitioning ? { scale: 1.8 } : { scale: 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[120vmax] h-[120vmax] bg-neutral-950 rounded-full z-50 pointer-events-none origin-center"
        style={{ y: "50%" }}
      />

      {/* In Development Fullscreen Screen */}
      <AnimatePresence>
        {showDevPage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-neutral-950 z-50 flex flex-col items-center justify-center text-white select-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-center flex flex-col items-center gap-5 px-6"
            >
              <h1 className="text-[32px] md:text-[54px] font-black tracking-wider uppercase text-white leading-none">
                In Development
              </h1>
              <p className="text-neutral-400 font-extrabold text-[12.5px] md:text-[15px] max-w-sm leading-relaxed tracking-wide">
                We are building a premium dining experience. Check back soon for the final launch.
              </p>
              {/* Back Button */}
              <button 
                onClick={handleBack}
                className="mt-8 px-8 py-4 rounded-2xl border border-white/20 text-[14.5px] font-extrabold text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] cursor-pointer origin-center shadow-lg"
              >
                Go Back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
