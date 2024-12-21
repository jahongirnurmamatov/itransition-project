/*
  Warnings:

  - The values [STRING,INTEGER,MULTIPLE_CHOICE,RADIO_GROUP,SELECT_GROUP,TEXT] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuestionType_new" AS ENUM ('header', 'checkbox', 'number', 'image', 'radio', 'select', 'textarea', 'paragraph');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionType_new" USING ("type"::text::"QuestionType_new");
ALTER TYPE "QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "QuestionType_old";
COMMIT;
