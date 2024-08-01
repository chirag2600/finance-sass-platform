import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.lugfghgkogliziujdkya:zHoEAyiH0EGdJH32@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  },
});
