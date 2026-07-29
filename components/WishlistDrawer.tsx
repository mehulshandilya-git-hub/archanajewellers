"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export default function WishlistDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, toggleWishlist, addToCart } = useStore();

  const handleAddToCart = (product: (typeof state.wishlist)[0]) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9980]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-secondary-bg border-l border-luxury-gold/10 z-[9981] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-heading text-2xl text-white">
                Wishlist{" "}
                <span className="text-luxury-gold text-lg">
                  ({state.wishlist.length})
                </span>
              </h2>
              <button
                onClick={onClose}
                className="text-light-gray hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {state.wishlist.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-4 opacity-30">♡</p>
                  <p className="text-light-gray font-body">
                    Your wishlist is empty
                  </p>
                </div>
              ) : (
                state.wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="glass rounded-sm p-4 flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-luxury-gold/10 to-transparent flex items-center justify-center flex-shrink-0">
                      <span className="text-xl text-luxury-gold/40">✦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-heading truncate">
                        {product.name}
                      </h4>
                      <p className="text-luxury-gold text-xs mt-1 font-body">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-light-gray text-xs mt-0.5 font-body">
                        {product.purity} · {product.weight}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-1.5 bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold text-xs rounded-sm hover:bg-luxury-gold hover:text-primary-bg transition-all"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="text-light-gray hover:text-red-400 transition-colors text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
