"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SketchyBox } from "../ui/SketchyBox";

export default function DSAVisualizer() {
  // Reduced initial array size for mobile clarity
  const [array, setArray] = useState([60, 40, 80, 30, 90, 50]);
  const [isSorting, setIsSorting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

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
        // Highlight Comparison
        gsap.to([bars[j], bars[j + 1]], {
          backgroundColor: "#FFD700",
          scale: 1.05, // Subtle scale for mobile stability
          duration: 0.2,
        });

        await sleep(300); // Slightly slower for better visual tracking on small screens

        if (tempArray[j] > tempArray[j + 1]) {
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];

          const distance =
            bars[j + 1].getBoundingClientRect().left -
            bars[j].getBoundingClientRect().left;

          await Promise.all([
            gsap.to(bars[j], {
              x: distance,
              duration: 0.3,
              ease: "power2.inOut",
            }),
            gsap.to(bars[j + 1], {
              x: -distance,
              duration: 0.3,
              ease: "power2.inOut",
            }),
          ]);

          gsap.set([bars[j], bars[j + 1]], { x: 0 });
          setArray([...tempArray]);
        }

        gsap.to([bars[j], bars[j + 1]], {
          backgroundColor: "#1A1A1A",
          scale: 1,
          duration: 0.2,
        });
      }
      // Sorted color
      gsap.to(bars[n - i - 1], { backgroundColor: "#0055FF", opacity: 0.8 });
    }
    setIsSorting(false);
  });

  const resetArray = () => {
    setArray([60, 40, 80, 30, 90, 50]);
    gsap.to(".bar", { backgroundColor: "#1A1A1A", opacity: 1 });
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto my-12 px-2 md:px-4"
    >
      <SketchyBox color="#0055FF" className="bg-white p-4 md:p-8 shadow-xl">
        {/* Header: Stacked on small mobile, row on tablet */}
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="text-lg md:text-2xl font-sketch leading-none">
            BubbleSort
          </h2>
          <button
            onClick={resetArray}
            className="text-[10px] font-mono underline opacity-50 px-2 py-1 active:bg-ink/5 rounded"
          >
            [reset]
          </button>
        </div>

        {/* Visualizer Area: Flex-nowrap with responsive gaps */}
        <div className="flex items-end justify-center gap-1.5 xs:gap-2 md:gap-4 h-40 md:h-56 mb-8 border-b-2 border-dashed border-ink/10 pb-1">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="bar flex-1 max-w-[40px] bg-ink rounded-t-sm relative will-change-transform"
              style={{ height: `${value}%` }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[10px] font-bold text-blueprint">
                {value}
              </span>
              <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,#fff_1px,#fff_2px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Info & Button: Vertical stack on mobile to prevent squishing */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 md:flex-col md:gap-1">
            <p className="font-mono text-[10px] md:text-xs text-ink/60">
              <span className="text-blueprint font-bold">Time:</span> O(n²)
            </p>
            <p className="font-mono text-[10px] md:text-xs text-ink/60">
              <span className="text-blueprint font-bold">Space:</span> O(1)
            </p>
          </div>

          <button
            onClick={bubbleSort}
            disabled={isSorting}
            className={`w-full md:w-auto relative group px-8 py-3 font-sketch text-base transition-all
              ${isSorting ? "cursor-not-allowed opacity-50" : "active:scale-95"}
            `}
          >
            <span className="relative z-10">
              {isSorting ? "Sorting..." : "Run"}
            </span>
            <div className="absolute inset-0 border-2 border-ink bg-marker -rotate-1 group-active:rotate-0 transition-transform" />
          </button>
        </div>
      </SketchyBox>
    </div>
  );
}
