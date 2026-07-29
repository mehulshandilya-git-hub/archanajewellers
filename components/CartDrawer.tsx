"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/products";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useStore();
  const router = useRouter();

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
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-heading text-2xl text-white">
                Cart{" "}
                <span className="text-luxury-gold text-lg">
                  ({state.cart.length})
                </span>
              </h2>
              <button
                onClick={onClose}
                className="text-light-gray hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {state.cart.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-4xl mb-4 opacity-30">🛒</p>
                  <p className="text-light-gray font-body">Your cart is empty</p>
                </div>
              ) : (
                state.cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="glass rounded-sm p-4 flex gap-4"
                  >
                    <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-luxury-gold/10 to-transparent flex items-center justify-center flex-shrink-0">
                      <span className="text-xl text-luxury-gold/40">✦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-heading truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-luxury-gold text-xs mt-1 font-body">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 rounded-full border border-white/10 text-light-gray hover:text-white hover:border-luxury-gold/30 transition-all text-sm flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-white text-sm font-body">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 rounded-full border border-white/10 text-light-gray hover:text-white hover:border-luxury-gold/30 transition-all text-sm flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-light-gray hover:text-red-400 transition-colors text-xs self-start"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {state.cart.length > 0 && (
              <div className="border-t border-white/5 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-light-gray text-sm font-body">Total</span>
                  <span className="font-heading text-xl text-luxury-gold">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/checkout");
                  }}
                  className="w-full py-4 bg-luxury-gold text-primary-bg rounded-full text-sm tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                  className="w-full py-3 border border-white/10 text-light-gray hover:text-white rounded-full text-xs tracking-widest uppercase font-body transition-all"
                >
                  Proceed to Enquiry
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
