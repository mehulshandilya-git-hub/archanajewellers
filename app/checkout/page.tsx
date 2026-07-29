"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { formatPrice } from "@/lib/products";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type PaymentMethod = "cod" | "card" | "upi";

export default function CheckoutPage() {
  const { state, cartTotal, clearCart } = useStore();
  const { user } = useAuth();
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  if (state.cart.length === 0 && !placing) {
    return (
      <main className="min-h-screen bg-primary-bg pt-24 pb-16 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-6xl mb-4 opacity-30">🛒</p>
          <h1 className="font-heading text-3xl text-white mb-4">Your cart is empty</h1>
          <Link href="/" className="text-luxury-gold hover:underline font-body">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  const placeOrder = async () => {
    if (!user) return;
    setPlacing(true);
    const orderId = crypto.randomUUID();
    const order = {
      id: orderId,
      items: state.cart,
      total: cartTotal,
      paymentMethod: method,
      upiId: "msarchanajewellers.easypay@icici",
      customer: { name, phone, address, email: user.email },
      status: method === "cod" ? "confirmed" : "payment-pending",
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, "orders", orderId), order);
      clearCart();
      router.push(`/order-confirmed?id=${orderId}`);
    } catch {
      setPlacing(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-bg pt-24 md:pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-xs text-light-gray font-body mb-6">
          <Link href="/cart" className="hover:text-luxury-gold transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-luxury-gold">Checkout</span>
        </div>

        <motion.h1
          className="font-heading text-4xl md:text-5xl text-white mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Checkout
        </motion.h1>

        {!user ? (
          <div className="text-center py-16 glass rounded-sm">
            <p className="text-light-gray font-body mb-4">Please sign in to place your order</p>
            <Link href="/" className="text-luxury-gold hover:underline font-body">Go to Login</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left: Form */}
            <div className="md:col-span-3 space-y-6">
              {/* Delivery Details */}
              <div className="glass rounded-sm p-6">
                <h2 className="font-heading text-xl text-white mb-4">Delivery Details</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-primary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-primary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                  />
                  <textarea
                    placeholder="Full Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-primary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50 resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass rounded-sm p-6">
                <h2 className="font-heading text-xl text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "upi" as PaymentMethod, label: "UPI", desc: "Pay via any UPI app" },
                    { id: "card" as PaymentMethod, label: "Card", desc: "Credit / Debit Card" },
                    { id: "cod" as PaymentMethod, label: "Cash on Delivery", desc: "Pay when you receive" },
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-4 p-4 rounded-sm border cursor-pointer transition-all ${
                        method === pm.id
                          ? "border-luxury-gold bg-luxury-gold/5"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.id}
                        checked={method === pm.id}
                        onChange={() => setMethod(pm.id)}
                        className="accent-luxury-gold"
                      />
                      <div>
                        <p className="text-white text-sm font-heading">{pm.label}</p>
                        <p className="text-light-gray text-xs font-body">{pm.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {method === "upi" && (
                  <div className="mt-4 p-4 bg-primary-bg rounded-sm border border-white/5">
                    <p className="text-light-gray text-xs font-body mb-2">Pay to UPI ID:</p>
                    <p className="text-luxury-gold font-heading text-lg tracking-wide">msarchanajewellers.easypay@icici</p>
                    <p className="text-light-gray text-xs mt-2 font-body">Open any UPI app (Google Pay, PhonePe, Paytm) and send payment to this ID. After payment, click Place Order.</p>
                  </div>
                )}

                {method === "card" && (
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 bg-primary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-1/2 px-4 py-3 bg-primary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-1/2 px-4 py-3 bg-primary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                      />
                    </div>
                    <p className="text-light-gray text-xs font-body">Card payment is simulated. Your order will be confirmed and we will contact you for payment.</p>
                  </div>
                )}
              </div>

              <button
                onClick={placeOrder}
                disabled={placing || !name || !phone || !address}
                className="w-full py-4 bg-luxury-gold text-primary-bg rounded-sm text-sm tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>
            </div>

            {/* Right: Order Summary */}
            <div className="md:col-span-2">
              <div className="glass rounded-sm p-6 sticky top-28">
                <h2 className="font-heading text-lg text-white mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {state.cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-light-gray font-body truncate pr-2">
                        {item.product.name} <span className="text-white/40">×{item.quantity}</span>
                      </span>
                      <span className="text-white font-body whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-white font-heading">Total</span>
                  <span className="text-luxury-gold font-heading text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
