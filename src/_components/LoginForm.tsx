"use client";

import { useActionState } from "react";
import { credentialsSignInAction } from "~/server/actions/auth-actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    credentialsSignInAction,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {state?.error && (
        <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm">
          {state.error}
        </p>
      )}

      <input
        name="email"
        type="email"
        placeholder="E-mail"
        required
        className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        required
        className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
