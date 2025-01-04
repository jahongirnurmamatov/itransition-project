-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_responseId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_userId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_userId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateAccess" DROP CONSTRAINT "TemplateAccess_templateId_fkey";

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateAccess" ADD CONSTRAINT "TemplateAccess_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
