-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "sharedWith" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE';


CREATE INDEX username_trgm_idx ON "User" USING gin (username gin_trgm_ops);
CREATE INDEX email_trgm_idx ON "User" USING gin (email gin_trgm_ops);