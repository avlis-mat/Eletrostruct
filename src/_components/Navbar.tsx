import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search, User, UserPlus, ShoppingCart, LogOut } from "lucide-react";
import { auth, signOut } from "~/server/auth";
import { SignOutAction } from "~/server/actions/auth-actions";
export async function Navbar() {
  const session = await auth();
  const headersModule = await import("next/headers");
  const devUser = (await headersModule.cookies()).get("dev-user")?.value ?? null;
  const displayName =
    session?.user?.name ?? session?.user?.email?.split("@")[0] ?? devUser ?? "Usuário";
  const isLogged = Boolean(session) || Boolean(devUser);

  return (
    <header className="border-border/40 bg-background/85 sticky top-2 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/*Home com logotipo*/}
        <Link href="/" className="group flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-103">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-foreground text-xl font-bold tracking-tight">
            Eletrostruct
          </span>
        </Link>

        {/*links de navegacao*/}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/catalogo"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Catálogo
          </Link>

          <Link
            href="/sobre"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Sobre
          </Link>

          <Link
            href="/pedidos"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Meus Pedidos
          </Link>
        </nav>

        {/*Icones*/}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button>
            <Search className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
          </button>

          {isLogged ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 sm:flex">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
                  Logado
                </span>
                <span className="text-foreground text-sm font-medium">
                  {displayName}
                </span>
              </div>

              <Link
                href="/pedidos"
                aria-label="Meus pedidos"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>

              <form action={SignOutAction}>
                <button
                  type="submit"
                  aria-label="Sair"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                aria-label="Login"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>

              <Link
                href="/cadastro"
                aria-label="Criar conta"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <UserPlus className="h-5 w-5" />
              </Link>
            </>
          )}

          <Link
            href="/carrinho"
            aria-label="carrinho"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
