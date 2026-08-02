import { redirect } from "next/navigation";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { GoogleSignInButton } from "~/_components/GoogleSignInButton";
import { auth } from "~/server/auth";
import { credentialsSignInAction } from "~/server/actions/auth-actions";
import { LoginForm } from "~/_components/LoginForm";

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

          <LoginForm />

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
