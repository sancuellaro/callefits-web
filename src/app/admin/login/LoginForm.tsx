"use client";

import { useActionState } from "react";
import { loginAdminAction } from "../actions";
import { Loader2 } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/env-check";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, {
    success: false,
    message: "",
  });

  const isDemo = !isSupabaseConfigured();

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={isDemo ? "admin@callefits.com" : ""}
          placeholder="admin@callefits.com"
          className="flex h-11 w-full rounded-[var(--radius)] border border-black/10 bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          defaultValue={isDemo ? "Callefits2026!" : ""}
          placeholder="••••••••"
          className="flex h-11 w-full rounded-[var(--radius)] border border-black/10 bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
      </div>

      {/* Error message */}
      {state.message && !state.success && (
        <p className="rounded-[var(--radius)] bg-red-50 px-3 py-2 text-xs text-red-600">
          {state.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-brand-primary text-xs font-semibold uppercase tracking-wider text-brand-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Verificando credenciales...
          </>
        ) : (
          "INICIAR SESIÓN"
        )}
      </button>

      {/* Nota de modo demo */}
      {isDemo && (
        <p className="rounded-[var(--radius)] border border-black/8 bg-surface-muted px-3 py-2 text-center text-[11px] text-neutral-500">
          🛠 <strong>Modo Demo:</strong> Supabase no está configurado.
          <br />
          Credenciales precargadas para desarrollo local.
        </p>
      )}
    </form>
  );
}
