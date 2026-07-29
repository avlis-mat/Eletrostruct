import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

async function main() {
  const prisma = new PrismaClient();

  const email = process.env.EMAIL ?? "test@example.com";
  const password = process.env.PASSWORD ?? "test1234";

  // create or find user
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const hashed = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        name: "Usuário Teste",
        email,
        senha: hashed,
      },
    });
    console.log(`Created user ${email}`);
  } else {
    console.log(`Found existing user ${email}`);
  }

  // create session token
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires,
    },
  });

  console.log("\nSession created:");
  console.log(`  userId: ${user.id}`);
  console.log(`  sessionToken: ${sessionToken}`);
  console.log(`  expires: ${expires.toISOString()}`);

  const cookieName = "next-auth.session-token";
  console.log("\nUse this cookie in your browser or curl to simulate a logged-in user:");
  console.log(`  ${cookieName}=${sessionToken}; Path=/; HttpOnly`);

  console.log("\nExample curl to fetch home with cookie:");
  console.log(`  curl -s -H "Cookie: ${cookieName}=${sessionToken}" http://localhost:3001 | sed -n '1,200p'`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
