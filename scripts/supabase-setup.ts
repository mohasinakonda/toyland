import "dotenv/config";
import { execSync } from "node:child_process";

function getMigrationUrl(): string {
  const pooler = process.env.DATABASE_URL;
  if (!pooler) {
    throw new Error("DATABASE_URL is required");
  }

  if (pooler.includes("pooler.supabase.com")) {
    return pooler.replace(":6543/", ":5432/");
  }

  return process.env.DIRECT_URL || pooler;
}

console.log("Pushing Prisma schema to Supabase...");
execSync("npx prisma db push", {
  stdio: "inherit",
  env: { ...process.env, DIRECT_URL: getMigrationUrl() },
});

console.log("Seeding database...");
execSync("npx tsx prisma/seed.ts", {
  stdio: "inherit",
  env: process.env,
});

console.log("Supabase setup complete.");
