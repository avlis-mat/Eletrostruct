"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";

export async function SignOutAction() {
  cookies().set({ name: "dev-user", value: "", path: "/", maxAge: 0 });
  redirect("/");
}

export async function CredentialsSignInAction(formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Preencha email e senha.");
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.senha) throw new Error("Credenciais inválidas.");

  const isValid = user.senha.startsWith("$2")
    ? await bcrypt.compare(password, user.senha)
    : user.senha === password;

  if (!isValid) throw new Error("Credenciais inválidas.");

  const display = user.name ?? user.email ?? "Usuário";
  cookies().set({ name: "dev-user", value: display, path: "/" });

  redirect("/");
}
