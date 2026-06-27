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
  const featureImageAspectRatio = 2 / 3; // Aspect ratio of features images (3:2 width:height)

  // HORIZONTAL SCROLL CONFIGURATION: Adjust this value to manually increase or decrease the horizontal scroll length.
  // Positive value (e.g., 200) scrolls further right; negative value (e.g., -200) stops scrolling earlier.
  const HORIZONTAL_SCROLL_OFFSET_ADJUST = -35;

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const [activeSlide, setActiveSlide] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactWhatsApp, setContactWhatsApp] = useState("");
  const [contactBusinessName, setContactBusinessName] = useState("");
  const [contactCity, setContactCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [contactImageError, setContactImageError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hideSwipeBar, setHideSwipeBar] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [problem1Error, setProblem1Error] = useState(false);
  const [problem2Error, setProblem2Error] = useState(false);
  const [problem3Error, setProblem3Error] = useState(false);
  const isMountedRef = useRef(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

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

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideSwipeBar(entry.isIntersecting);
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const pathRef = useRef<SVGPathElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const horizontalPathRef = useRef<SVGPathElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [featureErrors, setFeatureErrors] = useState([false, false, false, false]);

  const handleFeatureError = (index: number) => {
    setFeatureErrors((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const getCarouselOffset = (index: number) => {
    if (typeof window === "undefined") return 0;
    const width = window.innerWidth;
    const container = carouselRef.current;
    
    let cardWidth = 300;
    let gap = 16;
    let containerWidth = container ? container.clientWidth : (width - 32);

    if (width >= 768) {
      cardWidth = 440;
      gap = 32;
      if (!container) containerWidth = 760; // md:max-w-[760px]
    } else if (width >= 640) {
      cardWidth = 380;
      gap = 24;
      if (!container) containerWidth = 540; // sm:max-w-[540px]
    } else {
      if (!container) containerWidth = 340; // max-w-[340px]
    }
    
    // Center Card 0 by subtracting the container's 16px left-padding (px-4)
    const offset = (containerWidth / 2) - (cardWidth / 2) - (index * (cardWidth + gap)) - 16;
    return offset;
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
        
        // 1 wavy text + 4 cards = 5 elements -> 5 gaps + left padding + half of card width + half of viewport width + custom manual offset adjustment
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
          try {
            if (computeSamples()) {
              // Recalculate horizontal path d attribute and stroke properties on resize
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
            }
          } catch (e) {
            console.error("Error in resize handler:", e);
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
          
          // 1 wavy text + 4 cards = 5 elements -> 5 gaps + left padding + half of card width + half of viewport width + custom manual offset adjustment
          const totalTrackWidth = wavyWidth + (4 * cardWidth) + (5 * gap) + (padding / 2) + (cardWidth / 2) + (width / 2) + HORIZONTAL_SCROLL_OFFSET_ADJUST;
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

  const pricingFeatures = [
    { text: "QR Scan & Order System", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )},
    { text: "Custom Branding (Logo & Colors)", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M7.5 10.5C8.32843 10.5 9 9.82843 9 9C9 8.17157 8.32843 7.5 7.5 7.5C6.67157 7.5 6 8.17157 6 9C6 9.82843 6.67157 10.5 7.5 10.5Z" />
        <path d="M11.5 7.5C12.3284 7.5 13 6.82843 13 6C13 5.17157 12.3284 4.5 11.5 4.5C10.6716 4.5 10 5.17157 10 6C10 6.82843 10.6716 7.5 11.5 7.5Z" />
        <path d="M16.5 9.5C17.3284 9.5 18 8.82843 18 8C18 7.17157 17.3284 6.5 16.5 6.5C15.6716 6.5 15 7.17157 15 8C15 8.82843 15.6716 9.5 16.5 9.5Z" />
      </svg>
    )},
    { text: "Live Kitchen Order Dashboard", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h18" />
      </svg>
    )},
    { text: "Real-Time Order Alerts", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )},
    { text: "Integrated UPI Payments", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    )},
    { text: "AI Google Review Booster", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )},
    { text: "Instant Menu Management", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )},
    { text: "Unlimited Orders & Tables", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
      </svg>
    )}
  ];

  const premiumServices = [
    {
      title: "Google Review Booster",
      price: "199",
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
          text: "Blocks bad reviews by filtering complaints privately",
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0 mt-0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
      price: "499",
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
        <div className="hidden md:flex items-center gap-1 bg-[#ffffff]/80 backdrop-blur-md rounded-[15px] p-1.5 shadow-clay-logo border border-white/40 h-[58px]">
          {["Home", "How It Works", "Why Mesa", "Problems", "Pricing", "FAQ", "Contact"].map((item, idx) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative px-3.5 py-2 rounded-[12px] text-[13.5px] font-extrabold text-neutral-800 transition-colors duration-200 animate-none whitespace-nowrap"
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
          <a href="#pricing" className="hidden md:flex items-center justify-center gap-2 bg-neutral-950 text-white rounded-[15px] h-[58px] px-7 text-[15.5px] font-extrabold shadow-clay-button hover:bg-neutral-900 transition-all duration-200 active:scale-[0.97] cursor-pointer">
            <span>Buy now</span>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" fill="currentColor" />
              <circle cx="20" cy="21" r="1" fill="currentColor" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </a>

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
            <nav className="flex flex-col gap-4 text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {["Home", "How It Works", "Why Mesa", "Problems", "Pricing", "FAQ", "Contact"].map((item, idx) => (
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
      <main id="home" className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 pt-2 pb-12 md:pb-16 flex flex-col items-center flex-grow">
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
              {/* Buy Now */}
              <a href="#pricing" className="w-1/2 md:w-[175px] relative flex items-center h-[54px] sm:h-[56px] rounded-2xl bg-neutral-950 text-white font-extrabold border border-neutral-950 shadow-clay-button hover:bg-neutral-900 transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] cursor-pointer origin-center">
                <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-white/10 md:bg-white/12 rounded-xl flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] stroke-current fill-none text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" fill="currentColor" />
                    <circle cx="20" cy="21" r="1" fill="currentColor" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <span className="w-full text-center pl-8 md:pl-10 text-[13.5px] sm:text-[14.5px] md:text-[15px] tracking-wide whitespace-nowrap">Buy Now</span>
              </a>

              {/* See Pricing */}
              <a href="#pricing" className="group w-1/2 md:w-[175px] relative flex items-center h-[54px] sm:h-[56px] rounded-2xl bg-white text-neutral-950 font-extrabold border border-[#e5e5e0] shadow-clay-card cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] origin-center">
                {/* Liquid Fill background element */}
                <div className="absolute inset-0 bg-[#2D3E24] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                
                {/* Icon Container */}
                <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-[#2D3E24] group-hover:bg-white rounded-xl flex items-center justify-center shadow-sm z-10 transition-colors duration-500">
                  <svg className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] fill-none stroke-current text-white group-hover:text-[#2D3E24] transition-colors duration-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </div>
                
                {/* Text Span */}
                <span className="relative z-10 w-full text-center pl-8 md:pl-10 text-[13.5px] sm:text-[14.5px] md:text-[15px] tracking-wide whitespace-nowrap text-neutral-950 group-hover:text-white transition-colors duration-500">See Pricing</span>
              </a>
            </motion.div>
          </div>

        </div>
      </main>

      {/* HOW IT WORKS SECTION */}
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
      <div id="why-mesa" className="w-full block">
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
                {/* GIANT CURVY INTRO TEXT WITH INTEGRATED ANIMATED LINE */}
                <div className="w-[1100px] sm:w-[1400px] md:w-[1750px] h-[350px] sm:h-[450px] md:h-[550px] flex-shrink-0 select-none pointer-events-none flex items-center justify-center overflow-visible">
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
      {/* PROBLEMS MESA DINES SOLVES SECTION */}
      <section id="problems" className="w-full max-w-5xl md:max-w-6xl px-4 sm:px-6 py-20 flex flex-col items-center relative z-20 border-t border-neutral-100">
        <div className="flex flex-col items-center text-center w-full max-w-2xl mb-16">
          <span className="text-neutral-400 font-black text-xs uppercase tracking-widest mb-2">
            The Friction Points
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-black tracking-tight text-neutral-950 leading-tight">
            Problems Mesa Dines Solves
          </h2>
        </div>

        <div className="w-full flex flex-col gap-12 md:gap-16">
          
          {/* Problem 1 */}
          <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative w-full aspect-[3/2] max-w-[420px] md:max-w-none rounded-2xl overflow-hidden">
                {!problem1Error ? (
                  <Image
                    src="/problem1.png"
                    alt="The Quiet Revenue Leak"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                    onError={() => setProblem1Error(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-950/[0.01] border border-neutral-200/50 rounded-2xl">
                    <svg className="w-16 h-16 text-neutral-300 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="12" x2="16" y2="14" />
                    </svg>
                    <span className="text-neutral-400 font-black text-[11px] uppercase tracking-wider mt-4">
                      problem1.png placeholder
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center font-black text-sm select-none">
                  01
                </div>
                <span className="text-[#D13B3B] font-black text-sm uppercase tracking-wider">
                  The Quiet Revenue Leak
                </span>
              </div>
              <h3 className="text-2xl sm:text-[30px] font-black tracking-tight text-neutral-950 leading-tight">
                They wanted to order more. But the waiter wasn't there.
              </h3>
              
              {/* Connected Dots & Line */}
              <div className="relative flex flex-col gap-6 pl-6 w-full mt-2">
                
                <div className="relative">
                  {/* Line connecting to the next dot */}
                  <div className="absolute -left-[20px] top-[11px] h-[calc(100%+24px)] w-[2px] bg-neutral-950" />
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    Group tables are your highest-value covers — and your most mismanaged.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Line connecting to the next dot */}
                  <div className="absolute -left-[20px] top-[11px] h-[calc(100%+24px)] w-[2px] bg-neutral-950" />
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    Someone forgets an item. Someone isn't sure. Someone doesn't want to raise their hand.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Last point: no connecting line */}
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    The waiter's busy. The moment passes. The order never happens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Divider */}
          <div className="w-full h-[1px] bg-neutral-200/50 my-4 md:my-8" />

          {/* Problem 2 */}
          <div className="w-full flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative w-full aspect-[3/2] max-w-[420px] md:max-w-none rounded-2xl overflow-hidden">
                {!problem2Error ? (
                  <Image
                    src="/problem2.png"
                    alt="Protect the Experience Before It Breaks"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                    onError={() => setProblem2Error(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-950/[0.01] border border-neutral-200/50 rounded-2xl">
                    <svg className="w-16 h-16 text-neutral-300 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M2 20h20M12 4a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8zM12 2v2" />
                      <path d="m9 16 6-6M15 16 9 10" />
                    </svg>
                    <span className="text-neutral-400 font-black text-[11px] uppercase tracking-wider mt-4">
                      problem2.png placeholder
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center font-black text-sm select-none">
                  02
                </div>
                <span className="text-[#D13B3B] font-black text-sm uppercase tracking-wider">
                  Protect the Experience Before It Breaks
                </span>
              </div>
              <h3 className="text-2xl sm:text-[30px] font-black tracking-tight text-neutral-950 leading-tight">
                That 'sorry, we don't have it' moment? It costs more than the dish.
              </h3>
              
              {/* Connected Dots & Line */}
              <div className="relative flex flex-col gap-6 pl-6 w-full mt-2">
                
                <div className="relative">
                  {/* Line connecting to the next dot */}
                  <div className="absolute -left-[20px] top-[11px] h-[calc(100%+24px)] w-[2px] bg-neutral-950" />
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    A guest reads the menu, builds anticipation, decides what they want — and then you tell them it's not available.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Line connecting to the next dot */}
                  <div className="absolute -left-[20px] top-[11px] h-[calc(100%+24px)] w-[2px] bg-neutral-950" />
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    That's not just a missed sale. That's a crack in trust.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Last point: no connecting line */}
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    Mesa Dines lets you hide sold-out items instantly — from any device, in seconds. Guests only ever see what they can actually have.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Divider */}
          <div className="w-full h-[1px] bg-neutral-200/50 my-4 md:my-8" />

          {/* Problem 3 */}
          <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative w-full aspect-[3/2] max-w-[420px] md:max-w-none rounded-2xl overflow-hidden">
                {!problem3Error ? (
                  <Image
                    src="/problem3.png"
                    alt="Reclaim Your Staff's Best Hours"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                    onError={() => setProblem3Error(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-950/[0.01] border border-neutral-200/50 rounded-2xl">
                    <svg className="w-16 h-16 text-neutral-300 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                    <span className="text-neutral-400 font-black text-[11px] uppercase tracking-wider mt-4">
                      problem3.png placeholder
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center font-black text-sm select-none">
                  03
                </div>
                <span className="text-[#D13B3B] font-black text-sm uppercase tracking-wider">
                  Your best staff shouldn't be human printers
                </span>
              </div>
              <h3 className="text-2xl sm:text-[30px] font-black tracking-tight text-neutral-950 leading-tight">
                Reclaim Your Staff's Best Hours
              </h3>
              
              {/* Connected Dots & Line */}
              <div className="relative flex flex-col gap-6 pl-6 w-full mt-2">
                
                <div className="relative">
                  {/* Line connecting to the next dot */}
                  <div className="absolute -left-[20px] top-[11px] h-[calc(100%+24px)] w-[2px] bg-neutral-950" />
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    Taking orders is the most repetitive, lowest-value thing your team does.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Line connecting to the next dot */}
                  <div className="absolute -left-[20px] top-[11px] h-[calc(100%+24px)] w-[2px] bg-neutral-950" />
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    Every minute spent scribbling is a minute not spent making a guest feel remembered.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Last point: no connecting line */}
                  <div className="absolute -left-[25px] top-[5px] w-[12px] h-[12px] rounded-full bg-neutral-950 border-2 border-white ring-1 ring-neutral-950 z-10" />
                  <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[14.5px] leading-relaxed">
                    Mesa Dines handles the orders. Your staff handles the experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section id="pricing" className="w-full py-20 bg-transparent flex flex-col items-center justify-center px-6 relative overflow-hidden z-20 border-t border-neutral-100">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center w-full max-w-xl mb-12">
          <span className="text-neutral-400 font-black text-xs uppercase tracking-widest mb-1.5">
            Plans & Add-ons
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[46px] font-black tracking-tight text-neutral-950 leading-tight relative overflow-visible inline-block">
            <span className="relative inline-block">
              Simple, Flat Pricing
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
          <p className="text-neutral-500 font-extrabold text-[12.5px] sm:text-[14px] leading-[1.4] mt-5 tracking-wide">
            Choose the plan that fits your growth. No hidden charges, cancel anytime.
          </p>

          {/* Toggle Switch */}
          <div className="flex bg-neutral-900/5 p-1 rounded-full w-fit mt-8 border border-neutral-950/10">
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${billingCycle === "monthly" ? "bg-neutral-950 text-white shadow-md" : "text-neutral-500 hover:text-neutral-950"}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${billingCycle === "yearly" ? "bg-neutral-950 text-white shadow-md" : "text-neutral-500 hover:text-neutral-950"}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Layout Container */}
        <div className="w-full max-w-5xl flex flex-col gap-12 items-center">
          
          {/* MAIN PRICING CARD */}
          <div 
            className="w-full max-w-4xl border-2 border-neutral-900 rounded-[36px] p-8 md:p-12 flex flex-col gap-8 md:gap-10 bg-transparent"
          >
            {/* Top Row: Info & Features */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start w-full">
              
              {/* Left Column: Pricing Info */}
              <div className="flex flex-col justify-start w-full md:w-[42%] text-left">
                <h4 className="text-neutral-400 text-[11px] font-black uppercase tracking-widest mb-1.5">
                  Standard Plan
                </h4>
                <div className="flex items-baseline mb-3">
                  <span className="text-[44px] md:text-[54px] font-black text-neutral-950 leading-none">
                    ₹{billingCycle === "monthly" ? "999" : "6499"}
                  </span>
                  <span className="text-neutral-500 text-sm font-extrabold ml-2.5 tracking-wide">
                    / {billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {billingCycle === "yearly" && (
                  <div className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md w-fit mb-5">
                    Save ₹5,489 yearly! (≈ ₹541/mo)
                  </div>
                )}
                <p className="text-neutral-500 font-extrabold text-[13px] leading-relaxed">
                  Everything you need to digitalize your café or restaurant. Simple flat fee. No setup costs.
                </p>
              </div>

              {/* Right Column: Features List */}
              <div className="w-full md:w-[58%] border-t md:border-t-0 md:border-l border-neutral-950/10 pt-8 md:pt-0 md:pl-10 flex flex-col justify-start">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-neutral-900 mb-5">
                  Included Features
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pr-2">
                  {pricingFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-neutral-950/5 flex items-center justify-center text-neutral-950 flex-shrink-0">
                        {feat.icon}
                      </div>
                      <span className="text-[12px] font-extrabold text-neutral-600 tracking-wide">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Row: CTA Button (Spans full width at the bottom of the card) */}
            <div className="w-full pt-4 border-t border-neutral-950/5">
              <button className="w-full flex items-center justify-between bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs tracking-wider uppercase px-8 py-5 rounded-2xl transition-all duration-300 group shadow-lg shadow-black/10">
                <span>OnBoard Now</span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </button>
            </div>

          </div>

          {/* OTHER PREMIUM SERVICES (CAROUSEL SLIDESHOW) */}
          <div className="w-full max-w-4xl mt-12 flex flex-col items-center">
            
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-10">
              <span className="text-neutral-400 font-black text-xs uppercase tracking-widest mb-1.5">
                Premium Upgrades
              </span>
              <h3 className="text-neutral-950 font-black text-2xl md:text-3xl tracking-tight leading-none">
                Other Premium Services
              </h3>
            </div>

            {/* Carousel Container */}
            <div ref={carouselRef} className="relative w-full max-w-[340px] sm:max-w-[540px] md:max-w-[760px] overflow-hidden mx-auto px-4 py-4">
              
              {/* Carousel Window */}
              <div className="w-full relative min-h-[465px] flex items-center justify-start bg-transparent overflow-visible">
                <motion.div 
                  drag="x"
                  dragConstraints={{ 
                    left: getCarouselOffset(2), 
                    right: getCarouselOffset(0) 
                  }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    const threshold = 55;
                    if (info.offset.x < -threshold) {
                      setActiveSlide((prev) => Math.min(prev + 1, 2));
                    } else if (info.offset.x > threshold) {
                      setActiveSlide((prev) => Math.max(prev - 1, 0));
                    }
                  }}
                  animate={{ x: getCarouselOffset(activeSlide) }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  className="flex flex-row flex-nowrap items-stretch gap-4 sm:gap-6 md:gap-8 w-max cursor-grab active:cursor-grabbing overflow-visible select-none"
                >
                  {premiumServices.map((service, idx) => (
                    <div 
                      key={idx} 
                      className="w-[300px] sm:w-[380px] md:w-[440px] flex-shrink-0 flex justify-center overflow-visible"
                    >
                      <div className="w-full flex flex-col justify-between items-stretch min-h-[365px] text-left border border-neutral-950/15 rounded-[32px] p-5 md:p-7 bg-white shadow-xl shadow-black/5 relative overflow-hidden transition-all duration-300">
                        
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
                        <button className="w-full flex items-center justify-center bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-2xl transition-all duration-300 group shadow-md shadow-black/10">
                          <span>Buy Now</span>
                        </button>

                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-neutral-950 w-6" : "bg-neutral-300/80 hover:bg-neutral-400"}`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
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

      {/* CONTACT US SECTION */}
      <section id="contact" className="w-full max-w-5xl md:max-w-6xl px-4 sm:px-6 py-20 flex flex-col items-center relative z-20 border-t border-neutral-100">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column (renders on top on mobile / left on desktop): Dynamic Call booking Image */}
          <div className="col-span-12 md:col-span-6 flex items-center justify-center w-full">
            <div 
              className="relative w-full rounded-[24px] overflow-hidden border border-white/60 bg-white/20 backdrop-blur-sm shadow-clay-card flex flex-col items-center justify-center text-center p-6 animate-none"
              style={{
                aspectRatio: "16 / 9"
              }}
            >
              {!contactImageError ? (
                <Image
                  src="/contact-image.png"
                  alt="Contact Mesa Dines Experts"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover rounded-[22px]"
                  onError={() => setContactImageError(true)}
                />
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
          <div className="col-span-12 md:col-span-6 flex flex-col items-start text-left w-full">
            <span className="text-[#2D3E24] font-black text-xs uppercase tracking-widest mb-2">
              Make your business premium now
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-black tracking-tight text-neutral-950 mb-6 leading-tight">
              Schedule a Call with the Experts
            </h2>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center text-center py-10 px-4 bg-neutral-950/5 rounded-2xl border border-neutral-950/10"
              >
                <div className="w-12 h-12 bg-[#2D3E24] text-white rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-sm">
                  ✓
                </div>
                <h3 className="text-lg font-black text-neutral-950 mb-2">Request Received!</h3>
                <p className="text-neutral-500 font-extrabold text-xs max-w-xs leading-relaxed">
                  Thanks {contactName} from {contactBusinessName} ({contactCity}). We'll call you on WhatsApp at +91 {contactWhatsApp} shortly.
                </p>
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
                  className="mt-6 text-xs font-black text-[#2D3E24] underline hover:text-neutral-900 cursor-pointer"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (contactName && contactWhatsApp && contactBusinessName && contactCity) {
                    setFormSubmitted(true);
                  }
                }}
                className="w-full flex flex-col gap-5"
              >
                {/* Name Input */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="contact-name" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase">
                    Your Name
                  </label>
                  <div className="relative flex items-center w-full">
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
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="contact-whatsapp" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase">
                    WhatsApp Number
                  </label>
                  <div className="relative flex items-center w-full">
                    {/* Rounded black div with WhatsApp logo */}
                    <div className="absolute left-[6px] top-[6px] bottom-[6px] w-[40px] bg-neutral-950 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-[18px] h-[18px] fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12.031 2C6.49 2 2 6.49 2 12.03c0 1.916.536 3.708 1.464 5.253L2 22l4.896-1.282c1.478.807 3.167 1.282 4.966 1.282C17.57 22 22 17.51 22 11.97 22 6.49 17.57 2 12.03 2zm4.335 13.916c-.226.634-1.3 1.238-1.808 1.32-.472.075-1.079.132-3.14-.726-2.632-1.094-4.302-3.793-4.434-3.969-.132-.176-1.079-1.433-1.079-2.736 0-1.302.68-1.943.925-2.207.245-.264.547-.33.725-.33.176 0 .356.006.509.013.162.006.384-.063.597.453.226.547.774 1.887.843 2.025.069.138.113.302.019.49-.094.188-.145.302-.289.471-.145.17-.308.384-.44.516-.151.15-.31.314-.132.616.176.302.78 1.283 1.673 2.075.918.818 1.692 1.076 1.993 1.226.302.151.478.126.66-.088.183-.214.774-.906.981-1.214.208-.308.415-.258.698-.151.283.107 1.792.843 2.1.993.308.15.515.226.59.358.076.132.076.761-.15 1.396z" />
                      </svg>
                    </div>
                    <span className="absolute left-[56px] text-sm font-extrabold text-neutral-400 select-none">
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

                {/* Business Name Input */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="contact-business" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase">
                    Business Name
                  </label>
                  <div className="relative flex items-center w-full">
                    {/* Rounded black div with briefcase icon */}
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
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="contact-city" className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase">
                    City
                  </label>
                  <div className="relative flex items-center w-full">
                    {/* Rounded black div with location pin icon */}
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

                {/* Suggestions / Interests */}
                <div className="flex flex-col gap-2.5 w-full mt-1">
                  <span className="text-neutral-500 font-extrabold text-xs tracking-wide uppercase">
                    I am interested in...
                  </span>
                  <div className="flex flex-wrap gap-2 w-full">
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
                          className={`px-3.5 py-2.5 rounded-xl border text-[11.5px] sm:text-xs font-black cursor-pointer transition-all duration-200 hover:scale-[0.97] active:scale-[0.94] ${
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

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!contactName || !contactWhatsApp || !contactBusinessName || !contactCity}
                  className="w-full flex items-center justify-center h-[54px] rounded-2xl bg-[#2D3E24] hover:bg-[#202D1A] text-white font-extrabold text-[14px] tracking-wide mt-2 shadow-clay-button transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none hover:scale-[0.98] active:scale-[0.95] cursor-pointer"
                >
                  Schedule Call
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="w-full bg-neutral-950 text-neutral-400 py-12 px-4 md:px-8 border-t border-neutral-800/60 mt-10 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col items-start text-left gap-4 pb-8 border-b border-neutral-800/50">
          
          {/* Logo */}
          <div className="bg-white rounded-xl py-1.5 px-3 flex items-center justify-center h-[42px] overflow-hidden select-none">
            <Image
              src="/logo.png"
              alt="Mesa Dines Logo"
              width={120}
              height={30}
              className="object-contain h-[28px] w-auto"
            />
          </div>

          {/* Description Para */}
          <p className="text-neutral-400 text-xs sm:text-[13px] font-extrabold leading-relaxed max-w-lg">
            Empowering dining brands and premium restaurants with smart QR ordering, automated AI review boosters, and unified restaurant automation solutions.
          </p>
        </div>

        {/* Bottom bar: Legal Links & Copyright */}
        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-extrabold text-neutral-500">
          <span>
            © 2026 Mesa Dines. All rights reserved.
          </span>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-neutral-500">
            <a href="#" onClick={() => setShowDevPage(true)} className="hover:text-white transition-all cursor-pointer">Privacy Policy</a>
            <a href="#" onClick={() => setShowDevPage(true)} className="hover:text-white transition-all cursor-pointer">Terms of Service</a>
            <a href="#" onClick={() => setShowDevPage(true)} className="hover:text-white transition-all cursor-pointer">Refund Policy</a>
          </div>
        </div>
      </footer>

      <motion.div
        initial={{ y: "100%" }}
        animate={hideSwipeBar ? { y: "100%" } : { y: 0 }}
        transition={{
          delay: hideSwipeBar ? 0 : (isMountedRef.current ? 0.1 : 1.3),
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as const
        }}
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
                  Swipe to Schedule a Call
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
