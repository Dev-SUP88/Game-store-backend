import {
  mysqlTable,
  binary,
  varchar,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const games = mysqlTable('games', {
  id: binary('id', { length: 16 })
  .primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  icon_url: varchar('icon_url', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
});
