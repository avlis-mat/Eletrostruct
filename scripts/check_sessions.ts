import { PrismaClient } from "../generated/prisma";

(async () => {
  const prisma = new PrismaClient();
  const sessions = await prisma.session.findMany({
    include: { user: true },
    orderBy: { expires: "desc" },
    take: 10,
  });
  console.log(JSON.stringify(sessions, null, 2));
  await prisma.$disconnect();
})();
