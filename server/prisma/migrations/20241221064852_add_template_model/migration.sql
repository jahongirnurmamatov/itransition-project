/*
  Warnings:

  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Question` table. All the data in the column will be lost.
  - Added the required column `label` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question",
DROP COLUMN "state",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "topic" TEXT NOT NULL;
