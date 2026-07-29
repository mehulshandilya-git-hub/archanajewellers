"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    text: "Nice collection for girls in affordable price.",
    author: "Priya S.",
    rating: 5,
  },
  {
    text: "Absolutely loved this jewellery piece. The QR verification gives such peace of mind.",
    author: "Ananya K.",
    rating: 5,
  },
  {
    text: "Best jeweller in Bhagalpur for authentic gold. Trusted for generations.",
    author: "Ravi M.",
    rating: 5,
  },
  {
    text: "The bridal collection is stunning. Found the perfect piece for my wedding.",
    author: "Neha G.",
    rating: 5,
  },
  {
    text: "Excellent craftsmanship and very reasonable pricing for such quality.",
    author: "Vikram P.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Voices of{" "}
            <span className="text-gradient">Trust</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        {/* Auto-scrolling cards */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="glass-gold rounded-sm p-6 md:p-8 min-w-[300px] md:min-w-[380px] flex-shrink-0"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-luxury-gold text-sm">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-white text-base leading-relaxed mb-6 font-body font-light italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                    <span className="text-xs text-luxury-gold font-heading">
                      {t.author[0]}
                    </span>
                  </div>
                  <span className="text-light-gray text-sm font-body">
                    {t.author}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary-bg to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary-bg to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
