"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { db } from "~/server/db";
import { signIn, signOut } from "~/server/auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function cadastrarAction(formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const nome = formData.get("nome")?.toString().trim();

  if (!email || !password) {
    throw new Error("Preencha e-mail e senha.");
  }

  const existente = await db.user.findUnique({ where: { email } });
  if (existente) {
    throw new Error("Já existe uma conta com esse e-mail.");
  }

  const senhaHash = await bcrypt.hash(password, 10);
  await db.user.create({ data: { email, senha: senhaHash, name: nome } });

  await signIn("credentials", { email, password, redirectTo: "/" });
}

export async function credentialsSignInAction(formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    throw new Error("Preencha e-mail e senha.");
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Credenciais inválidas.");
    }
    throw error;
  }
}
