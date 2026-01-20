"use client";

import Hero from "./components/hero/page";
import Header from "./components/header/page";
import DSAVisualizer from "./components/dsa/page";
import Skills from "./components/skills/page";
import Journey from "./components/journey/page";
import ProjectCard from "./components/projects/ProjectCard";
import Contact from "./components/contact/page";
import Footer from "./components/footer/page";
import UnrollTransition from "./components/UnrollTransition";

const p2 = {
  title: "DabbaNation",
  tags: ["Next.js", "Node.js", "MongoDB"],
  image: "/DabbaNation.png",
  description:
    "Local food delivery logic. A platform connecting home chefs with hungry customers, featuring real-time order tracking.",
  link: "https://dabba-nation.vercel.app/",
};

const p3 = {
  title: "PrintEase",
  tags: ["SaaS", "React", "Stripe"],
  image: "/PrintEase.png",
  description:
    "SaaS for custom prints. Design and order custom merchandise with an intuitive editor and seamless payment integration.",
  link: "https://printease.vercel.app/",
};

export default function Home() {
  return (
    <main className="notebook-bg min-h-screen">
      <Header />

      {/* SECTION 1: JOURNEY */}
      <div className="">
        <Hero />
        <DSAVisualizer />
        <Skills />
        <Journey />
      </div>

      {/* SECTION 2: THE PINNED TRANSITION & PROJECTS */}
      {/* This section will take over the screen, pin, and then release */}
      <UnrollTransition>
        <div className="project-reveal-item w-full flex justify-center md:justify-start">
          <ProjectCard {...p2} />
        </div>
        <div className="project-reveal-item w-full flex justify-center md:justify-end">
          <ProjectCard {...p3} />
        </div>
      </UnrollTransition>

      {/* Ensure Contact/Footer sits on top after the pin releases */}
      <section className="relative z-20 ">
        <Contact />
        <Footer />
      </section>
    </main>
  );
}
