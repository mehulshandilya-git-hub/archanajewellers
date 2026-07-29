"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          style={{ y, opacity }}
        >
          {/* Left - Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src="/est-bgp.jpeg"
              alt="ARCHANA JEWELERS - Established in Bhagalpur"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-transparent" />
            {/* Glass overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 glass-gold m-4 rounded-sm">
              <p className="text-champagne text-xs tracking-wider font-body">
                Established in Bhagalpur
              </p>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.p>

            <motion.h2
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Craftsmanship Rooted in{" "}
              <span className="text-gradient">Trust</span>
            </motion.h2>

            <motion.p
              className="text-light-gray text-base md:text-lg leading-relaxed font-body font-light mb-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ARCHANA JEWELERS represents timeless craftsmanship and
              authentic quality through NKM Nosepins LLP. Every piece is
              crafted with precision and backed by QR authentication for
              complete customer confidence. Serving Bhagalpur, Patna and
              Varanasi with premium jewelry collections for every
              generation.
            </motion.p>

            {/* Animated Golden Divider */}
            <motion.div
              className="w-20 h-[1px] bg-luxury-gold"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
