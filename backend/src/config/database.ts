import { PrismaClient } from "../generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

export let prisma: PrismaClient;
export function connectDb(): void {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}