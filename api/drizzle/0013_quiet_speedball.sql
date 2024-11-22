



-- -- ALTER TABLE "order_items" RENAME COLUMN "orderId" TO "order_id";--> statement-breakpoint
-- ALTER TABLE "order_items" RENAME COLUMN "productId" TO "product_id";--> statement-breakpoint
-- ALTER TABLE "orders" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
-- ALTER TABLE "orders" RENAME COLUMN "orderNumber" TO "order_number";--> statement-breakpoint
-- ALTER TABLE "orders" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
-- ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_orders_id_fk";
-- --> statement-breakpoint
-- ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_products_id_fk";
-- --> statement-breakpoint
-- ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_users_id_fk";
-- --> statement-breakpoint
-- DO $$ BEGIN
--  ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
-- EXCEPTION
--  WHEN duplicate_object THEN null;
-- END $$;
-- --> statement-breakpoint
-- DO $$ BEGIN
--  ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
-- EXCEPTION
--  WHEN duplicate_object THEN null;
-- END $$;
-- --> statement-breakpoint
-- DO $$ BEGIN
--  ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
-- EXCEPTION
--  WHEN duplicate_object THEN null;
-- END $$;
