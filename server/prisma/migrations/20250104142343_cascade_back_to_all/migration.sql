-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_responseId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_templateId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateAccess" DROP CONSTRAINT "TemplateAccess_templateId_fkey";

-- AddForeignKey
ALTER TABLE "TemplateAccess" ADD CONSTRAINT "TemplateAccess_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;
