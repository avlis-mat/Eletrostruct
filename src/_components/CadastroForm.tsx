// src/_components/CadastroForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";

export function CadastroForm() {
  const router = useRouter();

  const criar = api.user.criar.useMutation({
    onSuccess: async (_data, variables) => {
      await signIn("credentials", {
        email: variables.email,
        password: variables.senha,
        redirect: false,
      });
      router.push("/");
      router.refresh();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    criar.mutate({
      name: String(form.get("name")),
      endereco: String(form.get("endereco")),
      cpf: String(form.get("cpf")),
      email: String(form.get("email")),
      senha: String(form.get("senha")),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          placeholder="Nome"
          required
          className="rounded border px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="endereco">Endereço</label>
        <input
          id="endereco"
          name="endereco"
          placeholder="Endereço"
          required
          className="rounded border px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="cpf">CPF</label>
        <input
          id="cpf"
          name="cpf"
          placeholder="CPF"
          required
          className="rounded border px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="rounded border px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          placeholder="Senha"
          required
          className="rounded border px-3 py-2"
        />
      </div>
      <button type="submit" disabled={criar.isPending}>
        {criar.isPending ? "Cadastrando..." : "Cadastrar"}
      </button>
      {criar.error && <p className="text-red-500">{criar.error.message}</p>}
    </form>
  );
}
