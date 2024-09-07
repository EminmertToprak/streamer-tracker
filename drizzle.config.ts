import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",  
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
  },
  tablesFilter: ["*"],
} satisfies Config;
