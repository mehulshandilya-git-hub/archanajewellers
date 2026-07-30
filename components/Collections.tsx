"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCategorySlug } from "@/lib/products";

const collections = [
  {
    title: "Nosepins",
    slug: getCategorySlug("Nosepins"),
    span: "md:col-span-2 md:row-span-2",
    image: "/nosepins/nosepins-category.jpeg",
  },
  {
    title: "Earrings",
    slug: getCategorySlug("Earrings"),
    span: "md:col-span-2",
    image: "/earrings/earrings-category.jpeg",
  },
  {
    title: "Nose Rings",
    slug: getCategorySlug("Nose Rings"),
    span: "",
    image: "/nose-rings/nose-rings-category.jpeg",
  },
  {
    title: "Fancy Tops",
    slug: getCategorySlug("Fancy Tops"),
    span: "",
    image: "/fancy-tops/fancy-tops-category.jpeg",
  },
  {
    title: "Rings",
    slug: getCategorySlug("Rings"),
    span: "",
  },
  {
    title: "Lightweight Jewellery",
    slug: getCategorySlug("Lightweight Jewellery"),
    span: "",
  },
  {
    title: "Pendant",
    slug: getCategorySlug("Pendant"),
    span: "",
  },
  {
    title: "Ear Studs for Men",
    slug: getCategorySlug("Ear Studs for Men"),
    span: "md:col-span-2",
  },
];

const gradients = [
  "from-amber-900/20 via-amber-700/10 to-transparent",
  "from-yellow-900/20 via-yellow-600/10 to-transparent",
  "from-amber-900/20 via-amber-700/10 to-transparent",
  "from-purple-900/20 via-purple-700/10 to-transparent",
  "from-orange-900/20 via-orange-700/10 to-transparent",
  "from-stone-900/20 via-stone-700/10 to-transparent",
  "from-red-900/20 via-red-700/10 to-transparent",
  "from-blue-900/20 via-blue-700/10 to-transparent",
];

function CollectionCard({
  item,
  gradient,
  index,
}: {
  item: (typeof collections)[0] & { image?: string };
  gradient: string;
  index: number;
}) {
  return (
    <Link
      href={`/category/${item.slug}`}
      className={`relative group overflow-hidden rounded-sm ${item.span} min-h-[200px] md:min-h-[280px] block`}
      style={item.image ? { backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      {!item.image && <div className="absolute inset-0 bg-secondary-bg/80" />}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className="absolute top-0 left-0 w-12 h-[1px] bg-luxury-gold/40 group-hover:w-full transition-all duration-700" />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
          <h3 className="font-heading text-xl md:text-2xl lg:text-3xl text-white group-hover:text-luxury-gold transition-colors duration-500">
            {item.title}
          </h3>
          <motion.div className="mt-3" initial={{ opacity: 0, y: 10 }} whileHover={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs tracking-widest uppercase text-luxury-gold border border-luxury-gold/30 px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              Shop Now →
            </span>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.1)" }} />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-30" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.3) 45%, transparent 50%)", backgroundSize: "200% 100%" }} whileHover={{ backgroundPosition: ["-200% 0", "200% 0"], transition: { duration: 1, ease: "easeInOut" } }} />
      </motion.div>
    </Link>
  );
}

export default function Collections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section id="collections" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" style={{ opacity: titleOpacity, y: titleY }}>
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">Browse By Category</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">Our <span className="text-gradient">Collections</span></h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collections.map((item, index) => (
            <CollectionCard key={item.title} item={item} gradient={gradients[index]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
