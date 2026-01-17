"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Avatar from "../Avatar";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

      // Staggered entrance for the "placed on paper" feel
      tl.from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-subtitle",
          {
            x: -20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-avatar",
          {
            scale: 0.8,
            opacity: 0,
            rotate: 5,
            duration: 0.8,
          },
          "-=0.6",
        );

      // Subtle parallax on scroll
      gsap.to(".hero-avatar", {
        y: 50,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative max-w-5xl mx-auto mb-20 md:mb-40 px-4 md:px-6 lg:px-0 pt-10 md:pt-20"
    >
      {/* Decorative Washi Tape (Hidden on mobile for clarity) */}
      <div className="hidden md:block absolute -top-10 left-0 w-32 h-10 bg-marker/20 -rotate-6 opacity-50 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sketch leading-[1.1]">
            My{" "}
            <span className="relative inline-block text-blueprint">
              Dev Log
              <svg className="absolute -bottom-2 left-0 w-full h-3 overflow-visible opacity-70">
                <path
                  d="M0 5 Q 50 0, 100 5 T 200 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>{" "}
            <br />
            <span className="text-ink/80 text-4xl sm:text-5xl md:text-6xl">
              & Creative Journey
            </span>
          </h1>

          <p className="hero-subtitle font-mono text-lg md:text-xl lg:text-2xl opacity-60 italic">
            — by Vishal Tanwar
          </p>
        </div>

        <div className="hero-avatar relative">
          <Avatar />
          {/* Handwritten Annotation */}
          <div className="absolute -bottom-8 -right-4 hidden lg:block rotate-12">
            <p className="font-sketch text-blueprint text-xl opacity-40">
              {"<--"} that's me!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
