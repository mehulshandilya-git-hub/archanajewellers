"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCategorySlug } from "@/lib/products";

const collections = [
  {
    title: "Nosepins",
    slug: getCategorySlug("Gold Nosepins"),
    span: "md:col-span-2 md:row-span-2",
    gradient: "from-amber-900/20 via-amber-700/10 to-transparent",
  },
  {
    title: "Bridal Jewellery",
    slug: getCategorySlug("Bridal Jewellery"),
    span: "md:col-span-2",
    gradient: "from-rose-900/20 via-rose-700/10 to-transparent",
  },
  {
    title: "Gold Necklaces",
    slug: getCategorySlug("Gold Necklaces"),
    span: "",
    gradient: "from-yellow-900/20 via-yellow-700/10 to-transparent",
  },
  {
    title: "Gold Rings",
    slug: getCategorySlug("Gold Rings"),
    span: "",
    gradient: "from-orange-900/20 via-orange-700/10 to-transparent",
  },
  {
    title: "Gold Bangles",
    slug: getCategorySlug("Gold Bangles"),
    span: "md:col-span-2",
    gradient: "from-amber-900/20 via-amber-600/10 to-transparent",
  },
  {
    title: "Gold Earrings",
    slug: getCategorySlug("Gold Earrings"),
    span: "",
    gradient: "from-yellow-900/20 via-yellow-600/10 to-transparent",
  },
  {
    title: "Temple Jewellery",
    slug: getCategorySlug("Temple Jewellery"),
    span: "",
    gradient: "from-red-900/20 via-red-700/10 to-transparent",
  },
  {
    title: "Daily Wear Collection",
    slug: getCategorySlug("Daily Wear"),
    span: "md:col-span-2",
    gradient: "from-stone-900/20 via-stone-700/10 to-transparent",
  },
];

function CollectionCard({
  item,
  index,
}: {
  item: (typeof collections)[0];
  index: number;
}) {
  return (
    <Link href={`/category/${item.slug}`} className={`relative group overflow-hidden rounded-sm ${item.span} min-h-[200px] md:min-h-[280px]`}>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
        <div className="absolute inset-0 bg-secondary-bg/60 backdrop-blur-[1px]" />
        <div className="absolute top-0 left-0 w-12 h-[1px] bg-luxury-gold/40 group-hover:w-full transition-all duration-700" />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
          <h3 className="font-heading text-xl md:text-2xl lg:text-3xl text-white group-hover:text-luxury-gold transition-colors duration-500">
            {item.title}
          </h3>
          <motion.div
            className="mt-3"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block text-xs tracking-widest uppercase text-luxury-gold border border-luxury-gold/30 px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              Shop Now →
            </span>
          </motion.div>
        </div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.1)" }}
        />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.3) 45%, transparent 50%)",
            backgroundSize: "200% 100%",
          }}
          whileHover={{
            backgroundPosition: ["-200% 0", "200% 0"],
            transition: { duration: 1, ease: "easeInOut" },
          }}
        />
      </motion.div>
    </Link>
  );
}

export default function Collections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section id="collections" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" style={{ opacity: titleOpacity, y: titleY }}>
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">Browse By Category</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Our <span className="text-gradient">Collections</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collections.map((item, index) => (
            <CollectionCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
