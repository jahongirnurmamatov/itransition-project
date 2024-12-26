/*
  Warnings:

  - You are about to drop the column `sharedWith` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "sharedWith";

-- CreateTable
CREATE TABLE "TemplateAccess" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,

    CONSTRAINT "TemplateAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplateAccess_userId_templateId_key" ON "TemplateAccess"("userId", "templateId");

-- AddForeignKey
ALTER TABLE "TemplateAccess" ADD CONSTRAINT "TemplateAccess_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
