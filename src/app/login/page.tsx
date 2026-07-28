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

          <GoogleSignInButton />
        </div>
      </div>

      <Footer />
    </main>
  );
}
