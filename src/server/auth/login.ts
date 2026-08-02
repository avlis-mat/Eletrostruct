import bcrypt from "bcryptjs";
import { db } from "~/server/db";

const MAX_FAILED_ATTEMPTS = 3;
const LOCK_DURATION_MS = 1000 * 60 * 60 * 2; // 2 horas

export type VerifyUserCredentialsResult =
  | { status: "success"; user: { id: string; name?: string | null; email?: string | null; image?: string | null } }
  | { status: "invalid" }
  | { status: "locked" };

export async function verifyUserCredentials(
  email: string,
  password: string,
): Promise<VerifyUserCredentialsResult> {
  const user = await db.user.findUnique({ where: { email } });
  if (!user || !user.senha) {
    return { status: "invalid" };
  }

  const now = new Date();
  if (user.lockedUntil && user.lockedUntil > now) {
    return { status: "locked" };
  }

  const isValid = user.senha.startsWith("$2")
    ? await bcrypt.compare(password, user.senha)
    : user.senha === password;

  if (!isValid) {
    const nextAttempts = user.failedLoginAttempts + 1;
    const updateData: { failedLoginAttempts: number; lockedUntil: Date | null } = {
      failedLoginAttempts: nextAttempts,
      lockedUntil: null,
    };

    if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
      updateData.failedLoginAttempts = 0;
      updateData.lockedUntil = new Date(now.getTime() + LOCK_DURATION_MS);
    }

    await db.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return updateData.lockedUntil ? { status: "locked" } : { status: "invalid" };
  }

  if (user.failedLoginAttempts > 0 || user.lockedUntil) {
    await db.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
  }

  return {
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  };
}
