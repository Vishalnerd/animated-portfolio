"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Journey", href: "#journey" },
  { name: "Projects", href: "#projects" },
  { name: "DSA", href: "#dsa" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldBlend, setShouldBlend] = useState(true);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShouldBlend(false);
    } else {
      document.body.style.overflow = "unset";
      // Delay re-enabling blend mode until after close animation (500ms)
      const timer = setTimeout(() => setShouldBlend(true), 500);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useGSAP(
    () => {
      // Desktop initial entrance
      gsap.from(".nav-tab", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  useGSAP(() => {
    if (isOpen) {
      gsap.from(".mobile-link", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: "back.out(1.2)",
      });
    }
  }, [isOpen]);

  return (
    <header
      ref={container}
      className={`fixed top-0 left-0 w-full z-[110] px-4 md:px-8 py-3 md:py-6 pointer-events-none ${shouldBlend ? "mix-blend-difference" : ""}`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        {/* Brand - text-white works with mix-blend-difference to invert on light/dark */}
        <Link href="/" className="group flex flex-col z-[120]">
          <span className="font-sketch text-2xl md:text-3xl text-white tracking-tight">
            V. Tanwar
          </span>
          <div className="w-0 group-hover:w-full h-[2px] bg-white transition-all duration-500 ease-sketch" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.name} className="nav-tab relative group">
              <Link
                href={link.href}
                className="font-sketch text-xl text-white px-2 py-1 block transition-transform group-hover:-translate-y-1"
              >
                {link.name}
              </Link>
              <svg className="absolute -bottom-1 left-0 w-full h-2 overflow-visible pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <path
                  d="M0 5 Q 50 0, 100 5"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle - Larger touch target */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className={`md:hidden z-[120] p-3 -mr-2 active:scale-90 transition-transform ${isOpen ? "text-ink" : "text-white"}`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay - Optimized for Touch */}
        <div
          className={`fixed inset-0 bg-white transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden flex flex-col items-center justify-center gap-12 ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          {/* Subtle Sketchy Decor in Menu */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />

          <div className="absolute top-8 left-8 font-mono  text-[10px] uppercase tracking-[0.3em]">
            Menu // Nav_v2
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mobile-link font-sketch text-5xl text-ink hover:text-blueprint transition-colors tracking-widest"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Social Shortcut */}
          <div className="mt-8 flex gap-6 opacity-40">
            <span className="font-mono text-xs text-ink">LN</span>
            <span className="font-mono text-xs text-ink">GH</span>
            <span className="font-mono text-xs text-ink">TW</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
