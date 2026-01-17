"use client";

import Hero from "./components/hero/page";
import Header from "./components/header/page";
import DSAVisualizer from "./components/dsa/page";
import Skills from "./components/skills/page";
import Journey from "./components/journey/page";
import ProjectCard from "./components/projects/page";
import PageFlipWrapper from "./components/PageFlipWrapper";
import Contact from "./components/contact/page";
import SocialDoodles from "./components/SocialDoodles";
import { SketchyBox } from "./components/ui/SketchyBox";

export default function Home() {
  return (
    <main className="notebook-bg min-h-screen pt-20 overflow-x-hidden relative">
      {/* 1. FIXED UTILITIES */}
      <Header />
      <SocialDoodles />

      {/* GLOBAL NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/recycled-paper-texture.png')] mix-blend-multiply" />

      {/* 2. HERO SECTION */}
      <Hero />

      {/* 3. ALGORITHM NOTES (The Study Session) */}
      <section
        id="dsa"
        className="relative max-w-4xl mx-auto my-16 md:my-32 px-4 md:px-6 group"
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-8 bg-blueprint/30 -rotate-2 z-20 transition-transform group-hover:-translate-y-1" />

        <SketchyBox className="bg-white shadow-2xl relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sketch mb-6">
            Algorithm Scribbles 📝
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
            <div className="md:border-r-2 border-dotted border-ink/20 md:pr-4 pb-4 md:pb-0 border-b-2 md:border-b-0">
              <p className="text-blueprint font-bold underline mb-2 text-sm md:text-base decoration-wavy">
                // Pathfinding Logic
              </p>
              <p className="text-xs md:text-sm leading-relaxed">
                Implementing{" "}
                <span className="bg-blueprint/10 px-1">Dijkstra's</span> for a
                grid-based game. Focusing on O(E + V log V) efficiency.
              </p>
            </div>
            <div>
              <p className="text-marker font-bold underline mb-2 text-sm md:text-base decoration-double">
                // Tree Traversal
              </p>
              <p className="text-xs md:text-sm leading-relaxed">
                Visualizing <span className="bg-marker/20 px-1">BFS/DFS</span>
                ... Recursive depth tracking is essential.
              </p>
            </div>
          </div>
        </SketchyBox>
      </section>

      {/* 4. INTERACTIVE VISUALIZER */}
      <DSAVisualizer />

      {/* 5. TECH SKILLS (Stickers) */}
      <Skills />

      {/* 6. THE JOURNEY (Line Drawing) */}
      <section id="journey" className="py-20">
        <Journey />
      </section>

      {/* 7. THE TRANSITION: JOURNEY -> PROJECTS */}
      <PageFlipWrapper>
        {/* Everything inside here is what appears on the NEW page */}
        <section
          id="projects"
          className=" max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24 min-h-screen"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-sketch mb-4">
              Selected Works
            </h2>
            <p className="font-mono text-ink/40 text-sm">
              Sorted by "Recency" Bias
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 md:gap-x-12">
            <ProjectCard
              title="DSA Visualizer"
              description="A custom tool to visualize complex sorting algorithms with a hand-drawn UI."
              tags={["TypeScript", "GSAP", "React"]}
              image="/globe.svg"
              link="https://github.com/vishal/dsa"
            />
            <ProjectCard
              title="DabbaNation"
              description="Full-stack food delivery platform tailored for local culinary services."
              tags={["Node.js", "Express", "MongoDB"]}
              image="/DabbaNation.png"
              link="https://dabba-nation.vercel.app/"
            />
            <ProjectCard
              title="PrintEase"
              description="SaaS for custom printing with a real-time Canvas API preview engine."
              tags={["Next.js", "Canvas", "Stripe"]}
              image="/PrintEase.png"
              link="https://printease.vercel.app/"
            />
          </div>

          {/* TRANSITION TO CONTACT */}
          <div className="mt-40 text-center">
            <p className="font-sketch text-2xl opacity-30 italic">
              "That's all for now... or is it?"
            </p>
            <div className="mt-4 animate-bounce text-3xl opacity-20">↓</div>
          </div>
        </section>
      </PageFlipWrapper>

      {/* 8. CONTACT SECTION (The Legal Pad) */}
      <section id="contact" className="notebook-bg bg-paper ">
        <Contact />
      </section>

      {/* 9. THE "BACK COVER" (Footer) */}
      <footer className="py-10 border-t border-ink/5 bg-[#e5e5e1]">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center opacity-40 grayscale">
          <p className="font-sketch text-lg">© 2026 Vishal Tanwar</p>
          <div className="flex gap-4 font-mono text-xs">
            <span>Built with Next.js & Coffee</span>
            <span>•</span>
            <span>Designed on Paper</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
