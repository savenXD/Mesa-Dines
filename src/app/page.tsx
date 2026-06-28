"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import WhyMesa from "../components/WhyMesa";
import { UpgradesSlider, FAQAccordion } from "../components/DynamicComponents";
import ContactForm from "../components/ContactForm";


export default function Home() {
  // UNIVERSAL IMAGE CONFIGURATION: Change these to style the hero image and its spacing project-wide
  const heroImageSize = 860; // Maximum width in pixels to fit in one frame on desktop
  const heroImageAspectRatio = 0.92; // Height ratio relative to width (e.g. 0.62)
  const heroImageMarginTop = "0px"; // Top margin for the hero image
  const heroImageMarginBottom = "0px"; // Bottom margin for the hero image

  // FEATURE IMAGES CONFIGURATION (How It Works section)
  const featureImageSize = 480; // Maximum width in pixels for the process images on desktop
  const featureImageAspectRatio = 2 / 3; // Aspect ratio of features images (3:2 width:height)

  // HORIZONTAL SCROLL CONFIGURATION: Adjust this value to manually increase or decrease the horizontal scroll length.
  // Positive value (e.g., 200) scrolls further right; negative value (e.g., -200) stops scrolling earlier.
  const HORIZONTAL_SCROLL_OFFSET_ADJUST = -35;

  // CONTACT SECTION CONFIGURATION: Change this value to adjust the width percentage of inputs, buttons, and image card on all screens
  const contactElementWidthPercent = "94%"; // Default is "85%". E.g. "70%", "80%", "90%", etc.

  // FOR SCREENS < 361px: Forceful horizontal shift offset (e.g. "-10px", "5px", "0px") to shift the container left or right to visually center it
  const contactSmallScreenShiftX = "-10px"; // E.g., "-15px" to shift left, "10px" to shift right

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 361);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      
      // Smoothly scroll to the contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      
      // Reset the slider position back to 0
      setTimeout(() => {
        setSwiped(false);
        handleX.set(0);
        handleControls.start({ x: 0, transition: { duration: 0.3 } });
      }, 800);
    } else {
      handleControls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 28 } });
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
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

      <Navbar handleBuyNowClick={handleBuyNowClick} />

      {/* HERO SECTION */}
      <main id="home" className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 pt-2 pb-12 md:pb-16 flex flex-col items-center flex-grow">
        <div className="flex flex-col md:flex-row w-full gap-y-6 md:gap-x-10 lg:gap-x-14 items-center justify-center mt-6 md:mt-10 md:-translate-y-[25px]">
          
          {/* Text Column: Heading, Subheading & CTA Buttons */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0">
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

            {/* CTA Buttons — desktop only (mobile version is below the image) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
              className="hidden md:flex flex-row gap-3 w-full md:w-auto max-w-sm md:max-w-none justify-center md:justify-start mt-6 md:mt-8 items-center mx-auto md:mx-0"
            >
              {/* Buy Now */}
              <a href="#contact" onClick={handleBuyNowClick} className="w-1/2 md:w-[175px] relative flex items-center h-[54px] sm:h-[56px] rounded-2xl bg-neutral-950 text-white font-extrabold border border-neutral-950 shadow-clay-button hover:bg-neutral-900 transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] cursor-pointer origin-center">
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

          {/* Hero Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.65, ease: [0.25, 1, 0.5, 1] as const }}
              className="w-full flex items-center justify-center relative"
              style={{
                aspectRatio: `1 / ${heroImageAspectRatio}`
              }}
            >
              {!heroError ? (
                <Image
                  src="/hero-image.png"
                  alt="Mesa Dines QR Order Scan"
                  fill
                  sizes="(max-width: 768px) 100vw, 860px"
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

              {/* Floating Badge — TOP RIGHT: Reliable */}
              <div
                className="flex absolute top-[12%] right-[8%] sm:right-[10%] md:right-[14%] items-center gap-1.5 md:gap-2.5 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl px-2.5 py-1.5 md:px-4 md:py-3 pointer-events-none select-none"
                style={{ animation: "heroFloat1 5s ease-in-out infinite", zIndex: 10 }}
              >
                <div className="w-6 h-6 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-neutral-950 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 md:w-[18px] md:h-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-950 font-black text-[10px] md:text-[13px] leading-tight">Reliable</span>
                  <span className="text-neutral-400 font-semibold text-[8px] md:text-[10.5px] leading-tight hidden sm:block">Always on, always working</span>
                </div>
              </div>

              {/* Floating Badge — BOTTOM LEFT: Premium */}
              <div
                className="flex absolute bottom-[12%] left-[8%] sm:left-[10%] md:left-[14%] items-center gap-1.5 md:gap-2.5 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl px-2.5 py-1.5 md:px-4 md:py-3 pointer-events-none select-none"
                style={{ animation: "heroFloat2 5.5s ease-in-out infinite", zIndex: 10 }}
              >
                <div className="w-6 h-6 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-neutral-950 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 md:w-[18px] md:h-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-950 font-black text-[10px] md:text-[13px] leading-tight">Premium</span>
                  <span className="text-neutral-400 font-semibold text-[8px] md:text-[10.5px] leading-tight hidden sm:block">5-star tech, honest price</span>
                </div>
              </div>

            </motion.div>
          </div>
          {/* CTA Buttons — mobile only, shown below the image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
            className="md:hidden flex flex-row gap-3 w-full max-w-sm justify-center items-center mx-auto"
          >
            {/* Buy Now */}
            <a href="#contact" onClick={handleBuyNowClick} className="w-1/2 relative flex items-center h-[54px] rounded-2xl bg-neutral-950 text-white font-extrabold border border-neutral-950 shadow-clay-button hover:bg-neutral-900 transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] cursor-pointer origin-center">
              <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-white/10 rounded-xl flex items-center justify-center">
                <svg className="w-[18px] h-[18px] stroke-current fill-none text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" fill="currentColor" />
                  <circle cx="20" cy="21" r="1" fill="currentColor" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <span className="w-full text-center pl-8 text-[13.5px] tracking-wide whitespace-nowrap">Buy Now</span>
            </a>
            {/* See Pricing */}
            <a href="#pricing" className="group w-1/2 relative flex items-center h-[54px] rounded-2xl bg-white text-neutral-950 font-extrabold border border-[#e5e5e0] shadow-clay-card cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] origin-center">
              <div className="absolute inset-0 bg-[#2D3E24] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-[#2D3E24] group-hover:bg-white rounded-xl flex items-center justify-center shadow-sm z-10 transition-colors duration-500">
                <svg className="w-[18px] h-[18px] fill-none stroke-current text-white group-hover:text-[#2D3E24] transition-colors duration-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <span className="relative z-10 w-full text-center pl-8 text-[13.5px] tracking-wide whitespace-nowrap text-neutral-950 group-hover:text-white transition-colors duration-500">See Pricing</span>
            </a>
          </motion.div>

        </div>
      </main>

      <HowItWorks />

      <WhyMesa />
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
              <button onClick={handleBuyNowClick} className="w-full flex items-center justify-between bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs tracking-wider uppercase px-8 py-5 rounded-2xl transition-all duration-300 group shadow-lg shadow-black/10 cursor-pointer">
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

          <UpgradesSlider handleBuyNowClick={handleBuyNowClick} />

        </div>
      </section>

      <FAQAccordion />

      <ContactForm onVisibilityChange={(isVisible) => setHideSwipeBar(isVisible)} />

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
            <Link href="/blog" className="text-white hover:text-neutral-300 transition-all cursor-pointer">Blog</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-all cursor-pointer">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-all cursor-pointer">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white transition-all cursor-pointer">Refund Policy</Link>
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
