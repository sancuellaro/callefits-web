import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { BRAND_CONFIG } from "@/config/brand.config";

export const metadata: Metadata = {
  title: "Panel de Control — CALLEFITS BY DANNI",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo tipográfico */}
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="text-lg font-bold tracking-tight text-foreground">
              CALLEFITS
            </span>
            <span className="text-[9px] font-light uppercase tracking-[0.28em] text-foreground/50">
              BY DANNI
            </span>
          </div>
        </div>

        {/* Tarjeta de acceso */}
        <div className="rounded-[var(--radius)] border border-black/5 bg-surface p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
          <div className="mb-6 text-center">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              ACCESO RESTRINGIDO
            </p>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              PANEL DE CONTROL EXCLUSIVO
            </h1>
            <p className="mt-1 text-xs text-neutral-400">{BRAND_CONFIG.name}</p>
          </div>

          <LoginForm />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] text-neutral-400">
          Área privada. El acceso no autorizado está prohibido.
        </p>
      </div>
    </div>
  );
}
