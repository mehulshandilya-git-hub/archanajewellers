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
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="/logo.jpeg"
              alt="ARCHANA JEWELLERS"
              className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]"
            />
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            className="font-heading text-2xl md:text-4xl tracking-[0.3em] text-luxury-gold mt-8 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            ARCHANA JEWELLERS
          </motion.h1>

          {/* Drawing line */}
          <motion.div
            className="h-[1px] bg-luxury-gold mt-6"
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
