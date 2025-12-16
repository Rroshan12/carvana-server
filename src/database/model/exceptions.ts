// src/database/model/exceptions.ts
import { mysqlTable, serial, text, timestamp } from 'drizzle-orm/mysql-core';

export const exceptions = mysqlTable('exceptions', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  stack: text('stack'),
  status: text('status'),
  path: text('path'),
  method: text('method'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
