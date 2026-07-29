"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginEmail: (email: string, password: string) => Promise<void>;
  signupEmail: (email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) { setLoading(false); return; }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const noop = async () => { throw new Error("Firebase not configured."); };

  const loginEmail = auth ? async (e: string, p: string) => { await signInWithEmailAndPassword(auth as any, e, p); } : noop;
  const signupEmail = auth ? async (e: string, p: string) => { await createUserWithEmailAndPassword(auth as any, e, p); } : noop;
  const loginGoogle = auth ? async () => { await signInWithPopup(auth as any, new GoogleAuthProvider()); } : noop;
  const logout = auth ? async () => { await signOut(auth as any); } : noop;

  return (
    <AuthContext.Provider value={{ user, loading, loginEmail, signupEmail, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
