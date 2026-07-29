"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { products, formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

function ProductCard({ productId, index }: { productId: string; index: number }) {
  const product = products.find((p) => p.id === productId)!;
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();

  return (
    <motion.div
      className="relative min-w-[280px] md:min-w-[320px] flex-shrink-0 group"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-sm bg-secondary-bg border border-white/5 group-hover:border-luxury-gold/30 transition-all duration-500"
        style={{ perspective: "1000px" }}
      >
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-secondary-bg via-primary-bg to-secondary-bg flex items-center justify-center relative">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <motion.span
                  className="text-6xl text-luxury-gold/30"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✦
                </motion.span>
              )}
            </div>
            <div className="absolute inset-0 transition-transform duration-300"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)"; }}
            />
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 35%, transparent 42%)", backgroundSize: "200% 100%" }}
              whileHover={{ backgroundPosition: ["-200% 0", "200% 0"], transition: { duration: 0.8, ease: "easeInOut" } }}
            />
            <div className="absolute top-3 right-3 glass rounded-full px-3 py-1">
              <span className="text-[10px] text-luxury-gold tracking-wider font-body">✓ QR Verified</span>
            </div>
            {product.badge && (
              <div className="absolute top-3 left-3 glass rounded-full px-3 py-1">
                <span className="text-[10px] text-luxury-gold tracking-wider font-body">{product.badge}</span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-5">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-heading text-lg text-white mb-1 group-hover:text-luxury-gold transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-luxury-gold text-sm font-heading mb-2">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-4 text-sm text-light-gray font-body">
            <span>{product.purity}</span>
            <span className="w-[1px] h-3 bg-white/10" />
            <span>{product.weight}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <motion.button
              onClick={() => { addToCart(product); showToast("Added to cart"); }}
              className="flex-1 py-3 rounded-sm bg-luxury-gold text-primary-bg text-xs tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              onClick={() => { toggleWishlist(product); showToast(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist"); }}
              className={`px-3 py-3 rounded-sm border text-xs tracking-widest uppercase font-body transition-all duration-500 ${
                isInWishlist(product.id)
                  ? "border-luxury-gold text-luxury-gold bg-luxury-gold/10"
                  : "border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isInWishlist(product.id) ? "♥" : "♡"}
            </motion.button>
          </div>
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
        <motion.div className="text-center mb-16" style={{ opacity: titleOpacity, y: titleY }}>
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">Featured Pieces</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Premium <span className="text-gradient">Selection</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.slice(0, 6).map((product, index) => (
            <div key={product.id} className="snap-start">
              <ProductCard productId={product.id} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
