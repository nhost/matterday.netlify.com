CREATE TABLE "public"."profiles" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "github_login" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
