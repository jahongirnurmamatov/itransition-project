import prisma from "../db/prisma.js";

export const addResponse =async (req, res) => {  
    try {
        console.log('called')
        const userId = req.userId;
        const { templateId } = req.params; 
        const { answers } = req.body;
    
        if (!answers || !Array.isArray(answers)) {
          return res.status(400).json({ error: "No valid answer provided" });
        }

        const newResponse = await prisma.response.create({
          data: {
            userId: parseInt(userId, 10),
            templateId: parseInt(templateId, 10),
            answers: {
              create: answers.map((answer) => ({
                questionId: answer.questionId,
                value: answer.value,
              })),
            },
          },
        });
    
        res.status(201).json({ message: "Response submitted successfully.", response: newResponse });
      } catch (error) {
        console.error("Error submitting response:", error);
        res.status(500).json({ error: "An error occurred while submitting the response." });
      }
}   