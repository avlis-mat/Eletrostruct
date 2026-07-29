// src/app/login/page.tsx
import { redirect } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { GoogleSignInButton } from "~/_components/GoogleSignInButton";
import { auth } from "~/server/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="--background min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-32">
        <div className="border-border/40 bg-background/60 w-full max-w-sm rounded-lg border p-8 backdrop-blur">
          <h1 className="text-foreground text-center text-2xl font-bold">
            <span className="text-green-400">{"{"}</span>
            Entrar
            <span className="text-green-400">{"}"}</span>
          </h1>
          <p className="text-muted-foreground mt-2 mb-6 text-center text-sm">
            Acesse sua conta Eletrostruct
          </p>

          <form action="/api/login" method="post" className="mb-6 space-y-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Sua senha"
                required
                className="border-border bg-background text-foreground rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="border-border/40 mb-4 border-t pt-4">
            <p className="text-muted-foreground mb-3 text-center text-sm">
              Ou continue com Google
            </p>
            <GoogleSignInButton />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
