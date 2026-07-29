"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-primary-bg"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Spark */}
          <motion.div
            className="w-2 h-2 rounded-full bg-luxury-gold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 3, 1],
              opacity: [0, 1, 0.6],
              boxShadow: [
                "0 0 0px rgba(212,175,55,0)",
                "0 0 80px rgba(212,175,55,0.6)",
                "0 0 20px rgba(212,175,55,0.3)",
              ],
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Logo */}
          <motion.h1
            className="font-heading text-3xl md:text-5xl tracking-[0.3em] text-luxury-gold mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            ARCHANA
          </motion.h1>
          <motion.p
            className="font-heading text-sm md:text-base tracking-[0.5em] text-champagne mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            JEWELERS
          </motion.p>

          {/* Drawing line */}
          <motion.div
            className="h-[1px] bg-luxury-gold mt-8"
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeInOut" }}
          />

          <motion.p
            className="text-[10px] tracking-[0.3em] text-light-gray mt-6 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
          >
            Timeless Elegance
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
