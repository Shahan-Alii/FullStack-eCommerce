-- ALTER TABLE "order_items" RENAME COLUMN "orderd" TO "order_id";--> statement-breakpoint
-- ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderd_orders_id_fk";
-- --> statement-breakpoint
-- DO $$ BEGIN
--  ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
-- EXCEPTION
--  WHEN duplicate_object THEN null;
-- END $$;
