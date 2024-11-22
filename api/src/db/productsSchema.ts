import {
    integer,
    pgTable,
    varchar,
    text,
    doublePrecision,
    timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { usersTable } from './usersSchema.js';

export const productsTable = pgTable('products', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    image: varchar(),
    price: doublePrecision().notNull(),
    category: varchar({ length: 100 }).notNull().default('Misc'),
    rating: doublePrecision().default(0),
    total_reviews: integer().default(0),
    sold_quantity: integer().default(0),
    seller_id: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
});

// Create schema for inserting a product
export const createProductSchema = createInsertSchema(productsTable).omit({
    id: true,
    seller_id: true,
});

// Create schema for updating a product
export const updateProductSchema = createInsertSchema(productsTable)
    .omit({
        id: true,
    })
    .partial();

//Reviews table

export const reviewsTable = pgTable('reviews', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    product_id: integer()
        .notNull()
        .references(() => productsTable.id, { onDelete: 'cascade' }), // Reference to the products table
    user_id: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }), // Reference to the users table
    rating: doublePrecision().notNull(), // Rating value
    comment: text(), // Optional comment on the review
    created_at: timestamp().notNull().defaultNow(), // Timestamp when the review is created
});

// Create schema for inserting a review
export const createReviewSchema = createInsertSchema(reviewsTable).omit({
    id: true,
    created_at: true,
    user_id: true,
    product_id: true,
});

// Create schema for updating a product
export const updateReviewSchema = createInsertSchema(reviewsTable)
    .omit({
        id: true,
        user_id: true,
        product_id: true,
    })
    .partial();
