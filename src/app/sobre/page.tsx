import Link from "next/link";
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">
            Sobre a Eletrostruct
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Tecnologia de qualidade para o dia a dia.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A Eletrostruct nasceu para oferecer uma experiência simples,
            confiável e prática na compra de produtos eletrônicos, com seleção
            cuidadosa e atendimento próximo ao cliente.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Ver produtos
            </Link>
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent"
            >
              Criar conta
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Nossa missão</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Facilitar a vida das pessoas com produtos tecnológicos bem
            escolhidos, preços acessíveis e uma compra rápida, segura e sem
            complicação.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Produtos selecionados</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Oferecemos itens com bom custo-benefício e relevância para o uso
              cotidiano.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Compra simples</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Navegação intuitiva, catálogo organizado e processo de compra
              direto.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Atendimento próximo</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Estamos aqui para ajudar em cada etapa, desde a escolha até a
              entrega.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-8 sm:p-10">
          <h2 className="text-3xl font-semibold">Por que escolher a Eletrostruct?</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            A Eletrostruct une variedade, confiança e praticidade em um só
            lugar, tornando a experiência de compra mais leve e agradável para
            você.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explorar catálogo
            </Link>
            <a
              href="https://wa.me/5561999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-accent"
            >
              Contato via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h3 className="text-2xl font-semibold">Fale conosco</h3>
          <p className="mt-3 text-base text-muted-foreground">
            Estamos disponíveis para tirar dúvidas e ajudar na sua escolha.
          </p>
          <a
            href="https://wa.me/5561999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            WhatsApp: +55 (61) 99999-9999
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
