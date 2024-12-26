import prisma from "../db/prisma.js";

export const addResponse =async (req, res) => {  
    try {
        const userId = req.userId;
        const { templateId } = req.params; 
        const { answers } = req.body;
    
        if (!answers || !Array.isArray(answers)) {
          return res.status(400).json({ error: "No valid answer provided" });
        }
        const existingResponse = await prisma.response.findFirst({
          where: {
            userId: parseInt(userId, 10),
            templateId: parseInt(templateId, 10),
          },
        });
      
        if (existingResponse) {
          throw new Error('User has already responded to this template.');
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

export const  getResponses = async (req, res) => {
  try {
    const { templateId } = req.params;
    const responses = await prisma.response.findMany({
      where: {
        templateId: parseInt(templateId, 10),
      },
      select:{
        id: true,
        createdAt: true,
        user: {
          select: {
            username: true,
          },
        },
      }
    });

    res.status(200).json({succes:true, responses });
  } catch (error) {
    
  }
}