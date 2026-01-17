"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Send, Mail, User, MessageSquare } from "lucide-react";
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
      // Entrance animation: The paper "slides" onto the desk
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
      // Replace these with your EmailJS credentials
      const serviceID =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateID =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      await emailjs.sendForm(
        serviceID,
        templateID,
        formRef.current!,
        publicKey,
      );

      setStatus("sent");
      gsap.fromTo(
        ".success-scribble",
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 5, duration: 0.5, ease: "back.out(2)" },
      );

      // Reset form
      formRef.current?.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      ref={containerRef}
      className=" md:py-40 px-4 md:px-6 flex justify-center items-center relative overflow-hidden notebook-bg"
    >
      {/* Background Grid Pattern (Notebook vibes) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="contact-paper relative w-full max-w-xl bg-[#FFF9C4] p-6 md:p-12 shadow-2xl border-l-[12px] md:border-l-[20px] border-red-200 rotate-[-1.5deg] hover:rotate-0 transition-all duration-500">
        {/* Washi Tape */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-blueprint/20 backdrop-blur-sm rotate-1 border border-blueprint/10 shadow-sm" />

        <h2 className="text-4xl md:text-5xl font-sketch text-ink mb-10 decoration-wavy underline decoration-blueprint/30">
          Leave a Note.
        </h2>

        {status === "sent" ? (
          <div className="py-20 text-center space-y-6 success-scribble">
            <div className="text-6xl">📮</div>
            <h3 className="text-3xl md:text-4xl font-sketch text-blueprint italic">
              "Note Received!"
            </h3>
            <p className="font-mono text-ink/60">
              I'll get back to you by the next coffee break.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="font-sketch text-blueprint underline decoration-dashed hover:decoration-solid transition-all"
            >
              Write another?
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
            {/* Input Group Helper */}
            {[
              {
                id: "name",
                name: "user_name",
                label: "Your Name",
                type: "text",
                icon: User,
                placeholder: "Alex Doe",
              },
              {
                id: "email",
                name: "user_email",
                label: "Email Address",
                type: "email",
                icon: Mail,
                placeholder: "alex@example.com",
              },
            ].map((field) => (
              <div key={field.id} className="relative group">
                <label className="font-mono text-[10px] text-ink/40 uppercase tracking-[0.2em] ml-1 mb-2 block">
                  {field.label}
                </label>
                <div
                  className={`flex items-center border-b-2 transition-all duration-300 pb-2 ${focusedField === field.id ? "border-blueprint" : "border-ink/10"}`}
                >
                  <field.icon
                    size={18}
                    className={`mr-3 transition-colors ${focusedField === field.id ? "text-blueprint" : "text-ink/20"}`}
                  />
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    onFocus={() => setFocusedField(field.id)}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-none outline-none w-full font-sketch text-2xl placeholder:opacity-20 text-ink"
                  />
                </div>
              </div>
            ))}

            <div className="relative group">
              <label className="font-mono text-[10px] text-ink/40 uppercase tracking-[0.2em] ml-1 mb-2 block">
                The Message
              </label>
              <div
                className={`flex items-start border-b-2 transition-all duration-300 pb-2 ${focusedField === "msg" ? "border-blueprint" : "border-ink/10"}`}
              >
                <MessageSquare
                  size={18}
                  className={`mr-3 mt-2 transition-colors ${focusedField === "msg" ? "text-blueprint" : "text-ink/20"}`}
                />
                <textarea
                  name="message"
                  placeholder="What's the plan?"
                  rows={4}
                  required
                  onFocus={() => setFocusedField("msg")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-none outline-none w-full font-sketch text-2xl placeholder:opacity-20 text-ink resize-none leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full relative group overflow-hidden font-sketch text-2xl text-white bg-blueprint py-4 px-6 rounded-lg transition-all duration-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {status === "sending"
                  ? "Drying Ink..."
                  : status === "error"
                    ? "Try Again"
                    : "Stamp & Send"}
                <Send
                  size={22}
                  className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"
                />
              </span>
              <div
                className={`absolute inset-0 ${status === "error" ? "bg-red-500" : "bg-blueprint"} translate-y-full group-hover:translate-y-0 transition-transform duration-500`}
              />
            </button>
            {status === "error" && (
              <p className="text-red-500 text-center font-mono text-sm">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>

      {/* Coffee Stain Doodle */}
      <div className="absolute bottom-20 left-20 opacity-[0.05] pointer-events-none hidden lg:block">
        <svg width="150" height="150" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            fill="brown"
            strokeWidth="4"
            strokeDasharray="10 5"
          />
          <circle
            cx="52"
            cy="52"
            r="38"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
