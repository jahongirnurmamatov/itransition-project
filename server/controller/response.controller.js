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

export const  getResponders = async (req, res) => {
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

export const getAggregates = async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!templateId || isNaN(templateId)) {
      return res.status(400).json({ success: false, message: "Invalid template ID" });
    }

    const templateIdParsed = parseInt(templateId, 10);

    // Fetch all questions related to the template upfront
    const questions = await prisma.question.findMany({
      where: { templateId: templateIdParsed },
      select: {
        id: true,
        label: true,
        description: true,
      },
    });

    const questionMap = questions.reduce((map, question) => {
      map[question.id] = { label: question.label, description: question.description };
      return map;
    }, {});

    // Fetch Numeric Answers
    const numericAnswers = await prisma.answer.findMany({
      where: {
        question: {
          type: "number",
          templateId: templateIdParsed,
        },
        value: { not: null },
      },
      select: {
        questionId: true,
        value: true,
      },
    });

    // Process Numeric Aggregates
    const numericAggregates = numericAnswers.reduce((acc, answer) => {
      const questionId = answer.questionId;
      const numericValue = parseFloat(answer.value);

      if (!acc[questionId]) {
        acc[questionId] = { sum: 0, count: 0 };
      }

      acc[questionId].sum += numericValue;
      acc[questionId].count += 1;

      return acc;
    }, {});

    const numericResults = Object.entries(numericAggregates).map(([questionId, data]) => ({
      questionId: parseInt(questionId, 10),
      label: questionMap[questionId]?.label,
      description: questionMap[questionId]?.description,
      average: data.sum / data.count,
    }));

    const singleSelectAggregates = await prisma.answer.groupBy({
      by: ['questionId', 'value'],
      where: {
        question: {
          type: { in: ['radio', 'select'] },
          templateId: templateIdParsed,
        },
      },
      _count: {
        _all: true,
      },
    });
    
    // Fetch all questions and their options
    const singleSelectQuestions = await prisma.question.findMany({
      where: {
        type: { in: ['radio', 'select'] },
        templateId: templateIdParsed,
      },
      select: {
        id: true,
        label: true,
        description: true,
        options: {
          select: {
            value: true, // Option value
          },
        },
      },
    });
    
    // Map and format the results
    const singleSelectResults = singleSelectQuestions.map((question) => {
      // Fetch the corresponding aggregates for this question
      const aggregates = singleSelectAggregates.filter(
        (group) => group.questionId === question.id
      );
    
      // Total response count for this question
      const totalResponses = aggregates.reduce((sum, group) => sum + group._count._all, 0);
    
      // Map options with counts and percentages
      const options = question.options.map((option) => {
        const match = aggregates.find((agg) => agg.value === option.value);
        const count = match ? match._count._all : 0; // Default to 0 if no match
        const percentage = totalResponses > 0 ? ((count / totalResponses) * 100).toFixed(2) : "0.00";
    
        return {
          option: option.value,
          count,
          percentage,
        };
      });
    
      return {
        label: question.label,
        description: question.description,
        options,
      };
    });

    // Fetch Multi-Select Answers
    const multiSelectAnswers = await prisma.answer.findMany({
      where: {
        question: {
          type: "checkbox",
          templateId: templateIdParsed,
        },
      },
      select: {
        questionId: true,
        value: true,
      },
    });

    const processedMultiSelectAnswers = {};
    multiSelectAnswers.forEach((answer) => {
      const selectedOptions = answer.value.split(",");
      if (!processedMultiSelectAnswers[answer.questionId]) {
        processedMultiSelectAnswers[answer.questionId] = {};
      }
      selectedOptions.forEach((option) => {
        processedMultiSelectAnswers[answer.questionId][option] =
          (processedMultiSelectAnswers[answer.questionId][option] || 0) + 1;
      });
    });

    const totalMultiSelectResponses = Object.entries(processedMultiSelectAnswers).map(
      ([questionId, options]) => {
        const totalResponses = Object.values(options).reduce((sum, count) => sum + count, 0);

        return {
          questionId: parseInt(questionId, 10),
          label: questionMap[questionId]?.label,
          description: questionMap[questionId]?.description,
          options: Object.entries(options).map(([option, count]) => ({
            option,
            count,
            percentage: ((count / totalResponses) * 100).toFixed(2),
          })),
        };
      }
    );

    // Fetch Text Aggregates
    const textAggregates = await prisma.answer.groupBy({
      by: ["questionId"],
      where: {
        question: {
          type: { in: ["textarea", "paragraph"] },
          templateId: templateIdParsed,
        },
      },
      _count: { responseId: true },
    });

    const textResults = textAggregates.map((text) => ({
      questionId: text.questionId,
      label: questionMap[text.questionId]?.label,
      description: questionMap[text.questionId]?.description,
      responseCount: text._count.responseId,
    }));
    //sorting and combining all results
const combinedResults = [];
// Process Numeric Questions
numericResults.forEach((numeric) => {
  combinedResults.push({
    questionId: numeric.questionId,
    label: numeric.label,
    description: numeric.description,
    type: "number",
    data: {
      average: numeric.average,
    },
  });
});
// Process Single-Select Questions
singleSelectResults.forEach((singleSelect) => {
  combinedResults.push({
    questionId: singleSelect.id, // Replace `id` with the appropriate property if needed
    label: singleSelect.label,
    description: singleSelect.description,
    type: "radio",
    data: {
      options: singleSelect.options,
    },
  });
});
// Process Multi-Select Questions
totalMultiSelectResponses.forEach((multiSelect) => {
  combinedResults.push({
    questionId: multiSelect.questionId,
    label: multiSelect.label,
    description: multiSelect.description,
    type: "checkbox",
    data: {
      options: multiSelect.options,
    },
  });
});
// Process Text-Based Questions
textAggregates.forEach((text) => {
  const question = questions.find((q) => q.id === text.questionId); // Match with question details
  combinedResults.push({
    questionId: text.questionId,
    label: question.label,
    description: question.description,
    type: "text",
    data: {
      responseCount: text._count.responseId,
    },
  });
});
// Sort the combined results by questionId for clarity
combinedResults.sort((a, b) => a.questionId - b.questionId);
// Send the response
res.status(200).json({ success: true, results: combinedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





