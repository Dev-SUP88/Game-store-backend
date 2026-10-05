import {
  mysqlTable,
  binary,
  varchar,
  decimal,
  mysqlEnum,
  datetime,
  timestamp,
  index,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { gameAccounts } from './gameAccounts';

export const orders = mysqlTable('orders', {
  id: binary('id', { length: 16 })
    .primaryKey(),
  order_no: varchar('order_no', { length: 50 }).notNull().unique(),
  
  // Foreign Keys (BINARY 16)
  user_id: binary('user_id', { length: 16 })
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  account_id: binary('account_id', { length: 16 })
    .notNull()
    .references(() => gameAccounts.id, { onDelete: 'restrict' }),
    
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  payment_status: mysqlEnum('payment_status', ['pending', 'completed', 'failed', 'expired'])
    .default('pending')
    .notNull(),
  payment_method: varchar('payment_method', { length: 50 }).default('promptpay'),
  transaction_ref: varchar('transaction_ref', { length: 100 }),
  paid_at: datetime('paid_at'),
  created_at: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    userIdx: index('idx_user_orders').on(table.user_id),
    statusIdx: index('idx_order_status').on(table.payment_status),
    accountIdx: index('idx_order_account').on(table.account_id),
  };
});
