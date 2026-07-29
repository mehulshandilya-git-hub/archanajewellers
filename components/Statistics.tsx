"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

const stats = [
  { value: "1000+", label: "Happy Customers", suffix: "+" },
  { value: "500+", label: "Exclusive Designs", suffix: "+" },
  { value: "3", label: "Cities Served", suffix: "" },
  { value: "100%", label: "Authentic Gold", suffix: "%" },
];

function Counter({ value, label, suffix }: { value: string; label: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numValue = parseInt(value);
  const hasPlus = value.endsWith("+");

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="font-heading text-5xl md:text-6xl lg:text-7xl text-luxury-gold mb-3"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {isInView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.span>
        ) : (
          "0"
        )}
      </motion.div>
      <p className="text-light-gray text-sm md:text-base tracking-wider uppercase font-body">
        {label}
      </p>
    </motion.div>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative"
        style={{ opacity }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <Counter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
