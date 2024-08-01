import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


const connectionString = process.env.DATABASE_URL;

export const sql = postgres(connectionString!);

export const db = drizzle(sql);

