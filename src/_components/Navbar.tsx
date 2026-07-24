import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search, User, ShoppingCart } from "lucide-react";

export function Navbar() {
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
        </nav>

        {/*Icones*/}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button>
            <Search className="text-muted-foreground hover:text-primary h-5 w-5 transition-colors" />
          </button>

          <Link
            href="/login"
            aria-label="Login"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="h-5 w-5" />
          </Link>

          <button
            aria-label="Carrinho"
            className="text-muted-foreground hover:text-primary relative transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
