import {
    doublePrecision,
    integer,
    pgTable,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

import { usersTable } from './usersSchema.js';
import { productsTable } from './productsSchema.js';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().notNull().defaultNow(),
    order_number: varchar(),
    status: varchar({ length: 50 }).notNull().default('Processing'),
    user_id: integer()
        .references(() => usersTable.id)
        .notNull(),
});

export const orderItemsTable = pgTable('order_items', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    order_id: integer()
        .references(() => ordersTable.id)
        .notNull(),
    product_id: integer()
        .references(() => productsTable.id)
        .notNull(),

    quantity: integer().notNull(),
    price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
    id: true,
    user_id: true,
    status: true,
    created_at: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
    id: true,
    order_id: true,
});

export const insertOrderWithItemsSchema = z.object({
    order: insertOrderSchema,
    items: z.array(insertOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
    status: true,
});
