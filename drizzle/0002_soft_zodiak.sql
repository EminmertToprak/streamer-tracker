CREATE TABLE IF NOT EXISTS "user_providers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"provider" varchar(256),
	"provider_account_id" varchar(256),
	"accessToken" varchar(256),
	"refreshToken" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE "auth_otp";--> statement-breakpoint
DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(256);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "display_name" varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_providers" ADD CONSTRAINT "user_providers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "full_name";