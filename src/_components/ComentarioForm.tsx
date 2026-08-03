"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function ComentarioForm({ produtoId }: { produtoId: number }) {
  const router = useRouter();
  const criar = api.comentario.criar.useMutation({
    onSuccess: () => router.refresh(),
    onError: (e) => {
      if (e.data?.code === "UNAUTHORIZED") {
        router.push("/login");
      }
    },
  });

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const texto = String(form.get("texto") ?? "").trim();
    if (!texto) return;

    criar.mutate({ produtoId, texto });
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        name="texto"
        required
        placeholder="Escreva um comentário..."
        className="rounded border px-3 py-2"
        rows={3}
      />
      <button
        type="submit"
        disabled={criar.isPending}
        className="cursor-pointer self-start rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
        {criar.isPending ? "Enviando..." : "Comentar"}
      </button>
      {criar.error && (
        <p className="text-red-500">{criar.error.message}</p>
      )}
    </form>
  );
}