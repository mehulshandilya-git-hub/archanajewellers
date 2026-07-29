"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";

export default function EcomNav() {
  const { cartCount, wishlistCount } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[9970] transition-all duration-500 ${
          scrolled ? "bg-primary-bg/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="font-heading text-xl md:text-2xl text-luxury-gold tracking-wider">
            ARCHANA
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-light-gray hover:text-luxury-gold text-sm tracking-wider transition-colors font-body">Home</a>
            <a href="#collections" className="text-light-gray hover:text-luxury-gold text-sm tracking-wider transition-colors font-body">Collections</a>
            <a href="/category/gold-nosepins" className="text-luxury-gold text-sm tracking-wider transition-colors font-body">Shop</a>
            <a href="#store" className="text-light-gray hover:text-luxury-gold text-sm tracking-wider transition-colors font-body">Store</a>
            <a href="#contact" className="text-light-gray hover:text-luxury-gold text-sm tracking-wider transition-colors font-body">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative p-2 text-light-gray hover:text-luxury-gold transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-luxury-gold text-primary-bg text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-light-gray hover:text-luxury-gold transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-luxury-gold text-primary-bg text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
