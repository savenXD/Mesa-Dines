"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  handleBuyNowClick?: (e: React.MouseEvent) => void;
}

export default function Navbar({ handleBuyNowClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleCtaClick = (e: React.MouseEvent) => {
    if (handleBuyNowClick) {
      handleBuyNowClick(e);
    } else {
      e.preventDefault();
      if (typeof window !== "undefined") {
        window.location.href = "/#contact";
      }
    }
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
        delay: 0.1 + custom * 0.05,
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    }),
  };

  const navItems = ["Home", "How It Works", "Why Mesa", "Problems", "Pricing", "FAQ", "Blog", "Contact"];
  const activeIdx = pathname.startsWith("/blog") ? 6 : (pathname === "/" ? 0 : null);
  const pillIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  return (
    <>
      <header className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 py-7 flex items-center justify-between z-40 relative select-none">
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
          {navItems.map((item, idx) => {
            const isBlog = item === "Blog";
            const href = isBlog
              ? "/blog"
              : (isHomePage
                  ? `#${item.toLowerCase().replace(/\s+/g, "-")}`
                  : `/#${item.toLowerCase().replace(/\s+/g, "-")}`);
            
            const isPill = pillIdx === idx;
            
            return (
              <Link
                key={item}
                href={href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative px-3.5 py-2 rounded-[10px] text-[13.5px] font-extrabold transition-colors duration-300 animate-none whitespace-nowrap z-10 ${
                  isPill ? "text-white" : "text-neutral-500 hover:text-neutral-850"
                }`}
              >
                <span className="relative z-10">{item}</span>
                {isPill && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-[10px] -z-10 bg-neutral-950 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Desktop CTA Button / Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a href="#contact" onClick={handleCtaClick} className="hidden md:flex items-center justify-center gap-2 bg-neutral-950 text-white rounded-[15px] h-[58px] px-6 text-[15px] font-extrabold shadow-clay-button hover:bg-neutral-900 transition-all duration-200 active:scale-[0.97] cursor-pointer">
            <span>Schedule a Call</span>
            <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] stroke-current fill-none text-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
              {["Home", "How It Works", "Why Mesa", "Problems", "Pricing", "FAQ", "Blog", "Contact"].map((item, idx) => {
                const isBlog = item === "Blog";
                const href = isBlog
                  ? "/blog"
                  : (isHomePage
                      ? `#${item.toLowerCase().replace(/\s+/g, "-")}`
                      : `/#${item.toLowerCase().replace(/\s+/g, "-")}`);
                return (
                  <motion.div
                    key={item}
                    variants={menuItemVariants}
                    custom={idx}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-[#2D3E24] w-fit transition-colors duration-200 block"
                    >
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              variants={menuItemVariants}
              custom={5}
              className="mt-12 flex flex-col gap-4 max-w-sm"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  setMenuOpen(false);
                  handleCtaClick(e);
                }}
                className="flex items-center justify-center gap-3 border border-neutral-950 bg-transparent text-neutral-950 font-bold py-4 px-6 rounded-2xl hover:bg-neutral-900 hover:text-white transition-all duration-200"
              >
                <span>Get Started Now</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
