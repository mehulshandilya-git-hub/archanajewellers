"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Bridal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background with slow zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a0a0a]" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

      {/* Golden corners */}
      <div className="absolute top-12 left-12 w-16 h-[1px] bg-luxury-gold/40" />
      <div className="absolute top-12 left-12 w-[1px] h-16 bg-luxury-gold/40" />
      <div className="absolute top-12 right-12 w-16 h-[1px] bg-luxury-gold/40" />
      <div className="absolute top-12 right-12 w-[1px] h-16 bg-luxury-gold/40" />
      <div className="absolute bottom-12 left-12 w-16 h-[1px] bg-luxury-gold/40" />
      <div className="absolute bottom-12 left-12 w-[1px] h-16 bg-luxury-gold/40" />
      <div className="absolute bottom-12 right-12 w-16 h-[1px] bg-luxury-gold/40" />
      <div className="absolute bottom-12 right-12 w-[1px] h-16 bg-luxury-gold/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.p
          className="text-luxury-gold tracking-[0.4em] text-xs md:text-sm uppercase mb-6 font-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Bridal Collection
        </motion.p>

        <motion.h2
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Adorn Your
          <br />
          <span className="text-gradient">Forever</span>
        </motion.h2>

        <motion.p
          className="text-light-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-body font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our exclusive bridal collection, crafted to make
          your special day truly unforgettable.
        </motion.p>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-luxury-gold text-primary-bg rounded-full text-sm tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Bridal Consultation
        </motion.a>
      </motion.div>
    </section>
  );
}
