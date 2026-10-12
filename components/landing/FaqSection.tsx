"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { heading2, sectionPadding } from "./ui/typography";

const FAQS = [
  {
    question: "What is SCS Learn, and who is it for?",
    answer:
      "SCS Learn brings real courses from Carnegie Mellon's Kenneth C. Griffin School of Computer Science to anyone, anywhere - no application, no tuition, and no prerequisites. It's for anyone who wants to build real computing skills, whether you're switching careers, in school, or upskilling on the job.",
  },
  {
    question: "Do I need any prior background to join?",
    answer:
      "No. Each course lists what it assumes going in, and most start from the fundamentals. Your AI tutor is there to help fill gaps as you go.",
  },
  {
    question: "Is it really free? What's the catch?",
    answer:
      "Every course is free to learn from. The AI tutor is free to try - deeper access and a certificate are paid upgrades, but the course itself always stays free.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes - course completion comes with a certificate, and every course is built around real projects, so you also walk away with a portfolio to show for it.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={`scroll-mt-32 bg-black text-white ${sectionPadding}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className={heading2}>Got questions?</h2>

          <div className="mt-10 border-t border-white/15 lg:mt-12">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium md:text-lg"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors duration-200 ${
                        isOpen ? "bg-primary text-white" : "bg-white/10 text-white"
                      }`}
                    >
                      <Plus
                        size={20}
                        strokeWidth={1.75}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <p className="max-w-4xl animate-fade-in pb-7 [animation-duration:300ms] text-base leading-relaxed text-white/70 md:text-lg">{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
