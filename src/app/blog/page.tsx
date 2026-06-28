"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { posts, BlogPost } from "./blog-data";

const getSlugIcon = (slug: string) => {
  switch (slug) {
    case "how-to-increase-cafe-sales":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "qr-code-menu-for-cafe":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <line x1="14" y1="14" x2="14" y2="14" strokeWidth="3" />
          <line x1="20" y1="14" x2="20" y2="14" strokeWidth="3" />
          <line x1="14" y1="20" x2="14" y2="20" strokeWidth="3" />
          <line x1="20" y1="20" x2="20" y2="20" strokeWidth="3" />
        </svg>
      );
    case "how-to-reduce-cafe-waiting-time":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "digital-menu-vs-physical-menu":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "how-to-get-more-customers-in-your-cafe":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "cafe-management-software-india":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "how-to-increase-restaurant-table-turnover":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      );
    case "online-ordering-system-for-small-cafes":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "how-to-market-a-cafe-in-india":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "best-technology-for-cafes-and-restaurants-2025":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2D3E24]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
  }
};

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center select-none">
      {/* Mesh Grid Background */}
      <div className="absolute top-0 left-0 right-0 h-[220vh] grid-mesh pointer-events-none -z-10" />

      <Navbar />

      <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 pt-10 pb-20 flex-grow flex flex-col items-center">
        {/* Blog Header Title */}
        <div className="flex flex-col items-center text-center max-w-2xl mb-12">
          <span className="text-[#2D3E24] font-black text-xs uppercase tracking-widest mb-3">
            Mesa Dines Knowledge Base
          </span>
          <h1 className="text-[36px] sm:text-[46px] md:text-[54px] font-black tracking-tight text-neutral-950 leading-tight">
            Our Blog & Insights
          </h1>
          <p className="text-neutral-500 font-extrabold text-[13.5px] sm:text-[16px] leading-[1.4] mt-4 tracking-wide">
            Actionable guides on restaurant technology, cafe marketing, and operational optimization to skyrocket your sales.
          </p>
        </div>

        {/* Search Bar Row */}
        <div className="w-full max-w-md mb-12 relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl border border-neutral-950/10 bg-white/70 backdrop-blur-md text-xs font-bold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-950/30 transition-colors shadow-sm"
          />
          <svg className="absolute left-4.5 top-4 w-4 h-4 text-neutral-400 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className="group flex flex-col justify-between items-stretch text-left border border-neutral-950/15 rounded-[32px] p-6 md:p-8 bg-white hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-950/25 transition-all duration-300 shadow-xl shadow-black/5"
              >
                <div>
                  {/* Card Header: Icon & Categories/Date */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950/5 flex items-center justify-center flex-shrink-0 shadow-sm border border-neutral-950/5">
                      {getSlugIcon(post.slug)}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-neutral-400">
                      <span className="bg-neutral-900/5 px-2.5 py-1 rounded-lg border border-neutral-950/5 text-[#2D3E24]">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-neutral-900 text-lg md:text-xl font-black tracking-tight mb-2.5 leading-snug group-hover:text-[#2D3E24] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-neutral-500 font-extrabold text-xs leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read post footer */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-auto">
                  <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400">
                    {post.readTime}
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-950 font-black text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-md py-20 text-center flex flex-col items-center gap-4 bg-white/50 border border-neutral-950/10 rounded-[32px] shadow-sm">
            <svg className="w-12 h-12 text-neutral-400 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3" />
            </svg>
            <h3 className="text-neutral-800 font-black text-lg">No Articles Found</h3>
            <p className="text-neutral-400 font-extrabold text-xs max-w-xs">
              We couldn't find any articles matching your search query. Try typing something else.
            </p>
          </div>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer className="w-full bg-neutral-950 text-neutral-400 py-12 px-4 md:px-8 border-t border-neutral-800/60 mt-20 relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col items-start text-left gap-4 pb-8 border-b border-neutral-800/55">
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

          {/* Description */}
          <p className="text-neutral-400 text-xs sm:text-[13px] font-extrabold leading-relaxed max-w-lg">
            Empowering dining brands and premium restaurants with smart QR ordering, automated AI review boosters, and unified restaurant automation solutions.
          </p>
        </div>

        {/* Bottom bar */}
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
    </div>
  );
}
