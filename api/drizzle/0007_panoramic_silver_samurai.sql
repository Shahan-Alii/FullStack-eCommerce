ALTER TABLE "products" DROP CONSTRAINT "products_sellerid_users_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "total_reviews" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sold_quantity" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seller_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "totalreviews";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "soldquantity";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "sellerid";