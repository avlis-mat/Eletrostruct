"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyUserCredentials } from "~/server/auth/login";

export async function SignOutAction() {
  const cookieStore = await cookies();
  cookieStore.set({ name: "dev-user", value: "", path: "/", maxAge: 0 });
  redirect("/");
}

export async function CredentialsSignInAction(formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Preencha email e senha.");
  }

  const authResult = await verifyUserCredentials(email, password);
  if (authResult.status === "locked") {
    throw new Error("Conta bloqueada por 2 horas após 3 tentativas. Tente novamente mais tarde.");
  }

  if (authResult.status !== "success") {
    throw new Error("Credenciais inválidas.");
  }

  const display = authResult.user.name ?? authResult.user.email ?? "Usuário";
  const cookieStore = await cookies();
  cookieStore.set({ name: "dev-user", value: display, path: "/" });

  redirect("/");
}
