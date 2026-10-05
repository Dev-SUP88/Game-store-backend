import {
  mysqlTable,
  binary,
  varchar,
  text,
  decimal,
  mysqlEnum,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { games } from './games';

export const gameAccounts = mysqlTable('game_accounts', {
  id: binary('id', { length: 16 })
    .primaryKey(),
  
  // Foreign Key ชี้ไปที่ games.id (BINARY 16)
  game_id: binary('game_id', { length: 16 })
    .notNull()
    .references(() => games.id, { onDelete: 'cascade' }),
    
  title: varchar('title', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  status: mysqlEnum('status', ['available', 'reserved', 'sold'])
    .default('available')
    .notNull(),
  
  // ข้อมูลบัญชีที่ผ่านการเข้ารหัส
  account_username: varchar('account_username', { length: 255 }).notNull(),
  account_password: varchar('account_password', { length: 255 }).notNull(),
  account_details: text('account_details'),
  
  // คอลัมน์เสริมสำหรับ 2-Way Encryption (AES-256-GCM/CBC)
  encryption_iv: varchar('encryption_iv', { length: 64 }),
  auth_tag: varchar('auth_tag', { length: 64 }),
  
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => {
  return {
    gameStatusIdx: index('idx_game_status').on(table.game_id, table.status),
    priceIdx: index('idx_price').on(table.price),
  };
});
