"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    title: "QR Verified Authentic Gold",
    desc: "Every piece comes with a unique QR code for instant authenticity verification, giving you complete peace of mind.",
    icon: "◈",
  },
  {
    title: "Premium Craftsmanship",
    desc: "Meticulously handcrafted by master artisans with generations of experience in fine jewelry making.",
    icon: "◇",
  },
  {
    title: "Trusted by Families",
    desc: "Generations of families in Bhagalpur, Patna and Varanasi have trusted us for their most precious moments.",
    icon: "♢",
  },
  {
    title: "Elegant Designs",
    desc: "Each piece blends traditional artistry with contemporary elegance for timeless appeal.",
    icon: "♠",
  },
  {
    title: "Excellent Customer Service",
    desc: "Personalized attention from selection to delivery, ensuring a seamless experience.",
    icon: "♤",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">
            Why ARCHANA JEWELERS
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Crafted With <span className="text-gradient">Integrity</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-gold rounded-sm p-6 md:p-8 text-center group hover:bg-luxury-gold/5 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="text-3xl text-luxury-gold mb-4"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-heading text-lg text-white mb-3 group-hover:text-luxury-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-light-gray text-sm leading-relaxed font-body font-light">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
