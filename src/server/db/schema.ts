// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigserial,
  index,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 256 }),
    displayName: varchar("display_name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (users) => ({
    //example index
    //nameIdx: index("name_idx").on(users.fullName),
  }),
);

export const userProviders = createTable(
  "user_providers",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    provider: varchar("provider", { length: 256 }),
    providerAccountId: varchar("provider_account_id", { length: 256 }),
    accessToken: varchar("accessToken", { length: 256 }),
    refreshToken: varchar("refreshToken", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (userProviders) => ({
    providerAccountIdIndex: index("provider_account_id_index").on(
      userProviders.providerAccountId,
    ),
  }),
);
