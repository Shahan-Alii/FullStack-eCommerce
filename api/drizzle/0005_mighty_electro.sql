ALTER TABLE "products" ADD COLUMN "sellerId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_sellerId_users_id_fk" FOREIGN KEY ("sellerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
