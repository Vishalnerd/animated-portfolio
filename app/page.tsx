"use client";

import Hero from "./components/hero/page";
import Header from "./components/header/page";
import DSAVisualizer from "./components/dsa/page";
import Skills from "./components/skills/page";
import Journey from "./components/journey/page";
import ProjectCard from "./components/projects/ProjectCard";
import Contact from "./components/contact/page";
import Footer from "./components/footer/page";
import FoldTransition from "./components/TheFoldTransition";

const p2 = {
  title: "DabbaNation",
  tags: ["Next.js", "Node.js", "MongoDB"],
  image: "/dabbanation.png",
  description:
    "Local food delivery logic. A platform connecting home chefs with hungry customers, featuring real-time order tracking.",
  link: "https://dabba-nation.vercel.app/",
};

const p3 = {
  title: "PrintEase",
  tags: ["SaaS", "React", "Stripe"],
  image: "/printease.png",
  description:
    "SaaS for custom prints. Design and order custom merchandise with an intuitive editor and seamless payment integration.",
  link: "https://printease.vercel.app/",
};

export default function Home() {
  return (
    <main className="notebook-bg min-h-screen">
      <Header />

      {/* CHAPTER 1: THE SKETCHBOOK (White Paper) */}
      <div className=" pb-20">
        <Hero />
        <DSAVisualizer />
        <Skills />
        <Journey />
      </div>

      {/* THE BRIDGE: THE ACCORDION FOLD */}
      <FoldTransition />

      {/* CHAPTER 2: THE WORKBENCH (Gray/Grid Surface) */}
      <section id="projects" className="py-40 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {/* Your Rough/Sketchy Project Cards */}
          <div className="flex flex-col gap-40">
            <div className="flex justify-end">
              <ProjectCard {...p2} />
            </div>
            <div className="flex justify-center">
              <ProjectCard {...p3} />
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: THE LEGAL PAD */}
      <Contact />
      <Footer />
    </main>
  );
}
