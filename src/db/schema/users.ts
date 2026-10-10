import {
  mysqlTable,
  binary,
  varchar,
  mysqlEnum,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { binaryUuid } from './custom-types.ts';

export const users = mysqlTable('users', {
  id: binaryUuid('id').primaryKey(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  role: mysqlEnum('role', ['customer', 'admin']).default('customer').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at")
});
