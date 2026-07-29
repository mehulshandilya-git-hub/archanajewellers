"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { loginEmail, signupEmail, loginGoogle, user, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await loginEmail(email, password);
      } else {
        await signupEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="w-full max-w-md bg-primary-bg border border-white/10 rounded-sm p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {user ? (
                <div className="text-center">
                  <p className="text-luxury-gold font-heading text-xl mb-2">Signed in as</p>
                  <p className="text-white mb-6">{user.email}</p>
                  <button
                    onClick={async () => { await logout(); onClose(); }}
                    className="w-full py-3 rounded-sm border border-luxury-gold/40 text-luxury-gold text-sm tracking-wider hover:bg-luxury-gold/10 transition-all font-body"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-heading text-2xl text-white">
                      {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-light-gray text-sm mt-2 font-body">
                      {mode === "login" ? "Sign in to your account" : "Register a new account"}
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs mb-4 font-body text-center">{error}</p>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-secondary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 bg-secondary-bg border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors font-body placeholder:text-light-gray/50"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-sm bg-luxury-gold text-primary-bg text-sm tracking-wider font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all font-body"
                    >
                      {mode === "login" ? "Sign In" : "Sign Up"}
                    </button>
                  </form>

                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-[1px] bg-white/10" />
                    <span className="text-light-gray text-xs font-body">OR</span>
                    <div className="flex-1 h-[1px] bg-white/10" />
                  </div>

                  <button
                    onClick={handleGoogle}
                    className="w-full py-3 rounded-sm border border-white/20 text-white text-sm tracking-wider hover:border-luxury-gold/40 hover:text-luxury-gold transition-all font-body flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </button>

                  <p className="text-center mt-6 text-xs text-light-gray font-body">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                      className="text-luxury-gold hover:underline"
                    >
                      {mode === "login" ? "Sign Up" : "Sign In"}
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
