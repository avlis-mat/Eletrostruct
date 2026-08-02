"use client";

import { api } from "~/trpc/react";

export default function UsersPage() {
  const utils = api.useUtils();
  const users = api.user.listar.useQuery();

  const desbloquear = api.user.desbloquear.useMutation({
    onSuccess: () => utils.user.listar.invalidate(),
  });

  const alternarAdmin = api.user.alternarAdmin.useMutation({
    onSuccess: () => utils.user.listar.invalidate(),
  });

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-foreground mb-6 text-2xl font-bold">Usuários</h1>

      {users.isLoading && (
        <p className="text-muted-foreground">Carregando...</p>
      )}

      <ul className="divide-border/40 divide-y">
        {users.data?.map((user) => (
          <li key={user.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-foreground font-medium">
                {user.name ?? user.email}
              </p>
              <p className="text-muted-foreground text-sm">
                {user.email} · {user.role}
                {user.bloqueado && (
                  <span className="text-destructive">
                    {" "}
                    · bloqueado ({user.tentativasLogin} tentativas)
                  </span>
                )}
              </p>
            </div>

            <div className="flex gap-3">
              {user.bloqueado && (
                <button
                  onClick={() => desbloquear.mutate({ id: user.id })}
                  disabled={desbloquear.isPending}
                  className="text-primary text-sm font-medium disabled:opacity-50"
                >
                  Desbloquear
                </button>
              )}
              <button
                onClick={() => alternarAdmin.mutate({ id: user.id })}
                disabled={alternarAdmin.isPending}
                className="text-muted-foreground hover:text-primary text-sm disabled:opacity-50"
              >
                {user.role === "ADMIN" ? "Remover admin" : "Tornar admin"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
