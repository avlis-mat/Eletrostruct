import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// tipagem de seguranca para o objeto global do Node
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// adaptador
const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });

// pega prisma na memoria global ou cria um novo passando o adaptador
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// se nao estiver em producao, salva na memoria
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
