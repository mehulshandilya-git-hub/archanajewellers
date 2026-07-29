"use client";

import { ReactNode } from "react";
import { StoreProvider } from "@/lib/store";
import { ToastProvider } from "@/components/Toast";
import EcomNav from "@/components/EcomNav";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <ToastProvider>
        <EcomNav />
        {children}
      </ToastProvider>
    </StoreProvider>
  );
}
