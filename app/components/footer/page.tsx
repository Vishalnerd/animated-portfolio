"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Twitter, ArrowUp, Mail } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useGSAP(
    () => {
      gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#3d3d3b] text-[#c5c5c1] pt-16 md:pt-20 pb-8 md:pb-10 overflow-hidden"
    >
      {/* 1. CARDBOARD TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/recycled-paper-texture.png')] mix-blend-overlay" />

      {/* 2. TOP TORN EDGE (The transition from the legal pad) */}
      <div
        className="absolute top-0 left-0 w-full h-8 bg-paper z-10"
        style={{
          clipPath:
            "polygon(0% 0%, 5% 100%, 10% 0%, 15% 90%, 20% 5%, 25% 100%, 30% 0%, 35% 80%, 40% 10%, 45% 100%, 50% 0%, 55% 90%, 60% 10%, 65% 100%, 70% 0%, 75% 85%, 80% 5%, 85% 100%, 90% 0%, 95% 95%, 100% 0%)",
        }}
      />

      <div className="footer-content max-w-6xl mx-auto px-4 md:px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end border-b border-white/10 pb-10 md:pb-16">
          {/* LEFT: PROPERTY STAMP */}
          <div className="space-y-4">
            <div className="inline-block border-2 border-[#c5c5c1]/30 p-3 md:p-4 -rotate-3">
              <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-50 mb-1">
                Property of:
              </p>
              <h3 className="font-sketch text-2xl md:text-3xl text-white">
                Vishal Tanwar
              </h3>
              <p className="font-mono text-[9px] md:text-[10px] opacity-40">
                Ref: Portfolio_Log_2026
              </p>
            </div>
          </div>

          {/* CENTER: SOCIAL STICKERS */}
          <div className="flex justify-center gap-4 md:gap-6">
            {[
              {
                Icon: Github,
                href: "https://github.com/Vishalnerd",
                label: "Git",
                rotate: "-10deg",
                bg: "bg-white/5",
              },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/vishal-tanwar-a7076a286/",
                label: "In",
                rotate: "5deg",
                bg: "bg-blueprint/20",
              },
              {
                Icon: Mail,
                href: "mailto:vishaltanwar275@gmail.com",
                label: "Em",
                rotate: "-5deg",
                bg: "bg-white/5",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className={`group relative p-3 md:p-4 ${social.bg} border border-white/10 transition-all hover:-translate-y-2`}
                style={{ transform: `rotate(${social.rotate})` }}
              >
                <social.Icon
                  size={20}
                  className="md:w-6 md:h-6 group-hover:text-white transition-colors"
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-sketch text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT: BACK TO TOP */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 md:gap-3 font-sketch text-lg md:text-xl hover:text-white transition-colors"
            >
              <span>Back to start</span>
              <div className="p-1.5 md:p-2 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUp size={18} className="md:w-5 md:h-5" />
              </div>
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 opacity-30 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em]">
          <p className="text-center md:text-left">
            © 2026 HAND-CODED BY VISHAL
          </p>
          <div className="flex gap-3 md:gap-6 text-[8px] md:text-[10px]">
            <span>Next.js 15</span>
            <span>Gsap 3.12</span>
            <span>Tailwind 4.0</span>
          </div>
        </div>
      </div>

      {/* ROUGH DECOR: Faint hand-drawn arrow at the very bottom */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-5">
        <svg width="200" height="40" viewBox="0 0 200 40">
          <path
            d="M10 20 Q100 0 190 20"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>
    </footer>
  );
}
