"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Send, Mail, User, MessageSquare, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      gsap.from(".contact-paper", {
        y: isMobile ? 50 : 100, // Reduced travel distance for mobile
        opacity: 0,
        rotate: isMobile ? -3 : -10, // Subtle tilt to prevent horizontal overflow
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );

      setStatus("sent");
      gsap.fromTo(
        ".success-stamp",
        { scale: 3, opacity: 0, rotate: -20 },
        {
          scale: 1,
          opacity: 0.8,
          rotate: -15,
          duration: 0.4,
          ease: "bounce.out",
        },
      );
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-20 lg:py-40 px-3 md:px-4 flex justify-center items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/recycled-paper-texture.png')]" />

      <div className="contact-paper relative w-full max-w-xl bg-[#FFF9C4] p-5 md:p-8 lg:p-14 shadow-xl md:shadow-2xl border-l-[10px] md:border-l-[15px] lg:border-l-[20px] border-red-200 rotate-[-0.5deg] md:rotate-[-1deg] transition-all duration-500">
        {/* Simplified Washi Tape for Mobile */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-10 bg-blueprint/15 backdrop-blur-sm -rotate-1 border border-blueprint/10 pointer-events-none" />

        <h2 className="text-2xl md:text-5xl font-sketch text-ink mb-8 md:mb-12 underline decoration-wavy decoration-red-400/20 underline-offset-4">
          Drop a Note.
        </h2>

        {status === "sent" ? (
          <div className="py-10 md:py-20 text-center relative overflow-hidden">
            <div className="success-stamp border-4 md:border-8 border-double border-blueprint text-blueprint font-sketch text-4xl md:text-7xl p-3 md:p-6 uppercase mix-blend-multiply opacity-0 inline-block mb-6">
              APPROVED
            </div>
            <p className="font-sketch text-lg md:text-2xl text-ink/60">
              Message logged.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 font-mono text-[10px] underline opacity-40 hover:opacity-100 uppercase"
            >
              [ WRITE ANOTHER ]
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 md:space-y-12"
          >
            {[
              {
                id: "name",
                name: "user_name",
                label: "Identity",
                icon: User,
                placeholder: "Your Name",
              },
              {
                id: "email",
                name: "user_email",
                label: "Email",
                icon: Mail,
                placeholder: "your@email.com",
              },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label className="font-mono text-[9px] md:text-[10px] text-red-500/60 uppercase tracking-[0.2em] mb-1 block">
                  {field.label}
                </label>
                <div
                  className={`flex items-center border-b-[1.5px] transition-all duration-300 pb-2 ${focusedField === field.id ? "border-blueprint" : "border-ink/10"}`}
                >
                  <field.icon
                    size={16}
                    className={`mr-3 transition-colors ${focusedField === field.id ? "text-blueprint" : "text-ink/20"}`}
                  />
                  <input
                    type={field.id === "email" ? "email" : "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    autoComplete="off"
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-none outline-none w-full font-sketch text-lg md:text-2xl placeholder:opacity-20 text-ink"
                  />
                </div>
              </div>
            ))}

            <div className="relative">
              <label className="font-mono text-[9px] md:text-[10px] text-red-500/60 uppercase tracking-[0.2em] mb-1 block">
                The Log
              </label>
              <div
                className={`flex items-start border-b-[1.5px] transition-all duration-300 pb-2 ${focusedField === "msg" ? "border-blueprint" : "border-ink/10"}`}
              >
                <MessageSquare
                  size={16}
                  className={`mr-3 mt-1.5 transition-colors ${focusedField === "msg" ? "text-blueprint" : "text-ink/20"}`}
                />
                <textarea
                  name="message"
                  placeholder="What's the plan?"
                  rows={3}
                  required
                  onFocus={() => setFocusedField("msg")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-none outline-none w-full font-sketch text-lg md:text-2xl placeholder:opacity-20 text-ink resize-none leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 md:py-5 bg-ink text-paper font-sketch text-xl md:text-2xl group relative overflow-hidden active:scale-[0.98] transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {status === "sending" ? "SHIPPING..." : "STAMP & SEND"}
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-blueprint translate-y-full group-active:translate-y-0 md:group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {status === "error" && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-mono text-[10px] uppercase">
                <AlertCircle size={12} />
                <span>Transmission error. Try again.</span>
              </div>
            )}
          </form>
        )}

        {/* Marginalia - Repositioned for mobile */}
        <div className="absolute bottom-4 right-6 opacity-20 -rotate-3 text-right">
          <p className="font-sketch text-lg md:text-2xl italic tracking-tighter">
            V. Tanwar
          </p>
        </div>
      </div>
    </section>
  );
}
