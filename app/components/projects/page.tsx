"use client";

import { SketchyBox } from "../ui/SketchyBox";

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <SketchyBox className="bg-white">
        <h1 className="text-4xl font-sketch mb-4">Projects</h1>
        <p className="font-mono text-ink/70">
          This page is accessible at /components/projects. The main project showcase is on the home page.
        </p>
      </SketchyBox>
    </div>
  );
}
