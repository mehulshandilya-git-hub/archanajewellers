"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatPrice } from "@/lib/products";

function OrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    if (!orderId) return;
    getDoc(doc(db, "orders", orderId)).then((snap) => {
      if (snap.exists()) setTotal(snap.data().total);
    });
  }, [orderId]);

  return (
    <motion.div
      className="text-center max-w-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-6xl mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        ✦
      </motion.div>
      <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
        Ordered! Thanks for choosing us!
      </h1>
      <p className="text-light-gray font-body mb-2">
        Your order has been placed successfully.
      </p>
      {orderId && (
        <p className="text-xs text-light-gray/50 font-body mb-1">
          Order ID: {orderId.slice(0, 8)}...
        </p>
      )}
      {total !== null && (
        <p className="text-luxury-gold font-heading text-xl mb-6">
          Total: {formatPrice(total)}
        </p>
      )}
      <p className="text-light-gray text-sm font-body mb-8">
        We will contact you shortly to confirm your order.
      </p>
      <Link
        href="/"
        className="inline-block px-10 py-4 bg-luxury-gold text-primary-bg rounded-sm text-sm tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <main className="min-h-screen bg-primary-bg flex items-center justify-center px-4">
      <Suspense fallback={<p className="text-light-gray font-body">Loading...</p>}>
        <OrderContent />
      </Suspense>
    </main>
  );
}
