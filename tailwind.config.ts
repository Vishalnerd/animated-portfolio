import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F5F0",
        ink: "#1A1A1A",
        blueprint: "#0055FF",
        marker: "#FFD700",
      },
      backgroundImage: {
        'grid-pattern': "url('/icons/grid.svg')", // Faint grid paper background
      },
      fontFamily: {
        sketch: ['var(--font-sketch)', 'cursive'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;