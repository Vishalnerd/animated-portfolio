"use client";

import { useRef, useState } from "react";
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
      // Entrance: The pad "slaps" onto the desk
      gsap.from(".contact-paper", {
        y: 100,
        opacity: 0,
        rotate: -10,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
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
      // Slam the "Approved" stamp down
      gsap.fromTo(
        ".success-stamp",
        { scale: 4, opacity: 0, rotate: -30 },
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
      className="py-20 md:py-40 px-4 flex justify-center items-center relative overflow-hidden "
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/recycled-paper-texture.png')]" />

      <div className="contact-paper relative w-full max-w-xl bg-[#FFF9C4] p-8 md:p-14 shadow-2xl border-l-[12px] md:border-l-[20px] border-red-200 rotate-[-1deg] transition-all duration-500 hover:rotate-0">
        {/* Washi Tape */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-blueprint/20 backdrop-blur-sm -rotate-2 border border-blueprint/10 shadow-sm" />

        <h2 className="text-4xl md:text-5xl font-sketch text-ink mb-12 underline decoration-wavy decoration-red-400/30 underline-offset-8">
          Drop a Note.
        </h2>

        {status === "sent" ? (
          <div className="py-20 text-center relative overflow-hidden">
            <div className="success-stamp border-8 border-double border-blueprint text-blueprint font-sketch text-5xl md:text-7xl p-6 uppercase mix-blend-multiply opacity-0 inline-block mb-8">
              APPROVED
            </div>
            <p className="font-sketch text-2xl text-ink/60">
              Message logged successfully.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 font-mono text-xs underline opacity-40 hover:opacity-100"
            >
              [ WRITE ANOTHER ]
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
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
              <div key={field.id} className="relative group">
                <label className="font-mono text-[10px] text-red-500/50 uppercase tracking-[0.3em] mb-2 block">
                  {field.label}
                </label>
                <div
                  className={`flex items-center border-b-2 transition-all duration-300 pb-2 ${focusedField === field.id ? "border-blueprint" : "border-ink/10"}`}
                >
                  <field.icon
                    size={18}
                    className={`mr-4 transition-colors ${focusedField === field.id ? "text-blueprint" : "text-ink/20"}`}
                  />
                  <input
                    type={field.id === "email" ? "email" : "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-none outline-none w-full font-sketch text-2xl placeholder:opacity-10 text-ink"
                  />
                </div>
              </div>
            ))}

            <div className="relative group">
              <label className="font-mono text-[10px] text-red-500/50 uppercase tracking-[0.3em] mb-2 block">
                The Log
              </label>
              <div
                className={`flex items-start border-b-2 transition-all duration-300 pb-2 ${focusedField === "msg" ? "border-blueprint" : "border-ink/10"}`}
              >
                <MessageSquare
                  size={18}
                  className={`mr-4 mt-2 transition-colors ${focusedField === "msg" ? "text-blueprint" : "text-ink/20"}`}
                />
                <textarea
                  name="message"
                  placeholder="What's the plan?"
                  rows={4}
                  required
                  onFocus={() => setFocusedField("msg")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-none outline-none w-full font-sketch text-2xl placeholder:opacity-10 text-ink resize-none leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-5 bg-ink text-paper font-sketch text-2xl group relative overflow-hidden active:scale-95 transition-all shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {status === "sending" ? "SHIPPING..." : "STAMP & SEND"}
                <Send
                  size={20}
                  className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"
                />
              </span>
              {/* Blue ink flood on hover */}
              <div className="absolute inset-0 bg-blueprint translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            {status === "error" && (
              <div className="flex items-center justify-center gap-2 text-red-600 font-mono text-xs animate-pulse">
                <AlertCircle size={14} />
                <span>Error in transmission. Try again.</span>
              </div>
            )}
          </form>
        )}

        {/* Marginalia: Hand-written signature */}
        <div className="absolute bottom-6 right-10 opacity-30 -rotate-6 hidden md:block">
          <p className="font-sketch text-2xl">Vishal T.</p>
        </div>
      </div>
    </section>
  );
}
