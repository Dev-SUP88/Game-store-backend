import {
  mysqlTable,
  binary,
  varchar,
  int,
  boolean,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { gameAccounts } from './gameAccounts';
import { binaryUuid } from './custom-types.ts';

export const productImages = mysqlTable('product_images', {
  id: binaryUuid('id')
    .primaryKey(),
    
  // Foreign Key ชี้ไปที่ gameAccounts.id (BINARY 16)
  account_id: binaryUuid('id')
    .notNull()
    .references(() => gameAccounts.id, { onDelete: 'cascade' }),
    
  image_url: varchar('image_url', { length: 255 }).notNull(),
  display_order: int('display_order').default(0),
  is_cover: boolean('is_cover').default(false),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    accountImagesIdx: index('idx_account_images').on(table.account_id, table.display_order),
  };
});
