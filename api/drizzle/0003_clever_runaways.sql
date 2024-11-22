ALTER TABLE "products" ADD COLUMN "category" varchar(100) DEFAULT 'Misc' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rating" double precision DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "totalReviews" integer DEFAULT 0;