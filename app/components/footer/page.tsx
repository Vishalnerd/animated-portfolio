"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Twitter, ArrowUp, Mail } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      
      gsap.from(".footer-content", {
        y: isMobile ? 30 : 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#3d3d3b] text-[#c5c5c1] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden"
    >
      {/* 1. CARDBOARD TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/recycled-paper-texture.png')] mix-blend-overlay" />

      {/* 2. TOP TORN EDGE - Enhanced for mobile visibility */}
      <div
        className="absolute top-0 left-0 w-full h-6 md:h-10 bg-paper z-10"
        style={{
          clipPath:
            "polygon(0% 0%, 5% 100%, 10% 0%, 15% 80%, 20% 10%, 25% 100%, 30% 0%, 35% 70%, 40% 15%, 45% 100%, 50% 0%, 55% 85%, 60% 10%, 65% 100%, 70% 0%, 75% 80%, 80% 10%, 85% 100%, 90% 0%, 95% 90%, 100% 0%)",
        }}
      />

      <div className="footer-content max-w-6xl mx-auto px-6 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 border-b border-white/10 pb-12 md:pb-20">
          
          {/* LEFT: PROPERTY STAMP (Centered on Mobile) */}
          <div className="text-center md:text-left order-2 md:order-1">
            <div className="inline-block border-2 border-[#c5c5c1]/20 p-4 -rotate-2 bg-white/5 backdrop-blur-sm">
              <p className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-1">
                Property of:
              </p>
              <h3 className="font-sketch text-2xl md:text-4xl text-white">
                Vishal Tanwar
              </h3>
              <p className="font-mono text-[9px] opacity-30 mt-1">
                Portfolio_Session_v.2026
              </p>
            </div>
          </div>

          {/* CENTER: SOCIAL STICKERS (Large touch targets) */}
          <div className="flex justify-center gap-3 md:gap-6 order-1 md:order-2">
            {[
              { Icon: Github, href: "https://github.com/Vishalnerd", label: "Git", rotate: "-8deg" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/vishal-tanwar-a7076a286/", label: "In", rotate: "4deg", bg: "bg-blueprint/20" },
              { Icon: Mail, href: "mailto:vishaltanwar275@gmail.com", label: "Mail", rotate: "-4deg" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 md:p-5 ${social.bg || "bg-white/5"} border border-white/10 active:scale-95 transition-all`}
                style={{ transform: `rotate(${social.rotate})` }}
              >
                <social.Icon size={24} className="group-hover:text-white transition-colors" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-sketch text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT: BACK TO TOP */}
          <div className="order-3 w-full md:w-auto flex justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-2 font-sketch text-base md:text-xl hover:text-white transition-colors active:scale-90"
            >
              <div className="p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUp size={20} />
              </div>
              <span className="opacity-50 group-hover:opacity-100">Back to start</span>
            </button>
          </div>
        </div>

        {/* BOTTOM BAR: Stacked on mobile for better legibility */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 font-mono text-[9px] uppercase tracking-[0.2em]">
          <p>© 2026 HAND-CODED BY VISHAL</p>
          <div className="flex gap-4 md:gap-8">
            <span>Next.js 15</span>
            <span>Tailwind 4</span>
            <span className="hidden sm:inline">GSAP 3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}