"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const products = [
  {
    name: "Gold Nosepin Elegance",
    purity: "22K Gold",
    weight: "2.5g",
    image: "✦",
  },
  {
    name: "Bridal Gold Necklace",
    purity: "24K Gold",
    weight: "35.0g",
    image: "✦",
  },
  {
    name: "Diamond Gold Ring",
    purity: "18K Gold",
    weight: "6.2g",
    image: "✦",
  },
  {
    name: "Gold Bangle Set",
    purity: "22K Gold",
    weight: "28.0g",
    image: "✦",
  },
  {
    name: "Temple Earrings",
    purity: "22K Gold",
    weight: "12.8g",
    image: "✦",
  },
  {
    name: "Daily Wear Chain",
    purity: "18K Gold",
    weight: "8.5g",
    image: "✦",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="relative min-w-[280px] md:min-w-[320px] flex-shrink-0 group"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="relative overflow-hidden rounded-sm bg-secondary-bg border border-white/5 group-hover:border-luxury-gold/30 transition-all duration-500"
        style={{ perspective: "1000px" }}
      >
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-secondary-bg via-primary-bg to-secondary-bg flex items-center justify-center">
            <motion.span
              className="text-6xl text-luxury-gold/30"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {product.image}
            </motion.span>
          </div>

          {/* 3D Hover lift */}
          <div
            className="absolute inset-0 transition-transform duration-300"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              e.currentTarget.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
            }}
          />

          {/* Glass shine overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 35%, transparent 42%)",
              backgroundSize: "200% 100%",
            }}
            whileHover={{
              backgroundPosition: ["-200% 0", "200% 0"],
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          />

          {/* QR Badge */}
          <div className="absolute top-3 right-3 glass rounded-full px-3 py-1">
            <span className="text-[10px] text-luxury-gold tracking-wider font-body">
              ✓ QR Verified
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-heading text-lg text-white mb-2 group-hover:text-luxury-gold transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-light-gray font-body">
            <span>{product.purity}</span>
            <span className="w-[1px] h-3 bg-white/10" />
            <span>{product.weight}</span>
          </div>
          <motion.button
            className="mt-4 w-full py-3 rounded-sm border border-luxury-gold/30 text-luxury-gold text-xs tracking-widest uppercase font-body hover:bg-luxury-gold hover:text-primary-bg transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enquire Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
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
            Featured Pieces
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Premium <span className="text-gradient">Selection</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        {/* Horizontal carousel */}
        <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <div key={product.name} className="snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
