import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';
import Navbar from "../../../components/Navbar";
import { posts, BlogPost } from "../blog-data";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for dynamic blog paths
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Mesa Dines Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Mesa Dines`,
      description: post.excerpt,
      url: `https://mesadines.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Mesa Dines Team'],
    }
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }



  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      const trimmedBlock = block.trim();
      if (trimmedBlock.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg md:text-xl font-black text-neutral-900 mt-8 mb-3 leading-snug">
            {trimmedBlock.replace("### ", "")}
          </h3>
        );
      }
      if (trimmedBlock.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl md:text-2xl font-black text-neutral-900 mt-10 mb-4 leading-snug">
            {trimmedBlock.replace("## ", "")}
          </h2>
        );
      }
      if (trimmedBlock.startsWith("* ")) {
        const items = trimmedBlock.split("\n");
        return (
          <ul key={idx} className="list-disc pl-6 my-4 flex flex-col gap-2">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="text-neutral-500 font-extrabold text-xs md:text-sm leading-relaxed">
                {item.replace("* ", "").split("**").map((boldText, boldIdx) => 
                  boldIdx % 2 === 1 ? <strong key={boldIdx} className="font-black text-neutral-900">{boldText}</strong> : boldText
                )}
              </li>
            ))}
          </ul>
        );
      }
      
      return (
        <p key={idx} className="text-neutral-500 font-extrabold text-xs md:text-sm leading-relaxed mb-4">
          {trimmedBlock.split("**").map((boldText, boldIdx) => 
            boldIdx % 2 === 1 ? <strong key={boldIdx} className="font-black text-neutral-900">{boldText}</strong> : boldText
          )}
        </p>
      );
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center select-none">
      {/* Mesh Grid Background */}
      <div className="absolute top-0 left-0 right-0 h-[220vh] grid-mesh pointer-events-none -z-10" />

      {/* Navbar wrapper */}
      <Navbar />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20 flex-grow">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-neutral-950 font-black text-xs uppercase tracking-wider mb-8 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Back to Blog</span>
        </Link>

        {/* Article Metadata Header */}
        <article className="w-full bg-white border border-neutral-950/15 rounded-[32px] p-6 md:p-10 shadow-xl shadow-black/5">
          <div className="flex items-center gap-4 mb-5 text-[10px] font-black uppercase tracking-wider text-neutral-400">
            <span className="bg-neutral-900/5 px-2.5 py-1 rounded-lg border border-neutral-950/5 text-[#2D3E24]">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Heading */}
          <h1 className="text-neutral-900 text-2xl sm:text-3xl md:text-4.5xl font-black tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="border-t border-neutral-100 pt-8 mt-6">
            {/* Parsed Body Content */}
            <div className="prose max-w-none">
              {renderContent(post.content)}
            </div>
          </div>
        </article>

        {/* CTA Card at the Bottom of each article */}
        <div className="w-full mt-10 bg-neutral-950 text-white rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2 max-w-md text-center md:text-left">
            <h3 className="font-black text-xl md:text-2xl leading-tight">Supercharge Your Restaurant</h3>
            <p className="text-neutral-400 font-extrabold text-xs md:text-sm leading-relaxed">
              Join top dining establishments using Mesa Dines to automate operations, boost Google reviews, and double sales.
            </p>
          </div>
          <Link href="/#contact" className="px-6 py-4 bg-white text-neutral-950 font-extrabold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 hover:scale-[0.96] active:scale-[0.92] text-center whitespace-nowrap">
            Schedule a Demo Call
          </Link>
        </div>
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
