"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { title: "Design", desc: "Each piece begins with a hand-drawn vision, blending tradition with modern aesthetics." },
  { title: "Crafting", desc: "Master artisans shape precious metals with techniques perfected over generations." },
  { title: "Polishing", desc: "Every surface is meticulously polished to achieve a flawless, luminous finish." },
  { title: "Quality Inspection", desc: "Rigorous quality checks ensure every piece meets our exacting standards." },
  { title: "QR Authentication", desc: "Each piece receives a unique QR code, guaranteeing its authenticity and origin." },
  { title: "Ready For You", desc: "Your piece is carefully packaged and ready to become part of your story." },
];

export default function CraftsmanshipTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.05], [50, 0]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">
            Our Process
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            The Art of <span className="text-gradient">Creation</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-px" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-[19px] md:left-1/2 top-0 w-[1px] bg-luxury-gold md:-translate-x-px"
            style={{
              height: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
            }}
          />

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                className={`relative flex items-start gap-6 md:gap-0 mb-16 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Dot */}
                <motion.div
                  className="relative z-10 w-[39px] h-[39px] rounded-full flex items-center justify-center flex-shrink-0"
                  whileInView={{ scale: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="w-[9px] h-[9px] rounded-full bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  <div className="absolute inset-0 rounded-full border border-luxury-gold/20" />
                </motion.div>

                {/* Content */}
                <div
                  className={`flex-1 md:w-1/2 ${
                    isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="text-luxury-gold/40 text-xs tracking-wider font-body">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-white mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-light-gray text-sm leading-relaxed font-body font-light">
                    {step.desc}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
