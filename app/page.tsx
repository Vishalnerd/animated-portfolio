"use client";

import Hero from "./components/hero/page";
import Header from "./components/header/page";
import DSAVisualizer from "./components/dsa/page";
import Skills from "./components/skills/page";
import Journey from "./components/journey/page";
import ProjectCard from "./components/projects/ProjectCard";
import Contact from "./components/contact/page";
import Footer from "./components/footer/page";

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

      {/* SECTION 2: PROJECTS */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-sketch text-ink mb-12 md:mb-16 text-center">
            Featured Projects
          </h2>
          <div className="space-y-16 md:space-y-20">
            <div className="w-full flex justify-center md:justify-start">
              <ProjectCard {...p2} />
            </div>
            <div className="w-full flex justify-center md:justify-end">
              <ProjectCard {...p3} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 ">
        <Contact />
        <Footer />
      </section>
    </main>
  );
}
