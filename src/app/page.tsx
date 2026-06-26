"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  // UNIVERSAL IMAGE CONFIGURATION: Change these to style the hero image and its spacing project-wide
  const heroImageSize = 500; // Maximum width in pixels
  const heroImageAspectRatio = 0.92; // Height ratio relative to width (e.g. 0.62)
  const heroImageMarginTop = "-32px"; // Negative margin to pull the image closer to the subheading (removes empty space in image asset)
  const heroImageMarginBottom = "-28px"; // Negative margin to pull the buttons closer to the image

  // FEATURE IMAGES CONFIGURATION (How It Works section)
  const featureImageSize = 340; // Maximum width in pixels for the process images
  const featureImageAspectRatio = 0.75; // Aspect ratio of features images (height / width)

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [heroError, setHeroError] = useState(false);

  const pathRef = useRef<SVGPathElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [featureErrors, setFeatureErrors] = useState([false, false, false, false]);

  const handleFeatureError = (index: number) => {
    setFeatureErrors((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
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
      )
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

    const path = pathRef.current;
    const container = featuresRef.current;
    if (path && container) {
      const samples: { screenY: number; screenDist: number }[] = [];
      let totalScreenLength = 0;

      const getScreenDistAtY = (targetY: number) => {
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
        const t = (targetY - s0.screenY) / (s1.screenY - s0.screenY);
        return s0.screenDist + t * (s1.screenDist - s0.screenDist);
      };

      const computeSamples = () => {
        const localLength = path.getTotalLength();
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        if (containerWidth === 0 || containerHeight === 0 || localLength === 0) return false;

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
            const p = obj.progress;
            const containerHeight = container.offsetHeight;
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

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center select-none">
      
      {/* Mesh Grid Background */}
      <div className="absolute inset-0 grid-mesh pointer-events-none -z-10" />

      {/* NAVIGATION BAR */}
      <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between z-40 relative">
        {/* Left Side: Claymorphic Logo Container */}
        <div className="bg-white rounded-[14px] py-1.5 px-3.5 shadow-clay-logo flex items-center justify-center min-h-[38px] min-w-[105px]">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Mesa Dines Logo"
              width={85}
              height={25}
              className="object-contain"
              onError={() => setLogoError(true)}
              priority
            />
          ) : (
            // Premium Vector Fallback Logo
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 100 100" className="text-[#2D3E24] fill-current">
                <circle cx="50" cy="40" r="30" stroke="#2D3E24" strokeWidth="8" fill="none" />
                <line x1="10" y1="75" x2="90" y2="75" stroke="#2D3E24" strokeWidth="8" strokeLinecap="round" />
                <path d="M50 75v15" stroke="#2D3E24" strokeWidth="8" strokeLinecap="round" />
                <path d="M40 30v15M60 30v15" stroke="#2D3E24" strokeWidth="6" strokeLinecap="round" />
              </svg>
              <span className="font-extrabold text-[15px] tracking-wider text-[#2D3E24] uppercase">
                Mesa Dines
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="p-3 focus:outline-none flex items-center justify-center cursor-pointer relative z-50 rounded-full hover:bg-black/[0.03] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current text-neutral-900">
            <motion.path
              animate={menuOpen ? { d: "M18 6L6 18" } : { d: "M4 7h16" }}
              transition={{ duration: 0.3 }}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.path
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              d="M4 12h16"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <motion.path
              animate={menuOpen ? { d: "M6 6l12 12" } : { d: "M4 17h16" }}
              transition={{ duration: 0.3 }}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
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
      <main className="w-full max-w-3xl px-6 pt-2 pb-32 flex flex-col items-center text-center flex-grow">
        
        <div className="flex flex-col items-center w-full">
          {/* Animated Heading */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center w-full mt-6"
          >
            {/* Line 1 */}
            <h1 className="text-[36px] sm:text-[46px] md:text-[52px] font-black tracking-tight text-neutral-950 leading-[1.12] w-full text-center">
              <span className="flex flex-wrap justify-center gap-x-2">
                {headingWords
                  .filter((w) => w.line === 1)
                  .map((w, idx) => (
                    <span key={idx} className="overflow-hidden inline-block">
                      <motion.span variants={wordVariants} className="inline-block origin-bottom">
                        {w.text}
                      </motion.span>
                    </span>
                  ))}
              </span>

              {/* Line 2 */}
              <span className="flex flex-wrap justify-center gap-x-2 mt-0.5 sm:mt-1">
                {headingWords
                  .filter((w) => w.line === 2)
                  .map((w, idx) => (
                    <span key={idx} className="relative overflow-visible inline-block mr-2">
                      <span className="overflow-hidden inline-block">
                        <motion.span variants={wordVariants} className="inline-block origin-bottom">
                          {w.text}
                        </motion.span>
                      </span>
                      {w.underline && (
                        <span className="absolute left-0 -bottom-1.5 w-full pointer-events-none">
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
                  ))}
              </span>
            </h1>
          </motion.div>

          {/* Subheading text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-neutral-500 font-extrabold text-[11.5px] sm:text-[13.5px] leading-[1.35] mt-3 max-w-xs sm:max-w-md tracking-wide text-center mx-auto"
          >
            Empower your food business with 5-star restaurant technology. Delight diners, automate tasks, and scale margins effortlessly.
          </motion.p>
        </div>

        {/* Hero Image - direct on background, adjustable sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65, ease: [0.25, 1, 0.5, 1] as const }}
          className="flex items-center justify-center relative overflow-hidden pointer-events-none w-full max-w-full"
          style={{ 
            width: "100%",
            maxWidth: `${heroImageSize}px`,
            aspectRatio: `1 / ${heroImageAspectRatio}`,
            marginTop: heroImageMarginTop,
            marginBottom: heroImageMarginBottom
          }}
        >
          {!heroError ? (
            <Image
              src="/hero-image.png"
              alt="Mesa Dines QR Order Scan"
              fill
              sizes={`(max-width: ${heroImageSize}px) 100vw, ${heroImageSize}px`}
              className="object-contain"
              onError={() => setHeroError(true)}
              priority
            />
          ) : (
            // Premium fall-back vector art representing phone scanning QR code (transparent layout)
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-neutral-800">
              <svg viewBox="0 56 200 98" className="w-full h-full text-neutral-800" fill="none">
                {/* Stand Table Display */}
                <path d="M40 140l30-80h45l30 80H40z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" fill="none" />
                <path d="M50 140l5-15h60l5 15" stroke="currentColor" strokeWidth="3.5" />
                {/* QR code container in stand */}
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
                  {/* Home button */}
                  <circle cx="140" cy="142" r="3" fill="currentColor" />
                </g>

                {/* Scan beam */}
                <path d="M90 90 L125 78" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </motion.div>

        {/* CTA BUTTONS SECTION - Loaded automatically on entry, pushed up */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
          className="flex flex-row gap-3 w-full justify-center mt-0.5"
        >
          {/* Watch 2-minute demo */}
          <button className="flex-grow flex-1 relative flex items-center h-[52px] rounded-2xl bg-neutral-950 text-white font-extrabold border border-neutral-950 shadow-clay-button hover:bg-neutral-900 transition-all duration-200 cursor-pointer active:scale-[0.98]">
            <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-white/12 rounded-xl flex items-center justify-center">
              <svg className="w-[21px] h-[21px] fill-current text-white" viewBox="0 0 24 24">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </div>
            <span className="w-full text-center pl-10 text-[13px] sm:text-[14px] tracking-wide whitespace-nowrap">Watch Demo</span>
          </button>

          {/* Book a Call */}
          <button className="flex-grow flex-1 relative flex items-center h-[52px] rounded-2xl bg-transparent text-neutral-950 font-extrabold border border-neutral-950 hover:bg-black/[0.02] transition-all duration-200 cursor-pointer active:scale-[0.98]">
            <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-[#25D366] rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-[21px] h-[21px] fill-current text-white" viewBox="0 0 24 24">
                <path d="M12.031 2C6.49 2 2 6.49 2 12.03c0 1.916.536 3.708 1.464 5.253L2 22l4.896-1.282c1.478.807 3.167 1.282 4.966 1.282C17.57 22 22 17.51 22 11.97 22 6.49 17.57 2 12.03 2zm4.335 13.916c-.226.634-1.3 1.238-1.808 1.32-.472.075-1.079.132-3.14-.726-2.632-1.094-4.302-3.793-4.434-3.969-.132-.176-1.079-1.433-1.079-2.736 0-1.302.68-1.943.925-2.207.245-.264.547-.33.725-.33.176 0 .356.006.509.013.162.006.384-.063.597.453.226.547.774 1.887.843 2.025.069.138.113.302.019.49-.094.188-.145.302-.289.471-.145.17-.308.384-.44.516-.151.15-.31.314-.132.616.176.302.78 1.283 1.673 2.075.918.818 1.692 1.076 1.993 1.226.302.151.478.126.66-.088.183-.214.774-.906.981-1.214.208-.308.415-.258.698-.151.283.107 1.792.843 2.1.993.308.15.515.226.59.358.076.132.076.761-.15 1.396z" />
              </svg>
            </div>
            <span className="w-full text-center pl-10 text-[13px] sm:text-[14px] tracking-wide whitespace-nowrap">Book Call</span>
          </button>
        </motion.div>
      </main>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full max-w-4xl px-6 py-20 flex flex-col items-center relative z-20">
        
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
          <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
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
                strokeWidth="25"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* 4 Feature Items */}
          {features.map((feat, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={index}
                className={`relative w-full sm:w-[45%] z-20 ${
                  isEven ? "self-end" : "self-start"
                }`}
              >
                <div className="w-full bg-white/45 backdrop-blur-md rounded-[28px] p-6 sm:p-8 shadow-clay-card border border-white/60 flex flex-col items-start text-left">
                  {/* Image Container with overlapping Badge */}
                  <div 
                    className="relative w-full rounded-[20px] overflow-visible mb-6"
                    style={{
                      width: "100%",
                      maxWidth: `${featureImageSize}px`,
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
                        sizes={`(max-width: ${featureImageSize}px) 100vw, ${featureImageSize}px`}
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

                  {/* Content Below Image - animated on scroll */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full"
                  >
                    <h3 className="text-[20px] sm:text-[22px] font-black tracking-tight text-neutral-950 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-neutral-500 font-extrabold text-[12px] sm:text-[13px] leading-[1.4] max-w-sm tracking-wide">
                      {feat.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-neutral-200/40 rounded-t-[24px] py-4 px-6 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="max-w-md mx-auto w-full">
          <button className="w-full relative flex items-center h-[54px] rounded-2xl bg-white text-neutral-950 font-extrabold shadow-clay-logo border border-neutral-100/50 flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all duration-200 active:scale-[0.98] cursor-pointer">
            <div className="absolute left-[5px] top-[5px] bottom-[5px] aspect-square bg-[#2D3E24] rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-[22px] h-[22px] fill-none stroke-current text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <span className="w-full text-center pl-12 text-[15px] tracking-wide">Buy Now @ just ₹999</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
