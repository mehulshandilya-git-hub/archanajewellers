"use client";

import { ReactNode } from "react";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/components/Toast";
import EcomNav from "@/components/EcomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <ToastProvider>
          <EcomNav />
          {children}
          <WhatsAppButton />
        </ToastProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
