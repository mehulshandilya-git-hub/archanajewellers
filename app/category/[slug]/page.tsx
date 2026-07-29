"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  products,
  getCategoryName,
  categorySlugToName,
  nosepinSubcategories,
  noseRingsSubcategories,
  getProductsBySubcategory,
  formatPrice,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

export default function CategoryPage() {
  const { slug } = useParams();
  const categoryName = getCategoryName(slug as string);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const categoryProducts = products.filter((p) => p.category === categoryName);
  const isNosepins = slug === "gold-nosepins";
  const isNoseRings = slug === "nose-rings";
  const hasSubcategories = isNosepins || isNoseRings;
  const subcategories = isNosepins ? nosepinSubcategories : isNoseRings ? noseRingsSubcategories : [];
  const filtered =
    hasSubcategories && activeSub
      ? getProductsBySubcategory(activeSub)
      : categoryProducts;

  const allSlugs = Object.keys(categorySlugToName);
  const currentIndex = allSlugs.indexOf(slug as string);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  if (!categoryName || categoryProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4 opacity-30">✦</p>
          <h1 className="font-heading text-3xl text-white mb-4">
            Category Not Found
          </h1>
          <Link href="/" className="text-luxury-gold hover:underline font-body">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-primary-bg pt-24 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb + category nav */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-light-gray font-body mb-2">
              <Link
                href="/"
                className="hover:text-luxury-gold transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-luxury-gold">{categoryName}</span>
              {activeSub && (
                <>
                  <span>/</span>
                  <span className="text-white/60">{activeSub}</span>
                </>
              )}
            </div>
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeSub ? (
                <span className="text-gradient">{activeSub}</span>
              ) : (
                <span className="text-gradient">{categoryName}</span>
              )}
            </motion.h1>
            <p className="text-light-gray text-sm mt-2 font-body">
              {activeSub
                ? `${filtered.length} design${filtered.length === 1 ? "" : "s"} available`
                : hasSubcategories
                  ? `${subcategories.length} subcategories`
                  : `${categoryProducts.length} design${categoryProducts.length === 1 ? "" : "s"} available`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {prevSlug && (
              <Link
                href={`/category/${prevSlug}`}
                className="px-4 py-2 glass rounded-sm text-light-gray hover:text-luxury-gold text-xs tracking-wider font-body transition-all"
              >
                ← {getCategoryName(prevSlug)}
              </Link>
            )}
            {nextSlug && (
              <Link
                href={`/category/${nextSlug}`}
                className="px-4 py-2 glass rounded-sm text-light-gray hover:text-luxury-gold text-xs tracking-wider font-body transition-all"
              >
                {getCategoryName(nextSlug)} →
              </Link>
            )}
          </div>
        </div>

        {/* Subcategory grid */}
        {hasSubcategories && !activeSub && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {subcategories.map((sub, i) => {
              const subProducts = getProductsBySubcategory(sub.name);
              return (
                <motion.button
                  key={sub.slug}
                  onClick={() => setActiveSub(sub.name)}
                  className="group text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <div className="aspect-square rounded-sm bg-gradient-to-br from-secondary-bg via-primary-bg to-secondary-bg border border-white/5 group-hover:border-luxury-gold/30 flex items-center justify-center transition-all duration-500 mb-3">
                    <motion.span
                      className="text-5xl text-luxury-gold/20 group-hover:text-luxury-gold/40 transition-all duration-500"
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✦
                    </motion.span>
                    <span className="absolute bottom-3 right-3 bg-luxury-gold text-primary-bg text-[10px] font-bold px-2 py-0.5 rounded-sm font-body">
                      {subProducts.length}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm md:text-base text-white group-hover:text-luxury-gold transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-light-gray text-xs mt-1 font-body leading-relaxed">
                    {sub.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Active subcategory header */}
        {hasSubcategories && activeSub && (
          <div className="mb-8">
            <button
              onClick={() => setActiveSub(null)}
              className="text-light-gray hover:text-luxury-gold text-xs tracking-wider font-body transition-colors flex items-center gap-1"
            >
              ← Back to all subcategories
            </button>
          </div>
        )}

        {/* Product grid - only show for categories without subcategories, or when a subcategory is active */}
        {(!hasSubcategories || activeSub) && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSub || "all"}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="relative overflow-hidden rounded-sm bg-secondary-bg border border-white/5 group-hover:border-luxury-gold/30 transition-all duration-500">
                    <Link href={`/product/${product.id}`}>
                      <div className="aspect-square bg-gradient-to-br from-secondary-bg via-primary-bg to-secondary-bg flex items-center justify-center">
                        <motion.span
                          className="text-5xl text-luxury-gold/20 group-hover:text-luxury-gold/40 transition-all duration-500"
                          animate={{ opacity: [0.15, 0.35, 0.15] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          ✦
                        </motion.span>
                      </div>
                    </Link>

                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 glass text-[10px] text-luxury-gold rounded-sm font-body">
                        {product.badge}
                      </span>
                    )}

                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => {
                          toggleWishlist(product);
                          showToast(
                            isInWishlist(product.id)
                              ? "Removed"
                              : "Added to wishlist"
                          );
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                          isInWishlist(product.id)
                            ? "bg-luxury-gold text-primary-bg"
                            : "glass text-light-gray hover:text-luxury-gold"
                        }`}
                      >
                        {isInWishlist(product.id) ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-heading text-sm md:text-base text-white truncate group-hover:text-luxury-gold transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-light-gray font-body">
                        <span>{product.purity}</span>
                        <span className="w-[1px] h-2 bg-white/10" />
                        <span>{product.weight}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-heading text-base text-luxury-gold">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <motion.button
                        onClick={() => {
                          addToCart(product);
                          showToast("Added to cart");
                        }}
                        className="mt-3 w-full py-2.5 rounded-sm bg-luxury-gold text-primary-bg text-[10px] tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
