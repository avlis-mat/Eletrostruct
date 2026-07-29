// src/app/cadastro/page.tsx
import { Navbar } from "~/_components/Navbar";
import { Footer } from "~/_components/Footer";
import { CadastroForm } from "~/_components/CadastroForm";

export default function CadastroPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-md pt-32">
        <h1 className="mb-6 text-3xl font-bold">Criar conta</h1>
        <CadastroForm />
      </div>
      <Footer />
    </main>
  );
}