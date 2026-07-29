"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductById, formatPrice, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id as string);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4 opacity-30">✦</p>
          <h1 className="font-heading text-3xl text-white mb-4">Product Not Found</h1>
          <Link href="/" className="text-luxury-gold hover:underline font-body">Return Home</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-primary-bg pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-2 text-xs text-light-gray font-body mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-luxury-gold">{product.category}</span>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Image */}
          <motion.div
            className="aspect-square rounded-sm bg-gradient-to-br from-secondary-bg via-primary-bg to-secondary-bg flex items-center justify-center border border-white/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl text-luxury-gold/20"
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.div>
              {product.badge && (
                <span className="inline-block mt-4 px-4 py-1.5 bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs tracking-wider rounded-sm font-body">
                  {product.badge}
                </span>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-luxury-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
              {product.category}
            </p>
            <h1 className="font-heading text-3xl md:text-5xl text-white leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-heading text-3xl text-luxury-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-light-gray text-lg line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 glass text-light-gray text-xs rounded-sm font-body">{product.purity}</span>
              <span className="px-3 py-1.5 glass text-light-gray text-xs rounded-sm font-body">{product.weight}</span>
              <span className="px-3 py-1.5 glass text-luxury-gold text-xs rounded-sm font-body">✓ QR Verified</span>
            </div>

            <p className="text-light-gray text-sm leading-relaxed mb-6 font-body font-light">
              {product.description}
            </p>

            {/* Details */}
            <div className="mb-8">
              <h3 className="text-white text-sm tracking-widest uppercase mb-3 font-body">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="text-light-gray text-sm font-body font-light flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-luxury-gold/60" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={() => { addToCart(product); showToast("Added to cart"); }}
                className="flex-1 py-4 bg-luxury-gold text-primary-bg rounded-full text-sm tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={() => { toggleWishlist(product); showToast(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist"); }}
                className={`px-8 py-4 rounded-full text-sm tracking-widest uppercase font-body border transition-all duration-500 ${
                  isInWishlist(product.id)
                    ? "border-luxury-gold text-luxury-gold bg-luxury-gold/10"
                    : "border-white/10 text-light-gray hover:border-luxury-gold/30 hover:text-luxury-gold"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isInWishlist(product.id) ? "♥ Wishlisted" : "♡ Wishlist"}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl text-white mb-8">
              More in <span className="text-gradient">{product.category}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="aspect-square rounded-sm bg-gradient-to-br from-secondary-bg to-primary-bg flex items-center justify-center border border-white/5 group-hover:border-luxury-gold/30 transition-all duration-500 mb-3">
                    <span className="text-3xl text-luxury-gold/20 group-hover:text-luxury-gold/40 transition-all duration-500">✦</span>
                  </div>
                  <h3 className="text-white text-sm font-heading truncate group-hover:text-luxury-gold transition-colors">{p.name}</h3>
                  <p className="text-luxury-gold text-xs mt-1 font-body">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
