"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Journey", href: "#journey", color: "#1A1A1A" },
  { name: "Projects", href: "#projects", color: "#0055FF" },
  { name: "DSA", href: "#dsa", color: "#FFD700" },
  { name: "Contact", href: "#contact", color: "#1A1A1A" },
];

export default function Header() {
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(".nav-tab", {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
      });
    },
    { scope: container },
  );

  // Animate mobile menu links when opened
  useGSAP(() => {
    if (isOpen) {
      gsap.from(".mobile-link", {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <header
      ref={container}
      className="fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-4 md:py-6 pointer-events-none"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        {/* Brand / Logo */}
        <Link href="/" className="group flex flex-col z-[110]">
          <span className="font-sketch text-xl md:text-3xl text-ink group-hover:text-blueprint transition-colors">
            Vishal Tanwar
          </span>
          <svg className="w-full h-2 overflow-visible">
            <path
              d="M0 5 Q 25 0, 50 5 T 100 5"
              stroke="#0055FF"
              strokeWidth="2"
              fill="none"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.name} className="nav-tab relative group">
              <Link
                href={link.href}
                className="font-sketch text-lg lg:text-xl px-2 py-1 block transition-transform group-hover:-translate-y-1"
                style={{ color: link.color }}
              >
                {link.name}
              </Link>
              <svg className="absolute -bottom-1 left-0 w-full h-3 overflow-visible pointer-events-none">
                <path
                  d="M2 5 L 98 5"
                  stroke={link.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  className="scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-[110] p-2 text-ink active:scale-90 transition-transform"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-paper transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Sketchy Background Grid for Menu */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mobile-link font-sketch text-4xl hover:text-blueprint transition-colors"
              style={{ color: link.color }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
