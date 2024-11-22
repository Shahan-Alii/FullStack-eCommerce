import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const usersTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    image: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 255 }).notNull().default('user'),
    name: varchar({ length: 255 }),
    address: text(),
    contact: text(),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
    id: true,
    role: true,
});

export const loginSchema = createInsertSchema(usersTable).pick({
    email: true,
    password: true,
});

export const updateUserSchema = createInsertSchema(usersTable)
    .pick({
        name: true,
        address: true,
        image: true,
        contact: true,
        email: true,
    })
    .partial();
