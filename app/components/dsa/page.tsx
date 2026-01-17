"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SketchyBox } from "../ui/SketchyBox";

export default function DSAVisualizer() {
  const [array, setArray] = useState([60, 40, 80, 30, 90, 50, 70]);
  const [isSorting, setIsSorting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Helper to wait for animation
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = contextSafe(async () => {
    if (isSorting) return;
    setIsSorting(true);

    let tempArray = [...array];
    let n = tempArray.length;
    const bars = containerRef.current?.querySelectorAll(".bar");
    if (!bars) return;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // 1. Highlight Comparison
        const tl = gsap.timeline();
        tl.to([bars[j], bars[j + 1]], {
          backgroundColor: "#FFD700", // Marker Yellow
          scale: 1.1,
          duration: 0.2,
        });

        await sleep(250);

        if (tempArray[j] > tempArray[j + 1]) {
          // 2. Swap Logic
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];

          // Calculate distance for swap
          const distance =
            bars[j + 1].getBoundingClientRect().left -
            bars[j].getBoundingClientRect().left;

          // Animate Swap
          await Promise.all([
            gsap.to(bars[j], {
              x: distance,
              duration: 0.4,
              ease: "power2.inOut",
            }),
            gsap.to(bars[j + 1], {
              x: -distance,
              duration: 0.4,
              ease: "power2.inOut",
            }),
          ]);

          // 3. Reset positions and Update State
          // We set x to 0 immediately before state update to prevent "jumping"
          gsap.set([bars[j], bars[j + 1]], { x: 0 });
          setArray([...tempArray]);
        }

        // 4. Reset Highlight
        gsap.to([bars[j], bars[j + 1]], {
          backgroundColor: "#1A1A1A",
          scale: 1,
          duration: 0.2,
        });
      }

      // Mark last element as "Sorted"
      gsap.to(bars[n - i - 1], { backgroundColor: "#0055FF", opacity: 0.8 });
    }
    setIsSorting(false);
  });

  const resetArray = () => {
    setArray([60, 40, 80, 30, 90, 50, 70]);
    gsap.to(".bar", { backgroundColor: "#1A1A1A", opacity: 1 });
  };

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto my-12 md:my-20 px-4">
      <SketchyBox color="#0055FF" className="bg-white p-6 md:p-10 shadow-xl">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-2xl md:text-3xl font-sketch">
            Algorithm Scribble: BubbleSort
          </h2>
          <button
            onClick={resetArray}
            className="text-xs font-mono underline opacity-50 hover:opacity-100"
          >
            [reset]
          </button>
        </div>

        <div className="flex items-end justify-center gap-3 md:gap-6 h-56 mb-10 border-b-2 border-dashed border-ink/10 pb-2">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="bar w-8 md:w-10 bg-ink rounded-t-sm relative transition-all"
              style={{ height: `${value}%` }}
            >
              {/* Value Label */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs font-bold text-blueprint">
                {value}
              </span>

              {/* Sketchy "Lead" Texture overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#fff_2px,#fff_3px)]" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <p className="font-mono text-xs md:text-sm text-ink/60">
              <span className="text-blueprint font-bold">Time:</span> O(n²)
            </p>
            <p className="font-mono text-xs md:text-sm text-ink/60">
              <span className="text-blueprint font-bold">Space:</span> O(1)
            </p>
          </div>

          <button
            onClick={bubbleSort}
            disabled={isSorting}
            className={`relative group px-10 py-3 font-sketch text-lg overflow-hidden transition-all
              ${isSorting ? "cursor-not-allowed opacity-50" : "hover:rotate-1 active:scale-95"}
            `}
          >
            <span className="relative z-10">
              {isSorting ? "Sorting..." : "Run Algorithm"}
            </span>
            {/* Sketchy Button Background */}
            <div className="absolute inset-0 border-2 border-ink bg-marker -rotate-1 group-hover:rotate-0 transition-transform" />
          </button>
        </div>
      </SketchyBox>
    </div>
  );
}
